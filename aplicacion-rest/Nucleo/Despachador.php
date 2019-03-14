<?php
namespace Nucleo;
/*
 * Contiene los metodos necesarios para ejecutar la acción solicitada.
 * 
 * @author   Ricardo Bermudez Bermudez <ricardob.sistemas@gmail.com>
 * @category Nucleo
 * @package  Nucleo
 */
class Despachador
{
	private
	/** Contiene los datos de solicitud recibidos para ejecutar la operación.*/
	 $_datosDeSolicitud = [],
	/** Vector   que  contiene  los  datos   para  inicializar  el  script  del
	componentes. */ 
	 $_direccionComponente = [];
	
	
	/*
	 * Inicializa los datos necesarios para ejecutar el  componente solicitado.
	 *
	 * @link https://developer.mozilla.org/es/docs/Web/HTTP/Methods Semántica de operaciones HTTP
	 *
	 * @author Ricardo Bermduez Bermudez <ricardob.sistemas@gmail.com>
	 *
	 * @param array $direccionComponente Direccion del componente y accion.
	 * 
	 * @throws Exception Los datos de solicitud no están en formato JSON.
	 */
	public function __construct($direccionComponente)
	{
		$this->_direccionComponente = $direccionComponente;
		
		switch ($_SERVER['REQUEST_METHOD']) {
			case 'GET':
				if(!empty($_GET['datos'])){
					$this->_datosDeSolicitud = json_decode($_GET['datos'], true);
				} else {
					$this->_datosDeSolicitud = [];
				}
				
			break;
			case 'POST':
			case 'DELETE':
			case 'PUT':
				$datos = file_get_contents('php://input');
				
				if ($datos!='') {
					$this->_datosDeSolicitud = json_decode($datos, true);
				} else {
					$this->_datosDeSolicitud = [];
				}
			break;
		}
		
		if ($this->_datosDeSolicitud === false
		 or is_null($this->_datosDeSolicitud)) {
			throw new \Exception('Los datos de solicitud están en un formato incorrecto', 400);
		}
	}
	
	/*
	 * Ejecuta la acción del componenete señalado en el constructor.
	 * 
	 * @author Ricardo Bermudez Bermudez <ricardob.sistemas@gmail.com>
	 * 
	 * @return void
	 *
	 * @throws Exception Cuando no se encuentra el script del componente solicitado.
	 */
	public function ejecutar()
	{
		$componente = $this->_direccionComponente[0];
		$accion     = $this->_direccionComponente[1];
		
		if (!file_exists("Componentes/{$componente}/Controlador.php")) {
			throw new \Exception('No está definida la operación a ejecutar.', 404);
		}
		include_once "Componentes/{$componente}/Controlador.php";
		
		$objComponente = new $componente();
		$res = $objComponente->$accion($this->_datosDeSolicitud);
		
		ob_start();
		ob_get_clean();
		
		echo json_encode($res);
	}
}
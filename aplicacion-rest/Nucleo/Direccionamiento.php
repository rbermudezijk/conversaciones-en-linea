<?php
namespace Nucleo;
/*
 * Contiene lso métodos necesarios para establecer el direccionamiento  de  los
 * componentes de ejecución.
 *
 * @author   Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
 * @category Nucleo
 * @package  Nucleo
 */
class Direccionamiento
{
	private
	 /** Contenedor de las rutas preconfiguradas en el sistema. */
	 $_rutasPreconfiguradas = [],
	 /** Direccion principal obtenida de la variable $_SERVER['REQUEST_URI'].*/
	 $_dirPrincipal = '';
	
	
	/*
	 * Inicializa el direccionador de la ejecución  de  la  petición  entrante.
	 * 
	 * @author Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
	 */
	public function __construct()
	{
		$this->_dirCargadas = include_once 'Configuracion/Rutas.php';
		
		$vecRuta =  explode('?',$_SERVER['REQUEST_URI']);
		$vecRuta =  explode('/',$vecRuta[0]);
		$this->_dirPrincipal = array_pop($vecRuta);
	}
	
	/*
	 * Regresa la ruta de ejecucion del componente necesario.
	 * 
	 * @author Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
	 * 
	 * @return array Contiene  el nombre del componente y la accion a ejecutar.
	 *
	 * @throws Exception En caso de que no se halle la ruta asociada a la clave
	 *                   proporcionada en la URL de petición.
	 */
	public function obtRuta()
	{
		foreach($this->_dirCargadas as $claveRuta => $ruta) {
			if ($claveRuta === $this->_dirPrincipal) {
				return $ruta;
			}
		}

		throw new \Exception(
		     'No está definida la accion a realizar.'
		   . 'Verifique su consulta', 404);
	}
}
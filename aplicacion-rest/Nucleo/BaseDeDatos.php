<?php
namespace Nucleo;
/*
 * En esta clase están contenidos los métodos necesarios para  la configuración
 * del acceso a la base de datos y los metodos para facilitar  la  manipulación
 * de los registros.
 *
 * @author   Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
 * @category Nucleo
 * @package  Nucleo
 */
class BaseDeDatos
{
	/** Contiene la URL del servidor de la base de datos. */
	private $_servidor      = '';
    /** Credencial usuario. */
	private $_usuario       = '';
	/** Credencial contraseña. */
	private $_contrasena    = '';
	/** Nombre de la base de datos. */
	private $_nombreEsquema = '';
	/** Objeto mysqli que contiene el conector a la base de datos. */
	private $_conDb;

	/*
	 * Inicializa los parámetros para realizar la conexión a la base de datos.
	 *
	 * Es necesario tener la configuración de la base de  datos  en el archivo
	 * 'Configuracion/Conexion.php'.
	 * 
	 * @link http://php.net/manual/es/function.parse-ini-file.php Refencia de carga de archivos .ini
	 *
	 * @author Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
	 *
	 * @throws Exception Cuando no esté definido el archivo deConecxion.
	 */
	public function __construct()
	{
		if (!file_exists('Configuracion/Conexion.ini')) {
			throw new Exception('Problemas en el servidor ejecutar accion mas tarde', 500);
		}
		
		$bdConfiguracion = parse_ini_file('Configuracion/Conexion.ini');
		
		$this->_servidor      = $bdConfiguracion['bd.servidor'];
		$this->_usuario       = $bdConfiguracion['bd.usuario'];
		$this->_contrasena    = $bdConfiguracion['bd.clave'];
		$this->_nombreEsquema = $bdConfiguracion['bd.esquema'];
	}

	/*
	 * Crea una nueva conexión al servidor de la base de datos.
	 *
	 * @author Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
	 *
	 * @return void
	 */
	private function _iniciaConexion()
	{
		$this->_conDb = new \mysqli(
			$this->_servidor,
			$this->_usuario,
			$this->_contrasena,
			$this->_nombreEsquema
		);
		
		if ($this->_conDb->connect_error) {
			throw new \Exception ('Error al acceder a la base de datos. '
			                   . 'Intente su operación más tarde', 500);
		}
		mysqli_set_charset($this->_conDb,"utf8");
	}

	/*
	 * Cierra la conexión al servidor de la base de datos.
	 *
	 * @author Ricardo Bermúdez Bermúdez
	 *
	 * @return void
	 */
	private function _cierraConexion()
	{
		$this->_conDb->close();
	}
	
	/*
	 * Método que representa la operación de borrado (DELETE).
	 * 
	 * @author Ricardo Bermúdez Bermúdez <ricardob,sistemas@gmail.com>
	 *
	 * @param  string $sql Instrucción SQL a ejecutar.
	 *
	 * @return booolean Resultado de ejecutar la operación de eliminación.
	 */
	protected function _delete($sql)
	{
		$this->_iniciaConexion();

		$q_r=$this->_conDb->query($sql);
		$this->_conDb->query($sql);

		$this->_cierraConexion();
		return $q_r;
	}
	
	/*
	 * Método que representa  la  actualización  de  un  registro de la base de
	 * datos (UPDATE).
	 * 
	 * @author Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
	 *
	 * @param string $sql Instrucción SQL a ejecutar.
	 *
	 * @return boolean Resultado de la ejecución de la actualización de datos.
	 */
	protected function _update($sql)
	{
		$this->_iniciaConexion();

		$q_r=$this->_conDb->query($sql);

		$this->_cierraConexion();
		return $q_r;
	}
	

	/*
	 * Representa la operación de inserción de un nuevo registro a la  base  de
	 * datos. Se debe definir la propiedad "_tabla"  para su correcta ejecución
	 * (INSERT).
	 * 
	 * @author Ricardo Bermúdez Bermúdez <ricardob,sistemas@gmail.com>
	 *
	 * @param array $registro  Arreglo  asociativo donde las claves representan
	 *                         los campos del registro a insertas a los valores
	 *                         el valor de cada campo en el registro.
	 * 
	 * @return mixed ID del registro insertado
	 */
	protected function _insert(array $registro)
	{
		
		$campos = implode(',', array_keys($registro));
		$datos = implode("','",array_values($registro));

		$sql = "INSERT INTO {$this->_tabla}({$campos})"
		     . " values('{$datos}')";
		
		$this->_iniciaConexion();

		$q_r=$this->_conDb->query($sql);
		$insert_id = $this->_conDb->insert_id;

		$this->_cierraConexion();
		return $insert_id;
	}

    /*
	 * Representa la operación de consulta a la base de datos(SELECT).
	 * 
	 * @param string Instrucción SQL a ejecutar.
	 * 
	 * @return array Arraglo con el primer registro regresados en la cosulta.
	 */
	protected function _select($sql)
	{
		$this->_iniciaConexion();

		$vecResultado = [];
		$resConsulta = $this->_conDb->query($sql);

		if ($resConsulta!==false) {
			if ($fila = $resConsulta->fetch_array()) {
				$tmpFila = [];
				foreach($fila as $clave => $valor){
					if (!is_int($clave) && !empty($valor)) {
						$tmpFila[$clave] = $valor;
					}
				}
				$vecResultado = $tmpFila;
			}
		}

		$this->_cierraConexion();

		return $vecResultado;
	}

    /*
	 * Representa la operación de consulta a la base de datos(SELECT).
	 * 
	 * @param string Instrucción SQL a ejecutar.
	 * 
	 * @return array Arraglo con los registros regresados en la cosulta.
	 */
	protected function _selectAll($sql)
	{
		$this->_iniciaConexion();

		$vecResultado = [];
		$resConsulta = $this->_conDb->query($sql);

		if ($resConsulta!==false) {
			while ($fila = $resConsulta->fetch_array()) {
				$tmpFila = [];
				foreach($fila as $clave => $valor){
					if (!is_int($clave) && !empty($valor)) {
						$tmpFila[$clave] = $valor;
					}
				}
				$vecResultado[] = $tmpFila;
			}
		}

		$this->_cierraConexion();

		return $vecResultado;
	}
}
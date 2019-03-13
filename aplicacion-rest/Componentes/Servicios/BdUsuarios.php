<?php
/*
 * Servidio de conexión a la base de datos para realizar operaciones con la 
 * tabla de usuarios.
 *
 * @author   Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
 * @category Servicio_Componentes
 * @package  Acceso_Servicios
 */
class BdUsuarios extends Nucleo\BaseDeDatos
{
	/** Referencia de la tabla a controlar. */
	protected $_tabla = 'usuarios';
	/** Datos de usuario. */
	private $_usuario = [];
	
	/***/
	public function validaCredenciales($credenciales)
	{
		$sql = "SELECT id_usuario, nombre, usuario FROM usuarios WHERE "
		     . "usuario ='{$credenciales['usuario']}' AND "
		     . "clave   ='{$credenciales['clave']}'";

		if (empty($this->_usuario = $this->_select($sql))) {
			throw new Exception("No hay registros de este usuario", 401);
		}

		return $this;
	}

	/***/
	public function registraConexion() {
		$sql = "UPDATE usuarios "
             . "SET"
			   . " f_conexion = NOW(),"
			   . " e_conexion = true,"
			   . " ip = '{$_SERVER['REMOTE_ADDR']}' "
		     . "WHERE usuario='{$this->_usuario['usuario']}'";
		
		
		if ($this->_update($sql) == false) {
			throw new Exception("No se pudo registrar el inicio de sesión, "
			                  . "intente más tarde.", 500);
		}
		
		return $this->_usuario;
	}
	
	public function registraCierreConexion($idUsuario)
	{
		$sql = "UPDATE usuarios "
             . "SET "
			   . "f_desconexion = NOW(), "
			   . "e_conexion = false, "
			   . "ip = '' "
		     . "WHERE id_usuario='{$idUsuario}'";
		
		$this->_update($sql);
		
		return [];
	}

	/***/
	public function insertaUsuario($vecRegUsuario)
	{
		$e = 'Ocurrio un error al registrar el usuario. ';
		foreach($vecRegUsuario as $valor) {
			if (empty($valor)) {
				throw new Exception($e . 'Error en los datos enviados.',400);
			}
		}
		if (!$this->_insert($vecRegUsuario)) {
			throw new Exception($e . 'Inténtelo mas tarde.',500);
		}
		
		return ['exito' => 'Usuario registrado correctamente'];
	}
	
	/***/
	public function obtenerIdUsuario($usuario)
	{
		$sql = "SELECT id_usuario FROM usuarios WHERE usuario='{$usuario}'";
		
		return $this->_select($sql);
	}

	/***/
	public function usuariosDelSistema($idUsuario, $date='1901-00-00 00:00:00')
	{
		$sql = "SELECT id_usuario, ip, e_conexion, nombre "
		     . "FROM usuarios WHERE "
			 . "(f_conexion>'$date' or f_desconexion>'$date') "
			 . "AND id_usuario!=$idUsuario";

		return $this->_selectAll($sql);
	}
	
	/***/
	public function actualizacionUsuarios($idUsuario)
	{
		$fecha = $this->_select('select now()')['now()'];
		
		$i=1;
		while(
		    empty($usuarios = $this->usuariosDelSistema($idUsuario, $fecha))
		 && Procesos::procesoClienteActivo($i)
		){
			sleep(1);
			$i++;
		}
		
		return $usuarios;
	}
	
	/***/
	public function consultaUsuario($etiquetaUsuario)
	{
		$sql = "SELECT * FROM usuarios WHERE usuario = '$etiquetaUsuario'";
		
		if ( empty($this->_select($sql)) ) {
			return ['msj' => 'exito'];
		}
		return ['msj' => 'error'];
	}
}
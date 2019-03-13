<?php
class BdMensajes extends Nucleo\BaseDeDatos
{
	protected $_tabla = 'mensajes';

	/***/
	public function insertarMensaje($idUsuario,$mensaje){
		$mensaje['id_usuario_de'] = $idUsuario;
		$mensaje['ip_emision']    = $_SERVER['REMOTE_ADDR']; 	
		
		/** Se añade esta modificación porque al insertar los datos MariaDB y MySQL pierden la barra invertida. */
		$mensaje['contenido'] = str_replace('\\','\\\\',$mensaje['contenido']);
		
		if (!($id = $this->_insert($mensaje))) {
			throw new Exception('Ocurrio un error al registrar el mensaje. '
			                  . 'Inténtelo mas tarde.' , 500);
		}

		return ['idMensaje' => $id];
	}


	public function obtenerMensajes($idUsuario,$date='1901-00-00 00:00:00')
	{
		$sql = "SELECT * FROM mensajes "
		     . "WHERE (id_usuario_de={$idUsuario} "
			 . " OR  id_usuario_para={$idUsuario}) "
			 . " AND f_creacion > '{$date}'";

		$mensajes = $this->_selectAll($sql);
		
		return $mensajes;
	}


	public function ultimosMensajes($idUsuario)
	{
		$fecha = $this->_select('select now()')['now()'];
		
		$i = 1;
		while(
		    empty($mensajes = $this->obtenerMensajes($idUsuario, $fecha))
			&& Procesos::procesoClienteActivo($i)
		){
			usleep(1000000);
			$i++;
		}
		
		return $mensajes;
	}
}
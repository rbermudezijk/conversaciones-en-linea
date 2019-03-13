<?php
include_once "Componentes/Servicios/BdUsuarios.php";
include_once "Componentes/Servicios/HrProteccion.php";
include_once "Servicios/BdMensajes.php";

class Chat
{
	/***/
	public function usuarios($solicitud)
	{
		set_time_limit(0);

		$idUsuario = (new HrProteccion)->validaApiToken();

		if (empty($solicitud) && $_SERVER['REQUEST_METHOD'] === 'GET' ) {
		    return
		     (new BdUsuarios())
		       ->usuariosDelSistema($idUsuario);
		}

		if (isset($solicitud['actualizacion']) && $_SERVER['REQUEST_METHOD'] === 'GET' ) {
		    return
		     (new BdUsuarios())
		       ->actualizacionUsuarios($idUsuario);
		}
	}


	public function mensajes($solicitud)
	{
		set_time_limit(0);

		$idUsuario = (new HrProteccion)->validaApiToken();

		if ( !empty($solicitud) && $_SERVER['REQUEST_METHOD'] === 'PUT' ) {
			return (new BdMensajes)->insertarMensaje( $idUsuario , $solicitud['mensaje'] );
		}

		if ( isset($solicitud['actualizacion']) && $_SERVER['REQUEST_METHOD'] === 'GET' ) {
			return (new BdMensajes)->ultimosMensajes($idUsuario);
		}

		if ( $_SERVER['REQUEST_METHOD'] === 'GET' ) {
			return (new BdMensajes)->obtenerMensajes($idUsuario);
		}
	}
}
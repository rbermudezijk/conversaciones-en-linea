<?php
include_once('Componentes/Servicios/BdUsuarios.php');
include_once('Componentes/Servicios/HrProteccion.php');

/*
 * Con este componente se controla el acceso al sistema de los usuarios.
 *
 * Forma parte del API REST del sistema  y  todos los datos intercambiados
 * entre las acciones de este componente entran y se envía en formato JSON
 * en cuanto se refiere al formato de transmisión de los datos.
 * 
 * @author Ricardo Bermudez Bermudez <ricardob.sistemas@gmail.com>
 */

class Acceso
{
	/*
	 * Valida las credenciales de los usuarios a conectar.
	 *
	 * Este metodo se ejecuta vía POST.
	 *
	 * @author Ricardo Bermudez Bermudez <ricardo.sistemas@gmail.com>
	 * 
	 * @param  array $solicitud Datos con las credenciales del usuario que
	 *                          intenta registrar su sesion en el sistema.
	 *
	 * @return array Arreglo con datos llave de aplicacion  generada  para
	 *               realizar posteriores operaciones con el API REST.
	 *
	 * @throws Exception En caso de que  las  credenciales  enviadas  sean
	 *                   invalidas.
	 */
	public function validaCredenciales($solicitud)
	{
		return 
		  (new HrProteccion)
		    ->generarLlave(
		      (new BdUsuarios)
		        ->validaCredenciales($solicitud['credenciales'])
		        ->registraConexion()
		    );
	}
	
	/*
	 * Con  esta accion  se  ejecuta  el  cierre  de  sesión  en  el  servidor.
	 * 
	 * @author Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
	 *
     * @throws Exception En caso de que no este presenete el campo Api-Token en
	                     la cabecera HTTP de la petición.
	 */
	public function cierraSesion()
	{	
		$idUsuario = (new HrProteccion)->validaApiToken();
		
		return (new BdUsuarios)->registraCierreConexion($idUsuario);
	}
	
	
	public function registraUsuario($solicitud){
		return
		  (new BdUsuarios)
		    ->insertaUsuario($solicitud['regUsuario']);
	}
	
	public function existeUsuario($solicitud){
		return
		  (new BdUsuarios)
		    ->consultaUsuario($solicitud['usuario']);
	}
}
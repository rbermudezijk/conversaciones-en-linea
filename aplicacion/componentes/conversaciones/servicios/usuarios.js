'use strict';
(function(global,ServicioUsuarios){

	var importar = [
	    new global.aplicacion.nucleo.http(),
		global.aplicacion.servicios.sesion,
	];

	global.aplicacion.servicios.usuarios = ServicioUsuarios.apply(null, importar);

})(window, function (_servHttp, _servSesion) {
	
	return Usuarios;
	
	function Usuarios(_contextoDom, _servConversacion) {

		var domPilaUsuarios = _contextoDom;
		var pilaUsuarios    = [];
		_servConversacion.canalUsuarios(pilaUsuarios);


		/** Servicios del componente. */
		this.solicitarListaUsuarios = function(){
			solicitarListaUsuarios();
		};


		function solicitarListaUsuarios (banderas) {
			banderas = banderas || {};
			var accion = banderas.actualizacion? actualizarPilaUsuarios : cargarUsuarios;
			
			_servSesion.apilaLlamadaHttp(
				_servHttp
				 .estUri ( '../aplicacion-rest/usuarios' )
				 .estDatos(banderas)
				 .estApiToken( _servSesion.usuarioPrincipal('apiToken') )
				 .correcto(accion)
				 .get()
			);
		}


		/** CARGA DE USUARIOS AL SISTEMA. */
		function cargarUsuarios(usuarios){
			limpiarPilaUsuarios();
			/** Muestra los usuarios en la interfaz principal. */
			usuarios.forEach(apilarUsuarios);
			/**  */
			solicitarListaUsuarios({actualizacion: true});
			
			_servConversacion.solicitarMensajes();
		}


		/** Genera nodo de aplicacion. */
		function apilarUsuarios(usuario) {
			/** Construye nodo del DOM. */
			var nodoU = document.createElement('div');
			nodoU.classList.add('usuario-grupo');
			nodoU.classList.toggle('conectado', !!usuario.e_conexion);
			
			/** Genera código HTML del nodo. Añade la accion a realizar y los carga al HTML. */
			nodoU.innerHTML = "<div class='viñeta'></div>"
			                + usuario.nombre;
							// + "<sup>7</sup>";
			
			nodoU.addEventListener('click', aCargarMensajes);
			domPilaUsuarios.appendChild(nodoU);
			
			/** Carga los usuarios al modelo principal. */
			usuario.mensajes = [];
			pilaUsuarios.push(usuario);
			
			/** Se hace el doble enlace de objetos. */
			nodoU.usuario  = usuario;
			usuario.dom = nodoU;
		}


		/** ACTUALIZACION DE USUARIOS DEL SISTEMA. */
		function actualizarPilaUsuarios(usActual) {
			usActual.forEach(function (uActual) {
				var uPila = pilaUsuarios.find( function (uPila) {
					return uPila.id_usuario === uActual.id_usuario;
				});
				
				if (uPila) {
                    actualizaUsuario(uActual, uPila);
				} else {
					apilarUsuarios(uActual);
				}			
			});

			solicitarListaUsuarios({actualizacion: true});
		}

		function limpiarPilaUsuarios(){
			while (domPilaUsuarios.hasChildNodes()) {
	            domPilaUsuarios.removeChild(domPilaUsuarios.firstChild);
	        }
		}

		function actualizaUsuario(uActual, uObsoleto){
			/** Actualiza datos del objeto. */
			uObsoleto.ip         = uActual.ip;
			uObsoleto.nombre     = uActual.nombre;
			uObsoleto.e_conexion = uActual.e_conexion;
			
			/** Actualiza vista HTML. */
			uObsoleto.dom.classList.toggle('conectado', !!uActual.e_conexion);
			uObsoleto.dom.innerHTML = "<div class='viñeta'></div>" + uActual.nombre;
			
			if (uObsoleto.generarTitulo) {
				uObsoleto.generarTitulo();
			}
		}

        var selected = null;
		/** Acciones del componente. */
		function aCargarMensajes () {
			if (!!selected) {
				selected.classList.toggle('select',false);
			}
			this.classList.toggle('select',true);
			selected = this;
			
			_servConversacion.mostrarMensajes(this.usuario);
		}
		
        var selected = null;
		/** Acciones del componente. */
		function aCargarMensajes () {
			if (!!selected) {
				selected.classList.toggle('select',false);
			}
			this.classList.toggle('select',true);
			selected = this;
			
			_servConversacion.mostrarMensajes(this.usuario);
		}
	}
});
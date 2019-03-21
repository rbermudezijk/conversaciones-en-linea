'use strict';
(function (global, ServicioConversacion) {
	
	var importar = [
	    global.aplicacion.nucleo.http,
		global.aplicacion.servicios.sesion,
		new global.aplicacion.servicios.cifrado
	];

	global.aplicacion.servicios.conversacion = ServicioConversacion.apply(null, importar);
	
}) (window, function (_servHttp, _servSesion, _servCifrado) {

	return Conversacion;
	
	function Conversacion(_contexto) {
		
		var domPilaConversacion = _contexto.querySelector('#pila-mensajes');
		var _usuarios = {};
		var _conversacionActual = {}
		
		this.canalUsuarios = function(usuarios){
			_usuarios = usuarios;
		};
		
		this.solicitarMensajes = solicitarMensajes;

		this.enviarMensaje = function (contenido) {
            var mensajePorEnviar = {
				mensaje: {
					id_usuario_para: _conversacionActual.id_usuario,
					contenido: _servCifrado.cifradoVernam(contenido.value,_servSesion.usuarioPrincipal('ip'))
				}
			};
			
			(new _servHttp)
			 .estUri(API_URL+'/mensajes')
			 .estDatos(mensajePorEnviar)
			 .estApiToken(_servSesion.usuarioPrincipal('apiToken'))
			 .correcto(function(){contenido.value = '';})
			 .put();
		};
		
		/** Carga de mensajes al modulo. */
		function solicitarMensajes (banderas) {
			banderas   = banderas || {};
			var accion = banderas.actualizacion ? actualizarPilaMensajes : cargarMensajes;
			
			_servSesion.apilaLlamadaHttp(
				(new _servHttp)
				 .estUri ( API_URL+'/mensajes' )
				 .estDatos(banderas)
				 .estApiToken(_servSesion.usuarioPrincipal('apiToken'))
				 .correcto(accion)
				 .get()
			);
		}

		function cargarMensajes (mensajes) {
			mensajes.forEach(modelarMensajes);
			solicitarMensajes({actualizacion:true});
		}

		function modelarMensajes (mensaje) {
			var id;
			   
			if (mensaje.id_usuario_de == _servSesion.usuarioPrincipal('id')) {
		       mensaje.tipo = "enviado";
			   id = mensaje.id_usuario_para;
			} else {
		      mensaje.tipo = "recibido";
			  id = mensaje.id_usuario_de;
			}

			// mensaje.contenido = _servCifrado.hexaDecimalStr2Str(mensaje.contenido);
			
			_usuarios
			 .find(function(u){return u.id_usuario == id;})
			 .mensajes
			 .push(mensaje);
			
			return mensaje;
		}


		function generarTitulo() {
			var titulo = _contexto.querySelector('.titulo.tag');
			titulo.removeChild(titulo.querySelector('.t-icono'));
			
			var tIcono = document.createElement('div');
			tIcono.classList.add('t-icono');
			
			tIcono.innerHTML = _conversacionActual.nombre
		                     + ' - ' + (_conversacionActual.ip || '');
			titulo.appendChild(tIcono);
		}
		
		/** Mostrar mensajes en la interfaz. */
		this.mostrarMensajes = function (conversacion) {
			
			if (!!_conversacionActual.generarTitulo) {
				_conversacionActual.generarTitulo = null;
			}
			// alert(103);
			_conversacionActual = conversacion;
			// alert(105);
			_conversacionActual.generarTitulo = generarTitulo;
			// alert(106);
			limpiarPilaConversacion();
			// alert(107);
			generarTitulo();
			// alert(108);
			conversacion.mensajes.sort(function(m1,m2){return m1.id_mensaje - m2.id_mensaje});
			// alert(109);
			conversacion.mensajes.forEach(function (mensaje){
				generarMensaje(mensaje);
			});
			// alert(111);
			_contexto.classList.toggle('mostrar',true);
		}


		function limpiarPilaConversacion () {
			while (domPilaConversacion.hasChildNodes()) {
	            domPilaConversacion.removeChild(domPilaConversacion.firstChild);
	        }
		}

		function generarMensaje (mensaje, nuevo) {
			var nodoM = document.createElement('div');
			nodoM.classList.add('mensaje');
			nodoM.classList.toggle('nuevo', !!nuevo);
			// alert(132);
			var contenido = document.createElement('div');
			contenido.innerHTML = _servCifrado.cifradoVernam( mensaje.contenido, mensaje.ip_emision);
			// alert(135);
			var boton = document.createElement('sup');
			boton.classList.add('d-c-ifrar');
// alert(137);
			boton.addEventListener('click', function () {
				console.log(mensaje);
				var banderaCifrado = boton.classList.toggle('cifrado');
				if (banderaCifrado) {
					contenido.innerHTML = _servCifrado.entidadesHtml(mensaje.contenido);
				} else {
					contenido.innerHTML = _servCifrado.cifradoVernam( mensaje.contenido, mensaje.ip_emision);
				}
			});
		// alert(148);	
			var nodoC = document.createElement('div');
			nodoC.classList.add(mensaje.tipo);
			nodoC.appendChild(boton);
			nodoC.appendChild(contenido);
			// alert(153);
			nodoM.appendChild(nodoC);
			
			domPilaConversacion.appendChild(nodoM);
			
			/** Objeto no disponible con Google Chrome Mobile. 	*/
			/** https://stackoverflow.com/questions/11715646/scroll-automatically-to-the-bottom-of-the-page */
			// domPilaConversacion.scrollTo(0,domPilaConversacion.scrollHeight+12);
			
			domPilaConversacion.scrollTop = domPilaConversacion.scrollHeight;
		}
		
		function actualizarPilaMensajes (ultimosMensajes) {
			
			ultimosMensajes.forEach(function (mensaje) {
				var mensajeAñadido = modelarMensajes(mensaje);
				if  (mensajeAñadido.id_usuario_para == _conversacionActual.id_usuario
				  || mensajeAñadido.id_usuario_de == _conversacionActual.id_usuario){
					  generarMensaje(mensajeAñadido, true);
				  }
			}); 
			solicitarMensajes({actualizacion:true});
		}
		
		this.cerrarPanelConversacion = function () {
			_contexto.classList.toggle('mostrar',false);
		};
	}

});
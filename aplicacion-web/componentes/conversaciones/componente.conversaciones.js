'use strict';

( function (global, ComponenteConversaciones) {
	
	var importar = [
	   global.aplicacion.nucleo.componente,
	   global.aplicacion.servicios.sesion,
	   global.aplicacion.servicios.usuarios,
	   global.aplicacion.servicios.conversacion,
	   new global.aplicacion.nucleo.http()
	];
	
	global.aplicacion.componentes
	 .conversaciones = ComponenteConversaciones.apply(null, importar);
	
} )( window, function (_Componente, _servSesion, _servUsuarios, _servConversacion, _servHttp) {
	
	_Componente.call(Conversaciones, {
		uriHttp:   'componentes/conversaciones/plantilla.conversaciones.html?v='+Math.random(),
		selector:  '#principal',
		acciones:  [['#btn-exit', 'click', 'aCierraSesion'],
				    ['#btn-exit-m', 'click', 'aCierraSesion'],
		            ["#escribe-mensaje", 'keypress', 'aEnviaMensaje'],
		            ["#btn-enviar", 'click', 'aEnviaMensajeBoton'],
					['#cerrar-conversacion', 'click', 'aCerrarConversacion'],
					['#btn-menu', 'click', 'aMostrarBarra']
					],
		protegido: true
	});
	function Conversaciones () {
		var self = this;
		
		var servConversacion = new _servConversacion(this.querySelector('.panel-der'));
		
		var servUsuarios = new _servUsuarios(
		    this.querySelector('#pila-usuarios'),
		    servConversacion
		);
		
		
		/** INICIALIZA. */
		iConfiguraInterfaz();
		servUsuarios.solicitarListaUsuarios();
		/***/
		
		this.aCierraSesion = function (){
			_servSesion.cierraSesion();
			location.hash = 'acceso';
		};
		
		this.aEnviaMensaje = function (e) {
			if (e.key==='Enter' && this.value!='') {
				servConversacion.enviarMensaje(this);
			}
		};
		
		this.aEnviaMensajeBoton = function () {
			var mensaje = self.querySelector('#escribe-mensaje');
			if (mensaje.value!='') {
				servConversacion.enviarMensaje(mensaje);
			}
		};
		
		this.aCerrarConversacion = function () {
			servConversacion.cerrarPanelConversacion();
		};
	
		
		function iConfiguraInterfaz() {
			document.querySelector('body').style.backgroundColor = "white";

            self.querySelector('#usuario-principal')
			.innerHTML = _servSesion.usuarioPrincipal('nombre');
			
			self.querySelector('#usuario-principal-m')
			.innerHTML = _servSesion.usuarioPrincipal('nombre');
		}
		
		this.aMostrarBarra = function () {
			self.querySelector('.barra-m').classList.toggle('visible');
		};
	}
	
	return Conversaciones;
});
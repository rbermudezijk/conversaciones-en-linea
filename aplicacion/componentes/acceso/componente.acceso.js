'use strict';
(function (global, ComponenteAcceso) {

	var importar = [
	    global.aplicacion.nucleo.componente,
    	global.aplicacion.servicios.sesion,
		new global.aplicacion.nucleo.http(),
	];

	global.aplicacion.componentes.acceso = ComponenteAcceso.apply(null, importar);

})( window, function(_Componente, _servSesion, _servHttp){

	/** Declaracion del componente de acceso. */
	_Componente.call(Acceso, {
		uriHttp:  'componentes/acceso/plantilla.acceso.html?v='+Math.random(),
		selector: '#principal',
		protegido: false,
		acciones: [ ['#btn-entrar',  'click', 'aValidaSesion'],
                    ['#btn-registro','click', 'aRegistroUsuarios'] ]
	});
	function Acceso() {
		
		document.querySelector('body').style.backgroundColor = '#009688';

		/** Se declara esta variable para la injeccion del contexto de
		"este" componente en las funciones anonimas que lo requieran. */
		var self = this;

		// /** Modelos del objeto "Credenciales". */
		function mCredenciales () {
			return {
				credenciales: {
					usuario: self.querySelector('#usuario').value,
					clave:   self.querySelector('#clave').value,
				}
			};
		}
		
		/** Realiza la petición de incio de sesion en el servidor donde search
		valida la existencia del usuario.*/
		function sInicioSesion (objCredenciales, fnCredValidas, fnError) {
			_servHttp
			 .estUri( '../aplicacion-rest/acceso' )
			 .estDatos( objCredenciales )
			 .correcto( fnCredValidas )
			 .fallo( fnError )
			 .post();
		}

        // /** Redirecciona al componente de registro de usuario. */
		this.aRegistroUsuarios = function () {
			location.hash = 'registro';
		};

		/** Ejecuta el servicio de inicio de sesión, y registra las credenciales
		la sesion del navegador (Ver servicio de sesión). */
		this.aValidaSesion = function () {
			sInicioSesion(mCredenciales(), credValidas, iError);
			
			function credValidas (objUsuario) {
				_servSesion.registraSesion(objUsuario);
				iCredValidas(objUsuario);
			}
		};

		/** Imprime error en pantalla en caso de odurrido. */
		function iError (objError) {
			var domError = self.querySelector('#error-warning');
			domError.classList.toggle('f-error',true);
			domError.innerHTML = '<strong>Error: </strong>'+objError.error;
		}

		/* Informa al usuario del que las credenciales proporcionadas son validas. */
		function iCredValidas (objUsuario) {
			self.querySelector('#error-warning')
			  .classList.toggle('f-error',false);
			
			location.hash = 'conversaciones';
		}
	}

	return Acceso;
});

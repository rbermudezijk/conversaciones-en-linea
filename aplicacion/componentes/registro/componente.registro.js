'use strict';
(function (global, ComponenteRegistro) {
	
	var importar = [
	  global.aplicacion.nucleo.componente,
	  global.aplicacion.nucleo.http
	];
	
	global.aplicacion.componentes
	.registro = ComponenteRegistro.apply(null, importar);
	
})(window, function (_Componente, _servHttp) {
	
	_Componente.call(Registro,{
		uriHttp:  'componentes/registro/plantilla.registro.html',
		selector: '#principal',
		acciones: [['#btn-registrar','click','aRegistrar'],
		           ['#usuario', 'keyup', 'existeUsuario']],
		protegido: false,
	});
	function Registro () {
        document.querySelector('Body').style.backgroundColor = '#4DB6AC';
        var self = this;
		
		function modRegUsuario() {
			return {
				regUsuario: {
					nombre:  self.querySelector('#nombre').value,
					usuario: self.querySelector('#usuario').value,
					clave:   self.querySelector('#contraseña').value,
				}
			};
		}

		this.existeUsuario = function () {
			(new _servHttp)
			 .estUri('../aplicacion-rest/verificausuario')
			 .estDatos({usuario: self.querySelector('#usuario').value})
			 .correcto(iValidaUsuario)
			 .fallo(function(rs){console.log(rs)})
			 .get();
		};

        /** Imprime error en pantalla en caso de odurrido. */
		function iValidaUsuario (rs) {
			var domError = self.querySelector('#error-usuario');

			if (rs.msj == 'error') {
				domError.classList.toggle('f-error',true);
			    domError.innerHTML = 'Esta etiqueta de usuario ya esta registrada. Utiliza otra.';
			} else {
				domError.classList.toggle('f-error',false);
				domError.innerHTML = '';
			}
		}

		this.aRegistrar = function () {
			(new _servHttp())
			 .estUri('../aplicacion-rest/registro')
			 .estDatos(modRegUsuario())
			 .correcto(iRegValido)
			 .fallo(iError)
			 .put();
		};
		
		/** Imprime error en pantalla en caso de odurrido. */
		function iError (objError) {
			var domError = self.querySelector('#error-warning');
			domError.classList.toggle('f-error',true);
			domError.innerHTML = '<strong>Error: </strong>'+objError.error;
		}
		
		function iRegValido (objUsuario) {
			self.querySelector('#error-warning')
			  .classList.toggle('f-error',false);

			alert('Registro completado. Ahora podrás ingresar al sistema con los datos registrados.');

			location.hash = 'acceso';
		}
	}
	
	return Registro;
});
/**
 * Definición de un servicio cliente HTTP. Extiende la funcionalodad del objeto
 * XMLHttpRequest.
 * 
 * @service
 * @author    Ricardo Bermudez Bermudez <ricardob.sistemas@gmail.com>
 * @since     d.w. 17.10.31
 * @namespace global.aplicacion.nucleo.http
 */
'use strict';
(function (global, http) {
    global.aplicacion.nucleo.http = http();
}) (window, function () {
	
	return function HttpClient () {

		/**
         * variable de especificación de la conexión.
         */
        var control = {
		  uriPrincipal: '',
		  datos: '',
		  correcto: function () {},
		  fallo: function () {},
          apiToken: ''
        };
		
		var E_SERVIDOR = {error: 'Ocurrio un error en el servidor'};
		
		var E_CONEXION = {error: 'Ocurrio un error en la conexión.'
		                       + ' Revise su conexión de internet'
							   + ' o espere unos minutos.'};
		


		this.estUri = function (cadUri) {
			control.uriPrincipal = cadUri;
			return this;
		};
		
		this.estDatos = function (objDatos) {
			control.datos = JSON.stringify(objDatos);
			return this;
		};
		
		this.correcto = function (fnAccion) {
			control.correcto = fnAccion;
			return this;
		};
		
		this.fallo = function (fnAccion) {
			control.fallo = fnAccion;
			return this;
		};
		
		this.estApiToken = function (apiToken) {
			control.apiToken = apiToken;
			return this;
		}

		function procesamientoRespuesta() {
			try{
				var respuesta = this.responseJson();
			} catch(e) {
				control.fallo(E_SERVIDOR);
			}
			
			if (this.status == 200) {
				control.correcto(respuesta);
			} else {
				control.fallo(respuesta);
			}
		}
		
		function errorConexion() {
			control.fallo(E_CONEXION);
		}
		
		function iniciaXHR(tipoPeticion, uri) {
			uri = uri || '';
			
			this.open( tipoPeticion, control.uriPrincipal + uri );
			this.setRequestHeader( 'Content-Type', 'application/json' );
			this.setRequestHeader( 'Api-Token', control.apiToken );
			this.addEventListener( 'load', procesamientoRespuesta );
			this.addEventListener( 'error', errorConexion );
		}
		
		this.get = function (uri) {
			uri = uri || '';
			uri += "?datos=" + encodeURI(control.datos);
			var xhr = new XMLHttpRequest();
			iniciaXHR.call( xhr, 'GET', uri );
			xhr.send();
			return xhr;
		};

		this.post = function (uri) {
			var xhr = new XMLHttpRequest();
			iniciaXHR.call(xhr, 'POST', uri);
			xhr.send( control.datos );
			return xhr;
		};

		this.put = function (uri) {
			var xhr = new XMLHttpRequest();
			iniciaXHR.call(xhr, 'PUT', uri);
			xhr.send( control.datos );
			return xhr;
		};
        
        this.delete = function (uri) {
            
        }
		
		this.obtenerScript = function (uri,accion) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET',uri);
			xhr.addEventListener('load', function () {
			  if(this.status===200){
				accion(this.responseText);
			  }
			});
			xhr.send();
		};
	}
});
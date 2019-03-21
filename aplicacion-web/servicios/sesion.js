'use strict';
/**
 * Modulo de control de sesión de usuario en el navegador.
 * 
 * @module   gloabl/aplicacion/servicios/sesion.
 * @requires aplicacion/nucleo/http.js Servicio  de  conexión  (Cliente  HTTP).
 * @requires aplicacion/inicializa.js  Servicio  de inicialización  de  espacio
 *                                     de nombres.
 * @borrows window as global.
 */
(function (global, ServicioSesion) {

    var importar = [
        global.localStorage,
        new global.aplicacion.nucleo.http()
    ];

    global.aplicacion.servicios.sesion = ServicioSesion.apply(null,importar);

	global.onbeforeunload = function () {
		global.aplicacion.servicios.sesion.cerrarLlamadasHttp();
	}
}) (window, 
/**
 * Objeto función que cierra en un ambito la instanciación de la clase sesión.
 * 
 * @author  Ricardo Bermudez Bermudez <ricardob.sistemas@gmail.com>
 * @borrows window.localStorage as _localStorage.
 * @borrows window.aplicacion.nucleo.http as _servHttp.
 *
 * @return {Sesion} Instancia de la clase "Sesion".
 */
function (_localStorage, _servHttp) {

    return new Sesion();

    /**
     * Esta clase define el servicio de sesión. Se encierra en un ambito de de-
     * claración para no permitir su instanciacion en el ambito global,  puesto
     * que es un servicio único.
     * 
     * Para almacenar las variables de sesión utliza el objeto localStorage.
     *
     * @constructor
     * @class       Sesion.
     * @author      Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
     * @memberof    global.aplicacion.servicios
     * @link        https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage#Browser_compatibility
     * @link        https://www.w3schools.com/html/html5_webstorage.asp
     */
    function Sesion() {
        var self = this;
        /**
         * Informa de la existencia de una sesion validando la existencia de la
         * llave "apiToken", que se envía a lo largo de la  ejecución  del  API
         * REST de las que varias de sus operaciones están protegidas por  esta
         * llave.
         * 
         * @public
         * @type {Function}
         * @borrows window.localStorage as _localStorage.
         * @return {boolean} 
         */
        this.existeSesion = function () {
            return !!_localStorage.getItem('apiToken');
        };

        /**
         * Registra los parámetros de sesión en la variable localStorage.
         *
         * @public
         * @type {Function}
         * @borrows window.localStorage as _localStorage.
         * @param {Object} Object with data user
         */
        this.registraSesion = function (objUsuario) {
            _localStorage.setItem('nombre',   objUsuario.nombre);
            _localStorage.setItem('apiToken', objUsuario.clave);
            _localStorage.setItem('ip',       objUsuario.ip);
            _localStorage.setItem('id',       objUsuario.id_usuario)
        };

        /**
         * Elimina los parametros de sesión e informa al servidor del cierre de
         * sesion.
         * 
         * @public
         * @type {Function}
         * @borrows window.localStorage as _localStorage.
         */
        this.cierraSesion = function () {
            _servHttp
            .estUri(API_URL+'/cierrasesion')
            .estApiToken(_localStorage.getItem('apiToken'))
            .post(); /** informa al servidor del cierre de sesion. */
            
            _localStorage.clear(); /** Limpia las variables de sesión del nave-
                                   gador. */
			self.cerrarLlamadasHttp();
        };

        /**
         * Regresa algún dato solicitado de la variable de sesión.
         * 
         * @author  Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
         * @public
         * @borrows window.localStorage as _localStorage.
         * @param   {string} Nombre del campo/llave solicitado.
         * @returns {*} Valor del campo/llave  solicitado  en  la  variable  de
         *              sesión.
         */
        this.usuarioPrincipal = function (campo) {
            return _localStorage.getItem(campo);
        }
		
		/***/
		var pilaLlamadasHttp = [];
		
		this.apilaLlamadaHttp = function (xhr) {
			pilaLlamadasHttp.push(xhr);
		}
		
		/***/
		this.cerrarLlamadasHttp = function () {
			pilaLlamadasHttp.forEach(function (xhr) {
				if (xhr.readyState !==4) {
					xhr.abort();
				}
			});
		}
    }
});
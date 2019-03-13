'use strict';
/** Contexto de carga. */
(function (nucleo, carga) {
    var injectar = [
        nucleo.modelos.Error,
        nucleo.http.modelos.HttpControl
    ];
    
    nucleo.http.HttpCliente = carga.apply(null, injectar);
}
)(nucleo, function (Error, HttpControl) {
    /**
     * Definición de un servicio  cliente  HTTP. Extiende  la funcionalidad del
     * objeto XMLHttpRequest.
     * 
     * @constructor 
     * @class       HttpCliente
     * @link        https://xhr.spec.whatwg.org/
     * @link        https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest
     * @author      Ricardo Bermudez Bermudez <ricardob.sistemas@gmail.com>
     * @since       d.w. 17.10.31 c. Fecha de creación.
     * @namespace   window.aplicacion.nucleo
     */
    return function HttpCliente () {

        /** Variable de especificación de la conexión.*/
        var control = new HttpControl();
        
        /** Representa un error no manejable en el servidor. */
        var E_SERVIDOR = new Error('Ocurrio un error en el servidor');
        
        /** Representa un error de conexión entre el navegador y el servidor.*/
        var E_CONEXION = new Error(
            'Ocurrio un error en la conexión. Revise su conexión de internet o'
          + ' espere unos minutos.'
        );
        
        /**
         * Procesamiento abstracto de la  respuesta  recibida  por el servidor.
         * @returns void
         */
        function procesamientoRespuesta() {
            try {
                var respuesta = this.rsJson();
            } catch(e) {
                control.fallo(E_SERVIDOR);
            }
            
            if (this.status == 200) {
                control.correcto(respuesta);
            } else {
                control.fallo(respuesta);
            }
        }
        
        /**
         * Establece los parámetros necesarios para realizar una conexión HTTP.
         * Este método debe llamarse utilizando el método call.
         *
         * @this    XMLHttpRequest  utilizado  como   primer  argumento  de  la
         *          llamada a través de call.
         * @param   {string}         tipoPeticion (DELETE, POST, PUT, GET)
         * @param   {string}         uri           Enlace de la petición.
         * @returns {XMLHttpRequest}
         */
        function iniciaXHR(tipoPeticion, uri) {
            uri = uri || '';
            this.open(tipoPeticion, control.uriPrincipal + uri );
            this.setRequestHeader('Content-Type', 'application/json' );
            this.setRequestHeader('Api-Token', control.apiToken );
            this.addEventListener('load',  procesamientoRespuesta );
            this.addEventListener(
              'error',function () {control.fallo(E_CONEXION);}
            );
        }

        /**
         * Establece el prefijo o url principal del módulo.
         * 
         * @this    Contexto de objeto de la clase HttpCliente.
         * @param   {string}     cadUri Prefijo URI de  las  peticiones  que se
         *                              realizen con esta clase.
         * @returns {HttpClient} Referencia de este objeto.
         */
        this.estUri = function (cadUri) {
            control.uriPrincipal = cadUri;
            return this;
        };
        
        /**
         * Establece los datos que se enviarán en el campo body de la petición,
         * tenga en cuenta que solo algunas operaciones  HTTP cuentan con  este
         * apartado; como por ejemplo POST, PUT y DELETE.
         * 
         * @this    Contexto de objeto de la clase HttpCliente.
         * @param   {Object}     objDatos Datos a enviar al servidor.
         * @returns {HttpClient} Referencia de este objeto.
         */
        this.estDatos = function (objDatos) {
            control.datos = JSON.stringify(objDatos);
            return this;
        };
        
        /**
         * Establece la acción (función que se ejecutará  en  caso  de  haberse
         * completado correctamente la petición HTTP). Por correcto se entiende
         * que  los  datos  recibidos  fueron  establecidos en formato JSON sin
         * errores y que el código HTTP de respuesta fue 200.
         * 
         * @this    Contexto de objeto de la clase HttpCliente.
         * @param   {function}   fnAccion Función éxito.
         * @returns {HttpClient} Referencia de este objeto.
         */
        this.correcto = function (fnAccion) {
            control.correcto = fnAccion;
            return this;
        };
        
        /**
         * Establece  la  acción  (función)  que habrá de ejecutarse en caso de
         * errores durate la petición HTTP.
         * 
         * @this    Contexto de objeto de la clase HttpCliente.
         * @param   {function}   fnAccion Función fallo.
         * @returns {HttpClient} Referencia de este objeto.
         */
        this.fallo = function (fnAccion) {
            control.fallo = fnAccion;
            return this;
        };
        
        /**
         * Establece  la  llave  con  la  que  se  ejecuta las peticiones a los
         * servicios web de la apicación de mensajería.
         * 
         * @this    Contexto de objeto de la clase HttpCliente.
         * @param   {string}     apiToken LLave de ejecución de los serv. web.
         * @returns {HttpClient} Referencia de este objeto.
         */
        this.estLlaveServWeb = function (llaveServWeb) {
            control.llaveServWeb = llaveServWeb;
            return this;
        }
        
        /**
         * Ejecuta una solicitud HTTP con el método GET.
         * @link    https://developer.mozilla.org/es/docs/Web/HTTP/Methods/DELETE
         * @param   {string}         uri Enlace de la petición
         * @returns {XMLHttpRequest}
         */
        this.get = function (uri) {
            uri = uri || '';
            uri += "?datos=" + encodeURI(control.datos);
            var xhr = new XMLHttpRequest();
            iniciaXHR.call( xhr, 'GET', uri );
            xhr.send();
            return xhr;
        };

        /**
         * Ejecuta una solicitud HTTP con el método POST.
         * @link    https://developer.mozilla.org/es/docs/Web/HTTP/Methods/POST
         * @param   {string}         uri Enlace de la petición
         * @returns {XMLHttpRequest}
         */
        this.post = function (uri) {
            var xhr = new XMLHttpRequest();
            iniciaXHR.call(xhr, 'POST', uri);
            xhr.send( control.datos );
            return xhr;
        };
        
        /**
         * Ejecuta una solicitud HTTP con el método PUT.
         * @link    https://developer.mozilla.org/es/docs/Web/HTTP/Methods/PUT
         * @param   {string}         uri Enlace de la petición
         * @returns {XMLHttpRequest}
         */
        this.put = function (uri) {
            var xhr = new XMLHttpRequest();
            iniciaXHR.call(xhr, 'PUT', uri);
            xhr.send( control.datos );
            return xhr;
        };
        
        /**
         * Ejecuta una solicitud HTTP con el método DELETE.
         * @link    https://developer.mozilla.org/es/docs/Web/HTTP/Methods/DELETE
         * @param   {string}         uri Enlace de la petición
         * @returns {XMLHttpRequest}
         */
        this.del = function (uri) {
            var xhr = new XMLHttpRequest();
            iniciaXHR.call(xhr, 'DELETE', uri);
            xhr.send( control.datos );
            return xhr;
        };
    };
});
console.log('http-cliente');
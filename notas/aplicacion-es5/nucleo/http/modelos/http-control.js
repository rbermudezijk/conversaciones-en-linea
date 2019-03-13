'use strict';
/** Función de carga. */
(function (nucleo, carga) {
    nucleo.http.modelos.HttpControl = carga();
}
)(nucleo, function () {
    /**
     * Modelo de la variable de control del servicio HttpCliente.
     *
     * @constructor
     * @class       HttpControl
     * @author      Ricardo Bermudez Bermudez <ricardob.sistemas@gmail.com>
     * @since       f.e. 18.04.01 c. Fecha de creación.
     * @namespace   window.aplicacion.nucleo
     */
    return function HttpControl() {
          this.uriPrincipal = '';
          this.datos        = '';
          this.llaveServWeb = '';
          this.correcto     = function () {};
          this.fallo        = function () {};
    };
});

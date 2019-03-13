'use strict';
/** Función de carga. */
(function (nucleo, carga) {
    nucleo.modelos.Error = carga();
}
)(nucleo, function (){
    /**
     * Modelo de error base.
     *
     * @constructor
     * @class       Error
     * @author      Ricardo Bermudez Bermudez <ricardob.sistemas@gmail.com  >
     * @since       f.e. 18.04.01 c. Fecha de creación.
     * @namespace   window.aplicacion.nucleo
     */
    return function Error(mensaje, codigo) {
        this.error  = mensaje || '';
        this.codigo = codigo  || 0;
    };
});

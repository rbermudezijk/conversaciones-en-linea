'use strict';
/** Función de carga. */
(function (nucleo, carga) {
    nucleo.ºComponente = carga();
}
)(nucleo, function () {
    /**
    * Decorador para definir el comportamiento de un componente web.
    *
    * @constructor
    * @class       ºComponente
    * @author      Ricardo Bermudez Bermudez <ricardob.sistemas@gmail.com>
    * @since       f.e. 17.11.01 c. Fecha de creación.
    * @namespace   global.aplicacion.nucleo
    * @param       {Object} reglaDeCarga Propiedades necesarias  para la carga
    *                                    de un componente:
    *              
    *              uriHttp    -> URI de la plantilla HTML
    *                            asociada al componente.
    *              selector   -> Selector  del contenedor
    *                            donde se  incrustará  la
    *                            plantilla del componente
    *              acciones   -> Señala los  métodos  que
    *                            principales que se carga
    *                            como acciones de la plan
    *                            tilla.
    *              proteccion -> Valor booleano (bandera)
    *                            que indica si el compone
    *                            nte debe ser accesible o
    *                            no.
    */
    return function ºComponente(reglaDeCarga) {
        
        var uriHttp    = reglaDeCarga.uriHttp;
        var selector   = reglaDeCarga.selector;
        var acciones   = reglaDeCarga.acciones;
        var proteccion = reglaDeCarga.protegido;
        
        /**
        * Regresa el URI de platilla asociada al componente.
        * @returns {string}
        */
        this.obtUriPlantilla = function () {
            return uriHttp;
        };
    
        /**
        * Regresa el  selector  que  se  usara para injectar la plantilla HTML del
        * componente.
        * @returns {string}
        */
        this.obtSelector = function () {
            return selector;
        };
    
        /**
        * Regresa las acciones que se asociarán a la plantilla de componente.
        * @returns {Array}
        */
        this.obtAcciones = function () {
            return acciones;
        };
        
        /**
        * Indica si un componente puede ser accedido públicamente o no.
        * @return {boolean}
        */
        this.componenteProtegido = function(){
            return proteccion;
        };
    };
});
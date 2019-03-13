/**
 * Agrega decorador componente al espacio de trabajo de la aplicación.
 *
 * @component ºComponente
 * @author    Ricardo Bermudez Bermudez <ricardob.sistemas@gmail.com>
 * @since     d.w. 17.11.01
 * @namespace global.aplicacion.nucleo.componente
 */
 'use strict';
(function (global, componente) {
    global.aplicacion.nucleo.componente = componente();
}) (window, function () {
    
    /**
     * Decorador para definir el comportamiento de un componente web.
     *
     * @decorator
     * @constructor
     * @class       Componente
     * @param       {Object} reglaDeCarga¨Propiedades necesarias para la carga de
     *              un componente:
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
    return function Componente (reglaDeCarga) {
        var _uriHttp    = reglaDeCarga.uriHttp;
        var _selector   = reglaDeCarga.selector;
        var _acciones   = reglaDeCarga.acciones;
        var _proteccion = reglaDeCarga.protegido;
        
        /**
         * @description Regresa el URI de platilla asociada al componente.
         * @return      {string}
         */
        this.obtUriPlantilla = function () {
            return _uriHttp;
        };

        /**
         * @description Regresa el selector  que  se  usara  para  injectar  la
         *              plantilla HTML del componente.
         * @return      {string}
         */
        this.obtSelector = function () {
            return _selector;
        };

        /**
         * @description Regresa las acciones que se asociarán a la plantilla de
         *              componente.
         * @return      {Array}
         */
        this.obtAcciones = function () {
            return _acciones;
        };
        
        /**
         * @description Indica si un componente puede ser accedido públicamente
         *              o no.
         * @return {boolean}
         */
        this.componenteProtegido = function(){
            return _proteccion;
        };
    }
})
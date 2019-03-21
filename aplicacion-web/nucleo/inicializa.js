/**
 * @file   Inicializa  el  espacio de nombres de la aplicacion  y  las  últimas
 *         funcionalidades  no  declaradas  en versiones antiguas de JavaScript
           (del ingles Pollyfills).
 * 
 * @author Ricardo ermúdez Bermúdez <ricardob.sistemas@gmail.com>
 * @since  d.w. 17.11.07
 */
(function (window, XMLHttpRequest, Array) {
    /** Crea espacio de nombres de la aplicación. */
    window.aplicacion             = window.aplicacion || {};
    window.aplicacion.nucleo      = window.aplicacion.nucleo || {};
    window.aplicacion.componentes = window.aplicacion.componentes || {};
    window.aplicacion.servicios   = window.aplicacion.servicios || {};

    /**
     * Se agrega modificacion al objeto XMLHttpRequest para que soporte automá-
     * ticamente la transformación de texto a tipos de datos JSON.
     *
     * @author   Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
     * @memberof XMLHttpRequest.prototype
     * @returns  {Object} Respuesta transformada en objeto JSON.
     * @this     Ambito  de  objeto  de   determinada  instancia  de  la  clase
     *           XMLHttpRequest.
     */
    XMLHttpRequest.prototype.responseJson = function () {
        return JSON.parse(this.responseText);
    };
    
    /**
     * Funcionalidad de búsqueda en arreglos para navegadores  antiguos  que no
     * tienen referencia de la función "find".
     * 
     * @author   Mozilla Developers Network.
     * @memberof Array.prototype
     * @returns  {*} Dato buscado en el arreglo.
     * @link     https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/find
     */
    if (!Array.prototype.find) {
      Array.prototype.find = function(predicate) {
        'use strict';
        if (this == null) {
          throw new TypeError(
            'Array.prototype.find called on null or undefined'
          );
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
        return undefined;
      };
    }
	
    
    /**
     * Funcionalidad de recorrimiento de arreglos para navegadores antiguos que
     * no tienen referencia de la función "forEach".
     * 
     * @author   Mozilla Developers Network.
     * @memberof Array.prototype
     * @returns  {*} Dato buscado en el arreglo.
     * @link     https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach
     */
    if (!Array.prototype.forEach) {
      Array.prototype.forEach = function forEach(callback, thisArg) {
        'use strict';
        var T, k;
    
        if (this == null) {
          throw new TypeError("this is null or not defined");
        }
    
        var kValue,
            O = Object(this),
            len = O.length >>> 0;

        if ({}.toString.call(callback) !== "[object Function]") {
          throw new TypeError(callback + " is not a function");
        }
    
        if (arguments.length >= 2) {
          T = thisArg;
        }
    
        k = 0;
    
        while (k < len) {
          if (k in O) {
            kValue = O[k];
            callback.call(T, kValue, k, O);
          }
          
          k++;
        }
      };
    }
    
})(window, XMLHttpRequest, Array);
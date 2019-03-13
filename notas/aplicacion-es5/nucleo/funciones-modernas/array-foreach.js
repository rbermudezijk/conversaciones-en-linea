'use strict' ;
(function (Array) {
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
})(Array);
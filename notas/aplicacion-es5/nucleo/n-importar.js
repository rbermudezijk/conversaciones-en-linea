'use strict';
/** Función de carga. */
(function (window, carga) {
    
    var injectar = [
        window,
        window.document
    ];
    
    window.nucleo = {importar: carga.apply(null, injectar)};
    
    /** Cargar scripts pertenecientes al marco de trabajo del nucleo. */
    window.nucleo.importar('nucleo/n-carga.js');
}
)(window, function (window, document) {
    /**
     * Este método sirve par mapear en un objeto principal(window)  el  espacio
     * de nombres de la aplicación.
     * 
     * @author  Ricardo Bermudez Bermudez
     * @since   f.e. 18.04.02 c. Fecha de escritura
     * @param   {Array} enlace   Espacio de nombre del script.
     * @returns void
     */
    function creaEspacioDeNombres(enlace) {
        var objInicial = window;
        
        /** Elimina el nombre y extensión del archivo. */
        enlace.pop();
        
        for (var i=0;i<enlace.length; i++) {
            var nombre = enlace[i];
            objInicial[nombre] = objInicial[nombre] || {};
            objInicial = objInicial[nombre];
        }
    }
    
    /**
     * Función para importar scripts JavaScript de un servidor.
     * 
     * @link      https://stackoverflow.com/questions/9413737/how-to-append-script-script-in-javascript
     * @link      https://stackoverflow.com/questions/14644558/call-javascript-function-after-script-is-loaded
     * @author    Ricardo Bermudez Bermudez <ricardob.sistemas@gmail.com>
     * @since     f.e. 18.04.02 c. Fecha de creación.
     * @namespace window.nucleo.direccionamiento
     */
    return function importar() {
        for (var i=0; i<arguments.length; i++) {
            creaEspacioDeNombres(arguments[i].split('/'));
            
            var nodoScript  = document.createElement("script");
            nodoScript.type = "text/javascript";
            nodoScript.src  = arguments[i];
            
            document.querySelector('head').appendChild(nodoScript);
        }
    };
});
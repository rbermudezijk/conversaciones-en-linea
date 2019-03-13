'use strict';
(function (nucleo, window, carga) {

	var injectar = [
        window,
        window.location,
        nucleo.importar,
        nucleo.direccionamiento.Despachador
	];

	nucleo.direccionamiento.AnalizadorDeRutas = carga.apply(null, injectar);
}
)( nucleo, window,
function (window, location, importar, Despachador) {
    
    return new AnalizadorDeRutas();
    
    /** Constructor del ojeto HTTP Client. */
	function AnalizadorDeRutas() {
        
        
        function estArgumentos(enlace) {
            return enlace;
        }
        
		/** Definicion de servicios. */
    	function importarComponente() {
            
			var enlace    = location.hash.replace('#','').split('/');
			var modulo    = enlace.shift();
            var direccion = estArgumentos(enlace);
            
            console.log(modulo);
            console.log(direccion);
            
            importar(modulo+'/rutas.js', function () {
                var x = window[modulo];
                x.Rutas[0];
            });
            
            
            
            /* if (componente=='') {
				location.hash = 'conversaciones';
			} else {
				_despachador.cargarComponente(componente);
			}*/
    	};

        
        window.onhashchange = importarComponente;
	}
});
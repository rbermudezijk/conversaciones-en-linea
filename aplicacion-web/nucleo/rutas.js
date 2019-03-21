'use strict';
(function (global, rutas) {

	var importar = [
        global.aplicacion.nucleo.despachador
	];

	global.aplicacion.nucleo.rutas = rutas.apply(null, importar);

}) (window, function (_despachador) {

    return new Rutas();

    /** Constructor del ojeto HTTP Client. */
	function Rutas() {

		var self = this;

		/** Definicion de servicios. */
    	this.mostrar = function(){
			var componente = location.hash.replace('#','');
			
			if (componente==''){
				location.hash = 'conversaciones';
			}else {
				_despachador.cargarComponente(componente);
			}
    	};

		(function inicializa(){
			window.onhashchange = function () {
				self.mostrar();
			};
		})();

	}
});
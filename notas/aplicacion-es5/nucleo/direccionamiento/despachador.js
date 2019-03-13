'use strict';
(function (global, despachador) {

	var injectar = [
		global.aplicacion.componentes,
		global.aplicacion.servicios.sesion,
		new global.aplicacion.nucleo.http(),
	];
	
	global.aplicacion.nucleo.despachador = despachador.apply(null,injectar);

})(window, function (_componentes, _servSesion, _servHttp) {

	return new Despachador();

	function Despachador() {

		var plantillas = [];

		function plantilla(uri,html){
			this.uri=  uri;
			this.html= html;
		}
		
		function obtPlantilla(uri, fnCarga) {
			// var plantCmp = plantillas.find(function(p){p.uri===uri});
			
			// if(!plantCmp){
                _servHttp.obtenerScript(uri,fnCarga);
			// }else{
				// fnCarga(plantCmp.html);
			// }
		}
		
		function cargarAcciones(acciones) {
			acciones.forEach(function (accion) {
				var elem = this.querySelector(accion[0]);
				elem.addEventListener(accion[1],this[accion[2]]);
			}, this);
		}
		
		function injectaHtml(domElem,cadHtml){
			while (domElem.hasChildNodes()) {
	            domElem.removeChild(domElem.firstChild);
	        }
			domElem.innerHTML = cadHtml;
		}
		
		function inicComp(domElem, componente) {
			componente.call(domElem);
			cargarAcciones.call(domElem,componente.obtAcciones());
		}
		
		this.cargarComponente = function (claveComponente) {
			var
			 componente   = _componentes[claveComponente];
			
			if( componente.componenteProtegido()
			 && !_servSesion.existeSesion()){
				location.hash = 'acceso';
			} else {
				var
				 uriPlantilla = componente.obtUriPlantilla(),
				 selector     = componente.obtSelector(),
				 domElem      = document.querySelector(selector);
				
				obtPlantilla (
				  uriPlantilla,
				  function (html) {
					injectaHtml(domElem,html);
					inicComp(domElem,componente);
				  }
				);
			}
		};
	}
});
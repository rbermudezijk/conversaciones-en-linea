'use strict';
(function (global, ServicioCifrado) {
	
	global.aplicacion.servicios.cifrado = ServicioCifrado();
	
})(window, function () {
	return Cifrado;
	
	function Cifrado() {
		
		this.cifradoVernam = function (textoCifrado, clave) {
			var codClave, codText, resXor, textoDescifrado = '';

			for (var i=0; i<textoCifrado.length; i++) {
				codClave = clave.charCodeAt(i%clave.length);
				codText = textoCifrado.charCodeAt(i);
				resXor = codClave ^ codText;
				textoDescifrado += String.fromCharCode(resXor);
			}

			return textoDescifrado;
		};
		
		this.entidadesHtml = function (cad) {
			return cad.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
				return '&#'+i.charCodeAt(0)+';';
			});
		};

	}
})
'use strict';
(function(XMLHttpRequest){
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
    XMLHttpRequest.prototype.rsJson = function () {
        return JSON.parse(this.responseText);
    };
})(XMLHttpRequest);
'use strict';
ILI = console;
Object.defineProperty(
  ILI, 'registrar', { value: ILI.log }
);


function esFunción (objFn) {
    var resultado = typeof objFn === 'function';
    
    if (arguments.length == 2) {
        return resultado ? objFn : arguments[2];
    }
    
    return resultado;
}

/*
  Si(condición, fnSi () {
    
  })
  .Sino(condición, fnSiNo)
  .EnOtroCaso(fnEnOtroCaso),

  No(),
  Y(),
  O(),
  Ó(),
  paraCada(),
  para(),
  crearObjeto(),
  disparaConRetardo(),
  DisparaError(),
  SoloDeLectura()
*/

/**
 * @Archivo  Inicializa todos los componentes, módulos y submodulos de la  biblio-
 *           teca de trabajo "NUCLEO". 
 */
/** °, !*/

/**
 * @Constructor
 * 
 * @Nota No se pueden definir propiedades con el método Obejct.defineProperty,
         por la condición de utilizar métodos para establecer posteriormente esas
         propiedades.
 */ 
function ProcConcurrente (
    fnInicial, fnCorrecto,
    fnErroneo, fnFinal ) {
    
    this.fnCorrecto = esFunción(fnCorrecto, function(){});
    this.fnErroneo  = esFunción(fnErroneo,  function(){});
    this.fnFinal    = esFunción(fnFinal,    function(){});
    
    if (!esFunción(fnInicial))
        Error('Solo ingresar funciones.');
    
    setTimeout(fnInicial)
}

Object.defineProperty(
    ProcConcurrente.prototype, 'correcto', {
      value: function (fnCorrecto) {
          this.fnCorrecto = fnCorrecto;
          return this;
      }
    }
)

Object.defineProperty(
    ProcConcurrente.prototype, 'correcto', {
      value: function (fnCorrecto) {
          this.fnCorrecto = fnCorrecto;
          return this;
      }
    }
)
    
ProcConcurrente.prototype.error = function (fnError) {
      _procedimientoErroneo = fnError;
      return this;
    }
    
ProcConcurrente.prototype.finalizar = function (fnFinal) {
      _procedimientoFinal = fnFinal;
      return this;
    }
    
    
new ProcedimientoAsincrono(
  function () {
    crr('todo salió bien');
  }
)
.correcto(
  function (mensaje) { ILI.registrar(mensaje) }
)
.error(
  function (err) {
    ILI.registrar('Error durante la ejecución del procedimiento asíncrono');
  }
)
.finalizar(
  function () {
    ILI.registrar('Ejecución finalizada');
  }
)

new ProcedimientoAsincrono(
  function(crr,err){ ILI.registrar('Inicio')   },
  function(res)    { ILI.registrar('Correcto') },
  function(err)    { ILI.registrar('Error')    },
  function(ref)    { ILI.registrar('Finalizar')}
)
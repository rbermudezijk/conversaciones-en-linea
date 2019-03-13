'use strict';

/**
 * @file   Carga todos los scripts de la biblioteca o marco de trabajo.
 * @author Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
 * @since  f.e. 2018.04.04 c. Fecha de creación
 */

nucleo.importar(
    'nucleo/funciones-modernas/xhr-rsjson.js',
    'nucleo/funciones-modernas/array-find.js',
    'nucleo/funciones-modernas/array-foreach.js'
);

nucleo.importar(
    'nucleo/n-componente.js',
    'nucleo/modelos/error.js',
    'nucleo/http/modelos/http-control.js',
    'nucleo/http/http-cliente.js',
    'nucleo/direccionamiento/analizador-de-rutas.js'
);
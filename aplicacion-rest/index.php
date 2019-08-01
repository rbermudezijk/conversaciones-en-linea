<?php
  if ($_SERVER['REQUEST_METHOD']=='OPTIONS') {
    exit(0);
  }
/*
 * Por protocolo REST, una aplicación diseñada bajo esta arquitectura no
 * DEBE utilizar variables de sesión que afecten la ejecución en parale-
 * lo del servidor de aplicación.
 */
   session_write_close();
   
/**
 * Para los procesos que se ejecutan en tiempo real, es necesario noti-
 * car al servidor cuando el usuario ha cerrado los sockets para que no
 * mantenga en ejecución procesos innecesarios.
 */
   ignore_user_abort(false);

/**
 * El script se ejecutará indefinidamente mientras no  cumpla su tarea,
 * ideal para la apertura de sockets web(Ejecución de  aplicaciones con
 * procesos de tiempo real).
 */
   set_time_limit(0);
	
/**
 * Plantilla de inicio de la aplicación (Bootstrap API REST).
 * 
 * @author Ricardo Bermudez Bermudez <ricardob.sistemas@gmail.com>
 *
 * @link https://tools.ietf.org/html/rfc2616 Documentación oficial del protocolo HTTP.
 * @link https://docs.phpdoc.org Estandar de documentación de PHP PHPDoc.
 * @link http://manual.zfdes.com/es/coding-standard.coding-style.html#coding-standards.inline-documentation Estandar de codificación PHP.
 */
  include_once 'Nucleo/Direccionamiento.php';
  include_once 'Nucleo/AdmExcepciones.php';
  include_once 'Nucleo/BaseDeDatos.php';
  include_once 'Nucleo/Despachador.php';
  include_once 'Nucleo/Procesos.php';
 
  use Nucleo\Direccionamiento as Direccionamiento;
  use Nucleo\AdmExcepciones as AdmExcepciones;
  use Nucleo\Despachador as Despachador;

/**
 * Ejecuta la operación solicitada.
 *
 * 1. Obtiene la ruta del  componente  solicitado  a  partir  de  la  URL  de
 * solicitud recibida. [Direccionamiento::__construct()].
 *
 * 2. Carga la ruta del componente solicitado [Direccionamiento::obtRuta()].
 *
 * 3. Se  cargan  los  datos recibidos  en   la   solicitud   del   servidor.
 * [Despachador::__construct]
 *
 * 4. Se carga el script del componente solicitado  y  se  ejecuta  la acción
 * requerida. [Despachador::ejecutar()]
 * 
 * Nota: las excepciones son manejadas en AdmExcepciones::capturaExcepcion().
 */
  try {
    (new Despachador( (new Direccionamiento())->obtRuta() ))->ejecutar();
  } catch (\Exception $e) {
 	  (new AdmExcepciones())->capturaExcepcion($e);
  }
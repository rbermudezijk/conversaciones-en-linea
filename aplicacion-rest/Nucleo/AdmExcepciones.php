<?php
namespace Nucleo;

/*
 * Maneja  principal  de  las  excepciones  emitidas  durante  la ejecución del
 * componente solicitado.
 * 
 * @author   Ricardo Bermúdez Bermúdez <ricardob.sistemas@gmail.com>
 * @category Nucleo
 * @package  Nucleo
 */
class AdmExcepciones
{
	/*
	 * Transforma  una  excepción en formato JSON con el mensaje de error en el
	 * campo 'error'  y  el código de error como codigo HTTP que se envía en la
	 * respuesta del servidor.
	 * 
	 * @author Ricardo Bermúde Bermúdez <ricardob.sistemas@gmail.com>
	 * 
	 * @link https://tools.ietf.org/html/rfc2616#page-57 Referencia  oficial de
     *       codigos de estado del servidor HTTP.
	 */
    public function capturaExcepcion($e)
	{
		ob_get_clean();
		
		http_response_code($e->getCode());
		$respuesta = ['error'=>$e->getMessage()];
		echo json_encode($respuesta);
		exit(1);
	}
}
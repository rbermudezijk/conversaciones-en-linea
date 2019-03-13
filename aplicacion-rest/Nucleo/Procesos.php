<?php
/**
 * Clase definida para llevar el control de los procesos que son
 * ejecutados por el cliente.
 * 
 * @author Ricardo Bermudez Bermudez <ricardob.sistemas@gmail.com>
 */
class Procesos
{
	public static function procesoClienteActivo($seconds)
	{
		if ($seconds%5===0){
			echo ' ';
			flush();
			ob_flush();
			return !connection_aborted();
		}
		return true;
		
		if ($seconds%60===0) {
			echo ' ';
			flush();
			ob_flush();
			return !connection_aborted();
		}
		return true;
	}
}
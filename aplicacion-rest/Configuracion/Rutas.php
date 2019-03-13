<?php
return [
	'acceso'          => ['Acceso', 'validaCredenciales', 'publico'],
	'registro'        => ['Acceso', 'registraUsuario',    'publico'],
	'verificausuario' => ['Acceso', 'existeUsuario',      'publico'],
	'cierrasesion'    => ['Acceso', 'cierraSesion',       'protegido'],
	'usuarios'        => ['Chat',   'usuarios',           'protegido'],
	'mensajes'        => ['Chat',   'mensajes',           'protegido'],
];
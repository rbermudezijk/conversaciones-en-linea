SET character_set_server = 'utf8';

CREATE DATABASE proyecto_chat CHARACTER SET = 'utf8';
USE proyecto_chat;
FLUSH PRIVILEGES;

CREATE TABLE usuarios(
   id_usuario    INT UNSIGNED AUTO_INCREMENT,
   nombre        VARCHAR(80) NOT NULL,
   usuario       VARCHAR(16) NOT NULL,
   clave         VARCHAR(16) NOT NULL,
   f_conexion    datetime,
   f_desconexion datetime,
   e_conexion    boolean,
   ip            varchar(30),
   PRIMARY KEY(id_usuario),
   UNIQUE(usuario)
) CHARACTER SET = 'utf8';


CREATE TABLE mensajes(
	id_mensaje      INT AUTO_INCREMENT NOT NULL,
	id_usuario_de   INT UNSIGNED NOT NULL,
	id_usuario_para INT UNSIGNED NOT NULL,
	contenido       varchar(2000) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci',
    f_creacion      DATETIME DEFAULT CURRENT_TIMESTAMP,
	leido           BOOLEAN DEFAULT FALSE,
	ip_emision      varchar(30) NOT NULL,
	PRIMARY KEY(id_mensaje)
) CHARACTER SET = 'utf8';

CREATE USER chat@localhost IDENTIFIED BY 'chat-1234';
GRANT ALL PRIVILEGES ON proyecto_chat.* TO chat@localhost;
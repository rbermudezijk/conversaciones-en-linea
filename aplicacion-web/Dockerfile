#
# Autor: Ricardo Bermúdez Bermúdez
# Fecha: 13 de marzo del 2019
# Configuración de servidor de aplicación web
#
FROM httpd

#Se copia la aplicación web dentro de la imagen
WORKDIR /usr/local/apache2/htdocs/
ADD ./ ./

#Exposición del puerto 80, puerto por defecto para el servidor Apache.
EXPOSE 80
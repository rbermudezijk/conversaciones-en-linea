#
# Autor: Ricardo Bermúdez Bermúdez
# Fecha: 13 de marzo del 2019
# Configuración de servidor de aplicación web
#
FROM httpd

#Se añade a la imagen la configuración del alojamiento virtual.
COPY ./alojamiento-virtual.real.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf
RUN sed -i -e 's/^#\(Include .*httpd-vhosts.conf\)/\1/' conf/httpd.conf

#Se copia la aplicación dentro de la imagen
WORKDIR /usr/local/apache2/htdocs/
run mkdir mensajes.comunidad.com
ADD ./ ./mensajes.comunidad.com/
RUN rm ./mensajes.comunidad.com/*.conf

#Exposición del puerto 80
EXPOSE 80
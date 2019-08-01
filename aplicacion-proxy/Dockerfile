#
# Autor: Ricardo Bermúdez Bermúdez
# Fecha: 13 de marzo del 2019
# Configuración de servidor de aplicación web
#
FROM httpd

WORKDIR /usr/local/apache2/conf/

# Se liberan módulos requeridos para el correcto funcionamiento del balanceador
RUN sed -i -e 's/^#\(LoadModule\s.*proxy.*\)/\1/' httpd.conf

#Se añade a la imagen la configuración del proxy.
COPY ./proxy.conf extra/httpd-vhosts.conf
RUN sed -i -e 's/^#\(Include .*httpd-vhosts.conf\)/\1/' httpd.conf

# Modulos necesarios no mencionados
RUN sed -i -e 's/^#\(LoadModule slotmem_shm_module.*\)/\1/' httpd.conf
RUN sed -i -e 's/^#\(LoadModule xml2enc_module.*\)/\1/' httpd.conf
RUN sed -i -e 's/^#\(LoadModule watchdog_module.*\)/\1/' httpd.conf

# Tipo de balanceador
RUN sed -i -e 's/^#\(LoadModule lbmethod_byrequests_module.*\)/\1/' httpd.conf

#Exposición del puerto 80
EXPOSE 80
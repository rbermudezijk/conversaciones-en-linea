#
# Autor: Ricardo Bermúdez Bermúdez
# Fecha: 13 de marzo del 2019
# Configuración de servidor de aplicación web
#
FROM httpd

WORKDIR /usr/local/apache2/

#Se abren los módulos de apache necesarios para la ejecución del proxy.
RUN sed -i -e 's/^#\(LoadModule proxy_module.*\)/\1/' conf/httpd.conf
RUN sed -i -e 's/^#\(LoadModule proxy_ajp_module.*\)/\1/' conf/httpd.conf
RUN sed -i -e 's/^#\(LoadModule proxy_http_module.*\)/\1/' conf/httpd.conf

#Se añade a la imagen la configuración del proxy.
COPY ./proxy.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf
RUN sed -i -e 's/^#\(Include .*httpd-vhosts.conf\)/\1/' conf/httpd.conf

#Exposición del puerto 80
EXPOSE 80
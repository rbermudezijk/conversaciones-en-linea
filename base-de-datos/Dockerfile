FROM mariadb

# Ejemplo de variables de configuración.

# Usuario raíz.
ENV MYSQL_ROOT_PASSWORD 1234

# Usuario de applicación
ENV MYSQL_USER chat
ENV MYSQL_PASSWORD chat-1234

# Base de datos a de la aplicación.
ENV MYSQL_DATABASE proyecto_chat

# Carga del esquema de la Base de datos.
ADD ./Esquema.sql /docker-entrypoint-initdb.d

# Se expone el puerto 3306 que es el puerto por defecto del servidor de
# mysql/mariadb.
EXPOSE 3306
FROM mariadb

ENV MYSQL_ROOT_PASSWORD 1234
ENV MYSQL_USER chat
ENV MYSQL_PASSWORD chat-1234
ENV MYSQL_DATABASE proyecto_chat

ADD ./Esquema.sql /docker-entrypoint-initdb.d

EXPOSE 3306
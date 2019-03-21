FROM php:7.3.3-apache

WORKDIR /etc/apache2/mods-enabled
RUN ln -s ../mods-available/rewrite.load rewrite.load
RUN ln -s ../mods-available/headers.load headers.load

RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli

WORKDIR /var/www/html/
ADD ./ ./

EXPOSE 80
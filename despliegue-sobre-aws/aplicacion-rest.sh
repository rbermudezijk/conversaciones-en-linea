#!/bin/bash
#General update.
yum -y update

#General tools 
yum -y install initscripts
yum -y install net-tools
yum -y install wget
yum -y install git

#HTTP Server
yum -y install httpd

#PHP System
yum -y install php php-mysql

#Start HTTP - PHP server
systemctl start httpd.service

#Chat system
git clone https://github.com/rbermudezijk/conversaciones-en-linea.git
cp -a ./conversaciones-en-linea/aplicacion-rest/. /var/www/html
rm -rf conversaciones-en-linea
rm -f /var/www/html/Dockerfile
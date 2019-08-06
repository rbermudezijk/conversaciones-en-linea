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
#yum -y install php php-mysql
#sudo yum -y erase php php-pdo php-mysql php-common
#source: https://www.linuxtechi.com/install-php-7-centos-7-rhel-7-server/
yum -y install epel-release yum-utils
yum -y install http://rpms.remirepo.net/enterprise/remi-release-7.rpm
yum-config-manager --enable remi-php71
yum -y install php php-common php-opcache php-mcrypt php-cli php-gd php-curl php-mysql

#Chat system
git clone https://github.com/rbermudezijk/conversaciones-en-linea.git
cp -a ./conversaciones-en-linea/aplicacion-rest/. /var/www/html
rm -rf conversaciones-en-linea
rm -f /var/www/html/Dockerfile

#Give permissions to web system folder.
#Source: https://www.centos.org/forums/viewtopic.php?t=54246
echo -e '
<Directory "/var/www/html">
    Options Indexes FollowSymLinks ExecCGI
    AllowOverride All
    Allow from all
    Require all granted
</Directory>
' > /etc/httpd/conf.d/api.conf

chmod -R 755 /var/www/html
restorecon -R /var/www

# Use to enable external connections.
sudo setsebool -P httpd_can_network_connect 1

#Start HTTP - PHP server
systemctl start httpd
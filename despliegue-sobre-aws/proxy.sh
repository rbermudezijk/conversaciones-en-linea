#!/bin/bash
yum -y update
yum -y install httpd
yum -y install mod_proxy_html

#Apache configuration folder.
cd /etc/httpd/
#Enable watchdog_module
sed -i -e 's/^#\(LoadModule watchdog_module.*\)/\1/' conf.modules.d/00-base.conf

#Se añade a la imagen la configuración del proxy.
echo -e '
<VirtualHost *:80>
    ServerName api.servicio-de-mensajes.comunidad-c.com
    ProxyRequests off
    ProxyPreserveHost on

    <Location /balancer-admin>
        SetHandler balancer-manager
        Require all granted
    </Location>

    <Proxy balancer://cluster1>
        BalancerMember http://10.0.1.30:80/
        BalancerMember http://10.0.2.30:80/
        BalancerMember http://10.0.3.30:80/
        ProxySet lbmethod=byrequests
    </Proxy>

    ProxyPass /balancer-admin !
    ProxyPass "/" balancer://cluster1/
    ProxyPassReverse "/" balancer://cluster1/
</VirtualHost>' > conf.d/httpd-vhosts.conf

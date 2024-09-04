#!/bin/sh


set -eu

LC_ALL=C
ME=$( basename "$0" )
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

sed "s/\\[\\[NGINX_PORT\\]\\]/${NGINX_PORT:-80}/g"  -i /etc/nginx/conf.d/default.conf 

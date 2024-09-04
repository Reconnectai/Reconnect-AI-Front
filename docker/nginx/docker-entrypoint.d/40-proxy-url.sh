#!/bin/sh


set -eu

LC_ALL=C
ME=$( basename "$0" )
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

[ "${NGINX_PROXY_URL:-}" ] || exit 0


sed "s|\\[\\[NGINX_PROXY_URL\\]\\]|${NGINX_PROXY_URL}|g" -i /etc/nginx/conf.d/default.conf 

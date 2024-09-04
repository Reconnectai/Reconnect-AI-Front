#!/bin/sh


set -eu

LC_ALL=C
ME=$( basename "$0" )
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

[ "${NGINX_HOSTS_FIX:-}" ] || exit 0

echo "${NGINX_HOSTS_FIX:-}" | sed 's/,/\n/g;s/:/ /g' >> /etc/hosts
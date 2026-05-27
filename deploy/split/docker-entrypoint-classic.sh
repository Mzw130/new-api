#!/bin/sh
set -eu

BACKEND_NEW_API="${BACKEND_NEW_API:-http://1router.ai:3000}"
export BACKEND_NEW_API

envsubst '${BACKEND_NEW_API}' \
  < /etc/nginx/nginx.classic.conf.template \
  > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
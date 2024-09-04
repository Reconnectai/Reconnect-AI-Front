ARG DOCKER_NGINX_IMAGE=nginx:mainline-alpine
FROM ${DOCKER_NGINX_IMAGE}

ARG NGINX_CONF_DIR
COPY $NGINX_CONF_DIR/default.conf /etc/nginx/conf.d/default.conf
# Adding k8s startup in same pod
RUN mkdir -p /tmp/docker-entrypoint.d
COPY docker-entrypoint.d/* /tmp/docker-entrypoint.d/
RUN chmod +x /tmp/docker-entrypoint.d/* && mv /tmp/docker-entrypoint.d/* /docker-entrypoint.d && rm -rf /tmp/docker-entrypoint.d
WORKDIR /app
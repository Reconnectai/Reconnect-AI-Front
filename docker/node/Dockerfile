ARG  DOCKER_NODE_IMAGE=node:lts-alpine
FROM ${DOCKER_NODE_IMAGE} AS node-build
ARG  APPDIR=/app
RUN  mkdir -p           ${APPDIR}
COPY *.json             ${APPDIR}/
WORKDIR                 ${APPDIR}
RUN  npm                install
ADD  .                  ${APPDIR}/
ARG  BUILD_APP_ENV
RUN  echo "${BUILD_APP_ENV}" | base64 -d > ${APPDIR}/.env || TEST=1
RUN  cat .env
RUN  source .env
RUN  npm run build

FROM nginx:mainline-alpine AS nginx
COPY --from=node-build /app/build/ /var/www
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx"]
FROM --platform=${BUILDPLATFORM} alpine:3.16.0 as src
RUN apk add --no-cache ca-certificates
RUN wget -q -O - https://github.com/SanCraftDev/vokabel-trainer/archive/refs/heads/develop.tar.gz | tar zx
RUN mv /vokabel-trainer-* /vokabel-trainer
RUN rm -rf /vokabel-trainer/docker-compose.yml
RUN rm -rf /vokabel-trainer/config.json
RUN rm -rf /vokabel-trainer/Dockerfile
RUN rm -rf /vokabel-trainer/sprachen
RUN rm -rf /vokabel-trainer/LICENSE
RUN rm -rf /vokabel-trainer/README.md
RUN rm -rf /vokabel-trainer/.gitignore
RUN rm -rf /vokabel-trainer/.whitesource
RUN rm -rf /vokabel-trainer/.imgbotconfig
RUN rm -rf /vokabel-trainer/renovate.json

FROM --platform=${BUILDPLATFORM} httpd:2.4.54-alpine3.16
COPY --from=src /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=src /vokabel-trainer /usr/local/apache2/htdocs
ENTRYPOINT ["httpd"]
CMD ["-D", "FOREGROUND"]

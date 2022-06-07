FROM alpine:3.16.0 as src
RUN apk add --no-cache ca-certificates curl tar
RUN curl -L https://github.com/SanCraftDev/vokabel-trainer/archive/refs/heads/develop.tar.gz | tar zx
RUN mv /vokabel-trainer-* /vokabel-trainer

FROM httpd:2.4.53-alpine3.16
COPY --from=src /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=src /vokabel-trainer /usr/local/apache2/htdocs
ENTRYPOINT httpd
CMD -DFOREGROUND

FROM alpine as git
RUN apk add --no-cache ca-certificates git
RUN git clone --recursive https://github.com/SanCraftDev/vokabel-trainer /src

FROM httpd:2.4.53-alpine3.16
COPY --from=git /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=git /src /usr/local/apache2/htdocs

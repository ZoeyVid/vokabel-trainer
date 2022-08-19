FROM alpine:3.16.2 as src
RUN apk add --no-cache ca-certificates thttpd curl

RUN wget -q -O - https://github.com/SanCraftDev/vokabel-trainer/archive/refs/heads/develop.tar.gz | tar zx
RUN mv /vokabel-trainer-* /vokabel-trainer
RUN rm -rf /vokabel-trainer/docker-compose.yml
RUN rm -rf /vokabel-trainer/config.json
RUN rm -rf /vokabel-trainer/Dockerfile
RUN rm -rf /vokabel-trainer/sprachen
RUN rm -rf /vokabel-trainer/.github
RUN rm -rf /vokabel-trainer/README.md
RUN rm -rf /vokabel-trainer/.gitignore
RUN rm -rf /vokabel-trainer/.whitesource
RUN rm -rf /vokabel-trainer/.imgbotconfig
RUN rm -rf /vokabel-trainer/renovate.json

FROM scratch
COPY --from=src /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt

COPY --from=src /usr/sbin/thttpd /usr/local/bin/thttpd
COPY --from=src /lib/ld-musl-*.so.1 /lib/

COPY --from=src /usr/bin/curl /usr/local/bin/curl
COPY --from=src /usr/lib/libcurl.so.4 /usr/lib/libcurl.so.4
COPY --from=src /lib/libz.so.1 /lib/libz.so.1
COPY --from=src /usr/lib/libnghttp2.so.14 /usr/lib/libnghttp2.so.14
COPY --from=src /lib/libssl.so.1.1 /lib/libssl.so.1.1
COPY --from=src /lib/libcrypto.so.1.1 /lib/libcrypto.so.1.1
COPY --from=src /usr/lib/libbrotlidec.so.1 /usr/lib/libbrotlidec.so.1
COPY --from=src /usr/lib/libbrotlicommon.so.1 /usr/lib/libbrotlicommon.so.1

COPY --from=src /vokabel-trainer /var/www/vokabel-trainer

LABEL org.opencontainers.image.source="https://github.com/SanCraftDev/vokabel-trainer"
ENTRYPOINT ["thttpd"]
CMD ["-D", "-p", "80", "-d", "/var/www/vokabel-trainer"]

HEALTHCHECK CMD curl -skfI localhost || exit 1

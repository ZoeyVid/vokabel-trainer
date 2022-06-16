FROM alpine:3.16.0 as src

RUN apk add --no-cache ca-certificates thttpd
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
COPY --from=src /lib/ld-musl-* /lib/

COPY --from=src /vokabel-trainer /var/www/vokabel-trainer

ENTRYPOINT ["thttpd"]
CMD ["-D", "-p", "80", "-d", "/var/www/vokabel-trainer"]

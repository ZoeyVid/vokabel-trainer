FROM alpine:20221110
RUN apk upgrade --no-cache
RUN apk add --no-cache ca-certificates thttpd curl

RUN wget -q -O - https://github.com/SanCraftDev/vokabel-trainer/archive/refs/heads/develop.tar.gz | tar zx
RUN mv /vokabel-trainer-* /var/www/vokabel-trainer
RUN rm -rf /var/www/vokabel-trainer/docker-compose.yml
RUN rm -rf /var/www/vokabel-trainer/config.json
RUN rm -rf /var/www/vokabel-trainer/Dockerfile
RUN rm -rf /var/www/vokabel-trainer/sprachen
RUN rm -rf /var/www/vokabel-trainer/.github
RUN rm -rf /var/www/vokabel-trainer/README.md
RUN rm -rf /var/www/vokabel-trainer/.gitignore
RUN rm -rf /var/www/vokabel-trainer/.whitesource
RUN rm -rf /var/www/vokabel-trainer/.imgbotconfig
RUN rm -rf /var/www/vokabel-trainer/renovate.json

LABEL org.opencontainers.image.source="https://github.com/SanCraftDev/vokabel-trainer"
ENTRYPOINT ["thttpd"]
CMD ["-D", "-p", "80", "-d", "/var/www/vokabel-trainer"]

HEALTHCHECK CMD curl -skfI localhost || exit 1

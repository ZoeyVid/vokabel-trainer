FROM alpine:3.16.2 as src
RUN apk add --no-cache ca-certificates thttpd curl

RUN wget -q -O - https://github.com/SanCraftDev/vokabel-trainer/archive/refs/heads/develop.tar.gz | tar xz
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

RUN mkdir -p /var/www
RUN mv /vokabel-trainer /var/www/vokabel-trainer

LABEL org.opencontainers.image.source="https://github.com/SanCraftDev/vokabel-trainer"
ENTRYPOINT ["thttpd"]
CMD ["-D", "-p", "80", "-d", "/var/www/vokabel-trainer"]

HEALTHCHECK CMD curl -skfI localhost || exit 1

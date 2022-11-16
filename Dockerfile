FROM alpine:20221110 as build
RUN apk upgrade --no-cache
RUN apk add --no-cache ca-certificates wget git

RUN git clone --recursive https://github.com/SanCraftDev/vokabel-trainer /vokabel-trainer && \
    rm -rf /vokabel-trainer/docker-compose.yml && \
    rm -rf /vokabel-trainer/config.json && \
    rm -rf /vokabel-trainer/Dockerfile && \
    rm -rf /vokabel-trainer/sprachen && \
    rm -rf /vokabel-trainer/.github && \
    rm -rf /vokabel-trainer/.git && \
    rm -rf /vokabel-trainer/README.md && \
    rm -rf /vokabel-trainer/.gitignore && \
    rm -rf /vokabel-trainer/.whitesource && \
    rm -rf /vokabel-trainer/.imgbotconfig && \
    rm -rf /vokabel-trainer/renovate.json

FROM alpine:20221110
COPY --from=build /vokabel-trainer /var/www/vokabel-trainer
RUN apk upgrade --no-cache
RUN apk add --no-cache ca-certificates wget thttpd

LABEL org.opencontainers.image.source="https://github.com/SanCraftDev/vokabel-trainer"
ENTRYPOINT ["thttpd"]
CMD ["-D", "-p", "80", "-d", "/var/www/vokabel-trainer"]

HEALTHCHECK CMD wget -q localhost -O /dev/null || exit 1

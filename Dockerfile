FROM alpine:20221110 as build
RUN apk upgrade --no-cache
RUN apk add --no-cache ca-certificates wget tzdata git

RUN git clone --recursive https://github.com/SanCraftDev/vokabel-trainer /vokabel-trainer

FROM alpine:20221110
COPY --from=build /vokabel-trainer /var/www/vokabel-trainer
RUN apk upgrade --no-cache && \
    apk add --no-cache ca-certificates wget tzdata thttpd

LABEL org.opencontainers.image.source="https://github.com/SanCraftDev/vokabel-trainer"
ENTRYPOINT ["thttpd"]
CMD ["-D", "-p", "80", "-d", "/var/www/vokabel-trainer"]

HEALTHCHECK CMD wget -q localhost -O /dev/null || exit 1

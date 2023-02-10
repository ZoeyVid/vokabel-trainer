FROM alpine:3.17.1
RUN apk upgrade --no-cache && \
    apk add --no-cache ca-certificates wget tzdata thttpd
ADD https://github.com/ZoeyVid/vokabel-trainer /var/www/vokabel-trainer

ENTRYPOINT ["thttpd", "-D", "-p", "80", "-d", "/var/www/vokabel-trainer"]
HEALTHCHECK CMD wget -q --no-check-certificate localhost -O /dev/null || exit 1

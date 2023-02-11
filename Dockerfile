FROM alpine:3.17.2
RUN apk upgrade --no-cache && \
    apk add --no-cache ca-certificates tzdata thttpd
ADD https://github.com/ZoeyVid/vokabel-trainer /var/www/vokabel-trainer

ENTRYPOINT ["thttpd", "-D", "-p", "80", "-d", "/var/www/vokabel-trainer"]
HEALTHCHECK CMD wget -qS http://localhost:80 -O /dev/null || exit 1

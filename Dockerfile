FROM alpine:20221110
COPY . /var/www/vokabel-trainer
RUN apk upgrade --no-cache && \
    apk add --no-cache ca-certificates wget tzdata thttpd

ENTRYPOINT thttpd -D -p 80 -d /var/www/vokabel-trainer
HEALTHCHECK CMD wget -q --no-check-certificate localhost -O /dev/null || exit 1

FROM alpine:3.18.4
RUN apk add --no-cache ca-certificates tzdata tini thttpd
COPY . /var/www/vokabel-trainer

ENTRYPOINT ["tini", "--", "thttpd", "-D", "-p", "80", "-d", "/var/www/vokabel-trainer"]
HEALTHCHECK CMD wget -q http://localhost:80 -O /dev/null || exit 1

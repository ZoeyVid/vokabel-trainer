FROM alpine:20221110 as build
RUN apk upgrade --no-cache
RUN apk add --no-cache ca-certificates wget tzdata git

RUN git clone --recursive https://github.com/SanCraftDev/vokabel-trainer /vokabel-trainer

FROM alpine:20221110
COPY --from=build /vokabel-trainer /var/www/vokabel-trainer
RUN apk upgrade --no-cache && \
    apk add --no-cache ca-certificates wget tzdata thttpd

ENTRYPOINT thttpd -D -p 80 -d /var/www/vokabel-trainer
HEALTHCHECK CMD wget -q --no-check-certificate localhost -O /dev/null || exit 1

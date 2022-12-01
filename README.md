# vokabel-trainer
Ein Vokabel Trainer

## compose.yaml file:

```yaml
version: "3"
services:
  vokabel-trainer:
    container_name: vokabel-trainer
    image: zoeyvid/vokabel-trainer:latest
    restart: always
    ports:
       - 127.0.0.1:8456:80
    volumes:
       - /opt/vokabel-trainer/sprachen:/usr/local/apache2/htdocs/sprachen:ro
       - /opt/vokabel-trainer/config.json:/usr/local/apache2/htdocs/config.json:ro
```

# Hello Compose!
---
## 1. Basic commands
* compose up
    ```sh
    docker-compose up -d # --build
    ```

* compose down
    ```sh
    docker-compose down
    ```

* check status
    ```sh
    docker-compose ps -a
    docker-compose logs # -f -> keep watching
    ```

* execute command
    ```sh
    # docker-compose exec {service_name} {command}
    docker-compose exec app /bin/sh
    ```
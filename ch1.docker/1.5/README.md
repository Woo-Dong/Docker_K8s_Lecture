# Dockerfile & Build
---
## 1. nginx container build
* build image
    ```sh
    docker build -t nginx-img nginx
    ```

* run nginx container
    ```sh
    docker run -d -p 8080:80 --name nginx-container nginx-img
    ```

* check network bridge status
    ```sh
    docker network inspect bridge # nginx-container IP = 172.17.0.2
    ```

## 2. ubuntu container build
* build image
    ```sh
    docker build -t ubuntu-img ubuntu
    ```

* run ubuntu container
    ```sh
    docker run -d -i --name ubuntu-container ubuntu-img
    docker exec -it ubuntu-container bash curl {nginx-container ip} # curl 172.17.0.2
    ```
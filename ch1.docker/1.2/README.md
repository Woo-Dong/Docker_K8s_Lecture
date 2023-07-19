# Basic command – Manage Image resources
---
## 1. image list
* docker images
    ```sh
    docker images
    ```

## 2. get image from DockerHub
* docker pull
    ```sh
    docker pull nginx # nginx:latest
    ```

## 3. delete image
* docker rmi
    ```sh
    docker rmi nginx # nginx:latest
    ```

* delete all images
    ```sh
    docker rmi $(docker images -aq)
    ```

## 4. push image
* docker push
    ```sh
    docker login
    docker push {YOUR_CUSTOM_IMAGE}:{TAG}
    ```
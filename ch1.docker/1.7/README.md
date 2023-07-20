# Assignment 1: `Dockerizing` HTTP API Web Server

## 1. build and run app-container

- build image

  ```sh
  docker build -t app-img app
  ```

- run app-container

  ```sh
  docker run -d --name app-container app-img
  ```

- check app-container network IP address
  ```sh
  docker network inspect bridge # IP address of container = 172.17.0.2
  ```

## 2. Set nginx-container

- edit `Dockerfile` of nginx -> API_HOST, API_PORT

  ```sh
  FROM nginx:latest

  # edit Environment variables
  ENV API_HOST=172.17.0.2
  ENV API_PORT=3000

  ...
  ```

- build and run nginx-container
  ```sh
  docker build -t nginx-img nginx
  docker run -d -p 8080:80 --name nginx-container nginx-img
  ```

## 3. visit website `http://localhost:8080` and check `prod mode!!`

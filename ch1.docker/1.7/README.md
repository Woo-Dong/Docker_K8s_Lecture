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
  docker network inspect bridge # IP address of container = XXX.XX.X.X
  ```

## 2. Set nginx-container

- edit `Dockerfile` of nginx -> API_HOST, API_PORT

  ```sh
  FROM nginx:latest

  # edit Environment variables
  ENV API_HOST=XXX.XX.X.X
  ENV API_PORT=XXXX

  ...
  ```

- build and run nginx-container
  ```sh
  docker build -t nginx-img nginx
  docker run -d -p XXXX:XXXX --name nginx-container nginx-img
  ```

## 3. visit website `http://localhost:8080` and check `prod mode!!`

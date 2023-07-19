# Port, Volume setting

---

## 1. Port forwarding

- `-p` : {host_port}:{container_port}

- docker run
  ```sh
  docker run -d -p 80:80 --name nginx-container nginx
  docker run -d -p 8080:80 --name nginx-container nginx
  ```

## 2. Volume Mounting

- `-v` : {host_volume}:{container_volume}

- docker run
  ```sh
  docker run -d \
      -p 8080:80 \
      -v $(pwd)/index.html:/usr/share/nginx/html/index.html \
      --name nginx-container nginx
  ```

## 3. Network concept

- 1. Run nginx container

  ```sh
  docker run -d --name -p 8080:80 nginx-container nginx
  ```

- 2. Get Network info of `nginx-container`

  ```sh
  docker network inspect bridge
  # {nginx-container ip}='172.17.0.2'
  ```

- 2. Run linux(alpine) container

  ```sh
  # in host
  docker run -d -i --name alpine-container alpine

  # in alpine-container
  docker exec -it alpine-container sh
  wget {nginx-container ip} # wget 172.17.0.2
  cat index.html
  exit
  ```

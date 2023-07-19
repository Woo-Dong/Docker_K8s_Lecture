# Basic command – Manage Container resources

---

## 1. container list

- docker ps
  ```sh
  docker ps -a
  docker ps -aq # show container's ID
  ```

## 2. run container

- `-d` : 백그라운드에서 실행
- `--name` : container 이름
- docker run

  ```sh
  docker run --name nginx-container nginx
  docker run -d --name nginx-container nginx
  docker run -d -p 80:80 --name nginx-container nginx
  ```

- docker start/restart
  ```sh
  docker start nginx-container
  docker restart nginx-container
  ```

## 3. stop/remove container

- docker stop

  ```sh
  docker stop nginx-container
  ```

- stop all containers

  ```sh
  docker stop $(docker ps -aq)
  ```

- docker rm

  ```sh
  docker rm nginx-container
  ```

- remove all containers
  ```sh
  docker rm $(docker ps -aq)
  ```

## 4. execute command

- docker exec
  ```sh
  docker exec -it nginx-container bash
  # in nginx-container
  echo "hello" > /usr/share/nginx/html/index.html
  exit
  ```

## 5. show logs of container

- docker logs
  ```sh
  docker logs nginx-container
  ```

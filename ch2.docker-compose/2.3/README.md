# Assignment 2: `Composing` Micro Service Loadbalancing

* TODO
    1. docker-compose.yaml 작성
        * services list
            - express-app-container (3000 port, 외부 접근x)
            - flask-app-container   (5000 port, 외부 접근x)
            - nginx-container       (8080 port, 외부 접근o)

    2. `./express-app`, `./flaskapp` 폴더 내 파일은 수정하지 마세요.

    3. `express-app-container` 컨테이너는 `prod.js`이 실행되어야 합니다. (command: `npm run start:prod`)

    4.  `./nginx/nginx.conf` 파일의 `upstream` 부분만 수정하세요

---
* TEST
    1. docker-compose up
        ```sh
        docker-compose up -d --build
        ```
    2. Visit website `http://localhost:8080` and refresh
        ```text
        response from Express APP!!!
        response from Flask APP!!!
        response from Express APP!!!
        ...
        ```

    3. docker-compose down
        ```sh
        docker-compose down
        ```
    
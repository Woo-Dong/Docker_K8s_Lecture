# Assignment 3 : `Kuberizing` Micro Service Loadbalancing

* TODO
    1. Deployment & Service resources 작성
        * Deployment list
            - express-app
            - flask-app
            - nginx-app
        * Service list
            - express-app-service   (3000 port, 외부접근x)
            - flask-app-service     (5000 port, 외부접근x)
            - nginx-app-service     (30005 port, 외부접근o)
    
    2. `./nginx/nginx.conf` 파일의 `upstream` 부분만 수정하세요

---
* TEST
    1. Build images
        ```sh
        docker-compose build
        ```
    2. Apply Deployment & Service
        ```sh
        k apply -f .
        ```

    3. Visit website `localhost:30005` and refresh
        ```text
        response from Flask APP - flask-app-deploy-5dc7b77dbc-swpkv!!!
        response from Express APP - express-app-deploy-659849d7fd-5fqz6!!!
        response from Express APP - express-app-deploy-659849d7fd-b267d!!!
        response from Flask APP - flask-app-deploy-5dc7b77dbc-f4qpt!!!
        ...
        ```
    
    4. Apply Deployment & Service
        ```sh
        k delete -f .
        ```
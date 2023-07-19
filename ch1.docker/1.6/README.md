# ENTRYPOINT & CMD
---
## 1. ENTRYPOINT default setting
* build image
    ```sh
    docker build -t app-img app
    ```

* Run container
    ```sh
    docker run -d -p 3000:3000 --name app-container -t app-img start:dev # dev mode!!
    docker run -d -p 3000:3000 --name app-container -t app-img start:prod # prod mode!!
    ```

## 2. ENTRYPOINT & CMD

* edit Dockerfile
    ```Dockerfile
    ...

    ENTRYPOINT ["npm", "run"]
    CMD ["start:dev"]
    ```

* build image
    ```sh
    docker build -t app-img app
    ```

* Run container
    ```sh
    docker run -d -p 3000:3000 --name app-container -t app-img # dev mode!!
    docker run -d -p 3000:3000 --name app-container -t app-img start:prod # prod mode!!
    ```

## 3. CMD default setting

* edit Dockerfile
    ```Dockerfile
    ...

    CMD ["npm", "run", "start:dev"]
    ```

* build image
    ```sh
    docker build -t app-img app
    ```

* Run container
    ```sh
    docker run -d -p 3000:3000 --name app-container -t app-img # dev mode!!
    docker run -d -p 3000:3000 --name app-container -t app-img npm run start:prod # prod mode!!
    ```
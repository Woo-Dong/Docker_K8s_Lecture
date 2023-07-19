# Single Cluster Web Application
---
## 1. Docker (local) image build
* Build `docker-compose` at once
    ```sh
    docker-compose build
    ```

## 2. Deploy pod and service
* kubectl apply
    ```sh
    k apply -f deployment.yaml
    k apply -f service.yaml
    ```

* check web site `http://localhost:8080`

## 3. Delete resources
* kubectl delete
    ```sh
    k delete -f deployment.yaml
    k delete -f service.yaml
    ```
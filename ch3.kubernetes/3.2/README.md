# Expose Service
---
## 1. Port-forwarding
* Run `pod`
    ```sh
    k run nginx --image=nginx
    ```

* kubectl port-forward 
    ```sh
    k port-forward --address 0.0.0.0 nginx 8080:80
    sudo -E k port-forward --address 0.0.0.0 nginx 80:80
    sudo -E k port-forward --address 0.0.0.0 nginx 80:80 & # run background
    ```

* Terminate background process
    ```sh
    ps -ef # get pid of the port-forwarding process
    sudo kill {pid}
    ```

## 2. NodePort Service
* Apply `deployment` and `service`
    ```sh
    k apply -f nodeport.yaml
    ```

* Check `service` status
    ```sh
    # k get svc
    k get services
    ```

* Visit the website `localhost:30000`

* Delete resources
    ```sh
    k delete -f nodeport.yaml
    ```

## 3. Loadbalancer Service
* Apply `deployment` and `service`
    ```sh
    k apply -f loadbalancer.yaml
    ```

* Check `service` status
    ```sh
    k get svc
    ```

* Visit the website `localhost`

* Delete resources
    ```sh
    k delete -f loadbalancer.yaml
    ```
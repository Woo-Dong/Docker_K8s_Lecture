# Hello Kube!
---
## 1. Run container in Kubernetes
* Run `pod`
    ```sh
    # alias k=kubectl
    k run nginx --image=nginx
    ```

* get `pod` list 
    ```sh
    k get pods [-A] [-o wide] [-w]
    k get po 
    ```

* Create `deployment`
    ```sh
    k create deployment nginx --image=nginx 
    k scale deployment nginx --replicas=3 
    ```

* get `deployment` list 
    ```sh
    k get deployments [-A]
    k get deploy [-A]
    ```

* Delete reources
    ```sh
    k delete pod nginx
    k delete deploy nginx
    ```

## 2. Apply `yaml` format

* Get yaml format
    ```sh
    k run nginx --image=nginx -o yaml --dry-run=client
    k create deploy nginx --image=nginx --replicas=3 -o yaml --dry-run=client
    ```

* kubectl apply
    ```sh
    k apply -f apply-nginx.yaml
    ```

* kubectl exec
    ```sh
    k exec apply-nginx-98fb54688-n7gdm -it -- /bin/bash
    ```

* kubectl edit
    ```sh
    k edit deploy apply-nginx
    # vi replicas=1
    k get po
    ```
* kubectl delete
    ```sh
    k delete -f apply-nginx.yaml
    ```
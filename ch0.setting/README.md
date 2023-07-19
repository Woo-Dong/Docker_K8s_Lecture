# ch0. Docker & Docker-compose & Kubernetes Setting (Ubuntu 20.04)
## 1. Docker Setting
1. Run shell script
    ```sh
    chmod +x 00_docker_install.sh
    ./00_docker_install.sh
    ```

2. test docker command
    ```sh
    sudo docker --version
    sudo docker ps -a
    docker ps -a # 섹션 종료 후 재접속 시 sudo 명령어 생략 가능함
    ```

## 2. Docker-compose Setting 
1. Run shell script
    ```sh
    # pre-requisites: docker installed
    chmod +x 01_docker-compose_install.sh
    ./01_docker-compose_install.sh
    ```

2. test docker command
    ```sh
    docker-compose --version
    docker-compose ps -a
    ```

## 3. Kubernetes Setting
1. Install Docker, Kubectl, Kubelet, Kubeadm and envrionment setting
    - Run shell script
        ```sh
        chmod +x 02_k8s_install.sh
        ./02_k8s_install.sh
        ```

    - test kubectl, kubelet, kubeadm
        ```sh
        kubectl version
        kubeadm version
        kubelet --version
        ```

2. Init Cluster and Join nodes
   - [on Master Node] Initialize Kubernetes Cluster
        ```sh
        sudo hostnamectl set-hostname {MASTER_HOST_NAME}

        # Vanilla Cluster ( 1 Master Node + N Worker Node )
        # sudo kubeadm init \
        #  --pod-network-cidr=10.244.0.0/16 \
        #   --kubernetes-version=v1.24.9

        sudo kubeadm init \
        --control-plane-endpoint={YOUR_ELB_SUB_DOMAIN}.elb.ap-northeast-2.amazonaws.com \
        --upload-certs \
        --pod-network-cidr=10.244.0.0/16 \
        --kubernetes-version=v1.24.9

        mkdir -p $HOME/.kube
        sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
        sudo chown $(id -u):$(id -g) $HOME/.kube/config
        ```
  
    - [on the other Master Nodes] Joinng the cluster
        ```sh
        sudo kubeadm join --control-plane-endpoint={YOUR_ELB_SUB_DOMAIN}.elb.ap-northeast-2.amazonaws.com \
            --token xxxx.xxxxxx \
            --discovery-token-ca-cert-hash sha256:xxxxxxxx \
            --control-plane \
            --certificate-key xxxxxxxx
        ```


3. Join Worker Node with the Cluster
    - [on Worker Node] Join
        ```sh
        sudo hostnamectl set-hostname {WORKER_HOST_NAME}
        
        sudo kubeadm join {YOUR_ELB_SUB_DOMAIN}.elb.ap-northeast-2.amazonaws.com:6443 \
        --token xxxx.xxxxxxxx \
        --discovery-token-ca-cert-hash sha256:xxxxxxxxxxxxxxxxxx
        ```
    - [on Master Node] Label Worker Node's Role
        ```sh
        kubectl label node {WORKER_HOST_NAME} node-role.kubernetes.io/worker=worker
        ```
    
4. (Optional) GPU Worker Node - Install Nvidia Driver, nvidia-docker2

    - [on Master Node] Deploy nvidia device plugin daemonset at each node
        ```sh
        kubectl create -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/v0.13.0/nvidia-device-plugin.yml
        ```

    - [on Worker Node] Install Nvidia Driver
        ```sh
        sudo apt install nvidia-driver-515 -y
        sudo reboot # It will be disconnected and takes serveral times to reboot itself.
        ```
    - [on Worker Node] Check nvidia driver is successfully installed
        ```sh
        nvidia-smi
        ```

    - [on Worker Node] Install nvidia-docker2 and set default runtime as nvidia-container-runtime
        ```sh
        chmod +x 03_worker_gpu_nvidia_docker.sh
        ./03_worker_gpu_nvidia_docker.sh # type Y
        ```

    - [on Worker Node] Set containerd config and reboot

    - [on Worker Node] make a config file on `/etc/containerd/config.toml`
        ```toml
        version = 2
        [plugins]
        [plugins."io.containerd.grpc.v1.cri"]
            [plugins."io.containerd.grpc.v1.cri".containerd]
            default_runtime_name = "nvidia"

            [plugins."io.containerd.grpc.v1.cri".containerd.runtimes]
                [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.nvidia]
                privileged_without_host_devices = false
                runtime_engine = ""
                runtime_root = ""
                runtime_type = "io.containerd.runc.v2"
                [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.nvidia.options]
                    BinaryName = "/usr/bin/nvidia-container-runtime"
        ```

    - [on Worker Node] restart containerd service and reboot
        ```sh
        sudo systemctl restart containerd
        sudo reboot
        ```

    - [on Master Node] Check GPU avilable on k8s cluster
        ```sh
        kubectl get nodes "-o=custom-columns=NAME:.metadata.name,GPU:.status.allocatable.nvidia\.com/gpu"
        ```

5. CNI Driver - Flannel
    - on Master Node
        ```sh
        kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
        ```

6. PV, PVC, Provisioner using Amazon EFS(Elastic File System)
    - IAM Policy for accessing Amazon EFS
        ```json
        {
        "Version": "2012-10-17",
        "Statement": [
            {
            "Effect": "Allow",
            "Action": [
                "elasticfilesystem:DescribeAccessPoints",
                "elasticfilesystem:DescribeFileSystems",
                "elasticfilesystem:DescribeMountTargets",
                "ec2:DescribeAvailabilityZones"
            ],
            "Resource": "*"
            },
            {
            "Effect": "Allow",
            "Action": [
                "elasticfilesystem:CreateAccessPoint"
            ],
            "Resource": "*",
            "Condition": {
                "StringLike": {
                "aws:RequestTag/efs.csi.aws.com/cluster": "true"
                }
            }
            },
            {
            "Effect": "Allow",
            "Action": [
                "elasticfilesystem:TagResource"
            ],
            "Resource": "*",
            "Condition": {
                "StringLike": {
                "aws:ResourceTag/efs.csi.aws.com/cluster": "true"
                }
            }
            },
            {
            "Effect": "Allow",
            "Action": "elasticfilesystem:DeleteAccessPoint",
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                "aws:ResourceTag/efs.csi.aws.com/cluster": "true"
                }
            }
            }
        ]
        }
        ```
    - [on Master Node] rbac, sc, deployment, etc
        ```sh
        kubectl apply -f efs-provisioner.yaml # required setting default storageclass(EFS dns) info
        ```

    - (optional) [on Master Node] mounting Amazon EFS on Amazon EC2 at the path, `/mnt/efs`
        * 
        ```sh
        # pre-requisites: setting aws-cli configure
        sudo apt-get -y install binutils
        git clone https://github.com/aws/efs-utils
        cd ./efs-utils
        ./build-deb.sh
        sudo apt-get -y install ./build/amazon-efs-utils*deb
        sudo mkdir -p /mnt/efs
        sudo mount -t efs -o tls,iam fs-xxxxxx.efs.ap-northeast-2.amazonaws.com /mnt/efs/
        ```

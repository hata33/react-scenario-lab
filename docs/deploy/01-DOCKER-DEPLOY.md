# Docker 部署指南

本文档介绍如何使用 Docker 构建镜像并部署 React Scenario Lab 项目到服务器。

## 前提条件

- 本地环境安装 [Docker](https://docs.docker.com/get-docker/)
- 服务器环境安装 [Docker](https://docs.docker.com/get-docker/)
- 服务器环境安装 [Docker Compose](https://docs.docker.com/compose/install/)

## 构建镜像并部署到服务器

### 1. 构建 Docker 镜像

在项目根目录下运行以下命令构建镜像：

```bash
# 构建镜像并标记版本
docker build -t react-scenario-lab:latest .
```

### 2. 保存镜像为文件（用于传输）

```bash
# 将镜像保存为 tar 文件
docker save -o react-scenario-lab.tar react-scenario-lab:latest
```

### 3. 将镜像文件传输到服务器

```bash
# 使用 scp 传输镜像文件到服务器
scp react-scenario-lab.tar username@your-server-ip:/path/to/destination/

# 或使用其他文件传输工具
```

### 4. 在服务器上加载镜像

SSH 登录到服务器后执行：

```bash
# 加载镜像
docker load -i /path/to/destination/react-scenario-lab.tar
```

### 5. 在服务器上运行容器

```bash
# 创建并运行容器
docker run -d --name react-scenario-lab -p 8002:8002 react-scenario-lab:latest
```

### 6. 使用 Docker Compose 部署（推荐）

将 docker-compose.yml 文件传输到服务器：

```bash
scp docker-compose.yml username@your-server-ip:/path/to/destination/
```

在服务器上使用 Docker Compose 启动服务：

```bash
cd /path/to/destination/
docker-compose up -d
```

## 镜像管理命令

### 查看本地镜像

```bash
docker images
```

### 标记镜像（用于推送到镜像仓库）

```bash
docker tag react-scenario-lab:latest your-registry.com/username/react-scenario-lab:latest
```

### 推送镜像到 Docker Hub 或私有仓库

```bash
# 登录到 Docker Hub 或私有仓库
docker login your-registry.com

# 推送镜像
docker push your-registry.com/username/react-scenario-lab:latest
```

### 从镜像仓库拉取镜像（在服务器上）

```bash
docker pull your-registry.com/username/react-scenario-lab:latest
```

## 容器管理命令

### 查看运行中的容器

```bash
docker ps
```

### 查看容器日志

```bash
docker logs -f react-scenario-lab
```

### 停止容器

```bash
docker stop react-scenario-lab
```

### 重启容器

```bash
docker restart react-scenario-lab
```

### 删除容器

```bash
docker rm -f react-scenario-lab
```

## 配置说明

- 应用运行在端口 8002 上
- 容器会自动重启（restart: always）
- 包含健康检查，确保应用正常运行

## 生产环境最佳实践

- 使用环境变量文件 (.env) 管理敏感信息
- 配置 HTTPS 以确保安全通信
- 考虑使用 Docker Swarm 或 Kubernetes 进行集群部署
- 设置监控和日志收集系统
- 实施自动备份策略
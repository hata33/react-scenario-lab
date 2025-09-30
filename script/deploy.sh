#!/bin/bash

# 配置参数（可根据实际情况修改）
IMAGE_NAME="react-scenario-lab"
TAG="latest"
TAR_FILE="react-scenario-lab.tar"  # 镜像 tar 文件路径（若需从指定路径加载，可改为绝对路径如 /data/$TAR_FILE）
CONTAINER_NAME="react-scenario-lab"
PORT_MAP="8000:3000"  # 端口映射（宿主端口:容器端口）

# 打印信息函数
info() {
    echo -e "\033[36m[INFO] $1\033[0m"
}

# 成功信息函数
success() {
    echo -e "\033[32m[SUCCESS] $1\033[0m"
}

# 错误信息函数并退出
error() {
    echo -e "\033[31m[ERROR] $1\033[0m"
    exit 1
}

# 1. 检查并创建上传目录
UPLOADS_DIR="./uploads"
TEMP_DIR="./temp"

info "Checking and creating upload directories..."
if [ ! -d "$UPLOADS_DIR" ]; then
    info "Creating uploads directory: $UPLOADS_DIR"
    mkdir -p "$UPLOADS_DIR" || error "Failed to create uploads directory: $UPLOADS_DIR"
    success "Uploads directory created: $UPLOADS_DIR"
else
    info "Uploads directory already exists: $UPLOADS_DIR"
fi

if [ ! -d "$TEMP_DIR" ]; then
    info "Creating temp directory: $TEMP_DIR"
    mkdir -p "$TEMP_DIR" || error "Failed to create temp directory: $TEMP_DIR"
    success "Temp directory created: $TEMP_DIR"
else
    info "Temp directory already exists: $TEMP_DIR"
fi

# 设置目录权限，确保容器内用户可以写入
info "Setting directory permissions..."
chmod 777 "$UPLOADS_DIR" "$TEMP_DIR" || error "Failed to set directory permissions"
success "Directory permissions set successfully"

# 2. 检查镜像 tar 文件是否存在（如果需要加载新镜像）
if [ ! -f "$TAR_FILE" ]; then
    error "Image tar file not found: $TAR_FILE. Please check the path."
fi

# 3. 停止并移除旧容器（无论是否存在）
info "Stopping and removing existing container: $CONTAINER_NAME"
if docker ps -a --format '{{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
    # 停止容器
    if ! docker stop "$CONTAINER_NAME"; then
        error "Failed to stop container $CONTAINER_NAME"
    fi
    # 移除容器
    if ! docker rm "$CONTAINER_NAME"; then
        error "Failed to remove container $CONTAINER_NAME"
    fi
    info "Old container $CONTAINER_NAME removed successfully"
else
    info "No existing container named $CONTAINER_NAME, skipping removal"
fi

# 4. 加载新镜像（覆盖现有镜像）
info "Loading new image from $TAR_FILE..."
if ! docker load -i "$TAR_FILE"; then
    error "Failed to load image from $TAR_FILE"
fi
success "Image $IMAGE_NAME:$TAG loaded successfully"

# 5. 启动新容器
info "Starting new container: $CONTAINER_NAME"
if ! docker run -d \
    --name "$CONTAINER_NAME" \
    -p "$PORT_MAP" \
    -v "$(pwd)/uploads:/app/uploads" \
    -v "$(pwd)/temp:/app/temp" \
    "$IMAGE_NAME:$TAG"; then
    error "Failed to start container $CONTAINER_NAME"
fi

success "Deployment completed! Container $CONTAINER_NAME is running on port ${PORT_MAP%:*}"
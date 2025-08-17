# Docker 环境变量配置说明

## 环境变量文件

### 1. env.example
这是环境变量的模板文件，包含了所有可配置的环境变量及其说明。

### 2. .env
这是实际的环境变量文件，你需要基于 `env.example` 创建这个文件。

## 创建 .env 文件

复制 `env.example` 文件并重命名为 `.env`：

```bash
cp env.example .env
```

然后根据你的实际需求修改 `.env` 文件中的值。

## 主要环境变量说明

### 应用配置
- `APP_NAME`: 应用名称，默认为 `react-scenario-lab`
- `NODE_ENV`: 运行环境，默认为 `production`

### 端口配置
- `HOST_PORT`: 宿主机端口，默认为 `8002`
- `CONTAINER_PORT`: 容器内部端口，默认为 `3000`

### 网络配置
- `HOSTNAME`: 容器监听地址，默认为 `0.0.0.0`

### Next.js 配置
- `NEXT_TELEMETRY_DISABLED`: 禁用 Next.js 遥测，默认为 `1`

### 健康检查配置
- `HEALTH_CHECK_INTERVAL`: 健康检查间隔，默认为 `30s`
- `HEALTH_CHECK_TIMEOUT`: 健康检查超时时间，默认为 `10s`
- `HEALTH_CHECK_RETRIES`: 健康检查重试次数，默认为 `3`
- `HEALTH_CHECK_START_PERIOD`: 健康检查启动等待时间，默认为 `20s`

## 使用方法

1. 确保 `.env` 文件存在于项目根目录
2. 运行 Docker Compose：

```bash
docker-compose up -d
```

## 自定义配置

你可以根据需要修改 `.env` 文件中的值，例如：

```bash
# 修改端口
HOST_PORT=9000
CONTAINER_PORT=4000

# 修改应用名称
APP_NAME=my-react-app
```

## 注意事项

- `.env` 文件包含敏感信息，不要提交到版本控制系统
- 确保 `.env` 文件在 `.gitignore` 中
- 生产环境建议使用 Docker secrets 或其他安全的配置管理方式

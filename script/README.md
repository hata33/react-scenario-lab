# Docker 构建脚本

## 🚀 快速开始

### 构建并保存 Docker 镜像
```powershell
.\Build-And-Save-Image.ps1
```

**输出结果：**
- Docker 镜像：`react-scenario-lab:latest`
- Tar 文件：`react-scenario-lab.tar` (~550MB)

## 📊 优化效果

| 项目 | 数值 |
|------|------|
| 镜像大小 | **538MB** (相比原版 1.86GB 减少 71%) |
| 构建上下文 | 113 文件 (相比原版 588 文件减少 81%) |
| 构建时间 | ~14 分钟 (首次)，2-3 分钟 (代码变更后) |

## 🔧 主要优化

1. ✅ 跳过 Cypress 依赖（减少 ~200MB）
2. ✅ 清理开发依赖和缓存
3. ✅ 多阶段构建
4. ✅ 非 root 用户运行
5. ✅ 健康检查
6. ✅ 内存限制优化

## 📝 脚本说明

### Build-And-Save-Image.ps1
**功能**：构建 Docker 镜像并保存为 tar 文件

**输出**：
- 构建进度和耗时
- 镜像大小信息
- tar 文件大小

**用法**：
```powershell
# 使用默认参数
.\Build-And-Save-Image.ps1

# 自定义镜像名称和标签
.\Build-And-Save-Image.ps1 -IMAGE_NAME "myapp" -TAG "v1.0"
```

## 🚀 使用镜像

### 加载并运行
```bash
# 加载镜像
docker load -i react-scenario-lab.tar

# 运行容器
docker run -d -p 3000:3000 --name react-lab react-scenario-lab:latest

# 查看状态
docker ps
docker logs -f react-lab
```

### 生产环境部署
```bash
# 推送到镜像仓库
docker tag react-scenario-lab:latest your-registry/react-scenario-lab:latest
docker push your-registry/react-scenario-lab:latest
```

## 🔍 故障排查

### 构建失败
```powershell
# 清理缓存
docker builder prune -a

# 重新构建
cd script
.\Build-And-Save-Image.ps1
```

### 网络问题
如果遇到 Cypress 或其他依赖下载失败：
- 已优化：默认跳过 Cypress
- 如需重试：清理 pnpm 缓存后重新构建

## 📚 相关文档

- `DOCKER.md` - 详细优化说明
- `.dockerignore` - 构建上下文优化
- `Dockerfile` - 多阶段构建配置

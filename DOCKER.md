# Docker 镜像优化说明

## 📊 优化效果

| 指标 | 优化前 | 优化后 | 改进 |
|------|--------|--------|------|
| **镜像大小** | 1.86GB | 538MB | ⬇️ **71%** |
| **构建上下文** | 588 文件 | 113 文件 | ⬇️ **81%** |
| **构建时间** | ~12 分钟 | ~14 分钟 (首次) | - |
| **代码变更重建** | ~12 分钟 | ~2-3 分钟 | ⬇️ **75%** |

## 🔧 主要优化点

### 1. 跳过 Cypress
```dockerfile
ENV CYPRESS_INSTALL_BINARY=0 \
    CYPRESS_DOWNLOAD_SKIP_TEMPLATE=1
```
- Cypress 二进制文件约 200MB+
- 生产环境通常不需要 E2E 测试

### 2. 清理开发依赖
```dockerfile
RUN pnpm build && \
    pnpm prune --prod && \     # 删除开发依赖
    rm -rf .next/cache        # 清理缓存
```

### 3. 多阶段构建
- **deps**: 只安装依赖
- **builder**: 构建应用并清理
- **runner**: 只包含运行时文件

### 4. 安全加固
```dockerfile
RUN adduser --system nextjs
USER nextjs
```

### 5. 资源限制
```dockerfile
ENV NODE_OPTIONS="--max-old-space-size=512"
```

### 6. 健康检查
```dockerfile
HEALTHCHECK CMD wget --spider http://localhost:3000 || exit 1
```

## 🚀 使用方法

### 构建镜像
```powershell
cd script
.\Build-And-Save-Image.ps1
```

### 运行镜像
```bash
# 加载镜像
docker load -i react-scenario-lab.tar

# 运行容器
docker run -d -p 3000:3000 --name react-lab react-scenario-lab:latest

# 查看日志
docker logs -f react-lab

# 查看健康状态
docker inspect react-lab --format='{{.State.Health.Status}}'
```

## 📝 .dockerignore 优化

已优化排除以下内容：
- `node_modules` - 依赖目录
- `__tests__` - 测试文件
- `*.test.ts` - 测试脚本
- `.git` - 版本控制
- `script` - 脚本目录
- 文档和配置文件

**效果**: 构建上下文从 588 文件减少到 113 文件

## 🔍 故障排查

### 构建失败
```bash
# 清理缓存重试
docker builder prune -a
docker build --no-cache -t react-scenario-lab:latest .
```

### 镜像运行问题
```bash
# 查看详细日志
docker logs react-lab

# 进入容器检查
docker exec -it react-lab sh
```

## 📦 镜像分层

```
192MB   .next/standalone (应用代码 + 依赖)
12.5MB  .next/static (静态资源)
98.3kB  public (公共资源)
~330MB  Node.js 基础镜像 + 系统
```

## 🎯 生产环境建议

1. **使用镜像仓库**: Docker Hub、阿里云 ACR 等
2. **启用 BuildKit 缓存**: 加速 CI/CD 构建
3. **定期更新基础镜像**: 获取安全补丁
4. **监控镜像大小**: 避免随着时间增长

# Next.js 大文件上传系统：从本地开发到Docker部署实战指南

## 项目概述

这是一个基于 Next.js 15 + React 19 的大文件上传系统，采用分片上传技术，支持断点续传和并发上传。本文将详细介绍整个系统的设计思路、实现过程以及从本地开发到Docker部署的完整流程。

## 技术栈

- **前端**: Next.js 15, React 19, TypeScript
- **后端**: Next.js API Routes
- **文件系统**: Node.js fs/promises
- **部署**: Docker, docker-compose
- **包管理**: pnpm

## 系统架构

### 前端组件
- **LargeFileUpload.tsx**: 负责文件选择、分片处理、上传进度显示
- 支持拖拽上传、文件大小显示、上传速度计算
- 实现并发上传控制（默认3个并发）

### 后端API
1. **`/api/upload/chunk`**: 处理分片上传
2. **`/api/upload/complete`**: 合并分片文件
3. **`/api/upload/check`**: 检查文件是否已存在

### 上传流程
```
文件选择 → 计算文件哈希 → 分片处理 → 并发上传 → 分片合并 → 完成上传
```

## 核心实现

### 1. 文件分片处理

```typescript
// 前端分片逻辑
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
const chunks = Math.ceil(file.size / CHUNK_SIZE);

for (let i = 0; i < chunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(file.size, start + CHUNK_SIZE);
    const chunk = file.slice(start, end);
    // 上传分片
}
```

### 2. 分片上传API

```typescript
// /api/upload/chunk/route.ts
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const chunk = formData.get("chunk") as File;
    const fileHash = formData.get("fileHash") as string;
    const chunkIndex = parseInt(formData.get("chunkIndex") as string);

    // 创建临时目录
    const tempDir = join(TEMP_BASE_DIR, fileHash);
    await mkdir(tempDir, { recursive: true });

    // 保存分片
    const chunkPath = join(tempDir, `${chunkIndex}.chunk`);
    const buffer = Buffer.from(await chunk.arrayBuffer());
    await writeFile(chunkPath, buffer);
}
```

### 3. 文件合并API

```typescript
// /api/upload/complete/route.ts
export async function POST(request: NextRequest) {
    const { fileHash, fileName, fileSize } = await request.json();

    // 读取所有分片
    const tempDir = join(TEMP_BASE_DIR, fileHash);
    const chunkFiles = await readdir(tempDir);

    // 按顺序合并分片
    const finalBuffer = Buffer.alloc(fileSize);
    let offset = 0;

    for (const chunkFile of chunkFiles.sort()) {
        const chunkPath = join(tempDir, chunkFile);
        const chunkBuffer = await readFile(chunkPath);
        chunkBuffer.copy(finalBuffer, offset);
        offset += chunkBuffer.length;
    }

    // 保存最终文件
    const finalPath = join(UPLOAD_BASE_DIR, fileName);
    await writeFile(finalPath, finalBuffer);
}
```

## 遇到的问题及解决方案

### 问题1: 本地开发正常，Docker部署失败

**现象**: 在本地开发环境中文件上传正常，但在Docker容器中上传失败。

**原因分析**:
- 原代码使用 `process.cwd()` 硬编码路径
- 容器内工作目录与本地环境不同
- 容器内用户权限问题

**解决方案**:
```typescript
// 使用环境变量配置路径
const UPLOAD_BASE_DIR = process.env.UPLOAD_BASE_DIR || join(process.cwd(), "..", "uploads");
const TEMP_BASE_DIR = process.env.TEMP_BASE_DIR || join(process.cwd(), "..", "temp");
```

### 问题2: Docker容器权限问题

**现象**: `EACCES: permission denied, mkdir '/app/temp/r513e'`

**原因分析**:
- 容器内运行用户与宿主机用户ID不匹配
- Docker卷映射后权限继承问题
- 目录权限设置不当

**解决方案**:

1. **Dockerfile配置**:
```dockerfile
# 创建上传目录并设置权限
RUN mkdir -p /app/uploads /app/temp \
  && chmod -R 777 /app/uploads /app/temp

# 使用root用户运行（简化权限管理）
# 移除非root用户创建逻辑
```

2. **部署脚本权限设置**:
```bash
#!/bin/bash
# 创建目录并设置权限
mkdir -p ./uploads ./temp
chmod 777 ./uploads ./temp
```

3. **docker-compose.yml配置**:
```yaml
environment:
  - UPLOAD_BASE_DIR=/app/uploads
  - TEMP_BASE_DIR=/app/temp
volumes:
  - ./uploads:/app/uploads
  - ./temp:/app/temp
```

### 问题3: 文件存储持久化

**现象**: 容器重启后上传的文件丢失。

**解决方案**: 使用Docker卷映射将容器内目录映射到宿主机

```yaml
volumes:
  - ./uploads:/app/uploads
  - ./temp:/app/temp
```

### 问题4: 环境变量配置

**现象**: 不同环境下的路径配置不统一。

**解决方案**:
```env
# .env.production
UPLOAD_BASE_DIR=/app/uploads
TEMP_BASE_DIR=/app/temp

# .env.example
UPLOAD_BASE_DIR=/app/uploads
TEMP_BASE_DIR=/app/temp
```

## 部署流程

### 1. 构建Docker镜像

```powershell
# PowerShell构建脚本
param(
    [string]$IMAGE_NAME = "react-scenario-lab",
    [string]$TAG = "latest",
    [string]$TAR_FILE = "$IMAGE_NAME.tar"
)

# 构建镜像
docker build -t "$IMAGE_NAME`:$TAG" .

# 保存为tar文件
docker save -o "$TAR_FILE" "$IMAGE_NAME`:$TAG"
```

### 2. 部署脚本

```bash
#!/bin/bash
# deploy.sh

# 1. 创建上传目录
mkdir -p ./uploads ./temp
chmod 777 ./uploads ./temp

# 2. 停止旧容器
docker stop react-scenario-lab
docker rm react-scenario-lab

# 3. 加载新镜像
docker load -i react-scenario-lab.tar

# 4. 启动新容器
docker run -d \
  --name react-scenario-lab \
  -p 8000:3000 \
  -v "$(pwd)/uploads:/app/uploads" \
  -v "$(pwd)/temp:/app/temp" \
  react-scenario-lab:latest
```

## 关键技术要点

### 1. 分片上传优化

- **分片大小**: 5MB是一个比较理想的值，平衡了网络传输和内存使用
- **并发控制**: 3个并发上传，避免过多并发导致服务器压力
- **进度计算**: 基于已上传分片数计算总体进度

### 2. 文件去重

- 使用文件哈希作为唯一标识
- 上传前检查文件是否已存在
- 支持秒传功能

### 3. 错误处理

- 分片上传失败自动重试
- 网络中断后支持断点续传
- 详细的错误日志记录

### 4. 安全考虑

- 文件类型验证
- 文件大小限制
- 路径遍历攻击防护

## 性能优化建议

### 1. 前端优化
- 使用Web Worker处理文件分片
- 实现上传队列管理
- 添加暂停/继续功能

### 2. 后端优化
- 实现分片校验机制
- 添加上传速度限制
- 支持分布式存储

### 3. 存储优化
- 使用对象存储服务（如S3）
- 实现文件自动清理机制
- 添加存储容量监控

## 监控和日志

### 1. 上传日志
```typescript
console.log(`保存分片 ${chunkIndex + 1}/${totalChunks}，文件: ${fileName}`);
console.log(`文件上传完成: ${fileName} (${fileSize} bytes)`);
```

### 2. 错误监控
```typescript
try {
    // 上传逻辑
} catch (error) {
    console.error("分片上传失败:", error);
    // 返回错误信息给前端
}
```

## 总结

这个大文件上传系统展示了现代Web应用中文件处理的最佳实践：

1. **架构设计**: 前后端分离，API设计清晰
2. **技术选型**: 使用现代技术栈，性能优秀
3. **部署方案**: Docker化部署，便于扩展
4. **问题解决**: 系统性地解决了权限、持久化等问题
5. **代码质量**: 错误处理完善，日志记录详细

通过这个项目，我们学习到了：
- 分片上传的实现原理
- Docker部署的常见问题及解决方案
- 环境配置的重要性
- 权限管理的复杂性

这个系统可以作为实际项目中的参考实现，根据具体需求进行调整和扩展。

---

*本文档基于实际项目经验编写，旨在帮助开发者理解和实现大文件上传功能。如有问题或建议，欢迎交流讨论。*
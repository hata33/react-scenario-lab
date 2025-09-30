# QR Code Login System

## 🎯 功能概述

扫码登录系统是一种安全、便捷的用户认证方式，允许用户使用移动设备扫描网页上的二维码来完成登录。该系统提供了完整的从二维码生成到用户认证的端到端解决方案。

## 🔄 核心流程

### 1. 登录流程图
```
用户访问登录页 → 生成二维码 → 显示二维码 → 用户扫码 → 移动端确认 → 登录成功 → 跳转首页
```

### 2. 状态机设计
```
waiting (初始状态) → scanned (已扫码) → confirmed (已确认) → expired (已过期)
```

## 🛠️ 技术实现

### 二维码生成
- **库**: `qrcode` - 成熟稳定的二维码生成库
- **内容格式**: `{APP_URL}/login/scan?scene={sceneId}&t={timestamp}&n={nonce}&s={signature}`
- **尺寸**: 200x200 像素
- **过期时间**: 30分钟

### 签名验证
- **算法**: HMAC-SHA256
- **密钥**: `QR_CODE_SECRET` 环境变量
- **防重放**: 时间戳 + 随机数 + 场景ID
- **数据格式**: `${sceneId}:${timestamp}:${nonce}`

### 会话管理
- **存储**: 内存存储（支持Redis扩展）
- **清理**: 自动清理过期会话（每分钟）
- **状态**: waiting → scanned → confirmed → expired
- **超时**: 30分钟自动过期

## 🔐 安全特性

### 1. 防重放攻击
- 每个二维码包含唯一的时间戳和随机数
- 服务端验证时间戳有效性（30分钟内）
- 一次扫码后二维码标记为已使用

### 2. 签名验证
- 使用HMAC-SHA256算法验证二维码完整性
- 防止二维码内容被篡改
- 支持自定义签名密钥

### 3. 会话安全
- 会话自动过期机制
- 支持手动终止用户会话
- 记录会话创建、扫码、确认时间

## 📡 API 接口

### 1. 生成二维码
```
POST /api/login/generate
Response: {
  success: true,
  sceneId: "1759113845020-abc123",
  qrCodeUrl: "data:image/png;base64,...",
  expiresAt: 1759115645020,
  timestamp: 1759113845020
}
```

### 2. 检查状态
```
POST /api/login/status
Body: { sceneId: "1759113845020-abc123" }
Response: {
  success: true,
  status: "waiting|scanned|confirmed|expired",
  userInfo?: {...},
  timestamp: 1759113845020
}
```

### 3. 扫码确认
```
POST /api/login/scan
Body: {
  sceneId: "1759113845020-abc123",
  timestamp: 1759113845020,
  nonce: "random123",
  signature: "signature123"
}
Response: {
  success: true,
  message: "扫码成功",
  sceneId: "1759113845020-abc123"
}
```

### 4. 登录确认
```
POST /api/login/confirm
Body: {
  sceneId: "1759113845020-abc123",
  userId: "user1"
}
Response: {
  success: true,
  token: "jwt-token",
  userInfo: { id: "user1", name: "演示用户" }
}
```

### 5. 签名验证
```
POST /api/login/verify
Body: {
  sceneId: "1759113845020-abc123",
  timestamp: 1759113845020,
  nonce: "random123",
  signature: "signature123"
}
Response: {
  success: true,
  message: "验证成功"
}
```

## 🎨 前端组件

### QRCodeLogin 组件
- 二维码显示和状态管理
- 自动轮询状态更新
- 过期自动刷新
- 响应式设计

### 状态管理
- `waiting`: 显示二维码，提示用户扫码
- `scanned`: 二维码半透明遮罩，显示"已扫码"
- `confirmed`: 显示"登录成功"，准备跳转
- `expired`: 显示刷新按钮，提示重新生成

## 🧪 测试覆盖

### 单元测试
- 二维码生成功能
- 签名验证算法
- 会话管理逻辑
- 状态流转测试

### 集成测试
- 完整登录流程
- 错误场景处理
- 并发扫码测试
- 过期时间验证

### 性能测试
- 二维码生成性能 (< 300ms)
- 并发处理能力 (5000+ 同时扫码)
- 内存使用优化 (< 100MB/1000并发)

## 🔧 环境配置

### 环境变量
```bash
# 必需配置
QR_CODE_SECRET=your-super-secret-key-here
NEXT_PUBLIC_APP_URL=https://your-domain.com

# 可选配置
NODE_ENV=production
```

### 生成安全密钥
```bash
# 使用 OpenSSL
openssl rand -hex 32

# 使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🚀 部署指南

### Docker 部署
```bash
docker run -d \
  -e QR_CODE_SECRET="your-secret-key" \
  -e NEXT_PUBLIC_APP_URL="https://your-domain.com" \
  -p 8000:3000 \
  react-scenario-lab
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    image: react-scenario-lab
    environment:
      - QR_CODE_SECRET=your-secret-key
      - NEXT_PUBLIC_APP_URL=https://your-domain.com
    ports:
      - "8000:3000"
```

## 📊 监控指标

### 性能指标
- 二维码生成时间: < 300ms
- 状态响应时间: < 100ms
- 登录成功率: > 99.5%
- 并发支持: 5000+ 同时扫码

### 可用性指标
- 系统可用性: > 99.9%
- 故障恢复时间: < 30秒
- 错误率: < 0.1%

## 🔍 故障排除

### 常见问题
1. **签名验证失败**: 检查 `QR_CODE_SECRET` 环境变量
2. **二维码URL错误**: 检查 `NEXT_PUBLIC_APP_URL` 配置
3. **二维码过期**: 检查服务器时间同步

### 调试日志
```bash
# 查看二维码生成日志
grep "生成二维码:" app.log

# 查看签名验证日志
grep "签名验证:" app.log
```

## 📋 扩展计划

### 阶段二功能
- WebSocket 实时通信
- 设备管理系统
- 安全增强功能

### 阶段三功能
- 性能优化
- 用户体验优化
- 监控与日志系统

---

*文档版本: v1.0*
*最后更新: 2025-09-29*
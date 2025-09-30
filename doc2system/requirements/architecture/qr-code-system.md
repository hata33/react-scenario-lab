# QR Code Login System Architecture

## 🏗️ 系统架构

### 整体架构图
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   前端 (Web)    │    │   后端 (API)    │    │   移动端       │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ QR显示组件   │ │    │ │ 生成QR API  │ │    │ │ 扫码SDK      │ │
│ │ 状态轮询     │ │◄──►│ │ 状态检查API │ │◄──►│ │ 确认登录     │ │
│ │ 登录处理     │ │    │ │ 扫码确认API │ │    │ │ Token管理    │ │
│ └─────────────┘ │    │ │ 签名验证API │ │    │ └─────────────┘ │
└─────────────────┘    │ └─────────────┘ │    └─────────────────┘
                       │                 │
                       │ ┌─────────────┐ │
                       │ │ 会话管理器   │ │
                       │ │ 签名验证器   │ │
                       │ │ 安全检查器   │ │
                       │ └─────────────┘ │
                       └─────────────────┘
```

## 📁 代码结构

### 后端 API 结构
```
src/app/api/login/
├── generate/route.ts    # 生成二维码
├── status/route.ts     # 检查状态
├── scan/route.ts       # 扫码确认
├── confirm/route.ts    # 登录确认
└── verify/route.ts     # 签名验证
```

### 核心库结构
```
src/lib/
├── qrcode.ts           # 二维码生成和验证
├── auth.ts             # 认证相关功能
└── session.ts          # 会话管理
```

### 前端组件结构
```
src/components/auth/
├── QRCodeLogin.tsx     # 扫码登录组件
└── DeviceManager.tsx   # 设备管理组件
```

## 🔧 核心组件

### 1. 二维码生成器 (QRCodeGenerator)
```typescript
class QRCodeGenerator {
  async generate(sceneId: string): Promise<QRCodeData> {
    // 1. 生成唯一标识
    const timestamp = Date.now();
    const nonce = generateNonce();

    // 2. 创建签名
    const signature = generateSignature({ sceneId, timestamp, nonce });

    // 3. 生成二维码内容
    const content = `${baseUrl}/login/scan?scene=${sceneId}&t=${timestamp}&n=${nonce}&s=${signature}`;

    // 4. 生成二维码图片
    const qrImage = await QRCode.toDataURL(content);

    return { sceneId, qrImage, expiresAt: timestamp + 1800000 };
  }
}
```

### 2. 会话管理器 (SessionManager)
```typescript
class SessionManager {
  private sessions = new Map<string, LoginSession>();

  createSession(sceneId: string): LoginSession {
    const session: LoginSession = {
      sceneId,
      state: 'waiting',
      createdAt: Date.now(),
      expiresAt: Date.now() + 1800000
    };
    this.sessions.set(sceneId, session);
    return session;
  }

  updateSession(sceneId: string, updates: Partial<LoginSession>): boolean {
    const session = this.sessions.get(sceneId);
    if (!session) return false;

    Object.assign(session, updates);
    return true;
  }

  cleanup(): void {
    const now = Date.now();
    for (const [sceneId, session] of this.sessions.entries()) {
      if (session.expiresAt < now) {
        this.sessions.delete(sceneId);
      }
    }
  }
}
```

### 3. 签名验证器 (SignatureValidator)
```typescript
class SignatureValidator {
  validate(payload: QRCodePayload): boolean {
    const { sceneId, timestamp, nonce, signature } = payload;

    // 1. 检查必需参数
    if (!sceneId || !timestamp || !nonce || !signature) {
      return false;
    }

    // 2. 检查时间戳有效性
    const now = Date.now();
    if (now - parseInt(timestamp) > 1800000) {
      return false; // 30分钟过期
    }

    // 3. 验证签名
    const expectedSignature = generateSignature({ sceneId, timestamp, nonce });
    return signature === expectedSignature;
  }
}
```

## 🔄 数据流

### 1. 二维码生成流程
```
用户访问 /auth/qr-login
    ↓
前端请求 /api/login/generate
    ↓
后端生成 sceneId + 时间戳 + 随机数
    ↓
计算 HMAC-SHA256 签名
    ↓
生成二维码图片 (data URL)
    ↓
返回 sceneId + qrCodeUrl + expiresAt
    ↓
前端显示二维码并开始轮询
```

### 2. 扫码确认流程
```
移动端扫描二维码
    ↓
解析二维码内容 (sceneId, timestamp, nonce, signature)
    ↓
验证签名有效性
    ↓
调用 /api/login/scan
    ↓
更新会话状态为 "scanned"
    ↓
返回成功响应
```

### 3. 登录确认流程
```
用户在移动端确认登录
    ↓
调用 /api/login/confirm
    ↓
验证会话状态和权限
    ↓
生成 JWT token
    ↓
更新会话状态为 "confirmed"
    ↓
返回 token + 用户信息
    ↓
前端轮询检测到状态变化
    ↓
保存 token 并跳转到首页
```

## 🛡️ 安全机制

### 1. 防重放攻击
```typescript
// 时间戳验证
const validateTimestamp = (timestamp: string): boolean => {
  const now = Date.now();
  const ts = parseInt(timestamp);
  return (now - ts) < 1800000 && (now - ts) > 0; // 30分钟内且不超前
};

// 随机数验证
const validateNonce = (nonce: string): boolean => {
  return /^[a-zA-Z0-9]{8,16}$/.test(nonce);
};
```

### 2. 签名验证
```typescript
// HMAC-SHA256 签名生成
const generateSignature = (payload: Payload): string => {
  const data = `${payload.sceneId}:${payload.timestamp}:${payload.nonce}`;
  return crypto
    .createHmac('sha256', process.env.QR_CODE_SECRET || 'default-secret')
    .update(data)
    .digest('hex');
};
```

### 3. 会话安全
```typescript
// 会话过期检查
const isSessionValid = (session: LoginSession): boolean => {
  const now = Date.now();
  return session.expiresAt > now && session.state !== 'expired';
};

// 清理过期会话
const cleanupExpiredSessions = (): void => {
  const now = Date.now();
  for (const [sceneId, session] of sessions.entries()) {
    if (session.expiresAt < now) {
      sessions.delete(sceneId);
    }
  }
};
```

## 📊 性能优化

### 1. 内存管理
- 定期清理过期会话
- 限制并发会话数量
- 使用 WeakMap 优化内存使用

### 2. 连接优化
- HTTP/2 支持
- 连接池管理
- 响应压缩

### 3. 缓存策略
- 二维码模板缓存
- 签名计算缓存
- 会话状态缓存

## 🔍 监控和日志

### 1. 关键指标
```typescript
interface Metrics {
  qrGenerated: number;        // 二维码生成数量
  loginSuccess: number;       // 登录成功次数
  loginFailed: number;        // 登录失败次数
  avgGenTime: number;         // 平均生成时间
  activeSessions: number;     // 活跃会话数
}
```

### 2. 日志记录
```typescript
class Logger {
  logQRGeneration(sceneId: string, genTime: number): void {
    console.log(`QR生成: ${sceneId}, 耗时: ${genTime}ms`);
  }

  logLoginAttempt(sceneId: string, success: boolean): void {
    console.log(`登录尝试: ${sceneId}, 结果: ${success ? '成功' : '失败'}`);
  }

  logSignatureValidation(sceneId: string, isValid: boolean): void {
    console.log(`签名验证: ${sceneId}, 结果: ${isValid ? '通过' : '失败'}`);
  }
}
```

### 3. 错误处理
```typescript
class ErrorHandler {
  handleSignatureError(error: Error): void {
    console.error('签名验证错误:', error.message);
    // 记录安全事件
  }

  handleSessionError(sceneId: string, error: Error): void {
    console.error(`会话错误 ${sceneId}:`, error.message);
    // 清理异常会话
  }
}
```

## 🚀 扩展性设计

### 1. 水平扩展
- 支持多实例部署
- Redis 会话存储
- 负载均衡配置

### 2. 功能扩展
- WebSocket 实时通信
- 多设备管理
- 生物识别集成

### 3. 监控集成
- APM 工具集成
- 性能监控面板
- 安全事件监控

---

*架构文档版本: v1.0*
*最后更新: 2025-09-29*
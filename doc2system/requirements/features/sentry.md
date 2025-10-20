# React Scenario Lab - Sentry 错误监控系统说明文档

## 📋 概述

本文档详细说明了 React Scenario Lab 项目中 Sentry 错误监控系统的集成、配置和使用方法。Sentry 是一个开源的错误监控平台，帮助开发者实时发现、诊断和修复应用中的错误和性能问题。

## 🏗️ 系统架构

### 集成结构

```
项目根目录/
├── sentry.server.config.ts      # 服务端 Sentry 配置
├── sentry.edge.config.ts        # 边缘运行时 Sentry 配置
├── .env.sentry-build-plugin     # Sentry 构建插件配置
└── src/app/sentry/              # Sentry 功能演示页面
    ├── page.tsx                 # 主页面 - 错误测试控制台
    ├── error-boundary/          # 错误边界演示
    │   └── page.tsx
    ├── performance/             # 性能监控演示
    │   └── page.tsx
    ├── breadcrumbs/             # 面包屑追踪演示
    │   └── page.tsx
    └── releases/                # 版本追踪演示
        └── page.tsx
```

### 配置层次

1. **服务端配置** - 处理 SSR 和 API 路由错误
2. **客户端配置** - 处理浏览器端错误
3. **边缘运行时配置** - 处理中间件和边缘函数错误
4. **构建时配置** - 源码映射上传和版本管理

## ⚙️ Sentry 配置详解

### 1. 服务端配置 (`sentry.server.config.ts`)

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://8a75e2e73d0ae3f358f24fdd0ccc8e1f@o4510220447711232.ingest.us.sentry.io/4510220467699712",

  // 性能监控配置
  tracesSampleRate: 1,           // 100% 采样率（生产环境建议降低）
  enableLogs: true,              // 启用日志收集
  sendDefaultPii: true,          // 发送用户信息（生产环境需谨慎）

  // 环境配置
  environment: process.env.NODE_ENV,
  release: process.env.RELEASE_VERSION,
});
```

### 2. 边缘运行时配置 (`sentry.edge.config.ts`)

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://8a75e2e73d0ae3f358f24fdd0ccc8e1f@o4510220447711232.ingest.us.sentry.io/4510220467699712",

  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,

  // 边缘运行时特定配置
  runtime: "edge",
});
```

### 3. 构建插件配置

```bash
# .env.sentry-build-plugin
SENTRY_AUTH_TOKEN=sntrys_eyJpYXQiOjE3NjA5NDMwMjIuNjQ4OTY0...
SENTRY_ORG=your-org-name
SENTRY_PROJECT=your-project-name
```

## 🚀 功能模块详解

### 1. 错误捕获系统

#### 自动错误捕获

Sentry 会自动捕获以下类型的错误：

```typescript
// JavaScript 运行时错误
throw new Error("这是一个运行时错误");

// Promise 拒绝
Promise.reject(new Error("未处理的 Promise 拒绝"));

// 网络请求错误
fetch('/api/nonexistent-endpoint')
  .catch(error => {
    // Sentry 自动捕获网络错误
  });

// 异步函数错误
async function fetchData() {
  throw new Error("异步操作失败");
}
```

#### 错误边界集成

```typescript
import * as Sentry from "@sentry/nextjs";

// Sentry 提供的错误边界组件
<Sentry.ErrorBoundary fallback={<ErrorFallback />}>
  <YourComponent />
</Sentry.ErrorBoundary>

// 自定义错误边界
class CustomErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    // 手动报告错误到 Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }
}
```

### 2. 性能监控

#### Web Vitals 指标

Sentry 自动监控以下性能指标：

```typescript
// 手动标记性能
const transaction = Sentry.startTransaction({
  name: "user-login",
  op: "http.client",
});

// 添加 span
const span = transaction.startChild({
  op: "db.query",
  description: "SELECT * FROM users WHERE id = ?",
});

// 执行操作...
await fetchUserData(userId);

span.finish();
transaction.finish();
```

#### 自定义性能标记

```typescript
// 标记操作开始
Sentry.addBreadcrumb({
  message: "开始用户登录流程",
  category: "user",
  level: "info",
});

// 标记重要事件
Sentry.addBreadcrumb({
  message: "验证用户凭据",
  category: "auth",
  level: "info",
  data: {
    userId: "12345",
    method: "password"
  }
});
```

### 3. 面包屑追踪

#### 自动面包屑

Sentry 自动收集以下面包屑：

```typescript
// 导航事件
Sentry.addBreadcrumb({
  category: "navigation",
  message: "页面导航到 /dashboard",
  level: "info",
});

// 用户交互
Sentry.addBreadcrumb({
  category: "ui",
  message: "用户点击登录按钮",
  level: "info",
  data: {
    element: "button#login",
    text: "登录"
  }
});

// HTTP 请求
Sentry.addBreadcrumb({
  category: "http",
  message: "GET /api/users",
  level: "info",
  data: {
    method: "GET",
    url: "/api/users",
    status_code: 200
  }
});
```

#### 自定义面包屑

```typescript
// 业务事件面包屑
Sentry.addBreadcrumb({
  category: "business",
  message: "用户完成购买",
  level: "info",
  data: {
    orderId: "ORD-12345",
    amount: 99.99,
    currency: "USD"
  }
});

// 系统事件面包屑
Sentry.addBreadcrumb({
  category: "system",
  message: "缓存清理完成",
  level: "debug",
  data: {
    itemsRemoved: 15,
    duration: 120
  }
});
```

### 4. 版本管理

#### Release 配置

```typescript
Sentry.init({
  release: `my-app@${process.env.npm_package_version}`,
  environment: process.env.NODE_ENV,
});

// 创建 release 关联
Sentry.setRelease("1.2.0");
Sentry.setEnvironment("production");
```

#### 部署集成

```typescript
// 构建时自动创建 release
// next.config.js
const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  {
    // Next.js 配置
  },
  {
    silent: true,
    org: "your-org",
    project: "your-project",
  }
);
```

## 🎯 演示页面功能

### 1. 主页面 (`/sentry`)

**功能概览**
- Sentry 集成状态展示
- 错误测试控制台
- 快速导航到各功能模块

**错误测试功能**
```typescript
const triggerJavaScriptError = () => {
  throw new Error("这是一个测试 JavaScript 错误");
};

const triggerTypeError = () => {
  const obj = null as any;
  obj.someProperty.someMethod(); // 类型错误
};

const triggerAsyncError = async () => {
  await Promise.reject(new Error("异步操作失败"));
};
```

### 2. 错误边界页面 (`/sentry/error-boundary`)

**核心功能**
- React 错误边界演示
- 不同类型错误的触发和捕获
- 嵌套错误边界示例
- 错误恢复机制

**错误边界组件**
```typescript
class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    // 自动报告到 Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### 3. 性能监控页面 (`/sentry/performance`)

**监控指标**
- LCP (Largest Contentful Paint) - 最大内容绘制
- FID (First Input Delay) - 首次输入延迟
- CLS (Cumulative Layout Shift) - 累积布局偏移
- FCP (First Contentful Paint) - 首次内容绘制
- TTI (Time to Interactive) - 可交互时间

**性能测试功能**
```typescript
const simulateSlowOperation = async (operation: string) => {
  const transaction = Sentry.startTransaction({
    name: `slow-operation-${operation}`,
    op: "custom",
  });

  // 根据操作类型执行不同的性能测试
  switch (operation) {
    case '计算密集型':
      await performCPUIntensiveTask();
      break;
    case '网络请求':
      await performNetworkRequest();
      break;
    // ...
  }

  transaction.finish();
};
```

### 4. 面包屑追踪页面 (`/sentry/breadcrumbs`)

**追踪功能**
- 用户交互记录
- 导航历史追踪
- API 调用监控
- 自定义事件记录

**自动追踪实现**
```typescript
useEffect(() => {
  if (!isTracking) return;

  const handleClick = (event: MouseEvent) => {
    Sentry.addBreadcrumb({
      category: "ui.click",
      message: `用户点击 ${event.target.tagName}`,
      level: "info",
      data: {
        selector: getCSSSelector(event.target),
        coordinates: { x: event.clientX, y: event.clientY }
      }
    });
  };

  document.addEventListener('click', handleClick);
  return () => document.removeEventListener('click', handleClick);
}, [isTracking]);
```

### 5. 版本追踪页面 (`/sentry/releases`)

**版本管理**
- 版本列表展示
- 环境切换（production/staging/development）
- 提交记录关联
- 问题与版本关联

**版本信息结构**
```typescript
interface Release {
  version: string;
  environment: string;
  releaseDate: string;
  commits: Commit[];
  issues?: Issue[];
  deployUrl?: string;
}
```

## 🔧 配置最佳实践

### 1. 环境变量配置

```bash
# .env.local
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=your-auth-token
```

### 2. 生产环境配置

```typescript
// sentry.server.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // 生产环境降低采样率
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // 生产环境谨慎发送 PII
  sendDefaultPii: process.env.NODE_ENV === 'development',

  // 设置适当的错误过滤器
  beforeSend(event) {
    // 过滤掉一些不需要的错误
    if (event.exception?.values?.[0]?.type === 'ChunkLoadError') {
      return null; // 不发送 chunk 加载错误
    }
    return event;
  },
});
```

### 3. 错误过滤和分组

```typescript
// 自定义错误分组
Sentry.init({
  beforeSend(event) {
    // 根据错误类型自定义分组
    if (event.exception) {
      const error = event.exception.values?.[0];
      if (error?.type === 'TypeError') {
        // 为类型错误设置特定的指纹
        event.fingerprint = ['type-error', error.value || ''];
      }
    }
    return event;
  },
});
```

## 📊 监控和告警

### 1. 自定义标签和上下文

```typescript
// 设置用户信息
Sentry.setUser({
  id: "12345",
  email: "user@example.com",
  username: "john_doe"
});

// 设置标签
Sentry.setTag("feature", "user-auth");
Sentry.setTag("page", "/login");

// 设置额外上下文
Sentry.setContext("character", {
  name: "Mighty Fighter",
  age: 19,
  attack_type: "melee",
});
```

### 2. 自定义事件级别

```typescript
// 不同严重程度的事件
Sentry.captureMessage("用户操作完成", "info");
Sentry.captureMessage("性能警告", "warning");
Sentry.captureException(new Error("严重错误"), {
  level: "error"
});
```

### 3. 性能监控配置

```typescript
// 自定义采样策略
Sentry.init({
  tracesSampleRate: 0.1,
  tracesSampler: (samplingContext) => {
    // 根据请求类型调整采样率
    if (samplingContext.transactionContext.name.startsWith('/api/')) {
      return 0.5; // API 请求 50% 采样
    }
    return 0.1; // 默认 10% 采样
  },
});
```

## 🚨 常见问题和解决方案

### 1. 源码映射问题

```bash
# 确保 source maps 正确上传
npm run build
# Sentry 会自动上传 source maps（如果配置了构建插件）
```

### 2. 生产环境配置

```typescript
// 环境特定配置
const isProduction = process.env.NODE_ENV === 'production';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // 生产环境配置
  sampleRate: isProduction ? 0.1 : 1.0,
  tracesSampleRate: isProduction ? 0.05 : 1.0,

  // 开发环境启用调试
  debug: !isProduction,
});
```

### 3. 错误过滤

```typescript
// 过滤掉第三方库错误
Sentry.init({
  beforeSend(event) {
    const errorValue = event.exception?.values?.[0]?.value;

    // 过滤掉已知的第三方错误
    if (errorValue?.includes('Non-Error promise rejection')) {
      return null;
    }

    // 过滤掉浏览器扩展错误
    if (errorValue?.includes('chrome-extension://')) {
      return null;
    }

    return event;
  },
});
```

## 🔍 调试和测试

### 1. 本地测试

```typescript
// 开发环境强制发送错误
if (process.env.NODE_ENV === 'development') {
  window.testSentryError = () => {
    Sentry.captureException(new Error("测试错误"));
  };
}
```

### 2. 错误验证

```typescript
// 验证 Sentry 配置
Sentry.onLoad(() => {
  console.log("Sentry 已加载");
});

// 测试错误捕获
try {
  throw new Error("测试错误");
} catch (error) {
  Sentry.captureException(error);
  console.log("错误已发送到 Sentry");
}
```

### 3. 性能测试

```typescript
// 测试性能监控
const testPerformance = () => {
  const transaction = Sentry.startTransaction({
    name: "test-performance",
    op: "test",
  });

  // 模拟操作
  setTimeout(() => {
    transaction.finish();
    console.log("性能测试完成");
  }, 1000);
};
```

## 📈 性能优化建议

### 1. 采样率优化

```typescript
// 根据环境调整采样率
const getSampleRate = () => {
  switch (process.env.NODE_ENV) {
    case 'production': return 0.1;
    case 'staging': return 0.5;
    default: return 1.0;
  }
};

Sentry.init({
  tracesSampleRate: getSampleRate(),
});
```

### 2. 批量发送

```typescript
// 配置批量发送
Sentry.init({
  // 批量配置
  maxBreadcrumbs: 100,
  beforeBreadcrumb(breadcrumb) {
    // 过滤掉过多的面包屑
    if (breadcrumb.category === 'http') {
      return null; // 不记录 HTTP 请求面包屑
    }
    return breadcrumb;
  },
});
```

### 3. 延迟加载

```typescript
// 延迟初始化 Sentry
if (typeof window !== 'undefined') {
  import('@sentry/nextjs').then(Sentry => {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    });
  });
}
```

## 📚 API 参考

### 核心方法

| 方法 | 参数 | 描述 |
|------|------|------|
| `Sentry.init(options)` | Object | 初始化 Sentry 配置 |
| `Sentry.captureException(error)` | Error | 捕获异常 |
| `Sentry.captureMessage(message, level)` | string, string | 捕获消息 |
| `Sentry.addBreadcrumb(breadcrumb)` | Object | 添加面包屑 |
| `Sentry.setUser(user)` | Object | 设置用户信息 |
| `Sentry.setTag(key, value)` | string, any | 设置标签 |
| `Sentry.setContext(key, context)` | string, Object | 设置上下文 |
| `Sentry.startTransaction(context)` | Object | 开始事务 |

### 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `dsn` | string | - | Sentry 数据源名称 |
| `environment` | string | 'production' | 环境名称 |
| `release` | string | - | 版本号 |
| `tracesSampleRate` | number | 0 | 性能监控采样率 |
| `debug` | boolean | false | 调试模式 |
| `beforeSend` | function | - | 发送前处理函数 |

## 🎯 实际应用场景

### 1. 用户认证监控

```typescript
class AuthService {
  async login(credentials: LoginCredentials) {
    const transaction = Sentry.startTransaction({
      name: 'user-login',
      op: 'auth',
    });

    try {
      Sentry.addBreadcrumb({
        category: 'auth',
        message: '开始用户登录',
        level: 'info',
      });

      const user = await this.authenticateUser(credentials);

      Sentry.setUser({
        id: user.id,
        email: user.email,
      });

      Sentry.addBreadcrumb({
        category: 'auth',
        message: '用户登录成功',
        level: 'info',
        data: { userId: user.id }
      });

      return user;
    } catch (error) {
      Sentry.captureException(error, {
        tags: { feature: 'authentication' },
        extra: { loginMethod: 'password' }
      });
      throw error;
    } finally {
      transaction.finish();
    }
  }
}
```

### 2. API 调用监控

```typescript
class ApiService {
  async request(endpoint: string, options?: RequestOptions) {
    const span = Sentry.startTransaction({
      name: `api-request-${endpoint}`,
      op: 'http.client',
    });

    try {
      Sentry.addBreadcrumb({
        category: 'http',
        message: `API 请求: ${options?.method || 'GET'} ${endpoint}`,
        level: 'info',
      });

      const response = await fetch(endpoint, options);

      if (!response.ok) {
        Sentry.addBreadcrumb({
          category: 'http',
          message: `API 错误: ${response.status} ${endpoint}`,
          level: 'error',
        });
      }

      return response;
    } catch (error) {
      Sentry.captureException(error, {
        contexts: {
          api: {
            endpoint,
            method: options?.method || 'GET',
            headers: options?.headers,
          }
        }
      });
      throw error;
    } finally {
      span.finish();
    }
  }
}
```

### 3. 用户体验监控

```typescript
function useUserActivityTracking() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      Sentry.addBreadcrumb({
        category: 'ui.click',
        message: `用户点击: ${getElementType(event.target)}`,
        level: 'info',
        data: {
          element: getCSSSelector(event.target),
          page: window.location.pathname,
          timestamp: Date.now()
        }
      });
    };

    const handleNavigation = () => {
      Sentry.addBreadcrumb({
        category: 'navigation',
        message: `页面导航: ${window.location.pathname}`,
        level: 'info',
      });
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handleNavigation);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);
}
```

## 📋 检查清单

### 部署前检查

- [ ] Sentry DSN 配置正确
- [ ] 环境变量设置完成
- [ ] 生产环境采样率已调整
- [ ] 错误过滤器已配置
- [ ] 源码映射上传配置
- [ ] 版本信息设置正确
- [ ] 用户隐私数据已过滤

### 功能测试

- [ ] JavaScript 错误能正确捕获
- [ ] Promise 拒绝能正确上报
- [ ] 网络错误能正确记录
- [ ] 性能指标能正常收集
- [ ] 面包屑能正常生成
- [ ] 用户信息能正确关联
- [ ] 标签和上下文能正常设置

---

*最后更新: 2024年10月20日*
*文档版本: 1.0.0*
*维护者: React Scenario Lab Team*
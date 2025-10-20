# React Scenario Lab - 前端缓存系统说明文档

## 📋 概述

本文档详细说明了 React Scenario Lab 项目中前端缓存系统的设计、实现和使用方法。该缓存系统是一个统一的前端缓存解决方案，支持多种存储层和缓存策略，旨在提升应用性能和用户体验。

## 🏗️ 系统架构

### 核心组件

```
src/lib/cache/
├── cache-manager.ts      # 统一缓存管理器
├── memory-cache.ts       # 内存缓存实现
├── storage-manager.ts    # 存储适配器（LocalStorage/SessionStorage）
├── http-cache.ts         # HTTP 缓存管理
├── strategies/           # 缓存策略目录
│   ├── index.ts         # 策略接口定义
│   ├── ttl.ts           # TTL（时间过期）策略
│   ├── lru.ts           # LRU（最近最少使用）策略
│   ├── lfu.ts           # LFU（最少使用频率）策略
│   ├── size-based.ts    # 基于大小策略
│   ├── type-based.ts    # 基于类型策略
│   ├── pattern-based.ts # 基于模式策略
│   ├── hybrid.ts        # 混合策略
│   └── adaptive.ts      # 自适应策略
└── types.ts             # 类型定义
```

### 存储层次

1. **内存缓存 (Memory Cache)**
   - 最快的访问速度
   - 页面刷新后丢失
   - 适合临时数据和频繁访问的数据

2. **会话存储 (SessionStorage)**
   - 会话级别持久化
   - 同一标签页内共享
   - 标签页关闭后丢失

3. **本地存储 (LocalStorage)**
   - 跨会话持久化
   - 同域名下共享
   - 存储容量限制（通常 5-10MB）

4. **HTTP 缓存**
   - 基于 ETag 和 Last-Modified
   - 支持条件请求
   - 自动处理缓存头

## 🎯 缓存策略详解

### 1. TTL (Time To Live) 策略
```typescript
const strategy = StrategyFactory.createTTL(60000); // 60秒过期
```
- **适用场景**: 用户配置、权限信息、API 响应缓存
- **特点**: 基于时间自动过期，简单可靠
- **参数**: 过期时间（毫秒）

### 2. LRU (Least Recently Used) 策略
```typescript
const strategy = StrategyFactory.createLRU(100); // 最大100条
```
- **适用场景**: 商品列表、搜索结果、分页数据
- **特点**: 容量限制，优先淘汰最久未访问的数据
- **参数**: 最大缓存条目数

### 3. LFU (Least Frequently Used) 策略
```typescript
const strategy = StrategyFactory.createLFU(5); // 最少访问5次
```
- **适用场景**: 推荐内容、热门商品
- **特点**: 基于访问频率，优先淘汰访问次数少的数据
- **参数**: 最小访问次数阈值

### 4. Size-Based 策略
```typescript
const strategy = StrategyFactory.createSizeBased(1024); // 最大1KB
```
- **适用场景**: 图片缓存、文件缓存、大数据处理
- **特点**: 基于数据大小限制，避免内存溢出
- **参数**: 最大数据大小（字节）

### 5. Type-Based 策略
```typescript
const strategy = StrategyFactory.createTypeBased(['object', 'string']);
```
- **适用场景**: API 响应过滤、数据类型控制
- **特点**: 只缓存指定类型的数据，排除不需要的内容
- **参数**: 允许的数据类型数组

### 6. Pattern-Based 策略
```typescript
const strategy = StrategyFactory.createPatternBased(
  [/^user:/],      // 包含模式
  [/^temp:/]       // 排除模式
);
```
- **适用场景**: 用户数据缓存、临时数据管理
- **特点**: 基于键名模式进行包含/排除
- **参数**: 包含模式和排除模式数组

### 7. Hybrid 策略
```typescript
const strategy = StrategyFactory.createHybrid([
  StrategyFactory.createTTL(30000),
  StrategyFactory.createLRU(50)
]);
```
- **适用场景**: 复杂业务场景，需要多重条件
- **特点**: 组合多个策略，满足复杂需求
- **参数**: 策略数组

### 8. Adaptive 策略
```typescript
const strategy = StrategyFactory.createAdaptive();
```
- **适用场景**: 用户行为分析、个性化推荐
- **特点**: 根据访问模式动态调整缓存行为
- **参数**: 无需参数，自动学习

## 🚀 使用方法

### 基本用法

```typescript
import { cacheManager } from '@/lib/cache';

// 内存缓存
cacheManager.set('user:123', userData, 60000); // 60秒
const user = cacheManager.get('user:123');

// 本地存储
await cacheManager.setLocal('preferences', prefs, 3600000); // 1小时
const preferences = await cacheManager.getLocal('preferences');

// 会话存储
await cacheManager.setSession('cart', cartItems);
const cart = await cacheManager.getSession('cart');

// 统一接口（优先级：内存 -> 会话 -> 本地）
await cacheManager.setAny('config', config, {
  ttl: 300000,
  storage: 'local'
});
const data = await cacheManager.getAny('config');
```

### 策略设置

```typescript
import { StrategyFactory } from '@/lib/cache';

// 设置缓存策略
const ttlStrategy = StrategyFactory.createTTL(60000);
cacheManager.setStrategy(ttlStrategy);

// 混合策略示例
const hybridStrategy = StrategyFactory.createHybrid([
  StrategyFactory.createTTL(300000),     // 5分钟过期
  StrategyFactory.createLRU(100),        // 最大100条
  StrategyFactory.createSizeBased(1024)  // 最大1KB
]);
cacheManager.setStrategy(hybridStrategy);
```

### HTTP 缓存

```typescript
// GET 请求缓存
const data = await cacheManager.getHttp('/api/users');

// 强制刷新
const freshData = await cacheManager.forceGetHttp('/api/users');

// 清除特定 URL 缓存
cacheManager.clearHttpCacheForUrl('/api/users');

// 清除所有 HTTP 缓存
cacheManager.clearHttpCache();
```

### 高级功能

```typescript
// 缓存预热
await cacheManager.warmup([
  { key: 'user:123', value: userData, ttl: 60000, storage: 'memory' },
  { key: 'config', value: config, ttl: 3600000, storage: 'local' }
]);

// 按模式清除缓存
await cacheManager.invalidate(/^user:/); // 清除所有用户缓存

// 获取缓存统计
const metrics = cacheManager.getMetrics();
console.log('命中率:', metrics.memory.hitRate);
console.log('总大小:', await cacheManager.getTotalSize());

// 批量操作
const batchData = [
  { key: 'item1', value: data1 },
  { key: 'item2', value: data2 }
];
await Promise.all(
  batchData.map(item => cacheManager.setAny(item.key, item.value))
);
```

## 🔧 配置选项

### 缓存管理器配置

```typescript
const cacheManager = new UnifiedCacheManager({
  defaultTTL: 300000,        // 默认过期时间（5分钟）
  maxSize: 1000,             // 内存缓存最大大小
  enableMetrics: true,       // 启用性能指标
  strategy: customStrategy   // 默认策略
});
```

### 环境变量

```bash
# .env.local
CACHE_DEFAULT_TTL=300000
CACHE_MAX_SIZE=1000
CACHE_ENABLE_METRICS=true
```

## 📊 性能监控

### 缓存指标

```typescript
const metrics = cacheManager.getMetrics();
/*
{
  memory: {
    hits: 150,              // 命中次数
    misses: 50,             // 未命中次数
    hitRate: 0.75,          // 命中率 (75%)
    size: 25,               // 当前大小
    evictions: 5            // 淘汰次数
  },
  http: {
    hits: 80,
    misses: 20,
    hitRate: 0.8,
    totalRequests: 100
  },
  strategy: 'TTL'
}
*/
```

### 性能优化建议

1. **选择合适的存储层**
   - 频繁访问的数据使用内存缓存
   - 需要持久化的配置使用 LocalStorage
   - 临时会话数据使用 SessionStorage

2. **设置合理的过期时间**
   - 用户配置：30分钟 - 24小时
   - API 响应：5分钟 - 1小时
   - 静态数据：1天 - 1周

3. **控制缓存大小**
   - 内存缓存：建议不超过 1000 条
   - 单个数据项：建议不超过 1MB
   - 总缓存大小：建议不超过内存的 10%

4. **选择合适的策略**
   - 简单场景：TTL 策略
   - 容量敏感：LRU 策略
   - 数据类型多样：Type-Based 策略
   - 复杂需求：Hybrid 策略

## 🛠️ 最佳实践

### 1. 键名设计

```typescript
// 好的键名设计
const keys = {
  user: (id: string) => `user:${id}`,
  userConfig: (id: string) => `user:${id}:config`,
  productList: (page: number) => `products:page:${page}`,
  apiResponse: (endpoint: string) => `api:${endpoint}`
};

// 使用示例
await cacheManager.setAny(keys.user('123'), userData);
```

### 2. 错误处理

```typescript
try {
  const data = await cacheManager.getLocal('config');
  if (data) {
    return data;
  }
} catch (error) {
  console.warn('缓存读取失败，使用默认值', error);
}

// 提供降级方案
const data = await cacheManager.getAny('data') || defaultData;
```

### 3. 内存管理

```typescript
// 定期清理过期数据
setInterval(() => {
  cacheManager.cleanup();
}, 5 * 60 * 1000); // 每5分钟清理一次

// 监控缓存大小
const checkCacheSize = async () => {
  const { memory, local, session } = await cacheManager.getTotalSize();
  if (memory > 500) {
    console.warn('内存缓存过大，考虑清理');
  }
};
```

### 4. 缓存预热

```typescript
// 应用启动时预热关键数据
const warmupCache = async () => {
  const keyData = [
    { key: 'app:config', value: await fetchAppConfig() },
    { key: 'user:preferences', value: getUserPreferences() },
    { key: 'menu:items', value: getMenuItems() }
  ];

  await cacheManager.warmup(keyData);
};
```

## 🚨 注意事项

### 1. 服务端渲染 (SSR)
- LocalStorage 和 SessionStorage 在服务端不可用
- 缓存系统已自动处理 SSR 兼容性
- 建议在客户端组件中使用缓存功能

### 2. 数据安全
- 敏感数据（密码、令牌）不应缓存在 LocalStorage
- 建议使用内存缓存存储敏感信息
- 可以使用 Type-Based 策略过滤敏感数据类型

### 3. 存储限制
- LocalStorage 通常限制为 5-10MB
- SessionStorage 通常限制为 5MB
- 大数据建议使用分片或压缩存储

### 4. 浏览器兼容性
- 现代浏览器都支持 LocalStorage 和 SessionStorage
- 私密模式下可能限制存储功能
- 建议添加错误处理和降级方案

## 🔍 调试和故障排除

### 启用调试模式

```typescript
// 在开发环境启用详细日志
if (process.env.NODE_ENV === 'development') {
  const cacheManager = new UnifiedCacheManager({
    enableMetrics: true,
    debug: true
  });
}
```

### 常见问题

1. **缓存不生效**
   - 检查存储空间是否已满
   - 验证策略设置是否正确
   - 确认数据是否被立即淘汰

2. **内存泄漏**
   - 定期调用 `cleanup()` 方法
   - 监控缓存大小变化
   - 检查是否有循环引用

3. **性能问题**
   - 减少缓存数据大小
   - 优化键名设计
   - 调整过期时间

## 📚 API 参考

### UnifiedCacheManager

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `get(key)` | string | T | 获取内存缓存 |
| `set(key, value, ttl?)` | string, any, number | void | 设置内存缓存 |
| `getLocal(key)` | string | Promise<T> | 获取本地存储 |
| `setLocal(key, value, options?)` | string, any, object | Promise<void> | 设置本地存储 |
| `getSession(key)` | string | Promise<T> | 获取会话存储 |
| `setSession(key, value, options?)` | string, any, object | Promise<void> | 设置会话存储 |
| `getAny(key)` | string | Promise<T> | 统一获取接口 |
| `setAny(key, value, options?)` | string, any, object | Promise<void> | 统一设置接口 |
| `remove(key)` | string | boolean | 删除内存缓存 |
| `clearAll()` | - | Promise<void> | 清空所有缓存 |
| `getMetrics()` | - | object | 获取性能指标 |
| `setStrategy(strategy)` | CacheStrategy | void | 设置缓存策略 |

### 策略工厂

| 方法 | 参数 | 返回值 | 描述 |
|------|------|--------|------|
| `createTTL(ttl?)` | number | CacheStrategy | TTL 策略 |
| `createLRU(maxSize)` | number | CacheStrategy | LRU 策略 |
| `createLFU(minCount)` | number | CacheStrategy | LFU 策略 |
| `createSizeBased(maxSize)` | number | CacheStrategy | 基于大小策略 |
| `createTypeBased(types)` | string[] | CacheStrategy | 基于类型策略 |
| `createPatternBased(include, exclude?)` | RegExp[], RegExp[] | CacheStrategy | 基于模式策略 |
| `createHybrid(strategies)` | CacheStrategy[] | CacheStrategy | 混合策略 |
| `createAdaptive()` | - | CacheStrategy | 自适应策略 |

## 🎯 示例场景

### 用户配置缓存

```typescript
class UserService {
  async getUserConfig(userId: string) {
    const cacheKey = `user:${userId}:config`;

    // 尝试从缓存获取
    let config = await cacheManager.getLocal(cacheKey);

    if (!config) {
      // 缓存未命中，从 API 获取
      config = await this.fetchUserConfig(userId);

      // 缓存配置（24小时）
      await cacheManager.setLocal(cacheKey, config, {
        ttl: 24 * 60 * 60 * 1000
      });
    }

    return config;
  }
}
```

### API 响应缓存

```typescript
class ApiService {
  async getData(endpoint: string, forceRefresh = false) {
    if (forceRefresh) {
      return await cacheManager.forceGetHttp(endpoint);
    }

    return await cacheManager.getHttp(endpoint, {
      headers: { 'Cache-Control': 'max-age=300' }
    });
  }
}
```

### 分页数据缓存

```typescript
class ProductService {
  private strategy = StrategyFactory.createLRU(50);

  constructor() {
    cacheManager.setStrategy(this.strategy);
  }

  async getProducts(page: number) {
    const cacheKey = `products:page:${page}`;

    let products = cacheManager.get(cacheKey);

    if (!products) {
      products = await this.fetchProducts(page);
      cacheManager.set(cacheKey, products, 300000); // 5分钟
    }

    return products;
  }
}
```

## 📈 版本历史

### v1.0.0 (当前版本)
- ✅ 完整的多层缓存系统
- ✅ 8种缓存策略支持
- ✅ HTTP 缓存集成
- ✅ 性能监控和指标
- ✅ SSR 兼容性
- ✅ TypeScript 类型安全

### 计划功能
- 🔄 缓存持久化到 IndexedDB
- 🔄 缓存数据加密
- 🔄 分布式缓存支持
- 🔄 可视化缓存管理界面
- 🔄 缓存预热计划任务
- 🔄 缓存数据分析报告

---

*最后更新: 2024年10月20日*
*文档版本: 1.0.0*
*维护者: React Scenario Lab Team*
# 测试框架使用指南

## 📋 概述

本项目集成了完整的测试框架，包括单元测试、集成测试、端到端测试和性能测试。测试框架基于 Jest 构建，并提供了统一的管理工具。

## 🚀 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

### 3. 运行测试

```bash
# 查看所有可用测试
pnpm run test:manager list

# 运行所有测试
pnpm run test:all

# 运行特定测试
pnpm run test:qr-login
```

## 📊 测试类型

### 1. 单元测试 (Unit Tests)
- 使用 Jest 框架
- 测试单个函数和组件
- 快速执行，适合开发过程中频繁运行

```bash
# 运行单元测试
npm test

# 监听模式
npm run test:watch

# 生成覆盖率报告
npm run test:coverage
```

### 2. 集成测试 (Integration Tests)
- 测试多个组件或模块的交互
- 验证 API 接口和业务逻辑
- 包含扫码登录、文件上传等功能测试

```bash
# 运行集成测试
npm run test:integration

# 运行扫码登录测试
npm run test:qr-login
```

### 3. 端到端测试 (E2E Tests)
- 使用 Puppeteer 或 Playwright
- 模拟真实用户操作
- 测试完整的用户流程

```bash
# 运行端到端测试
npm run test:e2e
```

### 4. 性能测试 (Performance Tests)
- 测试系统性能指标
- 并发测试和压力测试
- 性能基准测试

```bash
# 运行性能测试
npm run test:performance
```

## 🛠️ 测试管理器

### 基本用法

```bash
# 列出所有测试套件
pnpm run test:manager list

# 运行所有测试
pnpm run test:manager all

# 运行特定测试
pnpm run test:manager "扫码登录"

# 运行特定类别测试
pnpm run test:manager integration
pnpm run test:manager e2e
pnpm run test:manager performance
```

### 测试管理器命令

| 命令 | 描述 |
|------|------|
| `list` | 列出所有可用测试 |
| `all` | 运行所有测试 |
| `<test-name>` | 运行指定名称的测试 |
| `<category>` | 运行指定类别的测试 |
| `help` | 显示帮助信息 |

## 📝 测试文件结构

```
tests/
├── setup.ts                           # 测试环境设置
├── test-manager.ts                     # 测试管理器
├── integration/                        # 集成测试
│   └── qr-login.test.ts               # 扫码登录集成测试
├── run-qr-login-test.ts                # 扫码登录独立测试脚本
├── run-file-upload-test.ts            # 文件上传测试脚本
├── run-performance-test.ts            # 性能测试脚本
└── e2e/                               # 端到端测试
    └── qr-login.e2e.ts               # 扫码登录端到端测试
```

## 🧪 编写测试

### 1. 创建新的测试脚本

```typescript
// tests/run-my-test.ts
import { sleep } from './setup';

async function runMyTest() {
  console.log('🚀 开始我的测试...');

  // 测试逻辑
  const result = await someAsyncOperation();

  if (result.success) {
    console.log('✅ 测试通过');
    return true;
  } else {
    console.log('❌ 测试失败');
    return false;
  }
}

// 如果直接运行此文件
if (require.main === module) {
  runMyTest().catch(error => {
    console.error('💥 测试出错:', error);
    process.exit(1);
  });
}
```

### 2. 添加到测试管理器

在 `tests/test-manager.ts` 中添加新的测试套件：

```typescript
{
  name: '我的测试',
  description: '测试我的功能',
  command: 'npx ts-node tests/run-my-test.ts',
  category: 'integration',
}
```

### 3. 添加到 package.json

```json
{
  "scripts": {
    "test:my-test": "npx ts-node tests/run-my-test.ts"
  }
}
```

## 🔧 测试配置

### Jest 配置

配置文件: `jest.config.js`

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 30000,
  verbose: true,
  // 更多配置...
};
```

### 测试环境设置

配置文件: `tests/setup.ts`

```typescript
// 设置测试环境变量
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';

// 全局测试工具函数
global.testUtils = {
  generateTestSceneId: () => { /* ... */ },
  sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  // ...
};
```

## 📊 测试报告

### 覆盖率报告

```bash
npm run test:coverage
```

覆盖率报告会生成在 `coverage/` 目录下。

### 测试结果

测试管理器会提供详细的测试结果，包括：
- ✅ 通过的测试
- ❌ 失败的测试
- ⏱️ 执行时间
- 📊 成功率

## 🚨 常见问题

### 1. 测试超时

```typescript
// 增加测试超时时间
jest.setTimeout(60000); // 60秒
```

### 2. 环境变量问题

确保在 `tests/setup.ts` 中设置了正确的测试环境变量。

### 3. 端口冲突

确保开发服务器在正确的端口上运行（默认 3002）。

### 4. 依赖问题

```bash
# 重新安装依赖
rm -rf node_modules package-lock.json
pnpm install
```

## 🎯 最佳实践

1. **测试独立性**: 每个测试应该是独立的，不依赖其他测试的状态
2. **清理资源**: 在 `afterEach` 中清理测试数据
3. **错误处理**: 正确处理异步操作和错误情况
4. **测试覆盖率**: 保持高测试覆盖率
5. **文档**: 为复杂的测试添加注释和文档

## 📈 持续集成

测试框架支持 CI/CD 集成：

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: pnpm install
      - run: pnpm run test:all
```

---

## 📞 支持

如有问题，请查看：
- 项目文档
- 测试文件注释
- Jest 官方文档
- 或提交 Issue
# 代码检查与修复步骤

## 核心目标
确保项目能成功编译和运行，修复所有 TypeScript 错误。

## 检查步骤

### 1. TypeScript 类型检查
```bash
# 基础类型检查
pnpm type-check

# 或使用 tsc 直接检查
npx tsc --noEmit --skipLibCheck
```

### 2. 代码质量检查
```bash
# 运行 Biome 检查
pnpm lint

# 自动修复可修复的问题
pnpm biome check --write

# 应用不安全修复（可选）
pnpm biome check --write --unsafe
```

## 修复优先级

### 🔴 高优先级（必须修复）
- TypeScript 编译错误
- React Hook 依赖问题
- 变量提升问题

### 🟡 中优先级（建议修复）
- 未使用的导入和变量
- 代码格式问题
- 字符串拼接优化

### 🟢 低优先级（可选）
- 代码风格建议
- 性能优化提示

## 常见问题修复

### TypeScript 错误
1. **变量提升**: 将函数定义移到使用之前
2. **Hook 依赖**: 使用 `useCallback` 包装函数
3. **类型注解**: 为隐式 `any` 类型添加明确类型

### React 19 新特性
```typescript
// 使用 @ts-ignore 处理未完善的类型定义
// @ts-ignore - React 19 Hook，类型定义可能还不完善
const { pending, data } = (React as any).useFormStatus?.() || { pending: false, data: null };
```

### 兼容性问题
```typescript
// 替换 Object.hasOwn 为兼容方案
Object.prototype.hasOwnProperty.call(data, key)
```

## 验证步骤

### 1. 编译验证
```bash
pnpm type-check  # 应该无错误输出
```

### 2. 代码质量验证
```bash
pnpm biome check  # 检查剩余问题数量
```

### 3. 项目运行验证
```bash
pnpm dev  # 确保项目正常启动
```

## 成功标准

- ✅ `pnpm type-check` 无错误
- ✅ `pnpm biome check` 错误数量可接受
- ✅ 项目可以正常启动和运行
- ✅ 主要功能正常工作

## 注意事项

1. **不要使用 `pnpm build`** 进行验证
2. **优先修复编译错误**，其次是代码质量问题
3. **React 19 相关问题**使用类型断言临时解决
4. **保留 `@ts-ignore`** 用于暂时无法解决的类型问题
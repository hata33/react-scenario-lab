# Supabase TypeScript 类型错误修复指南

当遇到 TypeScript 类型错误时，可以按照以下步骤修复：

## 🔧 快速修复

### 1. 创建数据库类型定义

在 `src/types/database.ts` 中定义数据库结构：

```typescript
export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          user_id: string
          title: string
          description: string | null
          is_complete: boolean
          priority: number
          due_date: string | null
          tags: string[]
        }
        Insert: {
          id?: number
          created_at?: string
          updated_at?: string
          user_id: string
          title: string
          description?: string | null
          is_complete?: boolean
          priority?: number
          due_date?: string | null
          tags?: string[]
        }
        Update: {
          id?: number
          created_at?: string
          updated_at?: string
          user_id?: string
          title?: string
          description?: string | null
          is_complete?: boolean
          priority?: number
          due_date?: string | null
          tags?: string[]
        }
      }
    }
  }
}
```

### 2. 更新 Supabase 客户端

在 `src/lib/supabase-client.ts` 中添加类型参数：

```typescript
import { Database } from '@/types/database'

export function createClient() {
  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey)
}
```

### 3. 更新服务端客户端

在 `src/lib/supabase.ts` 中添加类型参数：

```typescript
import { Database } from '@/types/database'

export async function createServerClient() {
  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, options)
}
```

## 🎯 错误示例及解决方案

### 错误类型 1: `No overload matches this call`

**错误信息:**
```
Argument of type '{ user_id: string; title: string; ... }' is not assignable to parameter of type 'never'.
```

**解决方案:**
1. 确保已创建数据库类型定义文件
2. 更新客户端以使用类型参数
3. 创建数据库表结构

### 错误类型 2: `Object literal may only specify known properties`

**错误信息:**
```
Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
```

**解决方案:**
1. 检查字段名是否正确
2. 确保类型定义中的字段名与数据库表一致
3. 重新编译项目

## 🚀 自动生成类型（推荐）

如果你已经创建了数据库表，可以使用 Supabase CLI 自动生成类型：

```bash
# 安装 Supabase CLI
npm install -g supabase

# 登录 Supabase
supabase login

# 链接项目
supabase link --project-ref your-project-ref

# 生成类型
supabase gen types typescript --local > src/types/database.ts
```

## 🔄 重新生成类型

当修改数据库结构后，重新生成类型：

```bash
# 重新生成类型
supabase gen types typescript --local > src/types/database.ts
```

## 📝 验证修复

检查以下文件以确保类型正确：

1. `src/types/database.ts` - 数据库类型定义
2. `src/lib/supabase-client.ts` - 客户端配置
3. `src/lib/supabase.ts` - 服务端配置
4. `src/hooks/useTodos.ts` - Hook 使用类型

## 🔍 调试技巧

### 检查类型

```typescript
// 在 Hook 中检查类型
const result = await supabase
  .from('todos')
  .insert(todoData)
  .select()

// 检查 result 的类型
console.log('Result type:', typeof result)
```

### 类型断言（临时解决方案）

如果急需运行，可以临时使用类型断言：

```typescript
const { data } = await supabase
  .from('todos')
  .insert(todoData as any)
  .select()
```

**注意:** 这只是临时解决方案，应该优先使用正确的类型定义。

## 🆘 获取帮助

如果问题仍然存在：

1. 检查 Supabase 控制台中的表结构
2. 确保环境变量正确配置
3. 重新安装依赖: `npm install`
4. 重启开发服务器

## 📚 相关资源

- [Supabase TypeScript 支持](https://supabase.com/docs/reference/javascript/typescript-support)
- [生成类型](https://supabase.com/docs/reference/cli/supabase-gen-types-typescript)
- [数据库设置指南](./supabase-setup.md)
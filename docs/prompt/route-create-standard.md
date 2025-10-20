# 路由创建标准

## 概述
Next.js App Router 项目路由创建规范，自动包含侧边栏导航配置。

## 目录结构
```
src/app/{group}/{subPath}/page.tsx
```
- `group`: 一级目录 (basic, forms, animation, other 等)
- `subPath`: 子路径，使用 kebab-case
- URL: `/{group}/{subPath}`

## 页面规范
- 使用 Server Component (无需 "use client")
- 必须导出 `metadata` (title, description)
- **所有页面必须使用 Layout 组件包裹**
- **创建新分组时必须创建分组首页** (src/app/{group}/page.tsx)

## 导航配置 (src/routeDefs.ts)
在对应 `RouteGroup` 的 `children` 中添加：
```ts
{ path: "{subPath}", title: "{中文标题}" }
```

## 创建模板
```bash
请创建路由页面：
- URL: /{group}/{subPath}
- 标题: {中文标题}
- 描述: {中文描述}

要求：
1. 创建 src/app/{group}/{subPath}/page.tsx
2. 添加 Layout 包裹和 metadata 导出
3. 更新 src/routeDefs.ts 导航配置
4. 如需新建分组，同时创建 src/app/{group}/page.tsx 首页
5. 验证页面正常访问和显示
```

## 重要约束
- **基于 Todo 或提示词要求创建路由** - 严格按照待办事项或用户提示的具体要求创建页面内容和功能
- **每个分组必须有其首页** - 创建新分组时，必须在 src/app/{group}/page.tsx 创建该分组的入口页面

## 示例
```tsx
// src/app/animation/demo/page.tsx
import Layout from "@/components/Layout";

export const metadata = {
  title: "动画示例",
  description: "展示各种动画效果"
};

export default function DemoPage() {
  return (
    <Layout>
      <div>页面内容</div>
    </Layout>
  );
}
```

```ts
// src/routeDefs.ts
{
  path: "animation",
  title: "动画/交互",
  children: [
    { path: "demo", title: "动画示例" }, // 新增
  ],
},
```

## 新建分组示例

```tsx
// src/app/ai/page.tsx (分组首页)
import Layout from "@/components/Layout";
import Link from "next/link";

export const metadata = {
  title: "AI 功能",
  description: "人工智能相关功能展示"
};

export default function AIPage() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">AI 功能</h1>
        <div className="space-y-2">
          <Link href="/ai/chat" className="block p-2 hover:bg-gray-100 rounded">
            AI 聊天
          </Link>
          <Link href="/ai/image" className="block p-2 hover:bg-gray-100 rounded">
            图像生成
          </Link>
        </div>
      </div>
    </Layout>
  );
}
```

```tsx
// src/app/ai/chat/page.tsx (子页面)
import Layout from "@/components/Layout";

export const metadata = {
  title: "AI 聊天",
  description: "智能对话助手"
};

export default function ChatPage() {
  return (
    <Layout>
      <div>聊天功能内容</div>
    </Layout>
  );
}
```

```ts
// src/routeDefs.ts (新增分组)
{
  path: "ai",
  title: "AI 功能",
  children: [
    { path: "chat", title: "AI 聊天" },
    { path: "image", title: "图像生成" },
  ],
},
```
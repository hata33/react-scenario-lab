# React Scenario Lab

一个基于 Next.js 15 和 React 19 的组件实验室，展示各种常见的 React 开发场景。

## 技术栈

- **Next.js 15** - React 框架
- **React 19** - 用户界面库
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Canvas Confetti** - 特效库

## 功能特性

- 🎯 **基础组件** - Counter、TodoList 等基础交互组件
- 📝 **表单处理** - 基础表单、分步表单、表单验证
- 📊 **数据展示** - 表格、搜索筛选、图表展示
- 📁 **文件操作** - 文件上传、文件预览
- 🗺️ **地图功能** - 地图标注、路径规划
- ✨ **动画交互** - 页面过渡、元素动画、拖拽
- 💬 **实时通信** - WebSocket 聊天室
- 🔐 **用户认证** - 登录、注册、路由守卫
- 🌍 **国际化** - 多语言支持
- 🎨 **主题切换** - 深色/浅色主题
- 📝 **富文本编辑** - 文本编辑器
- 🔔 **通知系统** - 消息通知
- 💳 **支付集成** - 支付功能
- ⚡ **性能优化** - 虚拟列表

## 开发指南

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 启动生产服务器

```bash
npm run start
# 或
yarn start
# 或
pnpm start
```

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── basic/             # 基础组件页面
│   ├── forms/             # 表单页面
│   ├── data/              # 数据页面
│   ├── charts/            # 图表页面
│   ├── files/             # 文件页面
│   ├── map/               # 地图页面
│   ├── animation/         # 动画页面
│   ├── chat/              # 聊天页面
│   ├── auth/              # 认证页面
│   ├── other/             # 其他功能页面
│   └── performance/       # 性能优化页面
├── components/            # 共享组件
│   ├── Layout.tsx         # 布局组件
│   ├── Sidebar.tsx        # 侧边栏组件
│   └── FirstVisitConfetti.tsx # 首次访问特效
├── pages/                 # 页面组件
│   ├── Basic/             # 基础组件
│   ├── Forms/             # 表单组件
│   ├── Data/              # 数据组件
│   ├── Charts/            # 图表组件
│   ├── Files/             # 文件组件
│   ├── Map/               # 地图组件
│   ├── Animation/         # 动画组件
│   ├── Chat/              # 聊天组件
│   ├── Auth/              # 认证组件
│   ├── Other/             # 其他组件
│   └── Performance/       # 性能组件
└── routeDefs.ts           # 路由定义
```

## 快捷键

- `Ctrl/Cmd + B` - 切换侧边栏显示/隐藏

## 迁移说明

本项目已从 Vite + React Router 迁移到 Next.js 15，主要变更：

1. **路由系统** - 从 React Router v7 迁移到 Next.js App Router
2. **构建工具** - 从 Vite 迁移到 Next.js 内置构建系统
3. **文件结构** - 采用 Next.js 13+ 的 app 目录结构
4. **组件架构** - 保持原有的组件结构，适配 Next.js 路由

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT

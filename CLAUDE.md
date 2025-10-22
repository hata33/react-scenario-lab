# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Next.js 15 + React 19 的组件实验室，用于展示各种 React 开发场景和功能组件。项目已从 Vite + React Router 迁移到 Next.js App Router 架构。使用 pnpm 作为包管理器。

## 开发命令


### 包管理
项目使用 pnpm 作为包管理器，所有命令都应该使用 pnpm。

## 技术栈

- **Next.js 15** - React 框架（App Router）
- **React 19** - 用户界面库
- **TypeScript** - 类型安全
- **Tailwind CSS 4** - 样式框架
- **Biome** - 代码检查和格式化（替代 ESLint）
- **Canvas Confetti** - 特效库

## 项目架构

### 路由系统
使用 Next.js App Router，路由定义在 `src/routeDefs.ts` 中。每个功能模块都有对应的路由组：

- `basic` - 基础组件（Counter、TodoList）
- `special-effects` - 特效组件（液体玻璃效果）
- `forms` - 表单处理
- `data` - 数据展示
- `charts` - 图表
- `files` - 文件操作
- `map` - 地图功能
- `animation` - 动画交互
- `chat` - 实时通信
- `auth` - 用户认证
- `other` - 其他功能（国际化、主题切换等）
- `performance` - 性能优化

### 目录结构
```
src/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── [模块]/             # 各功能模块页面
├── components/            # 共享组件
│   ├── Layout.tsx         # 主布局组件
│   ├── Sidebar.tsx        # 侧边栏
│   └── FirstVisitConfetti.tsx # 首次访问特效
├── pages/                 # 页面组件
└── routeDefs.ts           # 路由定义
```

### 关键配置

#### Biome 配置
- 使用制表符缩进
- 双引号字符串
- 禁用部分 a11y 规则（`noLabelWithoutControl`、`noStaticElementInteractions`）
- 允许 `any` 类型（`noExplicitAny`）

#### Tailwind CSS 4
- 启用暗色模式 (`darkMode: "class"`)
- 自定义边框颜色配置
- 禁用默认样式重置 (`preflight: false`)

#### TypeScript
- 严格模式启用
- 路径别名 `@/*` 指向 `src/*`
- 目标 ES2017

## 开发注意事项

### 侧边栏行为
- 首次访问时显示侧边栏
- 发生路由跳转后自动收起
- 支持鼠标悬停显示
- 快捷键 `Ctrl/Cmd + B` 切换固定状态

### 响应式设计
- 侧边栏支持折叠和展开
- 使用 CSS Grid 布局
- 过渡动画使用 `transition` 和 `transform`

### 服务端渲染注意事项
- 客户端组件使用 `"use client"`
- localStorage 读取需要在 useEffect 中进行
- 避免服务端/客户端渲染差异

## 代码风格

### 缩进和格式
- 使用制表符缩进
- 双引号字符串
- 语句结尾加分号

### 组件命名
- 使用 PascalCase 命名组件文件
- 页面组件放在对应的 app 目录下
- 共享组件放在 `src/components` 目录

### 路由约定
- 每个功能模块有独立的路由组
- 页面文件名为 `page.tsx`
- 路由路径使用 kebab-case

### 页面布局规范
- **所有页面必须使用 Layout 组件包裹**：`import Layout from "@/components/Layout"`
- 在 return 语句的最外层 JSX 元素上包裹 `<Layout>`
- 确保统一的侧边栏导航和用户界面体验
- 新建页面时务必添加 Layout 导入和包裹

### 性能优化
- 使用 CSS transform 进行动画
- 组件懒加载
- 图片优化禁用（兼容静态导出）

## 环境配置

- 开发端口：3002
- 支持环境变量配置（`.env.example`、`.env.production`）
- 包含 Docker 配置文件

## 更新记录

### 2025-10-15
- **修复 BPMN 编辑器功能**：更新 bpmn-js 导入路径，添加必要的 CSS 样式文件，完善编辑器配置
- **统一页面布局**：为所有缺少 Layout 包裹的页面添加 Layout 组件，确保界面一致性
- **新增布局规范**：在 CLAUDE.md 中添加页面布局规范，要求所有新建页面必须使用 Layout 组件

### 要求
禁止执行 build 命令

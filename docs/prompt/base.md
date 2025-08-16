你现在是一个资深前端架构师，帮我用 Vite + React + TailwindCSS + React Router 创建一个名为 "react-scenario-lab" 的项目骨架，要求如下：

# 目标
- 该项目用于覆盖 20-30 个典型 React 开发场景（如表单、表格、动画、地图、WebSocket 等）
- 项目采用模块化结构，每个场景是独立页面
- 左侧导航栏展示分类与功能名，点击跳转对应场景
- 项目最终可以直接运行（npm install & npm run dev）

# 技术栈
- Vite + React 19
- React Router DOM v7
- TailwindCSS
- React.lazy + Suspense 做路由懒加载

# 目录结构
react-scenario-lab/
│
├── src/
│   ├── pages/                  # 每个场景独立文件夹
│   │   ├── Home.tsx
│   │   ├── Basic/
│   │   │   ├── Counter.tsx
│   │   │   ├── TodoList.tsx
│   │   ├── Forms/
│   │   │   ├── BasicForm.tsx
│   │   │   ├── StepForm.tsx
│   │   │   ├── FormValidation.tsx
│   │   ├── Data/
│   │   │   ├── Table.tsx
│   │   │   ├── SearchFilter.tsx
│   │   ├── Charts/
│   │   │   ├── BarChart.tsx
│   │   │   ├── LineChart.tsx
│   │   │   ├── PieChart.tsx
│   │   ├── Files/
│   │   │   ├── FileUpload.tsx
│   │   │   ├── FilePreview.tsx
│   │   ├── Map/
│   │   │   ├── MapMarkers.tsx
│   │   │   ├── RoutePlanner.tsx
│   │   ├── Animation/
│   │   │   ├── PageTransition.tsx
│   │   │   ├── ElementAnimation.tsx
│   │   │   ├── DragDrop.tsx
│   │   ├── Chat/
│   │   │   ├── ChatRoom.tsx
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── RouteGuard.tsx
│   │   ├── Other/
│   │   │   ├── I18n.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── RichText.tsx
│   │   │   ├── Notifications.tsx
│   │   │   ├── Payment.tsx
│   │   ├── Performance/
│   │   │   ├── VirtualList.tsx
│   │
│   ├── routes.ts                # 路由配置（支持多级菜单）
│   ├── App.tsx                   # 带侧边栏布局的主入口
│   ├── index.css                 # Tailwind 引入
│   ├── main.tsx
│
├── tailwind.config.ts
├── package.json
├── README.md
└── vite.config.ts

# 要求
1. 在 routes.ts 中定义多级路由（分类 + 子功能），用 React.lazy 懒加载组件
2. App.tsx 中实现左侧导航栏，导航数据来自 routes.ts
3. 每个页面文件至少包含一个 h2 标题（显示功能名）
4. 使用 TailwindCSS 样式（简洁美观）
5. 生成的代码可以直接运行（npm install 后 npm run dev）

# 输出格式
- 直接给出完整代码文件内容（分文件标明路径）
- 确保目录结构与上面规范一致
- 所有 import 路径正确


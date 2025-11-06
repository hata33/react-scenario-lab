# React 19 页面 UI 设计规范

## 🎯 核心架构
- **技术栈**: Next.js 16 + React 19 + Tailwind CSS 4
- **布局模式**: 垂直结构，顶部吸顶选择器，下方详细内容
- **背景设计**:
  - 主背景: bg-gray-50
  - 渐变背景: bg-gradient-to-br from-blue-50 to-indigo-100
  - 深色模式: dark:from-gray-900 dark:to-gray-800
- **最大宽度**: max-w-7xl mx-auto

## 🎨 色彩系统

### 基础色彩
- **主背景**: bg-gray-50 或渐变背景
- **卡片背景**: bg-white
- **主要操作**: bg-blue-600 text-white hover:bg-blue-700
- **成功状态**: bg-emerald-600 text-white hover:bg-emerald-700
- **警告/活动**: bg-yellow-600 text-white hover:bg-yellow-700
- **错误状态**: bg-red-600 text-white hover:bg-red-700
- **特殊功能**: bg-purple-600 text-white hover:bg-purple-700
- **信息提示**: bg-cyan-600 text-white hover:bg-cyan-700

### 语义化配色
- **3W法则区域**: 翠绿、青色、深青色渐变 (emerald-50, teal-50, cyan-50)
- **问题区域**: 红色背景突出
- **解决方案**: 绿色背景正面展示
- **活动状态**: 蓝色或绿色标识

## 🎭 组件设计

### 卡片系统
- **基础样式**: rounded-xl bg-white p-6 shadow-lg
- **圆角**: 统一使用 rounded-xl
- **阴影**: shadow-lg 创造层次感
- **选中效果**: ring-2 ring-blue-500 蓝色边框
- **Hover效果**: hover:shadow-md transition-colors

### 按钮设计系统
- **主要操作**: bg-blue-600 text-white hover:bg-blue-700
- **成功状态**: bg-emerald-600 text-white hover:bg-emerald-700
- **危险操作**: bg-red-600 text-white hover:bg-red-700
- **信息操作**: bg-purple-600 text-white hover:bg-purple-700
- **禁用状态**: cursor-not-allowed bg-gray-400 text-gray-200
- **过渡效果**: transition-colors

### 标签和指示器
- **状态标签**: rounded-full px-2 py-1 text-xs
- **进度条**: h-2 rounded-full 配合动态宽度
- **徽章**: inline-flex items-center 配合图标

## 📝 文字层级规范
- **页面主标题**: font-bold text-4xl
- **区块标题**: font-bold text-3xl
- **卡片标题**: font-semibold text-2xl
- **小标题**: font-semibold text-xl / text-lg
- **正文**: text-gray-600 / text-gray-700
- **小字**: text-sm
- **强调文字**: font-medium

## 🔄 页面结构设计模式

### 标准页面结构
1. **头部**: bg-white shadow-sm + 图标 + 标题 + 描述
2. **架构概览**: 4列网格彩色功能卡片
3. **3W 法则**: 蓝色主题 3栏布局解析
4. **吸顶导航**: sticky top-0 功能选择器
5. **双栏内容**: 左侧详情，右侧代码和演示

### 响应式设计
- **桌面端**: lg:grid-cols-2 双栏布局
- **移动端**: 单栏布局，flex-wrap 换行
- **容器**: max-w-7xl mx-auto
- **间距**: gap-4 gap-6 gap-8 渐进式

## 🎮 交互演示核心要求
- **多场景覆盖**: 每个功能至少3个不同应用场景
- **真实交互模拟**: 网络延迟、状态变化、错误处理的完整模拟
- **教学价值导向**: 清晰展示技术优势、使用方法和实际应用价值
- **视觉反馈丰富**: 乐观更新、加载状态、成功/错误提示的完整体验
- **实际应用场景**: 表单处理、状态保持、页面切换、数据管理等真实业务场景

## 🚀 一句话提示词
创建现代化React技术文档页面，采用垂直布局设计。使用渐变背景和多彩卡片系统，包含3W法则解析、多场景交互演示、Activity API状态管理。每个功能特性配备真实的使用案例演示，支持深色模式。风格专业现代，注重教学效果和用户体验。

## 💻 核心组件模板

### 头部组件
```tsx
<div className="bg-white shadow-sm">
  <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <div className="flex items-center space-x-3">
      <Icon className="h-8 w-8 text-blue-600" />
      <div>
        <h1 className="font-bold text-3xl text-gray-900">页面标题</h1>
        <p className="text-gray-600">页面描述</p>
      </div>
    </div>
  </div>
</div>
```

### 吸顶导航器
```tsx
<div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
  <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <div className="flex items-center space-x-4">
      <span className="font-medium text-gray-700">选择功能：</span>
      <div className="flex space-x-2">
        {examples.map((example) => (
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected?.id === example.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {example.icon}
            <span>{example.title}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
</div>
```

### 交互演示组件
```tsx
function DemoComponent() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`rounded-lg px-4 py-2 text-white transition-colors ${
            isActive ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          {isActive ? "活动状态" : "暂停状态"}
        </button>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          恢复状态
        </button>
        <button className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
          重置状态
        </button>
      </div>

      <div className="rounded-lg bg-emerald-50 p-4">
        <p className="text-emerald-800 text-sm">
          💡 {isActive ? "状态正在自动保存" : "状态保存已暂停"}
        </p>
      </div>
    </div>
  );
}
```
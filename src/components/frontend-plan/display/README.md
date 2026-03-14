# 通用代码展示组件

基于 Monaco Editor 的只读代码展示组件，提供专业的语法高亮和代码预览功能。

## 功能特性

- ✨ **完整的语法高亮** - 支持 TypeScript、JavaScript、CSS、HTML、Python、Java、C/C++、Objective-C 等多种语言
- 🎨 **深色主题** - 默认使用 VS Code 深色主题，代码对比度高，易于阅读
- 📋 **一键复制** - 内置复制按钮，点击即可复制代码到剪贴板
- 🚫 **只读模式** - 完全禁用编辑功能，专注于代码展示
- 📏 **自动高度** - 根据代码行数自动调整显示高度
- 🎯 **macOS 风格** - 窗口控制点（红黄绿三点）和优雅的 UI 设计
- 📱 **响应式设计** - 支持移动端和桌面端自适应

## 支持的语言

| 语言 | Monaco ID | 说明 |
|------|-----------|------|
| TypeScript | `typescript` | 完整支持 |
| JavaScript | `javascript` | 完整支持 |
| CSS | `css` | 完整支持 |
| HTML | `html` | 完整支持 |
| WXML | `wxml` | 映射到 HTML 模式 |
| Objective-C | `objectivec` | 映射到 C 模式 |
| Swift | `swift` | 映射到 C 模式 |
| Python | `python` | 完整支持 |
| Java | `java` | 完整支持 |
| C/C++ | `c` / `cpp` | 完整支持 |
| JSON | `json` | 完整支持 |
| Markdown | `markdown` | 完整支持 |

## 使用方法

### 基础用法

```tsx
import { CodeDisplay } from "@/components/frontend-plan/display";

function Example() {
	const code = `.card {
  padding: 24px;
  border-radius: 12px;
  transition: all 0.3s ease;
}`;

	return (
		<CodeDisplay
			code={code}
			language="css"
			title="CSS 示例"
		/>
	);
}
```

### 完整配置

```tsx
<CodeDisplay
	code="// 你的代码内容"
	language="typescript"     // 编程语言
	theme="dark"              // 主题：'light' | 'dark'
	height="400px"            // 高度，'auto' 表示自动
	title="TypeScript 示例"    // 标题
	showCopyButton={true}     // 显示复制按钮
	className="my-code"       // 自定义样式类
/>
```

## Props 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `code` | `string` | **必需** | 要展示的代码内容 |
| `language` | `string` | `"typescript"` | 编程语言，影响语法高亮 |
| `theme` | `"light" \| "dark"` | `"dark"` | 编辑器主题 |
| `height` | `string` | `"auto"` | 编辑器高度，`auto` 时自动计算 |
| `title` | `string` | `undefined` | 代码标题，显示在头部 |
| `showCopyButton` | `boolean` | `true` | 是否显示复制按钮 |
| `className` | `string` | `""` | 自定义 CSS 类名 |

## 最佳实践

### 1. 选择正确的语言

使用合适的语言 ID 可以获得最佳的语法高亮效果：

```tsx
// ✅ 正确 - WXML 使用 HTML 模式
<CodeDisplay code="<view>Hello</view>" language="wxml" />

// ✅ 正确 - Objective-C 使用 C 模式
<CodeDisplay code="NSLog(@"test");" language="objectivec" />
```

### 2. 使用自动高度

让组件根据代码长度自动调整高度：

```tsx
<CodeDisplay code={longCode} height="auto" />
```

### 3. 添加标题

在有多个代码示例时，添加标题帮助用户理解：

```tsx
<CodeDisplay code={cssCode} language="css" title="样式定义" />
<CodeDisplay code={jsCode} language="javascript" title="交互逻辑" />
```

## 技术实现

### 只读配置

组件通过多个 Monaco Editor 选项确保只读：

```typescript
options={{
	readOnly: true,              // 只读模式
	domReadOnly: true,           // DOM 只读
	selection: {                 // 禁用选择
		inEditableScope: false
	},
	renderLineHighlight: "none", // 不高亮当前行
	folding: false,              // 禁用代码折叠
}}
```

### 语言映射

部分语言使用映射来兼容 Monaco Editor：

```typescript
const langMap = {
	swift: "c",           // Swift 使用 C 模式
	objectivec: "c",      // ObjC 使用 C 模式
	wxml: "html",         // WXML 使用 HTML 模式
};
```

### 复制功能

使用 Clipboard API 实现复制功能，带有 2 秒的反馈状态：

```typescript
const handleCopy = () => {
	navigator.clipboard.writeText(code);
	setCopied(true);
	setTimeout(() => setCopied(false), 2000);
};
```

## 样式自定义

组件使用 Tailwind CSS，可以通过 `className` 添加自定义样式：

```tsx
<CodeDisplay
	code={code}
	className="border-2 border-blue-500 rounded-lg"
/>
```

## 示例项目

组件已在以下页面中使用：

- **现代前端实践** (`/frontend/modern`) - 不同载体对比
- **平台对比组件** - `PlatformComparisonBlock.tsx`

查看这些示例了解实际使用效果。

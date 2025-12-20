# Monaco Editor 组件

基于 Monaco Editor 的 React 组件封装，提供代码编辑功能。

## 功能特性

- 语法高亮
- 代码补全
- 错误检查
- 快捷键支持
- 主题切换（亮色/暗色）
- 多语言支持
- 自定义配置选项

## 使用方法

```tsx
import MonacoEditor from "@/components/MonacoEditor";

function MyComponent() {
	const [code, setCode] = useState("// 你的代码");

	return (
		<MonacoEditor
			height="500px"
			language="typescript"
			theme="light"
			value={code}
			onChange={setCode}
			options={{
				minimap: { enabled: true },
				fontSize: 16,
			}}
		/>
	);
}
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| height | string | "400px" | 编辑器高度 |
| width | string | "100%" | 编辑器宽度 |
| defaultValue | string | "// 在这里编写你的代码" | 默认代码 |
| language | string | "typescript" | 编程语言 |
| theme | "light" \| "dark" | "light" | 主题 |
| onChange | (value: string \| undefined) => void | - | 代码变化回调 |
| options | object | {} | Monaco Editor 选项 |
| path | string | - | 编辑器唯一标识 |

## 支持的语言

TypeScript, JavaScript, Python, Java, C++, C#, HTML, CSS, JSON, Markdown, Go, Rust, PHP 等。

## 快捷键

- `Ctrl/Cmd + S`: 保存代码
- `Ctrl/Cmd + Z`: 撤销
- `Ctrl/Cmd + Y`: 重做
- `Ctrl/Cmd + F`: 查找
- `Ctrl/Cmd + H`: 替换
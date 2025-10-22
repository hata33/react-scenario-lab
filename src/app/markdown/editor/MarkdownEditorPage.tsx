"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
	FiBold, FiItalic, FiLink, FiImage, FiCode, FiList,
	FiChevronRight, FiEye, FiEyeOff, FiSave, FiDownload,
	FiUpload, FiType
} from "react-icons/fi";
import Layout from "@/components/Layout";
import "./globals.css";

interface MarkdownEditorProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	height?: number;
	showPreview?: boolean;
	toolbar?: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
	value,
	onChange,
	placeholder = "开始输入 Markdown...",
	height = 500,
	showPreview = true,
	toolbar = true
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [isPreviewMode, setIsPreviewMode] = useState(false);

	// 同步滚动
	const syncScroll = useCallback(() => {
		if (!textareaRef.current) return;

		const textarea = textareaRef.current;
		const preview = document.getElementById('markdown-preview');

		if (!preview) return;

		const sync = () => {
			const textareaScrollPercentage = textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight);
			const previewScrollTop = textareaScrollPercentage * (preview.scrollHeight - preview.clientHeight);
			preview.scrollTop = previewScrollTop;
		};

		textarea.addEventListener('scroll', sync);
		return () => textarea.removeEventListener('scroll', sync);
	}, []);

	useEffect(() => {
		const cleanup = syncScroll();
		return cleanup;
	}, [syncScroll]);

	// 工具栏操作
	const insertText = useCallback((before: string, after: string = '') => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = value.substring(start, end);
		const newText = before + selectedText + after;

		const newValue = value.substring(0, start) + newText + value.substring(end);
		onChange(newValue);

		// 设置光标位置
		setTimeout(() => {
			textarea.focus();
			const newCursorPos = start + before.length + selectedText.length;
			textarea.setSelectionRange(newCursorPos, newCursorPos);
		}, 0);
	}, [value, onChange]);

	// 工具栏按钮
	const toolbarActions = [
		{
			icon: <FiBold size={18} />,
			action: () => insertText('**', '**'),
			title: '粗体 (Ctrl+B)'
		},
		{
			icon: <FiItalic size={18} />,
			action: () => insertText('*', '*'),
			title: '斜体 (Ctrl+I)'
		},
		{
			icon: <FiType size={18} />,
			action: () => insertText('# ', ''),
			title: '标题 1'
		},
		{
			icon: <FiType size={18} />,
			action: () => insertText('## ', ''),
			title: '标题 2'
		},
		{
			icon: <FiType size={18} />,
			action: () => insertText('### ', ''),
			title: '标题 3'
		},
		{
			icon: <FiLink size={18} />,
			action: () => insertText('[', '](url)'),
			title: '链接 (Ctrl+K)'
		},
		{
			icon: <FiImage size={18} />,
			action: () => insertText('![', '](url)'),
			title: '图片'
		},
		{
			icon: <FiCode size={18} />,
			action: () => insertText('`', '`'),
			title: '行内代码'
		},
		{
			icon: <FiList size={18} />,
			action: () => insertText('- ', ''),
			title: '无序列表'
		},
		{
			icon: <FiChevronRight size={18} />,
			action: () => insertText('1. ', ''),
			title: '有序列表'
		},
		{
			icon: <FiUpload size={18} />,
			action: () => insertText('> ', ''),
			title: '引用'
		},
	];

	// 键盘快捷键
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey || e.metaKey) {
				switch (e.key) {
					case 'b':
						e.preventDefault();
						insertText('**', '**');
						break;
					case 'i':
						e.preventDefault();
						insertText('*', '*');
						break;
					case 'k':
						e.preventDefault();
						insertText('[', '](url)');
						break;
					case '`':
						e.preventDefault();
						insertText('`', '`');
						break;
					case 's':
						e.preventDefault();
						handleSave();
						break;
				}
			}
		};

		const textarea = textareaRef.current;
		if (textarea) {
			textarea.addEventListener('keydown', handleKeyDown);
			return () => textarea.removeEventListener('keydown', handleKeyDown);
		}
	}, [insertText]);

	// 保存功能
	const handleSave = useCallback(() => {
		const blob = new Blob([value], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `document-${Date.now()}.md`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, [value]);

	// 导出为HTML
	const handleExportHTML = useCallback(() => {
		const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
${value}
</body>
</html>`;

		const blob = new Blob([htmlContent], { type: 'text/html' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `document-${Date.now()}.html`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, [value]);

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
			{/* 工具栏 */}
			{toolbar && (
				<div className="border-b border-gray-200 p-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="flex items-center gap-1 border-r border-gray-300 pr-3">
								{toolbarActions.map((action, index) => (
									<button
										key={index}
										onClick={action.action}
										className="p-2 hover:bg-gray-100 rounded transition-colors"
										title={action.title}
									>
										{action.icon}
									</button>
								))}
							</div>
						</div>
						<div className="flex items-center gap-2">
							{showPreview && (
								<button
									onClick={() => setIsPreviewMode(!isPreviewMode)}
									className="p-2 hover:bg-gray-100 rounded transition-colors"
									title={isPreviewMode ? "显示编辑器" : "显示预览"}
								>
									{isPreviewMode ? <FiEyeOff size={18} /> : <FiEye size={18} />}
								</button>
							)}
							<button
								onClick={handleSave}
								className="p-2 hover:bg-gray-100 rounded transition-colors"
								title="保存 Markdown"
							>
								<FiDownload size={18} />
							</button>
							<button
								onClick={handleExportHTML}
								className="p-2 hover:bg-gray-100 rounded transition-colors"
								title="导出 HTML"
							>
								<FiType size={18} />
							</button>
						</div>
					</div>
				</div>
			)}

			{/* 编辑器区域 */}
			<div className="flex" style={{ height: `${height}px` }}>
				{/* 编辑区 */}
				{!isPreviewMode && (
					<div className={`${showPreview ? 'w-1/2 border-r border-gray-200' : 'w-full'}`}>
						<textarea
							ref={textareaRef}
							value={value}
							onChange={(e) => onChange(e.target.value)}
							placeholder={placeholder}
							className="w-full h-full p-4 resize-none focus:outline-none font-mono text-sm"
							style={{
								scrollBehavior: 'smooth',
								lineHeight: '1.6'
							}}
						/>
					</div>
				)}

				{/* 预览区 */}
				{showPreview && (
					<div
						className={`${isPreviewMode ? 'w-full' : 'w-1/2'} overflow-auto bg-gray-50`}
						id="markdown-preview"
						style={{ scrollBehavior: 'smooth' }}
					>
						<div className="p-6 prose prose-sm max-w-none">
							<ReactMarkdown
								remarkPlugins={[remarkGfm]}
								rehypePlugins={[rehypeHighlight]}
							>
								{value || '*开始输入 Markdown 以查看预览...*'}
							</ReactMarkdown>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const MarkdownEditorContent = () => {
	const [content, setContent] = useState(
		`# 实用型 Markdown 编辑器

这是一个**实用**的 Markdown 编辑器演示，专注于解决实际开发中的文档编辑需求。

## 主要特性

### 1. 实时预览
- 左右分屏显示编辑和预览
- 滚动位置自动同步
- 支持切换纯预览模式

### 2. 丰富的工具栏
- **文本格式化**: 粗体、斜体、删除线
- **标题级别**: H1-H6 各级标题
- **链接和图片**: 便捷的链接和图片插入
- **代码支持**: 行内代码和代码块
- **列表**: 有序和无序列表
- **引用**: 块引用文本

### 3. 键盘快捷键
- \`Ctrl+B\`: 粗体
- \`Ctrl+I\`: 斜体
- \`Ctrl+K\`: 插入链接
- \`Ctrl+\`\`: 行内代码
- \`Ctrl+S\`: 保存文档

### 4. 扩展语法支持
- **表格**: 使用 GFM 语法
- **删除线**: \`\~\~删除线\~\~
- **任务列表**: - [x] 已完成任务
- **代码高亮**: 支持多种编程语言

## 代码示例

\`\`\`javascript
// JavaScript 示例代码
function greeting(name) {
	return \`Hello, \${name}!\`;
}

console.log(greeting("World"));
\`\`\`

\`\`\`python
# Python 示例代码
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

## 表格示例

| 功能 | 状态 | 说明 |
|------|------|------|
| 实时预览 | ✅ | 编辑时同步显示 |
| 语法高亮 | ✅ | 支持多种编程语言 |
| 工具栏 | ✅ | 常用格式化快捷操作 |
| 快捷键 | ✅ | 提升编辑效率 |
| 导出功能 | ✅ | 支持 MD 和 HTML 导出 |

## 任务列表

- [x] 基础编辑功能
- [x] 实时预览
- [x] 语法高亮
- [x] 工具栏
- [x] 键盘快捷键
- [ ] 图片上传 (开发中)
- [ ] 数学公式 (计划中)
- [ ] 协作编辑 (未来功能)

## 链接示例

访问 [React 官网](https://react.dev) 了解更多信息。

查看 [Markdown 语法指南](https://www.markdownguide.org) 学习完整语法。

## 总结

这个 Markdown 编辑器专注于**实用性**和**易用性**，避免了过度复杂的协作功能，提供了文档编辑所需的核心功能。适合用于：

- 📝 博客文章编写
- 📚 项目文档维护
- 📖 技术分享创作
- 🗂️ 个人知识库管理

### 设计理念

- **简单易用**: 直观的界面和操作方式
- **性能优先**: 流畅的编辑和预览体验
- **功能实用**: 聚焦核心功能，避免冗余
- **易于集成**: 组件化设计，便于项目集成`
	);

	const [charCount, setCharCount] = useState(0);
	const [wordCount, setWordCount] = useState(0);

	// 统计字符和字数
	useEffect(() => {
		const textContent = content.replace(/[#*`\-\[\]()]/g, '');
		setCharCount(content.length);
		setWordCount(textContent.trim() ? textContent.trim().split(/\s+/).length : 0);
	}, [content]);

	return (
		<div className="p-6 max-w-7xl mx-auto">
			{/* 页面标题 */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-4">
					Markdown 编辑器
				</h1>
				<p className="text-lg text-gray-600">
					实用的 Markdown 编辑器，支持实时预览、语法高亮、工具栏等功能
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* 编辑器区域 */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold text-gray-900">编辑器</h2>
							<div className="flex items-center gap-4 text-sm text-gray-500">
								<span>字符: {charCount}</span>
								<span>字数: {wordCount}</span>
								<span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
									自动保存: 开启
								</span>
							</div>
						</div>
						<MarkdownEditor
							value={content}
							onChange={setContent}
							height={600}
							showPreview={true}
							toolbar={true}
						/>
					</div>
				</div>

				{/* 侧边栏 */}
				<div className="lg:col-span-1 space-y-6">
					{/* 功能介绍 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">核心功能</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li className="flex items-start gap-2">
								<span className="text-green-500">✓</span>
								<span>实时预览编辑</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-green-500">✓</span>
								<span>语法高亮显示</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-green-500">✓</span>
								<span>工具栏快捷操作</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-green-500">✓</span>
								<span>键盘快捷键支持</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-green-500">✓</span>
								<span>滚动位置同步</span>
							</li>
						</ul>
					</div>

					{/* 快捷键说明 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">快捷键</h3>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-600">粗体</span>
								<kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+B</kbd>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">斜体</span>
								<kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+I</kbd>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">链接</span>
								<kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+K</kbd>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">代码</span>
								<kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+`</kbd>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">保存</span>
								<kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+S</kbd>
							</div>
						</div>
					</div>

					{/* 支持的语法 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">支持的语法</h3>
						<div className="space-y-2 text-sm text-gray-600">
							<p><strong>基础语法:</strong> 标题、段落、强调</p>
							<p><strong>列表:</strong> 有序、无序列表</p>
							<p><strong>代码:</strong> 行内代码、代码块</p>
							<p><strong>链接:</strong> 文本链接、图片</p>
							<p><strong>表格:</strong> GFM 表格语法</p>
							<p><strong>扩展:</strong> 删除线、任务列表</p>
						</div>
					</div>

					{/* 技术栈 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">技术实现</h3>
						<div className="space-y-2 text-sm text-gray-600">
							<p><strong>编辑器:</strong> React + TypeScript</p>
							<p><strong>解析:</strong> react-markdown</p>
							<p><strong>语法:</strong> remark-gfm</p>
							<p><strong>高亮:</strong> rehype-highlight</p>
							<p><strong>图标:</strong> react-icons</p>
						</div>
					</div>

					{/* 使用场景 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">适用场景</h3>
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm">
								<span className="w-2 h-2 bg-blue-500 rounded-full"></span>
								<span className="text-gray-700">博客文章编辑</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<span className="w-2 h-2 bg-green-500 rounded-full"></span>
								<span className="text-gray-700">项目文档编写</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<span className="w-2 h-2 bg-purple-500 rounded-full"></span>
								<span className="text-gray-700">技术分享创作</span>
							</div>
							<div className="flex items-center gap-2 text-sm">
								<span className="w-2 h-2 bg-orange-500 rounded-full"></span>
								<span className="text-gray-700">个人知识管理</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function MarkdownEditorPage() {
	return (
		<Layout>
			<MarkdownEditorContent />
		</Layout>
	);
}
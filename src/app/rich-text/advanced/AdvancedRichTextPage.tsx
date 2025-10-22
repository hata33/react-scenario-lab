"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Layout from "@/components/Layout";

// 表格生成器组件
const TableGenerator: React.FC<{
	onInsert: (html: string) => void;
}> = ({ onInsert }) => {
	const [rows, setRows] = useState(3);
	const [cols, setCols] = useState(3);
	const [isOpen, setIsOpen] = useState(false);

	const generateTable = useCallback(() => {
		let tableHtml = '<table class="border-collapse border border-gray-300">';

		// 表头
		tableHtml += '<thead><tr>';
		for (let i = 0; i < cols; i++) {
			tableHtml += '<th class="border border-gray-300 px-4 py-2 bg-gray-50">标题 ' + (i + 1) + '</th>';
		}
		tableHtml += '</tr></thead>';

		// 表体
		tableHtml += '<tbody>';
		for (let i = 0; i < rows; i++) {
			tableHtml += '<tr>';
			for (let j = 0; j < cols; j++) {
				tableHtml += '<td class="border border-gray-300 px-4 py-2">单元格 ' + (i * cols + j + 1) + '</td>';
			}
			tableHtml += '</tr>';
		}
		tableHtml += '</tbody></table>';

		onInsert(tableHtml);
		setIsOpen(false);
	}, [rows, cols, onInsert]);

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="p-1.5 rounded hover:bg-gray-200"
				title="插入表格"
			>
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
				</svg>
			</button>
			{isOpen && (
				<div className="absolute top-full left-0 mt-1 p-4 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
					<h4 className="font-medium text-gray-900 mb-3">插入表格</h4>
					<div className="space-y-3">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">行数</label>
							<input
								type="number"
								min="1"
								max="10"
								value={rows}
								onChange={(e) => setRows(parseInt(e.target.value) || 1)}
								className="w-20 px-2 py-1 border border-gray-300 rounded"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">列数</label>
							<input
								type="number"
								min="1"
								max="10"
								value={cols}
								onChange={(e) => setCols(parseInt(e.target.value) || 1)}
								className="w-20 px-2 py-1 border border-gray-300 rounded"
							/>
						</div>
						<div className="flex gap-2">
							<button
								onClick={generateTable}
								className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
							>
								插入
							</button>
							<button
								onClick={() => setIsOpen(false)}
								className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
							>
								取消
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

// 链接对话框组件
const LinkDialog: React.FC<{
	onInsert: (url: string, text: string) => void;
}> = ({ onInsert }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [url, setUrl] = useState('');
	const [text, setText] = useState('');

	const handleInsert = useCallback(() => {
		if (url.trim()) {
			onInsert(url, text.trim() || url);
			setUrl('');
			setText('');
			setIsOpen(false);
		}
	}, [url, text, onInsert]);

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="p-1.5 rounded hover:bg-gray-200"
				title="插入链接"
			>
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
				</svg>
			</button>
			{isOpen && (
				<div className="absolute top-full left-0 mt-1 p-4 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-80">
					<h4 className="font-medium text-gray-900 mb-3">插入链接</h4>
					<div className="space-y-3">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">链接地址</label>
							<input
								type="url"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								placeholder="https://example.com"
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">显示文字</label>
							<input
								type="text"
								value={text}
								onChange={(e) => setText(e.target.value)}
								placeholder="链接文字"
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div className="flex gap-2">
							<button
								onClick={handleInsert}
								className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
							>
								插入
							</button>
							<button
								onClick={() => setIsOpen(false)}
								className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
							>
								取消
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

// 图片上传组件
const ImageUploader: React.FC<{
	onInsert: (url: string, alt: string) => void;
}> = ({ onInsert }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [url, setUrl] = useState('');
	const [alt, setAlt] = useState('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleInsert = useCallback(() => {
		if (url.trim()) {
			onInsert(url, alt.trim());
			setUrl('');
			setAlt('');
			setIsOpen(false);
		}
	}, [url, alt, onInsert]);

	const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const dataUrl = e.target?.result as string;
				setUrl(dataUrl);
				setAlt(file.name);
			};
			reader.readAsDataURL(file);
		}
	}, []);

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="p-1.5 rounded hover:bg-gray-200"
				title="插入图片"
			>
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			</button>
			{isOpen && (
				<div className="absolute top-full left-0 mt-1 p-4 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-80">
					<h4 className="font-medium text-gray-900 mb-3">插入图片</h4>
					<div className="space-y-3">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">图片地址</label>
							<input
								type="url"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								placeholder="https://example.com/image.jpg"
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">替换文本</label>
							<input
								type="text"
								value={alt}
								onChange={(e) => setAlt(e.target.value)}
								placeholder="图片描述"
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div className="border-t pt-3">
							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								onChange={handleFileSelect}
								className="hidden"
							/>
							<button
								onClick={() => fileInputRef.current?.click()}
								className="w-full px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200"
							>
								选择本地文件
							</button>
						</div>
						<div className="flex gap-2">
							<button
								onClick={handleInsert}
								disabled={!url.trim()}
								className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								插入
							</button>
							<button
								onClick={() => setIsOpen(false)}
								className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
							>
								取消
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

// 高级富文本编辑器组件
const AdvancedRichTextEditor: React.FC<{
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}> = ({ value, onChange, placeholder = "请输入内容..." }) => {
	const editorRef = React.useRef<HTMLDivElement>(null);

	// 执行编辑命令
	const executeCommand = useCallback((command: string, value?: any) => {
		if (!editorRef.current) return;

		if (command === 'insertHTML') {
			document.execCommand('insertHTML', false, value);
		} else if (command === 'insertLink') {
			const selection = window.getSelection();
			if (selection && selection.toString()) {
				document.execCommand('createLink', false, value);
			} else {
				const linkHtml = `<a href="${value}" target="_blank">${value}</a>`;
				document.execCommand('insertHTML', false, linkHtml);
			}
		} else if (command === 'insertImage') {
			const imgHtml = `<img src="${value.url}" alt="${value.alt}" style="max-width: 100%; height: auto;" />`;
			document.execCommand('insertHTML', false, imgHtml);
		} else {
			document.execCommand(command, false, value);
		}

		const content = editorRef.current.innerHTML;
		onChange(content);
	}, [onChange]);

	// 处理输入变化
	const handleInput = useCallback(() => {
		if (!editorRef.current) return;
		const content = editorRef.current.innerHTML;
		onChange(content);
	}, [onChange]);

	// 处理粘贴事件
	const handlePaste = useCallback((e: React.ClipboardEvent) => {
		e.preventDefault();
		const text = e.clipboardData.getData('text/plain');
		const html = e.clipboardData.getData('text/html');

		if (html) {
			executeCommand('insertHTML', html);
		} else {
			executeCommand('insertText', text);
		}
	}, [executeCommand]);

	return (
		<div className="border border-gray-300 rounded-lg overflow-hidden">
			{/* 高级工具栏 */}
			<div className="bg-gray-50 border-b border-gray-300 p-2">
				<div className="flex items-center flex-wrap gap-2">
					{/* 基础格式化 */}
					<div className="flex items-center gap-1 border-r border-gray-300 pr-2">
						<button
							onClick={() => executeCommand('bold')}
							className="p-1.5 rounded hover:bg-gray-200 font-bold"
							title="粗体"
						>
							B
						</button>
						<button
							onClick={() => executeCommand('italic')}
							className="p-1.5 rounded hover:bg-gray-200 italic"
							title="斜体"
						>
							I
						</button>
						<button
							onClick={() => executeCommand('underline')}
							className="p-1.5 rounded hover:bg-gray-200 underline"
							title="下划线"
						>
							U
						</button>
					</div>

					{/* 高级元素 */}
					<div className="flex items-center gap-1 border-r border-gray-300 pr-2">
						<TableGenerator onInsert={(html) => executeCommand('insertHTML', html)} />
						<LinkDialog
							onInsert={(url, text) => executeCommand('insertLink', url)}
						/>
						<ImageUploader
							onInsert={(url, alt) => executeCommand('insertImage', { url, alt })}
						/>
					</div>

					{/* 段落格式 */}
					<div className="flex items-center gap-1">
						<select
							onChange={(e) => executeCommand('formatBlock', e.target.value)}
							className="px-2 py-1 border border-gray-300 rounded text-sm"
						>
							<option value="">正文</option>
							<option value="h1">标题 1</option>
							<option value="h2">标题 2</option>
							<option value="h3">标题 3</option>
							<option value="blockquote">引用</option>
							<option value="pre">代码块</option>
						</select>
					</div>
				</div>
			</div>

			{/* 编辑区域 */}
			<div
				ref={editorRef}
				contentEditable
				onInput={handleInput}
				onPaste={handlePaste}
				className="min-h-[400px] p-4 focus:outline-none"
				dangerouslySetInnerHTML={{ __html: value }}
				data-placeholder={placeholder}
				style={{
					color: value ? undefined : '#9ca3af'
				}}
			/>
		</div>
	);
};

const AdvancedRichTextContent = () => {
	const [content, setContent] = useState(
		`<h2>高级富文本编辑器演示</h2>
<p>这是一个功能强大的高级富文本编辑器，支持表格、链接、图片等复杂内容。</p>
<h3>主要特性</h3>
<ul>
<li><strong>表格支持</strong>：插入和编辑表格</li>
<li><strong>链接管理</strong>：插入和编辑超链接</li>
<li><strong>图片处理</strong>：支持本地和网络图片</li>
<li><strong>高级格式化</strong>：丰富的文本格式选项</li>
</ul>
<blockquote>
<p>这个编辑器适用于企业级应用，满足复杂的内容编辑需求。</p>
</blockquote>`
	);

	const [showPreview, setShowPreview] = useState(false);
	const [charCount, setCharCount] = useState(0);
	const [wordCount, setWordCount] = useState(0);

	// 统计字符和字数
	useEffect(() => {
		const textContent = content.replace(/<[^>]*>/g, '');
		setCharCount(textContent.length);
		setWordCount(textContent.trim() ? textContent.trim().split(/\s+/).length : 0);
	}, [content]);

	return (
		<div className="p-6 max-w-6xl mx-auto">
			{/* 页面标题 */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-4">
					高级富文本编辑器
				</h1>
				<p className="text-lg text-gray-600">
					演示表格、链接、图片等高级编辑功能
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* 编辑器区域 */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
						<div className="p-4 bg-gray-50 border-b border-gray-200">
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-semibold text-gray-900">高级编辑器</h2>
								<button
									onClick={() => setShowPreview(!showPreview)}
									className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
								>
									{showPreview ? '编辑' : '预览'}
								</button>
							</div>
						</div>
						<div className="p-4">
							{showPreview ? (
								<div
									className="min-h-[400px] p-4 border border-gray-200 rounded prose max-w-none"
									dangerouslySetInnerHTML={{ __html: content }}
								/>
							) : (
								<AdvancedRichTextEditor
									value={content}
									onChange={setContent}
									placeholder="请输入您的内容..."
								/>
							)}

							{/* 统计信息 */}
							<div className="mt-4 flex items-center justify-between text-sm text-gray-500">
								<div className="flex items-center gap-4">
									<span>字符数: {charCount}</span>
									<span>字数: {wordCount}</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
										高级模式
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 侧边栏 */}
				<div className="lg:col-span-1 space-y-6">
					{/* 功能说明 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">高级功能</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>表格插入和编辑</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>链接管理和验证</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>图片上传和编辑</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>富文本格式化</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>实时预览功能</span>
							</li>
						</ul>
					</div>

					{/* 使用技巧 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">使用技巧</h3>
						<div className="space-y-3 text-sm text-gray-600">
							<div>
								<h4 className="font-medium text-gray-900 mb-1">表格操作</h4>
								<p>点击表格按钮设置行列数，自动生成表格结构</p>
							</div>
							<div>
								<h4 className="font-medium text-gray-900 mb-1">链接插入</h4>
								<p>支持URL和文本分离设置，可设置链接文字</p>
							</div>
							<div>
								<h4 className="font-medium text-gray-900 mb-1">图片上传</h4>
								<p>支持网络URL和本地文件上传</p>
							</div>
						</div>
					</div>

					{/* 技术实现 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">技术特点</h3>
						<div className="space-y-2 text-sm text-gray-600">
							<p><strong>组件化:</strong> 模块化工具栏设计</p>
							<p><strong>扩展性:</strong> 插件式功能架构</p>
							<p><strong>交互:</strong> 对话框式参数设置</p>
							<p><strong>兼容:</strong> 支持多种内容格式</p>
						</div>
					</div>

					{/* 快速导航 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">相关功能</h3>
						<div className="space-y-2">
							<a
								href="/rich-text/table"
								className="block text-sm text-blue-600 hover:text-blue-700"
							>
								表格高级编辑 →
							</a>
							<a
								href="/rich-text/link"
								className="block text-sm text-blue-600 hover:text-blue-700"
							>
								链接管理系统 →
							</a>
							<a
								href="/rich-text/media"
								className="block text-sm text-blue-600 hover:text-blue-700"
							>
								媒体内容支持 →
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function AdvancedRichTextPage() {
	return (
		<Layout>
			<AdvancedRichTextContent />
		</Layout>
	);
}
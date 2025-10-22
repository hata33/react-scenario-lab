"use client";

import React, { useState, useCallback, useEffect } from "react";
import Layout from "@/components/Layout";

// 基础富文本编辑器组件
const BasicRichTextEditor: React.FC<{
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}> = ({ value, onChange, placeholder = "请输入内容..." }) => {
	const [isComposing, setIsComposing] = useState(false);
	const editorRef = React.useRef<HTMLDivElement>(null);
	const [history, setHistory] = useState<{ past: string[]; present: string; future: string[] }>({
		past: [],
		present: value,
		future: []
	});

	// 命令模式 - 撤销/重做
	const executeCommand = useCallback((command: string, value?: any) => {
		if (!editorRef.current) return;

		document.execCommand(command, false, value);
		const content = editorRef.current.innerHTML;
		onChange(content);
		updateHistory(content);
	}, [onChange]);

	// 更新历史记录
	const updateHistory = useCallback((newContent: string) => {
		setHistory(prev => ({
			past: [...prev.past.slice(-19), prev.present], // 保留最近20条
			present: newContent,
			future: []
		}));
	}, []);

	// 处理输入变化
	const handleInput = useCallback(() => {
		if (!editorRef.current || isComposing) return;
		const content = editorRef.current.innerHTML;
		onChange(content);
		updateHistory(content);
	}, [onChange, updateHistory, isComposing]);

	// 撤销
	const undo = useCallback(() => {
		if (history.past.length === 0) return;
		const previous = history.past[history.past.length - 1];
		const newHistory = {
			past: history.past.slice(0, history.past.length - 1),
			present: previous,
			future: [history.present, ...history.future]
		};
		setHistory(newHistory);
		if (editorRef.current) {
			editorRef.current.innerHTML = previous;
			onChange(previous);
		}
	}, [history, onChange]);

	// 重做
	const redo = useCallback(() => {
		if (history.future.length === 0) return;
		const next = history.future[0];
		const newHistory = {
			past: [...history.past, history.present],
			present: next,
			future: history.future.slice(1)
		};
		setHistory(newHistory);
		if (editorRef.current) {
			editorRef.current.innerHTML = next;
			onChange(next);
		}
	}, [history, onChange]);

	// 处理键盘快捷键
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey || e.metaKey) {
				switch (e.key) {
					case 'z':
						if (e.shiftKey) {
							e.preventDefault();
							redo();
						} else {
							e.preventDefault();
							undo();
						}
						break;
					case 'y':
						e.preventDefault();
						redo();
						break;
					case 'a':
						e.preventDefault();
						executeCommand('selectAll');
						break;
				}
			}
		};

		const editor = editorRef.current;
		if (editor) {
			editor.addEventListener('keydown', handleKeyDown);
			return () => editor.removeEventListener('keydown', handleKeyDown);
		}
	}, [executeCommand, undo, redo]);

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
			{/* 工具栏 */}
			<div className="bg-gray-50 border-b border-gray-300 p-2">
				<div className="flex items-center gap-2">
					{/* 历史操作 */}
					<div className="flex items-center gap-1 border-r border-gray-300 pr-2">
						<button
							onClick={undo}
							disabled={history.past.length === 0}
							className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
							title="撤销 (Ctrl+Z)"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
							</svg>
						</button>
						<button
							onClick={redo}
							disabled={history.future.length === 0}
							className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
							title="重做 (Ctrl+Y)"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
							</svg>
						</button>
					</div>

					{/* 基础格式化 */}
					<div className="flex items-center gap-1 border-r border-gray-300 pr-2">
						<button
							onClick={() => executeCommand('bold')}
							className="p-1.5 rounded hover:bg-gray-200 font-bold"
							title="粗体 (Ctrl+B)"
						>
							B
						</button>
						<button
							onClick={() => executeCommand('italic')}
							className="p-1.5 rounded hover:bg-gray-200 italic"
							title="斜体 (Ctrl+I)"
						>
							I
						</button>
						<button
							onClick={() => executeCommand('underline')}
							className="p-1.5 rounded hover:bg-gray-200 underline"
							title="下划线 (Ctrl+U)"
						>
							U
						</button>
						<button
							onClick={() => executeCommand('strikeThrough')}
							className="p-1.5 rounded hover:bg-gray-200 line-through"
							title="删除线"
						>
							S
						</button>
					</div>

					{/* 文本格式 */}
					<div className="flex items-center gap-1 border-r border-gray-300 pr-2">
						<select
							onChange={(e) => executeCommand('formatBlock', e.target.value)}
							className="px-2 py-1 border border-gray-300 rounded text-sm"
						>
							<option value="">正文</option>
							<option value="h1">标题 1</option>
							<option value="h2">标题 2</option>
							<option value="h3">标题 3</option>
							<option value="h4">标题 4</option>
							<option value="h5">标题 5</option>
							<option value="h6">标题 6</option>
						</select>
					</div>

					{/* 列表 */}
					<div className="flex items-center gap-1 border-r border-gray-300 pr-2">
						<button
							onClick={() => executeCommand('insertUnorderedList')}
							className="p-1.5 rounded hover:bg-gray-200"
							title="无序列表"
						>
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M4 10h16v2H4v-2zm0-4h16v2H4V6zm0 8h16v2H4v-2zm-2 4h2v2H2v-2zm0-8h2v2H2v-2zm0-4h2v2H2V6z"/>
							</svg>
						</button>
						<button
							onClick={() => executeCommand('insertOrderedList')}
							className="p-1.5 rounded hover:bg-gray-200"
							title="有序列表"
						>
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M4 10h16v2H4v-2zm0-4h16v2H4V6zm0 8h16v2H4v-2zm1-10h2v2H5V2zm0 8h2v2H5v-2zm0 4h2v2H5v-2z"/>
							</svg>
						</button>
					</div>

					{/* 对齐 */}
					<div className="flex items-center gap-1">
						<button
							onClick={() => executeCommand('justifyLeft')}
							className="p-1.5 rounded hover:bg-gray-200"
							title="左对齐"
						>
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M15 15v2h10v-2H15zm0-8h10v2H15V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/>
							</svg>
						</button>
						<button
							onClick={() => executeCommand('justifyCenter')}
							className="p-1.5 rounded hover:bg-gray-200"
							title="居中"
						>
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-4h12v2H7V7zM3 3v2h18V3H3z"/>
							</svg>
						</button>
						<button
							onClick={() => executeCommand('justifyRight')}
							className="p-1.5 rounded hover:bg-gray-200"
							title="右对齐"
						>
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* 编辑区域 */}
			<div
				ref={editorRef}
				contentEditable
				onInput={handleInput}
				onPaste={handlePaste}
				onCompositionStart={() => setIsComposing(true)}
				onCompositionEnd={() => setIsComposing(false)}
				className="min-h-[300px] p-4 focus:outline-none"
				dangerouslySetInnerHTML={{ __html: value }}
				data-placeholder={placeholder}
				style={{
					color: value ? undefined : '#9ca3af'
				}}
			/>
		</div>
	);
};

const BasicRichTextContent = () => {
	const [content, setContent] = useState("<p>欢迎使用基础富文本编辑器！</p><p>这是一个功能强大的编辑器，支持基础的文本编辑功能。</p>");
	const [showHTML, setShowHTML] = useState(false);
	const [charCount, setCharCount] = useState(0);
	const [wordCount, setWordCount] = useState(0);

	// 统计字符和字数
	useEffect(() => {
		const textContent = content.replace(/<[^>]*>/g, '');
		setCharCount(textContent.length);
		setWordCount(textContent.trim() ? textContent.trim().split(/\s+/).length : 0);
	}, [content]);

	// 格式化HTML
	const formatHTML = (html: string) => {
		const div = document.createElement('div');
		div.innerHTML = html;
		return div.innerHTML.replace(/></g, '>\n<');
	};

	return (
		<div className="p-6 max-w-6xl mx-auto">
			{/* 页面标题 */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-4">
					基础富文本编辑器
				</h1>
				<p className="text-lg text-gray-600">
					演示文本输入、撤销重做、复制粘贴等基础编辑功能
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* 编辑器区域 */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
						<div className="p-4 bg-gray-50 border-b border-gray-200">
							<h2 className="text-lg font-semibold text-gray-900">编辑区域</h2>
						</div>
						<div className="p-4">
							<BasicRichTextEditor
								value={content}
								onChange={setContent}
								placeholder="请输入您的内容..."
							/>

							{/* 统计信息 */}
							<div className="mt-4 flex items-center justify-between text-sm text-gray-500">
								<div className="flex items-center gap-4">
									<span>字符数: {charCount}</span>
									<span>字数: {wordCount}</span>
								</div>
								<button
									onClick={() => setShowHTML(!showHTML)}
									className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
								>
									{showHTML ? '隐藏' : '显示'} HTML
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* 侧边栏 */}
				<div className="lg:col-span-1 space-y-6">
					{/* 功能说明 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">基础功能</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>文本输入和编辑</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>撤销/重做 (Ctrl+Z/Y)</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>复制/粘贴支持</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>基础格式化工具</span>
							</li>
							<li className="flex items-start gap-2">
								<svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
								<span>文本对齐和列表</span>
							</li>
						</ul>
					</div>

					{/* 快捷键说明 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">快捷键</h3>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-600">撤销</span>
								<kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+Z</kbd>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">重做</span>
								<kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+Y</kbd>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">粗体</span>
								<kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+B</kbd>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">斜体</span>
								<kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+I</kbd>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">下划线</span>
								<kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+U</kbd>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">全选</span>
								<kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+A</kbd>
							</div>
						</div>
					</div>

					{/* 技术实现 */}
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
						<h3 className="font-semibold text-gray-900 mb-3">技术实现</h3>
						<div className="space-y-2 text-sm text-gray-600">
							<p><strong>核心:</strong> ContentEditable API</p>
							<p><strong>命令:</strong> document.execCommand()</p>
							<p><strong>历史:</strong> Command Pattern + Undo Stack</p>
							<p><strong>事件:</strong> Input Event + Clipboard API</p>
						</div>
					</div>
				</div>
			</div>

			{/* HTML代码预览 */}
			{showHTML && (
				<div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
					<div className="p-4 bg-gray-50 border-b border-gray-200">
						<h3 className="font-semibold text-gray-900">HTML 源码</h3>
					</div>
					<div className="p-4">
						<pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
							<code>{formatHTML(content)}</code>
						</pre>
					</div>
				</div>
			)}
		</div>
	);
};

export default function BasicRichTextPage() {
	return (
		<Layout>
			<BasicRichTextContent />
		</Layout>
	);
}
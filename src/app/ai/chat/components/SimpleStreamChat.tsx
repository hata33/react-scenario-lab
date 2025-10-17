"use client";

import { BookOpen, Bot, Menu, Send, Square, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useChatHistory } from "../hooks/useChatHistory";
import { PromptTemplate } from "../types/prompt";
import ChatSidebar from "./ChatSidebar";
import MarkdownMessage from "./MarkdownMessage";
import PromptTemplateLibrary from "./PromptTemplateLibrary";

export default function SimpleStreamChat() {
	const [inputValue, setInputValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [streamingText, setStreamingText] = useState("");
	const [isStreaming, setIsStreaming] = useState(false);
	const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
	const [textareaHeight, setTextareaHeight] = useState("auto");
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const streamTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const { currentHistory, createHistory, addMessage } = useChatHistory();

	// 自动滚动到底部
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [currentHistory?.messages, streamingText]);

	// 自动调整 textarea 高度
	useEffect(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			// 重置高度以获取正确的 scrollHeight
			textarea.style.height = "auto";
			// 计算新高度，最小 60px，最大 200px
			const newHeight = Math.min(Math.max(textarea.scrollHeight, 60), 200);
			textarea.style.height = `${newHeight}px`;
			setTextareaHeight(`${newHeight}px`);
		}
	}, [inputValue]);

	// 如果没有当前对话，创建一个新的
	useEffect(() => {
		if (!currentHistory) {
			createHistory();
		}
	}, [currentHistory, createHistory]);

	// 流式输出函数
	const streamText = async (
		text: string,
		onUpdate: (chunk: string) => void,
	) => {
		setIsStreaming(true);
		setStreamingText("");

		const chars = text.split("");
		let currentText = "";

		for (let i = 0; i < chars.length; i++) {
			currentText += chars[i];
			setStreamingText(currentText);
			onUpdate(currentText);

			// 随机延迟 10-50ms
			const delay = Math.random() * 40 + 10;
			await new Promise((resolve) => {
				streamTimeoutRef.current = setTimeout(resolve, delay);
			});

			// 在标点符号处稍微停顿
			if (["。", "！", "？", "\n", "，", "；"].includes(chars[i])) {
				await new Promise((resolve) => {
					streamTimeoutRef.current = setTimeout(
						resolve,
						Math.random() * 150 + 50,
					);
				});
			}
		}

		setIsStreaming(false);
		setStreamingText("");
		return currentText;
	};

	const handleSendMessage = async () => {
		if (!inputValue.trim() || isTyping || isStreaming) return;

		// 添加用户消息
		addMessage({
			type: "user",
			content: inputValue.trim(),
		});

		const userMessage = inputValue.trim();
		setInputValue("");

		// 重置 textarea 高度
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = "60px";
			setTextareaHeight("60px");
		}

		setIsTyping(true);

		// 生成 AI 响应内容
		let aiResponse = "";

		if (userMessage.includes("代码") || userMessage.includes("code")) {
			aiResponse = `这里是一个代码示例：

\`\`\`javascript
// React 组件示例
function WelcomeMessage({ name }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>欢迎, {name}!</h1>
      <p>点击次数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}

export default WelcomeMessage;
\`\`\`

这个组件展示了：
1. **函数式组件**的写法
2. **useState Hook** 的使用
3. **事件处理** 的基本方法

你可以这样使用它：
\`\`\`jsx
<WelcomeMessage name="开发者" />
\`\`\`

这就是代码高亮和 Markdown 渲染的效果！注意这段文字正在通过流式输出逐字显示。`;
		} else if (userMessage.includes("表格") || userMessage.includes("table")) {
			aiResponse = `这是一个 Markdown 表格示例：

| 功能 | 状态 | 描述 |
|------|------|------|
| ✅ Markdown 渲染 | 已完成 | 支持完整的 Markdown 语法 |
| ✅ 代码高亮 | 已完成 | 支持多种编程语言 |
| ✅ 历史记录 | 已完成 | 自动保存对话历史 |
| 🔄 AI 集成 | 开发中 | 即将支持多种 AI 模型 |
| 📱 响应式设计 | 已完成 | 适配各种设备屏幕 |
| ⚡ 流式输出 | 已完成 | 模拟真实 AI 响应效果 |

### 主要特性

- 🎨 **美观的界面设计**
- 📝 **完整的 Markdown 支持**
- 💾 **自动保存对话历史**
- 🚀 **快速响应的交互**
- ⚡ **流式输出显示**

表格、列表、代码块等各种 Markdown 格式都能完美渲染！`;
		} else if (userMessage.includes("列表") || userMessage.includes("list")) {
			aiResponse = `# 列表示例

## 无序列表
- 第一项内容
- 第二项内容
  - 子项目 A
  - 子项目 B
    - 深层子项目 1
    - 深层子项目 2
- 第三项内容

## 有序列表
1. 首先做这个
2. 然后做那个
3. 最后完成其他

## 任务列表
- [x] 已完成的任务
- [ ] 待完成的任务
- [ ] 另一个待办事项

> 💡 **提示**: 你可以试试输入"代码"、"表格"或"列表"来查看不同的 Markdown 渲染效果！

所有这些内容都是通过流式输出逐字显示的，就像真实的 AI 响应一样。`;
		} else {
			aiResponse = `你好！我是 AI 助手。我支持 **Markdown 渲染** 和 **流式输出**，可以显示丰富的格式内容。

### 我可以展示：

- **代码高亮** - 输入"代码"查看示例
- **表格** - 输入"表格"查看示例
- **列表** - 输入"列表"查看示例
- **引用** - 像这样的引用块
- *斜体* 和 **粗体** 文本
- [链接](https://example.com) 和其他格式

> 这是一段引用文本，用来强调重要内容。
>
> 注意这段文字正在通过流式输出逐字显示，模拟真实 AI 的响应效果。

试试输入不同的关键词来体验各种 Markdown 功能和流式输出效果吧！

这个演示展示了如何在前端实现类似 ChatGPT 的流式输出效果。`;
		}

		// 开始流式输出
		const finalContent = await streamText(aiResponse, () => {});

		// 添加最终的 AI 消息
		addMessage({
			type: "assistant",
			content: finalContent,
		});

		setIsTyping(false);
	};

	// 停止流式输出
	const handleStopStream = () => {
		if (streamTimeoutRef.current) {
			clearTimeout(streamTimeoutRef.current);
		}
		setIsStreaming(false);
		setStreamingText("");
		setIsTyping(false);

		// 如果有流式文本，添加为消息
		if (streamingText.trim()) {
			addMessage({
				type: "assistant",
				content: streamingText,
			});
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		// Enter 发送，Shift+Enter 换行
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}

		// Ctrl/Cmd + Enter 发送（不管是否按 Shift）
		if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
			e.preventDefault();
			handleSendMessage();
		}

		// Escape 清空输入
		if (e.key === "Escape") {
			e.preventDefault();
			setInputValue("");
			if (textareaRef.current) {
				textareaRef.current.style.height = "auto";
				textareaRef.current.style.height = "60px";
				setTextareaHeight("60px");
			}
		}
	};

	// 处理输入变化
	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
	};

	// 处理粘贴事件
	const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		const pastedText = e.clipboardData.getData("text");
		setInputValue((prev) => prev + pastedText);

		// 粘贴后重新调整高度
		setTimeout(() => {
			const textarea = textareaRef.current;
			if (textarea) {
				textarea.style.height = "auto";
				const newHeight = Math.min(Math.max(textarea.scrollHeight, 60), 200);
				textarea.style.height = `${newHeight}px`;
			}
		}, 0);
	};

	// 处理模板选择
	const handleSelectTemplate = (
		template: PromptTemplate,
		variables?: Record<string, string>,
	) => {
		// 获取处理后的模板内容
		let content = template.content;

		if (variables && Object.keys(variables).length > 0) {
			// 替换变量
			Object.entries(variables).forEach(([key, value]) => {
				content = content.replace(new RegExp(`{{${key}}}`, "g"), value);
			});
		}

		// 设置到输入框
		setInputValue(content);
	};

	return (
		<div className="flex h-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
			{/* 侧边栏 */}
			<ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

			{/* 主聊天区域 */}
			<div className="flex-1 flex flex-col">
				{/* 头部 */}
				<div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
					<div className="flex items-center gap-3">
						<button
							onClick={() => setSidebarOpen(true)}
							className="p-2 hover:bg-gray-200 rounded-lg transition-colors lg:hidden"
						>
							<Menu className="w-5 h-5" />
						</button>
						<div>
							<h2 className="font-semibold text-gray-800">
								{currentHistory?.title || "AI 对话"}
							</h2>
							<p className="text-sm text-gray-500">
								{currentHistory?.messages.length || 0} 条消息
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={() => setShowTemplateLibrary(true)}
							className="px-3 py-1.5 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-1"
							title="提示词模板库"
						>
							<BookOpen className="w-4 h-4" />
							模板库
						</button>
						<button
							onClick={() => createHistory()}
							className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
						>
							新建对话
						</button>
					</div>
				</div>

				{/* 消息列表 */}
				<div className="flex-1 overflow-y-auto p-4 space-y-4">
					{currentHistory?.messages.length === 0 ? (
						<div className="text-center py-12">
							<Bot className="w-16 h-16 mx-auto mb-4 text-gray-300" />
							<h3 className="text-lg font-medium text-gray-600 mb-2">
								开始新的对话
							</h3>
							<p className="text-gray-500">输入消息开始与 AI 助手对话</p>
							<div className="mt-6 text-sm text-gray-400">
								<p>试试输入：</p>
								<div className="flex flex-wrap gap-2 justify-center mt-2">
									<span className="px-2 py-1 bg-gray-100 rounded">"代码"</span>
									<span className="px-2 py-1 bg-gray-100 rounded">"表格"</span>
									<span className="px-2 py-1 bg-gray-100 rounded">"列表"</span>
								</div>
							</div>
						</div>
					) : (
						currentHistory?.messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`flex items-start gap-3 max-w-[80%] ${
										message.type === "user" ? "flex-row-reverse" : ""
									}`}
								>
									<div
										className={`
										w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
										${
											message.type === "user"
												? "bg-blue-500 text-white ml-2"
												: "bg-gray-200 text-gray-600 mr-2"
										}
									`}
									>
										{message.type === "user" ? (
											<User className="w-4 h-4" />
										) : (
											<Bot className="w-4 h-4" />
										)}
									</div>
									<div
										className={`
										rounded-lg px-4 py-2 ${
											message.type === "user"
												? "bg-blue-500 text-white"
												: "bg-gray-50 border border-gray-200"
										}
									`}
									>
										{message.type === "assistant" ? (
											<MarkdownMessage
												content={message.content}
												className="text-gray-800"
											/>
										) : (
											<p className="text-sm whitespace-pre-wrap">
												{message.content}
											</p>
										)}
									</div>
								</div>
							</div>
						))
					)}

					{/* 流式输出消息 */}
					{isStreaming && (
						<div className="flex justify-start">
							<div className="flex items-start gap-3 max-w-[80%]">
								<div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 mr-2 flex items-center justify-center">
									<Bot className="w-4 h-4" />
								</div>
								<div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 relative">
									<MarkdownMessage
										content={streamingText}
										className="text-gray-800"
									/>
									{/* 光标 */}
									<span className="inline-block w-2 h-4 bg-gray-600 animate-pulse ml-1"></span>

									{/* 停止按钮 */}
									<button
										onClick={handleStopStream}
										className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
										title="停止生成"
									>
										<Square className="w-3 h-3" />
									</button>
								</div>
							</div>
						</div>
					)}

					<div ref={messagesEndRef} />
				</div>

				{/* 输入区域 */}
				<div className="border-t border-gray-200 bg-white">
					{/* 主输入容器 */}
					<div className="p-4">
						<div className="relative bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-blue-400 transition-colors">
							{/* 自定义滚动区域容器 */}
							<div className="relative min-h-[60px] max-h-[200px] overflow-hidden">
								<textarea
									ref={textareaRef}
									value={inputValue}
									onChange={handleInputChange}
									onKeyDown={handleKeyDown}
									onPaste={handlePaste}
									placeholder={
										isStreaming ? "AI 正在回复中..." : "给 AI 助手发送消息..."
									}
									disabled={isTyping || isStreaming}
									className="w-full px-4 py-3 pr-12 bg-transparent resize-none overflow-y-auto focus:outline-none placeholder:text-gray-400 disabled:text-gray-500 text-gray-900"
									style={{
										minHeight: "60px",
										maxHeight: "200px",
										height: textareaHeight,
										scrollbarWidth: "thin",
										scrollbarColor: "#E5E7EB transparent",
									}}
									rows={1}
									autoFocus
								/>
							</div>

							{/* 字符和行数信息 */}
							{/* {inputValue.length > 50 && (
								<div className="absolute bottom-2 left-2 text-xs text-gray-400 pointer-events-none">
									{inputValue.trim().length} 字符
								</div>
							)} */}

							{/* 发送/停止按钮 */}
							<div className="absolute bottom-2 right-2">
								{isStreaming ? (
									<button
										onClick={handleStopStream}
										className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all duration-200 flex items-center justify-center group"
										title="停止生成"
									>
										<Square className="w-4 h-4 group-hover:scale-110 transition-transform" />
									</button>
								) : (
									<button
										onClick={handleSendMessage}
										disabled={!inputValue.trim() || isTyping}
										className={`w-8 h-8 rounded-xl transition-all duration-200 flex items-center justify-center group ${
											inputValue.trim()
												? "bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 shadow-sm"
												: "bg-gray-100 text-gray-400 cursor-not-allowed"
										}`}
										title="发送消息 (Enter)"
									>
										<Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
									</button>
								)}
							</div>
						</div>
					</div>

					{/* 底部工具栏 */}
					<div className="px-4 pb-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								{/* 模板库按钮 */}
								<button
									onClick={() => setShowTemplateLibrary(true)}
									className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
									title="提示词模板库"
								>
									<BookOpen className="w-4 h-4" />
									<span className="hidden sm:inline">模板库</span>
								</button>

								{/* 功能提示 */}
								<div className="flex items-center gap-2 text-xs text-gray-500">
									<span className="hidden sm:inline">支持 Markdown</span>
									<span className="hidden sm:inline">•</span>
									<span className="hidden sm:inline">代码高亮</span>
									<span className="hidden sm:inline">•</span>
									<span>流式输出</span>
								</div>
							</div>

							{/* 状态信息 */}
							<div className="flex items-center gap-3 text-xs text-gray-500">
								{inputValue.length > 0 && (
									<span className="text-gray-400">
										{inputValue.trim().length} 字符 •{" "}
										{inputValue.split("\n").length} 行
									</span>
								)}
								{isStreaming && (
									<span className="text-blue-600 flex items-center gap-1">
										<div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
										正在生成
									</span>
								)}
							</div>
						</div>

						{/* 快捷键提示 */}
						<div className="mt-2 text-xs text-gray-400 text-center">
							快捷键：Enter 发送 • Shift+Enter 换行 • Ctrl+Enter 发送 • Esc 清空
						</div>
					</div>
				</div>
			</div>

			{/* 提示词模板库弹窗 */}
			<PromptTemplateLibrary
				visible={showTemplateLibrary}
				onClose={() => setShowTemplateLibrary(false)}
				onSelectTemplate={handleSelectTemplate}
			/>
		</div>
	);
}

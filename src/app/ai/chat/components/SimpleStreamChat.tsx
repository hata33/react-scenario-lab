"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, Send, Bot, User, Square } from "lucide-react";
import MarkdownMessage from "./MarkdownMessage";
import ChatSidebar from "./ChatSidebar";
import { useChatHistory } from "../hooks/useChatHistory";

export default function SimpleStreamChat() {
	const [inputValue, setInputValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [streamingText, setStreamingText] = useState("");
	const [isStreaming, setIsStreaming] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const streamTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const {
		currentHistory,
		createHistory,
		addMessage,
	} = useChatHistory();

	// 自动滚动到底部
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [currentHistory?.messages, streamingText]);

	// 如果没有当前对话，创建一个新的
	useEffect(() => {
		if (!currentHistory) {
			createHistory();
		}
	}, [currentHistory, createHistory]);

	// 流式输出函数
	const streamText = async (text: string, onUpdate: (chunk: string) => void) => {
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
			await new Promise(resolve => {
				streamTimeoutRef.current = setTimeout(resolve, delay);
			});

			// 在标点符号处稍微停顿
			if (["。", "！", "？", "\n", "，", "；"].includes(chars[i])) {
				await new Promise(resolve => {
					streamTimeoutRef.current = setTimeout(resolve, Math.random() * 150 + 50);
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

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
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
					<button
						onClick={() => createHistory()}
						className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
					>
						新建对话
					</button>
				</div>

				{/* 消息列表 */}
				<div className="flex-1 overflow-y-auto p-4 space-y-4">
					{currentHistory?.messages.length === 0 ? (
						<div className="text-center py-12">
							<Bot className="w-16 h-16 mx-auto mb-4 text-gray-300" />
							<h3 className="text-lg font-medium text-gray-600 mb-2">
								开始新的对话
							</h3>
							<p className="text-gray-500">
								输入消息开始与 AI 助手对话
							</p>
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
							<div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
								<div className={`flex items-start gap-3 max-w-[80%] ${
									message.type === "user" ? "flex-row-reverse" : ""
								}`}>
									<div className={`
										w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
										${message.type === "user"
											? "bg-blue-500 text-white ml-2"
											: "bg-gray-200 text-gray-600 mr-2"
										}
									`}>
										{message.type === "user" ? (
											<User className="w-4 h-4" />
										) : (
											<Bot className="w-4 h-4" />
										)}
									</div>
									<div className={`
										rounded-lg px-4 py-2 ${
											message.type === "user"
												? "bg-blue-500 text-white"
												: "bg-gray-50 border border-gray-200"
										}
									`}>
										{message.type === "assistant" ? (
											<MarkdownMessage
												content={message.content}
												className="text-gray-800"
											/>
										) : (
											<p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
				<div className="border-t border-gray-200 p-4 bg-gray-50">
					<div className="flex gap-2">
						<input
							type="text"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder={isStreaming ? "AI 正在回复中..." : "输入您的问题... (Shift+Enter 换行)"}
							disabled={isTyping || isStreaming}
							className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
						/>
						{isStreaming ? (
							<button
								onClick={handleStopStream}
								className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2"
							>
								<Square className="w-4 h-4" />
								停止
							</button>
						) : (
							<button
								onClick={handleSendMessage}
								disabled={!inputValue.trim() || isTyping}
								className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
							>
								<Send className="w-4 h-4" />
								发送
							</button>
						)}
					</div>
					<div className="mt-2 text-xs text-gray-500 text-center">
						支持 Markdown 格式 • 代码高亮显示 • 流式输出 • 历史记录自动保存
						{isStreaming && " • 正在流式生成中..."}
					</div>
				</div>
			</div>
		</div>
	);
}
"use client";

import { Bot, Menu, Send, Square, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useChatHistory } from "../hooks/useChatHistory";
import { useStreamResponse } from "../hooks/useStreamResponse";
import ChatSidebar from "./ChatSidebar";
import MarkdownMessage from "./MarkdownMessage";

export default function ChatInterface() {
	const [inputValue, setInputValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [_currentStreamingId, setCurrentStreamingId] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const { currentHistory, createHistory, addMessage } = useChatHistory();

	const { streamingMessage, isStreaming, startStream, stopStream } = useStreamResponse();

	// 自动滚动到底部
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	// 如果没有当前对话，创建一个新的
	useEffect(() => {
		if (!currentHistory) {
			createHistory();
		}
	}, [currentHistory, createHistory]);

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

这就是代码高亮和 Markdown 渲染的效果！`;
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

		// 先添加一个空的助手消息，然后开始流式更新
		const messageId = Date.now().toString();
		setCurrentStreamingId(messageId);

		addMessage({
			type: "assistant",
			content: "",
		});

		// 开始流式输出
		const finalContent = await startStream(aiResponse, (_streamText) => {
			// 实时更新消息内容
			// 这里我们需要通过某种方式更新当前正在流式输出的消息
		});

		// 流式输出完成后，更新最终内容
		addMessage({
			type: "assistant",
			content: finalContent,
		});

		setIsTyping(false);
		setCurrentStreamingId(null);
	};

	// 停止流式输出
	const handleStopStream = () => {
		stopStream();
		setIsTyping(false);
		setCurrentStreamingId(null);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div className="flex h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
			{/* 侧边栏 */}
			<ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

			{/* 主聊天区域 */}
			<div className="flex flex-1 flex-col">
				{/* 头部 */}
				<div className="flex items-center justify-between border-gray-200 border-b bg-gray-50 p-4">
					<div className="flex items-center gap-3">
						<button
							onClick={() => setSidebarOpen(true)}
							className="rounded-lg p-2 transition-colors hover:bg-gray-200 lg:hidden"
						>
							<Menu className="h-5 w-5" />
						</button>
						<div>
							<h2 className="font-semibold text-gray-800">{currentHistory?.title || "AI 对话"}</h2>
							<p className="text-gray-500 text-sm">{currentHistory?.messages.length || 0} 条消息</p>
						</div>
					</div>
					<button
						onClick={() => createHistory()}
						className="rounded-lg bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600"
					>
						新建对话
					</button>
				</div>

				{/* 消息列表 */}
				<div className="flex-1 space-y-4 overflow-y-auto p-4">
					{currentHistory?.messages.length === 0 ? (
						<div className="py-12 text-center">
							<Bot className="mx-auto mb-4 h-16 w-16 text-gray-300" />
							<h3 className="mb-2 font-medium text-gray-600 text-lg">开始新的对话</h3>
							<p className="text-gray-500">输入消息开始与 AI 助手对话</p>
							<div className="mt-6 text-gray-400 text-sm">
								<p>试试输入：</p>
								<div className="mt-2 flex flex-wrap justify-center gap-2">
									<span className="rounded bg-gray-100 px-2 py-1">"代码"</span>
									<span className="rounded bg-gray-100 px-2 py-1">"表格"</span>
									<span className="rounded bg-gray-100 px-2 py-1">"列表"</span>
								</div>
							</div>
						</div>
					) : (
						currentHistory?.messages.map((message) => (
							<div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
								<div
									className={`flex max-w-[80%] items-start gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
								>
									<div
										className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0${message.type === "user" ? "ml-2 bg-blue-500 text-white" : "mr-2 bg-gray-200 text-gray-600"}
									`}
									>
										{message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
									</div>
									<div
										className={`rounded-lg px-4 py-2 ${message.type === "user" ? "bg-blue-500 text-white" : "border border-gray-200 bg-gray-50"}
									`}
									>
										{message.type === "assistant" ? (
											<MarkdownMessage content={message.content} className="text-gray-800" />
										) : (
											<p className="whitespace-pre-wrap text-sm">{message.content}</p>
										)}
									</div>
								</div>
							</div>
						))
					)}

					{/* 流式输出消息 */}
					{isStreaming && (
						<div className="flex justify-start">
							<div className="flex max-w-[80%] items-start gap-3">
								<div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600">
									<Bot className="h-4 w-4" />
								</div>
								<div className="max-w-[80%] rounded-lg border border-gray-200 bg-gray-50 px-4 py-2">
									<MarkdownMessage content={streamingMessage} className="text-gray-800" />
									<div className="mt-2 flex space-x-1">
										<div
											className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
											style={{ animationDelay: "0ms" }}
										></div>
										<div
											className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
											style={{ animationDelay: "150ms" }}
										></div>
										<div
											className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
											style={{ animationDelay: "300ms" }}
										></div>
									</div>
								</div>
								{isStreaming && (
									<button
										onClick={handleStopStream}
										className="rounded p-1 text-red-600 transition-colors hover:bg-red-100"
										title="停止生成"
									>
										<Square className="h-4 w-4" />
									</button>
								)}
							</div>
						</div>
					)}

					{/* 正在输入指示器（非流式时） */}
					{isTyping && !isStreaming && (
						<div className="flex justify-start">
							<div className="flex max-w-[80%] items-start gap-3">
								<div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600">
									<Bot className="h-4 w-4" />
								</div>
								<div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2">
									<div className="flex space-x-1">
										<div
											className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
											style={{ animationDelay: "0ms" }}
										></div>
										<div
											className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
											style={{ animationDelay: "150ms" }}
										></div>
										<div
											className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
											style={{ animationDelay: "300ms" }}
										></div>
									</div>
								</div>
							</div>
						</div>
					)}

					<div ref={messagesEndRef} />
				</div>

				{/* 输入区域 */}
				<div className="border-gray-200 border-t bg-gray-50 p-4">
					<div className="flex gap-2">
						<input
							type="text"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder={isStreaming ? "AI 正在回复中..." : "输入您的问题... (Shift+Enter 换行)"}
							disabled={isTyping || isStreaming}
							className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
						/>
						{isStreaming ? (
							<button
								onClick={handleStopStream}
								className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
							>
								<Square className="h-4 w-4" />
								停止
							</button>
						) : (
							<button
								onClick={handleSendMessage}
								disabled={!inputValue.trim() || isTyping}
								className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
							>
								<Send className="h-4 w-4" />
								发送
							</button>
						)}
					</div>
					<div className="mt-2 text-center text-gray-500 text-xs">
						支持 Markdown 格式 • 代码高亮显示 • 流式输出 • 历史记录自动保存
						{isStreaming && " • 正在流式生成中..."}
					</div>
				</div>
			</div>
		</div>
	);
}

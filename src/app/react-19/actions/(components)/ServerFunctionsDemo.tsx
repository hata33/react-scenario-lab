"use client";

import { useState } from "react";

export default function ServerFunctionsDemo() {
	const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: string; time: string }>>([
		{ id: 1, text: "欢迎来到聊天室！", sender: "系统", time: "10:00" },
	]);
	const [newMessage, setNewMessage] = useState("");
	const [isPending, setIsPending] = useState(false);

	const sendMessage = async (message: string) => {
		// 模拟 Server Function 调用
		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (!message.trim()) {
			return { success: false, message: "消息不能为空" };
		}

		// 模拟消息发送成功
		const newMsg = {
			id: Date.now(),
			text: message,
			sender: "用户",
			time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
		};

		setMessages((prev) => [...prev, newMsg]);
		return { success: true, message: "消息发送成功" };
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);

		const result = await sendMessage(newMessage);
		console.log(result);

		if (result.success) {
			setNewMessage("");
		}

		setIsPending(false);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<div className="mb-4">
				<h4 className="mb-3 font-semibold text-gray-800">💬 模拟聊天室</h4>
				<div className="mb-4 h-48 overflow-y-auto rounded border border-gray-200 bg-white p-3">
					{messages.map((msg) => (
						<div key={msg.id} className="mb-2">
							<div className="flex items-baseline gap-2">
								<span className="font-medium text-gray-500 text-xs">{msg.time}</span>
								<span className={`font-medium text-sm ${msg.sender === "系统" ? "text-blue-600" : "text-green-600"}`}>
									{msg.sender}:
								</span>
							</div>
							<p className="text-gray-800">{msg.text}</p>
						</div>
					))}
				</div>

				<form onSubmit={handleSubmit} className="space-y-3">
					<div className="flex gap-2">
						<input
							type="text"
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							disabled={isPending}
							className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
							placeholder="输入消息..."
						/>
						<button
							type="submit"
							disabled={isPending}
							className={`rounded-md px-4 py-2 font-medium transition-colors ${
								isPending ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-blue-500 text-white hover:bg-blue-600"
							}`}
						>
							{isPending ? "发送中..." : "发送"}
						</button>
					</div>
				</form>
			</div>

			<div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3">
				<p className="text-blue-700 text-xs">
					📝 这里模拟了 Server Functions 的效果。在实际应用中，这些函数会在服务端执行并自动处理序列化。
				</p>
			</div>
		</div>
	);
}

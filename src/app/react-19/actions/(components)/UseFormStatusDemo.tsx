"use client";

import { useState } from "react";

export default function UseFormStatusDemo() {
	const [message, setMessage] = useState("");
	const [isPending, setIsPending] = useState(false);

	const sendMessage = async (formData: FormData) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		const msg = formData.get("message") as string;
		console.log("消息已发送:", msg);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);
		const formData = new FormData();
		formData.append("message", message);
		await sendMessage(formData);
		setIsPending(false);
		setMessage("");
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<form onSubmit={handleSubmit} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">消息内容</label>
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						rows={4}
						placeholder="输入你的消息..."
					/>
				</div>

				<button
					type="submit"
					disabled={isPending || !message.trim()}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						isPending || !message.trim()
							? "cursor-not-allowed bg-gray-400 text-gray-200"
							: "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{isPending ? "发送中..." : "发送消息"}
				</button>

				<div className="rounded-md bg-blue-50 p-4">
					<p className="text-blue-700 text-sm">
						💡 注意：按钮会根据表单状态自动禁用/启用，这就是 useFormStatus 的作用！
					</p>
				</div>
			</form>
		</div>
	);
}

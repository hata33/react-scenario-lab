"use client";

import type React from "react";
import { useState } from "react";

export default function UseActionStateDemo() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [state, setState] = useState<{ error?: string; success?: boolean; message?: string } | null>(null);
	const [isPending, setIsPending] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);
		setState(null);

		// 模拟异步提交
		await new Promise((resolve) => setTimeout(resolve, 1500));

		if (!name || !email) {
			setState({ error: "请填写所有字段" });
		} else if (!email.includes("@")) {
			setState({ error: "请输入有效的邮箱地址" });
		} else {
			setState({ success: true, message: `欢迎 ${name}！注册成功` });
		}

		setIsPending(false);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">📝 用户注册场景</h5>
			<form onSubmit={handleSubmit} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">姓名</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="请输入姓名"
					/>
				</div>

				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">邮箱</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="请输入邮箱"
					/>
				</div>

				<button
					type="submit"
					disabled={isPending}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						isPending ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{isPending ? "提交中..." : "注册"}
				</button>

				{state?.error && (
					<div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">{state.error}</div>
				)}

				{state?.success && (
					<div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-green-700">{state.message}</div>
				)}
			</form>
		</div>
	);
}

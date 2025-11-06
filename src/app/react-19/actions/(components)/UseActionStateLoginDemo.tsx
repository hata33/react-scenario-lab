"use client";

import type React from "react";
import { useState } from "react";

export default function UseActionStateLoginDemo() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [state, setState] = useState<{ error?: string; success?: boolean; message?: string; attempts?: number } | null>(
		null,
	);
	const [isPending, setIsPending] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);
		setState(null);

		// 模拟异步登录
		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (!username || !password) {
			setState({ error: "请填写用户名和密码", attempts: 1 });
		} else if (username !== "admin" || password !== "123456") {
			setState({ error: "用户名或密码错误", attempts: (state?.attempts || 0) + 1 });
		} else {
			setState({ success: true, message: `登录成功！欢迎回来，${username}` });
		}

		setIsPending(false);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🔐 用户登录场景</h5>
			<form onSubmit={handleSubmit} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">用户名</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="试试：admin"
					/>
				</div>

				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">密码</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="试试：123456"
					/>
				</div>

				<button
					type="submit"
					disabled={isPending}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						isPending ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{isPending ? "登录中..." : "登录"}
				</button>

				{state?.error && (
					<div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">
						{state.error}
						{state.attempts && state.attempts > 1 && (
							<p className="mt-1 text-red-600 text-xs">尝试次数：{state.attempts}</p>
						)}
					</div>
				)}

				{state?.success && (
					<div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-green-700">{state.message}</div>
				)}

				<div className="text-gray-500 text-xs">💡 提示：使用 admin/123456 可以成功登录</div>
			</form>
		</div>
	);
}

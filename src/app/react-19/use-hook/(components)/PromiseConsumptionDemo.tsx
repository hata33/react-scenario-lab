"use client";

import { useState } from "react";

// 模拟 Promise
const fetchUser = (id: number, delay: number = 1000): Promise<any> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id,
				name: `User ${id}`,
				email: `user${id}@example.com`,
				role: "user",
				avatar: `https://picsum.photos/100/100?random=${id}`,
			});
		}, delay);
	});
};

export default function PromiseConsumptionDemo() {
	const [userId, setUserId] = useState(1);
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFetchUser = async () => {
		setLoading(true);
		setError(null);

		try {
			// 模拟 use Hook 的 Promise 消费
			const userData = await fetchUser(userId);
			setUser(userData);
		} catch (err) {
			setError(err instanceof Error ? err.message : "获取用户失败");
		} finally {
			setLoading(false);
		}
	};

	const handleRace = async () => {
		setLoading(true);
		setError(null);

		const startTime = performance.now();

		try {
			// 模拟 Promise 竞争
			const promises = [
				fetchUser(userId, 2000).then((data) => ({ source: "Database", data, time: "2s" })),
				fetchUser(userId, 1000).then((data) => ({ source: "Cache", data, time: "1s" })),
				fetchUser(userId, 3000).then((data) => ({ source: "API", data, time: "3s" })),
			];

			const result = await Promise.race(promises);
			const endTime = performance.now();

			setUser(result.data);
			console.log(`Race winner: ${result.source} in ${endTime - startTime}ms`);
		} catch (err) {
			setError("Race condition error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">Promise 消费演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<span className="text-gray-600 text-sm">用户 ID:</span>
						<input
							type="number"
							value={userId}
							onChange={(e) => setUserId(parseInt(e.target.value) || 1)}
							className="w-24 rounded border border-gray-300 px-2 py-1"
							min="1"
						/>
						<button
							onClick={handleFetchUser}
							disabled={loading}
							className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300"
						>
							{loading ? "获取中..." : "获取用户"}
						</button>
						<button
							onClick={handleRace}
							disabled={loading}
							className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:bg-gray-300"
						>
							{loading ? "竞速中..." : "Promise 竞速"}
						</button>
					</div>

					{loading && (
						<div className="flex items-center gap-2 text-blue-600 text-sm">
							<div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
							正在处理请求...
						</div>
					)}

					{error && (
						<div className="rounded-lg bg-red-50 p-3">
							<p className="text-red-800 text-sm">❌ {error}</p>
						</div>
					)}

					{user && (
						<div className="rounded-lg bg-green-50 p-4">
							<div className="flex items-center gap-4">
								<img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full" />
								<div>
									<h5 className="font-medium text-green-900">{user.name}</h5>
									<p className="text-green-700 text-sm">{user.email}</p>
									<p className="text-green-600 text-xs">角色: {user.role}</p>
								</div>
							</div>
						</div>
					)}

					<div className="rounded-lg bg-blue-50 p-3">
						<h5 className="mb-2 font-medium text-blue-800">🎯 use Hook 优势:</h5>
						<ul className="space-y-1 text-blue-700 text-sm">
							<li>• 简化 Promise 消费逻辑</li>
							<li>• 处理竞态条件</li>
							<li>• 统一的错误处理</li>
							<li>• 自动取消机制</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

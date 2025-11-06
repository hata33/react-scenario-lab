"use client";

import { useCallback, useState } from "react";

export default function CacheStrategiesDemo() {
	const [strategy, setStrategy] = useState("ttl");
	const [data, setData] = useState<any[]>([]);
	const [stats, setStats] = useState({ hits: 0, misses: 0, evictions: 0 });

	const strategies = [
		{ value: "ttl", label: "TTL (5秒过期)", description: "数据在5秒后自动过期" },
		{ value: "lru", label: "LRU (最近最少使用)", description: "最多保留10个最近使用的项目" },
		{ value: "size", label: "Size (大小限制)", description: "总数据大小不超过1KB" },
	];

	const addData = useCallback(() => {
		const newItem = {
			id: Date.now(),
			value: Math.random().toString(36).substring(7),
			timestamp: Date.now(),
			strategy,
		};

		setData((prev) => {
			const updated = [...prev, newItem];

			// 应用不同的缓存策略
			if (strategy === "ttl") {
				// TTL: 移除5秒前的数据
				const cutoff = Date.now() - 5000;
				return updated.filter((item) => item.timestamp > cutoff);
			} else if (strategy === "lru") {
				// LRU: 只保留最近的10个项目
				return updated.slice(-10);
			} else if (strategy === "size") {
				// Size: 简单的大小限制演示
				return updated.slice(-5);
			}

			return updated;
		});

		setStats((prev) => ({ ...prev, hits: prev.hits + 1 }));
	}, [strategy]);

	const clearData = useCallback(() => {
		setData([]);
		setStats({ hits: 0, misses: 0, evictions: 0 });
	}, []);

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<h4 className="font-medium">选择缓存策略:</h4>
				<div className="grid gap-2">
					{strategies.map((s) => (
						<label key={s.value} className="flex items-center gap-2">
							<input
								type="radio"
								value={s.value}
								checked={strategy === s.value}
								onChange={(e) => setStrategy(e.target.value)}
							/>
							<div>
								<span className="font-medium">{s.label}</span>
								<p className="text-gray-600 text-sm">{s.description}</p>
							</div>
						</label>
					))}
				</div>
			</div>

			<div className="flex gap-2">
				<button onClick={addData} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
					添加数据
				</button>
				<button onClick={clearData} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
					清空数据
				</button>
			</div>

			<div className="grid grid-cols-3 gap-4 text-center">
				<div className="rounded border border-gray-200 bg-white p-3">
					<div className="font-bold text-blue-600 text-lg">{stats.hits}</div>
					<div className="text-gray-600 text-sm">缓存命中</div>
				</div>
				<div className="rounded border border-gray-200 bg-white p-3">
					<div className="font-bold text-lg text-orange-600">{stats.misses}</div>
					<div className="text-gray-600 text-sm">缓存未命中</div>
				</div>
				<div className="rounded border border-gray-200 bg-white p-3">
					<div className="font-bold text-lg text-red-600">{stats.evictions}</div>
					<div className="text-gray-600 text-sm">缓存淘汰</div>
				</div>
			</div>

			{data.length > 0 && (
				<div className="rounded border border-gray-200 bg-white p-4">
					<h4 className="mb-2 font-medium">缓存数据 ({data.length} 项)</h4>
					<div className="space-y-1">
						{data.map((item) => (
							<div key={item.id} className="flex justify-between text-sm">
								<span>{item.value}</span>
								<span className="text-gray-500">{new Date(item.timestamp).toLocaleTimeString()}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

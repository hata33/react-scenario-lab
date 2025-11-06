"use client";

import { Database } from "lucide-react";
import { useCallback, useState } from "react";

export default function BasicCachingDemo() {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [cacheHits, setCacheHits] = useState(0);

	const fetchData = useCallback(async (forceRefresh = false) => {
		setLoading(true);
		// 模拟 API 调用
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setData({
			id: 1,
			name: "Sample Data",
			timestamp: Date.now(),
			fromCache: !forceRefresh,
		});
		if (!forceRefresh) {
			setCacheHits((prev) => prev + 1);
		}
		setLoading(false);
	}, []);

	return (
		<div className="space-y-4">
			<div className="flex gap-2">
				<button
					onClick={() => fetchData()}
					disabled={loading}
					className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
				>
					{loading ? "加载中..." : "加载数据"}
				</button>
				<button
					onClick={() => fetchData(true)}
					disabled={loading}
					className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
				>
					强制刷新
				</button>
			</div>

			{data && (
				<div className="rounded border border-gray-200 bg-white p-4">
					<h4 className="mb-2 font-medium">数据结果</h4>
					<p>ID: {data.id}</p>
					<p>名称: {data.name}</p>
					<p>时间戳: {new Date(data.timestamp).toLocaleTimeString()}</p>
					<p className="text-gray-600 text-sm">{data.fromCache ? "🎯 来自缓存" : "🌐 网络请求"}</p>
				</div>
			)}

			<div className="text-gray-600 text-sm">缓存命中次数: {cacheHits}</div>
		</div>
	);
}
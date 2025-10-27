"use client";

import { useEffect, useState } from "react";

interface CacheStats {
	memory: {
		hits: number;
		misses: number;
		sets: number;
		deletes: number;
		evictions: number;
		hitRate: number;
	};
	http: {
		memory: {
			hits: number;
			misses: number;
			sets: number;
			deletes: number;
			evictions: number;
			hitRate: number;
		};
		memorySize: number;
	};
	strategy: string;
}

export default function CacheDemo() {
	const [stats, setStats] = useState<CacheStats | null>(null);
	const [testData, setTestData] = useState<string>("");
	const [cacheKey, setCacheKey] = useState<string>("test_key");
	const [result, setResult] = useState<string>("");
	const [loading, setLoading] = useState(false);

	// 动态导入缓存模块
	const [cacheManager, setCacheManager] = useState<any>(null);

	useEffect(() => {
		import("@/lib/cache").then(({ cacheManager }) => {
			setCacheManager(cacheManager);
		});
	}, []);

	useEffect(() => {
		if (cacheManager) {
			const interval = setInterval(() => {
				setStats(cacheManager.getMetrics());
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [cacheManager]);

	const handleSetCache = async () => {
		if (!cacheManager || !cacheKey || !testData) return;

		try {
			await cacheManager.setAny(cacheKey, testData, {
				ttl: 30000, // 30秒
				storage: "memory",
			});
			setResult(`数据已缓存: ${cacheKey}`);
		} catch (error) {
			setResult(`缓存失败: ${error}`);
		}
	};

	const handleGetCache = async () => {
		if (!cacheManager || !cacheKey) return;

		try {
			const data = await cacheManager.getAny(cacheKey);
			setResult(data ? `获取到数据: ${data}` : "未找到缓存数据");
		} catch (error) {
			setResult(`获取失败: ${error}`);
		}
	};

	const handleRemoveCache = async () => {
		if (!cacheManager || !cacheKey) return;

		try {
			await cacheManager.removeAny(cacheKey);
			setResult(`已删除缓存: ${cacheKey}`);
		} catch (error) {
			setResult(`删除失败: ${error}`);
		}
	};

	const handleTestHttpCache = async () => {
		if (!cacheManager) return;

		setLoading(true);
		try {
			// 模拟 API 请求
			const testUrl = "https://jsonplaceholder.typicode.com/posts/1";

			// 第一次请求（应该发起新请求）
			const start1 = performance.now();
			await cacheManager.getHttp(testUrl);
			const time1 = performance.now() - start1;

			// 第二次请求（应该从缓存获取）
			const start2 = performance.now();
			await cacheManager.getHttp(testUrl);
			const time2 = performance.now() - start2;

			setResult(
				`HTTP 缓存测试完成\n第一次请求: ${time1.toFixed(2)}ms\n第二次请求: ${time2.toFixed(2)}ms\n速度提升: ${(((time1 - time2) / time1) * 100).toFixed(1)}%`,
			);
		} catch (error) {
			setResult(`HTTP 缓存测试失败: ${error}`);
		} finally {
			setLoading(false);
		}
	};

	const handleClearAll = async () => {
		if (!cacheManager) return;

		try {
			await cacheManager.clearAll();
			setResult("已清空所有缓存");
		} catch (error) {
			setResult(`清空失败: ${error}`);
		}
	};

	if (!cacheManager) {
		return <div className="p-4">加载缓存系统...</div>;
	}

	return (
		<div className="space-y-6">
			{/* 缓存统计 */}
			<div className="rounded-lg bg-gray-50 p-4">
				<h3 className="mb-3 font-semibold">缓存统计</h3>
				{stats && (
					<div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
						<div>
							<h4 className="mb-2 font-medium">内存缓存</h4>
							<div className="space-y-1">
								<p>命中率: {(stats.memory.hitRate * 100).toFixed(1)}%</p>
								<p>
									命中: {stats.memory.hits} | 未命中: {stats.memory.misses}
								</p>
								<p>
									设置: {stats.memory.sets} | 删除: {stats.memory.deletes}
								</p>
								<p>驱逐: {stats.memory.evictions}</p>
							</div>
						</div>
						<div>
							<h4 className="mb-2 font-medium">HTTP 缓存</h4>
							<div className="space-y-1">
								<p>命中率: {(stats.http.memory.hitRate * 100).toFixed(1)}%</p>
								<p>
									命中: {stats.http.memory.hits} | 未命中: {stats.http.memory.misses}
								</p>
								<p>缓存大小: {stats.http.memorySize} 条目</p>
								<p>策略: {stats.strategy}</p>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* 缓存操作测试 */}
			<div className="rounded-lg border bg-white p-4">
				<h3 className="mb-3 font-semibold">缓存操作测试</h3>
				<div className="space-y-4">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label className="mb-1 block font-medium text-sm">缓存键</label>
							<input
								type="text"
								value={cacheKey}
								onChange={(e) => setCacheKey(e.target.value)}
								className="w-full rounded border p-2"
								placeholder="输入缓存键"
							/>
						</div>
						<div>
							<label className="mb-1 block font-medium text-sm">缓存数据</label>
							<input
								type="text"
								value={testData}
								onChange={(e) => setTestData(e.target.value)}
								className="w-full rounded border p-2"
								placeholder="输入要缓存的数据"
							/>
						</div>
					</div>

					<div className="flex flex-wrap gap-2">
						<button onClick={handleSetCache} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
							设置缓存
						</button>
						<button onClick={handleGetCache} className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
							获取缓存
						</button>
						<button onClick={handleRemoveCache} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
							删除缓存
						</button>
						<button
							onClick={handleTestHttpCache}
							disabled={loading}
							className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:opacity-50"
						>
							{loading ? "测试中..." : "测试 HTTP 缓存"}
						</button>
						<button onClick={handleClearAll} className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
							清空所有缓存
						</button>
					</div>

					{result && (
						<div className="mt-4 rounded bg-gray-100 p-3">
							<pre className="whitespace-pre-wrap text-sm">{result}</pre>
						</div>
					)}
				</div>
			</div>

			{/* 缓存策略演示 */}
			<div className="rounded-lg border bg-white p-4">
				<h3 className="mb-3 font-semibold">缓存策略演示</h3>
				<div className="text-gray-600 text-sm">
					<p>
						当前使用的策略: <strong>{stats?.strategy}</strong>
					</p>
					<p className="mt-2">支持的策略:</p>
					<ul className="mt-1 list-inside list-disc space-y-1">
						<li>
							<strong>TTL</strong>: 基于时间的缓存策略
						</li>
						<li>
							<strong>LRU</strong>: 最近最少使用策略
						</li>
						<li>
							<strong>LFU</strong>: 最少使用频率策略
						</li>
						<li>
							<strong>SizeBased</strong>: 基于数据大小的策略
						</li>
						<li>
							<strong>TypeBased</strong>: 基于数据类型的策略
						</li>
						<li>
							<strong>PatternBased</strong>: 基于键模式的策略
						</li>
						<li>
							<strong>Hybrid</strong>: 混合策略
						</li>
						<li>
							<strong>Adaptive</strong>: 自适应策略
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

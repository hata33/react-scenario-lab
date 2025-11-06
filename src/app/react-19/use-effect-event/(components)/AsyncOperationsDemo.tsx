"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function AsyncOperationsDemo() {
	const [data, setData] = useState<any[]>([]);
	const [filter, setFilter] = useState("");
	const [logs, setLogs] = useState<string[]>([]);

	const addLog = useCallback((message: string) => {
		const timestamp = new Date().toLocaleTimeString();
		setLogs((prev) => [`[${timestamp}] ${message}`, ...prev].slice(0, 5));
	}, []);

	// 模拟异步数据获取
	const fetchData = useCallback(
		async (currentFilter: string) => {
			addLog(`开始获取数据，筛选条件: "${currentFilter}"`);

			// 模拟网络延迟
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const mockData = [
				{ id: 1, name: "React", category: "framework" },
				{ id: 2, name: "Vue", category: "framework" },
				{ id: 3, name: "Angular", category: "framework" },
				{ id: 4, name: "Express", category: "backend" },
				{ id: 5, name: "FastAPI", category: "backend" },
			];

			const filtered = mockData.filter(
				(item) =>
					item.name.toLowerCase().includes(currentFilter.toLowerCase()) ||
					item.category.toLowerCase().includes(currentFilter.toLowerCase()),
			);

			setData(filtered);
			addLog(`获取到 ${filtered.length} 条数据`);
		},
		[addLog],
	);

	const filterRef = useRef(filter);
	filterRef.current = filter;

	// 传统方式 - 异步操作中的闭包问题
	useEffect(() => {
		fetchData(filter);
	}, [filter, fetchData]); // 每次 filter 变化都会重新发起请求

	// 使用 useEffectEvent 的理想方式（模拟防抖）
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			fetchData(filterRef.current);
		}, 500); // 500ms 防抖

		return () => clearTimeout(timeoutId);
	}, [fetchData]); // 不依赖 filter，通过 ref 访问最新值

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	const handleRefresh = () => {
		fetchData(filter);
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">异步操作演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div>
						<label className="mb-2 block font-medium text-gray-700 text-sm">搜索技术:</label>
						<div className="flex gap-2">
							<input
								type="text"
								value={filter}
								onChange={handleFilterChange}
								placeholder="输入关键词..."
								className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<button
								onClick={handleRefresh}
								className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
							>
								刷新
							</button>
						</div>
					</div>

					<div className="border-t pt-4">
						<h5 className="mb-2 font-medium text-gray-700">搜索结果:</h5>
						{data.length === 0 ? (
							<p className="text-gray-500 text-sm">暂无数据</p>
						) : (
							<div className="grid gap-2">
								{data.map((item) => (
									<div key={item.id} className="flex items-center justify-between rounded bg-gray-50 p-2">
										<span className="font-medium">{item.name}</span>
										<span className="rounded bg-gray-200 px-2 py-1 text-gray-600 text-sm">{item.category}</span>
									</div>
								))}
							</div>
						)}
					</div>

					<div className="border-t pt-4">
						<h5 className="mb-2 font-medium text-gray-700">操作日志:</h5>
						<div className="max-h-32 space-y-1 overflow-y-auto">
							{logs.length === 0 ? (
								<p className="text-gray-500 text-sm">等待操作...</p>
							) : (
								logs.map((log, index) => (
									<div key={index} className="rounded bg-purple-50 p-2 text-purple-700 text-sm">
										{log}
									</div>
								))
							)}
						</div>
					</div>

					<div className="rounded-lg bg-green-50 p-3">
						<h5 className="mb-2 font-medium text-green-800">🚀 异步操作优化:</h5>
						<ul className="space-y-1 text-green-700 text-sm">
							<li>• 避免因依赖变化导致的重复请求</li>
							<li>• 实现防抖和节流功能</li>
							<li>• 保持回调中访问最新状态</li>
							<li>• 提升应用性能和用户体验</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

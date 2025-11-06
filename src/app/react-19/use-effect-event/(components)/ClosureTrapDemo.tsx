"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function ClosureTrapDemo() {
	const [count, setCount] = useState(0);
	const [logs, setLogs] = useState<string[]>([]);

	const addLog = useCallback((message: string) => {
		const timestamp = new Date().toLocaleTimeString();
		setLogs((prev) => [`[${timestamp}] ${message}`, ...prev].slice(0, 5));
	}, []);

	// 传统 useEffect - 存在闭包陷阱
	useEffect(() => {
		const interval = setInterval(() => {
			// 这里会捕获初始的 count 值 (0)，导致显示的值不会更新
			addLog(`传统方式: 当前 count = ${count}`);
		}, 1000);

		return () => clearInterval(interval);
	}, [count, addLog]); // 依赖 count，导致每次 count 变化都会重新创建定时器

	// 使用 useEffectEvent 的理想方式（模拟）
	const stableCountRef = useRef(count);
	stableCountRef.current = count;

	useEffect(() => {
		const interval = setInterval(() => {
			// 直接访问最新的 count 值
			addLog(`理想方式: 当前 count = ${stableCountRef.current}`);
		}, 1000);

		return () => clearInterval(interval);
	}, [addLog]); // 不依赖 count，定时器不会重新创建

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">闭包陷阱演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<span className="text-gray-600 text-sm">当前计数:</span>
						<span className="font-bold text-2xl text-blue-600">{count}</span>
						<button
							onClick={() => setCount((c) => c + 1)}
							className="rounded bg-blue-500 px-3 py-1 text-white transition-colors hover:bg-blue-600"
						>
							增加
						</button>
						<button
							onClick={() => setCount(0)}
							className="rounded bg-gray-500 px-3 py-1 text-white transition-colors hover:bg-gray-600"
						>
							重置
						</button>
					</div>

					<div className="border-t pt-4">
						<h5 className="mb-2 font-medium text-gray-700">定时器日志 (显示最近5条):</h5>
						<div className="max-h-40 space-y-1 overflow-y-auto">
							{logs.length === 0 ? (
								<p className="text-gray-500 text-sm">等待定时器触发...</p>
							) : (
								logs.map((log, index) => (
									<div
										key={index}
										className={`rounded p-2 text-sm ${
											log.includes("传统方式") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
										}`}
									>
										{log}
									</div>
								))
							)}
						</div>
					</div>

					<div className="grid gap-3 text-sm">
						<div className="rounded-lg bg-red-50 p-3">
							<h6 className="mb-1 font-medium text-red-800">❌ 传统 useEffect 问题:</h6>
							<ul className="space-y-1 text-red-700">
								<li>• 闭包捕获初始值</li>
								<li>• 依赖变化导致定时器重新创建</li>
								<li>• 可能造成无限循环</li>
							</ul>
						</div>
						<div className="rounded-lg bg-green-50 p-3">
							<h6 className="mb-1 font-medium text-green-800">✅ useEffectEvent 优势:</h6>
							<ul className="space-y-1 text-green-700">
								<li>• 访问最新值</li>
								<li>• 避免不必要的重新创建</li>
								<li>• 解决闭包陷阱</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

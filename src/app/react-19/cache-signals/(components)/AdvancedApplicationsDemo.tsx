"use client";

import React, { useCallback, useState } from "react";

export default function AdvancedApplicationsDemo() {
	const [scenario, setScenario] = useState("realtime");
	const [connectionStatus, setConnectionStatus] = useState("disconnected");
	const [messages, setMessages] = useState<any[]>([]);

	// 计算缓存演示状态
	const [computing, setComputing] = useState(false);
	const [input, setInput] = useState("");
	const [computationResults, setComputationResults] = useState<any>({});
	const computationCache = React.useRef(new Map());

	const handleScenarioChange = useCallback((newScenario: string) => {
		setScenario(newScenario);
		setMessages([]);
	}, []);

	// 实时数据演示的连接逻辑
	const subscriptionRef = React.useRef<any>(null);

	const connect = useCallback(() => {
		setConnectionStatus("connected");
		subscriptionRef.current = Math.random().toString(36).substring(2, 11);

		// 模拟实时数据推送
		const interval = setInterval(() => {
			const message = {
				id: `msg-${Date.now()}`,
				text: `实时消息 ${Math.random().toString(36).substring(2, 7)}`,
				timestamp: new Date().toLocaleTimeString(),
				subscriptionId: subscriptionRef.current,
			};

			setMessages((prev) => [...prev.slice(-9), message]);
		}, 2000);

		setTimeout(() => {
			clearInterval(interval);
			setConnectionStatus("disconnected");
		}, 20000);
	}, []);

	const disconnect = useCallback(() => {
		setConnectionStatus("disconnected");
		subscriptionRef.current = null;
	}, []);

	// 计算缓存演示的函数
	const expensiveComputation = useCallback((value: string) => {
		const cacheKey = `compute-${value}`;

		if (computationCache.current.has(cacheKey)) {
			return computationCache.current.get(cacheKey);
		}

		// 模拟复杂计算
		const startTime = Date.now();
		let result = 0;
		for (let i = 0; i < 2000000; i++) {
			result += Math.sqrt(i) * Math.random();
		}

		const computationTime = Date.now() - startTime;

		const output = {
			input: value,
			result: result.toFixed(2),
			computationTime,
			timestamp: new Date().toLocaleTimeString(),
		};

		computationCache.current.set(cacheKey, output);
		return output;
	}, []);

	const compute = useCallback(() => {
		if (!input.trim()) return;

		setComputing(true);
		setTimeout(() => {
			const result = expensiveComputation(input);
			setComputationResults((prev: any) => ({ ...prev, [input]: result }));
			setComputing(false);
		}, 100);
	}, [input, expensiveComputation]);

	const clearComputationCache = useCallback(() => {
		computationCache.current.clear();
		setComputationResults({});
	}, []);

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🚀 高级应用场景演示</h5>

			<div className="mb-4">
				<div className="flex gap-2">
					{[
						{ key: "realtime", label: "实时数据", icon: "📡" },
						{ key: "computation", label: "计算缓存", icon: "⚡" },
					].map(({ key, label, icon }) => (
						<button
							key={key}
							onClick={() => handleScenarioChange(key)}
							className={`rounded px-3 py-2 font-medium text-sm transition-colors ${
								scenario === key ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
							}`}
						>
							{icon} {label}
						</button>
					))}
				</div>
			</div>

			{scenario === "realtime" && (
				<div className="space-y-4">
					<div className="flex gap-4">
						<button
							onClick={connect}
							disabled={connectionStatus === "connected"}
							className="rounded bg-green-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-green-700 disabled:opacity-50"
						>
							{connectionStatus === "connected" ? "🟢 已连接" : "📡 连接实时数据"}
						</button>
						<button
							onClick={disconnect}
							disabled={connectionStatus === "disconnected"}
							className="rounded bg-red-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-red-700 disabled:opacity-50"
						>
							🔴 断开连接
						</button>
					</div>

					<div className="rounded border border-gray-200 bg-white p-3">
						<div className="mb-3">
							<h4 className="mb-2 font-medium text-gray-800 text-sm">实时消息流</h4>
							<span
								className={`rounded px-2 py-1 text-sm ${
									connectionStatus === "connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
								}`}
							>
								{connectionStatus === "connected" ? "🟢 已连接" : "🔴 已断开"}
							</span>
						</div>

						<div className="max-h-40 space-y-2 overflow-auto">
							{messages.length === 0 ? (
								<p className="text-center text-gray-500 text-sm">暂无消息...</p>
							) : (
								messages.map((msg) => (
									<div key={msg.id} className="rounded bg-gray-50 p-2 text-sm">
										<span className="text-gray-500">[{msg.timestamp}]</span> {msg.text}
									</div>
								))
							)}
						</div>
					</div>

					<div className="rounded border border-purple-200 bg-purple-50 p-3">
						<p className="text-purple-800 text-sm">
							💡 实时数据缓存确保在网络中断时仍能访问最新数据，提供更好的用户体验
						</p>
					</div>
				</div>
			)}

			{scenario === "computation" && (
				<div className="space-y-4">
					<div className="flex gap-2">
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="输入计算值..."
							className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button
							onClick={compute}
							disabled={computing || !input.trim()}
							className="rounded bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
						>
							{computing ? "🔄 计算中..." : "🔢 开始计算"}
						</button>
						<button
							onClick={clearComputationCache}
							className="rounded bg-gray-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-gray-700"
						>
							🗑️ 清除缓存
						</button>
					</div>

					<div className="rounded border border-gray-200 bg-white p-4">
						<h4 className="mb-3 font-medium text-gray-800 text-sm">⚡ 计算结果缓存</h4>
						<div className="space-y-2">
							{Object.entries(computationResults).length === 0 ? (
								<p className="text-gray-500 text-sm">暂无计算结果...</p>
							) : (
								Object.entries(computationResults).map(([key, value]: any) => (
									<div key={key} className="rounded border border-blue-200 bg-blue-50 p-3">
										<h4 className="mb-2 font-medium text-gray-800 text-sm">输入: {value.input}</h4>
										<p className="mb-1 text-gray-600 text-sm">结果: {value.result}</p>
										<p className="mb-1 text-gray-500 text-xs">计算时间: {value.computationTime}ms</p>
										<p className="text-gray-500 text-xs">
											时间戳: {value.timestamp}
											{computationCache.current.has(`compute-${key}`) && (
												<span className="ml-2 text-green-600">(✅ 已缓存)</span>
											)}
										</p>
									</div>
								))
							)}
						</div>
					</div>

					<div className="rounded border border-green-200 bg-green-50 p-3">
						<p className="text-green-800 text-sm">💡 计算结果缓存可以避免重复的复杂计算，显著提升性能</p>
					</div>
				</div>
			)}

			<div className="mt-4 rounded border border-orange-200 bg-orange-50 p-3">
				<p className="text-orange-800 text-sm">
					🚀 Cache Signals 支持多种高级应用场景，从实时数据同步到复杂计算缓存， 都能显著提升应用性能和用户体验。
				</p>
			</div>
		</div>
	);
}

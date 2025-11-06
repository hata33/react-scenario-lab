"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function TimersDemo() {
	const [startTime, setStartTime] = useState<number>(Date.now());
	const [elapsed, setElapsed] = useState<number>(0);
	const [logs, setLogs] = useState<string[]>([]);

	const addLog = useCallback((message: string) => {
		const timestamp = new Date().toLocaleTimeString();
		setLogs((prev) => [`[${timestamp}] ${message}`, ...prev].slice(0, 5));
	}, []);

	const startTimeRef = useRef(startTime);
	startTimeRef.current = startTime;

	// 传统方式 - 定时器中的闭包问题
	useEffect(() => {
		const interval = setInterval(() => {
			// 这里会捕获初始的 startTime，导致计算错误
			const elapsed = Math.floor((Date.now() - startTime) / 1000);
			setElapsed(elapsed);
			addLog(`传统方式: 已经过 ${elapsed} 秒`);
		}, 1000);

		return () => clearInterval(interval);
	}, [startTime, addLog]); // 依赖 startTime，导致每次都重新创建定时器

	// 使用 useEffectEvent 的理想方式（模拟）
	useEffect(() => {
		const interval = setInterval(() => {
			// 直接访问最新的 startTime
			const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
			addLog(`理想方式: 已经过 ${elapsed} 秒`);
		}, 1000);

		return () => clearInterval(interval);
	}, [addLog]); // 不依赖 startTime，定时器稳定

	const handleReset = () => {
		const now = Date.now();
		setStartTime(now);
		setElapsed(0);
		addLog("计时器已重置");
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">定时器演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="text-center">
						<div className="mb-2 font-bold text-4xl text-blue-600">{formatTime(elapsed)}</div>
						<p className="text-gray-600 text-sm">已运行时间</p>
					</div>

					<div className="flex justify-center">
						<button
							onClick={handleReset}
							className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
						>
							重置计时器
						</button>
					</div>

					<div className="border-t pt-4">
						<h5 className="mb-2 font-medium text-gray-700">定时器日志:</h5>
						<div className="max-h-32 space-y-1 overflow-y-auto">
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

					<div className="rounded-lg bg-blue-50 p-3">
						<h5 className="mb-2 font-medium text-blue-800">⏰ 定时器使用场景:</h5>
						<ul className="space-y-1 text-blue-700 text-sm">
							<li>• setInterval/setTimeout 回调</li>
							<li>• requestAnimationFrame</li>
							<li>• WebSocket 消息处理</li>
							<li>• 长轮询和心跳检测</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

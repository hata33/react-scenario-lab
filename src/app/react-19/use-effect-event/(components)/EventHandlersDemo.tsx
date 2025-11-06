"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function EventHandlersDemo() {
	const [message, setMessage] = useState("");
	const [logs, setLogs] = useState<string[]>([]);

	const addLog = useCallback((message: string) => {
		const timestamp = new Date().toLocaleTimeString();
		setLogs((prev) => [`[${timestamp}] ${message}`, ...prev].slice(0, 5));
	}, []);

	const messageRef = useRef(message);
	messageRef.current = message;

	// 传统方式 - 事件处理器中的闭包问题
	const handleClick = useCallback(() => {
		// 这个回调会捕获创建时的 message 值
		alert(`传统方式: ${message}`);
	}, [message]);

	// 使用 useEffectEvent 的理想方式（模拟）
	const handleClickLatest = useCallback(() => {
		// 直接访问最新的 message 值
		alert(`最新值: ${messageRef.current}`);
	}, []);

	// 模拟外部事件监听器
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				addLog(`键盘事件: 输入了 "${messageRef.current}"`);
			}
		};

		window.addEventListener("keypress", handleKeyPress);
		return () => window.removeEventListener("keypress", handleKeyPress);
	}, [addLog]);

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">事件处理器演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div>
						<label className="mb-2 block font-medium text-gray-700 text-sm">输入消息:</label>
						<input
							type="text"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="输入一些文字..."
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<p className="mt-1 text-gray-500 text-xs">按 Enter 键触发键盘事件监听器</p>
					</div>

					<div className="grid gap-2">
						<button
							onClick={handleClick}
							className="rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
						>
							传统方式处理 (闭包问题)
						</button>
						<button
							onClick={handleClickLatest}
							className="rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
						>
							useEffectEvent 方式 (最新值)
						</button>
					</div>

					<div className="border-t pt-4">
						<h5 className="mb-2 font-medium text-gray-700">事件日志:</h5>
						<div className="max-h-32 space-y-1 overflow-y-auto">
							{logs.length === 0 ? (
								<p className="text-gray-500 text-sm">等待事件触发...</p>
							) : (
								logs.map((log, index) => (
									<div key={index} className="rounded bg-blue-50 p-2 text-blue-700 text-sm">
										{log}
									</div>
								))
							)}
						</div>
					</div>

					<div className="rounded-lg bg-yellow-50 p-3">
						<h5 className="mb-2 font-medium text-yellow-800">💡 事件处理器的闭包陷阱:</h5>
						<ul className="space-y-1 text-sm text-yellow-700">
							<li>• 传统回调会捕获创建时的 props/state</li>
							<li>• useEffectEvent 让回调访问最新值</li>
							<li>• 避免因依赖变化导致的重新创建</li>
							<li>• 特别适用于外部事件监听器</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

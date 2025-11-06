"use client";

import { useCallback, useEffect, useState } from "react";
import { useActivity } from "./hooks";

export default function StatePersistenceDemo() {
	const {
		state: count,
		setState: setCount,
		clearState: clearCount,
		isSyncing,
		lastSync,
	} = useActivity("counter-persistence-demo", 0);
	const [message, setMessage] = useState("");
	const [showSaved, setShowSaved] = useState(false);

	const increment = () => {
		setCount((prev) => prev + 1);
		triggerSaveFeedback();
	};

	const decrement = () => {
		setCount((prev) => prev - 1);
		triggerSaveFeedback();
	};

	const reset = () => {
		clearCount();
		setMessage("Counter reset to default value");
		triggerSaveFeedback();
	};

	const setValue = (value: number) => {
		setCount(value);
		triggerSaveFeedback();
	};

	const triggerSaveFeedback = () => {
		setMessage("State auto-saved to browser storage");
		setShowSaved(true);
		setTimeout(() => setShowSaved(false), 2000);
	};

	const handleStorageChange = useCallback((e: StorageEvent) => {
		if (e.key === "activity-counter-persistence-demo") {
			setMessage("State updated from another browser tab");
			setShowSaved(true);
			setTimeout(() => setShowSaved(false), 3000);
		}
	}, []);

	useEffect(() => {
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, [handleStorageChange]);

	useEffect(() => {
		setMessage(`Welcome back! Your counter value was persisted: ${count}`);
		setShowSaved(true);
		setTimeout(() => setShowSaved(false), 4000);
	}, [count]);

	return (
		<div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<div className="mb-6">
				<h3 className="mb-2 font-semibold text-gray-900 text-lg">状态持久化演示</h3>
				<p className="mb-4 text-gray-600 text-sm">
					此计数器演示了使用 Activity API 的自动状态持久化。尝试刷新页面或在另一个标签页中打开以查看状态恢复。
				</p>

				{(showSaved || isSyncing) && (
					<div
						className={`mb-4 rounded-md p-3 text-sm ${
							isSyncing
								? "border border-yellow-200 bg-yellow-50 text-yellow-800"
								: message.includes("Welcome back")
									? "border border-blue-200 bg-blue-50 text-blue-800"
									: "border border-green-200 bg-green-50 text-green-800"
						}`}
					>
						<div className="flex items-center">
							{isSyncing ? (
								<div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-yellow-600 border-t-transparent"></div>
							) : (
								<svg
									className={`mr-2 h-4 w-4 ${message.includes("Welcome back") ? "text-blue-600" : "text-green-600"}`}
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									{message.includes("Welcome back") ? (
										<path
											fillRule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
											clipRule="evenodd"
										/>
									) : (
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									)}
								</svg>
							)}
							<span>{isSyncing ? "同步中..." : message}</span>
							{lastSync && !isSyncing && (
								<span className="ml-auto text-xs opacity-75">最后同步：{lastSync.toLocaleTimeString()}</span>
							)}
						</div>
					</div>
				)}
			</div>

			<div className="mb-6 rounded-lg bg-gray-50 p-8">
				<div className="text-center">
					<div className="mb-4 font-bold text-6xl text-indigo-600">{count}</div>
					<div className="mb-6 text-gray-500 text-sm">当前值（持久化到浏览器存储）</div>
				</div>
			</div>

			<div className="mb-6 flex flex-wrap gap-3">
				<button
					onClick={increment}
					className="rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					增加 (+1)
				</button>
				<button
					onClick={decrement}
					className="rounded-md bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
				>
					减少 (-1)
				</button>
				<button
					onClick={reset}
					className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
				>
					重置为 0
				</button>
			</div>

			<div className="mb-6">
				<label className="mb-2 block font-medium text-gray-700 text-sm">设置特定值：</label>
				<div className="flex gap-2">
					<input
						type="number"
						value={count}
						onChange={(e) => setValue(parseInt(e.target.value, 10) || 0)}
						className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						placeholder="输入数字"
					/>
					<button
						onClick={() => setValue(Math.floor(Math.random() * 100))}
						className="rounded-md bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
					>
						随机值
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
				<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
					<div className="mb-1 font-medium text-blue-900">Activity API 特性：</div>
					<ul className="space-y-1 text-blue-800">
						<li>• 自动状态持久化</li>
						<li>• 跨标签页同步</li>
						<li>• 会话恢复</li>
					</ul>
				</div>
				<div className="rounded-lg border border-green-200 bg-green-50 p-4">
					<div className="mb-1 font-medium text-green-900">尝试这些操作：</div>
					<ul className="space-y-1 text-green-800">
						<li>• 刷新页面 (Ctrl+R)</li>
						<li>• 在新浏览器标签页中打开</li>
						<li>• 关闭并重新打开浏览器</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

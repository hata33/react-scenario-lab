"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export default function CompilerBasicDemo() {
	const [compilerEnabled, setCompilerEnabled] = useState(true);
	const [count, setCount] = useState(0);
	const [name, setName] = useState("");
	const [renderCount, setRenderCount] = useState(0);
	const [optimizations, setOptimizations] = useState<string[]>([]);

	// 追踪渲染次数
	useEffect(() => {
		setRenderCount((prev) => prev + 1);
	});

	// 模拟 React Compiler 的自动优化
	const addOptimizationLog = useCallback(
		(optimization: string) => {
			if (compilerEnabled) {
				setOptimizations((prev) => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${optimization}`]);
			}
		},
		[compilerEnabled],
	);

	// 模拟编译器自动应用 React.memo
	const _MemoizedComponent = useMemo(() => {
		if (compilerEnabled) {
			addOptimizationLog("自动应用 React.memo 到组件");
		}
		return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
	}, [compilerEnabled, addOptimizationLog]);

	// 模拟编译器自动优化计算
	const expensiveValue = useMemo(() => {
		if (compilerEnabled) {
			addOptimizationLog("自动缓存复杂计算结果");
		}

		// 模拟复杂计算
		let result = 0;
		for (let i = 0; i < 100000; i++) {
			result += Math.sqrt(i);
		}
		return result;
	}, [compilerEnabled, addOptimizationLog]);

	// 模拟编译器自动优化事件处理器
	const optimizedHandler = useCallback(() => {
		if (compilerEnabled) {
			addOptimizationLog("自动优化事件处理器");
		}
		setCount((prev) => prev + 1);
	}, [compilerEnabled, addOptimizationLog]);

	const clearOptimizations = () => {
		setOptimizations([]);
	};

	return (
		<div className="space-y-4">
			<div className="flex gap-4">
				<button
					onClick={() => setCompilerEnabled(!compilerEnabled)}
					className={`rounded-lg px-4 py-2 transition-colors ${
						compilerEnabled
							? "bg-indigo-600 text-white hover:bg-indigo-700"
							: "bg-gray-600 text-white hover:bg-gray-700"
					}`}
				>
					{compilerEnabled ? "编译器已启用" : "编译器已禁用"}
				</button>

				<button
					onClick={clearOptimizations}
					className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
				>
					清除日志
				</button>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-medium text-gray-800 dark:text-white">组件状态</h4>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span>渲染次数:</span>
							<span
								className={`font-medium ${compilerEnabled && renderCount > 3 ? "text-orange-600" : "text-green-600"}`}
							>
								{renderCount}
							</span>
						</div>
						<div className="flex justify-between">
							<span>Count:</span>
							<span>{count}</span>
						</div>
						<div className="flex justify-between">
							<span>Name:</span>
							<span>{name || "空"}</span>
						</div>
						<div className="flex justify-between">
							<span>计算结果:</span>
							<span className="font-mono text-xs">{expensiveValue.toFixed(0)}</span>
						</div>
					</div>
				</div>

				<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-medium text-gray-800 dark:text-white">操作面板</h4>
					<div className="space-y-3">
						<div className="flex gap-2">
							<button
								onClick={optimizedHandler}
								className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
							>
								增加 Count
							</button>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="输入名称..."
								className="flex-1 rounded border border-gray-300 bg-white px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
							/>
						</div>
					</div>
				</div>
			</div>

			{compilerEnabled && optimizations.length > 0 && (
				<div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
					<h4 className="mb-2 font-medium text-indigo-800 dark:text-indigo-300">🤖 编译器优化日志:</h4>
					<div className="space-y-1 font-mono text-xs">
						{optimizations.map((log, index) => (
							<div key={index} className="text-indigo-700 dark:text-indigo-400">
								{log}
							</div>
						))}
					</div>
				</div>
			)}

			<div className="rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-4 dark:from-indigo-900/20 dark:to-purple-900/20">
				<p className="mb-2 font-medium text-indigo-800 text-sm dark:text-indigo-300">🎯 React Compiler 的优势：</p>
				<ul className="space-y-1 text-indigo-700 text-sm dark:text-indigo-400">
					<li>• 自动检测优化机会</li>
					<li>• 无需手动记忆化</li>
					<li>• 智能依赖分析</li>
					<li>• 零配置性能提升</li>
				</ul>
			</div>
		</div>
	);
}

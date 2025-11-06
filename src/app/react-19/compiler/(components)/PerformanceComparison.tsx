"use client";

import { useCallback, useState } from "react";

export default function PerformanceComparison() {
	const [comparisonMode, setComparisonMode] = useState<"manual" | "compiler">("compiler");
	const [complexity, setComplexity] = useState<"simple" | "medium" | "complex">("medium");
	const [performanceMetrics, setPerformanceMetrics] = useState<any>({});
	const [isRunning, setIsRunning] = useState(false);

	// 模拟不同复杂度的组件
	const runPerformanceTest = useCallback(async () => {
		setIsRunning(true);
		const startTime = Date.now();

		// 模拟渲染性能测试
		const renderCounts = complexity === "simple" ? 100 : complexity === "medium" ? 500 : 1000;
		const optimizationLevels = comparisonMode === "compiler" ? 0.9 : 0.3; // 编译器优化90%，手动30%

		// 模拟渲染过程
		for (let i = 0; i < renderCounts; i++) {
			// 模拟渲染工作
			await new Promise((resolve) => setTimeout(resolve, 1));

			// 应用优化
			if (Math.random() < optimizationLevels) {
				// 优化路径 - 更快
				await new Promise((resolve) => setTimeout(resolve, 0.5));
			} else {
				// 非优化路径 - 更慢
				await new Promise((resolve) => setTimeout(resolve, 2));
			}
		}

		const endTime = Date.now();
		const totalTime = endTime - startTime;

		setPerformanceMetrics({
			totalTime,
			renderCounts,
			optimizationRate: optimizationLevels * 100,
			averageRenderTime: totalTime / renderCounts,
			mode: comparisonMode,
		});

		setIsRunning(false);
	}, [comparisonMode, complexity]);

	const resetTest = () => {
		setPerformanceMetrics({});
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
			<h3 className="mb-4 font-semibold text-gray-800 text-xl dark:text-white">⚡ 性能提升对比</h3>

			<div className="mb-6">
				<div className="mb-4 grid gap-4 md:grid-cols-2">
					<div>
						<label className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300">优化模式</label>
						<div className="flex gap-2">
							<button
								onClick={() => setComparisonMode("manual")}
								className={`rounded-lg px-4 py-2 transition-colors ${
									comparisonMode === "manual"
										? "bg-orange-600 text-white"
										: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
								}`}
							>
								🔧 手动优化
							</button>
							<button
								onClick={() => setComparisonMode("compiler")}
								className={`rounded-lg px-4 py-2 transition-colors ${
									comparisonMode === "compiler"
										? "bg-indigo-600 text-white"
										: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
								}`}
							>
								🤖 编译器优化
							</button>
						</div>
					</div>

					<div>
						<label className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300">测试复杂度</label>
						<div className="flex gap-2">
							{[
								{ key: "simple", label: "简单" },
								{ key: "medium", label: "中等" },
								{ key: "complex", label: "复杂" },
							].map(({ key, label }) => (
								<button
									key={key}
									onClick={() => setComplexity(key as any)}
									className={`rounded-lg px-3 py-2 transition-colors ${
										complexity === key
											? "bg-purple-600 text-white"
											: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
									}`}
								>
									{label}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className="flex gap-4">
					<button
						onClick={runPerformanceTest}
						disabled={isRunning}
						className="rounded-lg bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
					>
						{isRunning ? "运行中..." : "开始测试"}
					</button>

					<button
						onClick={resetTest}
						className="rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700"
					>
						重置
					</button>
				</div>
			</div>

			{performanceMetrics.totalTime && (
				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
						<div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-700">
							<p className="mb-1 text-gray-600 text-sm dark:text-gray-400">总耗时</p>
							<p className="font-bold text-2xl text-gray-800 dark:text-white">{performanceMetrics.totalTime}ms</p>
						</div>
						<div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-700">
							<p className="mb-1 text-gray-600 text-sm dark:text-gray-400">渲染次数</p>
							<p className="font-bold text-2xl text-gray-800 dark:text-white">{performanceMetrics.renderCounts}</p>
						</div>
						<div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-700">
							<p className="mb-1 text-gray-600 text-sm dark:text-gray-400">优化率</p>
							<p className="font-bold text-2xl text-gray-800 dark:text-white">
								{performanceMetrics.optimizationRate.toFixed(0)}%
							</p>
						</div>
						<div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-700">
							<p className="mb-1 text-gray-600 text-sm dark:text-gray-400">平均耗时</p>
							<p className="font-bold text-2xl text-gray-800 dark:text-white">
								{performanceMetrics.averageRenderTime.toFixed(1)}ms
							</p>
						</div>
					</div>

					<div
						className={`rounded-lg p-4 ${comparisonMode === "compiler" ? "bg-green-50 dark:bg-green-900/20" : "bg-orange-50 dark:bg-orange-900/20"}`}
					>
						<p
							className={`font-medium text-sm ${
								comparisonMode === "compiler"
									? "text-green-800 dark:text-green-300"
									: "text-orange-800 dark:text-orange-300"
							}`}
						>
							{comparisonMode === "compiler" ? "🚀 编译器优化结果：" : "🔧 手动优化结果："}
						</p>
						<p
							className={`mt-1 text-sm ${
								comparisonMode === "compiler"
									? "text-green-700 dark:text-green-400"
									: "text-orange-700 dark:text-orange-400"
							}`}
						>
							{comparisonMode === "compiler"
								? `React Compiler 自动应用了 ${performanceMetrics.optimizationRate.toFixed(0)}% 的优化，显著提升了渲染性能。`
								: `手动优化达到了 ${performanceMetrics.optimizationRate.toFixed(0)}% 的优化率，但需要开发者投入大量精力。`}
						</p>
					</div>
				</div>
			)}

			<div className="mt-6 grid gap-6 md:grid-cols-2">
				<div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
					<h4 className="mb-2 font-medium text-indigo-800 dark:text-indigo-300">🤖 编译器优化优势：</h4>
					<ul className="space-y-1 text-indigo-700 text-sm dark:text-indigo-400">
						<li>• 自动检测优化机会</li>
						<li>• 零配置高性能</li>
						<li>• 智能依赖分析</li>
						<li>• 持续性能改进</li>
					</ul>
				</div>

				<div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
					<h4 className="mb-2 font-medium text-orange-800 dark:text-orange-300">🔧 手动优化挑战：</h4>
					<ul className="space-y-1 text-orange-700 text-sm dark:text-orange-400">
						<li>• 需要深度理解原理</li>
						<li>• 容易遗漏优化点</li>
						<li>• 维护成本高</li>
						<li>• 性能提升有限</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
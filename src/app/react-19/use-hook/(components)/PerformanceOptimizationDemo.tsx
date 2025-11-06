"use client";

import { useCallback, useState } from "react";

export default function PerformanceOptimizationDemo() {
	const [count, setCount] = useState(0);
	const [logs, setLogs] = useState<string[]>([]);

	const addLog = useCallback((message: string) => {
		const timestamp = new Date().toLocaleTimeString();
		setLogs((prev) => [`[${timestamp}] ${message}`, ...prev].slice(0, 5));
	}, []);

	// 模拟性能敏感的计算
	const expensiveCalculation = useCallback(
		(num: number) => {
			addLog(`开始计算 factorial(${num})`);
			const start = performance.now();

			let result = 1;
			for (let i = 2; i <= num; i++) {
				result *= i;
			}

			const end = performance.now();
			addLog(`计算完成: factorial(${num}) = ${result} (${(end - start).toFixed(2)}ms)`);

			return result;
		},
		[addLog],
	);

	// 模拟缓存的 Hook
	const useMemoCalculation = useCallback(() => {
		const cache = new Map<number, number>();

		return (input: number) => {
			if (cache.has(input)) {
				addLog(`缓存命中: factorial(${input}) = ${cache.get(input)}`);
				return cache.get(input);
			}

			const result = expensiveCalculation(input);
			cache.set(input, result);
			return result;
		};
	}, [expensiveCalculation, addLog]);

	const memoCalc = useMemoCalculation();

	const handleCalculate = (useCache: boolean) => {
		addLog(`开始计算 factorial(${count})`);

		const result = useCache ? memoCalc(count) : expensiveCalculation(count);

		addLog(`最终结果: ${result}`);
	};

	const handleIncrement = () => {
		setCount((prev) => prev + 1);
	};

	const handleReset = () => {
		setCount(0);
		setLogs([]);
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">性能优化演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<span className="text-gray-600 text-sm">计算阶乘:</span>
						<span className="font-bold text-2xl text-blue-600">{count}!</span>
						<button onClick={handleIncrement} className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
							+1
						</button>
						<button onClick={handleReset} className="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600">
							重置
						</button>
					</div>

					<div className="grid gap-2">
						<button
							onClick={() => handleCalculate(false)}
							className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
						>
							普通计算 (无缓存)
						</button>
						<button
							onClick={() => handleCalculate(true)}
							className="w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
						>
							缓存计算 (useMemo)
						</button>
					</div>

					<div className="border-t pt-4">
						<h5 className="mb-2 font-medium text-gray-700">计算日志:</h5>
						<div className="max-h-40 space-y-1 overflow-y-auto">
							{logs.length === 0 ? (
								<p className="text-gray-500 text-sm">等待计算...</p>
							) : (
								logs.map((log, index) => (
									<div key={index} className="rounded bg-gray-50 p-2 font-mono text-sm">
										{log}
									</div>
								))
							)}
						</div>
					</div>

					<div className="grid gap-3 text-sm">
						<div className="rounded-lg bg-red-50 p-3">
							<h6 className="mb-1 font-medium text-red-800">❌ 普通计算问题:</h6>
							<ul className="space-y-1 text-red-700">
								<li>• 每次都重新计算</li>
								<li>• 性能开销大</li>
								<li>• 阻塞主线程</li>
							</ul>
						</div>
						<div className="rounded-lg bg-green-50 p-3">
							<h6 className="mb-1 font-medium text-green-800">✅ use Hook 优化:</h6>
							<ul className="space-y-1 text-green-700">
								<li>• 智能缓存机制</li>
								<li>• 避免重复计算</li>
								<li>• 提升响应性能</li>
							</ul>
						</div>
					</div>

					<div className="rounded-lg bg-purple-50 p-3">
						<h5 className="mb-2 font-medium text-purple-800">🚀 性能优化场景:</h5>
						<ul className="space-y-1 text-purple-700 text-sm">
							<li>• 复杂数据计算</li>
							<li>• API 响应缓存</li>
							<li>• 图像处理</li>
							<li>• 列表过滤排序</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

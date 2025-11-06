"use client";

import { Suspense, useState, useTransition } from "react";

// 模拟耗时组件
function ExpensiveComponent({ id }: { id: number }) {
	// 模拟复杂计算
	const result = Array.from({ length: 1000 }, (_, i) => i * i).reduce((a, b) => a + b, 0);

	return (
		<div className="rounded-lg bg-purple-50 p-4">
			<h4 className="mb-2 font-medium text-purple-900">耗时组件 {id}</h4>
			<p className="text-purple-700 text-sm">计算结果: {result.toLocaleString()}</p>
			<p className="mt-2 text-purple-600 text-xs">这是一个模拟复杂计算的组件</p>
		</div>
	);
}

// 并发渲染组件
function ConcurrentComponent({ isPending }: { isPending: boolean }) {
	return (
		<div className="space-y-3">
			<div className="rounded-lg bg-blue-50 p-3">
				<h5 className="mb-2 font-medium text-blue-900">⚡ 并发渲染状态</h5>
				<p className="text-blue-700 text-sm">{isPending ? "正在并发渲染中..." : "渲染完成"}</p>
			</div>

			{Array.from({ length: 3 }, (_, i) => (
				<Suspense
					key={i}
					fallback={
						<div className="animate-pulse rounded-lg bg-gray-100 p-4">
							<div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
							<div className="h-3 w-1/2 rounded bg-gray-300"></div>
							<p className="mt-2 text-gray-500 text-sm">正在渲染组件 {i + 1}...</p>
						</div>
					}
				>
					<ExpensiveComponent id={i + 1} />
				</Suspense>
			))}
		</div>
	);
}

export default function ConcurrentRenderingDemo() {
	const [isPending, startTransition] = useTransition();
	const [renderKey, setRenderKey] = useState(0);
	const [renderTime, setRenderTime] = useState<number | null>(null);

	const handleConcurrentRender = () => {
		const startTime = performance.now();

		startTransition(() => {
			setRenderKey((prev) => prev + 1);

			setTimeout(() => {
				const endTime = performance.now();
				setRenderTime(Math.round(endTime - startTime));
			}, 1000);
		});
	};

	const handleNormalRender = () => {
		const startTime = performance.now();
		setRenderKey((prev) => prev + 1);

		setTimeout(() => {
			const endTime = performance.now();
			setRenderTime(Math.round(endTime - startTime));
		}, 1000);
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">并发渲染演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="grid gap-2">
						<button
							onClick={handleConcurrentRender}
							disabled={isPending}
							className="rounded-md bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600 disabled:bg-gray-300"
						>
							{isPending ? "并发渲染中..." : "开始并发渲染"}
						</button>
						<button
							onClick={handleNormalRender}
							disabled={isPending}
							className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600 disabled:bg-gray-300"
						>
							普通渲染
						</button>
					</div>

					<div className="min-h-[300px] rounded-lg border-2 border-gray-300 border-dashed p-4">
						{isPending && (
							<div className="mb-4 flex items-center gap-2 text-purple-600">
								<div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
								<span className="text-sm">并发渲染进行中，界面仍然可交互...</span>
							</div>
						)}

						<Suspense
							fallback={
								<div className="flex h-full items-center justify-center">
									<div className="text-gray-500 text-sm">正在准备渲染...</div>
								</div>
							}
						>
							<ConcurrentComponent isPending={isPending} key={renderKey} />
						</Suspense>
					</div>

					{renderTime && (
						<div className="rounded-lg bg-purple-50 p-3">
							<p className="text-purple-800 text-sm">⏱️ 渲染耗时: {renderTime}ms</p>
							{isPending && <p className="mt-1 text-purple-600 text-xs">💡 注意: 并发渲染时界面仍然可交互</p>}
						</div>
					)}

					<div className="rounded-lg bg-purple-50 p-3">
						<h5 className="mb-2 font-medium text-purple-800">🔄 并发渲染优势:</h5>
						<ul className="space-y-1 text-purple-700 text-sm">
							<li>• 非阻塞式渲染</li>
							<li>• 保持界面响应性</li>
							<li>• 更好的用户体验</li>
							<li>• 适用于复杂组件渲染</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

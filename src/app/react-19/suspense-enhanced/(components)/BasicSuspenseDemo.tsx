"use client";

import { Suspense, useState } from "react";

// 模拟异步组件
function AsyncComponent({ delay = 2000 }: { delay?: number }) {
	// 模拟异步数据加载
	const data = new Promise((resolve) => {
		setTimeout(() => {
			resolve("异步组件加载完成的数据");
		}, delay);
	});

	return (
		<div className="rounded-lg bg-blue-50 p-4">
			<h4 className="mb-2 font-medium text-blue-900">异步组件内容</h4>
			<p className="text-blue-700 text-sm">这个组件模拟了 {delay}ms 的加载时间</p>
			<p className="mt-2 text-blue-600 text-xs">数据: {JSON.stringify(data)}</p>
		</div>
	);
}

// 加载状态组件
function LoadingFallback() {
	return (
		<div className="animate-pulse rounded-lg bg-gray-100 p-4">
			<div className="space-y-2">
				<div className="h-4 w-3/4 rounded bg-gray-300"></div>
				<div className="h-3 w-1/2 rounded bg-gray-300"></div>
				<div className="h-3 w-2/3 rounded bg-gray-300"></div>
			</div>
			<p className="mt-2 text-gray-500 text-sm">正在加载组件...</p>
		</div>
	);
}

export default function BasicSuspenseDemo() {
	const [showComponent, setShowComponent] = useState(false);
	const [loadingTime, setLoadingTime] = useState<number | null>(null);

	const handleShowComponent = () => {
		const startTime = performance.now();
		setShowComponent(true);

		setTimeout(() => {
			const endTime = performance.now();
			setLoadingTime(Math.round(endTime - startTime));
		}, 2000);
	};

	const handleReset = () => {
		setShowComponent(false);
		setLoadingTime(null);
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">基础 Suspense 演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="flex gap-2">
						<button
							onClick={handleShowComponent}
							disabled={showComponent}
							className="flex-1 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300"
						>
							{showComponent ? "组件正在加载..." : "显示异步组件"}
						</button>
						{showComponent && (
							<button
								onClick={handleReset}
								className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
							>
								重置
							</button>
						)}
					</div>

					<div className="min-h-[200px] rounded-lg border-2 border-gray-300 border-dashed p-4">
						{showComponent ? (
							<Suspense fallback={<LoadingFallback />}>
								<AsyncComponent />
							</Suspense>
						) : (
							<div className="flex h-full items-center justify-center">
								<p className="text-gray-500 text-sm">点击按钮显示异步组件</p>
							</div>
						)}
					</div>

					{loadingTime && (
						<div className="rounded-lg bg-green-50 p-3">
							<p className="text-green-800 text-sm">⏱️ 组件加载耗时: {loadingTime}ms</p>
						</div>
					)}

					<div className="rounded-lg bg-blue-50 p-3">
						<h5 className="mb-2 font-medium text-blue-800">🎯 Suspense 工作原理:</h5>
						<ul className="space-y-1 text-blue-700 text-sm">
							<li>• 异步组件开始渲染</li>
							<li>• Suspense 显示 fallback UI</li>
							<li>• 异步操作完成后显示内容</li>
							<li>• 用户体验更加流畅</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

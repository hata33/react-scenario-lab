"use client";

import { useEffect, useState } from "react";

export default function SuspenseDemo() {
	const [loadingState, setLoadingState] = useState<"idle" | "loading" | "success">("idle");
	const [showFallback, setShowFallback] = useState(false);

	const simulateSuspense = async () => {
		setLoadingState("loading");
		setShowFallback(true);

		// 模拟异步数据加载
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setLoadingState("success");
		setShowFallback(false);
	};

	const reset = () => {
		setLoadingState("idle");
		setShowFallback(false);
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">Suspense 边界演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="flex gap-2">
						<button
							onClick={simulateSuspense}
							disabled={loadingState !== "idle"}
							className="flex-1 rounded-md bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600 disabled:bg-gray-300"
						>
							{loadingState === "idle" ? "模拟 Suspense 加载" : loadingState === "loading" ? "加载中..." : "加载完成"}
						</button>
						{loadingState === "success" && (
							<button
								onClick={reset}
								className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
							>
								重置
							</button>
						)}
					</div>

					<div className="min-h-[200px] rounded-lg border-2 border-gray-300 border-dashed p-4">
						{showFallback ? (
							<div className="flex h-full flex-col items-center justify-center space-y-3">
								<div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
								<p className="text-gray-600 text-sm">正在加载组件...</p>
								<div className="space-y-1">
									<div className="h-2 w-32 animate-pulse rounded bg-gray-200"></div>
									<div className="h-2 w-24 animate-pulse rounded bg-gray-200"></div>
									<div className="h-2 w-28 animate-pulse rounded bg-gray-200"></div>
								</div>
							</div>
						) : loadingState === "success" ? (
							<div className="space-y-3">
								<div className="rounded-lg bg-green-50 p-3">
									<h5 className="font-medium text-green-800">✅ 组件加载完成</h5>
									<p className="mt-1 text-green-700 text-sm">服务端组件已经成功渲染，内容立即可用</p>
								</div>
								<div className="rounded-lg bg-purple-50 p-3">
									<h5 className="font-medium text-purple-800">🎯 Suspense 优势</h5>
									<ul className="mt-1 space-y-1 text-purple-700 text-sm">
										<li>• 优雅的加载状态处理</li>
										<li>• 防止布局偏移</li>
										<li>• 提升用户体验</li>
										<li>• 支持渐进式渲染</li>
									</ul>
								</div>
							</div>
						) : (
							<div className="flex h-full items-center justify-center">
								<p className="text-gray-500 text-sm">点击按钮开始演示</p>
							</div>
						)}
					</div>

					<div className="grid gap-2 rounded-lg bg-gray-50 p-3 text-xs">
						<div className="font-medium text-gray-700">Suspense 工作原理:</div>
						<ul className="space-y-1 text-gray-600">
							<li>1. 服务端组件开始渲染</li>
							<li>2. 遇到异步数据加载</li>
							<li>3. 显示 fallback UI</li>
							<li>4. 数据加载完成后更新内容</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

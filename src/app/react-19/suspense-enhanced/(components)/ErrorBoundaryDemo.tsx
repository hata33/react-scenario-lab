"use client";

import React, { Suspense, useState } from "react";

// 模拟会出错的组件
function ErrorComponent({ shouldError }: { shouldError: boolean }) {
	if (shouldError) {
		throw new Error("组件渲染出错！");
	}

	return (
		<div className="rounded-lg bg-blue-50 p-4">
			<h4 className="mb-2 font-medium text-blue-900">正常组件内容</h4>
			<p className="text-blue-700 text-sm">组件正常渲染</p>
		</div>
	);
}

// 错误边界组件
class ErrorBoundary extends React.Component<
	{ children: React.ReactNode; fallback: React.ReactNode },
	{ hasError: boolean; error?: Error }
> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Error caught by boundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback;
		}

		return this.props.children;
	}
}

// 错误状态组件
function ErrorFallback({ error, onReset }: { error?: Error; onReset: () => void }) {
	return (
		<div className="rounded-lg bg-red-50 p-4">
			<h4 className="mb-2 font-medium text-red-900">❌ 组件加载失败</h4>
			<p className="mb-3 text-red-700 text-sm">{error?.message || "未知错误"}</p>
			<button
				onClick={onReset}
				className="rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
			>
				重试
			</button>
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
			</div>
			<p className="mt-2 text-gray-500 text-sm">正在加载...</p>
		</div>
	);
}

export default function ErrorBoundaryDemo() {
	const [shouldError, setShouldError] = useState(false);
	const [key, setKey] = useState(0);

	const handleTriggerError = () => {
		setShouldError(true);
	};

	const handleReset = () => {
		setShouldError(false);
		setKey((prev) => prev + 1); // 强制重新挂载组件
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">错误边界演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="flex gap-2">
						<button
							onClick={handleTriggerError}
							disabled={shouldError}
							className="flex-1 rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 disabled:bg-gray-300"
						>
							{shouldError ? "错误已触发" : "触发组件错误"}
						</button>
						<button
							onClick={handleReset}
							className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
						>
							重置组件
						</button>
					</div>

					<div className="min-h-[200px] rounded-lg border-2 border-gray-300 border-dashed p-4">
						<ErrorBoundary
							key={key}
							fallback={
								<ErrorFallback error={shouldError ? new Error("组件渲染出错！") : undefined} onReset={handleReset} />
							}
						>
							<Suspense fallback={<LoadingFallback />}>
								<ErrorComponent shouldError={shouldError} />
							</Suspense>
						</ErrorBoundary>
					</div>

					<div className="rounded-lg bg-red-50 p-3">
						<h5 className="mb-2 font-medium text-red-800">🛡️ 错误边界 + Suspense:</h5>
						<ul className="space-y-1 text-red-700 text-sm">
							<li>• 捕获异步组件错误</li>
							<li>• 提供优雅的错误恢复</li>
							<li>• 防止整个应用崩溃</li>
							<li>• 改善错误处理体验</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

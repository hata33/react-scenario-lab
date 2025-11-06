"use client";

import { useState } from "react";

// 模拟异步组件
function AsyncComponent({ delay = 2000 }: { delay?: number }) {
	const [data, setData] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const loadData = async () => {
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, delay));
		setData(`异步数据加载完成 (${delay}ms)`);
		setLoading(false);
	};

	// 使用 use Hook 模拟异步渲染
	if (!data) {
		loadData();
	}

	return (
		<div className="rounded-lg bg-green-50 p-4">
			{loading ? (
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 animate-spin rounded-full border-2 border-green-600 border-t-transparent"></div>
					<span className="text-green-700 text-sm">加载中...</span>
				</div>
			) : (
				<div>
					<h5 className="mb-2 font-medium text-green-900">异步组件内容</h5>
					<p className="text-green-700 text-sm">{data}</p>
				</div>
			)}
		</div>
	);
}

export default function AsyncRenderingDemo() {
	const [showAsync, setShowAsync] = useState(false);
	const [renderCount, setRenderCount] = useState(0);
	const [suspenseEnabled, setSuspenseEnabled] = useState(true);

	// 模拟 use Hook 的异步渲染支持
	const useAsyncRendering = (enabled: boolean) => {
		return enabled ? (
			<div className="min-h-[200px] rounded-lg border-2 border-gray-300 border-dashed p-4">
				<div className="flex h-full items-center justify-center">
					{showAsync ? <AsyncComponent delay={1500} /> : <p className="text-gray-500 text-sm">点击按钮显示异步组件</p>}
				</div>
			</div>
		) : (
			<div className="min-h-[200px] rounded-lg border-2 border-gray-300 border-dashed p-4">
				<div className="flex h-full items-center justify-center">
					{showAsync ? <AsyncComponent delay={1500} /> : <p className="text-gray-500 text-sm">点击按钮显示异步组件</p>}
				</div>
			</div>
		);
	};

	const handleShowAsync = () => {
		setShowAsync(true);
		setRenderCount((prev) => prev + 1);
	};

	const handleReset = () => {
		setShowAsync(false);
		setRenderCount(0);
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">异步渲染演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<label className="flex items-center gap-2 text-sm">
							<input
								type="checkbox"
								checked={suspenseEnabled}
								onChange={(e) => setSuspenseEnabled(e.target.checked)}
								className="rounded"
							/>
							<span>启用异步渲染支持</span>
						</label>
					</div>

					<div className="flex gap-2">
						<button onClick={handleShowAsync} className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
							显示异步组件
						</button>
						<button onClick={handleReset} className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
							重置
						</button>
					</div>

					<div className="text-gray-600 text-sm">渲染次数: {renderCount}</div>

					{useAsyncRendering(suspenseEnabled)}

					<div className="rounded-lg bg-blue-50 p-3">
						<h5 className="mb-2 font-medium text-blue-800">⚡ 异步渲染优势:</h5>
						<ul className="space-y-1 text-blue-700 text-sm">
							<li>• 非阻塞式渲染</li>
							<li>• 优雅的加载状态</li>
							<li>• 防止布局偏移</li>
							<li>• 提升用户体验</li>
						</ul>
					</div>

					<div className="rounded-lg bg-orange-50 p-3">
						<h5 className="mb-2 font-medium text-orange-800">🔄 渲染流程:</h5>
						<div className="space-y-1 text-orange-700 text-sm">
							<div>1. 组件开始渲染</div>
							<div>2. 遇到异步操作</div>
							<div>3. 显示 fallback UI</div>
							<div>4. 异步完成后显示内容</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

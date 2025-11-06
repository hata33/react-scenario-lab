"use client";

import { Suspense, useState } from "react";

// 模拟流式组件
function StreamingComponent({ content }: { content: string }) {
	return (
		<div className="rounded-lg bg-green-50 p-4">
			<h4 className="mb-2 font-medium text-green-900">流式组件内容</h4>
			<p className="text-green-700 text-sm">{content}</p>
		</div>
	);
}

// 流式加载状态
function StreamingFallback() {
	return (
		<div className="flex items-center gap-3 rounded-lg bg-gray-100 p-4">
			<div className="h-4 w-4 animate-spin rounded-full border-2 border-green-600 border-t-transparent"></div>
			<p className="text-gray-600 text-sm">正在流式传输内容...</p>
		</div>
	);
}

export default function StreamingDemo() {
	const [activeStreams, setActiveStreams] = useState<string[]>([]);
	const [streamHistory, setStreamHistory] = useState<string[]>([]);

	const startStream = (content: string, delay: number) => {
		setActiveStreams((prev) => [...prev, content]);

		setTimeout(() => {
			setActiveStreams((prev) => prev.filter((item) => item !== content));
			setStreamHistory((prev) => [...prev, content]);
		}, delay);
	};

	const handleStartStreaming = () => {
		// 模拟不同时间的流式内容
		startStream("标题内容", 500);
		startStream("导航组件", 800);
		startStream("主要内容区域", 1500);
		startStream("侧边栏", 2000);
		startStream("页脚信息", 2500);
	};

	const handleReset = () => {
		setActiveStreams([]);
		setStreamHistory([]);
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">流式渲染演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="flex gap-2">
						<button
							onClick={handleStartStreaming}
							disabled={activeStreams.length > 0}
							className="flex-1 rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600 disabled:bg-gray-300"
						>
							{activeStreams.length > 0 ? "正在流式渲染..." : "开始流式渲染"}
						</button>
						{streamHistory.length > 0 && (
							<button
								onClick={handleReset}
								className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
							>
								重置
							</button>
						)}
					</div>

					<div className="space-y-3">
						<h5 className="font-medium text-gray-700">渲染进度:</h5>

						{["标题内容", "导航组件", "主要内容区域", "侧边栏", "页脚信息"].map((content) => {
							const isLoading = activeStreams.includes(content);
							const isCompleted = streamHistory.includes(content);

							return (
								<div key={content} className="flex items-center gap-3">
									<div
										className={`h-3 w-3 rounded-full ${
											isCompleted ? "bg-green-500" : isLoading ? "animate-pulse bg-yellow-500" : "bg-gray-300"
										}`}
									></div>
									<span className="text-gray-700 text-sm">{content}</span>
									{isLoading && (
										<Suspense fallback={<StreamingFallback />}>
											<StreamingComponent content={content} />
										</Suspense>
									)}
								</div>
							);
						})}
					</div>

					{streamHistory.length === 5 && (
						<div className="rounded-lg bg-green-50 p-3">
							<p className="text-green-800 text-sm">✅ 流式渲染完成！</p>
							<p className="mt-1 text-green-600 text-xs">用户可以逐步看到页面内容，而不需要等待所有内容加载完成</p>
						</div>
					)}

					<div className="rounded-lg bg-green-50 p-3">
						<h5 className="mb-2 font-medium text-green-800">🌊 流式渲染优势:</h5>
						<ul className="space-y-1 text-green-700 text-sm">
							<li>• 更快的首屏显示</li>
							<li>• 渐进式内容加载</li>
							<li>• 改善感知性能</li>
							<li>• 更好的用户体验</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

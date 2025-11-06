"use client";

import { useState } from "react";

export default function PreloadDemo() {
	const [isPreloaded, setIsPreloaded] = useState(false);
	const [loadingTime, setLoadingTime] = useState<number | null>(null);

	const handlePreload = async () => {
		const startTime = performance.now();
		setIsPreloaded(false);
		setLoadingTime(null);

		// 模拟预加载关键资源
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const endTime = performance.now();
		setLoadingTime(Math.round(endTime - startTime));
		setIsPreloaded(true);
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">preload 演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<span className="text-gray-600 text-sm">资源状态:</span>
						<span className={`font-medium text-sm ${isPreloaded ? "text-green-600" : "text-gray-500"}`}>
							{isPreloaded ? "✅ 已预加载" : "⏳ 未加载"}
						</span>
					</div>

					{loadingTime && (
						<div className="flex items-center justify-between">
							<span className="text-gray-600 text-sm">加载时间:</span>
							<span className="font-medium text-blue-600 text-sm">{loadingTime}ms</span>
						</div>
					)}

					<button
						onClick={handlePreload}
						disabled={isPreloaded}
						className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300"
					>
						{isPreloaded ? "资源已预加载" : "开始预加载"}
					</button>
				</div>
			</div>
		</div>
	);
}

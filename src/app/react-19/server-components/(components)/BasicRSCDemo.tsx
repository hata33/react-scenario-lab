"use client";

import { useState } from "react";

export default function BasicRSCDemo() {
	const [isServerRendered, setIsServerRendered] = useState(false);
	const [renderTime, setRenderTime] = useState<number | null>(null);

	const handleServerRender = async () => {
		const startTime = performance.now();
		setIsServerRendered(false);
		setRenderTime(null);

		// 模拟服务端组件渲染
		await new Promise((resolve) => setTimeout(resolve, 800));

		const endTime = performance.now();
		setRenderTime(Math.round(endTime - startTime));
		setIsServerRendered(true);
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">基础服务端组件演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<span className="text-gray-600 text-sm">渲染方式:</span>
						<span className={`font-medium text-sm ${isServerRendered ? "text-green-600" : "text-gray-500"}`}>
							{isServerRendered ? "✅ 服务端渲染" : "⏳ 等待渲染"}
						</span>
					</div>

					{renderTime && (
						<div className="flex items-center justify-between">
							<span className="text-gray-600 text-sm">渲染时间:</span>
							<span className="font-medium text-blue-600 text-sm">{renderTime}ms</span>
						</div>
					)}

					<button
						onClick={handleServerRender}
						className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
					>
						模拟服务端渲染
					</button>

					{isServerRendered && (
						<div className="mt-4 rounded-lg bg-green-50 p-3">
							<p className="text-green-800 text-sm">🎯 服务端组件优势：</p>
							<ul className="mt-2 space-y-1 text-green-700 text-xs">
								<li>• 零客户端 JavaScript</li>
								<li>• 完美 SEO 支持</li>
								<li>• 更快首屏加载</li>
								<li>• 减少包体积</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

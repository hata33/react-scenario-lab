"use client";

import { useEffect, useState } from "react";

export default function StreamingDemo() {
	const [streamState, setStreamState] = useState<"idle" | "streaming" | "completed">("idle");
	const [chunks, setChunks] = useState<string[]>([]);

	const startStreaming = async () => {
		setStreamState("streaming");
		setChunks([]);

		// 模拟流式渲染
		const mockChunks = ["渲染页面头部...", "加载导航组件...", "渲染主要内容...", "加载侧边栏...", "渲染页脚组件..."];

		for (let i = 0; i < mockChunks.length; i++) {
			await new Promise((resolve) => setTimeout(resolve, 600));
			setChunks((prev) => [...prev, mockChunks[i]]);
		}

		await new Promise((resolve) => setTimeout(resolve, 400));
		setStreamState("completed");
	};

	const reset = () => {
		setStreamState("idle");
		setChunks([]);
	};

	return (
		<div className="space-y-4">
			<h4 className="font-semibold text-gray-900">流式渲染演示</h4>
			<div className="rounded-lg border bg-white p-4">
				<div className="space-y-4">
					<div className="flex gap-2">
						<button
							onClick={startStreaming}
							disabled={streamState !== "idle"}
							className="flex-1 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300"
						>
							{streamState === "idle" ? "开始流式渲染" : streamState === "streaming" ? "正在渲染..." : "已完成"}
						</button>
						{streamState === "completed" && (
							<button
								onClick={reset}
								className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
							>
								重置
							</button>
						)}
					</div>

					<div className="space-y-2">
						<div className="font-medium text-gray-700 text-sm">渲染进度:</div>
						{chunks.length === 0 ? (
							<div className="text-gray-500 text-sm">等待开始渲染...</div>
						) : (
							<div className="space-y-1">
								{chunks.map((chunk, index) => (
									<div key={index} className="flex items-center gap-2 text-gray-600 text-sm">
										<span className="h-2 w-2 rounded-full bg-green-500"></span>
										{chunk}
									</div>
								))}
							</div>
						)}
					</div>

					{streamState === "streaming" && (
						<div className="flex items-center gap-2 text-blue-600 text-sm">
							<div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
							正在流式传输内容...
						</div>
					)}

					{streamState === "completed" && (
						<div className="rounded-lg bg-green-50 p-3">
							<p className="text-green-800 text-sm">✅ 流式渲染完成！</p>
							<p className="mt-1 text-green-600 text-xs">用户可以更快看到页面内容，提升感知性能</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

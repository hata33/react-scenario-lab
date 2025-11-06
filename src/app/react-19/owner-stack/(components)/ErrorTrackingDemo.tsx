"use client";

import { useState } from "react";

export default function ErrorTrackingDemo() {
	const [errorMode, setErrorMode] = useState(false);
	const [currentError, setCurrentError] = useState<string | null>(null);

	const errorScenarios = [
		{
			id: "props-error",
			name: "Props 类型错误",
			component: "UserProfile",
			error: "TypeError: Cannot read property 'name' of undefined",
			owner: "App → Sidebar → UserProfile",
		},
		{
			id: "state-error",
			name: "状态更新错误",
			component: "ArticleList",
			error: "Error: Invalid state update",
			owner: "App → MainContent → ArticleList",
		},
		{
			id: "async-error",
			name: "异步操作错误",
			component: "Navigation",
			error: "NetworkError: Failed to fetch",
			owner: "App → Header → Navigation",
		},
	];

	const simulateError = (errorId: string) => {
		const error = errorScenarios.find((e) => e.id === errorId);
		if (error) {
			setCurrentError(error.id);
			// 3秒后清除错误
			setTimeout(() => {
				setCurrentError(null);
			}, 3000);
		}
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg">
			<h3 className="mb-4 font-semibold text-gray-800 text-xl">🐛 错误追踪与调试</h3>

			<div className="mb-6">
				<button
					onClick={() => setErrorMode(!errorMode)}
					className={`rounded-lg px-4 py-2 transition-colors ${
						errorMode ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-600 text-white hover:bg-gray-700"
					}`}
				>
					{errorMode ? "关闭" : "开启"} 错误模拟
				</button>
			</div>

			{errorMode && (
				<div className="space-y-4">
					<div className="grid gap-4 md:grid-cols-3">
						{errorScenarios.map((error) => (
							<button
								key={error.id}
								onClick={() => simulateError(error.id)}
								disabled={currentError === error.id}
								className={`rounded-lg p-3 transition-colors ${
									currentError === error.id
										? "cursor-not-allowed border-2 border-red-500 bg-red-100"
										: "bg-gray-100 hover:bg-gray-200"
								}`}
							>
								<p className="font-medium text-gray-800">{error.name}</p>
								<p className="text-gray-500 text-xs">{error.component}</p>
							</button>
						))}
					</div>

					{currentError && (
						<div className="rounded-lg bg-red-50 p-4">
							<h4 className="mb-3 font-medium text-red-800">🚨 错误详情 (Owner Stack 调试信息)：</h4>
							{(() => {
								const error = errorScenarios.find((e) => e.id === currentError);
								return error ? (
									<div className="space-y-3">
										<div className="rounded border border-red-200 bg-white p-3">
											<p className="mb-1 font-medium text-gray-700 text-sm">错误组件：</p>
											<p className="font-mono text-red-600">{error.component}</p>
										</div>

										<div className="rounded border border-red-200 bg-white p-3">
											<p className="mb-1 font-medium text-gray-700 text-sm">Owner 路径：</p>
											<p className="font-mono text-red-600 text-sm">{error.owner}</p>
										</div>

										<div className="rounded border border-red-200 bg-white p-3">
											<p className="mb-1 font-medium text-gray-700 text-sm">错误信息：</p>
											<p className="font-mono text-red-600 text-sm">{error.error}</p>
										</div>

										<div className="rounded bg-yellow-50 p-3">
											<p className="text-sm text-yellow-800">
												💡 <strong>调试建议：</strong>
												沿着 Owner 路径向上检查，重点关注 {error.component} 组件的 props 和状态。
											</p>
										</div>
									</div>
								) : null;
							})()}
						</div>
					)}
				</div>
			)}

			<div className="mt-6 rounded-lg bg-blue-50 p-4">
				<p className="text-blue-800 text-sm">
					🔍 <strong>Owner Stack 调试价值：</strong>
					通过清晰的组件层级关系，开发者可以快速定位错误源头，理解错误发生的上下文，从而更高效地解决问题。
				</p>
			</div>
		</div>
	);
}

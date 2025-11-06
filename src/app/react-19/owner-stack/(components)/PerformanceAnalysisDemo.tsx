"use client";

import { useState } from "react";

type RenderTimeData = { component: string; time: number; status: string };
type ReRenderData = { component: string; count: number; status: string };
type PropsSizeData = { component: string; size: string; status: string };
type PerformanceData = RenderTimeData | ReRenderData | PropsSizeData;

export default function PerformanceAnalysisDemo() {
	const [analysisMode, setAnalysisMode] = useState(false);
	const [selectedMetric, setSelectedMetric] = useState<"render-time" | "re-renders" | "props-size">("render-time");

	const performanceData = {
		"render-time": [
			{ component: "App", time: 5.2, status: "good" },
			{ component: "Header", time: 2.1, status: "good" },
			{ component: "MainContent", time: 8.7, status: "warning" },
			{ component: "ArticleList", time: 15.3, status: "critical" },
			{ component: "ArticleCard", time: 3.8, status: "good" },
		],
		"re-renders": [
			{ component: "App", count: 1, status: "good" },
			{ component: "Header", count: 3, status: "good" },
			{ component: "MainContent", count: 12, status: "warning" },
			{ component: "ArticleList", count: 25, status: "critical" },
			{ component: "ArticleCard", count: 50, status: "critical" },
		],
		"props-size": [
			{ component: "App", size: "2KB", status: "good" },
			{ component: "Header", size: "1KB", status: "good" },
			{ component: "MainContent", size: "8KB", status: "warning" },
			{ component: "ArticleList", size: "15KB", status: "critical" },
			{ component: "ArticleCard", size: "3KB", status: "good" },
		],
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "good":
				return "text-green-600";
			case "warning":
				return "text-yellow-600";
			case "critical":
				return "text-red-600";
			default:
				return "text-gray-600";
		}
	};

	const getStatusBg = (status: string) => {
		switch (status) {
			case "good":
				return "bg-green-50";
			case "warning":
				return "bg-yellow-50";
			case "critical":
				return "bg-red-50";
			default:
				return "bg-gray-50";
		}
	};

	const currentData = performanceData[selectedMetric];

	const getItemValue = (item: PerformanceData) => {
		if (selectedMetric === "render-time" && "time" in item) {
			return `${item.time}ms`;
		} else if (selectedMetric === "re-renders" && "count" in item) {
			return `${item.count}次`;
		} else if (selectedMetric === "props-size" && "size" in item) {
			return item.size;
		}
		return "";
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg">
			<div className="mb-6">
				<h3 className="mb-4 font-semibold text-gray-800 text-xl">⚡ 性能分析面板</h3>
				<div className="mb-4 flex gap-4">
					<button
						onClick={() => setAnalysisMode(!analysisMode)}
						className={`rounded-lg px-4 py-2 transition-colors ${
							analysisMode ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-gray-600 text-white hover:bg-gray-700"
						}`}
					>
						{analysisMode ? "关闭" : "开启"} 性能分析
					</button>
				</div>

				<div className="mb-6 flex gap-2">
					{[
						{ key: "render-time", label: "渲染时间" },
						{ key: "re-renders", label: "重渲染次数" },
						{ key: "props-size", label: "Props 大小" },
					].map((metric) => (
						<button
							key={metric.key}
							onClick={() => setSelectedMetric(metric.key as any)}
							className={`rounded px-3 py-1 text-sm transition-colors ${
								selectedMetric === metric.key
									? "bg-blue-600 text-white"
									: "bg-gray-200 text-gray-700"
							}`}
						>
							{metric.label}
						</button>
					))}
				</div>

				{analysisMode && (
					<div className="space-y-3">
						<h4 className="font-medium text-gray-700">
							性能指标 (
							{selectedMetric === "render-time"
								? "渲染时间 (ms)"
								: selectedMetric === "re-renders"
									? "重渲染次数"
									: "Props 大小"}
							)：
						</h4>
						{currentData.map((item) => (
							<div key={item.component} className={`rounded-lg p-3 ${getStatusBg(item.status)}`}>
								<div className="flex items-center justify-between">
									<span className="font-medium text-gray-800">{item.component}</span>
									<span className={`font-bold ${getStatusColor(item.status)}`}>{getItemValue(item)}</span>
								</div>
								{item.status !== "good" && (
									<p className="mt-1 text-gray-600 text-xs">
										{item.status === "warning" ? "⚠️ 建议优化" : "🚨 急需优化"}
									</p>
								)}
							</div>
						))}

						<div className="mt-4 rounded-lg bg-purple-50 p-4">
							<p className="text-purple-800 text-sm">
								💡 <strong>优化建议：</strong>
								{selectedMetric === "render-time" && " 考虑使用 React.memo 和 useMemo 优化渲染性能。"}
								{selectedMetric === "re-renders" && " 检查组件依赖，避免不必要的重渲染。"}
								{selectedMetric === "props-size" && " 减少传递的 props 数量，使用 context 替代 deep props。"}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidChartProps {
	chart: string;
	config?: any;
	className?: string;
	id?: string;
	onError?: (error: Error) => void;
}

export default function MermaidChart({
	chart,
	config = {},
	className = "",
	id,
	onError,
}: MermaidChartProps) {
	const chartRef = useRef<HTMLDivElement>(null);
	const [isRendered, setIsRendered] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const chartId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

	useEffect(() => {
		// 初始化 Mermaid 配置
		mermaid.initialize({
			startOnLoad: false,
			theme: "default",
			themeVariables: {
				fontFamily: "system-ui, -apple-system, sans-serif",
				fontSize: "14px",
				primaryColor: "#3b82f6",
				primaryTextColor: "#1f2937",
				primaryBorderColor: "#2563eb",
				lineColor: "#6b7280",
				sectionBkgColor: "#f9fafb",
				altSectionBkgColor: "#f3f4f6",
				gridColor: "#e5e7eb",
				timelineBorderColor: "#d1d5db",
				timelineBkgColor: "#ffffff",
				timelineTextColor: "#374151",
				taskBkgColor: "#e0e7ff",
				taskTextColor: "#1e293b",
				taskBorderColor: "#6366f1",
				activeTaskBkgColor: "#dbeafe",
				activeTaskBorderColor: "#3b82f6",
				gridColor: "#e5e7eb",
				doneTaskBkgColor: "#d1fae5",
				doneTaskBorderColor: "#10b981",
				critBkgColor: "#fee2e2",
				critBorderColor: "#ef4444",
				todayLineColor: "#f59e0b",
				...config.themeVariables,
			},
			flowchart: {
				useMaxWidth: true,
				htmlLabels: true,
				curve: "basis",
			},
			...config,
		});
	}, [config]);

	useEffect(() => {
		if (!chartRef.current || !chart) return;

		const renderChart = async () => {
			try {
				setError(null);
				setIsRendered(false);

				// 清空容器
				chartRef.current.innerHTML = "";

				// 验证图表语法
				const isValid = await mermaid.parse(chart);
				if (!isValid) {
					throw new Error("Invalid Mermaid syntax");
				}

				// 渲染图表
				const { svg } = await mermaid.render(chartId, chart);
				if (chartRef.current) {
					chartRef.current.innerHTML = svg;
					setIsRendered(true);
				}
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : "渲染失败";
				setError(errorMessage);
				onError?.(err instanceof Error ? err : new Error(errorMessage));
				console.error("Mermaid render error:", err);
			}
		};

		renderChart();
	}, [chart, chartId, onError]);

	return (
		<div className={`mermaid-chart-container ${className}`}>
			{error ? (
				<div className="flex flex-col items-center justify-center rounded-lg border-2 border-red-200 bg-red-50 p-8">
					<svg
						className="mb-3 h-12 w-12 text-red-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L5.268 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
					<p className="text-center text-red-600">
						图表渲染失败
					</p>
					<p className="mt-1 text-center text-sm text-red-500">{error}</p>
				</div>
			) : (
				<div
					ref={chartRef}
					className={`flex items-center justify-center ${
						isRendered ? "" : "min-h-[200px]"
					}`}
				>
					{!isRendered && (
						<div className="text-center text-gray-500">
							<div className="mb-2">正在渲染图表...</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
"use client";

import mermaid from "mermaid";
import React, { useEffect, useRef, memo } from "react";

interface MermaidChartProps {
	chart: string;
	config?: any;
	className?: string;
	id?: string;
	onError?: (error: Error) => void;
}

const MermaidChartComponent = ({ chart, config = {}, className = "", id, onError }: MermaidChartProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const mountedRef = useRef(false);

	// 初始化 Mermaid（只执行一次）
	useEffect(() => {
		mountedRef.current = true;

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

		return () => {
			mountedRef.current = false;
		};
	}, []);

	useEffect(() => {
		if (!chart || !containerRef.current || !mountedRef.current) return;

		let cancelled = false;

		const renderChart = async () => {
			if (cancelled || !containerRef.current) return;

			try {
				// 验证语法
				await mermaid.parse(chart);

				// 生成唯一 ID
				const graphId = `mermaid-${id || 'graph'}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

				// 渲染 SVG
				const { svg } = await mermaid.render(graphId, chart);

				// 检查是否已取消
				if (cancelled || !containerRef.current) return;

				// 安全地更新内容
				containerRef.current.innerHTML = svg;
			} catch (err) {
				if (cancelled) return;

				const errorMessage = err instanceof Error ? err.message : "渲染失败";
				onError?.(err instanceof Error ? err : new Error(errorMessage));
				console.error("Mermaid 渲染错误:", err);
			}
		};

		// 使用 requestAnimationFrame 确保 DOM 更新完成后再渲染
		const animationId = requestAnimationFrame(() => {
			renderChart();
		});

		return () => {
			cancelled = true;
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	}, [chart, config, id, onError]);

	return (
		<div
			ref={containerRef}
			className={`mermaid-chart-container ${className}`}
			style={{ minHeight: "200px" }}
		>
			{!chart && (
				<div className="flex items-center justify-center text-gray-500">
					请选择一个图表
				</div>
			)}
		</div>
	);
};

// 使用 memo 避免不必要的重新渲染
export default memo(MermaidChartComponent);
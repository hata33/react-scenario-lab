"use client";

import ReactECharts from "echarts-for-react";
import { useEffect, useRef } from "react";

export default function TechStackRadarChart() {
	const chartRef = useRef<ReactECharts>(null);

	const option = {
		backgroundColor: "transparent",
		tooltip: {
			backgroundColor: "rgba(15, 23, 42, 0.9)",
			borderColor: "#22c55e",
			textStyle: {
				color: "#e2e8f0",
			},
		},
		legend: {
			data: ["前端开发者", "全栈开发者", "架构师"],
			textStyle: {
				color: "#94a3b8",
			},
			bottom: 0,
		},
		radar: {
			indicator: [
				{ name: "JavaScript/TypeScript", max: 100 },
				{ name: "框架应用", max: 100 },
				{ name: "CSS/样式", max: 100 },
				{ name: "构建工具", max: 100 },
				{ name: "性能优化", max: 100 },
				{ name: "测试", max: 100 },
				{ name: "服务端", max: 100 },
				{ name: "工程化", max: 100 },
			],
			shape: "polygon",
			splitNumber: 4,
			axisName: {
				color: "#94a3b8",
				fontSize: 11,
			},
			splitLine: {
				lineStyle: {
					color: "#334155",
				},
			},
			splitArea: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					color: "#475569",
				},
			},
		},
		series: [
			{
				name: "技能分布",
				type: "radar",
				data: [
					{
						value: [95, 88, 75, 70, 65, 55, 40, 60],
						name: "前端开发者",
						itemStyle: {
							color: "#22c55e",
						},
						areaStyle: {
							color: "rgba(34, 197, 94, 0.3)",
						},
					},
					{
						value: [85, 75, 65, 70, 60, 50, 75, 70],
						name: "全栈开发者",
						itemStyle: {
							color: "#3b82f6",
						},
						areaStyle: {
							color: "rgba(59, 130, 246, 0.3)",
						},
					},
					{
						value: [90, 85, 70, 80, 85, 65, 70, 90],
						name: "架构师",
						itemStyle: {
							color: "#f59e0b",
						},
						areaStyle: {
							color: "rgba(245, 158, 11, 0.3)",
						},
					},
				],
			},
		],
	};

	return <ReactECharts ref={chartRef} option={option} style={{ height: "320px" }} />;
}

"use client";

import ReactECharts from "echarts-for-react";
import { useEffect, useRef } from "react";

export default function DeveloperSkillsChart() {
	const chartRef = useRef<ReactECharts>(null);

	const option = {
		backgroundColor: "transparent",
		tooltip: {
			trigger: "item",
			backgroundColor: "rgba(15, 23, 42, 0.9)",
			borderColor: "#ec4899",
			textStyle: {
				color: "#e2e8f0",
			},
			formatter: "{a} <br/>{b}: {c} ({d}%)",
		},
		legend: {
			orient: "vertical",
			right: 0,
			top: "center",
			textStyle: {
				color: "#94a3b8",
				fontSize: 11,
			},
		},
		series: [
			{
				name: "技能分布",
				type: "pie",
				radius: ["40%", "70%"],
				center: ["35%", "50%"],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: "#0f172a",
					borderWidth: 2,
				},
				label: {
					show: false,
					position: "center",
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 16,
						fontWeight: "bold",
						color: "#e2e8f0",
					},
				},
				labelLine: {
					show: false,
				},
				data: [
					{
						value: 35,
						name: "JavaScript/TypeScript",
						itemStyle: { color: "#facc15" },
					},
					{
						value: 25,
						name: "框架应用",
						itemStyle: { color: "#3b82f6" },
					},
					{
						value: 15,
						name: "CSS/样式",
						itemStyle: { color: "#06b6d4" },
					},
					{
						value: 10,
						name: "构建工具",
						itemStyle: { color: "#22c55e" },
					},
					{
						value: 8,
						name: "测试",
						itemStyle: { color: "#f97316" },
					},
					{
						value: 7,
						name: "性能优化",
						itemStyle: { color: "#ec4899" },
					},
				],
			},
		],
	};

	return <ReactECharts ref={chartRef} option={option} style={{ height: "280px" }} />;
}

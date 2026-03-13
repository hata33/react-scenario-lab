"use client";

import ReactECharts from "echarts-for-react";
import { useEffect, useRef } from "react";

export default function FrontendToolsChart() {
	const chartRef = useRef<ReactECharts>(null);

	const option = {
		backgroundColor: "transparent",
		tooltip: {
			trigger: "item",
			triggerOn: "mousemove",
			backgroundColor: "rgba(15, 23, 42, 0.9)",
			borderColor: "#14b8a6",
			textStyle: {
				color: "#e2e8f0",
			},
		},
		series: [
			{
				type: "tree",
				data: [
					{
						name: "前端工具链",
						children: [
							{
								name: "包管理器",
								children: [
									{ name: "npm", value: 40 },
									{ name: "yarn", value: 25 },
									{ name: "pnpm", value: 35 },
								],
								itemStyle: { color: "#3b82f6" },
							},
							{
								name: "构建工具",
								children: [
									{ name: "Webpack", value: 35 },
									{ name: "Vite", value: 40 },
									{ name: "Rollup", value: 15 },
									{ name: "esbuild", value: 10 },
								],
								itemStyle: { color: "#22c55e" },
							},
							{
								name: "代码质量",
								children: [
									{ name: "ESLint", value: 45 },
									{ name: "Prettier", value: 40 },
									{ name: "Biome", value: 15 },
								],
								itemStyle: { color: "#f97316" },
							},
							{
								name: "测试框架",
								children: [
									{ name: "Jest", value: 35 },
									{ name: "Vitest", value: 30 },
									{ name: "Playwright", value: 20 },
									{ name: "Cypress", value: 15 },
								],
								itemStyle: { color: "#ec4899" },
							},
							{
								name: "CSS方案",
								children: [
									{ name: "Tailwind CSS", value: 50 },
									{ name: "CSS Modules", value: 20 },
									{ name: "Styled Components", value: 15 },
									{ name: "UnoCSS", value: 15 },
								],
								itemStyle: { color: "#8b5cf6" },
							},
						],
					},
				],
				top: "5%",
				left: "10%",
				bottom: "5%",
				right: "20%",
				symbolSize: 8,
				label: {
					position: "left",
					verticalAlign: "middle",
					align: "right",
					fontSize: 11,
					color: "#94a3b8",
				},
				leaves: {
					label: {
						position: "right",
						verticalAlign: "middle",
						align: "left",
					},
				},
				expandAndCollapse: true,
				animationDuration: 550,
				animationDurationUpdate: 750,
				itemStyle: {
					color: "#14b8a6",
					borderColor: "#0f766e",
				},
				lineStyle: {
					color: "#334155",
					width: 1.5,
					curveness: 0.5,
				},
			},
		],
	};

	return <ReactECharts ref={chartRef} option={option} style={{ height: "300px" }} />;
}

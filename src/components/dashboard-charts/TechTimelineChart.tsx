"use client";

import ReactECharts from "echarts-for-react";
import { useEffect, useRef } from "react";

export default function TechTimelineChart() {
	const chartRef = useRef<ReactECharts>(null);

	const option = {
		backgroundColor: "transparent",
		tooltip: {
			trigger: "axis",
			backgroundColor: "rgba(15, 23, 42, 0.9)",
			borderColor: "#eab308",
			textStyle: {
				color: "#e2e8f0",
			},
		},
		grid: {
			left: "5%",
			right: "5%",
			bottom: "10%",
			top: "10%",
			containLabel: true,
		},
		xAxis: {
			type: "time",
			axisLine: {
				lineStyle: {
					color: "#475569",
				},
			},
			axisLabel: {
				color: "#94a3b8",
				formatter: "{yyyy}",
			},
			splitLine: {
				show: false,
			},
		},
		yAxis: {
			type: "category",
			data: ["浏览器", "JavaScript", "CSS", "框架", "工具链"],
			axisLine: {
				lineStyle: {
					color: "#475569",
				},
			},
			axisLabel: {
				color: "#94a3b8",
			},
			splitLine: {
				lineStyle: {
					color: "#334155",
					type: "dashed",
				},
			},
		},
		series: [
			{
				type: "scatter",
				symbolSize: 20,
				data: [
					// 浏览器
					{ name: "Netscape", value: ["1994-12-01", "浏览器"], itemStyle: { color: "#3b82f6" } },
					{ name: "IE", value: ["1995-08-01", "浏览器"], itemStyle: { color: "#00a4ef" } },
					{ name: "Firefox", value: ["2004-11-01", "浏览器"], itemStyle: { color: "#ff7139" } },
					{ name: "Chrome", value: ["2008-09-01", "浏览器"], itemStyle: { color: "#4285f4" } },
					{ name: "Edge", value: ["2015-07-01", "浏览器"], itemStyle: { color: "#0078d7" } },
					// JavaScript
					{ name: "JS诞生", value: ["1995-05-01", "JavaScript"], itemStyle: { color: "#facc15" } },
					{ name: "ES6", value: ["2015-06-01", "JavaScript"], itemStyle: { color: "#facc15" } },
					{ name: "TS", value: ["2012-10-01", "JavaScript"], itemStyle: { color: "#3178c6" } },
					// CSS
					{ name: "CSS1", value: ["1996-12-01", "CSS"], itemStyle: { color: "#264de4" } },
					{ name: "CSS3", value: ["1999-01-01", "CSS"], itemStyle: { color: "#264de4" } },
					{ name: "Tailwind", value: ["2019-11-01", "CSS"], itemStyle: { color: "#06b6d4" } },
					// 框架
					{ name: "jQuery", value: ["2006-08-01", "框架"], itemStyle: { color: "#0769ad" } },
					{ name: "Angular", value: ["2010-10-01", "框架"], itemStyle: { color: "#dd0031" } },
					{ name: "React", value: ["2013-05-01", "框架"], itemStyle: { color: "#61dafb" } },
					{ name: "Vue", value: ["2014-02-01", "框架"], itemStyle: { color: "#42b883" } },
					// 工具链
					{ name: "npm", value: ["2010-01-01", "工具链"], itemStyle: { color: "#cb3837" } },
					{ name: "Webpack", value: ["2012-03-01", "工具链"], itemStyle: { color: "#8dd6f9" } },
					{ name: "Vite", value: ["2020-04-01", "工具链"], itemStyle: { color: "#646cff" } },
					{ name: "pnpm", value: ["2017-09-01", "工具链"], itemStyle: { color: "#f69220" } },
				],
			},
		],
	};

	return <ReactECharts ref={chartRef} option={option} style={{ height: "280px" }} />;
}

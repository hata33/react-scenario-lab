"use client";

import * as echarts from "echarts/core";
import ReactECharts from "echarts-for-react";
import { useEffect, useRef } from "react";

export default function BrowserMarketChart() {
	const chartRef = useRef<ReactECharts>(null);

	const option = {
		backgroundColor: "transparent",
		tooltip: {
			trigger: "axis",
			backgroundColor: "rgba(15, 23, 42, 0.9)",
			borderColor: "#06b6d4",
			textStyle: {
				color: "#e2e8f0",
			},
		},
		legend: {
			data: ["Netscape", "IE", "Firefox", "Chrome", "Safari"],
			textStyle: {
				color: "#94a3b8",
			},
			top: 0,
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true,
		},
		xAxis: {
			type: "category",
			boundaryGap: false,
			data: ["1995", "2000", "2005", "2010", "2015", "2020", "2025"],
			axisLine: {
				lineStyle: {
					color: "#475569",
				},
			},
			axisLabel: {
				color: "#94a3b8",
			},
		},
		yAxis: {
			type: "value",
			max: 100,
			axisLabel: {
				color: "#94a3b8",
				formatter: "{value}%",
			},
			axisLine: {
				lineStyle: {
					color: "#475569",
				},
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
				name: "Netscape",
				type: "line",
				data: [80, 15, 2, 0, 0, 0, 0],
				smooth: true,
				lineStyle: {
					color: "#3b82f6",
					width: 2,
				},
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "rgba(59, 130, 246, 0.3)" },
						{ offset: 1, color: "rgba(59, 130, 246, 0)" },
					]),
				},
			},
			{
				name: "IE",
				type: "line",
				data: [5, 80, 85, 50, 20, 5, 2],
				smooth: true,
				lineStyle: {
					color: "#00a4ef",
					width: 2,
				},
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "rgba(0, 164, 239, 0.3)" },
						{ offset: 1, color: "rgba(0, 164, 239, 0)" },
					]),
				},
			},
			{
				name: "Firefox",
				type: "line",
				data: [0, 5, 10, 30, 10, 5, 3],
				smooth: true,
				lineStyle: {
					color: "#ff7139",
					width: 2,
				},
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "rgba(255, 113, 57, 0.3)" },
						{ offset: 1, color: "rgba(255, 113, 57, 0)" },
					]),
				},
			},
			{
				name: "Chrome",
				type: "line",
				data: [0, 0, 0, 10, 55, 65, 70],
				smooth: true,
				lineStyle: {
					color: "#4285f4",
					width: 3,
				},
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "rgba(66, 133, 244, 0.3)" },
						{ offset: 1, color: "rgba(66, 133, 244, 0)" },
					]),
				},
				emphasis: {
					focus: "series",
				},
			},
			{
				name: "Safari",
				type: "line",
				data: [0, 0, 3, 7, 12, 18, 19],
				smooth: true,
				lineStyle: {
					color: "#00d8ff",
					width: 2,
				},
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "rgba(0, 216, 255, 0.3)" },
						{ offset: 1, color: "rgba(0, 216, 255, 0)" },
					]),
				},
			},
		],
	};

	return <ReactECharts ref={chartRef} option={option} style={{ height: "300px" }} />;
}

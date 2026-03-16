"use client";

import * as echarts from "echarts/core";
import ReactECharts from "echarts-for-react";
import { useRef } from "react";

export default function LanguageTrendChart() {
	const chartRef = useRef<ReactECharts>(null);

	const option = {
		backgroundColor: "transparent",
		tooltip: {
			trigger: "axis",
			backgroundColor: "rgba(15, 23, 42, 0.9)",
			borderColor: "#6366f1",
			textStyle: {
				color: "#e2e8f0",
			},
		},
		legend: {
			data: ["JavaScript", "TypeScript", "Python", "Rust", "Go"],
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
			data: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
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
				name: "JavaScript",
				type: "line",
				data: [95, 93, 90, 88, 85, 82, 80],
				smooth: true,
				lineStyle: {
					color: "#facc15",
					width: 3,
				},
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "rgba(250, 204, 21, 0.3)" },
						{ offset: 1, color: "rgba(250, 204, 21, 0)" },
					]),
				},
			},
			{
				name: "TypeScript",
				type: "line",
				data: [40, 55, 68, 78, 85, 90, 93],
				smooth: true,
				lineStyle: {
					color: "#3178c6",
					width: 3,
				},
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "rgba(49, 120, 198, 0.3)" },
						{ offset: 1, color: "rgba(49, 120, 198, 0)" },
					]),
				},
			},
			{
				name: "Python",
				type: "line",
				data: [15, 20, 25, 30, 35, 38, 40],
				smooth: true,
				lineStyle: {
					color: "#3776ab",
					width: 2,
				},
			},
			{
				name: "Rust",
				type: "line",
				data: [2, 5, 10, 15, 20, 25, 30],
				smooth: true,
				lineStyle: {
					color: "#dea584",
					width: 2,
				},
			},
			{
				name: "Go",
				type: "line",
				data: [8, 12, 15, 18, 20, 22, 25],
				smooth: true,
				lineStyle: {
					color: "#00add8",
					width: 2,
				},
			},
		],
	};

	return <ReactECharts ref={chartRef} option={option} style={{ height: "300px" }} />;
}

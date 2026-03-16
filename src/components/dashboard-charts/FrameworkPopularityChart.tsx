"use client";

import ReactECharts from "echarts-for-react";
import { useRef } from "react";

export default function FrameworkPopularityChart() {
	const chartRef = useRef<ReactECharts>(null);

	const option = {
		backgroundColor: "transparent",
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
			backgroundColor: "rgba(15, 23, 42, 0.9)",
			borderColor: "#a855f7",
			textStyle: {
				color: "#e2e8f0",
			},
		},
		legend: {
			data: ["React", "Vue", "Angular", "Svelte", "Solid"],
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
			data: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
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
				name: "React",
				type: "bar",
				data: [65, 72, 78, 82, 85, 88, 90, 92],
				itemStyle: {
					color: "#61dafb",
					borderRadius: [4, 4, 0, 0],
				},
			},
			{
				name: "Vue",
				type: "bar",
				data: [45, 55, 62, 68, 72, 75, 78, 80],
				itemStyle: {
					color: "#42b883",
					borderRadius: [4, 4, 0, 0],
				},
			},
			{
				name: "Angular",
				type: "bar",
				data: [40, 42, 45, 48, 50, 52, 54, 55],
				itemStyle: {
					color: "#dd0031",
					borderRadius: [4, 4, 0, 0],
				},
			},
			{
				name: "Svelte",
				type: "bar",
				data: [5, 10, 15, 22, 28, 35, 40, 45],
				itemStyle: {
					color: "#ff3e00",
					borderRadius: [4, 4, 0, 0],
				},
			},
			{
				name: "Solid",
				type: "bar",
				data: [2, 5, 8, 12, 18, 25, 30, 35],
				itemStyle: {
					color: "#4f88c6",
					borderRadius: [4, 4, 0, 0],
				},
			},
		],
	};

	return <ReactECharts ref={chartRef} option={option} style={{ height: "300px" }} />;
}

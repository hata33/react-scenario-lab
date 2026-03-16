"use client";

import * as echarts from "echarts/core";
import ReactECharts from "echarts-for-react";
import { useRef } from "react";

export default function CoreTechAreaChart() {
	const chartRef = useRef<ReactECharts>(null);

	const option = {
		backgroundColor: "transparent",
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "cross",
				label: {
					backgroundColor: "#6a7985",
				},
			},
			backgroundColor: "rgba(15, 23, 42, 0.9)",
			borderColor: "#f97316",
			textStyle: {
				color: "#e2e8f0",
			},
		},
		legend: {
			data: ["HTML", "CSS", "JavaScript"],
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
			data: ["2010", "2012", "2014", "2016", "2018", "2020", "2022", "2024"],
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
				name: "HTML",
				type: "line",
				stack: "Total",
				areaStyle: {
					opacity: 0.8,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "rgba(239, 68, 68, 0.8)" },
						{ offset: 1, color: "rgba(239, 68, 68, 0.1)" },
					]),
				},
				showSymbol: false,
				lineStyle: {
					width: 0,
				},
				data: [95, 96, 97, 98, 99, 99, 100, 100],
			},
			{
				name: "CSS",
				type: "line",
				stack: "Total",
				areaStyle: {
					opacity: 0.8,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "rgba(59, 130, 246, 0.8)" },
						{ offset: 1, color: "rgba(59, 130, 246, 0.1)" },
					]),
				},
				showSymbol: false,
				lineStyle: {
					width: 0,
				},
				data: [85, 88, 90, 92, 94, 95, 96, 97],
			},
			{
				name: "JavaScript",
				type: "line",
				stack: "Total",
				areaStyle: {
					opacity: 0.8,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "rgba(250, 204, 21, 0.8)" },
						{ offset: 1, color: "rgba(250, 204, 21, 0.1)" },
					]),
				},
				showSymbol: false,
				lineStyle: {
					width: 0,
				},
				data: [90, 92, 94, 96, 97, 98, 99, 99],
			},
		],
	};

	return <ReactECharts ref={chartRef} option={option} style={{ height: "300px" }} />;
}

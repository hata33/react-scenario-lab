"use client";

import * as echarts from "echarts/core";
import ReactECharts from "echarts-for-react";
import { useRef } from "react";

export default function SalaryTrendChart() {
	const chartRef = useRef<ReactECharts>(null);

	const option = {
		backgroundColor: "transparent",
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "cross",
				crossStyle: {
					color: "#999",
				},
			},
			backgroundColor: "rgba(15, 23, 42, 0.9)",
			borderColor: "#10b981",
			textStyle: {
				color: "#e2e8f0",
			},
		},
		legend: {
			data: ["初级", "中级", "高级", "专家"],
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
			axisPointer: {
				type: "shadow",
			},
			axisLine: {
				lineStyle: {
					color: "#475569",
				},
			},
			axisLabel: {
				color: "#94a3b8",
			},
		},
		yAxis: [
			{
				type: "value",
				name: "薪资(K/月)",
				min: 0,
				max: 60,
				interval: 10,
				axisLabel: {
					color: "#94a3b8",
					formatter: "{value}K",
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
		],
		series: [
			{
				name: "初级",
				type: "bar",
				data: [8, 10, 12, 13, 14, 15, 16, 17],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "#22c55e" },
						{ offset: 1, color: "#15803d" },
					]),
					borderRadius: [4, 4, 0, 0],
				},
			},
			{
				name: "中级",
				type: "bar",
				data: [15, 18, 20, 22, 24, 26, 28, 30],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "#3b82f6" },
						{ offset: 1, color: "#1d4ed8" },
					]),
					borderRadius: [4, 4, 0, 0],
				},
			},
			{
				name: "高级",
				type: "bar",
				data: [22, 25, 28, 32, 35, 38, 40, 42],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "#a855f7" },
						{ offset: 1, color: "#7e22ce" },
					]),
					borderRadius: [4, 4, 0, 0],
				},
			},
			{
				name: "专家",
				type: "line",
				data: [30, 35, 38, 42, 45, 48, 52, 55],
				smooth: true,
				lineStyle: {
					color: "#f59e0b",
					width: 3,
				},
				symbol: "circle",
				symbolSize: 8,
				itemStyle: {
					color: "#f59e0b",
					borderColor: "#fff",
					borderWidth: 2,
				},
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: "rgba(245, 158, 11, 0.3)" },
						{ offset: 1, color: "rgba(245, 158, 11, 0)" },
					]),
				},
			},
		],
	};

	return <ReactECharts ref={chartRef} option={option} style={{ height: "300px" }} />;
}

"use client";

import ReactECharts from "echarts-for-react";
import { useEffect, useRef } from "react";

export default function PerformanceGaugeChart() {
	const chartRef = useRef<ReactECharts>(null);

	const option = {
		backgroundColor: "transparent",
		tooltip: {
			backgroundColor: "rgba(15, 23, 42, 0.9)",
			borderColor: "#ef4444",
			textStyle: {
				color: "#e2e8f0",
			},
			formatter: "{a} <br/>{b}: {c}%",
		},
		series: [
			{
				name: "性能指标",
				type: "gauge",
				center: ["25%", "55%"],
				radius: "60%",
				min: 0,
				max: 100,
				splitNumber: 10,
				axisLine: {
					lineStyle: {
						width: 8,
						color: [
							[0.3, "#ef4444"],
							[0.7, "#f59e0b"],
							[1, "#22c55e"],
						],
					},
				},
				pointer: {
					itemStyle: {
						color: "auto",
					},
				},
				axisTick: {
					distance: -8,
					length: 5,
					lineStyle: {
						color: "#fff",
						width: 1,
					},
				},
				splitLine: {
					distance: -8,
					length: 8,
					lineStyle: {
						color: "#fff",
						width: 2,
					},
				},
				axisLabel: {
					color: "#94a3b8",
					distance: 12,
					fontSize: 9,
				},
				detail: {
					valueAnimation: true,
					formatter: "{value}%",
					color: "#94a3b8",
					fontSize: 14,
					offsetCenter: [0, "70%"],
				},
				title: {
					offsetCenter: [0, "90%"],
					fontSize: 11,
					color: "#94a3b8",
				},
				data: [
					{
						value: 85,
						name: "LCP",
					},
				],
			},
			{
				name: "性能指标",
				type: "gauge",
				center: ["50%", "55%"],
				radius: "60%",
				min: 0,
				max: 100,
				splitNumber: 10,
				axisLine: {
					lineStyle: {
						width: 8,
						color: [
							[0.3, "#ef4444"],
							[0.7, "#f59e0b"],
							[1, "#22c55e"],
						],
					},
				},
				pointer: {
					itemStyle: {
						color: "auto",
					},
				},
				axisTick: {
					distance: -8,
					length: 5,
					lineStyle: {
						color: "#fff",
						width: 1,
					},
				},
				splitLine: {
					distance: -8,
					length: 8,
					lineStyle: {
						color: "#fff",
						width: 2,
					},
				},
				axisLabel: {
					color: "#94a3b8",
					distance: 12,
					fontSize: 9,
				},
				detail: {
					valueAnimation: true,
					formatter: "{value}%",
					color: "#94a3b8",
					fontSize: 14,
					offsetCenter: [0, "70%"],
				},
				title: {
					offsetCenter: [0, "90%"],
					fontSize: 11,
					color: "#94a3b8",
				},
				data: [
					{
						value: 92,
						name: "FID",
					},
				],
			},
			{
				name: "性能指标",
				type: "gauge",
				center: ["75%", "55%"],
				radius: "60%",
				min: 0,
				max: 100,
				splitNumber: 10,
				axisLine: {
					lineStyle: {
						width: 8,
						color: [
							[0.3, "#ef4444"],
							[0.7, "#f59e0b"],
							[1, "#22c55e"],
						],
					},
				},
				pointer: {
					itemStyle: {
						color: "auto",
					},
				},
				axisTick: {
					distance: -8,
					length: 5,
					lineStyle: {
						color: "#fff",
						width: 1,
					},
				},
				splitLine: {
					distance: -8,
					length: 8,
					lineStyle: {
						color: "#fff",
						width: 2,
					},
				},
				axisLabel: {
					color: "#94a3b8",
					distance: 12,
					fontSize: 9,
				},
				detail: {
					valueAnimation: true,
					formatter: "{value}%",
					color: "#94a3b8",
					fontSize: 14,
					offsetCenter: [0, "70%"],
				},
				title: {
					offsetCenter: [0, "90%"],
					fontSize: 11,
					color: "#94a3b8",
				},
				data: [
					{
						value: 88,
						name: "CLS",
					},
				],
			},
		],
	};

	// 模拟数据动态更新
	useEffect(() => {
		const interval = setInterval(() => {
			if (chartRef.current) {
				const chartInstance = chartRef.current.getEchartsInstance();
				const option = chartInstance.getOption();

				const series = option.series as any[];
				series.forEach((item) => {
					if (item.data && item.data[0]) {
						item.data[0].value = +(Math.random() * 30 + 70).toFixed(0);
					}
				});

				chartInstance.setOption({
					series: series,
				});
			}
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return <ReactECharts ref={chartRef} option={option} style={{ height: "240px" }} />;
}

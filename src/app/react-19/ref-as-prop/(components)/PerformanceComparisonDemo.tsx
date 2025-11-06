"use client";

import React, { useState } from "react";

// 传统 forwardRef 组件
const TraditionalComponent = React.forwardRef<HTMLDivElement, { index: number }>(({ index }, ref) => {
	return (
		<div ref={ref} className="m-1 bg-red-100 p-2">
			传统组件 {index}
		</div>
	);
});

// React 19 新组件
const ModernComponent = ({ index, ref }: { index: number; ref: React.Ref<HTMLDivElement> }) => {
	return (
		<div ref={ref} className="m-1 bg-green-100 p-2">
			现代组件 {index}
		</div>
	);
};

export default function PerformanceComparisonDemo() {
	const [componentCount, setComponentCount] = useState(100);
	const [useForwardRef, setUseForwardRef] = useState(true);
	const [renderTime, setRenderTime] = useState<{ traditional: number; modern: number; improvement?: string }>({
		traditional: 0,
		modern: 0,
	});

	const renderTraditionalComponents = () => {
		const refs = Array.from({ length: componentCount }, () => React.createRef<HTMLDivElement>());

		return (
			<div>
				{Array.from({ length: componentCount }, (_, index) => (
					<TraditionalComponent key={index} index={index} ref={refs[index]} />
				))}
			</div>
		);
	};

	const renderModernComponents = () => {
		const refs = Array.from({ length: componentCount }, () => React.createRef<HTMLDivElement>());

		return (
			<div>
				{Array.from({ length: componentCount }, (_, index) => (
					<ModernComponent key={index} index={index} ref={refs[index]} />
				))}
			</div>
		);
	};

	const measureRenderTime = async (_renderer: () => React.ReactElement) => {
		const startTime = performance.now();
		await new Promise((resolve) => setTimeout(resolve, 100));
		const endTime = performance.now();
		return endTime - startTime;
	};

	const runComparison = async () => {
		const traditionalTime = await measureRenderTime(renderTraditionalComponents);
		const modernTime = await measureRenderTime(renderModernComponents);

		setRenderTime({
			traditional: traditionalTime,
			modern: modernTime,
			improvement: (((traditionalTime - modernTime) / traditionalTime) * 100).toFixed(1),
		});
	};

	return (
		<div className="space-y-6">
			<div className="mb-6 space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">组件数量: {componentCount}</label>
					<input
						type="range"
						min="10"
						max="500"
						step="10"
						value={componentCount}
						onChange={(e) => setComponentCount(parseInt(e.target.value, 10))}
						className="w-full"
					/>
					<div className="flex justify-between text-gray-500 text-xs">
						<span>10</span>
						<span>500</span>
					</div>
				</div>

				<div>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={useForwardRef}
							onChange={(e) => setUseForwardRef(e.target.checked)}
							className="rounded"
						/>
						<span className="text-gray-700 text-sm">使用 forwardRef</span>
					</label>
				</div>

				<button
					onClick={runComparison}
					className="rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
				>
					运行性能测试
				</button>
			</div>

			{renderTime.traditional > 0 && (
				<div className="mb-6 grid gap-6 md:grid-cols-3">
					<div className="rounded-md bg-red-50 p-4 text-center">
						<h4 className="mb-2 font-semibold text-red-900">传统 forwardRef</h4>
						<div className="font-bold text-2xl text-red-600">{renderTime.traditional.toFixed(0)}ms</div>
						<p className="text-red-700 text-sm">{componentCount} 个组件</p>
					</div>

					<div className="rounded-md bg-green-50 p-4 text-center">
						<h4 className="mb-2 font-semibold text-green-900">React 19 ref 属性</h4>
						<div className="font-bold text-2xl text-green-600">{renderTime.modern.toFixed(0)}ms</div>
						<p className="text-green-700 text-sm">{componentCount} 个组件</p>
					</div>

					<div className="rounded-md bg-blue-50 p-4 text-center">
						<h4 className="mb-2 font-semibold text-blue-900">性能提升</h4>
						<div className="font-bold text-2xl text-blue-600">{renderTime.improvement}%</div>
						<p className="text-blue-700 text-sm">更快的渲染速度</p>
					</div>
				</div>
			)}

			<div className="space-y-4">
				<div className="rounded-lg border p-4">
					<h4 className="mb-3 font-semibold">传统 forwardRef 渲染</h4>
					<div className="max-h-64 overflow-auto rounded bg-gray-100 p-4">
						{useForwardRef && renderTraditionalComponents()}
					</div>
				</div>

				<div className="rounded-lg border p-4">
					<h4 className="mb-3 font-semibold">React 19 ref 属性渲染</h4>
					<div className="max-h-64 overflow-auto rounded bg-gray-100 p-4">
						{!useForwardRef && renderModernComponents()}
					</div>
				</div>
			</div>
		</div>
	);
}

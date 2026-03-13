"use client";

import type React from "react";

export interface Example {
	id: string;
	title: string;
	icon: React.ReactNode;
	difficulty: "初级" | "中级" | "高级";
}

interface FeatureExampleSelectorProps {
	label?: string;
	examples: Example[];
	selectedExampleId: string;
	onSelectExample: (exampleId: string) => void;
}

const getDifficultyColor = (difficulty: string) => {
	switch (difficulty) {
		case "初级":
			return "bg-green-100 text-green-700";
		case "中级":
			return "bg-yellow-100 text-yellow-700";
		case "高级":
			return "bg-red-100 text-red-700";
		default:
			return "bg-gray-100 text-gray-700";
	}
};

/**
 * 示例选择器内容块（sticky 定位）
 * 显示可选示例列表，支持切换
 * 无外层容器，直接使用 FeatureContent 包裹
 */
export default function FeatureExampleSelector({
	label = "选择功能:",
	examples,
	selectedExampleId,
	onSelectExample,
}: FeatureExampleSelectorProps) {
	return (
		<div className="sticky top-0 z-10 border-gray-200 border-b bg-white">
			<div className="px-3 py-3 sm:px-4 md:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-between gap-2 sm:gap-3 sm:flex-row">
					<h2 className="whitespace-nowrap font-semibold text-gray-900 text-xs sm:text-sm">{label}</h2>
					<div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
						{examples.map((example) => (
							<button
								key={example.id}
								onClick={() => onSelectExample(example.id)}
								className={`flex min-h-[44px] items-center rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 font-medium text-xs sm:text-sm transition-all ${
									selectedExampleId === example.id
										? "bg-blue-500 text-white shadow-sm"
										: "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
								}`}
							>
								<span className="mr-0.5 shrink-0 sm:mr-1">{example.icon}</span>
								<span className="hidden truncate sm:inline sm:max-w-none">{example.title}</span>
								<span className="truncate max-w-[100px] sm:hidden">{example.title}</span>
								<span className={`ml-1 shrink-0 rounded px-1 py-0.5 text-xs ${getDifficultyColor(example.difficulty)}`}>
									{example.difficulty}
								</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

"use client";

import type React from "react";

interface Example {
	id: string;
	title: string;
	icon: React.ReactNode;
	difficulty: "初级" | "中级" | "高级";
}

interface ExampleSelectorProps {
	selectorLabel: string;
	examples: Example[];
	selectedExampleId: string;
	onExampleSelect: (exampleId: string) => void;
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

export default function ExampleSelector({
	selectorLabel,
	examples,
	selectedExampleId,
	onExampleSelect,
}: ExampleSelectorProps) {
	return (
		<div className="sticky top-0 z-10 border-gray-200 border-b bg-white">
			<div className="px-3 py-3 sm:px-4 md:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-3">
					<h2 className="font-semibold text-gray-900 text-xs sm:text-sm">{selectorLabel}</h2>
					<div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
						{examples.map((example) => (
							<button
								key={example.id}
								onClick={() => onExampleSelect(example.id)}
								className={`rounded-lg px-2 py-1 font-medium text-xs transition-all sm:px-3 sm:py-1.5 sm:text-sm ${
									selectedExampleId === example.id
										? "bg-blue-500 text-white shadow-sm"
										: "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
								}`}
							>
								<span className="mr-0.5 sm:mr-1">{example.icon}</span>
								<span className="hidden sm:inline">{example.title}</span>
								<span className="sm:hidden">{example.title}</span>
								<span className={`ml-1 rounded px-1 py-0.5 text-xs ${getDifficultyColor(example.difficulty)}`}>
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

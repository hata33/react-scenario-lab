"use client";

import type React from "react";

export interface OfficialExample {
	title: string;
	code: string;
	description?: string;
}

interface FeatureOfficialExamplesProps {
	title: string;
	description: string;
	examples: OfficialExample[];
}

/**
 * 官方示例内容块
 * 展示官方代码示例
 * 无外层容器，直接使用 FeatureContent 包裹
 */
export default function FeatureOfficialExamples({
	title,
	description,
	examples,
}: FeatureOfficialExamplesProps) {
	return (
		<div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
			<h2 className="mb-4 md:mb-6 font-bold text-xl md:text-2xl text-gray-900">{title}</h2>
			<p className="mb-4 md:mb-6 text-gray-600 text-sm md:text-base">{description}</p>

			{examples.length > 0 ? (
				<div className="grid gap-4 md:gap-6 lg:grid-cols-2">
					{examples.map((example, index) => (
						<div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-3 md:p-4">
							<h3 className="mb-2 md:mb-3 font-semibold text-gray-800 text-sm md:text-base">{example.title}</h3>
							<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-2 md:p-3 text-gray-100 text-xs">{example.code}</pre>
							{example.description && <p className="text-gray-600 text-xs">{example.description}</p>}
						</div>
					))}
				</div>
			) : (
				<div className="py-8 md:py-12 text-center">
					<div className="mx-auto mb-3 md:mb-4 h-12 w-12 md:h-16 md:w-16 text-gray-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
							/>
						</svg>
					</div>
					<h3 className="mb-2 font-semibold text-gray-900 text-base md:text-lg">暂无官方示例</h3>
					<p className="text-gray-600 text-sm md:text-base">官方代码示例正在整理中，敬请期待</p>
				</div>
			)}
		</div>
	);
}

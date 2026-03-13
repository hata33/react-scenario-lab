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
export default function FeatureOfficialExamples({ title, description, examples }: FeatureOfficialExamplesProps) {
	return (
		<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
			<h2 className="mb-4 break-words font-bold text-gray-900 text-xl md:mb-6 md:text-2xl">{title}</h2>
			<p className="mb-4 break-words text-gray-600 text-sm md:mb-6 md:text-base">{description}</p>

			{examples.length > 0 ? (
				<div className="grid gap-4 md:gap-6 lg:grid-cols-2">
					{examples.map((example, index) => (
						<div key={index} className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-3 md:p-4">
							<h3 className="mb-2 break-words font-semibold text-gray-800 text-sm md:mb-3 md:text-base">
								{example.title}
							</h3>
							<div className="mb-2 overflow-x-auto rounded bg-gray-900 p-2 text-gray-100 text-xs md:p-3">
								<pre className="min-w-max whitespace-pre-wrap break-all">
									<code>{example.code}</code>
								</pre>
							</div>
							{example.description && <p className="break-words text-gray-600 text-xs">{example.description}</p>}
						</div>
					))}
				</div>
			) : (
				<div className="py-8 text-center md:py-12">
					<div className="mx-auto mb-3 h-12 w-12 text-gray-400 md:mb-4 md:h-16 md:w-16">
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
					<h3 className="mb-2 font-semibold text-base text-gray-900 md:text-lg">暂无官方示例</h3>
					<p className="text-gray-600 text-sm md:text-base">官方代码示例正在整理中，敬请期待</p>
				</div>
			)}
		</div>
	);
}

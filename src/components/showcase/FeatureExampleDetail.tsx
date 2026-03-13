"use client";

import { CheckCircle, Copy } from "lucide-react";
import type React from "react";

export interface ExampleDetail {
	title: string;
	icon: React.ReactNode;
	description: string;
	codeSnippet: string;
	benefits: string[];
	useCases: string[];
	problemsSolved: {
		problem: string;
		description: string;
		solution: string;
	}[];
	status?: "completed" | "in-progress" | "planned";
}

interface FeatureExampleDetailProps {
	example: ExampleDetail;
	demoComponents: React.ReactNode[];
	onCopyCode: (code: string) => void;
	copiedCode: boolean;
}

/**
 * 示例详情内容块
 * 展示选中示例的详细信息、代码和问题解决
 * 无外层容器，直接使用 FeatureContent 包裹
 */
export default function FeatureExampleDetail({
	example,
	demoComponents,
	onCopyCode,
	copiedCode,
}: FeatureExampleDetailProps) {
	return (
		<div className="space-y-8">
			{/* 示例详细信息 */}
			<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
				<div className="border-gray-200 border-b p-4 md:p-6">
					<div className="flex items-center space-x-3 md:space-x-4">
						<div className="shrink-0 rounded-lg bg-blue-100 p-2.5 text-blue-600 md:p-3">{example.icon}</div>
						<div className="min-w-0 flex-1">
							<h3 className="break-words font-semibold text-xl text-gray-900 md:text-2xl">{example.title}</h3>
							<p className="break-words text-gray-600 text-sm md:text-base">{example.description}</p>
						</div>
					</div>
				</div>

				<div className="p-4 md:p-6">
					<div className="mb-4 md:mb-6">
						<h4 className="mb-3 break-words font-semibold text-gray-900 text-sm md:text-base">🎮 交互式演示</h4>
						<div className="space-y-4 md:space-y-6">{demoComponents}</div>
					</div>

					<div className="mb-6">
						<div className="mb-3 flex items-center justify-between">
							<h4 className="break-words font-semibold text-gray-900 text-sm md:text-base">📝 代码示例</h4>
							<button
								onClick={() => onCopyCode(example.codeSnippet)}
								className="flex items-center space-x-1 text-gray-600 text-sm hover:text-gray-900"
							>
								<Copy className="h-4 w-4" />
								<span className="whitespace-nowrap">{copiedCode ? "已复制" : "复制"}</span>
							</button>
						</div>
						<div className="overflow-x-auto rounded-lg bg-gray-900 p-3 text-gray-100 md:p-4">
							<pre className="min-w-max whitespace-pre-wrap break-all text-xs md:text-sm">
								<code>{example.codeSnippet}</code>
							</pre>
						</div>
					</div>

					{/* 主要优势和使用场景 */}
					<div className="grid gap-6 md:grid-cols-2">
						<div className="min-w-0">
							<h5 className="mb-3 font-medium text-gray-900 text-sm md:text-base">✨ 主要优势</h5>
							<div className="flex flex-wrap gap-2">
								{example.benefits.map((benefit, index) => (
									<span
										key={index}
										className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-green-700 text-xs md:text-sm break-words"
									>
										{benefit}
									</span>
								))}
							</div>
						</div>

						<div className="min-w-0">
							<h5 className="mb-3 font-medium text-gray-900 text-sm md:text-base">🎯 使用场景</h5>
							<div className="flex flex-wrap gap-2">
								{example.useCases.map((useCase, index) => (
									<span
										key={index}
										className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-blue-700 text-xs md:text-sm break-words"
									>
										{useCase}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* 解决的具体问题 */}
					<div className="border-gray-200 border-t pt-4 md:pt-6">
						<h5 className="mb-4 break-words font-medium text-gray-900 text-sm md:text-base">🔧 解决的具体问题</h5>
						<div className="space-y-4">
							{example.problemsSolved.map((item, index) => (
								<div key={index} className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-3 md:p-4">
									<div className="mb-2 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
										<div className="flex items-center space-x-2">
											<span className="inline-flex shrink-0 items-center rounded bg-red-100 px-2 py-1 font-medium text-red-700 text-xs">
												问题
											</span>
											<strong className="break-words text-red-800 text-sm md:text-base">{item.problem}</strong>
										</div>
									</div>
									<p className="mb-3 break-words text-gray-600 text-xs md:text-sm">{item.description}</p>
									<div className="rounded border border-green-200 bg-green-50 p-3">
										<div className="mb-1 flex flex-col items-start gap-2 sm:flex-row sm:items-center">
											<span className="inline-flex shrink-0 items-center rounded bg-green-100 px-2 py-1 font-medium text-green-700 text-xs">
												解决方案
											</span>
											<strong className="break-words text-green-800 text-sm md:text-base">React 19</strong>
										</div>
										<p className="break-words text-gray-700 text-xs md:text-sm">{item.solution}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{example.status === "completed" && (
					<div className="border-green-200 border-t bg-green-50 p-4 md:p-6">
						<div className="flex items-center space-x-2 text-green-800">
							<CheckCircle className="h-5 w-5 shrink-0" />
							<span className="break-words font-medium text-sm md:text-base">该 Hook 已在 React 19 中正式发布</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

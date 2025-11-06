"use client";

import { CheckCircle, Copy } from "lucide-react";
import type React from "react";
import type { ActionExample } from "../(types)";

type Example = Omit<ActionExample, "category" | "difficulty" | "id">;

interface ExampleDetailProps {
	example: Example;
	demoComponents: React.ReactNode[];
	onCopyCode: (code: string) => void;
	copiedCode: boolean;
}

export default function ExampleDetail({ example, demoComponents, onCopyCode, copiedCode }: ExampleDetailProps) {
	return (
		<div className="space-y-8">
			{/* 示例详细信息 */}
			<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
				<div className="border-gray-200 border-b p-6">
					<div className="flex items-center space-x-4">
						<div className="rounded-lg bg-blue-100 p-3 text-blue-600">{example.icon}</div>
						<div>
							<h3 className="font-semibold text-2xl text-gray-900">{example.title}</h3>
							<p className="text-gray-600">{example.description}</p>
						</div>
					</div>
				</div>

				<div className="p-6">
					<div className="mb-6">
						<h4 className="mb-3 font-semibold text-gray-900">🎮 交互式演示</h4>
						<div className="space-y-6">{demoComponents}</div>
					</div>

					<div className="mb-6">
						<div className="mb-3 flex items-center justify-between">
							<h4 className="font-semibold text-gray-900">📝 代码示例</h4>
							<button
								onClick={() => onCopyCode(example.codeSnippet)}
								className="flex items-center space-x-1 text-gray-600 text-sm hover:text-gray-900"
							>
								<Copy className="h-4 w-4" />
								<span>{copiedCode ? "已复制" : "复制"}</span>
							</button>
						</div>
						<div className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
							<pre className="text-sm">
								<code>{example.codeSnippet}</code>
							</pre>
						</div>
					</div>

					{/* 主要优势和使用场景 */}
					<div className="grid gap-6 md:grid-cols-2">
						<div>
							<h5 className="mb-3 font-medium text-gray-900">✨ 主要优势</h5>
							<div className="flex flex-wrap gap-2">
								{example.benefits.map((benefit, index) => (
									<span
										key={index}
										className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm"
									>
										{benefit}
									</span>
								))}
							</div>
						</div>

						<div>
							<h5 className="mb-3 font-medium text-gray-900">🎯 使用场景</h5>
							<div className="flex flex-wrap gap-2">
								{example.useCases.map((useCase, index) => (
									<span
										key={index}
										className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-blue-700 text-sm"
									>
										{useCase}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* 解决的具体问题 */}
					<div className="border-gray-200 border-t pt-6">
						<h5 className="mb-4 font-medium text-gray-900">🔧 解决的具体问题</h5>
						<div className="space-y-4">
							{example.problemsSolved.map((item, index) => (
								<div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
									<div className="mb-2 flex items-start justify-between">
										<div className="flex items-center space-x-2">
											<span className="inline-flex items-center rounded bg-red-100 px-2 py-1 font-medium text-red-700 text-xs">
												问题
											</span>
											<strong className="text-red-800">{item.problem}</strong>
										</div>
									</div>
									<p className="mb-3 text-gray-600 text-sm">{item.description}</p>
									<div className="rounded border border-green-200 bg-green-50 p-3">
										<div className="mb-1 flex items-center space-x-2">
											<span className="inline-flex items-center rounded bg-green-100 px-2 py-1 font-medium text-green-700 text-xs">
												解决方案
											</span>
											<strong className="text-green-800">React 19</strong>
										</div>
										<p className="text-gray-700 text-sm">{item.solution}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{example.status === "completed" && (
					<div className="border-green-200 border-t bg-green-50 p-6">
						<div className="flex items-center space-x-2 text-green-800">
							<CheckCircle className="h-5 w-5" />
							<span className="font-medium">该 Hook 已在 React 19 中正式发布</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

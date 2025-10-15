"use client";

import Layout from "@/components/Layout";
import BackButton from "@/components/BackButton";
import SimpleStreamChat from "./components/SimpleStreamChat";

export default function AIChatPage() {
	return (
		<Layout>
			<div className="container mx-auto px-4 py-6 h-screen">
				<div className="h-full flex flex-col">
					<div className="mb-4">
						<BackButton />
					</div>
					<div className="flex items-center justify-between mb-6">
						<h1 className="text-3xl font-bold">AI 对话</h1>
						<div className="text-sm text-gray-500">
							支持 Markdown • 代码高亮 • 流式输出 • 历史记录
						</div>
					</div>

					<div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
						<p className="text-sm text-blue-800">
							<strong>提示：</strong>试试输入"代码"、"表格"、"列表"来体验不同的 Markdown 渲染效果，支持流式输出显示。
						</p>
					</div>

					<div className="flex-1 min-h-0">
						<SimpleStreamChat />
					</div>
				</div>
			</div>
		</Layout>
	);
}
"use client";

import BackButton from "@/components/BackButton";
import Layout from "@/components/Layout";
import { FeatureContainer, FeatureContent } from "@/components/showcase";
import SimpleStreamChat from "./components/SimpleStreamChat";

export default function AIChatPage() {
	return (
		<Layout>
			<FeatureContainer>
				<FeatureContent>
					<div className="mb-4">
						<BackButton />
					</div>
					<div className="mb-4 flex flex-col gap-2 md:mb-6 md:flex-row md:items-center md:justify-between">
						<h1 className="font-bold text-responsive-2xl">AI 对话</h1>
						<div className="text-gray-500 text-xs md:text-sm">支持 Markdown • 代码高亮 • 流式输出 • 历史记录</div>
					</div>

					<div className="mb-3 rounded-md border border-blue-200 bg-blue-50 p-3 md:mb-4">
						<p className="text-blue-800 text-xs md:text-sm">
							<strong>提示：</strong>试试输入"代码"、"表格"、"列表"来体验不同的 Markdown 渲染效果，支持流式输出显示。
						</p>
					</div>

					<div className="min-h-0 flex-1">
						<SimpleStreamChat />
					</div>
				</FeatureContent>
			</FeatureContainer>
		</Layout>
	);
}

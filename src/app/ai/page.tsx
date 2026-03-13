"use client";

import Layout from "@/components/Layout";
import { FeatureCardGrid, FeatureContainer, FeatureContent, type FeatureGridCard } from "@/components/showcase";

const aiFeatures: FeatureGridCard[] = [
	{
		id: "chat",
		title: "🤖 AI 对话",
		description: "测试各种 AI 模型的对话能力，支持多轮对话、Markdown 渲染和代码高亮",
		icon: null,
		status: "completed",
		href: "/ai/chat",
	},
	{
		id: "image",
		title: "🎨 文生图",
		description: "使用 AI 生成图像，支持多种风格和参数调节",
		icon: null,
		status: "completed",
		href: "/ai/image",
	},
	{
		id: "voice",
		title: "🎤 语音处理",
		description: "语音转文字和文字转语音功能",
		icon: null,
		status: "completed",
		href: "/ai/voice",
	},
	{
		id: "video",
		title: "🎬 视频处理",
		description: "AI 视频生成和编辑功能",
		icon: null,
		status: "completed",
		href: "/ai/video",
	},
	{
		id: "tools",
		title: "🛠️ AI 工具集",
		description: "实用的 AI 工具，包括写作助手、翻译等",
		icon: null,
		status: "completed",
		href: "/ai/tools",
	},
	{
		id: "multimodal",
		title: "🔄 多模态",
		description: "跨模态 AI 交互和创作工具",
		icon: null,
		status: "completed",
		href: "/ai/multimodal",
	},
];

export default function AIPage() {
	return (
		<Layout>
			<FeatureContainer>
				<FeatureContent>
					<h1 className="mb-4 font-bold text-responsive-3xl md:mb-6">AI 能力测试</h1>
				</FeatureContent>

				<FeatureContent>
					<FeatureCardGrid cards={aiFeatures} />
				</FeatureContent>
			</FeatureContainer>
		</Layout>
	);
}

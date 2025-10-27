"use client";

import Layout from "@/components/Layout";

export default function AIPage() {
	return (
		<Layout>
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-6 font-bold text-4xl">AI 能力测试</h1>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
						<h2 className="mb-3 font-semibold text-2xl">🤖 AI 对话</h2>
						<p className="mb-4 text-gray-600">测试各种 AI 模型的对话能力，支持多轮对话、Markdown 渲染和代码高亮</p>
						<a
							href="/ai/chat"
							className="inline-block rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
						>
							开始对话
						</a>
					</div>

					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
						<h2 className="mb-3 font-semibold text-2xl">🎨 文生图</h2>
						<p className="mb-4 text-gray-600">使用 AI 生成图像，支持多种风格和参数调节</p>
						<a
							href="/ai/image"
							className="inline-block rounded bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600"
						>
							生成图像
						</a>
					</div>

					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
						<h2 className="mb-3 font-semibold text-2xl">🎤 语音处理</h2>
						<p className="mb-4 text-gray-600">语音转文字和文字转语音功能</p>
						<a
							href="/ai/voice"
							className="inline-block rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
						>
							语音功能
						</a>
					</div>

					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
						<h2 className="mb-3 font-semibold text-2xl">🎬 视频处理</h2>
						<p className="mb-4 text-gray-600">AI 视频生成和编辑功能</p>
						<a
							href="/ai/video"
							className="inline-block rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
						>
							视频功能
						</a>
					</div>

					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
						<h2 className="mb-3 font-semibold text-2xl">🛠️ AI 工具集</h2>
						<p className="mb-4 text-gray-600">实用的 AI 工具，包括写作助手、翻译等</p>
						<a
							href="/ai/tools"
							className="inline-block rounded bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
						>
							AI 工具
						</a>
					</div>

					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
						<h2 className="mb-3 font-semibold text-2xl">🔄 多模态</h2>
						<p className="mb-4 text-gray-600">跨模态 AI 交互和创作工具</p>
						<a
							href="/ai/multimodal"
							className="inline-block rounded bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
						>
							多模态
						</a>
					</div>
				</div>
			</div>
		</Layout>
	);
}

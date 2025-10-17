"use client";

import Layout from "@/components/Layout";

export default function AIPage() {
	return (
		<Layout>
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-4xl font-bold mb-6">AI 能力测试</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
						<h2 className="text-2xl font-semibold mb-3">🤖 AI 对话</h2>
						<p className="text-gray-600 mb-4">
							测试各种 AI 模型的对话能力，支持多轮对话、Markdown 渲染和代码高亮
						</p>
						<a
							href="/ai/chat"
							className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
						>
							开始对话
						</a>
					</div>

					<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
						<h2 className="text-2xl font-semibold mb-3">🎨 文生图</h2>
						<p className="text-gray-600 mb-4">
							使用 AI 生成图像，支持多种风格和参数调节
						</p>
						<a
							href="/ai/image"
							className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
						>
							生成图像
						</a>
					</div>

					<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
						<h2 className="text-2xl font-semibold mb-3">🎤 语音处理</h2>
						<p className="text-gray-600 mb-4">语音转文字和文字转语音功能</p>
						<a
							href="/ai/voice"
							className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
						>
							语音功能
						</a>
					</div>

					<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
						<h2 className="text-2xl font-semibold mb-3">🎬 视频处理</h2>
						<p className="text-gray-600 mb-4">AI 视频生成和编辑功能</p>
						<a
							href="/ai/video"
							className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
						>
							视频功能
						</a>
					</div>

					<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
						<h2 className="text-2xl font-semibold mb-3">🛠️ AI 工具集</h2>
						<p className="text-gray-600 mb-4">
							实用的 AI 工具，包括写作助手、翻译等
						</p>
						<a
							href="/ai/tools"
							className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
						>
							AI 工具
						</a>
					</div>

					<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
						<h2 className="text-2xl font-semibold mb-3">🔄 多模态</h2>
						<p className="text-gray-600 mb-4">跨模态 AI 交互和创作工具</p>
						<a
							href="/ai/multimodal"
							className="inline-block bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
						>
							多模态
						</a>
					</div>
				</div>
			</div>
		</Layout>
	);
}

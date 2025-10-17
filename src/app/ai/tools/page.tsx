"use client";

import Layout from "@/components/Layout";
import BackButton from "@/components/BackButton";

export default function AIToolsPage() {
	return (
		<Layout>
			<div className="container mx-auto px-4 py-8">
				<div className="mb-6">
					<BackButton />
				</div>
				<h1 className="text-4xl font-bold mb-6">AI 工具集</h1>
				<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
					<p className="text-gray-600 mb-4">AI 工具集功能正在开发中...</p>
					<div className="bg-gray-100 rounded p-4">
						<p className="text-sm text-gray-500">
							即将支持：写作助手、翻译、代码生成等实用工具
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}

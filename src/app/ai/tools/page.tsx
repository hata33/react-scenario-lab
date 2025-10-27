"use client";

import BackButton from "@/components/BackButton";
import Layout from "@/components/Layout";

export default function AIToolsPage() {
	return (
		<Layout>
			<div className="container mx-auto px-4 py-8">
				<div className="mb-6">
					<BackButton />
				</div>
				<h1 className="mb-6 font-bold text-4xl">AI 工具集</h1>
				<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
					<p className="mb-4 text-gray-600">AI 工具集功能正在开发中...</p>
					<div className="rounded bg-gray-100 p-4">
						<p className="text-gray-500 text-sm">即将支持：写作助手、翻译、代码生成等实用工具</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}

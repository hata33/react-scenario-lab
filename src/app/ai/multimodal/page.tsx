"use client";

import BackButton from "@/components/BackButton";
import Layout from "@/components/Layout";

export default function AIMultimodalPage() {
	return (
		<Layout>
			<div className="container mx-auto px-4 py-8">
				<div className="mb-6">
					<BackButton />
				</div>
				<h1 className="mb-6 font-bold text-4xl">AI 多模态</h1>
				<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
					<p className="mb-4 text-gray-600">AI 多模态功能正在开发中...</p>
					<div className="rounded bg-gray-100 p-4">
						<p className="text-gray-500 text-sm">即将支持：跨模态交互、多模态创作等功能</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}

"use client";

import Layout from "@/components/Layout";
import BackButton from "@/components/BackButton";

export default function AIVoicePage() {
	return (
		<Layout>
			<div className="container mx-auto px-4 py-8">
				<div className="mb-6">
					<BackButton />
				</div>
				<h1 className="text-4xl font-bold mb-6">AI 语音处理</h1>
				<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
					<p className="text-gray-600 mb-4">AI 语音处理功能正在开发中...</p>
					<div className="bg-gray-100 rounded p-4">
						<p className="text-sm text-gray-500">
							即将支持：语音转文字、文字转语音等功能
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}

"use client";

import BackButton from "@/components/BackButton";
import Layout from "@/components/Layout";
import { FeatureContainer, FeatureContent } from "@/components/showcase";

export default function AIToolsPage() {
	return (
		<Layout>
			<FeatureContainer>
				<FeatureContent>
					<div className="mb-4 md:mb-6">
						<BackButton />
					</div>
					<h1 className="mb-6 font-bold text-responsive-3xl">AI 工具集</h1>
					<div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-md">
						<p className="mb-4 text-gray-600 text-sm md:text-base">AI 工具集功能正在开发中...</p>
						<div className="rounded bg-gray-100 p-3 md:p-4">
							<p className="text-gray-500 text-xs md:text-sm">即将支持：写作助手、翻译、代码生成等实用工具</p>
						</div>
					</div>
				</FeatureContent>
			</FeatureContainer>
		</Layout>
	);
}

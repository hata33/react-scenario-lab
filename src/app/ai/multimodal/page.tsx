"use client";

import BackButton from "@/components/BackButton";
import Layout from "@/components/Layout";
import { FeatureContainer, FeatureContent } from "@/components/showcase";

export default function AIMultimodalPage() {
	return (
		<Layout>
			<FeatureContainer>
				<FeatureContent>
					<div className="mb-4 md:mb-6">
						<BackButton />
					</div>
					<h1 className="mb-6 font-bold text-responsive-3xl">AI 多模态</h1>
					<div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-md">
						<p className="mb-4 text-gray-600 text-sm md:text-base">AI 多模态功能正在开发中...</p>
						<div className="rounded bg-gray-100 p-3 md:p-4">
							<p className="text-gray-500 text-xs md:text-sm">即将支持：跨模态交互、多模态创作等功能</p>
						</div>
					</div>
				</FeatureContent>
			</FeatureContainer>
		</Layout>
	);
}

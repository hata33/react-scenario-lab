"use client";

import BackButton from "@/components/BackButton";
import Layout from "@/components/Layout";
import { FeatureContainer, FeatureContent } from "@/components/showcase";

export default function AIVideoPage() {
	return (
		<Layout>
			<FeatureContainer>
				<FeatureContent>
					<div className="mb-4 md:mb-6">
						<BackButton />
					</div>
					<h1 className="mb-6 font-bold text-responsive-3xl">AI 视频处理</h1>
					<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md md:p-6">
						<p className="mb-4 text-gray-600 text-sm md:text-base">AI 视频处理功能正在开发中...</p>
						<div className="rounded bg-gray-100 p-3 md:p-4">
							<p className="text-gray-500 text-xs md:text-sm">即将支持：视频生成、智能剪辑、字幕生成等功能</p>
						</div>
					</div>
				</FeatureContent>
			</FeatureContainer>
		</Layout>
	);
}

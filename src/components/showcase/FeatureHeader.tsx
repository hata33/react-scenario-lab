"use client";

import type React from "react";

interface FeatureHeaderProps {
	icon: React.ReactNode;
	title: string;
	subtitle: string;
}

/**
 * 页面头部内容块
 * 包含图标、标题和副标题
 * 无外层容器，直接使用 FeatureContent 包裹
 */
export default function FeatureHeader({ icon, title, subtitle }: FeatureHeaderProps) {
	return (
		<div className="bg-white shadow-sm">
			<div className="flex items-center space-x-4 px-3 py-4 sm:px-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
				<div className="flex items-center space-x-3">
					<div className="shrink-0">{icon}</div>
					<div className="min-w-0 flex-1">
						<h1 className="break-words font-bold text-gray-900 text-responsive-2xl">{title}</h1>
						<p className="break-words text-gray-600 text-sm md:text-base">{subtitle}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

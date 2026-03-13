"use client";

import type React from "react";

export interface FeatureCard {
	icon: React.ReactNode;
	title: string;
	description: string;
	bgColor: string;
	iconColor: string;
	titleColor: string;
	descriptionColor: string;
}

interface FeatureOverviewProps {
	title: string;
	features: FeatureCard[];
}

/**
 * 特性概览内容块
 * 展示一组特性卡片网格
 * 无外层容器，直接使用 FeatureContent 包裹
 */
export default function FeatureOverview({ title, features }: FeatureOverviewProps) {
	return (
		<div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
			<h2 className="mb-4 md:mb-6 font-semibold text-gray-900 text-xl md:text-2xl">{title}</h2>
			<div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-4">
				{features.map((feature, index) => (
					<div key={index} className={`rounded-lg ${feature.bgColor} p-3 md:p-4 text-center`}>
						<div className={`mx-auto mb-2 h-5 w-5 md:h-6 md:w-6 ${feature.iconColor}`}>{feature.icon}</div>
						<h3 className={`mb-1 text-sm font-semibold md:text-base ${feature.titleColor}`}>{feature.title}</h3>
						<p className={`${feature.descriptionColor} text-xs md:text-sm`}>{feature.description}</p>
					</div>
				))}
			</div>
		</div>
	);
}

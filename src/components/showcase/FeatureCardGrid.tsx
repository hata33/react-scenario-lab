"use client";

import type React from "react";

export interface FeatureGridCard {
	id: string;
	title: string;
	description: string;
	icon: React.ReactNode;
	status?: "completed" | "in-progress" | "planned";
	category?: string;
	examples?: string[];
	href?: string;
}

interface FeatureCardGridProps {
	cards: FeatureGridCard[];
	onCardClick?: (cardId: string) => void;
	getStatusColor?: (status: FeatureGridCard["status"]) => string;
	getStatusText?: (status: FeatureGridCard["status"]) => string;
}

/**
 * 特性卡片网格内容块
 * 展示多个特性卡片，用于首页导航
 * 无外层容器，直接使用 FeatureContent 包裹
 */
export default function FeatureCardGrid({ cards, onCardClick, getStatusColor, getStatusText }: FeatureCardGridProps) {
	const defaultStatusColor = (status: FeatureGridCard["status"] = "completed") => {
		switch (status) {
			case "completed":
				return "text-green-600 bg-green-100";
			case "in-progress":
				return "text-blue-600 bg-blue-100";
			case "planned":
				return "text-gray-600 bg-gray-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const defaultStatusText = (status: FeatureGridCard["status"] = "completed") => {
		switch (status) {
			case "completed":
				return "已完成";
			case "in-progress":
				return "进行中";
			case "planned":
				return "计划中";
			default:
				return "未知";
		}
	};

	const statusColor = getStatusColor || defaultStatusColor;
	const statusText = getStatusText || defaultStatusText;

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{cards.map((card) => (
				<div
					key={card.id}
					className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md active:scale-[0.99]"
					onClick={() => onCardClick?.(card.id)}
				>
					<div className="p-6">
						<div className="mb-4 flex items-start justify-between">
							<div className="flex items-center space-x-3">
								<div className="shrink-0 text-blue-600">{card.icon}</div>
								<div className="min-w-0 flex-1">
									<h3 className="break-words font-semibold text-base text-gray-900 md:text-lg">{card.title}</h3>
									{card.status && (
										<span
											className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${statusColor(card.status)}`}
										>
											{statusText(card.status)}
										</span>
									)}
								</div>
							</div>
						</div>

						<p className="mb-4 break-words text-gray-600 text-sm md:text-base">{card.description}</p>

						{card.category && (
							<div className="mb-4">
								<span className="mb-2 block break-words text-gray-500 text-sm">分类: {card.category}</span>
							</div>
						)}

						{card.examples && card.examples.length > 0 && (
							<div className="space-y-2">
								<h4 className="font-medium text-gray-700 text-sm">包含示例:</h4>
								<div className="flex flex-wrap gap-1">
									{card.examples.map((example, index) => (
										<span
											key={index}
											className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-gray-700 text-xs"
										>
											{example}
										</span>
									))}
								</div>
							</div>
						)}

						{card.href && (
							<div className="mt-6">
								<a
									href={card.href}
									className="flex min-h-[44px] items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-all hover:bg-blue-700 active:scale-95"
								>
									查看详情
								</a>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

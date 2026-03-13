"use client";

export interface StatsItem {
	label: string;
	value: number;
	color?: string;
}

interface StatsSectionProps {
	title: string;
	stats: StatsItem[];
}

/**
 * 统计信息内容块
 * 展示统计数据卡片
 * 无外层容器，直接使用 FeatureContent 包裹
 */
export default function StatsSection({ title, stats }: StatsSectionProps) {
	return (
		<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<h2 className="mb-4 font-semibold text-gray-900 text-xl">{title}</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
				{stats.map((stat, index) => (
					<div key={index} className="text-center">
						<div className={`font-bold text-3xl ${stat.color || "text-blue-600"}`}>{stat.value}</div>
						<div className="text-gray-600 text-sm">{stat.label}</div>
					</div>
				))}
			</div>
		</div>
	);
}

"use client";

export interface WSection {
	description: string;
	features: string[];
}

interface FeatureThreeWRuleProps {
	title: string;
	sections: WSection[];
}

const sectionConfigs = [
	{
		title: "What (是什么)",
		buttonBgColor: "bg-blue-600",
		borderColor: "border-blue-200",
		titleColor: "text-blue-800",
		descriptionColor: "text-blue-700",
		featureTitleColor: "text-blue-800",
		featureListColor: "text-blue-700",
	},
	{
		title: "Why (为什么)",
		buttonBgColor: "bg-green-600",
		borderColor: "border-green-200",
		titleColor: "text-green-800",
		descriptionColor: "text-green-700",
		featureTitleColor: "text-green-800",
		featureListColor: "text-green-700",
	},
	{
		title: "When (何时用)",
		buttonBgColor: "bg-purple-600",
		borderColor: "border-purple-200",
		titleColor: "text-purple-800",
		descriptionColor: "text-purple-700",
		featureTitleColor: "text-purple-800",
		featureListColor: "text-purple-700",
	},
];

/**
 * 3W 法则内容块
 * 展示 What/Why/When 三个维度
 * 无外层容器，直接使用 FeatureContent 包裹
 */
export default function FeatureThreeWRule({ title, sections }: FeatureThreeWRuleProps) {
	return (
		<div className="rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-sm md:p-6">
			<h2 className="mb-4 break-words font-bold text-blue-800 text-xl md:mb-6 md:text-2xl">{title}</h2>
			<div className="grid gap-4 md:grid-cols-3 md:gap-6">
				{sections.map((section, index) => {
					const config = sectionConfigs[index];
					return (
						<div key={index} className={`rounded-lg border ${config.borderColor} bg-white p-3 shadow-sm md:p-4`}>
							<div className="mb-2 flex items-center gap-2 md:mb-3">
								<div
									className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full md:h-8 md:w-8 ${config.buttonBgColor} font-bold text-sm text-white`}
								>
									W
								</div>
								<h3 className={`font-semibold text-sm md:text-base ${config.titleColor}`}>{config.title}</h3>
							</div>
							<p className={`${config.descriptionColor} mb-2 break-words text-sm leading-relaxed md:mb-3`}>
								{section.description}
							</p>
							<div className={`rounded border ${config.borderColor} bg-white p-2 md:p-3`}>
								<h4 className={`mb-1 break-words font-medium text-xs md:mb-2 md:text-sm ${config.featureTitleColor}`}>
									核心特性
								</h4>
								<ul className={`space-y-0.5 md:space-y-1 ${config.featureListColor} text-xs md:text-sm`}>
									{section.features.map((feature, featureIndex) => (
										<li key={featureIndex} className="break-words">
											• {feature}
										</li>
									))}
								</ul>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

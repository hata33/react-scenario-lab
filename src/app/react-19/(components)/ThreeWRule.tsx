"use client";

import React from "react";
import type { WSection } from "../(types)";

interface ThreeWRuleProps {
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

export default function ThreeWRule({ title, sections }: ThreeWRuleProps) {
	return (
		<div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
			<div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
				<h2 className="mb-6 font-bold text-2xl text-blue-800">{title}</h2>
				<div className="grid gap-6 md:grid-cols-3">
					{sections.map((section, index) => {
						const config = sectionConfigs[index];
						return (
							<div key={index} className={`rounded-lg border ${config.borderColor} bg-white p-4 shadow-sm`}>
								<div className="mb-3 flex items-center gap-2">
									<div
										className={`flex h-8 w-8 items-center justify-center rounded-full ${config.buttonBgColor} font-bold text-white`}
									>
										W
									</div>
									<h3 className={`font-semibold ${config.titleColor}`}>{config.title}</h3>
								</div>
								<p className={`${config.descriptionColor} mb-3 leading-relaxed`}>{section.description}</p>
								<div className={`rounded border ${config.borderColor} bg-white p-3`}>
									<h4 className={`mb-2 font-medium ${config.featureTitleColor}`}>核心特性</h4>
									<ul className={`space-y-1 ${config.featureListColor} text-sm`}>
										{section.features.map((feature, featureIndex) => (
											<li key={featureIndex}>• {feature}</li>
										))}
									</ul>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

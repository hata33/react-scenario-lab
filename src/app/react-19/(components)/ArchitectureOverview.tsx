"use client";

import React from "react";
import type { FeatureCard } from "../(types)";

interface ArchitectureOverviewProps {
	title: string;
	features: FeatureCard[];
}

export default function ArchitectureOverview({ title, features }: ArchitectureOverviewProps) {
	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<h2 className="mb-6 font-semibold text-gray-900 text-xl">{title}</h2>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
					{features.map((feature, index) => (
						<div key={index} className={`rounded-lg ${feature.bgColor} p-4 text-center`}>
							<div className={`mx-auto mb-2 h-6 w-6 ${feature.iconColor}`}>{feature.icon}</div>
							<h3 className={`mb-1 font-semibold ${feature.titleColor}`}>{feature.title}</h3>
							<p className={`${feature.descriptionColor} text-sm`}>{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

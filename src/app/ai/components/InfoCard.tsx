"use client";

interface InfoCardProps {
	title: string;
	description: string;
	status?: "coming-soon" | "in-development" | "available";
	className?: string;
}

export default function InfoCard({ title, description, status = "coming-soon", className = "" }: InfoCardProps) {
	const statusConfig = {
		"coming-soon": {
			color: "bg-gray-100 text-gray-800",
			text: "即将推出",
		},
		"in-development": {
			color: "bg-blue-100 text-blue-800",
			text: "开发中",
		},
		available: {
			color: "bg-green-100 text-green-800",
			text: "可用",
		},
	};

	return (
		<div
			className={`rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg ${className}`}
		>
			<div className="mb-3 flex items-start justify-between">
				<h3 className="font-semibold text-lg">{title}</h3>
				<span className={`rounded-full px-2 py-1 font-medium text-xs ${statusConfig[status].color}`}>
					{statusConfig[status].text}
				</span>
			</div>
			<p className="text-gray-600 text-sm">{description}</p>
		</div>
	);
}

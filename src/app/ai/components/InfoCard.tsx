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
		"available": {
			color: "bg-green-100 text-green-800",
			text: "可用",
		},
	};

	return (
		<div className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow ${className}`}>
			<div className="flex items-start justify-between mb-3">
				<h3 className="text-lg font-semibold">{title}</h3>
				<span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig[status].color}`}>
					{statusConfig[status].text}
				</span>
			</div>
			<p className="text-gray-600 text-sm">{description}</p>
		</div>
	);
}
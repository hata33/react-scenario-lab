"use client";

import type React from "react";

interface HeaderProps {
	icon: React.ReactNode;
	title: string;
	subtitle: string;
}

export default function Header({ icon, title, subtitle }: HeaderProps) {
	return (
		<div className="bg-white shadow-sm">
			<div className="flex items-center space-x-4 px-3 py-4 sm:px-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
				<div className="flex items-center space-x-3">
					{icon}
					<div>
						<h1 className="font-bold text-3xl text-gray-900">{title}</h1>
						<p className="text-gray-600">{subtitle}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

"use client";

import { LucideIcon } from "lucide-react";
import type React from "react";

interface HeaderProps {
	icon: React.ReactNode;
	title: string;
	subtitle: string;
}

export default function Header({ icon, title, subtitle }: HeaderProps) {
	return (
		<div className="bg-white shadow-sm">
			<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-3">
						{icon}
						<div>
							<h1 className="font-bold text-3xl text-gray-900">{title}</h1>
							<p className="text-gray-600">{subtitle}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

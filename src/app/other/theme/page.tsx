"use client";

import Layout from "@/components/Layout";
import ThemeToggle from "@/pages/Other/ThemeToggle";

export default function ThemeTogglePage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">主题切换</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<ThemeToggle />
				</div>
			</div>
		</Layout>
	);
}

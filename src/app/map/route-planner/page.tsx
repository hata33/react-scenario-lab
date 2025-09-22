"use client";

import Layout from "@/components/Layout";
import RoutePlanner from "@/components/pages/Map/RoutePlanner";

export default function RoutePlannerPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">路径规划</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<RoutePlanner />
				</div>
			</div>
		</Layout>
	);
}

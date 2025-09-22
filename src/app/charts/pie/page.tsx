"use client";

import Layout from "@/components/Layout";
import PieChart from "@/components/pages/Charts/PieChart";

export default function PieChartPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">饼图</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<PieChart />
				</div>
			</div>
		</Layout>
	);
}

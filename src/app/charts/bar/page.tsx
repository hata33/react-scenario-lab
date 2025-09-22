"use client";

import Layout from "@/components/Layout";
import BarChart from "@/components/pages/Charts/BarChart";

export default function BarChartPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">柱状图</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<BarChart />
				</div>
			</div>
		</Layout>
	);
}

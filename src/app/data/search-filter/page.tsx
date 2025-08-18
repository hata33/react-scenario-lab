"use client";

import Layout from "@/components/Layout";
import SearchFilter from "@/pages/Data/SearchFilter";

export default function SearchFilterPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">搜索/筛选</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<SearchFilter />
				</div>
			</div>
		</Layout>
	);
}

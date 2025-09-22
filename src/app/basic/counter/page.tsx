"use client";

import Layout from "@/components/Layout";
import Counter from "@/components/pages/Basic/Counter";

export default function CounterPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">
					Counter 计数器
				</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<Counter />
				</div>
			</div>
		</Layout>
	);
}

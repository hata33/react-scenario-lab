"use client";

import Layout from "@/components/Layout";
import PageTransition from "@/pages/Animation/PageTransition";

export default function PageTransitionPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">页面过渡</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<PageTransition />
				</div>
			</div>
		</Layout>
	);
}

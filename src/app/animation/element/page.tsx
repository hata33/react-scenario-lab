"use client";

import Layout from "@/components/Layout";
import ElementAnimation from "@/pages/Animation/ElementAnimation";

export default function ElementAnimationPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">元素动画</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<ElementAnimation />
				</div>
			</div>
		</Layout>
	);
}

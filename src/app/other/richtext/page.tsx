"use client";

import Layout from "@/components/Layout";
import RichText from "@/components/pages/Other/RichText";

export default function RichTextPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">富文本</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<RichText />
				</div>
			</div>
		</Layout>
	);
}

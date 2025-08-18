"use client";

import Layout from "@/components/Layout";
import DragDrop from "@/pages/Animation/DragDrop";

export default function DragDropPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">拖拽</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<DragDrop />
				</div>
			</div>
		</Layout>
	);
}

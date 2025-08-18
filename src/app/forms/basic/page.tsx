"use client";

import Layout from "@/components/Layout";
import BasicForm from "@/pages/Forms/BasicForm";

export default function BasicFormPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">基础表单</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<BasicForm />
				</div>
			</div>
		</Layout>
	);
}

"use client";

import Layout from "@/components/Layout";
import StepForm from "@/components/pages/Forms/StepForm";

export default function StepFormPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">分步表单</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<StepForm />
				</div>
			</div>
		</Layout>
	);
}

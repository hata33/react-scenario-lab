"use client";

import Layout from "@/components/Layout";
import FormValidation from "@/components/pages/Forms/FormValidation";

export default function FormValidationPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">表单校验</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<FormValidation />
				</div>
			</div>
		</Layout>
	);
}

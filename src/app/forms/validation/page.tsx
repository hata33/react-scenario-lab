"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Layout from "@/components/Layout";
import FormValidation from "@/components/pages/Forms/FormValidation";

export default function FormValidationPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<div className="mb-6">
					<Link
						href="/forms"
						className="mb-4 inline-block flex items-center text-gray-600 transition-colors hover:text-gray-900"
					>
						<ArrowLeft className="mr-2 h-5 w-5" />
						返回表单列表
					</Link>
					<h1 className="font-bold text-3xl text-gray-900">表单校验</h1>
				</div>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<FormValidation />
				</div>
			</div>
		</Layout>
	);
}

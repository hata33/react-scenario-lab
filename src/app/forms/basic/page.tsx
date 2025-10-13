"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import BasicForm from "@/components/pages/Forms/BasicForm";

export default function BasicFormPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<div className="mb-6">
					<Link
						href="/forms"
						className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4 inline-block"
					>
						<ArrowLeft className="w-5 h-5 mr-2" />
						返回表单列表
					</Link>
					<h1 className="font-bold text-3xl text-gray-900">基础表单</h1>
				</div>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<BasicForm />
				</div>
			</div>
		</Layout>
	);
}

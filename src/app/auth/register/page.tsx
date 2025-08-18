"use client";

import Layout from "@/components/Layout";
import Register from "@/pages/Auth/Register";

export default function RegisterPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">注册</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<Register />
				</div>
			</div>
		</Layout>
	);
}

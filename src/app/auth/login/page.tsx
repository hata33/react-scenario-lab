"use client";

import Layout from "@/components/Layout";
import Login from "@/components/pages/Auth/Login";

export default function LoginPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">登录</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<Login />
				</div>
			</div>
		</Layout>
	);
}

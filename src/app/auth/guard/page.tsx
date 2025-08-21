"use client";

import Layout from "@/components/Layout";
import RouteGuard from "@/components/pages/Auth/RouteGuard";

export default function RouteGuardPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">路由守卫</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<RouteGuard />
				</div>
			</div>
		</Layout>
	);
}

"use client";

import Layout from "@/components/Layout";
import Notifications from "@/pages/Other/Notifications";

export default function NotificationsPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">通知</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<Notifications />
				</div>
			</div>
		</Layout>
	);
}

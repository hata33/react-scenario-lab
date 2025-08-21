"use client";

import Layout from "@/components/Layout";
import Payment from "@/components/pages/Other/Payment";

export default function PaymentPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">支付</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<Payment />
				</div>
			</div>
		</Layout>
	);
}

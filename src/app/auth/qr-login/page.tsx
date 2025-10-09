"use client";

import QRCodeLogin from "@/components/auth/QRCodeLogin";
import Layout from "@/components/Layout";

export default function QRCodeLoginPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-md">
				<h1 className="mb-6 text-center font-bold text-3xl text-gray-900">
					扫码登录
				</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<div className="mb-4">
						<p className="text-center text-gray-600">
							使用手机扫描二维码，快速安全登录
						</p>
					</div>
					<QRCodeLogin />
				</div>
			</div>
		</Layout>
	);
}

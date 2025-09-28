"use client";

import Layout from "@/components/Layout";
import QRCodeLogin from "@/components/auth/QRCodeLogin";

export default function QRCodeLoginPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-md">
				<h1 className="mb-6 font-bold text-3xl text-gray-900 text-center">扫码登录</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<div className="mb-4">
						<p className="text-gray-600 text-center">
							使用手机扫描二维码，快速安全登录
						</p>
					</div>
					<QRCodeLogin />
				</div>
			</div>
		</Layout>
	);
}
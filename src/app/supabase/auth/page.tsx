"use client";

import Layout from "@/components/Layout";

export default function AuthPage() {
	// 最简单的页面，直接显示跳转按钮
	return (
		<Layout>
			<div className="min-h-screen bg-gray-50 py-12">
				<div className="mx-auto max-w-md text-center">
					<div className="mb-4">
						<div className="inline-block flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
							<svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
						</div>
					</div>
					<h1 className="mb-2 font-bold text-3xl text-gray-900">欢迎回来！</h1>
					<p className="mb-6 text-gray-600"> </p>
					<button
						onClick={() => {
							console.log("跳转到 Todo 页面");
							window.location.href = "/supabase/todo";
						}}
						className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
					>
						进入 Todo 管理
					</button>
				</div>
			</div>
		</Layout>
	);
}

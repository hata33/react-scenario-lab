"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase-client";

export default function AuthCallbackPage() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const handleAuthCallback = async () => {
			try {
				// 获取 URL 参数
				const urlParams = new URLSearchParams(window.location.search);
				const code = urlParams.get("code");
				const error = urlParams.get("error");
				const errorDescription = urlParams.get("error_description");

				if (error) {
					setError(errorDescription || error);
					setLoading(false);
					setTimeout(() => {
						router.push("/supabase/auth");
					}, 3000);
					return;
				}

				if (code) {
					// 交换 code 获取 session
					const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

					if (exchangeError) {
						setError(exchangeError.message);
						setLoading(false);
						setTimeout(() => {
							router.push("/supabase/auth");
						}, 3000);
						return;
					}

					if (data.session) {
						// 成功认证，重定向到 todo 页面
						setTimeout(() => {
							router.push("/supabase/todo");
						}, 1500);
					} else {
						// 没有会话，重定向到登录页面
						setTimeout(() => {
							router.push("/supabase/auth");
						}, 1500);
					}
				} else {
					// 没有 code 参数，检查当前会话
					const { data, error } = await supabase.auth.getSession();

					if (error) {
						setError(error.message);
						setLoading(false);
						return;
					}

					if (data.session) {
						// 已有会话，重定向到 todo 页面
						setTimeout(() => {
							router.push("/supabase/todo");
						}, 1500);
					} else {
						// 没有会话，重定向到登录页面
						setTimeout(() => {
							router.push("/supabase/auth");
						}, 1500);
					}
				}
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		handleAuthCallback();
	}, [router]);

	return (
		<Layout>
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					{loading ? (
						<div>
							<div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-blue-500 border-b-2"></div>
							<p className="text-gray-600">正在验证您的身份...</p>
						</div>
					) : error ? (
						<div>
							<div className="mb-4 text-red-600">
								<svg className="mx-auto mb-4 h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<p className="font-medium text-lg">认证失败</p>
								<p className="mt-2 text-sm">{error}</p>
							</div>
							<button
								onClick={() => router.push("/supabase/auth")}
								className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
							>
								重新登录
							</button>
						</div>
					) : (
						<div>
							<div className="mb-4 text-green-600">
								<svg className="mx-auto mb-4 h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								<p className="font-medium text-lg">认证成功</p>
								<p className="mt-2 text-sm">正在跳转到应用...</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
}

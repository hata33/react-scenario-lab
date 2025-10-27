"use client";

import { useEffect, useState } from "react";
import AuthButton from "@/components/auth/AuthButton";
import Layout from "@/components/Layout";
import TodoList from "@/components/todos/TodoList";
import { supabase } from "@/lib/supabase-client";

export default function TodoPage() {
	const [session, setSession] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log("TodoPage mounted");
		// 检查用户的登录状态
		const checkSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);
			setLoading(false);
		};

		checkSession();
	}, []);

	if (loading) {
		return (
			<Layout>
				<div className="flex min-h-screen items-center justify-center">
					<div className="text-center">
						<div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-blue-500 border-b-2"></div>
						<p className="text-gray-600">检查认证状态...</p>
					</div>
				</div>
			</Layout>
		);
	}

	// 如果未登录，显示登录提示
	if (!session) {
		return (
			<Layout>
				<div className="min-h-screen bg-gray-50 py-12">
					<div className="mx-auto max-w-md">
						<div className="text-center">
							<div className="mb-8">
								<div className="mb-4 inline-block flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
									<svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								</div>
								<h1 className="mb-2 font-bold text-3xl text-gray-900">需要登录</h1>
								<p className="mb-6 text-gray-600">请先登录以访问 Todo 管理功能</p>
								<a
									href="/supabase/auth"
									className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
								>
									前往登录
								</a>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}

	// 已登录，显示 Todo 管理界面
	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				<div className="mx-auto max-w-6xl py-8">
					<div className="mb-8 flex items-center justify-between">
						<div>
							<h1 className="font-bold text-3xl text-gray-900">我的待办事项</h1>
							<p className="mt-1 text-gray-600">欢迎回来，{session.user.email}</p>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-gray-500 text-sm">
								登录时间: {new Date(session.last_sign_in_at).toLocaleString("zh-CN")}
							</span>
							<AuthButton />
						</div>
					</div>

					<TodoList />
				</div>
			</div>
		</Layout>
	);
}

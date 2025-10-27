"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase-client";

export default function TestPage() {
	const [status, setStatus] = useState("加载中...");
	const [session, setSession] = useState<any>(null);

	useEffect(() => {
		console.log("测试页面：开始检查 Supabase 连接...");

		const testSupabaseConnection = async () => {
			try {
				// 测试基本的连接
				console.log("测试页面：正在获取会话...");
				const {
					data: { session },
					error,
				} = await supabase.auth.getSession();

				if (error) {
					console.error("测试页面：获取会话失败", error);
					setStatus(`错误: ${error.message}`);
					return;
				}

				console.log("测试页面：会话获取成功", session);
				setSession(session);
				setStatus(session ? "已登录" : "未登录");

				// 测试数据库连接（如果需要）
				if (session) {
					console.log("测试页面：用户已登录，ID:", session.user.id);
				}
			} catch (err) {
				console.error("测试页面：测试连接时发生错误", err);
				setStatus(`连接错误: ${err instanceof Error ? err.message : "未知错误"}`);
			}
		};

		testSupabaseConnection();
	}, []);

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50 py-12">
				<div className="mx-auto max-w-md">
					<h1 className="mb-6 font-bold text-3xl text-gray-900">Supabase 连接测试</h1>

					<div className="space-y-4 rounded-lg bg-white p-6 shadow-md">
						<div>
							<h3 className="font-medium text-gray-500 text-sm">连接状态</h3>
							<p className="font-semibold text-lg">{status}</p>
						</div>

						{session && (
							<div>
								<h3 className="font-medium text-gray-500 text-sm">用户信息</h3>
								<p className="text-sm">邮箱: {session.user.email}</p>
								<p className="text-sm">ID: {session.user.id}</p>
							</div>
						)}

						<div className="pt-4">
							<button
								onClick={() => {
									// 清除重定向标记
									sessionStorage.removeItem("authRedirected");
									sessionStorage.removeItem("todoRedirected");
									window.location.href = "/supabase/auth";
								}}
								className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
							>
								去认证页面
							</button>
							<button
								onClick={() => {
									// 清除重定向标记
									sessionStorage.removeItem("authRedirected");
									sessionStorage.removeItem("todoRedirected");
									window.location.href = "/supabase/todo";
								}}
								className="mr-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
							>
								去 Todo 页面
							</button>
							<button
								onClick={() => {
									// 重置所有标记
									sessionStorage.removeItem("authRedirected");
									sessionStorage.removeItem("todoRedirected");
									window.location.reload();
								}}
								className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
							>
								重置状态
							</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

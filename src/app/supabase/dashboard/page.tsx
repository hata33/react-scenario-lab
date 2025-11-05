"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthButton from "@/components/auth/AuthButton";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase-client";
import type { Todo } from "@/types/todo";

export default function DashboardPage() {
	const [session, setSession] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [todos, setTodos] = useState<Todo[]>([]);
	const [statsLoading, setStatsLoading] = useState(true);
	const router = useRouter();

	// 获取 todos 数据用于统计
	const fetchTodosForStats = async () => {
		try {
			const { data, error } = await supabase
				.from("todos")
				.select("*")
				.order("created_at", { ascending: false })
				.limit(10);

			if (error) throw error;
			setTodos(data || []);
		} catch (error) {
			console.error("Error fetching todos for stats:", error);
		} finally {
			setStatsLoading(false);
		}
	};

	useEffect(() => {
		// 检查会话状态
		const checkSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setSession(session);
			setLoading(false);

			// 如果未登录，重定向到认证页面
			if (!session) {
				router.push("/supabase/auth");
			} else {
				// 已登录，获取统计数据
				fetchTodosForStats();
			}
		};

		checkSession();

		// 监听认证状态变化
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			if (!session) {
				router.push("/supabase/auth");
			} else {
				fetchTodosForStats();
			}
		});

		return () => subscription.unsubscribe();
	}, [router, fetchTodosForStats]);

	// 计算统计数据
	const stats = {
		total: todos.length,
		completed: todos.filter((t) => t.is_complete).length,
		active: todos.filter((t) => !t.is_complete).length,
		highPriority: todos.filter((t) => t.priority >= 4 && !t.is_complete).length,
		overdue: todos.filter((t) => {
			if (!t.due_date || t.is_complete) return false;
			return new Date(t.due_date) < new Date();
		}).length,
	};

	// 优先级分布
	const priorityDistribution = [1, 2, 3, 4, 5].map((priority) => ({
		priority,
		count: todos.filter((t) => t.priority === priority && !t.is_complete).length,
		label: ["低", "中", "高", "紧急", "非常紧急"][priority - 1],
	}));

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

	if (!session) {
		return (
			<Layout>
				<div className="flex min-h-screen items-center justify-center">
					<div className="text-center">
						<p className="mb-4 text-red-600">请先登录</p>
						<button
							onClick={() => router.push("/supabase/auth")}
							className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>
							去登录
						</button>
					</div>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				<div className="mx-auto max-w-7xl py-8">
					<div className="mb-8 flex items-center justify-between">
						<div>
							<h1 className="font-bold text-3xl text-gray-900">控制面板</h1>
							<p className="mt-1 text-gray-600">欢迎回来，{session.user.email}</p>
						</div>
						<div className="flex items-center gap-4">
							<button
								onClick={() => router.push("/supabase/todo")}
								className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
							>
								管理 Todo
							</button>
							<AuthButton />
						</div>
					</div>

					{statsLoading ? (
						<div className="py-12 text-center">
							<div className="inline-block h-8 w-8 animate-spin rounded-full border-blue-500 border-b-2"></div>
							<p className="mt-2 text-gray-600">加载统计数据...</p>
						</div>
					) : (
						<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
							{/* 统计卡片 */}
							<div className="rounded-lg bg-white p-6 shadow-md">
								<h3 className="mb-2 font-medium text-gray-500 text-sm">总任务数</h3>
								<p className="font-bold text-3xl text-gray-900">{stats.total}</p>
							</div>

							<div className="rounded-lg bg-white p-6 shadow-md">
								<h3 className="mb-2 font-medium text-gray-500 text-sm">已完成</h3>
								<p className="font-bold text-3xl text-green-600">{stats.completed}</p>
								<p className="mt-1 text-gray-500 text-sm">
									完成率: {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
								</p>
							</div>

							<div className="rounded-lg bg-white p-6 shadow-md">
								<h3 className="mb-2 font-medium text-gray-500 text-sm">进行中</h3>
								<p className="font-bold text-3xl text-blue-600">{stats.active}</p>
							</div>

							<div className="rounded-lg bg-white p-6 shadow-md">
								<h3 className="mb-2 font-medium text-gray-500 text-sm">紧急任务</h3>
								<p className="font-bold text-3xl text-red-600">{stats.highPriority}</p>
								{stats.overdue > 0 && <p className="mt-1 text-red-500 text-sm">{stats.overdue} 项已逾期</p>}
							</div>
						</div>
					)}

					<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
						{/* 优先级分布 */}
						<div className="rounded-lg bg-white p-6 shadow-md">
							<h3 className="mb-4 font-semibold text-lg">优先级分布</h3>
							<div className="space-y-3">
								{priorityDistribution.map(({ priority, count, label }) => (
									<div key={priority} className="flex items-center justify-between">
										<span className="text-gray-600 text-sm">{label}</span>
										<div className="flex items-center gap-2">
											<div className="h-2 w-32 rounded-full bg-gray-200">
												<div
													className={`h-2 rounded-full ${priority <= 2 ? "bg-green-500" : priority === 3 ? "bg-yellow-500" : "bg-red-500"}`}
													style={{
														width: `${stats.active > 0 ? (count / stats.active) * 100 : 0}%`,
													}}
												></div>
											</div>
											<span className="w-8 text-right font-medium text-sm">{count}</span>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* 最近任务 */}
						<div className="rounded-lg bg-white p-6 shadow-md">
							<h3 className="mb-4 font-semibold text-lg">最近任务</h3>
							{todos.length === 0 ? (
								<p className="py-4 text-center text-gray-500">暂无任务</p>
							) : (
								<div className="space-y-2">
									{todos.slice(0, 5).map((todo) => (
										<div key={todo.id} className="flex items-center justify-between border-gray-100 border-b py-2">
											<div className="flex-1">
												<p className={`text-sm ${todo.is_complete ? "text-gray-400 line-through" : "text-gray-900"}`}>
													{todo.title}
												</p>
												<p className="text-gray-500 text-xs">{new Date(todo.created_at).toLocaleDateString("zh-CN")}</p>
											</div>
											<span
												className={`rounded-full px-2 py-1 text-xs ${
													todo.is_complete
														? "bg-green-100 text-green-800"
														: todo.priority >= 4
															? "bg-red-100 text-red-800"
															: "bg-blue-100 text-blue-800"
												}`}
											>
												{todo.is_complete ? "已完成" : ["低", "中", "高", "紧急", "非常紧急"][todo.priority - 1]}
											</span>
										</div>
									))}
								</div>
							)}
							{todos.length > 5 && (
								<button
									onClick={() => router.push("/supabase/todo")}
									className="mt-4 font-medium text-blue-600 text-sm hover:text-blue-700"
								>
									查看全部任务 →
								</button>
							)}
						</div>
					</div>

					{/* 用户信息 */}
					<div className="mt-8 rounded-lg bg-white p-6 shadow-md">
						<h3 className="mb-4 font-semibold text-lg">用户信息</h3>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div>
								<p className="text-gray-500 text-sm">邮箱</p>
								<p className="font-medium">{session.user.email}</p>
							</div>
							<div>
								<p className="text-gray-500 text-sm">用户ID</p>
								<p className="font-medium text-sm">{session.user.id}</p>
							</div>
							<div>
								<p className="text-gray-500 text-sm">最后登录</p>
								<p className="font-medium">{new Date(session.last_sign_in_at).toLocaleString("zh-CN")}</p>
							</div>
							<div>
								<p className="text-gray-500 text-sm">创建时间</p>
								<p className="font-medium">{new Date(session.created_at).toLocaleString("zh-CN")}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

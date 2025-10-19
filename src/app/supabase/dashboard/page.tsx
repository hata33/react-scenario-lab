'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import AuthButton from '@/components/auth/AuthButton'
import Layout from '@/components/Layout'
import { Todo } from '@/types/todo'

export default function DashboardPage() {
	const [session, setSession] = useState<any>(null)
	const [loading, setLoading] = useState(true)
	const [todos, setTodos] = useState<Todo[]>([])
	const [statsLoading, setStatsLoading] = useState(true)
	const supabase = createClient()
	const router = useRouter()

	// 获取 todos 数据用于统计
	const fetchTodosForStats = async () => {
		try {
			const { data, error } = await supabase
				.from('todos')
				.select('*')
				.order('created_at', { ascending: false })
				.limit(10)

			if (error) throw error
			setTodos(data || [])
		} catch (error) {
			console.error('Error fetching todos for stats:', error)
		} finally {
			setStatsLoading(false)
		}
	}

	useEffect(() => {
		// 检查会话状态
		const checkSession = async () => {
			const { data: { session } } = await supabase.auth.getSession()
			setSession(session)
			setLoading(false)

			// 如果未登录，重定向到认证页面
			if (!session) {
				router.push('/supabase/auth')
			} else {
				// 已登录，获取统计数据
				fetchTodosForStats()
			}
		}

		checkSession()

		// 监听认证状态变化
		const { data: { subscription } } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session)
				if (!session) {
					router.push('/supabase/auth')
				} else {
					fetchTodosForStats()
				}
			}
		)

		return () => subscription.unsubscribe()
	}, [supabase, router])

	// 计算统计数据
	const stats = {
		total: todos.length,
		completed: todos.filter(t => t.is_complete).length,
		active: todos.filter(t => !t.is_complete).length,
		highPriority: todos.filter(t => t.priority >= 4 && !t.is_complete).length,
		overdue: todos.filter(t => {
			if (!t.due_date || t.is_complete) return false
			return new Date(t.due_date) < new Date()
		}).length,
	}

	// 优先级分布
	const priorityDistribution = [1, 2, 3, 4, 5].map(priority => ({
		priority,
		count: todos.filter(t => t.priority === priority && !t.is_complete).length,
		label: ['低', '中', '高', '紧急', '非常紧急'][priority - 1]
	}))

	if (loading) {
		return (
			<Layout>
				<div className="min-h-screen flex items-center justify-center">
					<div className="text-center">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
						<p className="text-gray-600">检查认证状态...</p>
					</div>
				</div>
			</Layout>
		)
	}

	if (!session) {
		return (
			<Layout>
				<div className="min-h-screen flex items-center justify-center">
					<div className="text-center">
						<p className="text-red-600 mb-4">请先登录</p>
						<button
							onClick={() => router.push('/supabase/auth')}
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							去登录
						</button>
					</div>
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				<div className="max-w-7xl mx-auto py-8">
					<div className="flex justify-between items-center mb-8">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">控制面板</h1>
							<p className="text-gray-600 mt-1">
								欢迎回来，{session.user.email}
							</p>
						</div>
						<div className="flex items-center gap-4">
							<button
								onClick={() => router.push('/supabase/todo')}
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							>
								管理 Todo
							</button>
							<AuthButton />
						</div>
					</div>

					{statsLoading ? (
						<div className="text-center py-12">
							<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
							<p className="mt-2 text-gray-600">加载统计数据...</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
							{/* 统计卡片 */}
							<div className="bg-white p-6 rounded-lg shadow-md">
								<h3 className="text-sm font-medium text-gray-500 mb-2">总任务数</h3>
								<p className="text-3xl font-bold text-gray-900">{stats.total}</p>
							</div>

							<div className="bg-white p-6 rounded-lg shadow-md">
								<h3 className="text-sm font-medium text-gray-500 mb-2">已完成</h3>
								<p className="text-3xl font-bold text-green-600">{stats.completed}</p>
								<p className="text-sm text-gray-500 mt-1">
									完成率: {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
								</p>
							</div>

							<div className="bg-white p-6 rounded-lg shadow-md">
								<h3 className="text-sm font-medium text-gray-500 mb-2">进行中</h3>
								<p className="text-3xl font-bold text-blue-600">{stats.active}</p>
							</div>

							<div className="bg-white p-6 rounded-lg shadow-md">
								<h3 className="text-sm font-medium text-gray-500 mb-2">紧急任务</h3>
								<p className="text-3xl font-bold text-red-600">{stats.highPriority}</p>
								{stats.overdue > 0 && (
									<p className="text-sm text-red-500 mt-1">
										{stats.overdue} 项已逾期
									</p>
								)}
							</div>
						</div>
					)}

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* 优先级分布 */}
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-lg font-semibold mb-4">优先级分布</h3>
							<div className="space-y-3">
								{priorityDistribution.map(({ priority, count, label }) => (
									<div key={priority} className="flex items-center justify-between">
										<span className="text-sm text-gray-600">{label}</span>
										<div className="flex items-center gap-2">
											<div className="w-32 bg-gray-200 rounded-full h-2">
												<div
													className={`h-2 rounded-full ${
														priority <= 2 ? 'bg-green-500' :
														priority === 3 ? 'bg-yellow-500' :
														'bg-red-500'
													}`}
													style={{
														width: `${stats.active > 0 ? (count / stats.active) * 100 : 0}%`
													}}
												></div>
											</div>
											<span className="text-sm font-medium w-8 text-right">{count}</span>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* 最近任务 */}
						<div className="bg-white p-6 rounded-lg shadow-md">
							<h3 className="text-lg font-semibold mb-4">最近任务</h3>
							{todos.length === 0 ? (
								<p className="text-gray-500 text-center py-4">暂无任务</p>
							) : (
								<div className="space-y-2">
									{todos.slice(0, 5).map((todo) => (
										<div key={todo.id} className="flex items-center justify-between py-2 border-b border-gray-100">
											<div className="flex-1">
												<p className={`text-sm ${todo.is_complete ? 'line-through text-gray-400' : 'text-gray-900'}`}>
													{todo.title}
												</p>
												<p className="text-xs text-gray-500">
													{new Date(todo.created_at).toLocaleDateString('zh-CN')}
												</p>
											</div>
											<span className={`px-2 py-1 rounded-full text-xs ${
												todo.is_complete ? 'bg-green-100 text-green-800' :
												todo.priority >= 4 ? 'bg-red-100 text-red-800' :
												'bg-blue-100 text-blue-800'
											}`}>
												{todo.is_complete ? '已完成' :
												 ['低', '中', '高', '紧急', '非常紧急'][todo.priority - 1]}
											</span>
										</div>
									))}
								</div>
							)}
							{todos.length > 5 && (
								<button
									onClick={() => router.push('/supabase/todo')}
									className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
								>
									查看全部任务 →
								</button>
							)}
						</div>
					</div>

					{/* 用户信息 */}
					<div className="mt-8 bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-lg font-semibold mb-4">用户信息</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<p className="text-sm text-gray-500">邮箱</p>
								<p className="font-medium">{session.user.email}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">用户ID</p>
								<p className="font-medium text-sm">{session.user.id}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">最后登录</p>
								<p className="font-medium">{new Date(session.last_sign_in_at).toLocaleString('zh-CN')}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">创建时间</p>
								<p className="font-medium">{new Date(session.created_at).toLocaleString('zh-CN')}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import TodoList from '@/components/todos/TodoList'
import AuthButton from '@/components/auth/AuthButton'
import Layout from '@/components/Layout'

export default function TodoPage() {
	const [session, setSession] = useState<any>(null)
	const [loading, setLoading] = useState(true)
	const supabase = createClient()
	const router = useRouter()

	useEffect(() => {
		// 检查会话状态
		const checkSession = async () => {
			const { data: { session } } = await supabase.auth.getSession()
			setSession(session)
			setLoading(false)

			// 如果未登录，重定向到认证页面
			if (!session) {
				router.push('/supabase/auth')
			}
		}

		checkSession()

		// 监听认证状态变化
		const { data: { subscription } } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session)
				if (!session) {
					router.push('/supabase/auth')
				}
			}
		)

		return () => subscription.unsubscribe()
	}, [supabase, router])

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
				<div className="max-w-6xl mx-auto py-8">
					<div className="flex justify-between items-center mb-8">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">我的待办事项</h1>
							<p className="text-gray-600 mt-1">
								欢迎回来，{session.user.email}
							</p>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-sm text-gray-500">
								登录时间: {new Date(session.last_sign_in_at).toLocaleString('zh-CN')}
							</span>
							<AuthButton />
						</div>
					</div>

					<TodoList />
				</div>
			</div>
		</Layout>
	)
}
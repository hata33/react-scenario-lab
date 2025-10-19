'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import AuthForm from '@/components/auth/AuthForm'
import Layout from '@/components/Layout'

export default function AuthPage() {
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

			// 如果已登录，重定向到 todo 页面
			if (session) {
				router.push('/supabase/todo')
			}
		}

		checkSession()

		// 监听认证状态变化
		const { data: { subscription } } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session)
				if (session) {
					router.push('/supabase/todo')
				}
			}
		)

		return () => subscription.unsubscribe()
	}, [supabase, router])

	// 处理认证回调
	useEffect(() => {
		const handleAuthCallback = async () => {
			const urlParams = new URLSearchParams(window.location.search)
			const code = urlParams.get('code')

			if (code) {
				try {
					await supabase.auth.exchangeCodeForSession(code)
				} catch (error) {
					console.error('Error exchanging code for session:', error)
				}
			}
		}

		handleAuthCallback()
	}, [supabase])

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

	if (session) {
		return (
			<Layout>
				<div className="min-h-screen flex items-center justify-center">
					<div className="text-center">
						<p className="text-green-600 mb-4">已登录，正在跳转...</p>
						<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
					</div>
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50 py-12">
				<div className="max-w-md mx-auto">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							欢迎使用 Supabase Todo
						</h1>
						<p className="text-gray-600">
							登录或注册以管理您的待办事项
						</p>
					</div>

					<AuthForm />

					<div className="mt-8 p-4 bg-blue-50 rounded-lg">
						<h3 className="text-sm font-medium text-blue-900 mb-2">功能特性:</h3>
						<ul className="text-sm text-blue-700 space-y-1">
							<li>• 创建和管理待办事项</li>
							<li>• 设置优先级和截止日期</li>
							<li>• 添加标签和描述</li>
							<li>• 实时数据同步</li>
							<li>• 数据持久化存储</li>
						</ul>
					</div>
				</div>
			</div>
		</Layout>
	)
}
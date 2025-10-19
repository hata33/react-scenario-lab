'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'

export default function AuthCallbackPage() {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	useEffect(() => {
		const handleAuthCallback = async () => {
			try {
				// 获取 URL 参数
				const urlParams = new URLSearchParams(window.location.search)
				const code = urlParams.get('code')
				const error = urlParams.get('error')
				const errorDescription = urlParams.get('error_description')

				if (error) {
					setError(errorDescription || error)
					setLoading(false)
					setTimeout(() => {
						router.push('/supabase/auth')
					}, 3000)
					return
				}

				if (code) {
					// 交换 code 获取 session
					const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

					if (exchangeError) {
						setError(exchangeError.message)
						setLoading(false)
						setTimeout(() => {
							router.push('/supabase/auth')
						}, 3000)
						return
					}

					if (data.session) {
						// 成功认证，重定向到 todo 页面
						setTimeout(() => {
							router.push('/supabase/todo')
						}, 1500)
					} else {
						// 没有会话，重定向到登录页面
						setTimeout(() => {
							router.push('/supabase/auth')
						}, 1500)
					}
				} else {
					// 没有 code 参数，检查当前会话
					const { data, error } = await supabase.auth.getSession()

					if (error) {
						setError(error.message)
						setLoading(false)
						return
					}

					if (data.session) {
						// 已有会话，重定向到 todo 页面
						setTimeout(() => {
							router.push('/supabase/todo')
						}, 1500)
					} else {
						// 没有会话，重定向到登录页面
						setTimeout(() => {
							router.push('/supabase/auth')
						}, 1500)
					}
				}
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		handleAuthCallback()
	}, [router])

	return (
		<Layout>
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					{loading ? (
						<div>
							<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
							<p className="text-gray-600">正在验证您的身份...</p>
						</div>
					) : error ? (
						<div>
							<div className="text-red-600 mb-4">
								<svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<p className="text-lg font-medium">认证失败</p>
								<p className="text-sm mt-2">{error}</p>
							</div>
							<button
								onClick={() => router.push('/supabase/auth')}
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							>
								重新登录
							</button>
						</div>
					) : (
						<div>
							<div className="text-green-600 mb-4">
								<svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								<p className="text-lg font-medium">认证成功</p>
								<p className="text-sm mt-2">正在跳转到应用...</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'

export default function AuthForm() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSignUp, setIsSignUp] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const router = useRouter()
	const supabase = createClient()

	const handleAuth = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		try {
			if (isSignUp) {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: `${window.location.origin}/supabase/auth/callback`,
					},
				})
				if (error) throw error
				setError('请检查邮箱确认注册')
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password,
				})
				if (error) throw error
				router.refresh()
			}
		} catch (error: any) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-6 text-center">
				{isSignUp ? '注册' : '登录'}
			</h2>

			<form onSubmit={handleAuth} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						邮箱
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						密码
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
						required
						minLength={6}
					/>
				</div>

				{error && (
					<div className="text-red-500 text-sm">{error}</div>
				)}

				<button
					type="submit"
					disabled={loading}
					className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
				>
					{loading ? '处理中...' : isSignUp ? '注册' : '登录'}
				</button>
			</form>

			<div className="mt-4 text-center">
				<button
					onClick={() => setIsSignUp(!isSignUp)}
					className="text-blue-500 hover:text-blue-600"
				>
					{isSignUp ? '已有账户？点击登录' : '没有账户？点击注册'}
				</button>
			</div>
		</div>
	)
}
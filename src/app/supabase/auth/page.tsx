'use client'

import Layout from '@/components/Layout'

export default function AuthPage() {
	// 最简单的页面，直接显示跳转按钮
	return (
		<Layout>
			<div className="min-h-screen bg-gray-50 py-12">
				<div className="max-w-md mx-auto text-center">
					<div className="mb-4">
						<div className="inline-block rounded-full h-16 w-16 bg-green-100 flex items-center justify-center">
							<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
						</div>
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来！</h1>
					<p className="text-gray-600 mb-6"> </p>
					<button
						onClick={() => {
							console.log('跳转到 Todo 页面')
							window.location.href = '/supabase/todo'
						}}
						className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
					>
						进入 Todo 管理
					</button>
				</div>
			</div>
		</Layout>
	)
}
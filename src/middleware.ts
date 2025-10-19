import { createServerClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
	const res = NextResponse.next()
	const supabase = await createServerClient()

	const {
		data: { session },
	} = await supabase.auth.getSession()

	// 保护需要认证的路由
	if (req.nextUrl.pathname.startsWith('/supabase/todo') && !session) {
		return NextResponse.redirect(new URL('/supabase/auth', req.url))
	}

	if (req.nextUrl.pathname.startsWith('/supabase/dashboard') && !session) {
		return NextResponse.redirect(new URL('/supabase/auth', req.url))
	}

	// 已登录用户不能访问认证页面
	if (req.nextUrl.pathname.startsWith('/supabase/auth') && session) {
		return NextResponse.redirect(new URL('/supabase/todo', req.url))
	}

	return res
}

export const config = {
	matcher: ['/supabase/auth/:path*', '/supabase/todo/:path*', '/supabase/dashboard/:path*']
}
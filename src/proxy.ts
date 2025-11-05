import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// 临时禁用 middleware 以解决循环重定向问题
export async function proxy(_req: NextRequest) {
	// 直接放行所有请求，不进行任何检查
	return NextResponse.next();
}

export const config = {
	matcher: ["/supabase/auth/:path*", "/supabase/todo/:path*", "/supabase/dashboard/:path*"],
};

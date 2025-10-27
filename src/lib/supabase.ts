import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

// 服务端组件使用
export async function createServerClient() {
	const cookieStore = cookies();
	return createSupabaseClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			auth: {
				persistSession: false,
			},
			global: {
				headers: {
					cookie: cookieStore.toString(),
				},
			},
		},
	);
}

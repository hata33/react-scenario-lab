import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// 检查环境变量
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Supabase 配置检查:", {
	url: supabaseUrl,
	hasKey: !!supabaseAnonKey,
	keyLength: supabaseAnonKey?.length,
});

// 单例模式 - 确保只有一个 Supabase 客户端实例
let supabaseInstance: ReturnType<typeof createSupabaseClient<Database>> | null = null;

export function createClient() {
	if (!supabaseInstance) {
		if (!supabaseUrl || !supabaseAnonKey) {
			throw new Error("缺少 Supabase 环境变量配置");
		}

		supabaseInstance = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey);
		console.log("Supabase 客户端已创建");
	}
	return supabaseInstance;
}

// 直接导出单例实例（兼容性）
export const supabase = createClient();

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// 客户端组件使用
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// 直接导出（兼容性）
export const supabase = createClient()
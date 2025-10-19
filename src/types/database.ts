// Supabase 数据库类型定义
// 这个文件定义了数据库表结构，用于 TypeScript 类型检查

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          user_id: string
          title: string
          description: string | null
          is_complete: boolean
          priority: number
          due_date: string | null
          tags: string[]
        }
        Insert: {
          id?: number
          created_at?: string
          updated_at?: string
          user_id: string
          title: string
          description?: string | null
          is_complete?: boolean
          priority?: number
          due_date?: string | null
          tags?: string[]
        }
        Update: {
          id?: number
          created_at?: string
          updated_at?: string
          user_id?: string
          title?: string
          description?: string | null
          is_complete?: boolean
          priority?: number
          due_date?: string | null
          tags?: string[]
        }
      }
    }
  }
}
'use client'

import Layout from '@/components/Layout'
import TodoList from '@/pages/Basic/TodoList'

export default function TodoListPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">TodoList 待办</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TodoList />
        </div>
      </div>
    </Layout>
  )
}

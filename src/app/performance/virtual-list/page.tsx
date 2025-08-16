'use client'

import Layout from '@/components/Layout'
import VirtualList from '@/pages/Performance/VirtualList'

export default function VirtualListPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">虚拟列表</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <VirtualList />
        </div>
      </div>
    </Layout>
  )
}

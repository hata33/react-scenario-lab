'use client'

import Layout from '@/components/Layout'
import Table from '@/pages/Data/Table'

export default function TablePage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">表格</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Table />
        </div>
      </div>
    </Layout>
  )
}

'use client'

import Layout from '@/components/Layout'
import SearchFilter from '@/pages/Data/SearchFilter'

export default function SearchFilterPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">搜索/筛选</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <SearchFilter />
        </div>
      </div>
    </Layout>
  )
}

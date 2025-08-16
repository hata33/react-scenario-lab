'use client'

import Layout from '@/components/Layout'
import Counter from '@/pages/Basic/Counter'

export default function CounterPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Counter 计数器</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Counter />
        </div>
      </div>
    </Layout>
  )
}

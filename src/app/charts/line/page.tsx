'use client'

import Layout from '@/components/Layout'
import LineChart from '@/pages/Charts/LineChart'

export default function LineChartPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">折线图</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <LineChart />
        </div>
      </div>
    </Layout>
  )
}

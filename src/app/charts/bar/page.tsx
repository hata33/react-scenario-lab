'use client'

import Layout from '@/components/Layout'
import BarChart from '@/pages/Charts/BarChart'

export default function BarChartPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">柱状图</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <BarChart />
        </div>
      </div>
    </Layout>
  )
}

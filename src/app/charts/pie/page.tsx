'use client'

import Layout from '@/components/Layout'
import PieChart from '@/pages/Charts/PieChart'

export default function PieChartPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">饼图</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <PieChart />
        </div>
      </div>
    </Layout>
  )
}

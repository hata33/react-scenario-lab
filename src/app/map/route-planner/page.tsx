'use client'

import Layout from '@/components/Layout'
import RoutePlanner from '@/pages/Map/RoutePlanner'

export default function RoutePlannerPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">路径规划</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <RoutePlanner />
        </div>
      </div>
    </Layout>
  )
}

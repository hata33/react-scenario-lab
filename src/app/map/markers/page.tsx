'use client'

import Layout from '@/components/Layout'
import MapMarkers from '@/pages/Map/MapMarkers'

export default function MapMarkersPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">点标注</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <MapMarkers />
        </div>
      </div>
    </Layout>
  )
}

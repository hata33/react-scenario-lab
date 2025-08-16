'use client'

import Layout from '@/components/Layout'
import ElementAnimation from '@/pages/Animation/ElementAnimation'

export default function ElementAnimationPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">元素动画</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ElementAnimation />
        </div>
      </div>
    </Layout>
  )
}

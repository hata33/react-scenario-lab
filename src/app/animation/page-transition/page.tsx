'use client'

import Layout from '@/components/Layout'
import PageTransition from '@/pages/Animation/PageTransition'

export default function PageTransitionPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">页面过渡</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <PageTransition />
        </div>
      </div>
    </Layout>
  )
}

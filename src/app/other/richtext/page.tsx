'use client'

import Layout from '@/components/Layout'
import RichText from '@/pages/Other/RichText'

export default function RichTextPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">富文本</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <RichText />
        </div>
      </div>
    </Layout>
  )
}

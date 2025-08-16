'use client'

import Layout from '@/components/Layout'
import I18n from '@/pages/Other/I18n' 

export default function I18nPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">国际化</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <I18n />
        </div>
      </div>
    </Layout>
  )
}

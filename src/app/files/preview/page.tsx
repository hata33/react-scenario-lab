'use client'

import Layout from '@/components/Layout'
import FilePreview from '@/pages/Files/FilePreview'

export default function FilePreviewPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">文件预览</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <FilePreview />
        </div>
      </div>
    </Layout>
  )
}

'use client'

import Layout from '@/components/Layout'
import FileUpload from '@/pages/Files/FileUpload'

export default function FileUploadPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">文件上传</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <FileUpload />
        </div>
      </div>
    </Layout>
  )
}

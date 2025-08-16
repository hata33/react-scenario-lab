'use client'

import Layout from '@/components/Layout'
import BasicForm from '@/pages/Forms/BasicForm'

export default function BasicFormPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">基础表单</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <BasicForm />
        </div>
      </div>
    </Layout>
  )
}

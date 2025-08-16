'use client'

import Layout from '@/components/Layout'
import FormValidation from '@/pages/Forms/FormValidation'

export default function FormValidationPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">表单校验</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <FormValidation />
        </div>
      </div>
    </Layout>
  )
}

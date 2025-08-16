'use client'

import Layout from '@/components/Layout'
import StepForm from '@/pages/Forms/StepForm'

export default function StepFormPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">分步表单</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <StepForm />
        </div>
      </div>
    </Layout>
  )
}

'use client'

import Layout from '@/components/Layout'
import Register from '@/pages/Auth/Register'

export default function RegisterPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">注册</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Register />
        </div>
      </div>
    </Layout>
  )
}

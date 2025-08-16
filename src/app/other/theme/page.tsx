'use client'

import Layout from '@/components/Layout'
import ThemeToggle from '@/pages/Other/ThemeToggle'

export default function ThemeTogglePage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">主题切换</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ThemeToggle />
        </div>
      </div>
    </Layout>
  )
}

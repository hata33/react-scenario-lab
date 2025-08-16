'use client'

import Layout from '@/components/Layout'
import DragDrop from '@/pages/Animation/DragDrop'

export default function DragDropPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">拖拽</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <DragDrop />
        </div>
      </div>
    </Layout>
  )
}

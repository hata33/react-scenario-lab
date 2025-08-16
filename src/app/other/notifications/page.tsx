'use client'

import Layout from '@/components/Layout'
import Notifications from '@/pages/Other/Notifications'

export default function NotificationsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">通知</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Notifications />
        </div>
      </div>
    </Layout>
  )
}

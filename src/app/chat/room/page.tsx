'use client'

import Layout from '@/components/Layout'
import ChatRoom from '@/pages/Chat/ChatRoom'

export default function ChatRoomPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">聊天室(WebSocket)</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ChatRoom />
        </div>
      </div>
    </Layout>
  )
}

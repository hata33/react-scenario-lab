import { useEffect, useRef, useState } from 'react'

type Msg = { id: number; text: string }

export default function ChatRoom() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket('wss://echo.websocket.events')
    wsRef.current = ws
    ws.onmessage = (e) => setMessages((arr) => [...arr, { id: Date.now() + Math.random(), text: String(e.data) }])
    return () => ws.close()
  }, [])

  const send = () => {
    if (!input.trim()) return
    wsRef.current?.send(input.trim())
    setInput('')
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">聊天室 (WebSocket)</h2>
      <div className="border rounded h-64 overflow-auto bg-white p-3 space-y-1">
        {messages.map((m) => (
          <div key={m.id} className="text-sm">{m.text}</div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input className="border rounded px-3 py-2 flex-1" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="px-3 py-2 rounded bg-gray-900 text-white" onClick={send}>发送</button>
      </div>
    </div>
  )
}



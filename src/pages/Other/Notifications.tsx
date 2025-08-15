import { useState } from 'react'

type Notice = { id: number; text: string }

export default function Notifications() {
  const [list, setList] = useState<Notice[]>([])
  const push = () => setList((arr) => [...arr, { id: Date.now(), text: `消息 ${arr.length + 1}` }])
  const remove = (id: number) => setList((arr) => arr.filter((i) => i.id !== id))
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">通知</h2>
      <button className="px-3 py-2 rounded bg-gray-900 text-white" onClick={push}>来一条</button>
      <div className="mt-4 space-y-2">
        {list.map((n) => (
          <div key={n.id} className="flex items-center justify-between p-3 rounded border bg-white">
            <span>{n.text}</span>
            <button className="text-sm text-gray-500" onClick={() => remove(n.id)}>关闭</button>
          </div>
        ))}
      </div>
    </div>
  )
}



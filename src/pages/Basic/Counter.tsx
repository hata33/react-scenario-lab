import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Counter 计数器</h2>
      <div className="flex items-center gap-3">
        <button className="px-3 py-1 rounded bg-gray-900 text-white" onClick={() => setCount((v) => v - 1)}>-</button>
        <span className="w-16 text-center text-lg">{count}</span>
        <button className="px-3 py-1 rounded bg-gray-900 text-white" onClick={() => setCount((v) => v + 1)}>+</button>
      </div>
    </div>
  )
}



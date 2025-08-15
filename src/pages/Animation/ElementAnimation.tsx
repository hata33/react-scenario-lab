import { useState } from 'react'

export default function ElementAnimation() {
  const [on, setOn] = useState(false)
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">元素动画</h2>
      <button className="px-3 py-2 rounded bg-gray-900 text-white" onClick={() => setOn((v) => !v)}>
        {on ? '隐藏' : '显示'}
      </button>
      <div className={`mt-4 transition-all duration-500 ${on ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <div className="p-4 rounded border bg-white">一个有过渡效果的卡片</div>
      </div>
    </div>
  )
}



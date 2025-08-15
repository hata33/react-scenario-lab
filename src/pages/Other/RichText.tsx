import { useState } from 'react'

export default function RichText() {
  const [value, setValue] = useState('<p><b>富文本</b> 内容示例</p>')
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">富文本</h2>
      <textarea className="w-full max-w-2xl h-48 border rounded p-3" value={value} onChange={(e) => setValue(e.target.value)} />
      <div className="mt-4 p-4 rounded border bg-white" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  )
}



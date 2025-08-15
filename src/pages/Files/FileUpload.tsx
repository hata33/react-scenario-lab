import { useState } from 'react'

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">文件上传</h2>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      {file && (
        <div className="mt-3 text-sm text-gray-600">已选择：{file.name}（{Math.round(file.size / 1024)} KB）</div>
      )}
    </div>
  )
}



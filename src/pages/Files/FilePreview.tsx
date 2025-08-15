import { useEffect, useState } from 'react'

export default function FilePreview() {
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (!file) return setUrl('')
    const u = URL.createObjectURL(file)
    setUrl(u)
    return () => URL.revokeObjectURL(u)
  }, [file])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">文件预览</h2>
      <input type="file" accept="image/*,application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      {url && (
        <div className="mt-4">
          {file && file.type.startsWith('image/') ? (
            <img src={url} alt="preview" className="max-w-md rounded border" />
          ) : (
            <iframe title="preview" src={url} className="w-full max-w-2xl h-96 rounded border" />
          )}
        </div>
      )}
    </div>
  )
}



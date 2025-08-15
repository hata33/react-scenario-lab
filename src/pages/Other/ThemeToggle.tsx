import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">主题切换</h2>
      <button className="px-3 py-2 rounded bg-gray-900 text-white" onClick={() => setDark((v) => !v)}>
        {dark ? '切到浅色' : '切到深色'}
      </button>
      <div className="mt-4 p-4 rounded border bg-white dark:bg-gray-800 dark:text-white transition-colors">
        当前主题：{dark ? 'Dark' : 'Light'}
      </div>
    </div>
  )
}



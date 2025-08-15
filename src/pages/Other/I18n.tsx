import { useState } from 'react'

export default function I18n() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh')
  const dict = { zh: { hello: '你好', welcome: '欢迎' }, en: { hello: 'Hello', welcome: 'Welcome' } }
  const t = (k: keyof typeof dict['zh']) => dict[lang][k]
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">国际化 (I18n)</h2>
      <div className="flex gap-2 mb-3">
        <button className={`px-3 py-2 rounded ${lang==='zh'?'bg-gray-900 text-white':'bg-gray-100'}`} onClick={() => setLang('zh')}>中文</button>
        <button className={`px-3 py-2 rounded ${lang==='en'?'bg-gray-900 text-white':'bg-gray-100'}`} onClick={() => setLang('en')}>English</button>
      </div>
      <div className="p-4 rounded border bg-white">
        <div>{t('hello')}</div>
        <div>{t('welcome')}</div>
      </div>
    </div>
  )
}



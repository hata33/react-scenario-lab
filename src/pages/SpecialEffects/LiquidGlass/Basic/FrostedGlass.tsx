import { useState } from 'react'

export default function FrostedGlass() {
  const [saturation, setSaturation] = useState(140)
  const [brightness, setBrightness] = useState(100)
  const [blur, setBlur] = useState(15)

  const frostedStyle = {
    backdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
    border: '1px solid rgba(255,255,255,0.4)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
  } as React.CSSProperties

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">磨砂玻璃效果</h2>
        <p className="text-gray-600">高级的磨砂质感，模拟真实磨砂玻璃的视觉效果</p>
      </div>

      {/* 控制面板 */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">模糊强度: {blur}px</span>
            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </label>
        </div>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">饱和度: {saturation}%</span>
            <input
              type="range"
              min="100"
              max="200"
              step="5"
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </label>
        </div>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">亮度: {brightness}%</span>
            <input
              type="range"
              min="80"
              max="120"
              step="5"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* 效果展示 */}
      <div className="relative h-80 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-96 h-40 rounded-3xl p-8 text-center"
            style={frostedStyle}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">磨砂玻璃卡片</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              这是一个增强的磨砂玻璃效果，具有更好的质感和深度
            </p>
          </div>
        </div>
      </div>

      {/* 代码示例 */}
      <div className="bg-gray-900 rounded-xl p-4 text-sm overflow-x-auto">
        <pre className="text-green-400">
          <code>{`const frostedStyle = {
  backdropFilter: \`blur(\${blur}px) saturate(\${saturation}%) brightness(\${brightness}%)\`,
  background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
  border: '1px solid rgba(255,255,255,0.4)',
  boxShadow: '0 12px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
}`}</code>
        </pre>
      </div>
    </div>
  )
}

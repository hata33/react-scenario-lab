import { useState } from 'react'

export default function SimpleGlass() {
  const [opacity, setOpacity] = useState(0.3)
  const [blur, setBlur] = useState(10)

  const glassStyle = {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    background: `rgba(255, 255, 255, ${opacity})`,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">简单玻璃效果</h2>
        <p className="text-gray-600">调整透明度和模糊强度来体验不同的玻璃质感</p>
      </div>

      {/* 控制面板 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">透明度: {opacity.toFixed(2)}</span>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </label>
        </div>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">模糊强度: {blur}px</span>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* 效果展示 */}
      <div className="relative h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-80 h-32 rounded-2xl p-6 text-center"
            style={glassStyle}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">玻璃卡片</h3>
            <p className="text-gray-700 text-sm">
              这是一个简单的玻璃拟态效果示例
            </p>
          </div>
        </div>
      </div>

      {/* 代码示例 */}
      <div className="bg-gray-900 rounded-xl p-4 text-sm overflow-x-auto">
        <pre className="text-green-400">
          <code>{`const glassStyle = {
  backdropFilter: \`blur(\${blur}px)\`,
  background: \`rgba(255, 255, 255, \${opacity})\`,
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}`}</code>
        </pre>
      </div>
    </div>
  )
}

import { useState } from 'react'
import SimpleGlass from './SimpleGlass'
import FrostedGlass from './FrostedGlass'

export default function BasicLiquidGlass() {
  const [activeEffect, setActiveEffect] = useState<'simple' | 'frosted'>('simple')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          基础液体玻璃效果
        </h1>
        
        {/* 效果选择器 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveEffect('simple')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeEffect === 'simple'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              简单玻璃
            </button>
            <button
              onClick={() => setActiveEffect('frosted')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeEffect === 'frosted'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              磨砂玻璃
            </button>
          </div>
        </div>

        {/* 效果展示区域 */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          {activeEffect === 'simple' ? <SimpleGlass /> : <FrostedGlass />}
        </div>

        {/* 说明区域 */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">效果说明</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">简单玻璃</h4>
              <p className="text-gray-600 text-sm">
                基础的玻璃拟态效果，使用 backdrop-filter 实现透明度和模糊效果。
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">磨砂玻璃</h4>
              <p className="text-gray-600 text-sm">
                增强的磨砂质感，通过调整模糊强度和透明度模拟真实磨砂玻璃。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

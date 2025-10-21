"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// 类型定义
type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
type DemoType = "grid" | "navigation" | "touch" | "typography";

interface DemoConfig {
  title: string;
  description: string;
  component: React.ReactNode;
}

export default function ResponsiveDesignContent() {
  const [screenSize, setScreenSize] = useState<string>("");
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("md");
  const [selectedDemo, setSelectedDemo] = useState<DemoType>("grid");
  const containerRef = useRef<HTMLDivElement>(null);

  // 获取断点
  const getBreakpoint = useCallback((width: number): Breakpoint => {
    if (width < 640) return "sm";
    if (width < 768) return "md";
    if (width < 1024) return "lg";
    if (width < 1280) return "xl";
    return "2xl";
  }, []);

  // 防抖函数
  const debounce = useCallback(<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // 更新屏幕尺寸
  const updateScreenSize = useCallback(() => {
    const width = window.innerWidth;
    setScreenSize(`${width}px`);
    setBreakpoint(getBreakpoint(width));
  }, [getBreakpoint]);

  // 监听屏幕尺寸变化
  useEffect(() => {
    const debouncedUpdate = debounce(updateScreenSize, 200);

    // 初始化
    updateScreenSize();

    window.addEventListener("resize", debouncedUpdate);
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      // 清除防抖定时器
      const timeoutId = (debouncedUpdate as any).timeoutId;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updateScreenSize, debounce]);

  
  const demos: Record<DemoType, DemoConfig> = {
    grid: {
      title: "响应式网格系统",
      description: "基于CSS Grid的响应式布局，自动适配不同屏幕尺寸",
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="p-4 bg-blue-100 rounded-lg text-center">
              <div className="text-lg font-semibold text-blue-900">Item {item}</div>
              <div className="text-sm text-blue-700 mt-1">响应式网格项</div>
            </div>
          ))}
        </div>
      )
    },
    navigation: {
      title: "移动端导航",
      description: "底部标签栏导航，支持触摸友好的交互体验",
      component: (
        <div className="max-w-md mx-auto">
          <div className="flex justify-around items-center p-4 bg-gray-100 rounded-lg">
            <button className="flex flex-col items-center p-2 text-blue-600">
              <div className="text-2xl mb-1">🏠</div>
              <span className="text-xs">首页</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-600">
              <div className="text-2xl mb-1">🔍</div>
              <span className="text-xs">搜索</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-600">
              <div className="text-2xl mb-1">❤️</div>
              <span className="text-xs">收藏</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-600">
              <div className="text-2xl mb-1">👤</div>
              <span className="text-xs">我的</span>
            </button>
          </div>
        </div>
      )
    },
    touch: {
      title: "触摸交互",
      description: "触摸友好的按钮和手势交互，支持触摸反馈效果",
      component: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg active:scale-95 transition-transform">
              大按钮 (44px+)
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg active:scale-95 transition-transform">
              中按钮
            </button>
            <button className="px-3 py-1.5 bg-purple-500 text-white rounded-lg active:scale-95 transition-transform">
              小按钮
            </button>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">触摸区域演示：</p>
            <div className="grid grid-cols-3 gap-2">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                <button
                  key={num}
                  className="p-4 bg-white border border-gray-300 rounded-lg active:bg-blue-100 active:border-blue-400 transition-colors"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    typography: {
      title: "响应式文字",
      description: "基于屏幕尺寸的自适应文字大小和间距",
      component: (
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            响应式标题 (H1)
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
            响应式标题 (H2)
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            这是响应式段落文字，会根据屏幕尺寸自动调整大小。在小屏幕上使用较小的字体，在大屏幕上使用较大的字体，确保最佳的阅读体验。
          </p>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs sm:text-sm text-yellow-800">
              💡 技术要点：使用 clamp() 函数实现平滑的文字缩放
            </p>
          </div>
        </div>
      )
    }
  };

  const currentDemo = demos[selectedDemo];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            响应式设计系统
          </h1>
          <p className="text-gray-600 text-lg">
            移动端优先的响应式设计解决方案，包含断点系统、触摸交互、移动端导航等核心功能
          </p>
        </div>

        {/* 屏幕信息 */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">当前屏幕信息</h3>
              <p className="text-blue-700">
                屏幕宽度: <span className="font-mono">{screenSize}</span> |
                断点: <span className="font-mono bg-blue-100 px-2 py-1 rounded">{breakpoint}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-600 mb-1">断点定义:</p>
              <p className="text-xs font-mono text-blue-600">
                sm: &lt;640px | md: &lt;768px | lg: &lt;1024px | xl: &lt;1280px
              </p>
            </div>
          </div>
        </div>

        {/* 功能选择 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">功能演示</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(demos).map(([key, demo]) => (
              <button
                key={key}
                onClick={() => setSelectedDemo(key as DemoType)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDemo === key
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {demo.title}
              </button>
            ))}
          </div>
        </div>

        {/* 演示区域 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{currentDemo.title}</h3>
            <p className="text-gray-600">{currentDemo.description}</p>
          </div>

          <div className="border-t pt-6">
            {currentDemo.component}
          </div>

          {/* 技术要点 */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">技术要点</h4>
            <div className="text-sm text-gray-600 space-y-1">
              {selectedDemo === "grid" && (
                <>
                  <p>• <strong>CSS Grid vs Flexbox</strong>: 根据布局需求选择合适的布局方案</p>
                  <p>• <strong>响应式断点</strong>: 使用 Tailwind CSS 的断点系统</p>
                  <p>• <strong>容器查询</strong>: 基于容器尺寸而非视口尺寸的响应式设计</p>
                </>
              )}
              {selectedDemo === "navigation" && (
                <>
                  <p>• <strong>底部导航</strong>: 遵循 iOS Human Interface Guidelines</p>
                  <p>• <strong>触摸区域</strong>: 最小 44px 触摸区域确保良好用户体验</p>
                  <p>• <strong>状态反馈</strong>: 使用不同颜色表示当前激活状态</p>
                </>
              )}
              {selectedDemo === "touch" && (
                <>
                  <p>• <strong>WCAG 2.1 AA标准</strong>: 确保无障碍访问性</p>
                  <p>• <strong>触摸反馈</strong>: 使用 CSS transform 和 GPU 加速</p>
                  <p>• <strong>手势支持</strong>: 实现长按、滑动等手势交互</p>
                </>
              )}
              {selectedDemo === "typography" && (
                <>
                  <p>• <strong>CSS clamp()</strong>: 动态计算文字大小</p>
                  <p>• <strong>Viewport Units</strong>: 使用 vh, vw 单位实现响应式</p>
                  <p>• <strong>渐进增强</strong>: 从基础功能开始，逐步增强</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 实现指南 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3">🎯 实现步骤</h3>
            <ol className="text-sm text-green-800 space-y-2">
              <li>1. 确定目标设备和屏幕尺寸范围</li>
              <li>2. 设计断点系统和网格布局</li>
              <li>3. 实现响应式组件和交互</li>
              <li>4. 测试不同设备和屏幕尺寸</li>
              <li>5. 优化性能和用户体验</li>
            </ol>
          </div>

          <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-3">📱 最佳实践</h3>
            <ul className="text-sm text-purple-800 space-y-2">
              <li>• 移动端优先的设计思路</li>
              <li>• 使用相对单位而非固定像素</li>
              <li>• 确保触摸区域足够大 (44px+)</li>
              <li>• 考虑横竖屏切换体验</li>
              <li>• 测试真实的移动设备</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
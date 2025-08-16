import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'hasVisited';

export default function FirstVisitWelcome() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem(STORAGE_KEY);
    if (hasVisited) return;

    // 标记为已访问
    localStorage.setItem(STORAGE_KEY, 'true');
    
    // 显示欢迎提示
    setShowWelcome(true);

    // 撒花动画逻辑
    const duration = 3000;
    const end = Date.now() + duration;
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 999999,
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffda79', '#a77dc2']
    };

    const randomInRange = (min: number, max: number) => 
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }});
      confetti({...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }});
    }, 200);

    // 5秒后自动关闭提示
    const autoCloseTimer = setTimeout(() => setShowWelcome(false), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(autoCloseTimer);
    };
  }, []);

  if (!showWelcome) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 max-w-sm w-full border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-blue-500">🎉</div>
          <h3 className="font-medium text-gray-900 dark:text-white">欢迎来到 React 场景实验室！</h3>
        </div>
        <button 
          onClick={() => setShowWelcome(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
        >
          ×
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        这里有 20+ 个 React 开发场景示例，点击左侧导航开始探索吧！
      </p>
    </div>
  );
}
    
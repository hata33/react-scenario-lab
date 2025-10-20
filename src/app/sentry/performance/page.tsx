"use client";

import Layout from "@/components/Layout";
import BackButton from "@/components/BackButton";
import { useState, useEffect, useCallback } from "react";

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'good' | 'warning' | 'poor';
}

interface NetworkRequest {
  url: string;
  method: string;
  duration: number;
  status: number;
  timestamp: number;
}

export default function PerformancePage() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [networkRequests, setNetworkRequests] = useState<NetworkRequest[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [customTransactions, setCustomTransactions] = useState<string[]>([]);

  const addResult = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults(prev => [`${timestamp}: ${message}`, ...prev].slice(0, 10));
  };

  // 获取 Web Vitals 指标
  const getWebVitals = useCallback(() => {
    const newMetrics: PerformanceMetric[] = [];

    // Largest Contentful Paint (LCP)
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    if (lcpEntries.length > 0) {
      const lastEntry = lcpEntries[lcpEntries.length - 1] as any;
      const lcp = lastEntry.startTime;
      newMetrics.push({
        name: 'LCP',
        value: Math.round(lcp),
        unit: 'ms',
        threshold: 2500,
        status: lcp < 2500 ? 'good' : lcp < 4000 ? 'warning' : 'poor'
      });
    }

    // First Input Delay (FID)
    const fidEntries = performance.getEntriesByType('first-input');
    if (fidEntries.length > 0) {
      const fid = (fidEntries[0] as any).processingStart - (fidEntries[0] as any).startTime;
      newMetrics.push({
        name: 'FID',
        value: Math.round(fid),
        unit: 'ms',
        threshold: 100,
        status: fid < 100 ? 'good' : fid < 300 ? 'warning' : 'poor'
      });
    }

    // Cumulative Layout Shift (CLS)
    const clsEntries = performance.getEntriesByType('layout-shift');
    let clsValue = 0;
    clsEntries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    newMetrics.push({
      name: 'CLS',
      value: Math.round(clsValue * 1000) / 1000,
      unit: '',
      threshold: 0.1,
      status: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'warning' : 'poor'
    });

    // First Contentful Paint (FCP)
    const fcpEntries = performance.getEntriesByType('paint');
    const fcpEntry = fcpEntries.find(entry => entry.name === 'first-contentful-paint');
    if (fcpEntry) {
      newMetrics.push({
        name: 'FCP',
        value: Math.round(fcpEntry.startTime),
        unit: 'ms',
        threshold: 1800,
        status: fcpEntry.startTime < 1800 ? 'good' : fcpEntry.startTime < 3000 ? 'warning' : 'poor'
      });
    }

    // Time to Interactive (TTI) - 简化版本
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      const navEntry = navEntries[0] as PerformanceNavigationTiming;
      // 使用 domInteractive 和 fetchStart 计算 TTI
      const tti = navEntry.domInteractive - navEntry.fetchStart;
      newMetrics.push({
        name: 'TTI',
        value: Math.round(tti),
        unit: 'ms',
        threshold: 3800,
        status: tti < 3800 ? 'good' : tti < 7300 ? 'warning' : 'poor'
      });
    }

    setMetrics(newMetrics);
    return newMetrics;
  }, []);

  // 获取网络请求信息
  const getNetworkRequests = useCallback(() => {
    const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const requests: NetworkRequest[] = entries.slice(-20).map(entry => ({
      url: entry.name.split('/').pop() || entry.name,
      method: 'GET', // Performance API 不提供方法信息
      duration: Math.round(entry.duration),
      status: 200, // Performance API 不提供状态码
      timestamp: Math.round(entry.startTime)
    }));
    setNetworkRequests(requests);
    return requests;
  }, []);

  // 开始性能监控
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    addResult("性能监控已启动", 'success');

    // 创建性能观察器
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
          addResult(`性能测量: ${entry.name} - ${Math.round(entry.duration)}ms`, 'info');
        }
      }
    });

    observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });

    // 定期更新指标
    const interval = setInterval(() => {
      getWebVitals();
      getNetworkRequests();
    }, 2000);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [getWebVitals, getNetworkRequests, addResult]);

  // 停止性能监控
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
    addResult("性能监控已停止", 'warning');
  }, [addResult]);

  // 模拟慢操作
  const simulateSlowOperation = async (operation: string) => {
    const startTime = performance.now();

    // 标记操作开始
    performance.mark(`${operation}-start`);
    addResult(`开始 ${operation} 操作...`, 'info');

    switch (operation) {
      case '计算密集型':
        // 模拟计算密集型操作
        await new Promise(resolve => {
          let result = 0;
          for (let i = 0; i < 100000000; i++) {
            result += Math.random();
          }
          setTimeout(resolve, 100);
        });
        break;

      case '网络请求':
        // 模拟网络请求
        try {
          const response = await fetch('https://httpbin.org/delay/2');
          await response.json();
        } catch (error) {
          addResult(`网络请求失败: ${error}`, 'error');
        }
        break;

      case 'DOM 操作':
        // 模拟大量 DOM 操作
        const container = document.getElementById('test-container');
        if (container) {
          for (let i = 0; i < 1000; i++) {
            const div = document.createElement('div');
            div.textContent = `测试元素 ${i}`;
            container.appendChild(div);
          }
          // 清理
          setTimeout(() => {
            container.innerHTML = '';
          }, 100);
        }
        break;

      case '内存分配':
        // 模拟内存分配
        const largeArray = new Array(1000000).fill(0).map(() => ({
          id: Math.random(),
          data: new Array(100).fill(Math.random())
        }));
        // 触发垃圾回收（如果可用）
        if ((window as any).gc) {
          (window as any).gc();
        }
        break;

      default:
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    const endTime = performance.now();
    performance.mark(`${operation}-end`);
    performance.measure(`${operation}-duration`, `${operation}-start`, `${operation}-end`);

    const duration = Math.round(endTime - startTime);
    addResult(`${operation} 操作完成，耗时: ${duration}ms`, duration > 1000 ? 'warning' : 'success');
  };

  // 添加自定义事务
  const addCustomTransaction = (name: string) => {
    const transaction = `${name} - ${new Date().toLocaleTimeString()}`;
    setCustomTransactions(prev => [transaction, ...prev].slice(0, 5));
    addResult(`自定义事务已添加: ${name}`, 'success');
  };

  // 清理测试结果
  const clearResults = () => {
    setTestResults([]);
    setCustomTransactions([]);
    addResult("测试结果已清空", 'info');
  };

  // 组件挂载时获取初始指标
  useEffect(() => {
    getWebVitals();
    getNetworkRequests();
  }, [getWebVitals, getNetworkRequests]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* 标题和返回按钮 */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <BackButton text="返回 Sentry" />
            <h1 className="text-2xl font-bold text-gray-900">⚡ 性能监控</h1>
          </div>
          <p className="text-gray-600">
            性能监控帮助开发者了解应用的性能表现，识别性能瓶颈并优化用户体验。
            Sentry 提供了完整的性能监控解决方案，包括 Web Vitals、数据库查询、API 响应时间等。
          </p>
        </div>

        {/* Web Vitals 指标 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Web Vitals 指标</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.name}
                className={`p-4 rounded-lg border ${
                  metric.status === 'good' ? 'bg-green-50 border-green-200' :
                  metric.status === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                    <p className="text-2xl font-bold mt-1">
                      {metric.value}
                      <span className="text-sm font-normal text-gray-600 ml-1">{metric.unit}</span>
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    metric.status === 'good' ? 'bg-green-200 text-green-800' :
                    metric.status === 'warning' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {metric.status === 'good' ? '良好' :
                     metric.status === 'warning' ? '警告' : '差'}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  阈值: {metric.threshold}{metric.unit}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={getWebVitals}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              刷新指标
            </button>
            <button
              onClick={() => {
                if (isMonitoring) {
                  stopMonitoring();
                } else {
                  startMonitoring();
                }
              }}
              className={`px-4 py-2 rounded text-white ${
                isMonitoring
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isMonitoring ? '停止监控' : '开始监控'}
            </button>
          </div>
        </div>

        {/* 性能测试控制台 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🧪 性能测试控制台</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <button
              onClick={() => simulateSlowOperation('计算密集型')}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              计算密集型
            </button>

            <button
              onClick={() => simulateSlowOperation('网络请求')}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              网络请求
            </button>

            <button
              onClick={() => simulateSlowOperation('DOM 操作')}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              DOM 操作
            </button>

            <button
              onClick={() => simulateSlowOperation('内存分配')}
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              内存分配
            </button>
          </div>

          {/* 隐藏的测试容器 */}
          <div id="test-container" className="hidden" />
        </div>

        {/* 网络请求监控 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🌐 网络请求监控</h2>
          <button
            onClick={getNetworkRequests}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
          >
            刷新网络请求
          </button>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    方法
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    耗时
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {networkRequests.map((request, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.url}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.duration}ms
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {networkRequests.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">
                暂无网络请求记录
              </p>
            )}
          </div>
        </div>

        {/* 自定义事务 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🏷️ 自定义事务</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="输入事务名称..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  if (input.value.trim()) {
                    addCustomTransaction(input.value.trim());
                    input.value = '';
                  }
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector('input') as HTMLInputElement;
                if (input?.value.trim()) {
                  addCustomTransaction(input.value.trim());
                  input.value = '';
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              添加事务
            </button>
          </div>

          <div className="space-y-2">
            {customTransactions.length === 0 ? (
              <p className="text-gray-500 text-sm">暂无自定义事务</p>
            ) : (
              customTransactions.map((transaction, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded text-sm text-blue-800">
                  {transaction}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 测试结果 */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">📝 测试结果</h2>
            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              清空结果
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-500 text-sm">暂无测试结果</p>
            ) : (
              testResults.map((result, index) => {
                const type = result.includes('错误') ? 'error' :
                             result.includes('成功') || result.includes('完成') ? 'success' :
                             result.includes('警告') ? 'warning' : 'info';

                return (
                  <div
                    key={index}
                    className={`text-sm p-2 rounded ${
                      type === 'error' ? 'bg-red-100 text-red-800' :
                      type === 'success' ? 'bg-green-100 text-green-800' :
                      type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {result}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 性能优化建议 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">💡 性能优化建议</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">前端优化</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>使用代码分割减少初始加载时间</li>
                <li>优化图片资源，使用 WebP 格式</li>
                <li>实现懒加载和预加载策略</li>
                <li>减少第三方库的依赖</li>
                <li>使用 Service Worker 缓存资源</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">后端优化</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>优化数据库查询和索引</li>
                <li>实现 API 响应缓存</li>
                <li>使用 CDN 加速静态资源</li>
                <li>启用 Gzip/Brotli 压缩</li>
                <li>监控和分析性能瓶颈</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
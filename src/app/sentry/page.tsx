"use client";

import Layout from "@/components/Layout";
import { useState } from "react";
import Link from "next/link";

export default function SentryPage() {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults(prev => [`${timestamp}: ${message}`, ...prev].slice(0, 10));
  };

  const triggerJavaScriptError = () => {
    try {
      // 故意触发一个 JavaScript 错误
      throw new Error("这是一个测试 JavaScript 错误");
    } catch (error) {
      addResult(`JavaScript 错误已触发: ${error}`, 'error');
      // 重新抛出错误，让 Sentry 捕获
      setTimeout(() => {
        throw error;
      }, 100);
    }
  };

  const triggerTypeError = () => {
    try {
      // 故意触发类型错误
      const obj = null as any;
      obj.someProperty.someMethod();
    } catch (error) {
      addResult(`类型错误已触发: ${error}`, 'error');
      setTimeout(() => {
        throw error;
      }, 100);
    }
  };

  const triggerPromiseRejection = () => {
    addResult("Promise 拒绝已触发", 'warning');
    // 触发未处理的 Promise 拒绝
    Promise.reject(new Error("这是一个未处理的 Promise 拒绝"));
  };

  const triggerAsyncError = async () => {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("异步操作失败"));
        }, 100);
      });
    } catch (error) {
      addResult(`异步错误已触发: ${error}`, 'error');
      throw error;
    }
  };

  const simulateSlowOperation = async () => {
    addResult("开始慢操作模拟...", 'info');
    await new Promise(resolve => setTimeout(resolve, 2000));
    addResult("慢操作完成", 'success');
  };

  const simulateNetworkError = async () => {
    try {
      addResult("触发网络错误...", 'warning');
      const response = await fetch('/api/nonexistent-endpoint');
      await response.json();
    } catch (error) {
      addResult(`网络错误已触发: ${error}`, 'error');
      throw error;
    }
  };

  const clearResults = () => {
    setTestResults([]);
    addResult("测试结果已清空", 'info');
  };

  const sentryFeatures = [
    {
      title: "错误边界",
      description: "捕获 React 组件中的错误并优雅降级",
      path: "/sentry/error-boundary",
      icon: "🛡️"
    },
    {
      title: "性能监控",
      description: "监控页面加载时间、API 响应时间等性能指标",
      path: "/sentry/performance",
      icon: "⚡"
    },
    {
      title: "面包屑追踪",
      description: "记录用户操作路径，帮助重现错误场景",
      path: "/sentry/breadcrumbs",
      icon: "🍞"
    },
    {
      title: "版本追踪",
      description: "关联错误与发布版本，快速定位问题",
      path: "/sentry/releases",
      icon: "🏷️"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* 标题和说明 */}
        <div className="bg-white border rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">🔍 Sentry 错误监控</h1>
          <p className="text-gray-600 mb-4">
            Sentry 是一个开源的错误监控平台，帮助开发者实时发现、诊断和修复错误。
            本页面演示了如何集成和使用 Sentry 进行错误监控。
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">当前环境配置</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• Next.js 15 + React 19</p>
              <p>• 自动错误捕获</p>
              <p>• 性能监控集成</p>
              <p>• 面包屑追踪</p>
            </div>
          </div>
        </div>

        {/* 功能卡片 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Sentry 功能演示</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sentryFeatures.map((feature) => (
              <Link
                key={feature.path}
                href={feature.path}
                className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 错误测试控制台 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🧪 错误测试控制台</h2>
          <p className="text-gray-600 mb-4">
            点击下面的按钮来触发不同类型的错误，这些错误会被 Sentry 自动捕获并发送到监控平台。
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            <button
              onClick={triggerJavaScriptError}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              JavaScript 错误
            </button>

            <button
              onClick={triggerTypeError}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            >
              类型错误
            </button>

            <button
              onClick={triggerPromiseRejection}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              Promise 拒绝
            </button>

            <button
              onClick={triggerAsyncError}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              异步错误
            </button>

            <button
              onClick={simulateSlowOperation}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              慢操作
            </button>

            <button
              onClick={simulateNetworkError}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
            >
              网络错误
            </button>

            <button
              onClick={() => {
                addResult("测试消息已记录", 'info');
                console.log("这是一个测试消息，用于验证 Sentry 的面包屑功能");
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              记录消息
            </button>

            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              清空结果
            </button>
          </div>

          {/* 测试结果显示 */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <h3 className="font-semibold mb-3">测试结果</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {testResults.length === 0 ? (
                <p className="text-gray-500 text-sm">暂无测试结果，请点击上方按钮开始测试</p>
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
        </div>

        {/* 配置说明 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">⚙️ Sentry 配置说明</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">环境变量配置</h3>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">主要功能</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li><strong>自动错误捕获</strong>: JavaScript 错误、Promise 拒绝、网络错误等</li>
                <li><strong>性能监控</strong>: 页面加载时间、Core Web Vitals、数据库查询时间</li>
                <li><strong>用户反馈</strong>: 收集用户反馈和错误报告</li>
                <li><strong>发布追踪</strong>: 关联错误与发布版本，快速定位问题</li>
                <li><strong>告警通知</strong>: 实时告警，支持多种通知方式</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                <strong>注意:</strong> 确保 SENTRY_DSN 已正确配置，否则错误无法发送到 Sentry 平台。
                在开发环境中，Sentry 可能不会发送所有错误以避免噪音。
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
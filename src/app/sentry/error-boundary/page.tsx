"use client";

import Layout from "@/components/Layout";
import BackButton from "@/components/BackButton";
import { useState, Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary 捕获到错误:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-4">
            🚨 组件发生错误
          </h2>
          <div className="bg-red-100 p-4 rounded mb-4">
            <p className="text-red-900 font-mono text-sm">
              错误: {this.state.error?.message}
            </p>
            {this.state.errorInfo && (
              <details className="mt-2">
                <summary className="cursor-pointer text-red-700 font-medium">
                  查看详细错误信息
                </summary>
                <pre className="mt-2 text-xs text-red-800 overflow-x-auto">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined, errorInfo: undefined })}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function ProblematicComponent({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    throw new Error("这是一个故意触发的组件错误");
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 className="font-semibold text-green-800">✅ 组件正常工作</h3>
      <p className="text-green-700 text-sm mt-1">
        这个组件正在正常渲染中。
      </p>
    </div>
  );
}

function NetworkErrorComponent({ shouldError }: { shouldError: boolean }) {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (shouldError) {
        // 故意请求一个不存在的端点
        const response = await fetch('/api/nonexistent-endpoint');
        if (!response.ok) {
          throw new Error(`网络请求失败: ${response.status}`);
        }
        const result = await response.json();
        setData(JSON.stringify(result));
      } else {
        // 模拟成功的网络请求
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(JSON.stringify({ message: "数据获取成功", timestamp: Date.now() }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误");
      throw err; // 重新抛出错误，让 ErrorBoundary 捕获
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-semibold text-blue-800 mb-3">🌐 网络请求组件</h3>

      <button
        onClick={fetchData}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 mb-3"
      >
        {loading ? "请求中..." : "发起网络请求"}
      </button>

      {data && (
        <div className="bg-green-100 p-3 rounded text-sm text-green-800">
          <strong>响应数据:</strong> {data}
        </div>
      )}

      {error && (
        <div className="bg-red-100 p-3 rounded text-sm text-red-800">
          <strong>错误:</strong> {error}
        </div>
      )}
    </div>
  );
}

export default function ErrorBoundaryPage() {
  const [shouldError1, setShouldError1] = useState(false);
  const [shouldError2, setShouldError2] = useState(false);
  const [shouldNetworkError, setShouldNetworkError] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setResults(prev => [`${new Date().toLocaleTimeString()}: ${message}`, ...prev].slice(0, 5));
  };

  const triggerConsoleError = () => {
    addResult("控制台错误已触发");
    console.error("这是一个控制台错误测试");
  };

  const triggerUncaughtError = () => {
    addResult("未捕获错误已触发");
    setTimeout(() => {
      throw new Error("这是一个未捕获的错误");
    }, 100);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* 标题和返回按钮 */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <BackButton text="返回 Sentry" />
            <h1 className="text-2xl font-bold text-gray-900">🛡️ React 错误边界</h1>
          </div>
          <p className="text-gray-600">
            React 错误边界是 React 组件，可以捕获其子组件树中任何地方的 JavaScript 错误，
            记录错误并显示回退 UI，而不是崩溃整个组件树。
          </p>
        </div>

        {/* 错误边界演示 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">错误边界演示</h2>

          {/* 第一个错误边界 */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">错误边界 #1 - 组件渲染错误</h3>
            <ErrorBoundary>
              <div className="space-y-3">
                <button
                  onClick={() => setShouldError1(!shouldError1)}
                  className={`px-4 py-2 rounded transition-colors ${
                    shouldError1
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {shouldError1 ? "触发错误" : "恢复正常"}
                </button>

                <ErrorBoundary>
                  <ProblematicComponent shouldError={shouldError1} />
                </ErrorBoundary>
              </div>
            </ErrorBoundary>
          </div>

          {/* 第二个错误边界 */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">错误边界 #2 - 嵌套组件错误</h3>
            <ErrorBoundary>
              <div className="space-y-3">
                <button
                  onClick={() => setShouldError2(!shouldError2)}
                  className={`px-4 py-2 rounded transition-colors ${
                    shouldError2
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {shouldError2 ? "触发嵌套错误" : "恢复正常"}
                </button>

                <div className="border rounded p-4">
                  <p className="text-sm text-gray-600 mb-3">这是一个包含错误边界的嵌套组件:</p>
                  <ErrorBoundary>
                    <div className="border-l-4 border-gray-300 pl-4">
                      <ErrorBoundary>
                        <ProblematicComponent shouldError={shouldError2} />
                      </ErrorBoundary>
                    </div>
                  </ErrorBoundary>
                </div>
              </div>
            </ErrorBoundary>
          </div>

          {/* 网络错误边界 */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">错误边界 #3 - 网络请求错误</h3>
            <ErrorBoundary>
              <div className="space-y-3">
                <button
                  onClick={() => setShouldNetworkError(!shouldNetworkError)}
                  className={`px-4 py-2 rounded transition-colors ${
                    shouldNetworkError
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-indigo-500 text-white hover:bg-indigo-600'
                  }`}
                >
                  {shouldNetworkError ? "触发网络错误" : "正常网络请求"}
                </button>

                <NetworkErrorComponent shouldError={shouldNetworkError} />
              </div>
            </ErrorBoundary>
          </div>
        </div>

        {/* 全局错误测试 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">全局错误测试</h2>
          <p className="text-gray-600 mb-4">
            这些错误不会被错误边界捕获，但会被 Sentry 全局错误处理器捕获。
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={triggerConsoleError}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              控制台错误
            </button>

            <button
              onClick={triggerUncaughtError}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              未捕获错误
            </button>

            <button
              onClick={() => {
                addResult("Promise 拒绝已触发");
                Promise.reject(new Error("这是一个 Promise 拒绝"));
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Promise 拒绝
            </button>
          </div>

          {/* 测试结果 */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <h3 className="font-semibold mb-3">测试结果</h3>
            <div className="space-y-1">
              {results.length === 0 ? (
                <p className="text-gray-500 text-sm">暂无测试结果</p>
              ) : (
                results.map((result, index) => (
                  <div key={index} className="text-sm p-2 bg-blue-100 text-blue-800 rounded">
                    {result}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 错误边界最佳实践 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">错误边界最佳实践</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">✅ 推荐做法</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>在应用顶层使用错误边界作为最后防线</li>
                <li>为关键功能模块单独设置错误边界</li>
                <li>提供有意义的错误信息和恢复选项</li>
                <li>记录错误详情用于调试</li>
                <li>考虑用户体验，避免应用完全崩溃</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">❌ 避免做法</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>不要在错误边界的事件处理器中依赖错误边界</li>
                <li>不要在服务端渲染中使用错误边界</li>
                <li>不要用错误边界处理流程控制错误</li>
                <li>不要忽略错误信息</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                <strong>Sentry 集成:</strong> 错误边界可以与 Sentry 配合使用，
                自动捕获组件错误并上报，提供完整的错误上下文和堆栈跟踪信息。
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
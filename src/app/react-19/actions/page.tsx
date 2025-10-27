"use client";

import { useState } from "react";
import React from "react";
import Layout from "@/components/Layout";

export default function ActionsPage() {
  const [selectedDemo, setSelectedDemo] = useState('useActionState');

  const demos = [
    {
      id: 'useActionState',
      title: 'useActionState',
      description: '处理异步操作状态和结果',
      emoji: '📝',
      difficulty: '初级'
    },
    {
      id: 'useOptimistic',
      title: 'useOptimistic',
      description: '实现乐观更新，提升用户体验',
      emoji: '🚀',
      difficulty: '中级'
    },
    {
      id: 'useFormStatus',
      title: 'useFormStatus',
      description: '获取表单提交状态',
      emoji: '📊',
      difficulty: '初级'
    },
    {
      id: 'useTransition',
      title: 'useTransition',
      description: '并发渲染，避免界面阻塞',
      emoji: '🔄',
      difficulty: '高级'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 max-w-7xl mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">⚡</span>
            Actions & Hooks
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 font-medium">
            React 19 Actions 生态系统，包含 useActionState、useOptimistic、useFormStatus、useTransition 等 Hook
          </p>
        </div>

        {/* 3W 法则解析 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-100 mb-6">🎯 3W 法则解析</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-200 mb-3">
                📋 What (是什么)
              </h3>
              <p className="text-gray-800 dark:text-gray-300 font-medium">
                Actions 是 React 19 中简化异步数据变更的新机制，配套提供 useActionState、useOptimistic、useFormStatus、useTransition 等 Hook，形成完整的异步操作生态系统。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-200 mb-3">
                🎯 Why (为什么)
              </h3>
              <p className="text-gray-800 dark:text-gray-300 font-medium">
                解决传统表单处理复杂、状态管理繁琐、用户体验不佳的问题。通过提供标准化的异步操作模式和内置的 pending 状态管理，大幅简化了开发复杂度。
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-200 mb-3">
                ⏰ When (何时用)
              </h3>
              <p className="text-gray-800 dark:text-gray-300 font-medium">
                处理表单提交、数据变更、乐观更新、并发渲染场景。特别适合需要良好用户体验的交互式应用，如社交平台、电商系统、协作工具等。
              </p>
            </div>
          </div>
        </div>

        {/* 解决的问题 */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-100 mb-4">❌ 解决的问题</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-200 mb-3">传统方案的痛点</h3>
              <ul className="space-y-2 text-gray-800 dark:text-gray-300 font-medium">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span><strong>状态管理复杂</strong>：需要手动管理 loading、error、success 状态</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span><strong>用户体验差</strong>：提交时界面冻结，缺乏即时反馈</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span><strong>代码冗余</strong>：每个异步操作都需要重复的状态管理代码</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span><strong>错误处理繁琐</strong>：需要手动处理各种异步错误情况</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-200 mb-3">React 19 的解决方案</h3>
              <ul className="space-y-2 text-gray-800 dark:text-gray-300 font-medium">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span><strong>内置状态管理</strong>：自动处理 pending、error、success 状态</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span><strong>乐观更新</strong>：立即显示预期结果，提升响应性</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span><strong>并发渲染</strong>：避免界面阻塞，保持交互流畅</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span><strong>标准化接口</strong>：统一的 Actions 模式，减少学习成本</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Demo 选择器 */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setSelectedDemo(demo.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedDemo === demo.id
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              <span className="mr-2">{demo.emoji}</span>
              {demo.title}
              <span className={`ml-2 text-xs px-2 py-1 rounded ${demo.difficulty === '初级' ? 'bg-green-100 text-green-800' :
                  demo.difficulty === '中级' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                {demo.difficulty}
              </span>
            </button>
          ))}
        </div>

        {/* Demo 展示区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {selectedDemo === 'useActionState' && <UseActionStateDemo />}
          {selectedDemo === 'useOptimistic' && <UseOptimisticDemo />}
          {selectedDemo === 'useFormStatus' && <UseFormStatusDemo />}
          {selectedDemo === 'useTransition' && <UseTransitionDemo />}
        </div>
      </div>
    </Layout>
  );
}

// useActionState Demo 组件
function UseActionStateDemo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<{ error?: string; success?: boolean; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    // 模拟异步提交
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!name || !email) {
      setResult({ error: '请填写所有字段' });
      setIsPending(false);
      return;
    }

    if (!email.includes('@')) {
      setResult({ error: '请输入有效的邮箱地址' });
      setIsPending(false);
      return;
    }

    setResult({ success: true, message: `欢迎 ${name}！注册成功` });
    setIsPending(false);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        📝 useActionState 演示
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        useActionState Hook 帮助管理异步操作的状态，包括 pending、error、success 状态。
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            姓名
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="请输入姓名"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            邮箱
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="请输入邮箱"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${isPending
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          {isPending ? '提交中...' : '注册'}
        </button>

        {result?.error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md">
            {result.error}
          </div>
        )}

        {result?.success && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-md">
            {result.message}
          </div>
        )}
      </form>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">useActionState 的优势：</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• 自动管理 pending 状态</li>
          <li>• 统一的错误处理机制</li>
          <li>• 减少样板代码</li>
          <li>• 与 Server Actions 无缝集成</li>
        </ul>
      </div>
    </div>
  );
}

// useOptimistic Demo 组件
function UseOptimisticDemo() {
  type Todo = { id: number; text: string; completed: boolean; optimistic?: boolean };

  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '学习 React 19 新特性', completed: false }
  ]);
  const [optimisticTodos, setOptimisticTodos] = useState<Todo[]>(todos);
  const [newTodo, setNewTodo] = useState('');
  const [isPending, setIsPending] = useState(false);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setIsPending(true);

    // 乐观更新：立即显示新项目
    const optimisticItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      optimistic: true
    };

    setOptimisticTodos(prev => [...prev, optimisticItem]);

    // 模拟实际异步操作
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 实际更新
    setTodos(prev => [...prev, { id: Date.now(), text: newTodo, completed: false }]);
    setOptimisticTodos(prev =>
      prev.map(item =>
        item.id === optimisticItem.id
          ? { ...item, optimistic: false }
          : item
      )
    );

    setNewTodo('');
    setIsPending(false);
  };

  const toggleTodo = async (id: number) => {
    // 乐观更新：立即切换状态
    setOptimisticTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        🚀 useOptimistic 演示
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        useOptimistic Hook 实现乐观更新，立即显示用户的操作结果，提升响应性。
      </p>

      <form onSubmit={addTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            disabled={isPending}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="添加新任务..."
          />
          <button
            type="submit"
            disabled={isPending || !newTodo.trim()}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${isPending || !newTodo.trim()
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
          >
            {isPending ? '添加中...' : '添加'}
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {optimisticTodos.map(todo => (
          <div
            key={todo.id}
            className={`flex items-center gap-3 p-3 rounded-md border ${todo.optimistic
                ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600'
              }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
              }`}>
              {todo.text}
            </span>
            {todo.optimistic && (
              <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                乐观更新中...
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">乐观更新的优势：</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• 立即响应用户操作</li>
          <li>• 提升用户体验和感知性能</li>
          <li>• 适用于网络延迟场景</li>
          <li>• 自动回滚机制处理失败情况</li>
        </ul>
      </div>
    </div>
  );
}

// useFormStatus Demo 组件
function UseFormStatusDemo() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        📊 useFormStatus 演示
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        useFormStatus Hook 提供表单提交状态信息，用于在子组件中获取父表单的状态。
      </p>

      <form className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            消息内容
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            rows={4}
            placeholder="输入你的消息..."
          />
        </div>

        <SubmitButton />

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            💡 注意：SubmitButton 组件通过 useFormStatus Hook 获取表单的 pending 状态，
            不需要通过 props 传递状态，简化了组件间的通信。
          </p>
        </div>
      </form>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">useFormStatus 的优势：</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• 自动获取表单状态</li>
          <li>• 简化组件间通信</li>
          <li>• 无需手动状态传递</li>
          <li>• 与 Actions 完美集成</li>
        </ul>
      </div>
    </div>
  );
}

// SubmitButton 子组件
function SubmitButton() {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPending(true);

    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPending(false);
  };

  return (
    <button
      type="submit"
      disabled={isPending}
      onClick={handleSubmit}
      className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${isPending
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
    >
      {isPending ? '发送中...' : '发送消息'}
    </button>
  );
}

// useTransition Demo 组件
function UseTransitionDemo() {
  type SearchResult = { id: number; title: string; description: string; category: string };

  const [isPending, startTransition] = React.useTransition();
  const [input, setInput] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState('');

  const handleSearch = (value: string) => {
    setInput(value);

    // 使用 startTransition 包装非紧急的状态更新
    startTransition(async () => {
      setQuery(value);

      if (!value.trim()) {
        setResults([]);
        return;
      }

      // 模拟大量数据搜索
      await new Promise(resolve => setTimeout(resolve, 800));

      // 生成模拟搜索结果
      const mockResults = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `搜索结果 ${i + 1}: ${value}`,
        description: `这是关于 "${value}" 的详细描述内容`,
        category: ['技术', '教程', '文档', '示例'][Math.floor(Math.random() * 4)]
      }));

      setResults(mockResults);
    });
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        🔄 useTransition 演示
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        useTransition Hook 处理并发渲染，避免界面阻塞，保持交互流畅。
      </p>

      <div className="mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${isPending ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          placeholder="搜索大量数据..."
        />
        {isPending && (
          <div className="mt-2 text-sm text-blue-600 dark:text-blue-400 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            正在搜索...
          </div>
        )}
      </div>

      <div className={`space-y-2 max-h-96 overflow-y-auto transition-opacity ${isPending ? 'opacity-60' : 'opacity-100'
        }`}>
        {results.length > 0 ? (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              找到 {results.length} 个结果 for "{query}"
            </p>
            {results.map(result => (
              <div
                key={result.id}
                className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-gray-900 dark:text-white">{result.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{result.description}</p>
                <span className="inline-block mt-2 text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">
                  {result.category}
                </span>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            {query ? '没有找到相关结果' : '输入关键词开始搜索'}
          </p>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">useTransition 的优势：</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• 输入立即响应，不被阻塞</li>
          <li>• 并发渲染，数据处理在后台进行</li>
          <li>• 通过 isPending 提供视觉反馈</li>
          <li>• 避免长时间阻塞主线程</li>
        </ul>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";

export default function ActionsPage() {
	const [selectedDemo, setSelectedDemo] = useState("useActionState");

	const demos = [
		{
			id: "useActionState",
			title: "useActionState",
			description: "处理异步操作状态和结果",
			emoji: "📝",
			difficulty: "初级",
		},
		{
			id: "useOptimistic",
			title: "useOptimistic",
			description: "实现乐观更新，提升用户体验",
			emoji: "🚀",
			difficulty: "中级",
		},
		{
			id: "useFormStatus",
			title: "useFormStatus",
			description: "获取表单提交状态",
			emoji: "📊",
			difficulty: "初级",
		},
		{
			id: "serverFunctions",
			title: "Server Functions",
			description: "服务端函数与客户端组件集成",
			emoji: "🖥️",
			difficulty: "中级",
		},
		{
			id: "useTransition",
			title: "useTransition",
			description: "并发渲染，避免界面阻塞",
			emoji: "🔄",
			difficulty: "高级",
		},
	];

	return (
		<Layout>
			<div className="mx-auto min-h-screen max-w-7xl bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8 dark:from-gray-900 dark:to-gray-800">
				{/* 页面头部 */}
				<div className="mb-12 text-center">
					<h1 className="mb-4 flex items-center justify-center gap-3 font-bold text-4xl text-gray-900 dark:text-white">
						<span className="text-5xl">⚡</span>
						Actions & Hooks
					</h1>
					<p className="mb-6 font-medium text-gray-700 text-lg dark:text-gray-300">
						React 19 Actions 生态系统，包含 useActionState、useOptimistic、useFormStatus、useTransition 等 Hook
					</p>
				</div>

				{/* 3W 法则解析 */}
				<div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
					<h2 className="mb-6 font-bold text-2xl text-blue-800 dark:text-blue-100">🎯 3W 法则解析</h2>
					<div className="grid gap-6 md:grid-cols-3">
						<div className="rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-700 dark:bg-gray-800">
							<h3 className="mb-3 font-semibold text-blue-700 text-lg dark:text-blue-200">📋 What (是什么)</h3>
							<p className="font-medium text-gray-800 dark:text-gray-300">
								Actions 是 React 19 中简化异步数据变更的新机制，配套提供
								useActionState、useOptimistic、useFormStatus、useTransition 等 Hook，形成完整的异步操作生态系统。
							</p>
						</div>
						<div className="rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-700 dark:bg-gray-800">
							<h3 className="mb-3 font-semibold text-blue-700 text-lg dark:text-blue-200">🎯 Why (为什么)</h3>
							<p className="font-medium text-gray-800 dark:text-gray-300">
								解决传统表单处理复杂、状态管理繁琐、用户体验不佳的问题。通过提供标准化的异步操作模式和内置的 pending
								状态管理，大幅简化了开发复杂度。
							</p>
						</div>
						<div className="rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-700 dark:bg-gray-800">
							<h3 className="mb-3 font-semibold text-blue-700 text-lg dark:text-blue-200">⏰ When (何时用)</h3>
							<p className="font-medium text-gray-800 dark:text-gray-300">
								处理表单提交、数据变更、乐观更新、并发渲染场景。特别适合需要良好用户体验的交互式应用，如社交平台、电商系统、协作工具等。
							</p>
						</div>
					</div>
				</div>

				{/* 解决的问题 */}
				<div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
					<h2 className="mb-4 font-bold text-2xl text-red-800 dark:text-red-100">❌ 解决的问题</h2>
					<div className="grid gap-6 md:grid-cols-2">
						<div>
							<h3 className="mb-3 font-semibold text-lg text-red-700 dark:text-red-200">传统方案的痛点</h3>
							<ul className="space-y-2 font-medium text-gray-800 dark:text-gray-300">
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>状态管理复杂</strong>：需要手动管理 loading、error、success 状态
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>用户体验差</strong>：提交时界面冻结，缺乏即时反馈
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>代码冗余</strong>：每个异步操作都需要重复的状态管理代码
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>错误处理繁琐</strong>：需要手动处理各种异步错误情况
									</span>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="mb-3 font-semibold text-green-700 text-lg dark:text-green-200">React 19 的解决方案</h3>
							<ul className="space-y-2 font-medium text-gray-800 dark:text-gray-300">
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>内置状态管理</strong>：自动处理 pending、error、success 状态
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>乐观更新</strong>：立即显示预期结果，提升响应性
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>并发渲染</strong>：避免界面阻塞，保持交互流畅
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>标准化接口</strong>：统一的 Actions 模式，减少学习成本
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Demo 选择器 */}
				<div className="mb-8 flex flex-wrap justify-center gap-4">
					{demos.map((demo) => (
						<button
							key={demo.id}
							onClick={() => setSelectedDemo(demo.id)}
							className={`rounded-lg px-6 py-3 font-medium transition-all ${
								selectedDemo === demo.id
									? "scale-105 bg-blue-500 text-white shadow-lg"
									: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
							}`}
						>
							<span className="mr-2">{demo.emoji}</span>
							{demo.title}
							<span
								className={`ml-2 rounded px-2 py-1 text-xs ${
									demo.difficulty === "初级"
										? "bg-green-100 text-green-800"
										: demo.difficulty === "中级"
											? "bg-yellow-100 text-yellow-800"
											: "bg-red-100 text-red-800"
								}`}
							>
								{demo.difficulty}
							</span>
						</button>
					))}
				</div>

				{/* Demo 展示区域 */}
				<div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
					{selectedDemo === "useActionState" && <UseActionStateDemo />}
					{selectedDemo === "useOptimistic" && <UseOptimisticDemo />}
					{selectedDemo === "useFormStatus" && <UseFormStatusDemo />}
					{selectedDemo === "serverFunctions" && <ServerFunctionsDemo />}
					{selectedDemo === "useTransition" && <UseTransitionDemo />}
				</div>
			</div>

			{/* 官方代码示例 */}
			<div className="mt-12 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
				<h2 className="mb-6 font-bold text-2xl text-gray-900 dark:text-white">📚 官方代码示例</h2>
				<p className="mb-6 text-gray-600 dark:text-gray-300">
					以下示例来自 React 官方文档，展示了 Actions 生态系统的最佳实践
				</p>

				<div className="grid gap-6 lg:grid-cols-2">
					{/* 渐进增强示例 */}
					<div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
						<h3 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">🚀 渐进增强支持</h3>
						<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-xs">
							{`// useActionState 支持 permalink
"use client";
import {updateName} from './actions';

function UpdateName() {
  const [, submitAction] = useActionState(
    updateName,
    null,
    '/name/update'  // JavaScript 加载前的回退 URL
  );

  return (
    <form action={submitAction}>
      <input name="name" />
      <button type="submit">更新</button>
    </form>
  );
}`}
						</pre>
						<p className="text-gray-600 text-xs dark:text-gray-400">即使 JavaScript 未加载，表单也能正常工作</p>
					</div>

					{/* 多按钮表单示例 */}
					<div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
						<h3 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">🎯 多按钮表单处理</h3>
						<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-xs">
							{`function ArticleEditor() {
  function publish(formData) {
    const content = formData.get("content");
    const button = formData.get("button");
    // 根据按钮类型执行不同操作
    if (button === "publish") {
      return publishArticle(content);
    }
    return saveDraft(content);
  }

  return (
    <form action={publish}>
      <textarea name="content" />
      <button name="button" value="publish">发布</button>
      <button formAction={save}>保存草稿</button>
    </form>
  );
}`}
						</pre>
						<p className="text-gray-600 text-xs dark:text-gray-400">使用 formAction 处理不同的提交类型</p>
					</div>

					{/* useTransition 与 Actions 结合 */}
					<div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
						<h3 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">⚡ useTransition + Actions</h3>
						<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-xs">
							{`function LikeButton() {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      await incrementLike(); // Server Function
      // UI 会在后台更新，不阻塞用户交互
    });
  };

  return (
    <button onClick={onClick} disabled={isPending}>
      {isPending ? "点赞中..." : "👍 点赞"}
    </button>
  );
}`}
						</pre>
						<p className="text-gray-600 text-xs dark:text-gray-400">非表单操作的异步状态管理</p>
					</div>

					{/* 传递额外参数 */}
					<div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
						<h3 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">📦 传递额外参数</h3>
						<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-xs">
							{`function AddToCart({productId}) {
  async function addToCart(productId, formData) {
    "use server";
    const quantity = formData.get("quantity");
    await updateCart(productId, quantity);
  }

  // 使用 bind 预设参数
  const addProductToCart = addToCart.bind(null, productId);

  return (
    <form action={addProductToCart}>
      <input name="quantity" type="number" defaultValue="1" />
      <button type="submit">加入购物车</button>
    </form>
  );
}`}
						</pre>
						<p className="text-gray-600 text-xs dark:text-gray-400">使用 bind 方法传递额外参数给 Server Function</p>
					</div>

					{/* 表单数据访问 */}
					<div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
						<h3 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">📊 访问表单数据</h3>
						<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-xs">
							{`function SubmitButton() {
  const { pending, data } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? "提交中..." : "提交"}
      {data && (
        <p className="text-sm text-gray-500">
          正在提交: {data.get("username")}
        </p>
      )}
    </button>
  );
}`}
						</pre>
						<p className="text-gray-600 text-xs dark:text-gray-400">useFormStatus 可以访问表单提交的数据</p>
					</div>

					{/* 错误处理 */}
					<div className="rounded-lg border border-gray-200 p-4 dark:border-gray-600">
						<h3 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">⚠️ 错误处理最佳实践</h3>
						<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-xs">
							{`// Server Function
"use server";
export async function signup(prevState, formData) {
  const email = formData.get("email");
  try {
    await createUser(email);
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

// Client Component
function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, null);

  return (
    <form action={formAction}>
      <input name="email" />
      <button disabled={isPending}>注册</button>
      {state?.error && <p className="error">{state.error}</p>}
    </form>
  );
}`}
						</pre>
						<p className="text-gray-600 text-xs dark:text-gray-400">统一的错误处理模式</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}

// useActionState Demo 组件
function UseActionStateDemo() {
	// 模拟 Server Function
	async function submitForm(
		_previousState: { error?: string; success?: boolean; message?: string } | null,
		formData: FormData,
	) {
		// 模拟异步提交
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;

		if (!name || !email) {
			return { error: "请填写所有字段" };
		}

		if (!email.includes("@")) {
			return { error: "请输入有效的邮箱地址" };
		}

		return { success: true, message: `欢迎 ${name}！注册成功` };
	}

	const [state, formAction, isPending] = React.useActionState(submitForm, null);

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">📝 useActionState 演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">
				useActionState Hook 帮助管理异步操作的状态，包括 pending、error、success 状态。
			</p>

			<form action={formAction} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300">姓名</label>
					<input
						type="text"
						name="name"
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						placeholder="请输入姓名"
					/>
				</div>

				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300">邮箱</label>
					<input
						type="email"
						name="email"
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						placeholder="请输入邮箱"
					/>
				</div>

				<button
					type="submit"
					disabled={isPending}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						isPending ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{isPending ? "提交中..." : "注册"}
				</button>

				{state?.error && (
					<div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
						{state.error}
					</div>
				)}

				{state?.success && (
					<div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
						{state.message}
					</div>
				)}
			</form>

			<div className="mt-6 rounded-md bg-gray-50 p-4 dark:bg-gray-700">
				<h4 className="mb-2 font-semibold text-gray-900 dark:text-white">useActionState 的优势：</h4>
				<ul className="space-y-1 text-gray-600 text-sm dark:text-gray-300">
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

	const [todos, setTodos] = useState<Todo[]>([{ id: 1, text: "学习 React 19 新特性", completed: false }]);
	const [optimisticTodos, setOptimisticTodos] = useState<Todo[]>(todos);
	const [newTodo, setNewTodo] = useState("");
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
			optimistic: true,
		};

		setOptimisticTodos((prev) => [...prev, optimisticItem]);

		// 模拟实际异步操作
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// 实际更新
		setTodos((prev) => [...prev, { id: Date.now(), text: newTodo, completed: false }]);
		setOptimisticTodos((prev) =>
			prev.map((item) => (item.id === optimisticItem.id ? { ...item, optimistic: false } : item)),
		);

		setNewTodo("");
		setIsPending(false);
	};

	const toggleTodo = async (id: number) => {
		// 乐观更新：立即切换状态
		setOptimisticTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));

		setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));

		// 模拟异步操作
		await new Promise((resolve) => setTimeout(resolve, 500));
	};

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">🚀 useOptimistic 演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">
				useOptimistic Hook 实现乐观更新，立即显示用户的操作结果，提升响应性。
			</p>

			<form onSubmit={addTodo} className="mb-6">
				<div className="flex gap-2">
					<input
						type="text"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						disabled={isPending}
						className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						placeholder="添加新任务..."
					/>
					<button
						type="submit"
						disabled={isPending || !newTodo.trim()}
						className={`rounded-md px-4 py-2 font-medium transition-colors ${
							isPending || !newTodo.trim()
								? "cursor-not-allowed bg-gray-400 text-gray-200"
								: "bg-blue-500 text-white hover:bg-blue-600"
						}`}
					>
						{isPending ? "添加中..." : "添加"}
					</button>
				</div>
			</form>

			<div className="space-y-2">
				{optimisticTodos.map((todo) => (
					<div
						key={todo.id}
						className={`flex items-center gap-3 rounded-md border p-3 ${
							todo.optimistic
								? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
								: "border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800"
						}`}
					>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => toggleTodo(todo.id)}
							className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<span
							className={`flex-1 ${todo.completed ? "text-gray-500 line-through" : "text-gray-900 dark:text-white"}`}
						>
							{todo.text}
						</span>
						{todo.optimistic && (
							<span className="font-medium text-xs text-yellow-600 dark:text-yellow-400">乐观更新中...</span>
						)}
					</div>
				))}
			</div>

			<div className="mt-6 rounded-md bg-gray-50 p-4 dark:bg-gray-700">
				<h4 className="mb-2 font-semibold text-gray-900 dark:text-white">乐观更新的优势：</h4>
				<ul className="space-y-1 text-gray-600 text-sm dark:text-gray-300">
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
	// 模拟 Server Function
	async function sendMessage(formData: FormData) {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		const message = formData.get("message") as string;
		console.log("消息已发送:", message);
	}

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">📊 useFormStatus 演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">
				useFormStatus Hook 提供表单提交状态信息，用于在子组件中获取父表单的状态。
			</p>

			<form action={sendMessage} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300">消息内容</label>
					<textarea
						name="message"
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						rows={4}
						placeholder="输入你的消息..."
					/>
				</div>

				<SubmitButton />

				<div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
					<p className="text-blue-700 text-sm dark:text-blue-300">
						💡 注意：SubmitButton 组件通过 useFormStatus Hook 获取表单的 pending 状态，不需要通过 props
						传递状态，简化了组件间的通信。
					</p>
				</div>
			</form>

			<div className="mt-6 rounded-md bg-gray-50 p-4 dark:bg-gray-700">
				<h4 className="mb-2 font-semibold text-gray-900 dark:text-white">useFormStatus 的优势：</h4>
				<ul className="space-y-1 text-gray-600 text-sm dark:text-gray-300">
					<li>• 自动获取表单状态（pending、data、method、action）</li>
					<li>• 简化组件间通信，无需 prop drilling</li>
					<li>• 自动处理表单禁用状态</li>
					<li>• 与 Actions 完美集成</li>
				</ul>
			</div>
		</div>
	);
}

// SubmitButton 子组件 - 使用真正的 useFormStatus Hook
function SubmitButton() {
	// @ts-ignore - React 19 Hook，类型定义可能还不完善
	const { pending, data } = (React as any).useFormStatus?.() || { pending: false, data: null };

	return (
		<button
			type="submit"
			disabled={pending}
			className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
				pending ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-blue-500 text-white hover:bg-blue-600"
			}`}
		>
			{pending ? "发送中..." : "发送消息"}
		</button>
	);
}

// Server Functions Demo 组件
function ServerFunctionsDemo() {
	const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: string; time: string }>>([
		{ id: 1, text: "欢迎来到聊天室！", sender: "系统", time: "10:00" },
	]);
	const [_result, _setResult] = useState<{ success?: boolean; message?: string } | null>(null);

	// 模拟 Server Function - 在实际应用中，这会是一个带有 'use server' 指令的函数
	async function sendMessage(formData: FormData) {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const message = formData.get("message") as string;

		if (!message.trim()) {
			return { success: false, message: "消息不能为空" };
		}

		// 模拟消息发送成功
		const newMessage = {
			id: Date.now(),
			text: message,
			sender: "用户",
			time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
		};

		setMessages((prev) => [...prev, newMessage]);
		return { success: true, message: "消息发送成功" };
	}

	// @ts-ignore - React 19 Hook，类型定义可能还不完善
	const [state, formAction, isPending] = (React as any).useActionState?.(sendMessage, null) || [
		null,
		sendMessage,
		false,
	];

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">🖥️ Server Functions 演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">
				Server Functions 允许客户端组件直接调用服务端函数，实现无缝的客户端-服务端交互。
			</p>

			{/* 聊天界面 */}
			<div className="mx-auto max-w-2xl">
				<div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
					<h4 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">💬 聊天室</h4>
					<div className="mb-4 h-64 overflow-y-auto rounded border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-800">
						{messages.map((msg) => (
							<div key={msg.id} className="mb-2">
								<div className="flex items-baseline gap-2">
									<span className="font-medium text-gray-500 text-xs dark:text-gray-400">{msg.time}</span>
									<span
										className={`font-medium text-sm ${msg.sender === "系统" ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400"}`}
									>
										{msg.sender}:
									</span>
								</div>
								<p className="text-gray-800 dark:text-gray-200">{msg.text}</p>
							</div>
						))}
					</div>

					<form action={formAction} className="space-y-3">
						<div className="flex gap-2">
							<input
								type="text"
								name="message"
								disabled={isPending}
								className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
								placeholder="输入消息..."
							/>
							<button
								type="submit"
								disabled={isPending}
								className={`rounded-md px-4 py-2 font-medium transition-colors ${
									isPending
										? "cursor-not-allowed bg-gray-400 text-gray-200"
										: "bg-blue-500 text-white hover:bg-blue-600"
								}`}
							>
								{isPending ? "发送中..." : "发送"}
							</button>
						</div>

						{state?.success === false && (
							<div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
								{state.message}
							</div>
						)}

						{state?.success === true && (
							<div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-green-700 text-sm dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
								{state.message}
							</div>
						)}
					</form>
				</div>

				<div className="mt-6 rounded-md bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Server Functions 的优势：</h4>
					<ul className="space-y-1 text-gray-600 text-sm dark:text-gray-300">
						<li>• 客户端组件可直接调用服务端函数</li>
						<li>• 无需手动 API 路由和请求处理</li>
						<li>• 自动处理序列化和反序列化</li>
						<li>• 支持渐进增强，JavaScript 加载前也能工作</li>
						<li>• 类型安全，支持 TypeScript</li>
						<li>• 与 React Hooks 完美集成</li>
					</ul>
				</div>

				<div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
					<h4 className="mb-2 font-semibold text-blue-800 dark:text-blue-200">📝 实际使用示例：</h4>
					<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-xs">
						{`// 服务端函数 (server.js)
'use server';
export async function sendMessage(message) {
  await db.messages.create({ text: message });
  return { success: true };
}

// 客户端组件
import { sendMessage } from './server';

function ChatForm() {
  return (
    <form action={sendMessage}>
      <input name="message" />
      <button type="submit">发送</button>
    </form>
  );
}`}
					</pre>
				</div>
			</div>
		</div>
	);
}

// useTransition Demo 组件
function UseTransitionDemo() {
	type SearchResult = { id: number; title: string; description: string; category: string };

	const [isPending, startTransition] = React.useTransition();
	const [input, setInput] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [query, setQuery] = useState("");

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
			await new Promise((resolve) => setTimeout(resolve, 800));

			// 生成模拟搜索结果
			const mockResults = Array.from({ length: 20 }, (_, i) => ({
				id: i + 1,
				title: `搜索结果 ${i + 1}: ${value}`,
				description: `这是关于 "${value}" 的详细描述内容`,
				category: ["技术", "教程", "文档", "示例"][Math.floor(Math.random() * 4)],
			}));

			setResults(mockResults);
		});
	};

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">🔄 useTransition 演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">
				useTransition Hook 处理并发渲染，避免界面阻塞，保持交互流畅。
			</p>

			<div className="mb-6">
				<input
					type="text"
					value={input}
					onChange={(e) => handleSearch(e.target.value)}
					className={`w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
						isPending ? "border-blue-500" : "border-gray-300 dark:border-gray-600"
					}`}
					placeholder="搜索大量数据..."
				/>
				{isPending && (
					<div className="mt-2 flex items-center text-blue-600 text-sm dark:text-blue-400">
						<div className="mr-2 h-4 w-4 animate-spin rounded-full border-blue-600 border-b-2"></div>
						正在搜索...
					</div>
				)}
			</div>

			<div
				className={`max-h-96 space-y-2 overflow-y-auto transition-opacity ${isPending ? "opacity-60" : "opacity-100"}`}
			>
				{results.length > 0 ? (
					<>
						<p className="text-gray-600 text-sm dark:text-gray-400">
							找到 {results.length} 个结果 for "{query}"
						</p>
						{results.map((result) => (
							<div
								key={result.id}
								className="rounded-md border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md dark:border-gray-600 dark:bg-gray-800"
							>
								<h4 className="font-medium text-gray-900 dark:text-white">{result.title}</h4>
								<p className="mt-1 text-gray-600 text-sm dark:text-gray-400">{result.description}</p>
								<span className="mt-2 inline-block rounded-md bg-blue-100 px-2 py-1 text-blue-800 text-xs dark:bg-blue-900/30 dark:text-blue-300">
									{result.category}
								</span>
							</div>
						))}
					</>
				) : (
					<p className="py-8 text-center text-gray-500 dark:text-gray-400">
						{query ? "没有找到相关结果" : "输入关键词开始搜索"}
					</p>
				)}
			</div>

			<div className="mt-6 rounded-md bg-gray-50 p-4 dark:bg-gray-700">
				<h4 className="mb-2 font-semibold text-gray-900 dark:text-white">useTransition 的优势：</h4>
				<ul className="space-y-1 text-gray-600 text-sm dark:text-gray-300">
					<li>• 输入立即响应，不被阻塞</li>
					<li>• 并发渲染，数据处理在后台进行</li>
					<li>• 通过 isPending 提供视觉反馈</li>
					<li>• 避免长时间阻塞主线程</li>
				</ul>
			</div>
		</div>
	);
}

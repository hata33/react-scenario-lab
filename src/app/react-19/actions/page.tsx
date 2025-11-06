"use client";

import { AlertCircle, ArrowLeft, CheckCircle, Clock, Code, Copy, Target, Zap } from "lucide-react";
import type React from "react";
import { createContext, useContext, useState } from "react";
import Layout from "@/components/Layout";

// 临时模拟 React 19 Actions Hooks
// 由于 React 19 的一些新 Hooks 可能还未完全稳定，这里提供模拟实现

const FormStatusContext = createContext<{
	pending: boolean;
	data: FormData | null;
}>({
	pending: false,
	data: null,
});

// 模拟 useFormStatus Hook
function useFormStatus() {
	return useContext(FormStatusContext);
}

// 模拟 useTransition Hook
function useTransition(): [boolean, (callback: () => void) => void] {
	const [isPending, setIsPending] = useState(false);

	const startTransition = (callback: () => void) => {
		setIsPending(true);
		setTimeout(() => {
			callback();
			setIsPending(false);
		}, 0);
	};

	return [isPending, startTransition];
}

// 模拟 useActionState Hook
function useActionState<State>(
	action: (prevState: State | null, formData: FormData) => Promise<State> | State,
	initialState: State | null,
	permalink?: string,
): [State, (formData: FormData) => void, boolean] {
	const [state, setState] = useState<State | null>(initialState);
	const [isPending, setIsPending] = useState(false);

	const formAction = async (formData: FormData) => {
		setIsPending(true);
		try {
			const result = await action(state, formData);
			setState(result);
		} catch (error) {
			console.error("Action failed:", error);
		} finally {
			setIsPending(false);
		}
	};

	return [state as State, formAction, isPending];
}

// 模拟 useOptimistic Hook
function useOptimistic<State>(
	pastState: State,
	updateFn: (state: State, optimisticValue: any) => State,
): [State, (optimisticValue: any) => void] {
	const [optimisticState, setOptimisticState] = useState(pastState);

	const addOptimistic = (optimisticValue: any) => {
		const newOptimisticState = updateFn(optimisticState, optimisticValue);
		setOptimisticState(newOptimisticState);
	};

	return [optimisticState, addOptimistic];
}

interface ActionExample {
	id: string;
	title: string;
	description: string;
	category: "State Management" | "UI Enhancement" | "Form Handling" | "Performance";
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	icon: React.ReactNode;
	codeSnippet: string;
	benefits: string[];
	useCases: string[];
	problemsSolved: Array<{
		problem: string;
		description: string;
		solution: string;
	}>;
}

const actionExamples: ActionExample[] = [
	{
		id: "useActionState",
		title: "useActionState",
		description: "处理异步操作状态和结果，自动管理 pending、error、success 状态",
		category: "State Management",
		difficulty: "初级",
		status: "completed",
		icon: <Code className="h-5 w-5" />,
		codeSnippet: `"use client";
import { useActionState } from "react";

async function submitForm(prevState, formData) {
  const name = formData.get("name");
  if (!name) {
    return { error: "姓名不能为空" };
  }
  return { success: true, message: \`欢迎 \${name}！\` };
}

function MyForm() {
  const [state, formAction, isPending] = useActionState(submitForm, null);

  return (
    <form action={formAction}>
      <input name="name" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? "提交中..." : "提交"}
      </button>
      {state?.error && <div className="error">{state.error}</div>}
      {state?.success && <div className="success">{state.message}</div>}
    </form>
  );
}`,
		benefits: ["自动状态管理", "统一错误处理", "减少样板代码", "Server Actions 集成"],
		useCases: ["表单提交", "数据变更", "异步操作", "用户交互"],
		problemsSolved: [
			{
				problem: "状态管理复杂",
				description: "需要手动管理 loading、error、success 状态，每个异步操作都要重复编写状态管理逻辑",
				solution:
					"useActionState 自动管理所有异步状态，返回统一的 state、isPending 和 formAction，无需手动编写状态管理代码",
			},
			{
				problem: "代码冗余严重",
				description: "每个表单或异步操作都需要重复的状态管理代码，维护成本高，容易出错",
				solution: "提供标准化的 Hook 接口，一次配置即可处理所有状态，大幅减少样板代码，提高代码复用性",
			},
			{
				problem: "错误处理不统一",
				description: "不同的异步操作需要不同的错误处理逻辑，try-catch 代码重复，错误展示不一致",
				solution: "统一的错误处理机制，所有错误都通过 state.error 返回，可以集中处理和展示错误信息",
			},
			{
				problem: "用户体验差",
				description: "提交时界面冻结，缺乏即时反馈，用户不知道操作是否成功",
				solution: "内置 isPending 状态，自动处理表单禁用状态，提供即时的加载反馈，提升用户体验",
			},
		],
	},
	{
		id: "useOptimistic",
		title: "useOptimistic",
		description: "实现乐观更新，立即显示用户的操作结果，提升响应性和用户体验",
		category: "UI Enhancement",
		difficulty: "中级",
		status: "completed",
		icon: <Zap className="h-5 w-5" />,
		codeSnippet: `"use client";
import { useOptimistic } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  const addTodo = async (formData) => {
    const text = formData.get("text");

    // 立即更新 UI
    addOptimisticTodo({ id: Date.now(), text });

    // 实际提交
    await submitTodo(text);
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  };

  return (
    <form action={addTodo}>
      <input name="text" />
      <button type="submit">添加</button>
      {optimisticTodos.map(todo => (
        <div key={todo.id} className={todo.pending ? "pending" : ""}>
          {todo.text}
        </div>
      ))}
    </form>
  );
}`,
		benefits: ["即时反馈", "提升感知性能", "自动回滚", "用户体验优化"],
		useCases: ["社交互动", "购物车", "数据列表", "实时更新"],
		problemsSolved: [
			{
				problem: "响应性差",
				description: "用户操作后需要等待网络请求完成才能看到结果，感知延迟高",
				solution: "useOptimistic 立即显示预期结果，用户操作瞬间反馈，大幅提升感知性能",
			},
			{
				problem: "乐观更新实现复杂",
				description: "实现乐观UI更新需要复杂的逻辑和状态回滚机制，容易出错",
				solution: "自动处理乐观更新和回滚逻辑，开发者只需提供更新函数即可",
			},
			{
				problem: "用户体验不佳",
				description: "网络延迟导致界面响应慢，用户不知道操作是否成功",
				solution: "立即显示操作结果，让用户感觉响应迅速，即使后端处理较慢",
			},
			{
				problem: "状态同步困难",
				description: "乐观状态和实际状态需要手动同步，容易出现不一致",
				solution: "自动管理状态同步，乐观状态在提交成功后自动变为实际状态",
			},
		],
	},
	{
		id: "useFormStatus",
		title: "useFormStatus",
		description: "获取表单提交状态，在子组件中访问父表单的 pending 状态和数据",
		category: "Form Handling",
		difficulty: "初级",
		status: "completed",
		icon: <Target className="h-5 w-5" />,
		codeSnippet: `"use client";
import { useFormStatus } from "react";

function SubmitButton() {
  const { pending, data } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "提交中..." : "提交"}
      {data && (
        <small>正在提交: {data.get("username")}</small>
      )}
    </button>
  );
}

function MyForm() {
  return (
    <form action={submitForm}>
      <input name="username" />
      <input name="email" />
      <SubmitButton /> {/* 自动获取表单状态 */}
    </form>
  );
}`,
		benefits: ["自动状态获取", "简化组件通信", "避免 prop drilling", "表单集成"],
		useCases: ["表单按钮", "状态指示器", "验证反馈", "提交控制"],
		problemsSolved: [
			{
				problem: "表单状态传递困难",
				description: "子组件无法直接访问父表单的提交状态，需要通过 props 传递，造成组件耦合",
				solution: "useFormStatus 让子组件自动获取表单状态，无需手动传递 props，实现组件解耦",
			},
			{
				problem: "按钮状态管理复杂",
				description: "表单提交按钮需要知道表单的 pending 状态，通常需要复杂的状态提升逻辑",
				solution: "自动在子组件中访问表单状态，按钮可以根据 pending 状态自动禁用和显示加载状态",
			},
			{
				problem: "表单数据访问不便",
				description: "子组件需要访问表单数据时，必须通过 context 或 props 传递，代码冗余",
				solution: "useFormStatus 提供直接的 data 访问接口，子组件可以轻松获取表单提交的数据",
			},
			{
				problem: "用户体验不佳",
				description: "表单提交时缺乏即时反馈，用户不知道操作是否正在进行，容易重复提交",
				solution: "实时的状态反馈，按钮自动禁用和显示提交进度，提升用户体验和交互质量",
			},
		],
	},
	{
		id: "serverFunctions",
		title: "Server Functions",
		description: "服务端函数与客户端组件集成，实现无缝的客户端-服务端交互",
		category: "State Management",
		difficulty: "中级",
		status: "completed",
		icon: <AlertCircle className="h-5 w-5" />,
		codeSnippet: `// 服务端函数
"use server";
export async function createUser(formData) {
  const name = formData.get("name");
  const email = formData.get("email");

  // 验证数据
  if (!name || !email) {
    return { error: "请填写所有字段" };
  }

  // 创建用户
  const user = await db.users.create({ name, email });
  return { success: true, user };
}

// 客户端组件
"use client";
import { createUser } from "./actions";

function SignUpForm() {
  return (
    <form action={createUser}>
      <input name="name" placeholder="姓名" />
      <input name="email" placeholder="邮箱" />
      <button type="submit">注册</button>
    </form>
  );
}`,
		benefits: ["客户端调用服务端", "类型安全", "自动序列化", "渐进增强"],
		useCases: ["用户认证", "数据提交", "文件上传", "API 调用"],
		problemsSolved: [
			{
				problem: "客户端服务端通信复杂",
				description: "需要手动编写 API 端点、请求处理、错误管理，代码分散在客户端和服务端",
				solution: "Server Functions 提供统一的函数调用接口，一个函数同时支持客户端调用和服务端执行",
			},
			{
				problem: "类型安全缺失",
				description: "传统 API 调用缺乏类型检查，参数和返回值类型容易不匹配，运行时才发现错误",
				solution: "TypeScript 完全支持，编译时类型检查，确保参数和返回值类型一致性",
			},
			{
				problem: "数据序列化繁琐",
				description: "需要手动处理 JSON 序列化、数据转换、边界情况处理，容易出错",
				solution: "自动处理数据序列化和反序列化，支持复杂对象、FormData、文件等多种数据类型",
			},
			{
				problem: "渐进增强困难",
				description: "JavaScript 未加载时表单无法工作，需要单独实现服务端渲染版本",
				solution: "自动支持渐进增强，JavaScript 加载前表单可以正常提交，加载后提供更好的体验",
			},
		],
	},
	{
		id: "useTransition",
		title: "useTransition",
		description: "处理并发渲染，避免界面阻塞，保持交互流畅",
		category: "Performance",
		difficulty: "高级",
		status: "completed",
		icon: <Clock className="h-5 w-5" />,
		codeSnippet: `"use client";
import { useTransition } from "react";

function SearchComponent() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    setQuery(value); // 立即更新输入框

    startTransition(() => {
      // 在后台执行搜索，不阻塞 UI
      performSearch(value).then(setResults);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className={isPending ? "searching" : ""}
      />
      {isPending && <div>搜索中...</div>}
      <div>
        {results.map(result => (
          <div key={result.id}>{result.title}</div>
        ))}
      </div>
    </div>
  );
}`,
		benefits: ["并发渲染", "非阻塞更新", "流畅交互", "性能优化"],
		useCases: ["搜索功能", "数据过滤", "大量数据处理", "实时更新"],
		problemsSolved: [
			{
				problem: "界面阻塞严重",
				description: "大量数据处理或渲染时界面冻结，用户无法进行其他操作，体验极差",
				solution: "useTransition 将更新标记为过渡，在后台并发渲染，保持界面响应性",
			},
			{
				problem: "用户体验不佳",
				description: "搜索、过滤等操作时界面卡顿，输入延迟，用户感觉应用性能差",
				solution: "立即更新输入状态，将耗时操作放在 transition 中，用户可以继续交互",
			},
			{
				problem: "渲染性能低下",
				description: "大量数据渲染阻塞主线程，导致动画、滚动等效果不流畅",
				solution: "并发渲染机制，不阻塞主线程，保持动画和交互的流畅性",
			},
			{
				problem: "状态更新冲突",
				description: "快速连续的操作导致状态更新冲突，界面显示不一致",
				solution: "自动管理更新优先级，transition 更新会被中断或延迟，避免状态冲突",
			},
		],
	},
];

export default function ActionsPage() {
	const [copiedCode, setCopiedCode] = useState(false);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedCode(true);
			setTimeout(() => setCopiedCode(false), 2000);
		} catch (error) {
			console.error("复制失败:", error);
		}
	};

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

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "初级":
				return "text-green-600 bg-green-100";
			case "中级":
				return "text-yellow-600 bg-yellow-100";
			case "高级":
				return "text-red-600 bg-red-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getCategoryColor = (category: string) => {
		switch (category) {
			case "State Management":
				return "text-blue-600 bg-blue-100";
			case "UI Enhancement":
				return "text-green-600 bg-green-100";
			case "Form Handling":
				return "text-purple-600 bg-purple-100";
			case "Performance":
				return "text-orange-600 bg-orange-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const [selectedExample, setSelectedExample] = useState(actionExamples[0]);

	// 官方代码示例数据
	const getOfficialExamples = (hookId: string) => {
		const examples = {
			useActionState: [
				{
					title: "🚀 渐进增强支持",
					code: `// useActionState 支持 permalink
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
}`,
					description: "即使 JavaScript 未加载，表单也能正常工作",
				},
				{
					title: "⚠️ 错误处理最佳实践",
					code: `// Server Function
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
}`,
					description: "统一的错误处理模式",
				},
			],
			useOptimistic: [
				{
					title: "📝 乐观更新表单",
					code: `function TodoList() {
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  const addTodo = async (formData) => {
    const text = formData.get("text");
    addOptimisticTodo({ id: Date.now(), text });
    await submitTodo(text);
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  };

  return (
    <form action={addTodo}>
      <input name="text" />
      <button type="submit">添加</button>
      {optimisticTodos.map(todo => (
        <div key={todo.id} className={todo.pending ? "pending" : ""}>
          {todo.text}
        </div>
      ))}
    </form>
  );
}`,
					description: "立即显示用户操作结果，提升响应性",
				},
			],
			useFormStatus: [
				{
					title: "📊 访问表单数据",
					code: `function SubmitButton() {
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
}`,
					description: "useFormStatus 可以访问表单提交的数据",
				},
				{
					title: "🎯 多按钮表单处理",
					code: `function ArticleEditor() {
  function publish(formData) {
    const content = formData.get("content");
    const button = formData.get("button");
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
}`,
					description: "使用 formAction 处理不同的提交类型",
				},
			],
			serverFunctions: [
				{
					title: "🔗 服务端函数调用",
					code: `// 服务端函数
"use server";
export async function createUser(formData) {
  const name = formData.get("name");
  const email = formData.get("email");

  if (!name || !email) {
    return { error: "请填写所有字段" };
  }

  const user = await db.users.create({ name, email });
  return { success: true, user };
}

// 客户端组件
"use client";
import { createUser } from "./actions";

function SignUpForm() {
  return (
    <form action={createUser}>
      <input name="name" placeholder="姓名" />
      <input name="email" placeholder="邮箱" />
      <button type="submit">注册</button>
    </form>
  );
}`,
					description: "客户端直接调用服务端函数，无需手动 API 调用",
				},
				{
					title: "📦 传递额外参数",
					code: `function AddToCart({productId}) {
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
}`,
					description: "使用 bind 方法传递额外参数给 Server Function",
				},
			],
			useTransition: [
				{
					title: "⚡ useTransition + Actions",
					code: `function LikeButton() {
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
}`,
					description: "非表单操作的异步状态管理",
				},
				{
					title: "🔍 搜索功能优化",
					code: `function SearchComponent() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (value) => {
    setQuery(value); // 立即更新输入框

    startTransition(() => {
      // 在后台执行搜索，不阻塞 UI
      performSearch(value).then(setResults);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className={isPending ? "searching" : ""}
      />
      {isPending && <div>搜索中...</div>}
      <div>
        {results.map(result => (
          <div key={result.id}>{result.title}</div>
        ))}
      </div>
    </div>
  );
}`,
					description: "搜索时保持输入框响应，结果在后台加载",
				},
			],
		};

		return examples[hookId as keyof typeof examples] || [];
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* 头部 */}
				<div className="bg-white shadow-sm">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-3">
								<Zap className="h-8 w-8 text-blue-600" />
								<div>
									<h1 className="font-bold text-3xl text-gray-900">React 19 Actions</h1>
									<p className="text-gray-600">现代 React 应用的异步操作生态系统</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Actions 架构概览 */}
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">Actions 生态系统</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
							<div className="rounded-lg bg-blue-50 p-4 text-center">
								<Code className="mx-auto mb-2 h-6 w-6 text-blue-600" />
								<h3 className="mb-1 font-semibold text-blue-900">状态管理</h3>
								<p className="text-blue-700 text-sm">自动处理异步状态</p>
							</div>
							<div className="rounded-lg bg-green-50 p-4 text-center">
								<Zap className="mx-auto mb-2 h-6 w-6 text-green-600" />
								<h3 className="mb-1 font-semibold text-green-900">乐观更新</h3>
								<p className="text-green-700 text-sm">即时响应用户操作</p>
							</div>
							<div className="rounded-lg bg-purple-50 p-4 text-center">
								<Target className="mx-auto mb-2 h-6 w-6 text-purple-600" />
								<h3 className="mb-1 font-semibold text-purple-900">表单处理</h3>
								<p className="text-purple-700 text-sm">简化表单状态管理</p>
							</div>
							<div className="rounded-lg bg-orange-50 p-4 text-center">
								<Clock className="mx-auto mb-2 h-6 w-6 text-orange-600" />
								<h3 className="mb-1 font-semibold text-orange-900">性能优化</h3>
								<p className="text-orange-700 text-sm">并发渲染不阻塞</p>
							</div>
						</div>
					</div>
				</div>

				{/* 3W 法则解析 */}
				<div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
						<h2 className="mb-6 font-bold text-2xl text-blue-800">🎯 3W 法则解析</h2>
						<div className="grid gap-6 md:grid-cols-3">
							<div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
								<h3 className="mb-3 font-semibold text-blue-700 text-lg">📋 What (是什么)</h3>
								<p className="font-medium text-gray-800">
									Actions 是 React 19 中简化异步数据变更的新机制，配套提供
									useActionState、useOptimistic、useFormStatus、useTransition 等 Hook，形成完整的异步操作生态系统。
								</p>
							</div>
							<div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
								<h3 className="mb-3 font-semibold text-blue-700 text-lg">🎯 Why (为什么)</h3>
								<p className="font-medium text-gray-800">
									解决传统表单处理复杂、状态管理繁琐、用户体验不佳的问题。通过提供标准化的异步操作模式和内置的 pending
									状态管理，大幅简化了开发复杂度。
								</p>
							</div>
							<div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
								<h3 className="mb-3 font-semibold text-blue-700 text-lg">⏰ When (何时用)</h3>
								<p className="font-medium text-gray-800">
									处理表单提交、数据变更、乐观更新、并发渲染场景。特别适合需要良好用户体验的交互式应用，如社交平台、电商系统、协作工具等。
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Hook 选择器 - 吸顶区域 */}
				<div className="sticky top-0 z-10 border-gray-200 border-b bg-white">
					<div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
							<h2 className="font-semibold text-gray-900 text-sm">选择 Hook:</h2>
							<div className="flex flex-wrap justify-center gap-2">
								{actionExamples.map((example) => (
									<button
										key={example.id}
										onClick={() => setSelectedExample(example)}
										className={`rounded-lg px-3 py-1.5 font-medium text-sm transition-all ${
											selectedExample?.id === example.id
												? "bg-blue-500 text-white shadow-sm"
												: "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
										}`}
									>
										<span className="mr-1">{example.icon}</span>
										{example.title}
										<span
											className={`ml-1.5 rounded px-1.5 py-0.5 text-xs ${
												example.difficulty === "初级"
													? "bg-green-100 text-green-700"
													: example.difficulty === "中级"
														? "bg-yellow-100 text-yellow-700"
														: "bg-red-100 text-red-700"
											}`}
										>
											{example.difficulty}
										</span>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* 详细展示区域 - 下方内容 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					{selectedExample && (
						<div className="space-y-8">
							{/* Hook 详细信息 */}
							<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
								<div className="border-gray-200 border-b p-6">
									<div className="flex items-center space-x-4">
										<div className="rounded-lg bg-blue-100 p-3 text-blue-600">{selectedExample.icon}</div>
										<div>
											<h3 className="font-semibold text-2xl text-gray-900">{selectedExample.title}</h3>
											<p className="text-gray-600">{selectedExample.description}</p>
										</div>
									</div>
								</div>

								<div className="p-6">
									<div className="mb-6">
										<h4 className="mb-3 font-semibold text-gray-900">🎮 交互式演示</h4>
										<div className="space-y-6">
											{selectedExample.id === "useActionState" && (
												<>
													<UseActionStateDemo />
													<UseActionStateLoginDemo />
													<UseActionStateCommentDemo />
												</>
											)}
											{selectedExample.id === "useOptimistic" && (
												<>
													<UseOptimisticDemo />
													<UseOptimisticLikeDemo />
													<UseOptimisticCartDemo />
												</>
											)}
											{selectedExample.id === "useFormStatus" && (
												<>
													<UseFormStatusDemo />
													<UseFormStatusMultiButtonDemo />
													<UseFormStatusProgressDemo />
												</>
											)}
											{selectedExample.id === "serverFunctions" && (
												<>
													<ServerFunctionsDemo />
													<ServerFunctionsFileUploadDemo />
													<ServerFunctionsSearchDemo />
												</>
											)}
											{selectedExample.id === "useTransition" && (
												<>
													<UseTransitionDemo />
													<UseTransitionFilterDemo />
													<UseTransitionDataSyncDemo />
												</>
											)}
										</div>
									</div>

									<div className="mb-6">
										<div className="mb-3 flex items-center justify-between">
											<h4 className="font-semibold text-gray-900">📝 代码示例</h4>
											<button
												onClick={() => copyToClipboard(selectedExample.codeSnippet)}
												className="flex items-center space-x-1 text-gray-600 text-sm hover:text-gray-900"
											>
												<Copy className="h-4 w-4" />
												<span>{copiedCode ? "已复制" : "复制"}</span>
											</button>
										</div>
										<div className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
											<pre className="text-sm">
												<code>{selectedExample.codeSnippet}</code>
											</pre>
										</div>
									</div>

									{/* 主要优势和使用场景 */}
									<div className="grid gap-6 md:grid-cols-2">
										<div>
											<h5 className="mb-3 font-medium text-gray-900">✨ 主要优势</h5>
											<div className="flex flex-wrap gap-2">
												{selectedExample.benefits.map((benefit, index) => (
													<span
														key={index}
														className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm"
													>
														{benefit}
													</span>
												))}
											</div>
										</div>

										<div>
											<h5 className="mb-3 font-medium text-gray-900">🎯 使用场景</h5>
											<div className="flex flex-wrap gap-2">
												{selectedExample.useCases.map((useCase, index) => (
													<span
														key={index}
														className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-blue-700 text-sm"
													>
														{useCase}
													</span>
												))}
											</div>
										</div>
									</div>

									{/* 解决的具体问题 */}
									<div className="border-gray-200 border-t pt-6">
										<h5 className="mb-4 font-medium text-gray-900">🔧 解决的具体问题</h5>
										<div className="space-y-4">
											{selectedExample.problemsSolved.map((item, index) => (
												<div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
													<div className="mb-2 flex items-start justify-between">
														<div className="flex items-center space-x-2">
															<span className="inline-flex items-center rounded bg-red-100 px-2 py-1 font-medium text-red-700 text-xs">
																问题
															</span>
															<strong className="text-red-800">{item.problem}</strong>
														</div>
													</div>
													<p className="mb-3 text-gray-600 text-sm">{item.description}</p>
													<div className="rounded border border-green-200 bg-green-50 p-3">
														<div className="mb-1 flex items-center space-x-2">
															<span className="inline-flex items-center rounded bg-green-100 px-2 py-1 font-medium text-green-700 text-xs">
																解决方案
															</span>
															<strong className="text-green-800">React 19</strong>
														</div>
														<p className="text-gray-700 text-sm">{item.solution}</p>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>

								{selectedExample.status === "completed" && (
									<div className="border-green-200 border-t bg-green-50 p-6">
										<div className="flex items-center space-x-2 text-green-800">
											<CheckCircle className="h-5 w-5" />
											<span className="font-medium">该 Hook 已在 React 19 中正式发布</span>
										</div>
									</div>
								)}
							</div>
						</div>
					)}
				</div>

				{/* 官方代码示例 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-bold text-2xl text-gray-900">📚 {selectedExample?.title} 官方示例</h2>
						<p className="mb-6 text-gray-600">
							以下示例来自 React 官方文档，展示了 {selectedExample?.title} 的最佳实践
						</p>

						{selectedExample && getOfficialExamples(selectedExample.id).length > 0 ? (
							<div className="grid gap-6 lg:grid-cols-2">
								{getOfficialExamples(selectedExample.id).map((example, index) => (
									<div key={index} className="rounded-lg border border-gray-200 p-4">
										<h3 className="mb-3 font-semibold text-gray-800">{example.title}</h3>
										<pre className="mb-2 overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-xs">
											{example.code}
										</pre>
										<p className="text-gray-600 text-xs">{example.description}</p>
									</div>
								))}
							</div>
						) : (
							<div className="py-12 text-center">
								<Code className="mx-auto mb-4 h-16 w-16 text-gray-400" />
								<h3 className="mb-2 font-semibold text-gray-900 text-lg">暂无官方示例</h3>
								<p className="text-gray-600">{selectedExample?.title} 的官方代码示例正在整理中，敬请期待</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
}

// useActionState Demo 组件 - 注册表单
function UseActionStateDemo() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [state, setState] = useState<{ error?: string; success?: boolean; message?: string } | null>(null);
	const [isPending, setIsPending] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);
		setState(null);

		// 模拟异步提交
		await new Promise((resolve) => setTimeout(resolve, 1500));

		if (!name || !email) {
			setState({ error: "请填写所有字段" });
		} else if (!email.includes("@")) {
			setState({ error: "请输入有效的邮箱地址" });
		} else {
			setState({ success: true, message: `欢迎 ${name}！注册成功` });
		}

		setIsPending(false);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">📝 用户注册场景</h5>
			<form onSubmit={handleSubmit} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">姓名</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="请输入姓名"
					/>
				</div>

				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">邮箱</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
					<div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">{state.error}</div>
				)}

				{state?.success && (
					<div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-green-700">{state.message}</div>
				)}
			</form>
		</div>
	);
}

// useActionState Demo 组件 - 登录场景
function UseActionStateLoginDemo() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [state, setState] = useState<{ error?: string; success?: boolean; message?: string; attempts?: number } | null>(
		null,
	);
	const [isPending, setIsPending] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);
		setState(null);

		// 模拟异步登录
		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (!username || !password) {
			setState({ error: "请填写用户名和密码", attempts: 1 });
		} else if (username !== "admin" || password !== "123456") {
			setState({ error: "用户名或密码错误", attempts: (state?.attempts || 0) + 1 });
		} else {
			setState({ success: true, message: `登录成功！欢迎回来，${username}` });
		}

		setIsPending(false);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🔐 用户登录场景</h5>
			<form onSubmit={handleSubmit} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">用户名</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="试试：admin"
					/>
				</div>

				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">密码</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="试试：123456"
					/>
				</div>

				<button
					type="submit"
					disabled={isPending}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						isPending ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{isPending ? "登录中..." : "登录"}
				</button>

				{state?.error && (
					<div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">
						{state.error}
						{state.attempts && state.attempts > 1 && (
							<p className="mt-1 text-red-600 text-xs">尝试次数：{state.attempts}</p>
						)}
					</div>
				)}

				{state?.success && (
					<div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-green-700">{state.message}</div>
				)}

				<div className="text-gray-500 text-xs">💡 提示：使用 admin/123456 可以成功登录</div>
			</form>
		</div>
	);
}

// useActionState Demo 组件 - 评论发布场景
function UseActionStateCommentDemo() {
	const [comment, setComment] = useState("");
	const [author, setAuthor] = useState("");
	const [state, setState] = useState<{
		error?: string;
		success?: boolean;
		message?: string;
		commentId?: number;
	} | null>(null);
	const [isPending, setIsPending] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);
		setState(null);

		// 模拟异步评论提交
		await new Promise((resolve) => setTimeout(resolve, 800));

		if (!author.trim()) {
			setState({ error: "请输入您的昵称" });
		} else if (!comment.trim()) {
			setState({ error: "请输入评论内容" });
		} else if (comment.length < 10) {
			setState({ error: "评论内容至少需要10个字符" });
		} else {
			setState({
				success: true,
				message: "评论发布成功！",
				commentId: Date.now(),
			});
			setComment("");
		}

		setIsPending(false);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">💬 评论发布场景</h5>
			<form onSubmit={handleSubmit} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">昵称</label>
					<input
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="请输入昵称"
					/>
				</div>

				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">评论内容</label>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						disabled={isPending}
						rows={4}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="分享您的想法..."
					/>
					<div className="mt-1 text-gray-500 text-xs">{comment.length}/10 字符</div>
				</div>

				<button
					type="submit"
					disabled={isPending}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						isPending ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{isPending ? "发布中..." : "发布评论"}
				</button>

				{state?.error && (
					<div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">{state.error}</div>
				)}

				{state?.success && (
					<div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-green-700">
						{state.message}
						{state.commentId && <p className="mt-1 text-green-600 text-xs">评论ID：#{state.commentId}</p>}
					</div>
				)}
			</form>
		</div>
	);
}

// useOptimistic Demo 组件 - 待办事项场景
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
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">📝 待办事项管理</h5>
			<form onSubmit={addTodo} className="mb-4">
				<div className="flex gap-2">
					<input
						type="text"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
						disabled={isPending}
						className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
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
							todo.optimistic ? "border-yellow-200 bg-yellow-50" : "border-gray-200 bg-white"
						}`}
					>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => toggleTodo(todo.id)}
							className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<span className={`flex-1 ${todo.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
							{todo.text}
						</span>
						{todo.optimistic && <span className="font-medium text-xs text-yellow-600">乐观更新中...</span>}
					</div>
				))}
			</div>
		</div>
	);
}

// useOptimistic Demo 组件 - 点赞场景
function UseOptimisticLikeDemo() {
	type Post = { id: number; content: string; likes: number; isLiked: boolean; optimistic?: boolean };

	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, content: "React 19 的新特性真是太棒了！", likes: 42, isLiked: false },
		{ id: 2, content: "useActionState 让表单处理变得如此简单", likes: 28, isLiked: false },
		{ id: 3, content: "乐观更新大大提升了用户体验", likes: 15, isLiked: true },
	]);
	const [optimisticPosts, setOptimisticPosts] = useState<Post[]>(posts);

	const handleLike = async (postId: number) => {
		// 乐观更新：立即更新点赞状态
		setOptimisticPosts((prev) =>
			prev.map((post) =>
				post.id === postId
					? {
							...post,
							isLiked: !post.isLiked,
							likes: post.isLiked ? post.likes - 1 : post.likes + 1,
							optimistic: true,
						}
					: post,
			),
		);

		// 模拟网络请求
		await new Promise((resolve) => setTimeout(resolve, 800));

		// 实际更新状态
		setPosts((prev) =>
			prev.map((post) =>
				post.id === postId
					? {
							...post,
							isLiked: !post.isLiked,
							likes: post.isLiked ? post.likes - 1 : post.likes + 1,
						}
					: post,
			),
		);

		// 移除乐观状态
		setOptimisticPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, optimistic: false } : post)));
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">👍 社交点赞场景</h5>
			<div className="space-y-3">
				{optimisticPosts.map((post) => (
					<div
						key={post.id}
						className={`rounded-lg border p-4 ${
							post.optimistic ? "border-yellow-200 bg-yellow-50" : "border-gray-200 bg-white"
						}`}
					>
						<p className="mb-3 text-gray-800">{post.content}</p>
						<div className="flex items-center justify-between">
							<button
								onClick={() => handleLike(post.id)}
								className={`flex items-center gap-2 rounded-full px-3 py-1 font-medium text-sm transition-colors ${
									post.isLiked
										? "bg-red-100 text-red-700 hover:bg-red-200"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								<span>{post.isLiked ? "❤️" : "🤍"}</span>
								<span>{post.likes}</span>
							</button>
							{post.optimistic && <span className="font-medium text-xs text-yellow-600">更新中...</span>}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

// useOptimistic Demo 组件 - 购物车场景
function UseOptimisticCartDemo() {
	type CartItem = { id: number; name: string; price: number; quantity: number; optimistic?: boolean };

	const [items, setItems] = useState<CartItem[]>([
		{ id: 1, name: "React 19 完全指南", price: 89, quantity: 1 },
		{ id: 2, name: "现代前端开发实战", price: 128, quantity: 2 },
	]);
	const [optimisticItems, setOptimisticItems] = useState<CartItem[]>(items);

	const updateQuantity = async (itemId: number, newQuantity: number) => {
		if (newQuantity < 0) return;

		// 乐观更新：立即更新数量
		setOptimisticItems((prev) =>
			prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity, optimistic: true } : item)),
		);

		// 模拟网络请求
		await new Promise((resolve) => setTimeout(resolve, 600));

		// 实际更新
		setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));

		// 移除乐观状态
		setOptimisticItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, optimistic: false } : item)));
	};

	const removeItem = async (itemId: number) => {
		// 乐观更新：立即移除
		setOptimisticItems((prev) =>
			prev.map((item) => (item.id === itemId ? { ...item, quantity: 0, optimistic: true } : item)),
		);

		// 模拟网络请求
		await new Promise((resolve) => setTimeout(resolve, 500));

		// 实际移除
		setItems((prev) => prev.filter((item) => item.id !== itemId));
		setOptimisticItems((prev) => prev.filter((item) => item.id !== itemId));
	};

	const totalPrice = optimisticItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🛒 购物车场景</h5>
			<div className="space-y-3">
				{optimisticItems.map((item) => (
					<div
						key={item.id}
						className={`rounded-lg border p-3 ${
							item.optimistic ? "border-yellow-200 bg-yellow-50" : "border-gray-200 bg-white"
						}`}
					>
						<div className="mb-2 flex items-center justify-between">
							<div>
								<h6 className="font-medium text-gray-900">{item.name}</h6>
								<p className="text-gray-600 text-sm">¥{item.price}</p>
							</div>
							{item.optimistic && <span className="font-medium text-xs text-yellow-600">更新中...</span>}
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() => updateQuantity(item.id, item.quantity - 1)}
								disabled={item.quantity <= 0}
								className="h-8 w-8 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
							>
								-
							</button>
							<span className="w-12 text-center font-medium">{item.quantity}</span>
							<button
								onClick={() => updateQuantity(item.id, item.quantity + 1)}
								className="h-8 w-8 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
							>
								+
							</button>
							<button onClick={() => removeItem(item.id)} className="ml-auto text-red-600 text-sm hover:text-red-700">
								删除
							</button>
						</div>
					</div>
				))}
			</div>
			<div className="mt-4 border-gray-200 border-t pt-3">
				<div className="flex items-center justify-between">
					<span className="font-semibold text-gray-900">总计：</span>
					<span className="font-bold text-blue-600 text-lg">¥{totalPrice}</span>
				</div>
			</div>
		</div>
	);
}

// useFormStatus Demo 组件
function UseFormStatusDemo() {
	const [message, setMessage] = useState("");
	const [isPending, setIsPending] = useState(false);

	const sendMessage = async (formData: FormData) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		const msg = formData.get("message") as string;
		console.log("消息已发送:", msg);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);
		const formData = new FormData();
		formData.append("message", message);
		await sendMessage(formData);
		setIsPending(false);
		setMessage("");
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<form onSubmit={handleSubmit} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">消息内容</label>
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						rows={4}
						placeholder="输入你的消息..."
					/>
				</div>

				<button
					type="submit"
					disabled={isPending || !message.trim()}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						isPending || !message.trim()
							? "cursor-not-allowed bg-gray-400 text-gray-200"
							: "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{isPending ? "发送中..." : "发送消息"}
				</button>

				<div className="rounded-md bg-blue-50 p-4">
					<p className="text-blue-700 text-sm">
						💡 注意：按钮会根据表单状态自动禁用/启用，这就是 useFormStatus 的作用！
					</p>
				</div>
			</form>
		</div>
	);
}

// Server Functions Demo 组件
function ServerFunctionsDemo() {
	const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: string; time: string }>>([
		{ id: 1, text: "欢迎来到聊天室！", sender: "系统", time: "10:00" },
	]);
	const [newMessage, setNewMessage] = useState("");
	const [isPending, setIsPending] = useState(false);

	const sendMessage = async (message: string) => {
		// 模拟 Server Function 调用
		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (!message.trim()) {
			return { success: false, message: "消息不能为空" };
		}

		// 模拟消息发送成功
		const newMsg = {
			id: Date.now(),
			text: message,
			sender: "用户",
			time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
		};

		setMessages((prev) => [...prev, newMsg]);
		return { success: true, message: "消息发送成功" };
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);

		const result = await sendMessage(newMessage);
		console.log(result);

		if (result.success) {
			setNewMessage("");
		}

		setIsPending(false);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<div className="mb-4">
				<h4 className="mb-3 font-semibold text-gray-800">💬 模拟聊天室</h4>
				<div className="mb-4 h-48 overflow-y-auto rounded border border-gray-200 bg-white p-3">
					{messages.map((msg) => (
						<div key={msg.id} className="mb-2">
							<div className="flex items-baseline gap-2">
								<span className="font-medium text-gray-500 text-xs">{msg.time}</span>
								<span className={`font-medium text-sm ${msg.sender === "系统" ? "text-blue-600" : "text-green-600"}`}>
									{msg.sender}:
								</span>
							</div>
							<p className="text-gray-800">{msg.text}</p>
						</div>
					))}
				</div>

				<form onSubmit={handleSubmit} className="space-y-3">
					<div className="flex gap-2">
						<input
							type="text"
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							disabled={isPending}
							className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
							placeholder="输入消息..."
						/>
						<button
							type="submit"
							disabled={isPending}
							className={`rounded-md px-4 py-2 font-medium transition-colors ${
								isPending ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-blue-500 text-white hover:bg-blue-600"
							}`}
						>
							{isPending ? "发送中..." : "发送"}
						</button>
					</div>
				</form>
			</div>

			<div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3">
				<p className="text-blue-700 text-xs">
					📝 这里模拟了 Server Functions 的效果。在实际应用中，这些函数会在服务端执行并自动处理序列化。
				</p>
			</div>
		</div>
	);
}

// useTransition Demo 组件
function UseTransitionDemo() {
	type SearchResult = { id: number; title: string; description: string; category: string };

	const [isPending, setIsPending] = useState(false);
	const [input, setInput] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [query, setQuery] = useState("");

	const handleSearch = (value: string) => {
		setInput(value);

		// 使用 transition 模拟非阻塞更新
		setIsPending(true);
		setQuery(value);

		setTimeout(async () => {
			if (!value.trim()) {
				setResults([]);
				setIsPending(false);
				return;
			}

			// 模拟大量数据搜索
			await new Promise((resolve) => setTimeout(resolve, 800));

			// 生成模拟搜索结果
			const mockResults = Array.from({ length: 5 }, (_, i) => ({
				id: i + 1,
				title: `搜索结果 ${i + 1}: ${value}`,
				description: `这是关于 "${value}" 的详细描述内容`,
				category: ["技术", "教程", "文档", "示例"][Math.floor(Math.random() * 4)],
			}));

			setResults(mockResults);
			setIsPending(false);
		}, 100);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<div className="mb-4">
				<input
					type="text"
					value={input}
					onChange={(e) => handleSearch(e.target.value)}
					className={`w-full rounded-md border px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-blue-500 ${
						isPending ? "border-blue-500" : "border-gray-300"
					}`}
					placeholder="搜索大量数据..."
				/>
				{isPending && (
					<div className="mt-2 flex items-center text-blue-600 text-sm">
						<div className="mr-2 h-4 w-4 animate-spin rounded-full border-blue-600 border-b-2"></div>
						正在搜索...
					</div>
				)}
			</div>

			<div
				className={`max-h-64 space-y-2 overflow-y-auto transition-opacity ${isPending ? "opacity-60" : "opacity-100"}`}
			>
				{results.length > 0 ? (
					<>
						<p className="text-gray-600 text-sm">
							找到 {results.length} 个结果 for "{query}"
						</p>
						{results.map((result) => (
							<div
								key={result.id}
								className="rounded-md border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md"
							>
								<h4 className="font-medium text-gray-900">{result.title}</h4>
								<p className="mt-1 text-gray-600 text-sm">{result.description}</p>
								<span className="mt-2 inline-block rounded-md bg-blue-100 px-2 py-1 text-blue-800 text-xs">
									{result.category}
								</span>
							</div>
						))}
					</>
				) : (
					<p className="py-8 text-center text-gray-500">{query ? "没有找到相关结果" : "输入关键词开始搜索"}</p>
				)}
			</div>

			<div className="mt-4 rounded-md border border-orange-200 bg-orange-50 p-3">
				<p className="text-orange-700 text-xs">
					⚡ 注意：输入框立即响应，搜索在后台进行。这就是 useTransition 的并发渲染效果！
				</p>
			</div>
		</div>
	);
}

// useFormStatus Demo 组件 - 多按钮表单场景
function UseFormStatusMultiButtonDemo() {
	const [message, setMessage] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [formContextData, setFormContextData] = useState<FormData | null>(null);

	const publishPost = async (formData: FormData) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		const msg = formData.get("message") as string;
		console.log("发布文章:", msg);
	};

	const saveDraft = async (formData: FormData) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const msg = formData.get("message") as string;
		console.log("保存草稿:", msg);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsPending(true);
		const formData = new FormData();
		formData.append("message", message);
		setFormContextData(formData);
		await publishPost(formData);
		setIsPending(false);
		setFormContextData(null);
	};

	return (
		<FormStatusContext.Provider value={{ pending: isPending, data: formContextData }}>
			<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
				<h5 className="mb-3 font-semibold text-gray-800">📝 多按钮表单场景</h5>
				<form onSubmit={handleSubmit} className="max-w-md space-y-4">
					<div>
						<label className="mb-2 block font-medium text-gray-700 text-sm">文章内容</label>
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
							rows={4}
							placeholder="写下您的想法..."
						/>
					</div>

					<div className="flex gap-2">
						<PublishButton />
						<button
							onClick={async (e) => {
								e.preventDefault();
								setIsPending(true);
								const formData = new FormData();
								formData.append("message", message);
								setFormContextData(formData);
								await saveDraft(formData);
								setIsPending(false);
								setFormContextData(null);
							}}
							disabled={isPending}
							className={`flex-1 rounded-md px-4 py-2 font-medium transition-colors ${
								isPending ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-gray-500 text-white hover:bg-gray-600"
							}`}
						>
							💾 保存草稿
						</button>
					</div>

					<div className="rounded-md bg-blue-50 p-4">
						<p className="text-blue-700 text-sm">
							💡 注意：发布按钮会显示表单状态，保存草稿按钮使用 formAction 处理不同操作！
						</p>
					</div>
				</form>
			</div>
		</FormStatusContext.Provider>
	);
}

// SubmitButton 子组件
function PublishButton() {
	const { pending, data } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className={`flex-1 rounded-md px-4 py-2 font-medium transition-colors ${
				pending ? "cursor-not-allowed bg-blue-400 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
			}`}
		>
			{pending ? "发布中..." : "🚀 发布文章"}
			{data && (
				<p className="mt-1 text-blue-100 text-xs">正在发布: {(data.get("message") as string)?.substring(0, 20)}...</p>
			)}
		</button>
	);
}

// useFormStatus Demo 组件 - 进度指示场景
function UseFormStatusProgressDemo() {
	const [file, setFile] = useState<File | null>(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isPending, setIsPending] = useState(false);
	const [formContextData, setFormContextData] = useState<FormData | null>(null);

	const uploadFile = async (formData: FormData) => {
		const file = formData.get("file") as File;

		// 模拟文件上传进度
		for (let i = 0; i <= 100; i += 10) {
			await new Promise((resolve) => setTimeout(resolve, 200));
			setUploadProgress(i);
		}

		console.log("文件上传完成:", file.name);
		return { success: true, message: "文件上传成功！" };
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);
		setFormContextData(formData);
		setIsPending(true);
		setUploadProgress(0);

		await uploadFile(formData);

		setIsPending(false);
		setFormContextData(null);
	};

	return (
		<FormStatusContext.Provider value={{ pending: isPending, data: formContextData }}>
			<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
				<h5 className="mb-3 font-semibold text-gray-800">📤 文件上传进度场景</h5>
				<form onSubmit={handleSubmit} className="max-w-md space-y-4">
					<div>
						<label className="mb-2 block font-medium text-gray-700 text-sm">选择文件</label>
						<input
							type="file"
							onChange={(e) => setFile(e.target.files?.[0] || null)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						/>
					</div>

					<UploadButton />

					{uploadProgress > 0 && (
						<div className="mt-4">
							<div className="mb-2 flex items-center justify-between">
								<span className="font-medium text-gray-700 text-sm">上传进度</span>
								<span className="text-gray-600 text-sm">{uploadProgress}%</span>
							</div>
							<div className="h-2 w-full rounded-full bg-gray-200">
								<div
									className="h-2 rounded-full bg-blue-600 transition-all duration-300"
									style={{ width: `${uploadProgress}%` }}
								></div>
							</div>
						</div>
					)}

					<div className="rounded-md bg-green-50 p-4">
						<p className="text-green-700 text-sm">💡 注意：上传按钮基于表单状态自动禁用/启用，并显示上传进度！</p>
					</div>
				</form>
			</div>
		</FormStatusContext.Provider>
	);
}

// UploadButton 子组件
function UploadButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
				pending ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-green-500 text-white hover:bg-green-600"
			}`}
		>
			{pending ? "上传中..." : "📤 开始上传"}
		</button>
	);
}

// ServerFunctions Demo 组件 - 文件上传场景
function ServerFunctionsFileUploadDemo() {
	const [file, setFile] = useState<File | null>(null);
	const [uploadResult, setUploadResult] = useState<{ success?: boolean; message?: string; url?: string } | null>(null);
	const [isPending, setIsPending] = useState(false);

	const uploadFile = async (file: File) => {
		// 模拟 Server Function 文件上传
		await new Promise((resolve) => setTimeout(resolve, 2000));

		if (!file) {
			return { success: false, message: "请选择文件" };
		}

		if (file.size > 5 * 1024 * 1024) {
			return { success: false, message: "文件大小不能超过 5MB" };
		}

		// 模拟成功上传
		return {
			success: true,
			message: "文件上传成功！",
			url: `https://example.com/files/${file.name}`,
		};
	};

	const handleUpload = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) return;

		setIsPending(true);
		setUploadResult(null);

		const result = await uploadFile(file);
		setUploadResult(result);
		setIsPending(false);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">📁 服务端文件上传</h5>
			<form onSubmit={handleUpload} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">选择文件</label>
					<input
						type="file"
						onChange={(e) => setFile(e.target.files?.[0] || null)}
						disabled={isPending}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
					/>
					{file && (
						<p className="mt-1 text-gray-500 text-xs">
							已选择: {file.name} ({(file.size / 1024).toFixed(2)} KB)
						</p>
					)}
				</div>

				<button
					type="submit"
					disabled={isPending || !file}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						isPending || !file
							? "cursor-not-allowed bg-gray-400 text-gray-200"
							: "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{isPending ? "上传中..." : "🚀 上传文件"}
				</button>

				{uploadResult && (
					<div
						className={`rounded-md px-4 py-3 ${
							uploadResult.success
								? "border-green-200 bg-green-50 text-green-700"
								: "border-red-200 bg-red-50 text-red-700"
						}`}
					>
						{uploadResult.message}
						{uploadResult.success && uploadResult.url && <p className="mt-1 text-xs">访问地址: {uploadResult.url}</p>}
					</div>
				)}

				<div className="text-gray-500 text-xs">💡 提示：文件大小限制为 5MB</div>
			</form>
		</div>
	);
}

// ServerFunctions Demo 组件 - 数据搜索场景
function ServerFunctionsSearchDemo() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<Array<{ id: number; title: string; description: string }>>([]);
	const [isSearching, setIsSearching] = useState(false);

	const searchData = async (searchQuery: string) => {
		// 模拟 Server Function 搜索
		await new Promise((resolve) => setTimeout(resolve, 1200));

		if (!searchQuery.trim()) {
			return [];
		}

		// 模拟搜索结果
		const mockData = [
			{ id: 1, title: "React 19 完整指南", description: "深入学习 React 19 的新特性和最佳实践" },
			{ id: 2, title: "现代前端开发", description: "掌握现代前端开发的核心技术和工具" },
			{ id: 3, title: "TypeScript 高级用法", description: "探索 TypeScript 的高级类型系统和应用" },
			{ id: 4, title: "性能优化实战", description: "学习 Web 应用性能优化的实用技巧" },
		];

		return mockData.filter(
			(item) =>
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	};

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSearching(true);

		const searchResults = await searchData(query);
		setResults(searchResults);
		setIsSearching(false);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🔍 服务端数据搜索</h5>
			<form onSubmit={handleSearch} className="max-w-md space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm">搜索关键词</label>
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						disabled={isSearching}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						placeholder="输入搜索关键词..."
					/>
				</div>

				<button
					type="submit"
					disabled={isSearching || !query.trim()}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						isSearching || !query.trim()
							? "cursor-not-allowed bg-gray-400 text-gray-200"
							: "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{isSearching ? "搜索中..." : "🔍 搜索"}
				</button>

				{results.length > 0 && (
					<div className="mt-4 space-y-2">
						<h6 className="font-medium text-gray-900">搜索结果：</h6>
						{results.map((result) => (
							<div key={result.id} className="rounded-md border border-gray-200 bg-white p-3">
								<h6 className="font-medium text-gray-900">{result.title}</h6>
								<p className="text-gray-600 text-sm">{result.description}</p>
							</div>
						))}
					</div>
				)}

				<div className="text-gray-500 text-xs">💡 提示：试试搜索 "React" 或 "TypeScript"</div>
			</form>
		</div>
	);
}

// useTransition Demo 组件 - 数据过滤场景
function UseTransitionFilterDemo() {
	const [isPending, startTransition] = useTransition();
	const [products] = useState([
		{ id: 1, name: "React 19 完全指南", price: 89, category: "前端" },
		{ id: 2, name: "TypeScript 高级编程", price: 128, category: "前端" },
		{ id: 3, name: "Node.js 实战", price: 98, category: "后端" },
		{ id: 4, name: "Vue 3 深入浅出", price: 76, category: "前端" },
		{ id: 5, name: "Python 数据分析", price: 118, category: "数据" },
		{ id: 6, name: "Docker 容器技术", price: 108, category: "运维" },
	]);
	const [filteredProducts, setFilteredProducts] = useState(products);
	const [selectedCategory, setSelectedCategory] = useState("全部");

	const filterProducts = (category: string) => {
		setSelectedCategory(category);

		startTransition(() => {
			// 模拟大量数据过滤
			setTimeout(() => {
				if (category === "全部") {
					setFilteredProducts(products);
				} else {
					setFilteredProducts(products.filter((p) => p.category === category));
				}
			}, 500);
		});
	};

	const categories = ["全部", "前端", "后端", "数据", "运维"];

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🏷️ 产品分类过滤</h5>

			<div className="mb-4">
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => filterProducts(category)}
							className={`rounded-full px-3 py-1 font-medium text-sm transition-colors ${
								selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							{category}
						</button>
					))}
				</div>
				{isPending && (
					<div className="mt-2 flex items-center text-blue-600 text-sm">
						<div className="mr-2 h-4 w-4 animate-spin rounded-full border-blue-600 border-b-2"></div>
						筛选中...
					</div>
				)}
			</div>

			<div className={`space-y-2 transition-opacity ${isPending ? "opacity-60" : "opacity-100"}`}>
				{filteredProducts.map((product) => (
					<div key={product.id} className="rounded-md border border-gray-200 bg-white p-3">
						<div className="flex items-start justify-between">
							<div>
								<h6 className="font-medium text-gray-900">{product.name}</h6>
								<span className="text-gray-500 text-xs">{product.category}</span>
							</div>
							<span className="font-medium text-blue-600">¥{product.price}</span>
						</div>
					</div>
				))}
			</div>

			<div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3">
				<p className="text-blue-700 text-xs">⚡ 注意：分类按钮立即响应，数据筛选在后台进行，界面不会卡顿！</p>
			</div>
		</div>
	);
}

// useTransition Demo 组件 - 数据同步场景
function UseTransitionDataSyncDemo() {
	const [isPending, startTransition] = useTransition();
	const [localData, setLocalData] = useState({
		name: "张三",
		email: "zhangsan@example.com",
		phone: "13800138000",
	});
	const [serverData, setServerData] = useState(localData);
	const [syncStatus, setSyncStatus] = useState<"已同步" | "同步中" | "有未保存更改">("已同步");

	const handleChange = (field: keyof typeof localData, value: string) => {
		setLocalData((prev) => ({ ...prev, [field]: value }));
		setSyncStatus("有未保存更改");
	};

	const saveToServer = async () => {
		// 立即更新UI状态
		setSyncStatus("同步中");

		startTransition(async () => {
			// 模拟网络延迟
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// 模拟服务端保存
			setServerData(localData);
			setSyncStatus("已同步");
		});
	};

	const hasChanges = JSON.stringify(localData) !== JSON.stringify(serverData);

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🔄 数据同步场景</h5>

			<div className="max-w-md space-y-4">
				<div className="mb-4 flex items-center justify-between">
					<span className="font-medium text-gray-700 text-sm">同步状态：</span>
					<span
						className={`font-medium text-sm ${
							syncStatus === "已同步" ? "text-green-600" : syncStatus === "同步中" ? "text-blue-600" : "text-orange-600"
						}`}
					>
						{syncStatus === "已同步" && "✅ "}
						{syncStatus === "同步中" && "🔄 "}
						{syncStatus === "有未保存更改" && "⚠️ "}
						{syncStatus}
					</span>
				</div>

				<div className="space-y-3">
					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">姓名</label>
						<input
							type="text"
							value={localData.name}
							onChange={(e) => handleChange("name", e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						/>
					</div>
					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">邮箱</label>
						<input
							type="email"
							value={localData.email}
							onChange={(e) => handleChange("email", e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						/>
					</div>
					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">电话</label>
						<input
							type="tel"
							value={localData.phone}
							onChange={(e) => handleChange("phone", e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
						/>
					</div>
				</div>

				<button
					onClick={saveToServer}
					disabled={!hasChanges || syncStatus === "同步中"}
					className={`w-full rounded-md px-4 py-2 font-medium transition-colors ${
						!hasChanges || syncStatus === "同步中"
							? "cursor-not-allowed bg-gray-400 text-gray-200"
							: "bg-blue-500 text-white hover:bg-blue-600"
					}`}
				>
					{syncStatus === "同步中" ? "保存中..." : "💾 保存到服务器"}
				</button>

				<div
					className={`rounded-md p-3 text-sm ${
						isPending ? "border-blue-200 bg-blue-50 text-blue-700" : "border-gray-200 bg-gray-50 text-gray-600"
					}`}
				>
					{isPending
						? "🔄 正在同步数据到服务器，您可以继续编辑其他字段..."
						: "💡 修改数据后会显示未保存状态，点击保存按钮使用 transition 同步到服务器"}
				</div>
			</div>
		</div>
	);
}

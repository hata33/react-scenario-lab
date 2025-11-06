"use client";

import { AlertCircle, ArrowLeft, CheckCircle, Clock, Code, Copy, Target, Zap } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Layout from "@/components/Layout";
// Import utils
import { copyWithFeedback } from "@/utils";

// Import extracted components from index files
import {
	ArchitectureOverview,
	ExampleDetail,
	ExampleSelector,
	Header,
	OfficialExamples,
	ThreeWRule,
} from "../(components)";
// Import types
import type { ActionExample, WSection } from "../(types)";
// Import demo components from index file
import {
	ServerFunctionsDemo,
	ServerFunctionsFileUploadDemo,
	ServerFunctionsSearchDemo,
	UseActionStateCommentDemo,
	UseActionStateDemo,
	UseActionStateLoginDemo,
	UseFormStatusDemo,
	UseFormStatusMultiButtonDemo,
	UseFormStatusProgressDemo,
	UseOptimisticCartDemo,
	UseOptimisticDemo,
	UseOptimisticLikeDemo,
	UseTransitionDataSyncDemo,
	UseTransitionDemo,
	UseTransitionFilterDemo,
} from "./(components)";

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
	const [selectedExample, setSelectedExample] = useState(actionExamples[0]);

	const architectureFeatures = [
		{
			icon: <Code className="h-6 w-6 text-blue-600" />,
			title: "状态管理",
			description: "自动处理异步状态",
			bgColor: "bg-blue-50",
			iconColor: "text-blue-600",
			titleColor: "text-blue-900",
			descriptionColor: "text-blue-700",
		},
		{
			icon: <Zap className="h-6 w-6 text-green-600" />,
			title: "乐观更新",
			description: "即时响应用户操作",
			bgColor: "bg-green-50",
			iconColor: "text-green-600",
			titleColor: "text-green-900",
			descriptionColor: "text-green-700",
		},
		{
			icon: <Target className="h-6 w-6 text-purple-600" />,
			title: "表单处理",
			description: "简化表单状态管理",
			bgColor: "bg-purple-50",
			iconColor: "text-purple-600",
			titleColor: "text-purple-900",
			descriptionColor: "text-purple-700",
		},
		{
			icon: <Clock className="h-6 w-6 text-orange-600" />,
			title: "性能优化",
			description: "并发渲染不阻塞",
			bgColor: "bg-orange-50",
			iconColor: "text-orange-600",
			titleColor: "text-orange-900",
			descriptionColor: "text-orange-700",
		},
	];

	// 3W Rule data
	const threeWSections: WSection[] = [
		{
			description:
				"Actions 是 React 19 中简化异步数据变更的新机制，配套提供 useActionState、useOptimistic、useFormStatus、useTransition 等 Hook，形成完整的异步操作生态系统。",
			features: ["自动状态管理", "统一的 Hook 接口", "服务端集成", "渐进增强支持"],
		},
		{
			description:
				"解决传统表单处理复杂、状态管理繁琐、用户体验不佳的问题。通过提供标准化的异步操作模式和内置的 pending 状态管理，大幅简化了开发复杂度。",
			features: ["减少样板代码", "统一处理模式", "改善用户体验", "提升开发效率"],
		},
		{
			description:
				"处理表单提交、数据变更、乐观更新、并发渲染场景。特别适合需要良好用户体验的交互式应用，如社交平台、电商系统、协作工具等。",
			features: ["表单操作", "异步数据变更", "实时 UI 更新", "性能敏感场景"],
		},
	];

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

	// Get demo components based on selected example
	const getDemoComponents = () => {
		switch (selectedExample.id) {
			case "useActionState":
				return [
					<UseActionStateDemo key="signup" />,
					<UseActionStateLoginDemo key="login" />,
					<UseActionStateCommentDemo key="comment" />,
				];
			case "useOptimistic":
				return [
					<UseOptimisticDemo key="todo" />,
					<UseOptimisticLikeDemo key="like" />,
					<UseOptimisticCartDemo key="cart" />,
				];
			case "useFormStatus":
				return [
					<UseFormStatusDemo key="basic" />,
					<UseFormStatusMultiButtonDemo key="multi" />,
					<UseFormStatusProgressDemo key="progress" />,
				];
			case "serverFunctions":
				return [
					<ServerFunctionsDemo key="chat" />,
					<ServerFunctionsFileUploadDemo key="upload" />,
					<ServerFunctionsSearchDemo key="search" />,
				];
			case "useTransition":
				return [
					<UseTransitionDemo key="search" />,
					<UseTransitionFilterDemo key="filter" />,
					<UseTransitionDataSyncDemo key="sync" />,
				];
			default:
				return [];
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* Header */}
				<Header
					icon={<Zap className="h-8 w-8 text-blue-600" />}
					title="React 19 Actions"
					subtitle="现代 React 应用的异步操作生态系统"
				/>

				{/* Actions 架构概览 */}
				<ArchitectureOverview title="Actions 生态系统" features={architectureFeatures} />

				{/* 3W 法则解析 */}
				<ThreeWRule title="🎯 3W 法则解析" sections={threeWSections} />

				{/* Hook 选择器 - 吸顶区域 */}
				<ExampleSelector
					selectorLabel="选择 Hook:"
					examples={actionExamples}
					selectedExampleId={selectedExample.id}
					onExampleSelect={(exampleId) => {
						const example = actionExamples.find((ex) => ex.id === exampleId);
						if (example) setSelectedExample(example);
					}}
				/>

				{/* 详细展示区域 - 下方内容 */}
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					{selectedExample && (
						<ExampleDetail
							example={selectedExample}
							demoComponents={getDemoComponents()}
							onCopyCode={(code) => copyWithFeedback(code, setCopiedCode)}
							copiedCode={copiedCode}
						/>
					)}
				</div>

				{/* 官方代码示例 */}
				<OfficialExamples
					title={`📚 ${selectedExample?.title} 官方示例`}
					description={`以下示例来自 React 官方文档，展示了 ${selectedExample?.title} 的最佳实践`}
					examples={getOfficialExamples(selectedExample?.id || "")}
				/>
			</div>
		</Layout>
	);
}

"use client";

import { AlertCircle, CheckCircle, Code, Copy, Database, Play, Target, Zap } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import Layout from "@/components/Layout";

// 类型定义
type User = { name: string; email: string; role: string; avatar: string };
type Theme = "light" | "dark";
type UserPromise = Promise<User>;
type Article = {
	id: number;
	title: string;
	content: string;
	author: string;
	timestamp: string;
	tags: string[];
};
type ArticlePromise = Promise<Article>;
type RaceResult = {
	source: string;
	time: string;
	data: string;
	error?: string;
};
type ConditionalUser = {
	id: number;
	name: string;
	role: "admin" | "user";
	permissions: string[];
};

interface UseHookExample {
	id: string;
	title: string;
	description: string;
	category: "Promise Consumption" | "Context Integration" | "Async Rendering" | "Performance Optimization";
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

const useHookExamples: UseHookExample[] = [
	{
		id: "asyncContext",
		title: "异步 Context",
		description: "直接在渲染中消费异步 Context，简化异步数据处理流程",
		category: "Context Integration",
		difficulty: "中级",
		status: "completed",
		icon: <Database className="h-5 w-5" />,
		codeSnippet: `"use client";
import { use } from "react";

// 异步 Context
const UserContext = createContext(null);

function UserProfile() {
  const user = use(fetchUser());

  if (!user) {
    return <div>加载中...</div>;
  }

  return <div>{user.name}</div>;
}`,
		benefits: ["简化异步逻辑", "自动加载状态", "代码简洁", "原生集成"],
		useCases: ["用户信息展示", "配置获取", "异步数据加载", "权限验证"],
		problemsSolved: [
			{
				problem: "异步数据处理复杂",
				description: "需要手动管理 loading、error 状态，使用 useEffect + useState 的复杂模式",
				solution: "use() Hook 自动处理异步状态，直接返回 resolved 值，无需手动状态管理",
			},
			{
				problem: "Context 嵌套过深",
				description: "多层 Context Provider 导致组件嵌套复杂，性能问题突出",
				solution: "use() 可以直接消费异步 Context，减少 Provider 嵌套，提升性能",
			},
			{
				problem: "代码可读性差",
				description: "异步逻辑分散在多个地方，代码逻辑难以理解和维护",
				solution: "将异步逻辑集中在 use() 调用点，代码更加清晰和易读",
			},
			{
				problem: "状态同步困难",
				description: "多个组件间的异步状态同步复杂，容易出现不一致",
				solution: "use() 提供统一的状态管理机制，保证数据一致性",
			},
		],
	},
	{
		id: "promiseConsume",
		title: "Promise 消费",
		description: "直接在渲染中消费 Promise，无需额外状态管理",
		category: "Promise Consumption",
		difficulty: "初级",
		status: "completed",
		icon: <Zap className="h-5 w-5" />,
		codeSnippet: `"use client";
import { use } from "react";

function DataDisplay({ promise }) {
  const data = use(promise);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}`,
		benefits: ["零状态管理", "代码简洁", "自动错误处理", "Suspense 集成"],
		useCases: ["API 数据展示", "文件读取", "计算结果", "网络请求"],
		problemsSolved: [
			{
				problem: "状态管理冗余",
				description: "每个异步操作都需要 loading、error、data 三个状态，代码重复严重",
				solution: "use() Hook 直接返回数据，自动处理加载和错误状态，无需手动状态管理",
			},
			{
				problem: "错误处理复杂",
				description: "需要编写 try-catch 逻辑，错误处理代码重复且容易遗漏",
				solution: "use() 自动集成错误处理机制，错误会触发最近的 Suspense 边界",
			},
			{
				problem: "性能开销大",
				description: "多个异步状态管理组件会增加不必要的重渲染",
				solution: "use() 是 React 19 的原生 Hook，性能优化且开销最小",
			},
			{
				problem: "代码耦合度高",
				description: "异步逻辑与组件逻辑混合，代码耦合度高，难以测试",
				solution: "use() 将异步逻辑分离，组件专注于渲染，代码更加解耦",
			},
		],
	},
	{
		id: "promiseRace",
		title: "Promise 竞速",
		description: "配合 Promise.race() 实现多数据源竞速，自动选择最快结果",
		category: "Performance Optimization",
		difficulty: "高级",
		status: "completed",
		icon: <Play className="h-5 w-5" />,
		codeSnippet: `"use client";
import { use } from "react";

function FastestData() {
  const winner = use(Promise.race([
    fetchFromAPI1(),
    fetchFromAPI2(),
    fetchFromAPI3()
  ]));

  return (
    <div>
      <h2>最快来源: {winner.source}</h2>
      <p>{winner.data}</p>
    </div>
  );
}`,
		benefits: ["自动竞速", "性能优化", "容错处理", "用户体验提升"],
		useCases: ["多源数据获取", "CDN 选择", "缓存策略", "负载均衡"],
		problemsSolved: [
			{
				problem: "响应时间慢",
				description: "单数据源获取时响应时间固定，无法利用更快的备选源",
				solution: "Promise.race() 配合 use() 自动选择最快的响应源，显著提升响应速度",
			},
			{
				problem: "容错能力弱",
				description: "单一数据源故障时，应用完全不可用，缺乏容错机制",
				solution: "多个数据源竞速，单个源故障时其他源可以正常工作",
			},
			{
				problem: "负载不均衡",
				description: "所有请求都发往同一个源，无法有效利用分布式架构",
				solution: "可以智能分配请求到不同源，实现负载均衡",
			},
			{
				problem: "用户体验差",
				description: "用户需要等待固定的响应时间，无法获得最优体验",
				solution: "自动选择最快响应，用户获得最佳体验",
			},
		],
	},
	{
		id: "conditionalRender",
		title: "条件渲染",
		description: "在条件语句和循环中使用 use()，实现灵活的渲染控制",
		category: "Async Rendering",
		difficulty: "中级",
		status: "completed",
		icon: <Target className="h-5 w-5" />,
		codeSnippet: `"use client";
import { use } from "react";

function ConditionalDisplay({ userId, hasPermission }) {
  const userData = use(userId ? fetchUser(userId) : null);
  const features = use(hasPermission ? fetchFeatures() : null);

  return (
    <div>
      {userData && <UserProfile user={userData} />}
      {features && <FeatureList features={features} />}
    </div>
  );
}`,
		benefits: ["灵活渲染", "条件加载", "性能优化", "逻辑清晰"],
		useCases: ["权限控制", "条件显示", "动态内容", "渐进式加载"],
		problemsSolved: [
			{
				problem: "渲染逻辑复杂",
				description: "条件渲染需要复杂的嵌套逻辑，代码可读性差",
				solution: "use() 可以直接在条件语句中使用，渲染逻辑更加清晰简洁",
			},
			{
				problem: "性能浪费",
				description: "不满足条件的数据也会被加载，造成资源浪费",
				solution: "只在条件满足时才加载数据，避免不必要的请求",
			},
			{
				problem: "状态管理困难",
				description: "条件渲染的状态管理复杂，容易出现状态不一致",
				solution: "use() 自动处理异步状态，无需手动管理复杂的条件状态",
			},
			{
				problem: "组件耦合度高",
				description: "条件逻辑与组件渲染逻辑混合，组件耦合度高",
				solution: "将条件逻辑提取到 use() 调用点，组件更加解耦",
			},
		],
	},
];

// 交互式演示组件
function AsyncContextDemo() {
	const [selectedDemo, setSelectedDemo] = useState(1);
	const [isActive, setIsActive] = useState(false);
	const [userData, setUserData] = useState<User | null>(null);
	const [theme, setTheme] = useState<Theme>("light");

	// 模拟异步加载用户数据
	const loadUser = async (id: number): Promise<User> => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		return {
			name: `用户 ${id}`,
			email: `user${id}@example.com`,
			role: id % 2 === 0 ? "admin" : "developer",
			avatar: `https://picsum.photos/seed/user${id}/100/100.jpg`,
		};
	};

	const saveState = useCallback(() => {
		if (isActive && userData) {
			sessionStorage.setItem("async-context-demo", JSON.stringify({ userData, theme }));
		}
	}, [isActive, userData, theme]);

	const restoreState = () => {
		const saved = sessionStorage.getItem("async-context-demo");
		if (saved) {
			const { userData: savedUserData, theme: savedTheme } = JSON.parse(saved);
			setUserData(savedUserData);
			setTheme(savedTheme);
		}
	};

	const clearState = () => {
		sessionStorage.removeItem("async-context-demo");
		setUserData(null);
		setTheme("light");
	};

	useEffect(() => {
		saveState();
	}, [saveState]);

	const handleLoadUser = async () => {
		setUserData(null);
		const user = await loadUser(selectedDemo);
		setUserData(user);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-4">
				<button
					onClick={() => setIsActive(!isActive)}
					className={`rounded-lg px-4 py-2 text-white transition-colors ${
						isActive ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-600 hover:bg-gray-700"
					}`}
				>
					{isActive ? "活动状态" : "暂停状态"}
				</button>
				<button onClick={restoreState} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
					恢复状态
				</button>
				<button onClick={clearState} className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
					重置状态
				</button>
			</div>

			<div className="space-y-4">
				<div className="flex items-center gap-4">
					<label className="font-medium">选择用户ID:</label>
					<select
						value={selectedDemo}
						onChange={(e) => setSelectedDemo(Number(e.target.value))}
						className="rounded-lg border border-gray-300 px-4 py-2"
					>
						{[1, 2, 3, 4, 5].map((id) => (
							<option key={id} value={id}>
								用户 {id}
							</option>
						))}
					</select>
					<button
						onClick={handleLoadUser}
						className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
					>
						加载用户数据
					</button>
				</div>

				<div className="flex items-center gap-4">
					<label className="font-medium">主题:</label>
					<button
						onClick={() => setTheme(theme === "light" ? "dark" : "light")}
						className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
					>
						{theme === "light" ? "🌙 深色" : "☀️ 浅色"}
					</button>
				</div>

				{userData && (
					<div className={`rounded-xl p-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
						<h4 className="mb-4 font-semibold text-xl">用户信息 (异步 Context)</h4>
						<div className="flex items-center gap-4">
							<img src={userData.avatar} alt={userData.name} className="h-16 w-16 rounded-full" />
							<div>
								<div className="font-semibold text-lg">{userData.name}</div>
								<div className="text-gray-600 dark:text-gray-400">{userData.email}</div>
								<div className="text-blue-600 dark:text-blue-400">{userData.role}</div>
							</div>
						</div>
					</div>
				)}

				<div className="rounded-lg bg-emerald-50 p-4">
					<p className="text-emerald-800 text-sm">
						💡 <strong>提示：</strong>
						{isActive ? "状态正在自动保存" : "状态保存已暂停"}。{userData && `已加载用户: ${userData.name}`}
					</p>
				</div>
			</div>
		</div>
	);
}

function PromiseConsumeDemo() {
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [isActive, setIsActive] = useState(false);
	const [articleData, setArticleData] = useState<Article | null>(null);

	const fetchArticle = async (id: number): Promise<Article> => {
		await new Promise((resolve) => setTimeout(resolve, 1500));
		return {
			id,
			title: `技术文章 ${id}`,
			content: `这是技术文章 ${id} 的详细内容，包含了丰富的技术知识和实践案例。文章涵盖了前端开发的各个方面，包括 React、TypeScript、性能优化等内容。`,
			author: `技术专家 ${id}`,
			timestamp: new Date().toLocaleString(),
			tags: ["React", "TypeScript", "前端开发", "性能优化"],
		};
	};

	const saveState = useCallback(() => {
		if (isActive && articleData) {
			sessionStorage.setItem("promise-consume-demo", JSON.stringify({ articleData }));
		}
	}, [isActive, articleData]);

	const restoreState = () => {
		const saved = sessionStorage.getItem("promise-consume-demo");
		if (saved) {
			const { articleData: savedArticleData } = JSON.parse(saved);
			setArticleData(savedArticleData);
		}
	};

	const clearState = () => {
		sessionStorage.removeItem("promise-consume-demo");
		setArticleData(null);
	};

	useEffect(() => {
		saveState();
	}, [saveState]);

	const handleSelect = async (id: number) => {
		setSelectedId(id);
		const article = await fetchArticle(id);
		setArticleData(article);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-4">
				<button
					onClick={() => setIsActive(!isActive)}
					className={`rounded-lg px-4 py-2 text-white transition-colors ${
						isActive ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-600 hover:bg-gray-700"
					}`}
				>
					{isActive ? "活动状态" : "暂停状态"}
				</button>
				<button onClick={restoreState} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
					恢复状态
				</button>
				<button onClick={clearState} className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
					重置状态
				</button>
			</div>

			<div className="space-y-4">
				<h4 className="font-semibold">选择要加载的文章：</h4>
				<div className="flex gap-2">
					{[1, 2, 3, 4, 5].map((id) => (
						<button
							key={id}
							onClick={() => handleSelect(id)}
							className={`rounded-lg px-4 py-2 transition-colors ${
								selectedId === id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							文章 {id}
						</button>
					))}
				</div>

				{articleData && (
					<div className="rounded-xl bg-white p-6 shadow-lg">
						<h4 className="mb-3 font-semibold text-gray-900 text-xl">Promise 消费演示</h4>
						<h5 className="mb-2 text-gray-800 text-lg">{articleData.title}</h5>
						<p className="mb-4 text-gray-600">{articleData.content}</p>
						<div className="flex justify-between text-gray-500 text-sm">
							<span>作者: {articleData.author}</span>
							<span>{articleData.timestamp}</span>
						</div>
						<div className="mt-3 flex gap-2">
							{articleData.tags.map((tag) => (
								<span key={tag} className="rounded-full bg-blue-100 px-3 py-1 text-blue-700 text-xs">
									{tag}
								</span>
							))}
						</div>
					</div>
				)}

				<div className="rounded-lg bg-emerald-50 p-4">
					<p className="text-emerald-800 text-sm">
						💡 <strong>提示：</strong>
						{isActive ? "状态正在自动保存" : "状态保存已暂停"}。{articleData && `已加载: ${articleData.title}`}
					</p>
				</div>
			</div>
		</div>
	);
}

function PromiseRaceDemo() {
	const [isRacing, setIsRacing] = useState(false);
	const [winner, setWinner] = useState<RaceResult | null>(null);
	const [isActive, setIsActive] = useState(false);

	const startRace = async () => {
		setIsRacing(true);
		setWinner(null);

		const promises = [
			new Promise<RaceResult>((resolve) => {
				setTimeout(() => resolve({ source: "快速API", time: "1秒", data: "这是最快的数据源返回结果" }), 1000);
			}),
			new Promise<RaceResult>((resolve) => {
				setTimeout(() => resolve({ source: "中速API", time: "2秒", data: "这是中等速度的数据源返回结果" }), 2000);
			}),
			new Promise<RaceResult>((resolve) => {
				setTimeout(() => resolve({ source: "慢速API", time: "3秒", data: "这是最慢的数据源返回结果" }), 3000);
			}),
		];

		try {
			const result = await Promise.race(promises);
			setWinner(result);
		} catch (error: unknown) {
			setWinner({
				source: "错误",
				time: "",
				data: "",
				error: error instanceof Error ? error.message : "未知错误",
			});
		} finally {
			setIsRacing(false);
		}
	};

	const saveState = useCallback(() => {
		if (isActive && winner) {
			sessionStorage.setItem("promise-race-demo", JSON.stringify({ winner }));
		}
	}, [isActive, winner]);

	const restoreState = () => {
		const saved = sessionStorage.getItem("promise-race-demo");
		if (saved) {
			const { winner: savedWinner } = JSON.parse(saved);
			setWinner(savedWinner);
		}
	};

	const clearState = () => {
		sessionStorage.removeItem("promise-race-demo");
		setWinner(null);
	};

	useEffect(() => {
		saveState();
	}, [saveState]);

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-4">
				<button
					onClick={() => setIsActive(!isActive)}
					className={`rounded-lg px-4 py-2 text-white transition-colors ${
						isActive ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-600 hover:bg-gray-700"
					}`}
				>
					{isActive ? "活动状态" : "暂停状态"}
				</button>
				<button onClick={restoreState} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
					恢复状态
				</button>
				<button onClick={clearState} className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
					重置状态
				</button>
			</div>

			<div className="space-y-4">
				<button
					onClick={startRace}
					disabled={isRacing}
					className={`rounded-lg px-6 py-3 font-medium transition-colors ${
						isRacing ? "cursor-not-allowed bg-gray-400 text-gray-200" : "bg-green-600 text-white hover:bg-green-700"
					}`}
				>
					{isRacing ? "比赛进行中..." : "开始 Promise 竞速"}
				</button>

				{isRacing && (
					<div className="flex items-center gap-4 rounded-lg bg-blue-50 p-4">
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
							<span className="text-sm">快速API (1秒)</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 animate-pulse rounded-full bg-yellow-500"></div>
							<span className="text-sm">中速API (2秒)</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
							<span className="text-sm">慢速API (3秒)</span>
						</div>
					</div>
				)}

				{winner && (
					<div
						className={`rounded-xl border-2 p-6 ${
							winner.error ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"
						}`}
					>
						<h4 className="mb-3 font-bold text-xl">🏆 竞速获胜者: {winner.source}</h4>
						{winner.error ? (
							<p className="text-red-600">错误: {winner.error}</p>
						) : (
							<div>
								<p className="mb-2 text-gray-700">
									<strong>响应时间:</strong> {winner.time}
								</p>
								<p className="text-gray-700">
									<strong>数据:</strong> {winner.data}
								</p>
							</div>
						)}
					</div>
				)}

				<div className="rounded-lg bg-emerald-50 p-4">
					<p className="text-emerald-800 text-sm">
						💡 <strong>提示：</strong>
						{isActive ? "状态正在自动保存" : "状态保存已暂停"}。{winner && `获胜者: ${winner.source}`}
					</p>
				</div>
			</div>
		</div>
	);
}

function ConditionalRenderDemo() {
	const [userId, setUserId] = useState<number | null>(null);
	const [hasPermission, setHasPermission] = useState(false);
	const [showAdvanced, setShowAdvanced] = useState(false);
	const [isActive, setIsActive] = useState(false);

	const checkPermission = async (id: number): Promise<boolean> => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return id % 2 === 0; // 偶数用户有权限
	};

	const handleLoadUser = async () => {
		const id = Math.floor(Math.random() * 10) + 1;
		setUserId(id);
		const permission = await checkPermission(id);
		setHasPermission(permission);
	};

	const saveState = useCallback(() => {
		if (isActive) {
			sessionStorage.setItem(
				"conditional-render-demo",
				JSON.stringify({
					userId,
					hasPermission,
					showAdvanced,
				}),
			);
		}
	}, [isActive, userId, hasPermission, showAdvanced]);

	const restoreState = () => {
		const saved = sessionStorage.getItem("conditional-render-demo");
		if (saved) {
			const {
				userId: savedUserId,
				hasPermission: savedHasPermission,
				showAdvanced: savedShowAdvanced,
			} = JSON.parse(saved);
			setUserId(savedUserId);
			setHasPermission(savedHasPermission);
			setShowAdvanced(savedShowAdvanced);
		}
	};

	const clearState = () => {
		sessionStorage.removeItem("conditional-render-demo");
		setUserId(null);
		setHasPermission(false);
		setShowAdvanced(false);
	};

	useEffect(() => {
		saveState();
	}, [saveState]);

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-4">
				<button
					onClick={() => setIsActive(!isActive)}
					className={`rounded-lg px-4 py-2 text-white transition-colors ${
						isActive ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-600 hover:bg-gray-700"
					}`}
				>
					{isActive ? "活动状态" : "暂停状态"}
				</button>
				<button onClick={restoreState} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
					恢复状态
				</button>
				<button onClick={clearState} className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
					重置状态
				</button>
			</div>

			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={handleLoadUser}
						className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
					>
						加载随机用户
					</button>

					<button
						onClick={() => setShowAdvanced(!showAdvanced)}
						className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
					>
						{showAdvanced ? "隐藏高级功能" : "显示高级功能"}
					</button>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					{/* 条件渲染用户信息 */}
					{userId && (
						<div className="rounded-xl bg-white p-6 shadow-lg">
							<h5 className="mb-3 font-semibold text-lg">基础信息</h5>
							<p className="text-gray-600">
								<strong>用户ID:</strong> {userId}
							</p>
							<p className="text-gray-600">
								<strong>权限状态:</strong>
								<span
									className={`ml-2 rounded-full px-2 py-1 text-xs ${
										hasPermission ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
									}`}
								>
									{hasPermission ? "有权限" : "无权限"}
								</span>
							</p>
						</div>
					)}

					{/* 条件渲染高级功能 */}
					{showAdvanced && userId && (
						<div className="rounded-xl bg-white p-6 shadow-lg">
							<h5 className="mb-3 font-semibold text-lg">高级功能</h5>
							<ul className="space-y-2">
								<li
									className={`flex items-center gap-2 ${hasPermission ? "text-green-600" : "text-gray-400 line-through"}`}
								>
									{hasPermission ? "✓" : "✗"} 数据分析
								</li>
								<li
									className={`flex items-center gap-2 ${hasPermission ? "text-green-600" : "text-gray-400 line-through"}`}
								>
									{hasPermission ? "✓" : "✗"} 用户管理
								</li>
								<li
									className={`flex items-center gap-2 ${hasPermission ? "text-green-600" : "text-gray-400 line-through"}`}
								>
									{hasPermission ? "✓" : "✗"} 系统设置
								</li>
							</ul>
						</div>
					)}
				</div>

				<div className="rounded-lg bg-emerald-50 p-4">
					<p className="text-emerald-800 text-sm">
						💡 <strong>提示：</strong>
						{isActive ? "状态正在自动保存" : "状态保存已暂停"}。
						{userId && `用户 ${userId} ${hasPermission ? "有" : "无"}权限`}
					</p>
				</div>
			</div>
		</div>
	);
}

const getInteractiveDemos = (exampleId: string) => {
	const demos = {
		asyncContext: [
			{
				title: "异步 Context 消费",
				description: "直接在渲染中消费异步 Context，模拟 use() Hook 的行为",
				component: <AsyncContextDemo />,
			},
		],
		promiseConsume: [
			{
				title: "Promise 数据消费",
				description: "模拟直接在渲染中消费 Promise，展示数据加载过程",
				component: <PromiseConsumeDemo />,
			},
		],
		promiseRace: [
			{
				title: "多数据源竞速",
				description: "模拟多个数据源竞速，自动选择最快响应",
				component: <PromiseRaceDemo />,
			},
		],
		conditionalRender: [
			{
				title: "条件渲染控制",
				description: "基于条件动态加载和渲染内容",
				component: <ConditionalRenderDemo />,
			},
		],
	};

	return demos[exampleId as keyof typeof demos] || [];
};

const getCategoryColor = (category: UseHookExample["category"]) => {
	switch (category) {
		case "Promise Consumption":
			return "text-blue-600 bg-blue-100";
		case "Context Integration":
			return "text-green-600 bg-green-100";
		case "Async Rendering":
			return "text-purple-600 bg-purple-100";
		case "Performance Optimization":
			return "text-orange-600 bg-orange-100";
		default:
			return "text-gray-600 bg-gray-100";
	}
};

const getDifficultyColor = (difficulty: UseHookExample["difficulty"]) => {
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

const getStatusColor = (status: UseHookExample["status"]) => {
	switch (status) {
		case "completed":
			return "text-green-600 bg-green-100";
		case "in-progress":
			return "text-blue-600 bg-blue-100";
		case "planned":
			return "text-gray-600 bg-gray-100";
		default:
			return "text-gray-600 bg-gray-100";
	}
};

const getStatusText = (status: UseHookExample["status"]) => {
	switch (status) {
		case "completed":
			return "已完成";
		case "in-progress":
			return "进行中";
		case "planned":
			return "计划中";
		default:
			return "未知";
	}
};

export default function UseHookPage() {
	const [selectedExample, setSelectedExample] = useState<UseHookExample | null>(null);
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
									<h1 className="font-bold text-3xl text-gray-900">use() Hook - React 19 新特性</h1>
									<p className="text-gray-600">直接在渲染中消费 Promise 和 Context，简化异步数据处理</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* use() Hook 架构概览 */}
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">use() Hook 生态系统</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
							<div className="rounded-lg bg-blue-50 p-4 text-center">
								<Database className="mx-auto mb-2 h-6 w-6 text-blue-600" />
								<h3 className="mb-1 font-semibold text-blue-900">异步 Context</h3>
								<p className="text-blue-700 text-sm">直接消费异步资源</p>
							</div>
							<div className="rounded-lg bg-green-50 p-4 text-center">
								<Zap className="mx-auto mb-2 h-6 w-6 text-green-600" />
								<h3 className="mb-1 font-semibold text-green-900">Promise 消费</h3>
								<p className="text-green-700 text-sm">零状态管理</p>
							</div>
							<div className="rounded-lg bg-purple-50 p-4 text-center">
								<Play className="mx-auto mb-2 h-6 w-6 text-purple-600" />
								<h3 className="mb-1 font-semibold text-purple-900">竞速优化</h3>
								<p className="text-purple-700 text-sm">多数据源竞速</p>
							</div>
							<div className="rounded-lg bg-orange-50 p-4 text-center">
								<Target className="mx-auto mb-2 h-6 w-6 text-orange-600" />
								<h3 className="mb-1 font-semibold text-orange-900">条件渲染</h3>
								<p className="text-orange-700 text-sm">灵活渲染控制</p>
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
									use() 是 React 19 中新增的 Hook，可以直接在组件的渲染阶段消费 Promise 和 Context
									资源，无需额外的状态管理。
								</p>
							</div>
							<div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
								<h3 className="mb-3 font-semibold text-blue-700 text-lg">🎯 Why (为什么)</h3>
								<p className="font-medium text-gray-800">
									解决异步数据处理复杂、Context 嵌套过深、代码可读性差的问题。
									通过直接在渲染中消费资源，大幅简化了异步代码的编写。
								</p>
							</div>
							<div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
								<h3 className="mb-3 font-semibold text-blue-700 text-lg">⏰ When (何时用)</h3>
								<p className="font-medium text-gray-800">
									异步数据获取、动态 Context 消费、Promise 竞速等场景。 特别适合需要直接在渲染中处理异步数据的组件。
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* 核心功能选择器 */}
				<div className="sticky top-0 z-10 border-gray-200 border-b bg-white shadow-sm">
					<div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
						<div className="flex items-center space-x-4">
							<span className="font-medium text-gray-700">选择功能：</span>
							<div className="flex space-x-2">
								{useHookExamples.map((example) => (
									<button
										key={example.id}
										onClick={() => setSelectedExample(example)}
										className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium text-sm transition-colors ${
											selectedExample?.id === example.id
												? "bg-blue-600 text-white"
												: "bg-gray-100 text-gray-700 hover:bg-gray-200"
										}`}
									>
										{example.icon}
										<span>{example.title}</span>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* 详细内容区域 */}
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					{selectedExample ? (
						<div className="grid gap-8 lg:grid-cols-2">
							{/* 左侧：功能详情 */}
							<div className="space-y-6">
								<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
									<div className="mb-4">
										<div className="mb-2 flex items-center space-x-3">
											{selectedExample.icon}
											<h3 className="font-semibold text-gray-900 text-xl">{selectedExample.title}</h3>
										</div>
										<div className="mb-3 flex items-center space-x-2">
											<span
												className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getCategoryColor(selectedExample.category)}`}
											>
												{selectedExample.category}
											</span>
											<span
												className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getDifficultyColor(selectedExample.difficulty)}`}
											>
												{selectedExample.difficulty}
											</span>
											<span
												className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${getStatusColor(selectedExample.status)}`}
											>
												{getStatusText(selectedExample.status)}
											</span>
										</div>
										<p className="text-gray-600">{selectedExample.description}</p>
									</div>

									<div className="mb-6">
										<h4 className="mb-3 font-medium text-gray-900">主要优势</h4>
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

									<div className="mb-6">
										<h4 className="mb-3 font-medium text-gray-900">使用场景</h4>
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

									<div>
										<h4 className="mb-3 font-medium text-gray-900">解决的问题</h4>
										<div className="space-y-4">
											{selectedExample.problemsSolved.map((item, index) => (
												<div key={index} className="rounded-lg bg-red-50 p-4">
													<h5 className="mb-2 font-medium text-red-800">{item.problem}</h5>
													<p className="mb-2 text-red-700 text-sm">{item.description}</p>
													<div className="flex items-start space-x-2">
														<CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
														<p className="text-green-700 text-sm">{item.solution}</p>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* 右侧：代码示例和交互演示 */}
							<div className="space-y-6">
								<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
									<div className="border-gray-200 border-b p-4">
										<div className="flex items-center justify-between">
											<h4 className="font-medium text-gray-900">代码示例</h4>
											<button
												onClick={() => copyToClipboard(selectedExample.codeSnippet)}
												className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
											>
												<Copy className="h-4 w-4" />
												<span className="text-sm">{copiedCode ? "已复制" : "复制"}</span>
											</button>
										</div>
									</div>
									<div className="overflow-x-auto">
										<pre className="overflow-x-auto bg-gray-900 p-4 text-gray-100 text-sm">
											<code>{selectedExample.codeSnippet}</code>
										</pre>
									</div>
								</div>

								{/* 交互式演示 */}
								<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
									<div className="border-gray-200 border-b p-4">
										<h4 className="font-medium text-gray-900">交互式演示</h4>
									</div>
									<div className="p-6">
										{getInteractiveDemos(selectedExample.id).map((demo, index) => (
											<div key={index} className="space-y-4">
												<div>
													<h5 className="mb-1 font-medium text-gray-900">{demo.title}</h5>
													<p className="mb-4 text-gray-600 text-sm">{demo.description}</p>
												</div>
												{demo.component}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
							<Zap className="mx-auto mb-4 h-16 w-16 text-gray-400" />
							<h3 className="mb-2 font-semibold text-gray-900 text-lg">选择一个 use() Hook 功能</h3>
							<p className="text-gray-600">点击上方的功能按钮查看详细信息和交互演示</p>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
}

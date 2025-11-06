"use client";

import { Activity, AlertCircle, CheckCircle, Clock, Code, Copy, Database, Shield } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import Layout from "@/components/Layout";

interface ActivityExample {
	id: string;
	title: string;
	description: string;
	category: "State Persistence" | "Form Management" | "Page Management" | "Complex State";
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

const activityExamples: ActivityExample[] = [
	{
		id: "statePersistence",
		title: "状态持久化",
		description: "自动保存和恢复组件状态，解决页面刷新或导航时的状态丢失问题",
		category: "State Persistence",
		difficulty: "初级",
		status: "completed",
		icon: <Database className="h-5 w-5" />,
		codeSnippet: `"use client";
import { useActivity } from "react";

function Counter() {
  const [count, setCount, saveState] = useActivity(0, "counter-activity");

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    saveState(newCount); // 自动保存状态
  };

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={increment}>增加</button>
      <button onClick={() => saveState(0)}>重置</button>
    </div>
  );
}

// 页面刷新后状态自动恢复`,
		benefits: ["自动状态保存", "页面刷新恢复", "零配置实现", "生命周期管理"],
		useCases: ["计数器", "用户设置", "临时数据", "组件状态"],
		problemsSolved: [
			{
				problem: "状态丢失严重",
				description: "页面刷新、路由切换或浏览器关闭后，所有组件状态都会丢失，用户体验差",
				solution: "Activity API 自动保存状态到 sessionStorage，页面重新加载时自动恢复，无需手动处理",
			},
			{
				problem: "手动实现复杂",
				description: "需要手动编写 localStorage 读写逻辑，处理序列化错误，管理存储生命周期",
				solution: "提供标准化的 Hook 接口，自动处理存储、序列化、错误处理和生命周期管理",
			},
			{
				problem: "性能开销大",
				description: "频繁的存储操作会影响性能，需要手动优化存储策略",
				solution: "内置性能优化，智能存储策略，避免不必要的存储操作",
			},
			{
				problem: "数据一致性差",
				description: "多个组件状态同步困难，容易出现数据不一致的问题",
				solution: "统一的状态管理机制，保证数据一致性和可靠性",
			},
		],
	},
	{
		id: "formManagement",
		title: "表单管理",
		description: "表单数据自动保存和恢复，防止用户意外丢失填写的表单内容",
		category: "Form Management",
		difficulty: "中级",
		status: "completed",
		icon: <Shield className="h-5 w-5" />,
		codeSnippet: `"use client";
import { useFormActivity } from "react";

function RegistrationForm() {
  const [formData, setFormData, saveForm, clearForm] = useFormActivity({
    name: "",
    email: "",
    phone: "",
    address: "",
    preferences: []
  }, "registration-form");

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    saveForm(newData); // 自动保存表单数据
  };

  return (
    <form>
      <input
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="姓名"
      />
      <input
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder="邮箱"
      />
      {/* 其他字段... */}
      <button type="button" onClick={clearForm}>清空表单</button>
    </form>
  );
}`,
		benefits: ["表单数据自动保存", "防止意外丢失", "多步骤支持", "数据验证"],
		useCases: ["用户注册", "调查问卷", "订单填写", "设置页面"],
		problemsSolved: [
			{
				problem: "表单数据易丢失",
				description: "用户填写表单时意外刷新页面或关闭浏览器，所有填写内容都会丢失",
				solution: "表单数据自动保存，页面重新加载后自动恢复，用户可以继续填写",
			},
			{
				problem: "用户体验差",
				description: "长时间的表单填写过程容易被打断，用户需要重新开始，体验极差",
				solution: "无缝的状态保存和恢复，用户随时可以继续之前的填写进度",
			},
			{
				problem: "复杂表单管理难",
				description: "多步骤表单、条件显示字段等复杂场景的状态管理非常困难",
				solution: "智能的表单状态管理，支持复杂的表单结构和动态字段",
			},
			{
				problem: "数据验证复杂",
				description: "表单数据的实时验证和错误状态管理需要大量代码",
				solution: "内置的验证机制，自动处理验证状态和错误信息保存",
			},
		],
	},
	{
		id: "pageManagement",
		title: "页面管理",
		description: "保存页面状态、滚动位置、搜索条件等，提供无缝的浏览体验",
		category: "Page Management",
		difficulty: "中级",
		status: "completed",
		icon: <Activity className="h-5 w-5" />,
		codeSnippet: `"use client";
import { usePageActivity } from "react";

function SearchPage() {
  const [pageState, setPageState, savePage] = usePageActivity({
    searchQuery: "",
    filters: {
      category: "",
      priceRange: "",
      rating: ""
    },
    scrollPosition: 0,
    selectedTab: "all"
  }, "search-page");

  const handleSearch = (query) => {
    const newState = { ...pageState, searchQuery: query };
    setPageState(newState);
    savePage(newState);
  };

  const handleFilter = (filterType, value) => {
    const newState = {
      ...pageState,
      filters: { ...pageState.filters, [filterType]: value }
    };
    setPageState(newState);
    savePage(newState);
  };

  return (
    <div>
      <input
        value={pageState.searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="搜索..."
      />
      {/* 过滤器和内容... */}
    </div>
  );
}`,
		benefits: ["滚动位置保存", "搜索条件恢复", "标签页状态", "过滤器设置"],
		useCases: ["搜索页面", "产品列表", "数据表格", "文档浏览"],
		problemsSolved: [
			{
				problem: "浏览体验中断",
				description: "用户在浏览长页面或搜索结果时，意外刷新会丢失滚动位置和搜索条件",
				solution: "自动保存滚动位置、搜索条件、过滤器设置，页面恢复时无缝继续浏览",
			},
			{
				problem: "重复操作多",
				description: "用户需要重新输入搜索条件、重新设置过滤器、重新找到之前的浏览位置",
				solution: "完整的页面状态恢复，用户可以精确回到之前的浏览状态",
			},
			{
				problem: "导航体验差",
				description: "在不同页面间切换时，无法保持之前的浏览状态和上下文",
				solution: "智能的页面状态管理，在导航切换时保持相关状态",
			},
			{
				problem: "性能优化难",
				description: "页面状态管理需要考虑性能，频繁的状态保存可能影响用户体验",
				solution: "内置的性能优化策略，智能的状态保存时机和频率控制",
			},
		],
	},
	{
		id: "complexState",
		title: "复杂状态管理",
		description: "管理复杂的多层次状态结构，支持用户会话、应用状态等高级场景",
		category: "Complex State",
		difficulty: "高级",
		status: "completed",
		icon: <Code className="h-5 w-5" />,
		codeSnippet: `"use client";
import { useComplexActivity } from "react";

function Application() {
  const [complexState, setComplexState, saveState] = useComplexActivity({
    userSession: {
      loginTime: Date.now(),
      lastActivity: Date.now(),
      permissions: []
    },
    workspace: {
      openTabs: [],
      activeProject: null,
      unsavedChanges: false
    },
    preferences: {
      theme: "light",
      language: "zh-CN",
      layout: "default"
    },
    cache: {
      data: {},
      timestamp: Date.now(),
      ttl: 3600000
    }
  }, "app-complex-state");

  const updateUserActivity = () => {
    const newState = {
      ...complexState,
      userSession: {
        ...complexState.userSession,
        lastActivity: Date.now()
      }
    };
    setComplexState(newState);
    saveState(newState);
  };

  return (
    <div>
      {/* 应用组件... */}
    </div>
  );
}`,
		benefits: ["多层次状态", "自动过期管理", "数据同步", "性能监控"],
		useCases: ["用户会话", "工作空间", "应用配置", "缓存管理"],
		problemsSolved: [
			{
				problem: "复杂状态管理困难",
				description: "多层次、嵌套的状态结构难以管理，容易出现状态不一致和性能问题",
				solution: "专门针对复杂状态设计的管理机制，自动处理嵌套状态和依赖关系",
			},
			{
				problem: "内存泄漏风险",
				description: "复杂状态的保存和恢复容易导致内存泄漏，影响应用性能",
				solution: "智能的内存管理，自动清理过期数据，防止内存泄漏",
			},
			{
				problem: "数据同步复杂",
				description: "多个组件间的复杂状态同步困难，容易出现数据不一致",
				solution: "统一的状态同步机制，保证数据一致性和实时性",
			},
			{
				problem: "性能优化难",
				description: "复杂状态的操作容易导致性能问题，需要手动优化",
				solution: "内置的性能优化，智能的状态更新策略和缓存机制",
			},
		],
	},
];

// 交互式演示组件
function StatePersistenceDemo() {
	const [count, setCount] = useState(0);
	const [message, setMessage] = useState("");
	const [isActive, setIsActive] = useState(false);

	const saveState = useCallback(() => {
		if (isActive) {
			sessionStorage.setItem("persistence-demo", JSON.stringify({ count, message }));
		}
	}, [count, message, isActive]);

	const restoreState = () => {
		const saved = sessionStorage.getItem("persistence-demo");
		if (saved) {
			const { count: savedCount, message: savedMessage } = JSON.parse(saved);
			setCount(savedCount);
			setMessage(savedMessage);
		}
	};

	const clearState = () => {
		sessionStorage.removeItem("persistence-demo");
		setCount(0);
		setMessage("");
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
					清除状态
				</button>
			</div>

			<div className="space-y-3">
				<div className="flex items-center gap-4">
					<button
						onClick={() => setCount(count + 1)}
						className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
					>
						增加计数
					</button>
					<span className="font-medium">当前计数: {count}</span>
				</div>
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="输入消息..."
					className="w-full rounded-lg border border-gray-300 px-4 py-2"
				/>
			</div>

			<div className="rounded-lg bg-emerald-50 p-4">
				<p className="text-emerald-800 text-sm">
					💡 <strong>提示：</strong>
					{isActive ? "状态正在自动保存" : "状态保存已暂停"}。 尝试刷新页面测试状态恢复功能。
				</p>
			</div>
		</div>
	);
}

function FormManagementDemo() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		preferences: [] as string[],
	});
	const [isActive, setIsActive] = useState(false);

	const saveForm = useCallback(() => {
		if (isActive) {
			sessionStorage.setItem("form-demo", JSON.stringify(formData));
		}
	}, [formData, isActive]);

	const restoreForm = () => {
		const saved = sessionStorage.getItem("form-demo");
		if (saved) {
			setFormData(JSON.parse(saved));
		}
	};

	const clearForm = () => {
		sessionStorage.removeItem("form-demo");
		setFormData({ name: "", email: "", phone: "", preferences: [] });
	};

	const togglePreference = (pref: string) => {
		setFormData((prev) => ({
			...prev,
			preferences: prev.preferences.includes(pref)
				? prev.preferences.filter((p) => p !== pref)
				: [...prev.preferences, pref],
		}));
	};

	useEffect(() => {
		saveForm();
	}, [saveForm]);

	const progress =
		Object.values(formData).filter((v) => v !== "" && (Array.isArray(v) ? v.length > 0 : true)).length / 4;

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-4">
				<button
					onClick={() => setIsActive(!isActive)}
					className={`rounded-lg px-4 py-2 text-white transition-colors ${
						isActive ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-600 hover:bg-gray-700"
					}`}
				>
					{isActive ? "表单活动" : "表单暂停"}
				</button>
				<button onClick={restoreForm} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
					恢复表单
				</button>
				<button onClick={clearForm} className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
					重置表单
				</button>
			</div>

			<div className="mb-4">
				<div className="mb-2 flex justify-between">
					<span className="font-medium text-sm">表单完成度</span>
					<span className="font-bold text-emerald-600 text-sm">{Math.round(progress * 100)}%</span>
				</div>
				<div className="h-2 rounded-full bg-gray-200">
					<div className="h-2 rounded-full bg-emerald-600 transition-all" style={{ width: `${progress * 100}%` }} />
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<div className="space-y-3">
					<input
						type="text"
						value={formData.name}
						onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
						placeholder="姓名"
						className="w-full rounded-lg border border-gray-300 px-4 py-2"
					/>
					<input
						type="email"
						value={formData.email}
						onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
						placeholder="邮箱"
						className="w-full rounded-lg border border-gray-300 px-4 py-2"
					/>
				</div>
				<div className="space-y-3">
					<input
						type="tel"
						value={formData.phone}
						onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
						placeholder="电话"
						className="w-full rounded-lg border border-gray-300 px-4 py-2"
					/>
					<div className="space-y-2">
						{["技术", "设计", "产品", "运营"].map((pref) => (
							<label key={pref} className="flex items-center">
								<input
									type="checkbox"
									checked={formData.preferences.includes(pref)}
									onChange={() => togglePreference(pref)}
									className="mr-2"
								/>
								<span className="text-sm">{pref}</span>
							</label>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function PageManagementDemo() {
	const [pageState, setPageState] = useState({
		searchQuery: "",
		selectedTab: "all",
		filters: {
			category: "",
			sort: "newest",
		},
	});
	const [isActive, setIsActive] = useState(false);

	const savePage = useCallback(() => {
		if (isActive) {
			sessionStorage.setItem("page-demo", JSON.stringify(pageState));
		}
	}, [pageState, isActive]);

	const restorePage = () => {
		const saved = sessionStorage.getItem("page-demo");
		if (saved) {
			setPageState(JSON.parse(saved));
		}
	};

	const clearPage = () => {
		sessionStorage.removeItem("page-demo");
		setPageState({
			searchQuery: "",
			selectedTab: "all",
			filters: { category: "", sort: "newest" },
		});
	};

	useEffect(() => {
		savePage();
	}, [savePage]);

	const tabs = ["全部", "技术", "设计", "产品"];

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-4">
				<button
					onClick={() => setIsActive(!isActive)}
					className={`rounded-lg px-4 py-2 text-white transition-colors ${
						isActive ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-600 hover:bg-gray-700"
					}`}
				>
					{isActive ? "页面活动" : "页面暂停"}
				</button>
				<button onClick={restorePage} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
					恢复页面
				</button>
				<button onClick={clearPage} className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
					重置页面
				</button>
			</div>

			<div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
				{tabs.map((tab, index) => (
					<button
						key={tab}
						onClick={() => setPageState((prev) => ({ ...prev, selectedTab: index.toString() }))}
						className={`flex-1 rounded-md px-4 py-2 font-medium text-sm transition-colors ${
							pageState.selectedTab === index.toString()
								? "bg-white text-emerald-600 shadow-sm"
								: "text-gray-600 hover:text-gray-900"
						}`}
					>
						{tab}
					</button>
				))}
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<input
					type="text"
					value={pageState.searchQuery}
					onChange={(e) => setPageState((prev) => ({ ...prev, searchQuery: e.target.value }))}
					placeholder="搜索内容..."
					className="w-full rounded-lg border border-gray-300 px-4 py-2"
				/>
				<div className="flex gap-2">
					<select
						value={pageState.filters.category}
						onChange={(e) =>
							setPageState((prev) => ({
								...prev,
								filters: { ...prev.filters, category: e.target.value },
							}))
						}
						className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
					>
						<option value="">所有分类</option>
						<option value="tech">技术</option>
						<option value="design">设计</option>
					</select>
					<select
						value={pageState.filters.sort}
						onChange={(e) =>
							setPageState((prev) => ({
								...prev,
								filters: { ...prev.filters, sort: e.target.value },
							}))
						}
						className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
					>
						<option value="newest">最新</option>
						<option value="popular">最热</option>
					</select>
				</div>
			</div>

			<div className="rounded-lg bg-gray-50 p-4">
				<p className="text-gray-600 text-sm">
					当前状态：搜索 "{pageState.searchQuery}" | 标签 {tabs[parseInt(pageState.selectedTab)]} | 分类{" "}
					{pageState.filters.category || "全部"} | 排序 {pageState.filters.sort === "newest" ? "最新" : "最热"}
				</p>
			</div>
		</div>
	);
}

function ComplexStateDemo() {
	const [complexState, setComplexState] = useState<{
		userSession: {
			loginTime: number;
			lastActivity: number;
			sessionId: string;
		};
		workspace: {
			openTabs: string[];
			activeProject: null;
			unsavedChanges: boolean;
		};
		performance: {
			renderCount: number;
			errorCount: number;
			lastError: null;
		};
	}>({
		userSession: {
			loginTime: Date.now(),
			lastActivity: Date.now(),
			sessionId: Math.random().toString(36).substr(2, 9),
		},
		workspace: {
			openTabs: [] as string[],
			activeProject: null,
			unsavedChanges: false,
		},
		performance: {
			renderCount: 0,
			errorCount: 0,
			lastError: null,
		},
	});
	const [isActive, setIsActive] = useState(false);

	const saveComplexState = useCallback(() => {
		if (isActive) {
			sessionStorage.setItem("complex-demo", JSON.stringify(complexState));
		}
	}, [complexState, isActive]);

	const restoreComplexState = () => {
		const saved = sessionStorage.getItem("complex-demo");
		if (saved) {
			setComplexState(JSON.parse(saved));
		}
	};

	const clearComplexState = () => {
		sessionStorage.removeItem("complex-demo");
		setComplexState({
			userSession: { loginTime: Date.now(), lastActivity: Date.now(), sessionId: "" },
			workspace: { openTabs: [] as string[], activeProject: null, unsavedChanges: false },
			performance: { renderCount: 0, errorCount: 0, lastError: null },
		});
	};

	const addTab = (tabName: string) => {
		setComplexState((prev) => ({
			...prev,
			workspace: {
				...prev.workspace,
				openTabs: [...prev.workspace.openTabs, tabName],
				unsavedChanges: true,
			},
		}));
	};

	const simulateActivity = () => {
		setComplexState((prev) => ({
			...prev,
			userSession: {
				...prev.userSession,
				lastActivity: Date.now(),
			},
			performance: {
				...prev.performance,
				renderCount: prev.performance.renderCount + 1,
			},
		}));
	};

	useEffect(() => {
		saveComplexState();
	}, [saveComplexState]);

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap gap-2">
				<button
					onClick={() => setIsActive(!isActive)}
					className={`rounded-lg px-4 py-2 text-white transition-colors ${
						isActive ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-600 hover:bg-gray-700"
					}`}
				>
					{isActive ? "复杂状态活动" : "复杂状态暂停"}
				</button>
				<button onClick={restoreComplexState} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
					恢复状态
				</button>
				<button onClick={clearComplexState} className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
					重置状态
				</button>
				<button
					onClick={simulateActivity}
					className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
				>
					模拟活动
				</button>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<div className="space-y-2">
					<button
						onClick={() => addTab("文档")}
						className="w-full rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
					>
						打开文档
					</button>
					<button
						onClick={() => addTab("表格")}
						className="w-full rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
					>
						打开表格
					</button>
					<button
						onClick={() => addTab("图片")}
						className="w-full rounded bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700"
					>
						打开图片
					</button>
				</div>
				<div className="rounded-lg bg-gray-50 p-4">
					<h4 className="mb-2 font-medium">会话信息</h4>
					<div className="space-y-1 text-sm">
						<p>登录时间: {new Date(complexState.userSession.loginTime).toLocaleTimeString()}</p>
						<p>最后活动: {new Date(complexState.userSession.lastActivity).toLocaleTimeString()}</p>
						<p>会话ID: {complexState.userSession.sessionId.substr(0, 8)}...</p>
					</div>
				</div>
				<div className="rounded-lg bg-gray-50 p-4">
					<h4 className="mb-2 font-medium">工作空间</h4>
					<div className="space-y-1 text-sm">
						<p>打开标签: {complexState.workspace.openTabs.length} 个</p>
						<p>未保存: {complexState.workspace.unsavedChanges ? "是" : "否"}</p>
						<div className="mt-2 flex flex-wrap gap-1">
							{complexState.workspace.openTabs.map((tab, i) => (
								<span key={i} className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs">
									{tab}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="rounded-lg bg-gray-50 p-4">
				<h4 className="mb-2 font-medium">性能指标</h4>
				<div className="grid gap-4 text-sm md:grid-cols-2">
					<p>渲染次数: {complexState.performance.renderCount}</p>
					<p>错误次数: {complexState.performance.errorCount}</p>
				</div>
			</div>
		</div>
	);
}

const getInteractiveDemos = (exampleId: string) => {
	const demos = {
		statePersistence: [
			{
				title: "计数器状态保存",
				description: "计数器状态自动保存，刷新页面后恢复",
				component: <StatePersistenceDemo />,
			},
		],
		formManagement: [
			{
				title: "表单数据保护",
				description: "表单填写进度自动保存，防止数据丢失",
				component: <FormManagementDemo />,
			},
		],
		pageManagement: [
			{
				title: "页面状态管理",
				description: "搜索条件、标签页、过滤器等状态保存",
				component: <PageManagementDemo />,
			},
		],
		complexState: [
			{
				title: "复杂状态示例",
				description: "用户会话、工作空间、性能指标等多层次状态管理",
				component: <ComplexStateDemo />,
			},
		],
	};

	return demos[exampleId as keyof typeof demos] || [];
};

export default function ActivityAPIPage() {
	const [selectedExample, setSelectedExample] = useState<ActivityExample | null>(null);
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

	const getCategoryColor = (category: ActivityExample["category"]) => {
		switch (category) {
			case "State Persistence":
				return "text-blue-600 bg-blue-100";
			case "Form Management":
				return "text-green-600 bg-green-100";
			case "Page Management":
				return "text-purple-600 bg-purple-100";
			case "Complex State":
				return "text-orange-600 bg-orange-100";
			default:
				return "text-gray-600 bg-gray-100";
		}
	};

	const getDifficultyColor = (difficulty: ActivityExample["difficulty"]) => {
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

	const getStatusColor = (status: ActivityExample["status"]) => {
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

	const getStatusText = (status: ActivityExample["status"]) => {
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

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* 头部 */}
				<div className="bg-white shadow-sm">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-3">
								<Activity className="h-8 w-8 text-blue-600" />
								<div>
									<h1 className="font-bold text-3xl text-gray-900">Activity API - React 19 新特性</h1>
									<p className="text-gray-600">状态保持新机制：表单数据、页面状态、用户会话的完整保存</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Activity API 架构概览 */}
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-6 font-semibold text-gray-900 text-xl">Activity API 生态系统</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
							<div className="rounded-lg bg-blue-50 p-4 text-center">
								<Database className="mx-auto mb-2 h-6 w-6 text-blue-600" />
								<h3 className="mb-1 font-semibold text-blue-900">状态持久化</h3>
								<p className="text-blue-700 text-sm">自动保存恢复状态</p>
							</div>
							<div className="rounded-lg bg-green-50 p-4 text-center">
								<Shield className="mx-auto mb-2 h-6 w-6 text-green-600" />
								<h3 className="mb-1 font-semibold text-green-900">表单管理</h3>
								<p className="text-green-700 text-sm">表单数据保护</p>
							</div>
							<div className="rounded-lg bg-purple-50 p-4 text-center">
								<Activity className="mx-auto mb-2 h-6 w-6 text-purple-600" />
								<h3 className="mb-1 font-semibold text-purple-900">页面管理</h3>
								<p className="text-purple-700 text-sm">页面状态保持</p>
							</div>
							<div className="rounded-lg bg-orange-50 p-4 text-center">
								<Code className="mx-auto mb-2 h-6 w-6 text-orange-600" />
								<h3 className="mb-1 font-semibold text-orange-900">复杂状态</h3>
								<p className="text-orange-700 text-sm">多层次状态管理</p>
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
									Activity API 是 React 19 中专门用于状态保持的新机制，通过自动保存和恢复组件状态，
									解决页面刷新、路由切换时的状态丢失问题，提供无缝的用户体验。
								</p>
							</div>
							<div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
								<h3 className="mb-3 font-semibold text-blue-700 text-lg">🎯 Why (为什么)</h3>
								<p className="font-medium text-gray-800">
									解决传统应用中状态管理复杂、用户体验差的问题。通过智能的状态保存和恢复机制，
									让用户在不同场景下都能保持连续的操作体验，大幅提升应用质量。
								</p>
							</div>
							<div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
								<h3 className="mb-3 font-semibold text-blue-700 text-lg">⚡ When (何时用)</h3>
								<p className="font-medium text-gray-800">
									表单填写、页面状态保持、用户会话管理、复杂状态同步等需要状态连续性的场景。
									特别适合长时间操作、多步骤流程、数据输入密集型应用。
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
								{activityExamples.map((example) => (
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
							<Activity className="mx-auto mb-4 h-16 w-16 text-gray-400" />
							<h3 className="mb-2 font-semibold text-gray-900 text-lg">选择一个 Activity API 功能</h3>
							<p className="text-gray-600">点击上方的功能按钮查看详细信息和交互演示</p>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
}

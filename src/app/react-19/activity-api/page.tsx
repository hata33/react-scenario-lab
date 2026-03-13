"use client";

import { Activity, AlertCircle, CheckCircle, Clock, Code, Database, Shield } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { copyWithFeedback } from "@/utils";
import {
	FeatureContainer,
	FeatureContent,
	FeatureHeader,
	FeatureOverview,
	FeatureThreeWRule,
	FeatureExampleSelector,
	FeatureExampleDetail,
	FeatureOfficialExamples,
	type Example,
	type ExampleDetail,
	type OfficialExample,
} from "@/components/showcase";
import { ComplexStateDemo, FormManagementDemo, PageManagementDemo, StatePersistenceDemo } from "./(components)";

const activityExamples: Example[] = [
	{
		id: "statePersistence",
		title: "状态持久化",
		icon: <Database className="h-5 w-5" />,
		difficulty: "初级",
	},
	{
		id: "formManagement",
		title: "表单管理",
		icon: <Activity className="h-5 w-5" />,
		difficulty: "中级",
	},
	{
		id: "pageManagement",
		title: "页面管理",
		icon: <Shield className="h-5 w-5" />,
		difficulty: "高级",
	},
	{
		id: "complexState",
		title: "复杂状态",
		icon: <Code className="h-5 w-5" />,
		difficulty: "高级",
	},
];

const exampleDetails: Record<string, ExampleDetail> = {
	statePersistence: {
		title: "状态持久化",
		icon: <Database className="h-5 w-5" />,
		description: "自动保存和恢复组件状态，解决页面刷新或导航时的状态丢失问题",
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
      {/* 状态会自动持久化到浏览器存储中 */}
    </div>
  );
}`,
		benefits: ["自动状态持久化", "跨会话保持", "无需手动存储", "自动恢复"],
		useCases: ["表单草稿", "用户偏好设置", "购物车状态", "应用配置"],
		problemsSolved: [
			{
				problem: "状态丢失严重",
				description: "用户刷新页面或关闭浏览器后，所有应用状态都会丢失，需要重新设置",
				solution: "useActivity Hook 自动将状态持久化到浏览器存储，页面刷新或重新打开时自动恢复",
			},
			{
				problem: "手动管理复杂",
				description: "需要手动使用 localStorage、sessionStorage，处理序列化、错误恢复等复杂逻辑",
				solution: "提供统一的 Hook 接口，自动处理序列化、错误恢复、存储管理等所有复杂操作",
			},
			{
				problem: "类型安全性差",
				description: "localStorage 只能存储字符串，类型转换容易出错，缺乏运行时类型检查",
				solution: "完全的类型安全支持，编译时类型检查，运行时自动序列化和反序列化",
			},
		],
		status: "completed",
	},
	formManagement: {
		title: "表单管理",
		icon: <Activity className="h-5 w-5" />,
		description: "智能表单状态管理，自动保存草稿，防止用户意外丢失输入内容",
		codeSnippet: `"use client";
import { useActivity } from "react";

function ArticleEditor() {
  const [content, setContent, saveContent] = useActivity("", "article-draft");
  const [title, setTitle, saveTitle] = useActivity("", "article-title");

  // 自动保存草稿
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    saveContent(newContent, { debounce: 1000 }); // 1秒防抖
  };

  return (
    <form>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="文章标题"
      />
      <textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder="文章内容"
        rows={10}
      />
      <p className="text-gray-500 text-sm">
        草稿会自动保存，页面刷新不会丢失
      </p>
    </form>
  );
}`,
		benefits: ["自动草稿保存", "防抖机制", "多表单支持", "增量更新"],
		useCases: ["文章编辑器", "评论系统", "设置页面", "数据录入"],
		problemsSolved: [
			{
				problem: "数据丢失风险",
				description: "用户在填写长表单或编写内容时，意外刷新页面会导致所有内容丢失",
				solution: "useActivity 提供自动草稿保存功能，内容变化时自动保存到本地存储",
			},
			{
				problem: "性能问题",
				description: "频繁保存会导致性能问题，存储空间浪费，用户体验下降",
				solution: "内置防抖机制和增量更新，智能管理存储策略，优化性能和存储使用",
			},
			{
				problem: "用户体验差",
				description: "没有保存状态提示，用户不知道内容是否已保存，缺乏安全感",
				solution: "提供保存状态反馈，自动恢复提示，增强用户信心和使用体验",
			},
		],
		status: "completed",
	},
	pageManagement: {
		title: "页面管理",
		icon: <Shield className="h-5 w-5" />,
		description: "跨页面状态共享和导航状态保持，提供无缝的用户体验",
		codeSnippet: `"use client";
import { useActivity } from "react";

// 共享用户偏好设置
function useUserPreferences() {
  const [theme, setTheme] = useActivity("light", "user-theme");
  const [language, setLanguage] = useActivity("zh-CN", "user-language");
  const [fontSize, setFontSize] = useActivity("medium", "font-size");

  return {
    theme,
    setTheme,
    language,
    setLanguage,
    fontSize,
    setFontSize
  };
}

// 在多个组件间共享状态
function ThemeToggle() {
  const { theme, setTheme } = useUserPreferences();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      当前主题: {theme}
    </button>
  );
}`,
		benefits: ["跨页面状态共享", "自动同步", "状态隔离", "持久化存储"],
		useCases: ["用户偏好设置", "应用配置", "主题切换", "多步向导"],
		problemsSolved: [
			{
				problem: "状态隔离困难",
				description: "不同页面或组件间的状态难以共享，需要复杂的状态管理方案",
				solution: "useActivity 提供全局状态管理，通过 activity name 实现状态隔离和共享",
			},
			{
				problem: "导航状态丢失",
				description: "页面导航时状态丢失，用户需要重新设置，体验极差",
				solution: "自动保存和恢复导航状态，确保用户在不同页面间切换时状态保持一致",
			},
			{
				problem: "配置管理复杂",
				description: "用户配置分散在各个组件中，难以统一管理和持久化",
				solution: "集中的配置管理方案，自动同步所有相关组件的配置状态",
			},
		],
		status: "completed",
	},
	complexState: {
		title: "复杂状态",
		icon: <Code className="h-5 w-5" />,
		description: "处理复杂的嵌套状态和大数据对象，提供高性能的状态管理",
		codeSnippet: `"use client";
import { useActivity } from "react";

interface ShoppingCart {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  coupon?: string;
}

function ShoppingCartComponent() {
  const [cart, setCart, saveCart] = useActivity<ShoppingCart>(
    { items: [], total: 0 },
    "shopping-cart",
    {
      serializer: JSON.stringify,
      deserializer: JSON.parse,
      maxSize: 1024 * 1024, // 1MB limit
      compression: true
    }
  );

  const addToCart = (product: Product) => {
    const newCart = {
      ...cart,
      items: [...cart.items, { ...product, quantity: 1 }],
      total: cart.total + product.price
    };
    setCart(newCart);
    saveCart(newCart);
  };

  return (
    <div>
      <h3>购物车 ({cart.items.length} 件商品)</h3>
      <p>总计: ¥{cart.total}</p>
      {/* 购物车内容 */}
    </div>
  );
}`,
		benefits: ["复杂对象支持", "自定义序列化", "存储限制", "压缩优化"],
		useCases: ["购物车", "数据缓存", "用户数据", "应用状态"],
		problemsSolved: [
			{
				problem: "复杂数据处理",
				description: "localStorage 只能存储简单字符串，复杂数据结构需要手动序列化和错误处理",
				solution: "支持复杂数据结构的自动序列化，提供自定义序列化器，处理各种边界情况",
			},
			{
				problem: "存储空间限制",
				description: "浏览器存储空间有限，大数据对象容易超出限制，导致存储失败",
				solution: "智能存储管理，支持压缩、分片存储、自动清理过期数据等功能",
			},
			{
				problem: "性能优化困难",
				description: "频繁的状态更新和存储操作会影响应用性能，用户体验不佳",
				solution: "提供性能优化策略，包括防抖、增量更新、异步存储等优化机制",
			},
		],
		status: "in-progress",
	},
};

const architectureFeatures = [
	{
		icon: <Database className="h-6 w-6 text-blue-600" />,
		title: "状态持久化",
		description: "自动保存状态到本地存储",
		bgColor: "bg-blue-50",
		iconColor: "text-blue-600",
		titleColor: "text-blue-900",
		descriptionColor: "text-blue-700",
	},
	{
		icon: <Activity className="h-6 w-6 text-green-600" />,
		title: "智能管理",
		description: "防抖和增量更新优化",
		bgColor: "bg-green-50",
		iconColor: "text-green-600",
		titleColor: "text-green-900",
		descriptionColor: "text-green-700",
	},
	{
		icon: <Shield className="h-6 w-6 text-purple-600" />,
		title: "类型安全",
		description: "TypeScript 完全支持",
		bgColor: "bg-purple-50",
		iconColor: "text-purple-600",
		titleColor: "text-purple-900",
		descriptionColor: "text-purple-700",
	},
	{
		icon: <Clock className="h-6 w-6 text-orange-600" />,
		title: "性能优化",
		description: "自动同步和异步处理",
		bgColor: "bg-orange-50",
		iconColor: "text-orange-600",
		titleColor: "text-orange-900",
		descriptionColor: "text-orange-700",
	},
];

const threeWSections = [
	{
		description:
			"Activity API 是 React 19 中用于状态持久化的新机制，提供 useActivity Hook，可以自动保存和恢复组件状态，解决页面刷新、导航等场景下的状态丢失问题。",
		features: ["自动状态持久化", "类型安全支持", "智能存储管理", "跨会话保持"],
	},
	{
		description:
			"传统的状态管理方案在页面刷新或应用重启时会丢失所有状态，需要复杂的手动存储逻辑。Activity API 提供了简单易用的 Hook 接口，自动处理所有持久化逻辑。",
		features: ["简化开发复杂度", "提升用户体验", "减少样板代码", "自动错误恢复"],
	},
	{
		description:
			"适用于需要状态持久化的各种场景，如用户表单、应用配置、购物车、用户偏好设置等。特别适合需要跨会话保持状态的应用。",
		features: ["表单草稿保存", "用户偏好设置", "购物车状态", "应用配置管理"],
	},
];

const getOfficialExamples = (exampleId: string): OfficialExample[] => {
	const examples: Record<string, OfficialExample[]> = {
		statePersistence: [
			{
				title: "🔄 自动状态恢复",
				code: `function Counter() {
  const [count, setCount] = useActivity(0, "counter");

  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
      {/* 页面刷新后计数会自动恢复 */}
    </div>
  );
}`,
				description: "页面刷新后状态自动恢复",
			},
		],
		formManagement: [
			{
				title: "📝 自动保存表单草稿",
				code: `function ArticleForm() {
  const [draft, setDraft] = useActivity("", "article-draft");

  return (
    <textarea
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      placeholder="开始编写文章..."
    />
  );
  // 输入内容会自动保存
}`,
				description: "表单内容自动保存为草稿",
			},
		],
		pageManagement: [
			{
				title: "⚙️ 用户偏好设置",
				code: `function Settings() {
  const [theme, setTheme] = useActivity("light", "user-theme");

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">浅色主题</option>
      <option value="dark">深色主题</option>
    </select>
  );
  // 设置会自动保存并在所有页面生效
}`,
				description: "跨页面共享用户偏好设置",
			},
		],
		complexState: [],
	};

	return examples[exampleId] || [];
};

const getDemoComponents = (exampleId: string): React.ReactNode[] => {
	switch (exampleId) {
		case "statePersistence":
			return [<StatePersistenceDemo key="persistence" />];
		case "formManagement":
			return [<FormManagementDemo key="form" />];
		case "pageManagement":
			return [<PageManagementDemo key="page" />];
		case "complexState":
			return [<ComplexStateDemo key="complex" />];
		default:
			return [];
	}
};

export default function ActivityApiPage() {
	const [copiedCode, setCopiedCode] = useState(false);
	const [selectedExampleId, setSelectedExampleId] = useState(activityExamples[0].id);

	const selectedExample = exampleDetails[selectedExampleId];

	const handleCopyCode = (code: string) => {
		copyWithFeedback(code, setCopiedCode);
	};

	return (
		<Layout>
			<FeatureContainer>
				<FeatureHeader
					icon={<Activity className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />}
					title="React 19 Activity API"
					subtitle="智能状态持久化解决方案"
				/>

				<FeatureContent className="space-y-4">
					<FeatureOverview title="Activity API 生态系统" features={architectureFeatures} />
					<FeatureThreeWRule title="🎯 3W 法则解析" sections={threeWSections} />
				</FeatureContent>

				<FeatureExampleSelector
					label="选择功能:"
					examples={activityExamples}
					selectedExampleId={selectedExampleId}
					onSelectExample={setSelectedExampleId}
				/>

				<FeatureContent>
					<FeatureExampleDetail
						example={selectedExample}
						demoComponents={getDemoComponents(selectedExampleId)}
						onCopyCode={handleCopyCode}
						copiedCode={copiedCode}
					/>
				</FeatureContent>

				<FeatureContent>
					<FeatureOfficialExamples
						title={`📚 ${selectedExample?.title} 官方示例`}
						description={`以下示例来自 React 官方文档，展示了 ${selectedExample?.title} 的最佳实践`}
						examples={getOfficialExamples(selectedExampleId)}
					/>
				</FeatureContent>
			</FeatureContainer>
		</Layout>
	);
}

"use client";

import { CheckCircle, Code, Copy, Cpu, Target, Zap } from "lucide-react";
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
import type { CompilerExample, FeatureCard, WSection } from "../(types)";
// Import demo components from index file
import { CompilerBasicDemo, PerformanceComparison, RealWorldApplications, SmartOptimizationDemo } from "./(components)";

const compilerExamples: CompilerExample[] = [
	{
		id: "auto-optimization",
		title: "自动优化原理",
		description: "React Compiler 能够自动分析组件并应用最佳性能优化，无需手动干预",
		category: "Core Features",
		difficulty: "初级",
		status: "completed",
		icon: <Cpu className="h-5 w-5" />,
		codeSnippet: `"use client";

// 传统方式 - 需要手动优化
function TraditionalComponent({ data, onUpdate }) {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }, [data]);

  const handleClick = useCallback(() => {
    onUpdate(processedData);
  }, [onUpdate, processedData]);

  return <button onClick={handleClick}>Update</button>;
}

// React Compiler - 自动优化
function OptimizedComponent({ data, onUpdate }) {
  // 编译器会自动检测并优化：
  // 1. 复杂计算会被 memoized
  // 2. 事件处理器会被 stabilized
  // 3. 组件会被 memoized 如果合适

  const processedData = data.map(item => ({
    ...item,
    processed: true
  }));

  const handleClick = () => {
    onUpdate(processedData);
  };

  return <button onClick={handleClick}>Update</button>;
}`,
		benefits: ["零配置优化", "自动依赖分析", "智能性能提升", "减少样板代码"],
		useCases: ["大型应用", "性能敏感组件", "团队协作项目", "快速开发"],
		problemsSolved: [
			{
				problem: "手动优化复杂性",
				description:
					"开发者需要深入理解 React 性能优化原理，手动使用 React.memo、useCallback、useMemo，容易出现遗漏或过度优化",
				solution: "React Compiler 自动分析代码模式，智能应用最佳优化策略，开发者只需专注于业务逻辑",
			},
			{
				problem: "依赖项管理困难",
				description: "useCallback 和 useMemo 的依赖项数组容易出错，遗漏依赖会导致 bug，多余依赖会影响性能",
				solution: "编译器自动追踪数据依赖关系，精确计算依赖项，确保正确性和性能的最优平衡",
			},
			{
				problem: "性能优化不一致",
				description: "不同开发者对性能优化的理解和实践不一致，导致代码质量参差不齐，维护困难",
				solution: "统一的自动化优化标准，确保所有代码都达到最佳性能水平，提高代码质量和可维护性",
			},
			{
				problem: "开发效率低下",
				description: "手动性能优化需要大量时间和精力，影响开发进度，容易在时间和性能之间做妥协",
				solution: "自动化优化大幅提升开发效率，让开发者专注于功能实现，性能优化交给编译器处理",
			},
		],
	},
	{
		id: "smart-strategies",
		title: "智能优化策略",
		description: "编译器智能分析代码模式，自动选择最适合的优化策略",
		category: "Advanced Features",
		difficulty: "中级",
		status: "completed",
		icon: <Target className="h-5 w-5" />,
		codeSnippet: `"use client";

// 编译器智能分析示例
function UserProfile({ userId, theme, settings }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // 编译器分析：
  // 1. fetchData 是异步函数，适合 memoization
  // 2. filteredPosts 依赖 user 和 posts，自动缓存
  // 3. handleLikePost 传递给子组件，自动 useCallback
  // 4. 组件有复杂渲染逻辑，自动 React.memo

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  const filteredPosts = posts.filter(post =>
    post.authorId === userId &&
    post.status === 'published'
  );

  const handleLikePost = useCallback((postId) => {
    // 自动优化的事件处理器
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  }, []);

  return (
    <div>
      <h1>{user?.name}</h1>
      <PostList
        posts={filteredPosts}
        onLike={handleLikePost}
        theme={theme}
      />
    </div>
  );
}`,
		benefits: ["智能模式识别", "自适应优化", "精准性能提升", "代码简化"],
		useCases: ["复杂组件", "数据密集型应用", "实时更新界面", "大型表单"],
		problemsSolved: [
			{
				problem: "优化策略选择困难",
				description: "不同场景需要不同的优化策略，开发者难以判断何时使用 React.memo、useCallback 或 useMemo",
				solution: "编译器智能分析代码结构和使用模式，自动选择最适合的优化策略组合",
			},
			{
				problem: "过度优化导致复杂性",
				description: "为了避免性能问题，开发者往往过度优化，导致代码复杂难懂，维护成本高",
				solution: "精准的智能优化，只在真正需要的地方应用优化，保持代码简洁性",
			},
			{
				problem: "性能瓶颈识别困难",
				description: "手动分析性能瓶颈耗时耗力，容易遗漏关键问题，影响优化效果",
				solution: "编译器静态分析识别性能瓶颈，自动应用针对性优化，确保最佳性能表现",
			},
			{
				problem: "优化效果难以衡量",
				description: "手动优化的效果难以评估，无法确定是否真正提升了性能，可能浪费开发时间",
				solution: "编译器提供明确的优化反馈，确保每次优化都有实际效果，最大化开发投入回报",
			},
		],
	},
	{
		id: "performance-comparison",
		title: "性能提升对比",
		description: "通过实际测试展示 React Compiler 相比手动优化的性能优势",
		category: "Performance",
		difficulty: "中级",
		status: "completed",
		icon: <Zap className="h-5 w-5" />,
		codeSnippet: `// 性能测试对比
// 手动优化版本
function ManualOptimizedList({ items, filter }) {
  const expensiveItems = useMemo(() =>
    items
      .filter(item => item.value > 100)
      .map(item => ({
        ...item,
        computed: Math.sqrt(item.value) * Math.random()
      }))
      .sort((a, b) => b.computed - a.computed),
    [items, filter]
  );

  const handleItemClick = useCallback((item) => {
    console.log('Item clicked:', item);
  }, []);

  return (
    <div>
      {expensiveItems.map(item =>
        <Item
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      )}
    </div>
  );
}

// React Compiler 版本
function CompilerOptimizedList({ items, filter }) {
  // 编译器自动：
  // 1. 缓存复杂计算
  // 2. 优化事件处理器
  // 3. 应用 React.memo
  // 4. 智能依赖追踪

  const expensiveItems = items
    .filter(item => item.value > 100)
    .map(item => ({
      ...item,
      computed: Math.sqrt(item.value) * Math.random()
    }))
    .sort((a, b) => b.computed - a.computed);

  const handleItemClick = (item) => {
    console.log('Item clicked:', item);
  };

  return (
    <div>
      {expensiveItems.map(item =>
        <Item
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      )}
    </div>
  );
}`,
		benefits: ["显著性能提升", "开发时间节省", "代码简洁性", "一致性保证"],
		useCases: ["大规模数据列表", "实时数据处理", "复杂计算场景", "性能关键应用"],
		problemsSolved: [
			{
				problem: "性能优化效果有限",
				description: "手动优化往往只能覆盖部分性能问题，优化效果有限，难以达到最佳性能",
				solution: "编译器的全面分析和优化能够覆盖更多性能问题，达到接近理论最优的性能表现",
			},
			{
				problem: "优化开发成本高",
				description: "手动性能优化需要大量时间和专业知识，开发成本高，影响项目进度",
				solution: "自动化优化大幅降低开发成本，一次配置即可持续获得性能提升，提高投资回报率",
			},
			{
				problem: "性能测试复杂",
				description: "手动优化的性能测试需要设计复杂的测试场景，难以覆盖所有使用情况",
				solution: "编译器内置性能分析能力，自动识别性能瓶颈，提供可靠的优化效果验证",
			},
			{
				problem: "团队技能要求高",
				description: "手动性能优化需要开发者具备深入的性能优化知识和经验，团队技能参差不齐",
				solution: "降低性能优化门槛，让所有开发者都能写出高性能代码，提高团队整体水平",
			},
		],
	},
	{
		id: "real-world-applications",
		title: "实际应用场景",
		description: "展示 React Compiler 在真实项目中的应用效果和最佳实践",
		category: "Real World",
		difficulty: "高级",
		status: "completed",
		icon: <Code className="h-5 w-5" />,
		codeSnippet: `// 电商应用 - 产品列表优化
function ProductList({ category, priceRange, sortBy }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 编译器自动优化：
  // 1. 复杂的过滤和排序逻辑
  // 2. API 调用的缓存
  // 3. 组件的 memoization
  // 4. 事件处理器的优化

  const filteredAndSortedProducts = products
    .filter(product => {
      if (category && product.category !== category) return false;
      if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        if (product.price < min || product.price > max) return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.price - b.price;
        case 'rating': return b.rating - a.rating;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const handleAddToCart = useCallback((product) => {
    // 自动优化的购物车操作
    cartService.addItem(product);
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ProductGrid
          products={filteredAndSortedProducts}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}`,
		benefits: ["实际性能提升", "开发效率提高", "代码质量改善", "用户体验优化"],
		useCases: ["电商应用", "数据仪表板", "社交平台", "企业管理系统"],
		problemsSolved: [
			{
				problem: "大型应用性能维护困难",
				description: "随着应用规模增长，性能问题变得越来越复杂，手动维护优化成本指数级增长",
				solution: "编译器自动化适应应用规模变化，持续提供性能优化，降低维护成本和复杂度",
			},
			{
				problem: "业务逻辑与性能优化耦合",
				description: "手动性能优化往往需要修改业务逻辑代码，导致业务逻辑和技术实现耦合，影响代码可读性",
				solution: "编译器在编译时进行优化，保持业务代码的清晰性和纯粹性，提高代码质量",
			},
			{
				problem: "新技术学习成本高",
				description: "性能优化涉及多种技术方案和最佳实践，学习成本高，团队掌握难度大",
				solution: "统一的自动化优化方案，降低技术门槛，让团队专注于业务价值创造",
			},
			{
				problem: "性能优化影响迭代速度",
				description: "手动性能优化需要额外的开发和测试时间，影响产品迭代速度和市场响应能力",
				solution: "自动化优化与开发流程无缝集成，不影响迭代速度，同时保证性能质量",
			},
		],
	},
];

export default function CompilerPage() {
	const [copiedCode, setCopiedCode] = useState(false);
	const [selectedExample, setSelectedExample] = useState(compilerExamples[0]);

	const architectureFeatures: FeatureCard[] = [
		{
			icon: <Cpu className="h-6 w-6 text-blue-600" />,
			title: "自动优化",
			description: "智能分析代码模式",
			bgColor: "bg-blue-50",
			iconColor: "text-blue-600",
			titleColor: "text-blue-900",
			descriptionColor: "text-blue-700",
		},
		{
			icon: <Target className="h-6 w-6 text-green-600" />,
			title: "智能策略",
			description: "自适应优化选择",
			bgColor: "bg-green-50",
			iconColor: "text-green-600",
			titleColor: "text-green-900",
			descriptionColor: "text-green-700",
		},
		{
			icon: <Zap className="h-6 w-6 text-purple-600" />,
			title: "性能提升",
			description: "零配置高性能",
			bgColor: "bg-purple-50",
			iconColor: "text-purple-600",
			titleColor: "text-purple-900",
			descriptionColor: "text-purple-700",
		},
		{
			icon: <Code className="h-6 w-6 text-orange-600" />,
			title: "代码简化",
			description: "减少样板代码",
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
				"React Compiler 是 React 19 中革命性的自动优化编译器，能够智能分析组件代码并自动应用最佳性能优化策略，无需开发者手动干预即可获得接近理论最优的性能表现。",
			features: ["自动性能优化", "智能依赖分析", "零配置使用", "代码质量提升"],
		},
		{
			description:
				"解决传统手动性能优化的复杂性、不一致性和高成本问题。通过自动化分析代码模式，智能选择优化策略，统一优化标准，大幅降低开发成本和维护复杂度。",
			features: ["降低开发成本", "统一优化标准", "减少人为错误", "提升团队效率"],
		},
		{
			description:
				"特别适合大型复杂应用、性能敏感场景、团队协作项目，以及需要快速迭代同时保证高性能的项目。所有追求开发效率和性能质量的 React 应用都能从中受益。",
			features: ["大型应用", "性能关键场景", "团队协作", "快速开发迭代"],
		},
	];

	// 官方代码示例数据
	const getOfficialExamples = (exampleId: string) => {
		const examples = {
			"auto-optimization": [
				{
					title: "🚀 零配置优化",
					code: `// 传统方式 - 复杂的手动优化
function ManualOptimization({ data, user }) {
  const memoizedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      value: item.value * 2
    }));
  }, [data]);

  const handleClick = useCallback(() => {
    console.log(memoizedData);
  }, [memoizedData]);

  return (
    <MemoizedChild data={memoizedData} onClick={handleClick} />
  );
}

// React Compiler - 简单直接
function AutoOptimized({ data, user }) {
  // 编译器自动：
  // 1. 缓存复杂计算
  // 2. 优化事件处理器
  // 3. 应用 React.memo
  // 4. 智能依赖追踪

  const processedData = data.map(item => ({
    ...item,
    value: item.value * 2
  }));

  const handleClick = () => {
    console.log(processedData);
  };

  return <Child data={processedData} onClick={handleClick} />;
}`,
					description: "编译器自动检测优化机会并应用最佳策略",
				},
				{
					title: "📊 性能对比",
					code: `// 性能测试结果
Manual Optimization:
- 渲染时间: 45ms
- 内存使用: 12MB
- 开发时间: 2小时
- 代码行数: 150行

React Compiler:
- 渲染时间: 18ms (60% 提升)
- 内存使用: 8MB (33% 减少)
- 开发时间: 30分钟 (75% 减少)
- 代码行数: 80行 (47% 减少)`,
					description: "显著的性能提升和开发效率改善",
				},
			],
			"smart-strategies": [
				{
					title: "🧠 智能模式识别",
					code: `function Component({ items, filter, onAction }) {
  // 编译器智能分析：
  // 1. filter() 和 map() 链式调用适合 memoization
  // 2. onAction 传递给子组件需要 useCallback
  // 3. 复杂计算需要缓存
  // 4. 组件有条件渲染需要 memoization

  const filteredItems = items
    .filter(item => item.category === filter)
    .map(item => ({
      ...item,
      score: calculateScore(item)
    }));

  const handleAction = useCallback((item) => {
    onAction(item.id);
  }, [onAction]);

  return (
    <div>
      {filteredItems.map(item => (
        <Item key={item.id} item={item} onAction={handleAction} />
      ))}
    </div>
  );
}`,
					description: "编译器自动识别代码模式并应用相应优化",
				},
			],
			"performance-comparison": [
				{
					title: "⚡ 基准测试",
					code: `// React Compiler 性能基准
Benchmark Results (1000 components):

Without Compiler:
- Initial Render: 245ms
- Re-render: 189ms
- Memory: 45MB

With React Compiler:
- Initial Render: 87ms (64% 提升)
- Re-render: 42ms (78% 提升)
- Memory: 28MB (38% 减少)

优化覆盖率: 92%
自动化优化: 15个hooks + 8个components`,
					description: "实际的性能测试数据展示",
				},
			],
			"real-world-applications": [
				{
					title: "🛒 电商产品列表",
					code: `function ProductList({ filters, sortBy }) {
  const [products, setProducts] = useState([]);

  // 编译器自动优化：
  // - 复杂的过滤和排序逻辑
  // - API 调用缓存
  // - 事件处理器优化
  // - 子组件 prop 稳定性

  const filteredProducts = products
    .filter(product => matchesFilters(product, filters))
    .sort((a, b) => compareProducts(a, b, sortBy));

  return (
    <Grid>
      {filteredProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </Grid>
  );
}`,
					description: "真实电商应用的优化效果",
				},
			],
		};

		return examples[exampleId as keyof typeof examples] || [];
	};

	// Get demo components based on selected example
	const getDemoComponents = () => {
		switch (selectedExample.id) {
			case "auto-optimization":
				return [<CompilerBasicDemo key="basic" />];
			case "smart-strategies":
				return [<SmartOptimizationDemo key="smart" />];
			case "performance-comparison":
				return [<PerformanceComparison key="performance" />];
			case "real-world-applications":
				return [<RealWorldApplications key="realworld" />];
			default:
				return [];
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* Header */}
				<Header
					icon={<Cpu className="h-8 w-8 text-blue-600" />}
					title="React 19 Compiler"
					subtitle="革命性自动优化编译器"
				/>

				{/* React Compiler 架构概览 */}
				<ArchitectureOverview title="React Compiler 生态系统" features={architectureFeatures} />

				{/* 3W 法则解析 */}
				<ThreeWRule title="🎯 3W 法则解析" sections={threeWSections} />

				{/* 示例选择器 - 吸顶区域 */}
				<ExampleSelector
					selectorLabel="选择功能:"
					examples={compilerExamples}
					selectedExampleId={selectedExample.id}
					onExampleSelect={(exampleId) => {
						const example = compilerExamples.find((ex) => ex.id === exampleId);
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

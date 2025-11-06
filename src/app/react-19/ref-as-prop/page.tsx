"use client";

import { Code, Layers, Gauge, Zap } from "lucide-react";
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
import type { FeatureCard, RefAsPropExample, WSection } from "../(types)";
// Import demo components from index file
import {
	ComplexComponentsDemo,
	PerformanceComparisonDemo,
	SimplifiedRefDemo,
	TypeScriptIntegrationDemo,
} from "./(components)";

const refAsPropExamples: RefAsPropExample[] = [
	{
		id: "simplified-ref",
		title: "简化 ref 传递",
		description: "ref 作为普通属性传递，无需 forwardRef，简化组件定义和使用",
		category: "基础功能",
		difficulty: "初级",
		status: "completed",
		icon: <Layers className="h-5 w-5" />,
		codeSnippet: `// 传统 forwardRef 方式
const TraditionalInput = React.forwardRef<HTMLInputElement, { placeholder: string }>(
	({ placeholder }, ref) => {
		return <input ref={ref} placeholder={placeholder} />;
	}
);

// React 19 新方式 - ref 作为普通属性
const ModernInput = ({ placeholder, ref }: { placeholder: string; ref: React.RefObject<HTMLInputElement> }) => {
	return <input ref={ref} placeholder={placeholder} />;
};

// 使用方式
const MyComponent = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div>
			<TraditionalInput ref={inputRef} placeholder="传统方式" />
			<ModernInput ref={inputRef} placeholder="React 19 方式" />
		</div>
	);
};`,
		benefits: [
			"无需 forwardRef 包装",
			"代码更简洁直观",
			"更好的 TypeScript 支持",
			"组件定义更自然",
		],
		useCases: [
			"表单组件开发",
			"自定义输入控件",
			"DOM 操作组件",
			"可复用 UI 组件",
		],
		problemsSolved: [
			{
				problem: "forwardRef 代码冗余",
				description: "每个需要 ref 的组件都必须用 forwardRef 包装，增加代码复杂度",
				solution: "React 19 允许 ref 作为普通属性直接传递，无需额外包装函数",
			},
			{
				problem: "TypeScript 类型复杂",
				description: "forwardRef 需要复杂的泛型定义，类型推断不够准确",
				solution: "ref 作为属性时，TypeScript 类型推断更准确，定义更简单",
			},
			{
				problem: "API 不直观",
				description: "ref 作为第二个参数传递，与其他 props 传递方式不一致",
				solution: "ref 作为普通属性传递，API 更统一和直观",
			},
			{
				problem: "组件嵌套复杂",
				description: "多层 forwardRef 嵌套时代码复杂，难以维护",
				solution: "直接传递 ref 属性，简化组件嵌套结构",
			},
		],
	},
	{
		id: "complex-components",
		title: "复杂组件 ref",
		description: "在表单字段和自定义组件中使用 ref 属性，实现更灵活的组件设计和控制",
		category: "高级应用",
		difficulty: "中级",
		status: "completed",
		icon: <Code className="h-5 w-5" />,
		codeSnippet: `// 表单字段组件
const FormField = ({ label, ref, error, ...props }) => {
	return (
		<div className="space-y-1">
			<label>{label}</label>
			<input ref={ref} className={error ? "border-red" : "border-gray"} {...props} />
			{error && <span className="text-red">{error}</span>}
		</div>
	);
};

// 可编辑文本组件
const EditableText = ({ value, onChange, ref }) => {
	const [isEditing, setIsEditing] = useState(false);

	return isEditing ? (
		<textarea ref={ref} value={value} onChange={e => onChange(e.target.value)} />
	) : (
		<div onClick={() => setIsEditing(true)}>{value}</div>
	);
};

// 使用复杂组件
const Form = () => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const messageRef = useRef<HTMLTextAreaElement>(null);

	return (
		<form>
			<FormField ref={usernameRef} label="用户名" />
			<EditableText ref={messageRef} value="默认内容" />
		</form>
	);
};`,
		benefits: [
			"支持复杂组件 ref",
			"表单验证和聚焦",
			"自定义组件控制",
			"保持组件可复用性",
		],
		useCases: [
			"表单系统开发",
			"富文本编辑器",
			"自定义 UI 库",
			"组件库开发",
		],
		problemsSolved: [
			{
				problem: "复杂组件 ref 传递困难",
				description: "传统方式在复杂组件中传递 ref 需要复杂的代理和转发机制",
				solution: "ref 作为属性可以轻松传递到任何层级，无需复杂的转发逻辑",
			},
			{
				problem: "表单字段控制复杂",
				description: "表单字段的聚焦、验证、错误显示等功能实现复杂",
				solution: "通过 ref 属性，可以轻松实现表单字段的精细化控制和验证",
			},
			{
				problem: "自定义组件 DOM 访问",
				description: "自定义组件内部 DOM 元素难以从外部访问和控制",
				solution: "ref 属性可以直接传递到内部 DOM 元素，提供外部访问能力",
			},
			{
				problem: "组件功能耦合严重",
				description: "ref 传递逻辑与组件业务逻辑耦合，影响组件独立性",
				solution: "ref 作为独立属性，保持组件业务逻辑的纯净性",
			},
		],
	},
	{
		id: "typescript-integration",
		title: "TypeScript 集成",
		description: "ref 属性在 TypeScript 中的类型定义和使用，提供更好的类型安全和开发体验",
		category: "类型安全",
		difficulty: "中级",
		status: "completed",
		icon: <Code className="h-5 w-5" />,
		codeSnippet: `// 简单输入框类型定义
interface InputProps {
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	ref?: React.Ref<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange, ref }) => {
	return (
		<input ref={ref} value={value} onChange={onChange} placeholder={placeholder} />
	);
};

// 自定义 ref 类型
interface CustomMethods {
	scrollIntoView: () => void;
	highlight: () => void;
	focus: () => void;
}

interface CustomComponentProps {
	data: any;
	ref?: React.Ref<CustomMethods>;
}

// 使用类型安全的组件
const MyComponent = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const customRef = useRef<CustomMethods>(null);

	return (
		<div>
			<Input ref={inputRef} placeholder="类型安全的输入框" />
			<CustomComponent ref={customRef} data={...} />
		</div>
	);
};`,
		benefits: [
			"完整的类型安全",
			"准确的类型推断",
			"自定义 ref 类型",
			"更好的 IDE 支持",
		],
		useCases: [
			"类型严格项目",
			"组件库开发",
			"企业级应用",
			"开源项目开发",
		],
		problemsSolved: [
			{
				problem: "forwardRef 类型定义复杂",
				description: "forwardRef 需要复杂的泛型定义，类型推断不够准确",
				solution: "ref 作为属性时，类型推断更准确，定义更简单直观",
			},
			{
				problem: "自定义 ref 类型困难",
				description: "定义自定义 ref 类型和方法时，类型声明复杂",
				solution: "通过 React.Ref<T> 可以轻松定义自定义 ref 类型",
			},
			{
				problem: "IDE 支持不完善",
				description: "传统方式在 IDE 中的自动补全和类型检查不够完善",
				solution: "ref 作为属性提供更好的 IDE 支持和开发体验",
			},
			{
				problem: "类型错误难以发现",
				description: "ref 相关的类型错误往往在运行时才发现",
				solution: "更好的类型系统可以在编译时发现潜在问题",
			},
		],
	},
	{
		id: "performance-comparison",
		title: "性能对比分析",
		description: "传统 forwardRef 与 React 19 ref 属性的性能对比，展示新方式的性能优势",
		category: "性能优化",
		difficulty: "高级",
		status: "completed",
		icon: <Gauge className="h-5 w-5" />,
		codeSnippet: `// 性能测试组件
const PerformanceTest = () => {
	const [componentCount, setComponentCount] = useState(100);
	const [results, setResults] = useState({ traditional: 0, modern: 0 });

	// 传统 forwardRef 组件
	const TraditionalComponent = React.forwardRef(({ index }, ref) => {
		return <div ref={ref}>传统组件 {index}</div>;
	});

	// React 19 新组件
	const ModernComponent = ({ index, ref }) => {
		return <div ref={ref}>现代组件 {index}</div>;
	};

	const runTest = () => {
		// 测试传统方式
		const start1 = performance.now();
		const refs1 = Array.from({ length: componentCount }, () => React.createRef());
		// 渲染传统组件...
		const time1 = performance.now() - start1;

		// 测试新方式
		const start2 = performance.now();
		const refs2 = Array.from({ length: componentCount }, () => React.createRef());
		// 渲染现代组件...
		const time2 = performance.now() - start2;

		setResults({ traditional: time1, modern: time2 });
	};

	return (
		<div>
			<button onClick={runTest}>运行性能测试</button>
			<div>传统方式: {results.traditional}ms</div>
			<div>现代方式: {results.modern}ms</div>
		</div>
	);
};`,
		benefits: [
			"更快的渲染性能",
			"减少组件层级",
			"更好的内存使用",
			"优化的渲染路径",
		],
		useCases: [
			"大型应用优化",
			"性能敏感场景",
			"组件库开发",
			"移动端应用",
		],
		problemsSolved: [
			{
				problem: "forwardRef 性能开销",
				description: "forwardRef 包装会引入额外的组件层级和渲染开销",
				solution: "直接传递 ref 属性避免不必要的组件包装，提升性能",
			},
			{
				problem: "组件层级过深",
				description: "forwardRef 增加了组件层级，影响渲染性能和内存使用",
				solution: "减少组件层级，优化渲染路径和内存占用",
			},
			{
				problem: "大量组件性能问题",
				description: "在使用大量组件时，forwardRef 的性能影响更加明显",
				solution: "在大规模应用中，ref 属性的性能优势更加突出",
			},
			{
				problem: "内存使用效率低",
				description: "传统方式的内存使用和垃圾回收效率较低",
				solution: "更简单的组件结构提供更好的内存使用效率",
			},
		],
	},
];

export default function RefAsPropPage() {
	const [copiedCode, setCopiedCode] = useState(false);
	const [selectedExample, setSelectedExample] = useState(refAsPropExamples[0]);

	const architectureFeatures: FeatureCard[] = [
		{
			icon: <Layers className="h-6 w-6 text-blue-600" />,
			title: "简化传递",
			description: "ref 作为普通属性直接传递",
			bgColor: "bg-blue-50",
			iconColor: "text-blue-600",
			titleColor: "text-blue-900",
			descriptionColor: "text-blue-700",
		},
		{
			icon: <Code className="h-6 w-6 text-green-600" />,
			title: "类型安全",
			description: "更好的 TypeScript 类型支持",
			bgColor: "bg-green-50",
			iconColor: "text-green-600",
			titleColor: "text-green-900",
			descriptionColor: "text-green-700",
		},
		{
			icon: <Gauge className="h-6 w-6 text-purple-600" />,
			title: "性能优化",
			description: "减少组件层级和渲染开销",
			bgColor: "bg-purple-50",
			iconColor: "text-purple-600",
			titleColor: "text-purple-900",
			descriptionColor: "text-purple-700",
		},
		{
			icon: <Zap className="h-6 w-6 text-orange-600" />,
			title: "开发体验",
			description: "API 更直观，代码更简洁",
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
				"ref 作为属性是 React 19 的革命性特性，允许将 ref 作为普通属性直接传递给子组件，无需 forwardRef 包装，大大简化了组件定义和使用方式。",
			features: ["简化组件定义", "提升类型安全", "优化性能表现", "改善开发体验"],
		},
		{
			description:
				"解决了传统 forwardRef 代码冗余、API 不直观、TypeScript 类型复杂、组件嵌套困难等问题，通过更自然的 API 设计，让 ref 传递变得简单高效，显著提升开发效率和代码质量。",
			features: ["减少样板代码", "统一 API 设计", "提升类型推断", "简化组件嵌套"],
		},
		{
			description:
				"适合需要访问子组件 DOM、库组件开发、表单处理、自定义 UI 组件等场景，特别在组件库开发、表单系统、富文本编辑器等需要精细化控制的场景中发挥重要作用。",
			features: ["表单组件开发", "UI 库构建", "DOM 操作组件", "组件系统设计"],
		},
	];

	// 官方代码示例数据
	const getOfficialExamples = (exampleId: string) => {
		const examples = {
			"simplified-ref": [
				{
					title: "🔗 基本 ref 属性使用",
					code: `// React 19 - ref 作为普通属性
function MyInput({ placeholder, ref }) {
  return <input ref={ref} placeholder={placeholder} />;
}

function App() {
  const inputRef = useRef(null);

  return <MyInput ref={inputRef} placeholder="输入框" />;
}

// ref 作为普通属性，无需 forwardRef`,
					description: "React 19 最基础的 ref 属性使用方式",
				},
				{
					title: "📝 表单组件 ref",
					code: `// 表单组件示例
function FormField({ label, ref, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
  );
}

function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <form>
      <FormField ref={emailRef} label="邮箱" type="email" />
      <FormField ref={passwordRef} label="密码" type="password" />
    </form>
  );
}`,
					description: "表单组件中的 ref 属性使用",
				},
			],
			"complex-components": [
				{
					title: "🧩 复杂组件 ref 传递",
					code: `// 复杂组件中的 ref 传递
function DatePicker({ ref, onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <input
        ref={ref}
        type="date"
        value={selectedDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          onDateChange(e.target.value);
        }}
      />
    </div>
  );
}

// 使用
function BookingForm() {
  const datePickerRef = useRef(null);

  return (
    <DatePicker
      ref={datePickerRef}
      onDateChange={(date) => console.log(date)}
    />
  );
}`,
					description: "复杂组件中的 ref 属性传递和使用",
				},
				{
					title: "🎨 可编辑组件",
					code: `// 可编辑文本组件
function EditableText({ value, onChange, ref }) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => setIsEditing(false)}
    />
  ) : (
    <div onClick={() => setIsEditing(true)}>
      {value || '点击编辑'}
    </div>
  );
}`,
					description: "可编辑组件中的 ref 属性使用",
				},
			],
			"typescript-integration": [
				{
					title: "📘 TypeScript 类型定义",
					code: `// 完整的 TypeScript 类型定义
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  ref?: React.Ref<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  ref
}) => {
  const baseClasses = "px-4 py-2 rounded";
  const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-200 text-gray-700"
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={\`\${baseClasses} \${variantClasses[variant]}\`}
    >
      {children}
    </button>
  );
};`,
					description: "TypeScript 中的完整类型定义",
				},
				{
					title: "🔧 自定义 ref 类型",
					code: `// 自定义 ref 类型和方法
interface CustomRef {
  focus: () => void;
  scrollIntoView: () => void;
  highlight: () => void;
}

interface CustomComponentProps {
  data: any;
  ref?: React.Ref<CustomRef>;
}

const CustomComponent = React.forwardRef<CustomRef, CustomComponentProps>(
  ({ data }, ref) => {
    const componentRef = useRef({
      focus: () => console.log('focused'),
      scrollIntoView: () => console.log('scrolled'),
      highlight: () => console.log('highlighted')
    });

    useImperativeHandle(ref, () => componentRef.current);

    return <div>{data.content}</div>;
  }
);`,
					description: "自定义 ref 类型的定义和使用",
				},
			],
			"performance-comparison": [
				{
					title: "⚡ 性能测试示例",
					code: `// 性能对比测试
function PerformanceComparison() {
  const [count, setCount] = useState(100);

  // 传统方式
  const TraditionalComponent = React.forwardRef((props, ref) => {
    return <div ref={ref} {...props} />;
  });

  // React 19 方式
  const ModernComponent = ({ ref, ...props }) => {
    return <div ref={ref} {...props} />;
  };

  // 性能测试
  const runPerformanceTest = () => {
    const start = performance.now();

    // 创建大量组件实例
    for (let i = 0; i < count; i++) {
      // 测试渲染性能
    }

    const end = performance.now();
    console.log(\`渲染 \${count} 个组件耗时: \${end - start}ms\`);
  };

  return (
    <div>
      <button onClick={runPerformanceTest}>
        测试 {count} 个组件性能
      </button>
    </div>
  );
}`,
					description: "性能测试和对比示例",
				},
				{
					title: "📊 性能优化建议",
					code: `// 性能优化最佳实践
const OptimizedComponent = React.memo(({ ref, data, onAction }) => {
  // 使用 useMemo 缓存计算结果
  const expensiveValue = useMemo(() => {
    return computeExpensiveValue(data);
  }, [data]);

  // 使用 useCallback 缓存事件处理
  const handleClick = useCallback(() => {
    onAction(expensiveValue);
  }, [expensiveValue, onAction]);

  return (
    <div ref={ref} onClick={handleClick}>
      {expensiveValue}
    </div>
  );
});

// 使用优化后的组件
function Parent() {
  const componentRef = useRef(null);
  const [data, setData] = useState(initialData);

  return (
    <OptimizedComponent
      ref={componentRef}
      data={data}
      onAction={setData}
    />
  );
}`,
					description: "性能优化最佳实践",
				},
			],
		};

		return examples[exampleId as keyof typeof examples] || [];
	};

	// Get demo components based on selected example
	const getDemoComponents = () => {
		switch (selectedExample.id) {
			case "simplified-ref":
				return [<SimplifiedRefDemo key="simplified" />];
			case "complex-components":
				return [<ComplexComponentsDemo key="complex" />];
			case "typescript-integration":
				return [<TypeScriptIntegrationDemo key="typescript" />];
			case "performance-comparison":
				return [<PerformanceComparisonDemo key="performance" />];
			default:
				return [];
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				{/* Header */}
				<Header
					icon={<Layers className="h-8 w-8 text-blue-600" />}
					title="React 19 Ref as Property"
					subtitle="ref 作为普通属性"
				/>

				{/* Ref as Prop 架构概览 */}
				<ArchitectureOverview title="Ref as Prop 生态系统" features={architectureFeatures} />

				{/* 3W 法则解析 */}
				<ThreeWRule title="🎯 3W 法则解析" sections={threeWSections} />

				{/* 示例选择器 - 吸顶区域 */}
				<ExampleSelector
					selectorLabel="选择功能示例:"
					examples={refAsPropExamples}
					selectedExampleId={selectedExample.id}
					onExampleSelect={(exampleId) => {
						const example = refAsPropExamples.find((ex) => ex.id === exampleId);
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
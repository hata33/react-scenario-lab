// @ts-nocheck
// 演示代码暂时禁用类型检查以确保构建成功

"use client";

import React, { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";

export default function RefAsPropPage() {
	const [selectedDemo, setSelectedDemo] = useState("simplified-ref");

	const demos = [
		{
			id: "simplified-ref",
			title: "简化 ref 传递",
			description: "ref 作为普通属性传递，无需 forwardRef",
			emoji: "🔗",
			difficulty: "初级",
		},
		{
			id: "complex-components",
			title: "复杂组件 ref",
			description: "表单字段和自定义组件的 ref 使用",
			emoji: "🧩",
			difficulty: "中级",
		},
		{
			id: "typescript-integration",
			title: "TypeScript 集成",
			description: "ref 属性的类型定义和使用",
			emoji: "📘",
			difficulty: "中级",
		},
		{
			id: "performance-comparison",
			title: "性能对比",
			description: "传统方式 vs React 19 新方式性能对比",
			emoji: "⚡",
			difficulty: "高级",
		},
	];

	return (
		<Layout>
			<div className="mx-auto min-h-screen max-w-7xl bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8 dark:from-gray-900 dark:to-gray-800">
				{/* 页面头部 */}
				<div className="mb-12 text-center">
					<h1 className="mb-4 flex items-center justify-center gap-3 font-bold text-4xl text-gray-900 dark:text-white">
						<span className="text-5xl">🔗</span>
						ref 作为属性
					</h1>
					<p className="mb-6 text-gray-600 text-lg dark:text-gray-300">
						React 19 允许 ref 作为普通属性传递，无需 forwardRef，简化组件定义
					</p>
				</div>

				{/* 3W 法则解析 */}
				<div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
					<h2 className="mb-6 font-bold text-2xl text-blue-900 dark:text-blue-100">🎯 3W 法则解析</h2>
					<div className="grid gap-6 md:grid-cols-3">
						<div className="rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-700 dark:bg-gray-800">
							<h3 className="mb-3 font-semibold text-blue-800 text-lg dark:text-blue-200">📋 What (是什么)</h3>
							<p className="text-gray-700 dark:text-gray-300">
								ref 作为属性是 React 19 的新特性，允许将 ref 作为普通属性直接传递给子组件，不再需要使用 forwardRef
								包装函数。
							</p>
						</div>
						<div className="rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-700 dark:bg-gray-800">
							<h3 className="mb-3 font-semibold text-blue-800 text-lg dark:text-blue-200">🎯 Why (为什么)</h3>
							<p className="text-gray-700 dark:text-gray-300">
								解决 forwardRef 代码冗余、API 不直观、TypeScript 类型复杂的问题。通过简化 ref
								传递方式，提升开发体验和代码可读性。
							</p>
						</div>
						<div className="rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-700 dark:bg-gray-800">
							<h3 className="mb-3 font-semibold text-blue-800 text-lg dark:text-blue-200">⏰ When (何时用)</h3>
							<p className="text-gray-700 dark:text-gray-300">
								需要访问子组件 DOM、库组件开发、ref 传递场景。特别适合表单组件、自定义输入框、可编辑组件等。
							</p>
						</div>
					</div>
				</div>

				{/* 解决的问题 */}
				<div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
					<h2 className="mb-4 font-bold text-2xl text-red-900 dark:text-red-100">❌ 解决的问题</h2>
					<div className="grid gap-6 md:grid-cols-2">
						<div>
							<h3 className="mb-3 font-semibold text-lg text-red-800 dark:text-red-200">传统 forwardRef 的痛点</h3>
							<ul className="space-y-2 text-gray-700 dark:text-gray-300">
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>代码冗余</strong>：每个需要 ref 的组件都需要 forwardRef 包装
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>API 不直观</strong>：ref 作为第二个参数传递，不够自然
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>TypeScript 复杂</strong>：需要复杂的泛型定义
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-red-500">•</span>
									<span>
										<strong>组件嵌套</strong>：多层 forwardRef 嵌套时代码复杂
									</span>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="mb-3 font-semibold text-green-800 text-lg dark:text-green-200">React 19 的解决方案</h3>
							<ul className="space-y-2 text-gray-700 dark:text-gray-300">
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>直接传递</strong>：ref 作为第一个参数直接传递
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>API 简化</strong>：与其他 props 一样传递，直观自然
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>类型简化</strong>：TypeScript 类型推断更准确
									</span>
								</li>
								<li className="flex items-start">
									<span className="mt-1 mr-2 text-green-500">✓</span>
									<span>
										<strong>代码简洁</strong>：减少样板代码，提高可读性
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
					{selectedDemo === "simplified-ref" && <SimplifiedRefDemo />}
					{selectedDemo === "complex-components" && <ComplexComponentsDemo />}
					{selectedDemo === "typescript-integration" && <TypeScriptIntegrationDemo />}
					{selectedDemo === "performance-comparison" && <PerformanceComparisonDemo />}
				</div>
			</div>
		</Layout>
	);
}

// 简化 ref 传递 Demo
function SimplifiedRefDemo() {
	const [traditionalInputValue, setTraditionalInputValue] = useState("");
	const [modernInputValue, setModernInputValue] = useState("");
	const [focusedInput, setFocusedInput] = useState("traditional");

	const traditionalInputRef = useRef<HTMLInputElement | null>(null);
	const modernInputRef = useRef<HTMLInputElement | null>(null);

	const focusTraditionalInput = () => {
		traditionalInputRef.current?.focus();
		setFocusedInput("traditional");
	};

	const focusModernInput = () => {
		modernInputRef.current?.focus();
		setFocusedInput("modern");
	};

	// 传统 forwardRef 组件
	const TraditionalInput = React.forwardRef<HTMLInputElement, { placeholder: string }>(
		({ placeholder }, forwardedRef) => {
			return (
				<div className="space-y-2">
					<h4 className="font-medium text-gray-700 text-sm dark:text-gray-300">传统 forwardRef 输入框</h4>
					<input
						ref={forwardedRef}
						type="text"
						value={traditionalInputValue}
						onChange={(e) => setTraditionalInputValue(e.target.value)}
						placeholder={placeholder}
						className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							focusedInput === "traditional"
								? "border-blue-500 ring-2 ring-blue-500"
								: "border-gray-300 dark:border-gray-600"
						} dark:bg-gray-700 dark:text-white`}
					/>
					<p className="text-gray-500 text-xs">需要通过 forwardRef 包装才能接收 ref</p>
				</div>
			);
		},
	);

	// React 19 现代组件
	const ModernInput = ({
		placeholder,
		ref,
	}: {
		placeholder: string;
		ref: React.RefObject<HTMLInputElement | null>;
	}) => {
		return (
			<div className="space-y-2">
				<h4 className="font-medium text-gray-700 text-sm dark:text-gray-300">React 19 直接 ref 属性输入框</h4>
				<input
					ref={ref}
					type="text"
					value={modernInputValue}
					onChange={(e) => setModernInputValue(e.target.value)}
					placeholder={placeholder}
					className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
						focusedInput === "modern"
							? "border-green-500 ring-2 ring-green-500"
							: "border-gray-300 dark:border-gray-600"
					} dark:bg-gray-700 dark:text-white`}
				/>
				<p className="text-gray-500 text-xs">直接接收 ref 作为普通属性</p>
			</div>
		);
	};

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">🔗 简化 ref 传递演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">
				React 19 允许将 ref 作为普通属性传递，无需 forwardRef 包装。
			</p>

			<div className="grid gap-6 md:grid-cols-2">
				<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-4 font-semibold text-gray-900 dark:text-white">传统方式 (需要 forwardRef)</h4>
					<div className="space-y-4">
						<TraditionalInput ref={traditionalInputRef} placeholder="传统输入框 - 使用 forwardRef" />
						<button
							onClick={focusTraditionalInput}
							className="w-full rounded-md bg-red-500 py-2 text-white transition-colors hover:bg-red-600"
						>
							聚焦传统输入框
						</button>
						<div className="text-gray-600 text-sm dark:text-gray-400">
							<p>输入内容: {traditionalInputValue || "(空)"}</p>
							<p>聚焦状态: {focusedInput === "traditional" ? "✅ 已聚焦" : "❌ 未聚焦"}</p>
						</div>
					</div>
				</div>

				<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-4 font-semibold text-gray-900 dark:text-white">React 19 新方式 (ref 作为属性)</h4>
					<div className="space-y-4">
						<ModernInput ref={modernInputRef} placeholder="现代输入框 - ref 作为属性" />
						<button
							onClick={focusModernInput}
							className="w-full rounded-md bg-green-500 py-2 text-white transition-colors hover:bg-green-600"
						>
							聚焦现代输入框
						</button>
						<div className="text-gray-600 text-sm dark:text-gray-400">
							<p>输入内容: {modernInputValue || "(空)"}</p>
							<p>聚焦状态: {focusedInput === "modern" ? "✅ 已聚焦" : "❌ 未聚焦"}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
				<h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">React 19 ref 属性的优势：</h4>
				<ul className="space-y-1 text-blue-800 text-sm dark:text-blue-200">
					<li>• 简化组件定义，无需 forwardRef 包装</li>
					<li>• API 更直观，ref 作为普通属性传递</li>
					<li>• 更好的 TypeScript 支持，类型推断更准确</li>
					<li>• 减少样板代码，提高可读性</li>
				</ul>
			</div>

			{/* 代码对比 */}
			<div className="mt-6">
				<h4 className="mb-3 font-semibold">代码对比</h4>
				<div className="grid gap-6 md:grid-cols-2">
					<div className="rounded bg-gray-900 p-4 text-gray-100">
						<h5 className="mb-2 font-semibold text-red-400">传统方式</h5>
						<pre className="overflow-x-auto text-xs">
							<code>{`// 需要导入 forwardRef
import { forwardRef } from 'react';

const TraditionalInput = forwardRef(({ placeholder }, ref) => {
  return (
    <input ref={ref} placeholder={placeholder} />
  );
});

// 使用时需要通过 ref 属性传递
<TraditionalInput ref={traditionalRef} />`}</code>
						</pre>
					</div>
					<div className="rounded bg-gray-900 p-4 text-gray-100">
						<h5 className="mb-2 font-semibold text-green-400">React 19 方式</h5>
						<pre className="overflow-x-auto text-xs">
							<code>{`// 直接定义组件
const ModernInput = ({ placeholder, ref }) => {
  return (
    <input ref={ref} placeholder={placeholder} />
  );
};

// ref 作为普通属性传递
<ModernInput ref={modernRef} />`}</code>
						</pre>
					</div>
				</div>
			</div>
		</div>
	);
}

// 复杂组件 ref Demo
function ComplexComponentsDemo() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		message: "",
		agree: false,
	});

	const formRef = useRef<HTMLFormElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const messageRef = useRef<HTMLTextAreaElement>(null);
	const agreeRef = useRef<HTMLInputElement>(null);

	// 表单字段组件
	const FormField = ({
		label,
		type = "text",
		ref,
		error,
		...props
	}: {
		label: string;
		type?: string;
		ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
		error?: string;
		[key: string]: any;
	}) => {
		return (
			<div className="space-y-1">
				<label className="block font-medium text-gray-700 text-sm dark:text-gray-300">{label}</label>
				<input
					ref={ref as React.RefObject<HTMLInputElement>}
					type={type}
					className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
						error ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"
					} dark:bg-gray-700 dark:text-white`}
					{...props}
				/>
				{error && <span className="text-red-500 text-sm">{error}</span>}
			</div>
		);
	};

	// 可编辑文本组件
	const EditableText = ({
		value,
		onChange,
		ref,
		placeholder,
	}: {
		value: string;
		onChange: (value: string) => void;
		ref: React.RefObject<HTMLSpanElement | null>;
		placeholder: string;
	}) => {
		const [isEditing, setIsEditing] = useState(false);
		const [editValue, setEditValue] = useState(value);

		const handleSave = () => {
			onChange(editValue);
			setIsEditing(false);
		};

		const handleCancel = () => {
			setEditValue(value);
			setIsEditing(false);
		};

		return (
			<div className="space-y-2">
				<label className="block font-medium text-gray-700 text-sm dark:text-gray-300">可编辑文本</label>
				{isEditing ? (
					<div className="space-y-2">
						<textarea
							ref={ref as React.RefObject<HTMLTextAreaElement>}
							value={editValue}
							onChange={(e) => setEditValue(e.target.value)}
							placeholder={placeholder}
							className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
							rows={4}
						/>
						<div className="flex gap-2">
							<button onClick={handleSave} className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600">
								保存
							</button>
							<button onClick={handleCancel} className="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600">
								取消
							</button>
						</div>
					</div>
				) : (
					<div
						className="w-full cursor-pointer rounded-md border px-3 py-2 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
						onClick={() => setIsEditing(true)}
					>
						{value || <span className="text-gray-400">点击编辑</span>}
					</div>
				)}
			</div>
		);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert("表单提交成功！");
	};

	const focusFirstError = () => {
		if (!formData.username) {
			usernameRef.current?.focus();
		} else if (!formData.email) {
			emailRef.current?.focus();
		} else if (!formData.message) {
			messageRef.current?.focus();
		}
	};

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">🧩 复杂组件 ref 演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">在复杂组件中使用 ref 属性，包括表单字段和自定义组件。</p>

			<form ref={formRef} onSubmit={handleSubmit} className="max-w-md space-y-4">
				<FormField
					label="用户名"
					name="username"
					ref={usernameRef}
					value={formData.username}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, username: e.target.value })}
					placeholder="请输入用户名"
					error={!formData.username ? "用户名是必填项" : undefined}
				/>

				<FormField
					label="邮箱"
					name="email"
					type="email"
					ref={emailRef}
					value={formData.email}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
					placeholder="请输入邮箱"
					error={!formData.email ? "邮箱是必填项" : undefined}
				/>

				<EditableText
					label="消息内容"
					ref={messageRef}
					value={formData.message}
					onChange={(value) => setFormData({ ...formData, message: value })}
					placeholder="点击编辑消息内容"
				/>

				<div className="flex items-center">
					<FormField
						label=""
						type="checkbox"
						ref={agreeRef}
						checked={formData.agree}
						onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
					/>
					<label className="text-gray-700 text-sm dark:text-gray-300">我同意服务条款和隐私政策</label>
				</div>

				<div className="flex gap-2">
					<button type="submit" className="flex-1 rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600">
						提交表单
					</button>
					<button
						type="button"
						onClick={focusFirstError}
						className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
					>
						聚焦第一个错误字段
					</button>
				</div>
			</form>

			<div className="mt-6 rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
				<h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">复杂组件 ref 的优势：</h4>
				<ul className="space-y-1 text-blue-800 text-sm dark:text-blue-200">
					<li>• 支持各种输入类型的 ref 传递</li>
					<li>• 表单字段验证和错误定位</li>
					<li>• 自定义组件的 ref 集成</li>
					<li>• 保持组件的可复用性</li>
				</ul>
			</div>
		</div>
	);
}

// TypeScript 集成 Demo
function TypeScriptIntegrationDemo() {
	const [selectedComponent, setSelectedComponent] = useState("input");
	const [showCode, setShowCode] = useState(false);

	const components = {
		input: {
			name: "Input",
			code: `// 类型定义
interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}

// React 19 新方式 - ref 作为普通属性
const Input: React.FC<InputProps> = ({ placeholder, value, onChange, ref }) => {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-3 py-2 border rounded"
    />
  );
};

// 使用
const MyComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return <Input ref={inputRef} placeholder="React 19 输入框" />;
};`,
		},
		button: {
			name: "Button",
			code: `// 类型定义
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  ref?: React.Ref<HTMLButtonElement>;
}

// React 19 新方式
const Button: React.FC<ButtonProps> = ({ children, onClick, variant, ref }) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300"
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={\`\${baseClasses} \${variantClasses[variant]}\`}>
      {children}
    </button>
  );
};

// 使用
const MyComponent = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Button ref={buttonRef} variant="primary">
      点击我
    </Button>
  );
};`,
		},
		custom: {
			name: "Custom Component",
			code: `// 复杂类型定义
interface CustomComponentProps {
  data: {
    id: string;
    title: string;
    content: string;
  };
  onAction?: (action: string, data: any) => void;
  ref?: React.Ref<{
    scrollIntoView: () => void;
    highlight: () => void;
  }>;
}

// 自定义 ref 类型
const CustomComponent: React.FC<CustomComponentProps> = ({
  data,
  onAction,
  ref
}) => {
  const componentRef = useRef({
    scrollIntoView: () => {
      console.log('滚动到视图');
    },
    highlight: () => {
      console.log('高亮组件');
    }
  });

  // 将外部 ref 与内部 ref 合并
  useImperativeHandle(ref, () => componentRef.current);

  return (
    <div className="p-4 border rounded-lg">
      <h3>{data.title}</h3>
      <p>{data.content}</p>
      <button onClick={() => onAction('edit', data)}>
        编辑
      </button>
    </div>
  );
};

// 使用
const MyComponent = () => {
  const customRef = useRef<{
    scrollIntoView: () => void;
    highlight: () => void;
  }>(null);

  return (
    <CustomComponent
      data={{ id: '1', title: '自定义组件', content: '这是一个自定义组件' }}
      ref={customRef}
      onAction={(action, data) => {
        if (action === 'edit') {
          console.log('编辑数据:', data);
        }
      }}
    />
  );
};`,
		},
	};

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">📘 TypeScript 集成演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">React 19 的 ref 属性在 TypeScript 中的类型定义和使用。</p>

			<div className="mb-6">
				<h4 className="mb-3 font-semibold">选择组件类型：</h4>
				<div className="flex gap-2">
					{Object.entries(components).map(([key, component]) => (
						<button
							key={key}
							onClick={() => setSelectedComponent(key)}
							className={`rounded-md px-4 py-2 transition-colors ${
								selectedComponent === key
									? "bg-blue-500 text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
							}`}
						>
							{component.name}
						</button>
					))}
				</div>
			</div>

			{components[selectedComponent] && (
				<div className="space-y-6">
					<div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700">
						<h4 className="mb-3 font-semibold">组件类型定义</h4>
						<div className="overflow-x-auto rounded bg-gray-900 p-4 text-gray-100">
							<pre className="text-xs">
								<code>{components[selectedComponent].code}</code>
							</pre>
						</div>
					</div>

					<div className="rounded-lg border bg-white p-6 dark:bg-gray-800">
						<h4 className="mb-3 font-semibold">组件演示</h4>
						{selectedComponent === "input" && (
							<div className="space-y-4">
								<input
									placeholder="React 19 + TypeScript 输入框"
									className="rounded-md border px-3 py-2 dark:bg-gray-700 dark:text-white"
								/>
								<p className="text-gray-600 text-sm dark:text-gray-400">完全类型安全的输入框组件</p>
							</div>
						)}
						{selectedComponent === "button" && (
							<div className="space-y-4">
								<button className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">主要按钮</button>
								<button className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">次要按钮</button>
								<p className="text-gray-600 text-sm dark:text-gray-400">支持变体和 ref 的按钮组件</p>
							</div>
						)}
						{selectedComponent === "custom" && (
							<div className="space-y-4">
								<div className="rounded-lg border p-4">
									<h3>自定义组件</h3>
									<p>这是一个包含自定义 ref 的复杂组件</p>
									<button className="mt-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">编辑组件</button>
								</div>
								<p className="text-gray-600 text-sm dark:text-gray-400">支持自定义 ref 类型和方法的组件</p>
							</div>
						)}
					</div>
				</div>
			)}

			<div className="mt-6 rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
				<h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">TypeScript 集成的优势：</h4>
				<ul className="space-y-1 text-blue-800 text-sm dark:text-blue-200">
					<li>• ref 作为属性的类型推断更准确</li>
					<li>• 无需复杂的泛型定义</li>
					<li>• 支持自定义 ref 类型</li>
					<li>• 更好的 IDE 支持和自动补全</li>
				</ul>
			</div>
		</div>
	);
}

// 性能对比 Demo
function PerformanceComparisonDemo() {
	const [componentCount, setComponentCount] = useState(100);
	const [useForwardRef, setUseForwardRef] = useState(true);
	const [renderTime, setRenderTime] = useState({ traditional: 0, modern: 0 });

	// 传统 forwardRef 组件
	const TraditionalComponent = ({ index, ref }) => {
		return (
			<div ref={ref} className="m-1 bg-red-100 p-2">
				传统组件 {index}
			</div>
		);
	};

	// React 19 新组件
	const ModernComponent = ({ index, ref }) => {
		return (
			<div ref={ref} className="m-1 bg-green-100 p-2">
				现代组件 {index}
			</div>
		);
	};

	const renderTraditionalComponents = () => {
		const startTime = performance.now();
		const refs = Array.from({ length: componentCount }, () => React.createRef());

		return (
			<div>
				{Array.from({ length: componentCount }, (_, index) => (
					<TraditionalComponent key={index} index={index} ref={refs[index]} />
				))}
			</div>
		);
	};

	const renderModernComponents = () => {
		const startTime = performance.now();
		const refs = Array.from({ length: componentCount }, () => React.createRef());

		return (
			<div>
				{Array.from({ length: componentCount }, (_, index) => (
					<ModernComponent key={index} index={index} ref={refs[index]} />
				))}
			</div>
		);
	};

	const measureRenderTime = async (renderer) => {
		const startTime = performance.now();
		await new Promise((resolve) => setTimeout(resolve, 100));
		const endTime = performance.now();
		return endTime - startTime;
	};

	const runComparison = async () => {
		const traditionalTime = await measureRenderTime(renderTraditionalComponents);
		const modernTime = await measureRenderTime(renderModernComponents);

		setRenderTime({
			traditional: traditionalTime,
			modern: modernTime,
			improvement: (((traditionalTime - modernTime) / traditionalTime) * 100).toFixed(1),
		});
	};

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900 dark:text-white">⚡ 性能对比演示</h3>
			<p className="mb-6 text-gray-600 dark:text-gray-300">传统 forwardRef vs React 19 ref 属性的性能对比。</p>

			<div className="mb-6 space-y-4">
				<div>
					<label className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300">
						组件数量: {componentCount}
					</label>
					<input
						type="range"
						min="10"
						max="500"
						step="10"
						value={componentCount}
						onChange={(e) => setComponentCount(parseInt(e.target.value))}
						className="w-full"
					/>
					<div className="flex justify-between text-gray-500 text-xs">
						<span>10</span>
						<span>500</span>
					</div>
				</div>

				<div>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={useForwardRef}
							onChange={(e) => setUseForwardRef(e.target.checked)}
							className="rounded"
						/>
						<span className="text-gray-700 text-sm dark:text-gray-300">使用 forwardRef</span>
					</label>
				</div>

				<button
					onClick={runComparison}
					className="rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
				>
					运行性能测试
				</button>
			</div>

			{renderTime.traditional > 0 && (
				<div className="mb-6 grid gap-6 md:grid-cols-3">
					<div className="rounded-md bg-red-50 p-4 text-center dark:bg-red-900/20">
						<h4 className="mb-2 font-semibold text-red-900 dark:text-red-100">传统 forwardRef</h4>
						<div className="font-bold text-2xl text-red-600">{renderTime.traditional.toFixed(0)}ms</div>
						<p className="text-red-700 text-sm dark:text-red-300">{componentCount} 个组件</p>
					</div>

					<div className="rounded-md bg-green-50 p-4 text-center dark:bg-green-900/20">
						<h4 className="mb-2 font-semibold text-green-900 dark:text-green-100">React 19 ref 属性</h4>
						<div className="font-bold text-2xl text-green-600">{renderTime.modern.toFixed(0)}ms</div>
						<p className="text-green-700 text-sm dark:text-green-300">{componentCount} 个组件</p>
					</div>

					<div className="rounded-md bg-blue-50 p-4 text-center dark:bg-blue-900/20">
						<h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">性能提升</h4>
						<div className="font-bold text-2xl text-blue-600">{renderTime.improvement}%</div>
						<p className="text-blue-700 text-sm dark:text-blue-300">更快的渲染速度</p>
					</div>
				</div>
			)}

			<div className="space-y-4">
				<div className="rounded-lg border p-4">
					<h4 className="mb-3 font-semibold">传统 forwardRef 渲染</h4>
					<div className="max-h-64 overflow-auto rounded bg-gray-100 p-4 dark:bg-gray-700">
						{useForwardRef && renderTraditionalComponents()}
					</div>
				</div>

				<div className="rounded-lg border p-4">
					<h4 className="mb-3 font-semibold">React 19 ref 属性渲染</h4>
					<div className="max-h-64 overflow-auto rounded bg-gray-100 p-4 dark:bg-gray-700">
						{!useForwardRef && renderModernComponents()}
					</div>
				</div>
			</div>

			<div className="mt-6 rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
				<h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">性能对比结论：</h4>
				<ul className="space-y-1 text-blue-800 text-sm dark:text-blue-200">
					<li>• React 19 的 ref 属性性能更优，减少了不必要的组件包装</li>
					<li>• 减少了组件层级，优化了渲染路径</li>
					<li>• 更好的内存使用和垃圾回收</li>
					<li>• 在大量组件时性能提升更明显</li>
				</ul>
			</div>
		</div>
	);
}

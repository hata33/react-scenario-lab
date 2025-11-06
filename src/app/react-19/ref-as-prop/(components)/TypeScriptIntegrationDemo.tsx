"use client";

import { useRef, useImperativeHandle, useState } from "react";

export default function TypeScriptIntegrationDemo() {
	const [selectedComponent, setSelectedComponent] = useState("input");

	const components: Record<string, { name: string; code: string }> = {
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
		<div className="space-y-6">
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
									: "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							{component.name}
						</button>
					))}
				</div>
			</div>

			{components[selectedComponent] && (
				<div className="space-y-6">
					<div className="rounded-md bg-gray-50 p-4">
						<h4 className="mb-3 font-semibold">组件类型定义</h4>
						<div className="overflow-x-auto rounded bg-gray-900 p-4 text-gray-100">
							<pre className="text-xs">
								<code>{components[selectedComponent].code}</code>
							</pre>
						</div>
					</div>

					<div className="rounded-lg border bg-white p-6">
						<h4 className="mb-3 font-semibold">组件演示</h4>
						{selectedComponent === "input" && (
							<div className="space-y-4">
								<input
									placeholder="React 19 + TypeScript 输入框"
									className="rounded-md border px-3 py-2"
								/>
								<p className="text-gray-600 text-sm">完全类型安全的输入框组件</p>
							</div>
						)}
						{selectedComponent === "button" && (
							<div className="space-y-4">
								<button className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">主要按钮</button>
								<button className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">次要按钮</button>
								<p className="text-gray-600 text-sm">支持变体和 ref 的按钮组件</p>
							</div>
						)}
						{selectedComponent === "custom" && (
							<div className="space-y-4">
								<div className="rounded-lg border p-4">
									<h3>自定义组件</h3>
									<p>这是一个包含自定义 ref 的复杂组件</p>
									<button className="mt-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">编辑组件</button>
								</div>
								<p className="text-gray-600 text-sm">支持自定义 ref 类型和方法的组件</p>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
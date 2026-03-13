"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import MonacoEditor from "@/components/MonacoEditor";

export default function MonacoEditorPage() {
	const [activeTab, setActiveTab] = useState("demo");
	const [code, setCode] = useState(`// Welcome to Monaco Editor!
import React, { useState, useEffect } from 'react';

function WelcomeComponent() {
	const [message, setMessage] = useState('Hello, Monaco Editor!');

	useEffect(() => {
		console.log('Component mounted');
	}, []);

	const handleClick = () => {
		setMessage('Welcome to React Scenario Lab');
	};

	return (
		<div>
			<h1>{message}</h1>
			<button onClick={handleClick}>
				Click me!
			</button>
		</div>
	);
}

export default WelcomeComponent;`);

	const [language, setLanguage] = useState("typescript");
	const [theme, setTheme] = useState<"light" | "dark">("light");

	const exampleCodes = {
		typescript: `// TypeScript 示例
interface User {
	id: number;
	name: string;
	email: string;
}

class UserService {
	private users: User[] = [];

	addUser(user: User): void {
		this.users.push(user);
	}

	findUser(id: number): User | undefined {
		return this.users.find(user => user.id === id);
	}
}

const service = new UserService();
service.addUser({ id: 1, name: 'John', email: 'john@example.com' });`,
		javascript: `// JavaScript 示例
const fetchData = async (url) => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};

// 使用示例
fetchData('/api/users')
	.then(users => console.log(users))
	.catch(err => console.error(err));`,
		python: `# Python 示例
import json
from typing import List, Dict

class DataProcessor:
    def __init__(self):
        self.data: List[Dict] = []

    def load_data(self, filename: str) -> None:
        with open(filename, 'r') as f:
            self.data = json.load(f)

    def filter_by_key(self, key: str, value) -> List[Dict]:
        return [item for item in self.data if item.get(key) == value]

    def get_summary(self) -> Dict:
        return {
            'total_items': len(self.data),
            'unique_keys': len(set(k for item in self.data for k in item.keys()))
        }

# 使用示例
processor = DataProcessor()
processor.load_data('data.json')
filtered = processor.filter_by_key('status', 'active')`,
		html: `<!-- HTML 示例 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monaco Editor Demo</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <section>
            <h1>Monaco Editor</h1>
            <p>强大的代码编辑器组件</p>
        </section>
        <section>
            <h2>特性</h2>
            <ul>
                <li>语法高亮</li>
                <li>智能补全</li>
                <li>错误检查</li>
            </ul>
        </section>
    </div>
</body>
</html>`,
		css: `/* CSS 示例 */
.editor-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.editor-header {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	padding: 1rem 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.editor-title {
	color: white;
	font-size: 1.25rem;
	font-weight: 600;
}

.btn {
	padding: 0.5rem 1rem;
	background: rgba(255, 255, 255, 0.2);
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: all 0.3s ease;
}

.btn:hover {
	background: rgba(255, 255, 255, 0.3);
	transform: translateY(-2px);
}`,
	};

	const features = [
		{
			title: "语法高亮",
			description: "支持 100+ 编程语言的语法高亮",
			icon: "🎨",
		},
		{
			title: "智能代码补全",
			description: "基于语言服务的智能提示和自动补全",
			icon: "✨",
		},
		{
			title: "错误检查",
			description: "实时的语法和类型错误检查",
			icon: "🔍",
		},
		{
			title: "代码折叠",
			description: "支持函数、类、条件块的折叠",
			icon: "📁",
		},
		{
			title: "多光标编辑",
			description: "同时编辑多个位置，提高效率",
			icon: "👆",
		},
		{
			title: "搜索和替换",
			description: "强大的正则表达式搜索替换功能",
			icon: "🔎",
		},
		{
			title: "代码格式化",
			description: "一键格式化代码，保持代码风格一致",
			icon: "🧹",
		},
		{
			title: "主题切换",
			description: "多种内置主题，支持自定义主题",
			icon: "🎭",
		},
	];

	const configurations = [
		{
			title: "基础配置",
			code: `options={{
  fontSize: 14,
  lineNumbers: 'on',
  minimap: { enabled: true },
  scrollBeyondLastLine: false,
  automaticLayout: true,
}}`,
		},
		{
			title: "主题配置",
			code: `options={{
  theme: 'vs-dark', // vs, vs-dark, hc-black
  // 或使用自定义主题
  // theme: {
  //   base: 'vs-dark',
  //   inherit: true,
  //   rules: [{ token: 'comment', foreground: 'ffa500' }]
  // }
}}`,
		},
		{
			title: "语言配置",
			code: `// 支持 100+ 种语言
languages={[
  'typescript', 'javascript', 'python', 'java', 'csharp',
  'html', 'css', 'json', 'markdown', 'sql', 'go', 'rust'
]}

// 自定义语言配置
monaco.languages.setLanguageConfiguration('typescript', {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/']
  }
});`,
		},
		{
			title: "高级配置",
			code: `options={{
  readOnly: false,
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: 'on',
  tabCompletion: 'on',
  wordBasedSuggestions: true,
  parameterHints: { enabled: true },
  hover: { enabled: true },
  quickSuggestions: { other: true, comments: true, strings: true }
}}`,
		},
	];

	return (
		<Layout>
			<div className="container mx-auto p-6">
				<h1 className="mb-6 font-bold text-3xl">Monaco Editor 编辑器概览</h1>

				<div className="mb-8">
					<p className="text-gray-600 text-lg">Monaco Editor 是 VS Code 使用的代码编辑器，提供强大的代码编辑功能。</p>
				</div>

				{/* Tab Navigation */}
				<div className="mb-6 border-gray-200 border-b">
					<nav className="flex space-x-8">
						{[
							{ id: "demo", label: "编辑器演示", icon: "💻" },
							{ id: "features", label: "功能特性", icon: "✨" },
							{ id: "configuration", label: "配置选项", icon: "⚙️" },
						].map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center gap-2 border-b-2 px-1 py-4 font-medium text-sm transition-colors ${
									activeTab === tab.id
										? "border-blue-500 text-blue-600"
										: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
								}`}
							>
								<span>{tab.icon}</span>
								{tab.label}
							</button>
						))}
					</nav>
				</div>

				{/* Demo Tab */}
				{activeTab === "demo" && (
					<div className="space-y-6">
						<div className="flex flex-wrap gap-4">
							<div className="flex items-center gap-2">
								<label className="font-medium text-sm">语言:</label>
								<select
									value={language}
									onChange={(e) => {
										const lang = e.target.value as keyof typeof exampleCodes;
										setLanguage(lang);
										setCode(exampleCodes[lang]);
									}}
									className="rounded border border-gray-300 px-3 py-1 text-sm"
								>
									<option value="typescript">TypeScript</option>
									<option value="javascript">JavaScript</option>
									<option value="python">Python</option>
									<option value="html">HTML</option>
									<option value="css">CSS</option>
								</select>
							</div>

							<div className="flex items-center gap-2">
								<label className="font-medium text-sm">主题:</label>
								<button
									onClick={() => setTheme(theme === "light" ? "dark" : "light")}
									className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
								>
									{theme === "light" ? "🌙 暗色" : "☀️ 亮色"}
								</button>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							<div className="space-y-4">
								<h2 className="font-semibold text-xl">编辑器</h2>
								<div className="rounded-lg border-2 border-gray-300">
									<MonacoEditor
										height="500px"
										language={language}
										theme={theme}
										value={code}
										onChange={setCode}
										options={{
											minimap: { enabled: true },
											fontSize: 14,
											scrollBeyondLastLine: false,
											automaticLayout: true,
										}}
									/>
								</div>
							</div>

							<div className="space-y-4">
								<h2 className="font-semibold text-xl">预览</h2>
								<div className="h-[500px] rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
									<pre className="h-full overflow-auto whitespace-pre-wrap font-mono text-sm">
										<code>{code}</code>
									</pre>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Features Tab */}
				{activeTab === "features" && (
					<div className="space-y-6">
						<h2 className="font-semibold text-2xl">功能特性</h2>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
							{features.map((feature, index) => (
								<div key={index} className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-lg">
									<div className="mb-4 text-3xl">{feature.icon}</div>
									<h3 className="mb-2 font-semibold text-lg">{feature.title}</h3>
									<p className="text-gray-600 text-sm">{feature.description}</p>
								</div>
							))}
						</div>

						<div className="rounded-lg bg-blue-50 p-6">
							<h3 className="mb-4 font-semibold text-xl">快速开始</h3>
							<div className="mb-4">
								<p className="mb-2 text-gray-600 text-sm">安装依赖：</p>
								<code className="block rounded bg-white px-3 py-2 text-sm">
									npm install @monaco-editor/react monaco-editor
								</code>
							</div>
							<div>
								<p className="mb-2 text-gray-600 text-sm">基础使用：</p>
								<code className="block rounded bg-white px-3 py-2 text-sm">
									{`import MonacoEditor from "@monaco-editor/react";

<MonacoEditor
  height="400px"
  language="typescript"
  theme="light"
  value={code}
  onChange={setCode}
  options={{
    minimap: { enabled: false },
    fontSize: 16,
  }}
/>`}
								</code>
							</div>
						</div>
					</div>
				)}

				{/* Configuration Tab */}
				{activeTab === "configuration" && (
					<div className="space-y-6">
						<h2 className="font-semibold text-2xl">配置选项</h2>

						<div className="space-y-8">
							{configurations.map((config, index) => (
								<div key={index} className="rounded-lg border border-gray-200 p-6">
									<h3 className="mb-4 font-semibold text-lg">{config.title}</h3>
									<div className="rounded-lg bg-gray-50 p-4">
										<pre className="overflow-auto font-mono text-sm">
											<code>{config.code}</code>
										</pre>
									</div>
								</div>
							))}
						</div>

						<div className="rounded-lg bg-orange-50 p-6">
							<h3 className="mb-2 font-semibold">💡 配置建议</h3>
							<ul className="ml-4 space-y-1 text-gray-600 text-sm">
								<li>• 根据使用场景选择合适的配置选项</li>
								<li>• 禁用不需要的功能以提高性能</li>
								<li>• 使用 automaticLayout 自动调整编辑器大小</li>
								<li>• 为移动端用户配置较大的字体大小</li>
								<li>• 考虑使用主题变量保持品牌一致性</li>
							</ul>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}

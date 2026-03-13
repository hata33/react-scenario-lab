"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import MonacoEditor from "@/components/MonacoEditor";

export default function MonacoEditorPage() {
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

	return (
		<Layout>
			<div className="container mx-auto p-6">
				<h1 className="mb-6 font-bold text-3xl">Monaco Editor 示例</h1>

				<div className="mb-6">
					<p className="text-gray-600">Monaco Editor 是 VS Code 使用的代码编辑器，提供智能代码补全、语法高亮等功能。</p>
				</div>

				<div className="mb-6 flex flex-wrap gap-4">
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

				<div className="mt-8 space-y-6">
					<div>
						<h3 className="mb-3 font-semibold text-lg">主要特性</h3>
						<ul className="list-inside list-disc space-y-2 text-gray-600">
							<li>语法高亮 - 支持100+编程语言</li>
							<li>智能代码补全 - 基于语言服务的智能提示</li>
							<li>错误检查 - 实时语法和类型错误检查</li>
							<li>代码折叠 - 支持函数、类、条件块折叠</li>
							<li>多光标编辑 - 同时编辑多个位置</li>
							<li>搜索和替换 - 强大的正则表达式支持</li>
							<li>代码格式化 - 一键格式化代码</li>
							<li>主题切换 - 多种内置主题</li>
						</ul>
					</div>

					<div>
						<h3 className="mb-3 font-semibold text-lg">集成示例</h3>
						<div className="rounded-lg bg-gray-50 p-4">
							<code className="text-sm">
								{`import MonacoEditor from "@/components/MonacoEditor";

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
			</div>
		</Layout>
	);
}

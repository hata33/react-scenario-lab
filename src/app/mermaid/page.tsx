"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import MermaidChart from "@/components/MermaidChart";

export default function MermaidPage() {
	const [selectedChart, setSelectedChart] = useState("flowchart");
	const [selectedExample, setSelectedExample] = useState("basic");

	const chartExamples = {
		flowchart: {
			title: "流程图",
			icon: "🔄",
			examples: {
				basic: {
					title: "基础流程图",
					code: `flowchart TD
    A[开始] --> B{是否有数据?}
    B -->|是| C[处理数据]
    B -->|否| D[获取数据]
    C --> E[展示结果]
    D --> C
    E --> F[结束]`,
				},
				decision: {
					title: "复杂决策流程",
					code: `flowchart TD
    Start([开始]) --> Input{输入用户名}
    Input -->|合法| Validate{验证用户}
    Input -->|不合法| Error[显示错误]
    Validate -->|存在| Auth[验证通过]
    Validate -->|不存在| Register[注册流程]
    Auth --> Dashboard[进入控制台]
    Register --> Auth
    Error --> Input
    Dashboard --> End([结束])`,
				},
			},
		},
		sequence: {
			title: "时序图",
			icon: "⏱️",
			examples: {
				webapp: {
					title: "Web 应用交互",
					code: `sequenceDiagram
    participant User as 用户
    participant Browser as 浏览器
    participant Server as 服务器
    participant Database as 数据库

    User->>+Browser: 访问登录页面
    Browser-->>-User: 显示登录表单
    User->>+Browser: 提交用户名密码
    Browser->>+Server: POST /api/login
    Server->>+Database: 查询用户信息
    Database-->>-Server: 返回用户数据
    Server-->>-Browser: 返回 JWT Token
    Browser-->>-User: 登录成功，跳转首页`,
				},
				microservice: {
					title: "微服务架构交互",
					code: `sequenceDiagram
    participant Client as 客户端
    participant Gateway as API 网关
    participant Auth as 认证服务
    participant User as 用户服务
    participant Order as 订单服务
    participant Payment as 支付服务

    Client->>+Gateway: 创建订单请求
    Gateway->>+Auth: 验证 Token
    Auth-->>-Gateway: 返回用户信息
    Gateway->>+Order: 创建订单
    Order-->>-Gateway: 返回订单信息
    Gateway->>+Payment: 处理支付
    Payment-->>-Gateway: 支付成功
    Gateway-->>-Client: 返回订单结果`,
				},
			},
		},
		gantt: {
			title: "甘特图",
			icon: "📅",
			examples: {
				software: {
					title: "软件开发项目",
					code: `gantt
    title 软件开发项目时间线
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d
    section 需求分析
    需求收集           :done, req1, 2024-01-01, 5d
    需求评审           :done, req2, after req1, 2d
    需求文档           :active, req3, after req2, 3d
    section 设计阶段
    系统设计           :design1, after req3, 5d
    UI/UX设计          :design2, after req3, 7d
    section 开发阶段
    后端开发           :dev1, after design1, 14d
    前端开发           :dev2, after design2, 10d`,
				},
				marketing: {
					title: "营销活动计划",
					code: `gantt
    title 产品营销活动计划
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d
    section 准备阶段
    市场调研           :research, 2024-02-01, 7d
    竞品分析           :analysis, after research, 5d
    营销策略制定        :strategy, after analysis, 3d
    section 内容创作
    文案撰写           :copy, after strategy, 5d
    视觉设计           :design, after strategy, 7d
    section 推广执行
    社交媒体预热        :social, after design, 3d
    邮件营销           :email, after social, 14d`,
				},
			},
		},
		classDiagram: {
			title: "类图",
			icon: "📋",
			examples: {
				basic: {
					title: "基础类图",
					code: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
        +eat()
    }

    class Dog {
        +String breed
        +bark()
        +wagTail()
    }

    class Cat {
        +Boolean isIndoor
        +meow()
        +scratch()
    }

    Animal <|-- Dog
    Animal <|-- Cat

    class Person {
        -String name
        -int age
        -Dog[] pets
        +getName()
        +addPet(Dog pet)
    }

    Person "1" -- "*" Dog : owns`,
				},
				ecommerce: {
					title: "电商系统类图",
					code: `classDiagram
    class User {
        +int id
        +String username
        +String email
        +register()
        +login()
    }

    class Product {
        +int id
        +String name
        +float price
        +int stock
        +updateStock(int amount)
    }

    class Order {
        +int id
        +Date createdDate
        +String status
        +float totalAmount
        +addItem(Product product, int quantity)
    }

    class Payment {
        +String method
        +float amount
        +processPayment()
    }

    User "1" -- "*" Order : places
    Order "1" -- "*" Product : contains
    Order "1" -- "1" Payment : pays`,
				},
			},
		},
	};

	const currentChart = chartExamples[selectedChart as keyof typeof chartExamples];
	const currentExample: any = currentChart.examples[selectedExample as keyof typeof currentChart.examples];

	return (
		<Layout>
			<div className="container mx-auto p-6">
				<h1 className="mb-6 font-bold text-3xl">Mermaid 图表集合</h1>

				<div className="mb-6">
					<p className="text-gray-600 text-lg">
						Mermaid 是一个基于 JavaScript 的图表绘制工具，可以通过简单的文本语法创建各种类型的图表。
					</p>
				</div>

				{/* 图表类型选择 */}
				<div className="mb-6">
					<h2 className="mb-3 font-semibold text-xl">选择图表类型</h2>
					<div className="flex flex-wrap gap-3">
						{Object.entries(chartExamples).map(([key, chart]) => (
							<button
								key={key}
								onClick={() => {
									setSelectedChart(key);
									const firstExample = Object.keys(chart.examples)[0];
									setSelectedExample(firstExample);
								}}
								className={`flex items-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${
									selectedChart === key ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								<span className="text-xl">{chart.icon}</span>
								{chart.title}
							</button>
						))}
					</div>
				</div>

				{/* 具体示例选择 */}
				<div className="mb-6">
					<h3 className="mb-3 font-semibold text-lg">选择示例</h3>
					<div className="flex flex-wrap gap-2">
						{Object.entries(currentChart.examples).map(([key, example]) => (
							<button
								key={key}
								onClick={() => setSelectedExample(key)}
								className={`rounded-lg px-4 py-2 font-medium transition-colors ${
									selectedExample === key ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								{example.title}
							</button>
						))}
					</div>
				</div>

				{/* 图表展示区域 */}
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<div className="space-y-4">
						<h2 className="font-semibold text-xl">Mermaid 代码</h2>
						<div className="h-96 rounded-lg border-2 border-gray-300 bg-gray-50 p-4">
							<pre className="h-full overflow-auto font-mono text-sm">
								<code>{currentExample.code}</code>
							</pre>
						</div>
					</div>

					<div className="space-y-4">
						<h2 className="font-semibold text-xl">图表预览</h2>
						<div className="min-h-96 rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
							<MermaidChart
								key={`${selectedChart}-${selectedExample}`}
								chart={currentExample.code}
								config={{
									theme: "default",
									themeVariables: {
										primaryColor: "#3b82f6",
										primaryTextColor: "#1f2937",
										primaryBorderColor: "#2563eb",
										lineColor: "#6b7280",
									},
								}}
								onError={(error) => console.error("Chart error:", error)}
							/>
						</div>
					</div>
				</div>

				{/* 语法说明 */}
				<div className="mt-8 space-y-6">
					<div>
						<h3 className="mb-3 font-semibold text-lg">快速开始</h3>
						<div className="rounded-lg bg-blue-50 p-4">
							<h4 className="mb-2 font-medium">安装依赖</h4>
							<code className="block rounded bg-white px-3 py-2 text-sm">npm install mermaid</code>
						</div>
					</div>

					<div>
						<h3 className="mb-3 font-semibold text-lg">支持的图表类型</h3>
						<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
							{Object.values(chartExamples).map((chart) => (
								<div key={chart.title} className="rounded-lg bg-gray-50 p-4 text-center">
									<div className="mb-2 text-2xl">{chart.icon}</div>
									<div className="font-medium text-sm">{chart.title}</div>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-lg bg-orange-50 p-4">
						<h3 className="mb-2 font-semibold">💡 使用建议</h3>
						<ul className="ml-4 space-y-1 text-gray-600 text-sm">
							<li>• 使用有意义的节点名称和描述</li>
							<li>• 保持图表简洁，避免过于复杂的结构</li>
							<li>• 为复杂图表添加适当的注释</li>
							<li>• 使用颜色区分不同类型的节点或状态</li>
							<li>• 根据场景选择合适的图表类型</li>
						</ul>
					</div>
				</div>
			</div>
		</Layout>
	);
}

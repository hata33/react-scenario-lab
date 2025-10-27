"use client";

import { useCallback, useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import Layout from "@/components/Layout";

interface Breadcrumb {
	id: string;
	timestamp: number;
	message: string;
	category: string;
	level: "info" | "warning" | "error" | "debug";
	data?: any;
}

interface UserAction {
	id: string;
	action: string;
	target: string;
	timestamp: number;
	data?: any;
}

export default function BreadcrumbsPage() {
	const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
	const [userActions, setUserActions] = useState<UserAction[]>([]);
	const [isTracking, setIsTracking] = useState(false);
	const [consoleMessages, setConsoleMessages] = useState<string[]>([]);
	const [customData, setCustomData] = useState({});

	const addBreadcrumb = useCallback(
		(message: string, category: string, level: Breadcrumb["level"] = "info", data?: any) => {
			const breadcrumb: Breadcrumb = {
				id: Math.random().toString(36).substr(2, 9),
				timestamp: Date.now(),
				message,
				category,
				level,
				data,
			};

			setBreadcrumbs((prev) => [breadcrumb, ...prev].slice(0, 50));
			console.log(`[Breadcrumb] ${category}: ${message}`, data);
		},
		[],
	);

	const addUserAction = useCallback(
		(action: string, target: string, data?: any) => {
			const userAction: UserAction = {
				id: Math.random().toString(36).substr(2, 9),
				action,
				target,
				timestamp: Date.now(),
				data,
			};

			setUserActions((prev) => [userAction, ...prev].slice(0, 20));
			addBreadcrumb(`用户 ${action}: ${target}`, "user", "info", data);
		},
		[addBreadcrumb],
	);

	// 模拟导航
	const simulateNavigation = (path: string) => {
		addBreadcrumb(`导航到 ${path}`, "navigation", "info", { from: window.location.pathname, to: path });
	};

	// 模拟用户交互
	const simulateClick = (element: string, data?: any) => {
		addUserAction("点击", element, data);
	};

	// 模拟表单提交
	const simulateFormSubmit = (formData: any) => {
		addBreadcrumb("表单提交", "form", "info", { formData });
	};

	// 模拟 API 调用
	const simulateApiCall = async (endpoint: string, shouldError = false) => {
		addBreadcrumb(`API 调用开始: ${endpoint}`, "http", "info", { method: "GET" });

		try {
			if (shouldError) {
				throw new Error(`API 调用失败: ${endpoint}`);
			}

			// 模拟网络延迟
			await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500));

			addBreadcrumb(`API 调用成功: ${endpoint}`, "http", "info", {
				status: 200,
				duration: Math.floor(Math.random() * 1000 + 500),
			});

			return { success: true, data: { message: "模拟数据" } };
		} catch (error) {
			addBreadcrumb(`API 调用失败: ${endpoint}`, "http", "error", {
				error: error instanceof Error ? error.message : "未知错误",
			});
			throw error;
		}
	};

	// 模拟控制台消息
	const simulateConsoleMessage = (level: "log" | "warn" | "error", message: string) => {
		const timestamp = new Date().toLocaleTimeString();
		const formattedMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;

		setConsoleMessages((prev) => [formattedMessage, ...prev].slice(0, 10));

		switch (level) {
			case "log":
				console.log(message);
				addBreadcrumb(message, "console", "debug");
				break;
			case "warn":
				console.warn(message);
				addBreadcrumb(message, "console", "warning");
				break;
			case "error":
				console.error(message);
				addBreadcrumb(message, "console", "error");
				break;
		}
	};

	// 模拟用户体验操作
	const simulateUserJourney = async () => {
		addBreadcrumb("用户旅程开始", "user", "info", { journey: "demo" });

		// 1. 用户访问页面
		simulateNavigation("/products");
		await new Promise((resolve) => setTimeout(resolve, 500));

		// 2. 点击产品分类
		simulateClick("分类按钮", { category: "electronics" });
		await new Promise((resolve) => setTimeout(resolve, 300));

		// 3. 搜索产品
		simulateClick("搜索框", { query: "iPhone" });
		addBreadcrumb("搜索产品", "search", "info", { query: "iPhone", results: 15 });
		await new Promise((resolve) => setTimeout(resolve, 500));

		// 4. 查看产品详情
		simulateClick("产品链接", { productId: "123", name: "iPhone 15" });
		simulateNavigation("/products/123");
		await new Promise((resolve) => setTimeout(resolve, 500));

		// 5. 添加到购物车
		simulateClick("添加到购物车", { productId: "123", quantity: 1 });
		addBreadcrumb("添加到购物车", "cart", "info", { productId: "123", quantity: 1 });
		await new Promise((resolve) => setTimeout(resolve, 300));

		// 6. 查看购物车
		simulateClick("购物车图标");
		simulateNavigation("/cart");
		await new Promise((resolve) => setTimeout(resolve, 500));

		// 7. 开始结账
		simulateClick("结账按钮");
		simulateNavigation("/checkout");
		await new Promise((resolve) => setTimeout(resolve, 500));

		// 8. 填写表单
		simulateFormSubmit({
			email: "user@example.com",
			address: "北京市朝阳区xxx街道",
			payment: "credit_card",
		});

		addBreadcrumb("用户旅程完成", "user", "info", { journey: "demo", status: "completed" });
	};

	// 开始/停止追踪
	const toggleTracking = () => {
		if (isTracking) {
			setIsTracking(false);
			addBreadcrumb("面包屑追踪已停止", "system", "warning");
		} else {
			setIsTracking(true);
			addBreadcrumb("面包屑追踪已启动", "system", "info");
		}
	};

	// 清空追踪数据
	const clearTracking = () => {
		setBreadcrumbs([]);
		setUserActions([]);
		setConsoleMessages([]);
		setCustomData({});
		addBreadcrumb("追踪数据已清空", "system", "info");
	};

	// 添加自定义面包屑
	const addCustomBreadcrumb = () => {
		const message = (document.getElementById("custom-message") as HTMLInputElement)?.value || "";
		const category = (document.getElementById("custom-category") as HTMLInputElement)?.value || "custom";

		if (message) {
			addBreadcrumb(message, category, "info", customData);
			(document.getElementById("custom-message") as HTMLInputElement).value = "";
			setCustomData({});
		}
	};

	// 自动追踪用户交互
	useEffect(() => {
		if (!isTracking) return;

		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const element = target.tagName.toLowerCase();
			const className = target.className;
			const id = target.id;

			let targetInfo = element;
			if (id) targetInfo += `#${id}`;
			if (className) targetInfo += `.${className.split(" ").join(".")}`;

			addUserAction("点击", targetInfo, {
				coordinates: { x: event.clientX, y: event.clientY },
				timestamp: Date.now(),
			});
		};

		const handleNavigation = () => {
			addBreadcrumb("页面导航", "navigation", "info", {
				url: window.location.href,
				referrer: document.referrer,
			});
		};

		document.addEventListener("click", handleClick);
		window.addEventListener("popstate", handleNavigation);

		return () => {
			document.removeEventListener("click", handleClick);
			window.removeEventListener("popstate", handleNavigation);
		};
	}, [isTracking, addUserAction, addBreadcrumb]);

	return (
		<Layout>
			<div className="space-y-6">
				{/* 标题和返回按钮 */}
				<div className="rounded-lg border bg-white p-6">
					<div className="mb-4 flex items-center gap-4">
						<BackButton text="返回 Sentry" />
						<h1 className="font-bold text-2xl text-gray-900">🍞 面包屑追踪</h1>
					</div>
					<p className="text-gray-600">
						面包屑追踪记录用户在应用中的操作路径，帮助开发者重现错误发生时的用户行为。 Sentry
						自动收集用户交互、导航、网络请求等事件，构建完整的用户行为时间线。
					</p>
				</div>

				{/* 追踪控制 */}
				<div className="rounded-lg border bg-white p-6">
					<h2 className="mb-4 font-semibold text-xl">🎛️ 追踪控制</h2>
					<div className="flex flex-wrap gap-3">
						<button
							onClick={toggleTracking}
							className={`rounded px-4 py-2 text-white ${isTracking ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
						>
							{isTracking ? "停止追踪" : "开始追踪"}
						</button>

						<button onClick={clearTracking} className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
							清空数据
						</button>

						<button
							onClick={simulateUserJourney}
							className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
						>
							模拟用户旅程
						</button>
					</div>

					<div className="mt-4 rounded border border-blue-200 bg-blue-50 p-3">
						<p className="text-blue-800 text-sm">{isTracking ? "🟢 正在追踪用户交互..." : "🔴 追踪已停止"}</p>
					</div>
				</div>

				{/* 模拟操作 */}
				<div className="rounded-lg border bg-white p-6">
					<h2 className="mb-4 font-semibold text-xl">🎭 模拟操作</h2>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{/* 导航模拟 */}
						<div className="rounded-lg border p-4">
							<h3 className="mb-3 font-semibold">导航操作</h3>
							<div className="space-y-2">
								<button
									onClick={() => simulateNavigation("/home")}
									className="w-full rounded bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
								>
									访问首页
								</button>
								<button
									onClick={() => simulateNavigation("/products")}
									className="w-full rounded bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
								>
									访问产品页
								</button>
								<button
									onClick={() => simulateNavigation("/profile")}
									className="w-full rounded bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
								>
									访问个人资料
								</button>
							</div>
						</div>

						{/* 交互模拟 */}
						<div className="rounded-lg border p-4">
							<h3 className="mb-3 font-semibold">用户交互</h3>
							<div className="space-y-2">
								<button
									onClick={() => simulateClick("登录按钮")}
									className="w-full rounded bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600"
								>
									点击登录
								</button>
								<button
									onClick={() => simulateClick("搜索按钮")}
									className="w-full rounded bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600"
								>
									点击搜索
								</button>
								<button
									onClick={() => simulateClick("购买按钮", { productId: "123", price: 99 })}
									className="w-full rounded bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600"
								>
									点击购买
								</button>
							</div>
						</div>

						{/* API 模拟 */}
						<div className="rounded-lg border p-4">
							<h3 className="mb-3 font-semibold">API 调用</h3>
							<div className="space-y-2">
								<button
									onClick={() => simulateApiCall("/api/user")}
									className="w-full rounded bg-indigo-500 px-3 py-2 text-sm text-white hover:bg-indigo-600"
								>
									获取用户信息
								</button>
								<button
									onClick={() => simulateApiCall("/api/products")}
									className="w-full rounded bg-indigo-500 px-3 py-2 text-sm text-white hover:bg-indigo-600"
								>
									获取产品列表
								</button>
								<button
									onClick={() => simulateApiCall("/api/error", true)}
									className="w-full rounded bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
								>
									模拟 API 错误
								</button>
							</div>
						</div>

						{/* 控制台模拟 */}
						<div className="rounded-lg border p-4">
							<h3 className="mb-3 font-semibold">控制台消息</h3>
							<div className="space-y-2">
								<button
									onClick={() => simulateConsoleMessage("log", "这是一条普通日志")}
									className="w-full rounded bg-gray-500 px-3 py-2 text-sm text-white hover:bg-gray-600"
								>
									普通日志
								</button>
								<button
									onClick={() => simulateConsoleMessage("warn", "这是一条警告消息")}
									className="w-full rounded bg-yellow-500 px-3 py-2 text-sm text-white hover:bg-yellow-600"
								>
									警告消息
								</button>
								<button
									onClick={() => simulateConsoleMessage("error", "这是一条错误消息")}
									className="w-full rounded bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
								>
									错误消息
								</button>
							</div>
						</div>

						{/* 表单模拟 */}
						<div className="rounded-lg border p-4">
							<h3 className="mb-3 font-semibold">表单操作</h3>
							<div className="space-y-2">
								<button
									onClick={() => simulateFormSubmit({ email: "test@example.com" })}
									className="w-full rounded bg-orange-500 px-3 py-2 text-sm text-white hover:bg-orange-600"
								>
									提交邮箱
								</button>
								<button
									onClick={() => simulateFormSubmit({ search: "iPhone", category: "electronics" })}
									className="w-full rounded bg-orange-500 px-3 py-2 text-sm text-white hover:bg-orange-600"
								>
									提交搜索
								</button>
								<button
									onClick={() => simulateFormSubmit({ feedback: "5 stars", rating: 5 })}
									className="w-full rounded bg-orange-500 px-3 py-2 text-sm text-white hover:bg-orange-600"
								>
									提交反馈
								</button>
							</div>
						</div>

						{/* 自定义面包屑 */}
						<div className="rounded-lg border p-4">
							<h3 className="mb-3 font-semibold">自定义面包屑</h3>
							<div className="space-y-2">
								<input
									id="custom-message"
									type="text"
									placeholder="消息内容"
									className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<input
									id="custom-category"
									type="text"
									placeholder="分类"
									className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<button
									onClick={addCustomBreadcrumb}
									className="w-full rounded bg-purple-500 px-3 py-2 text-sm text-white hover:bg-purple-600"
								>
									添加面包屑
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* 面包屑时间线 */}
				<div className="rounded-lg border bg-white p-6">
					<h2 className="mb-4 font-semibold text-xl">📅 面包屑时间线</h2>
					<div className="max-h-96 space-y-2 overflow-y-auto">
						{breadcrumbs.length === 0 ? (
							<p className="py-8 text-center text-gray-500 text-sm">暂无面包屑记录，请开始追踪或执行操作</p>
						) : (
							breadcrumbs.map((breadcrumb) => (
								<div
									key={breadcrumb.id}
									className={`flex items-start space-x-3 rounded-lg border p-3 ${
										breadcrumb.level === "error"
											? "border-red-200 bg-red-50"
											: breadcrumb.level === "warning"
												? "border-yellow-200 bg-yellow-50"
												: breadcrumb.level === "debug"
													? "border-gray-200 bg-gray-50"
													: "border-blue-200 bg-blue-50"
									}`}
								>
									<div className="flex-shrink-0">
										<span
											className={`inline-block h-2 w-2 rounded-full ${
												breadcrumb.level === "error"
													? "bg-red-500"
													: breadcrumb.level === "warning"
														? "bg-yellow-500"
														: breadcrumb.level === "debug"
															? "bg-gray-500"
															: "bg-blue-500"
											}`}
										/>
									</div>
									<div className="min-w-0 flex-1">
										<div className="flex items-start justify-between">
											<div>
												<span className="font-medium text-gray-900">{breadcrumb.category}</span>
												<span className="mx-2 text-gray-400">•</span>
												<span className="text-gray-700">{breadcrumb.message}</span>
											</div>
											<span className="text-gray-500 text-xs">
												{new Date(breadcrumb.timestamp).toLocaleTimeString()}
											</span>
										</div>
										{breadcrumb.data && (
											<details className="mt-1">
												<summary className="cursor-pointer text-gray-600 text-xs">数据</summary>
												<pre className="mt-1 rounded border bg-white p-2 text-gray-600 text-xs">
													{JSON.stringify(breadcrumb.data, null, 2)}
												</pre>
											</details>
										)}
									</div>
								</div>
							))
						)}
					</div>
				</div>

				{/* 用户操作记录 */}
				<div className="rounded-lg border bg-white p-6">
					<h2 className="mb-4 font-semibold text-xl">👆 用户操作记录</h2>
					<div className="max-h-64 space-y-2 overflow-y-auto">
						{userActions.length === 0 ? (
							<p className="py-4 text-center text-gray-500 text-sm">暂无用户操作记录</p>
						) : (
							userActions.map((action) => (
								<div key={action.id} className="flex items-center justify-between rounded bg-green-50 p-2">
									<span className="text-green-800 text-sm">
										{action.action}: {action.target}
									</span>
									<span className="text-green-600 text-xs">{new Date(action.timestamp).toLocaleTimeString()}</span>
								</div>
							))
						)}
					</div>
				</div>

				{/* 控制台消息 */}
				<div className="rounded-lg border bg-white p-6">
					<h2 className="mb-4 font-semibold text-xl">💻 控制台消息</h2>
					<div className="max-h-48 space-y-1 overflow-y-auto rounded bg-black p-4 font-mono text-green-400 text-sm">
						{consoleMessages.length === 0 ? (
							<p className="text-gray-500">暂无控制台消息</p>
						) : (
							consoleMessages.map((message, index) => <div key={index}>{message}</div>)
						)}
					</div>
				</div>

				{/* 面包屑最佳实践 */}
				<div className="rounded-lg border bg-white p-6">
					<h2 className="mb-4 font-semibold text-xl">💡 面包屑最佳实践</h2>
					<div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
						<div>
							<h3 className="mb-2 font-semibold text-gray-900">✅ 推荐做法</h3>
							<ul className="list-inside list-disc space-y-1 text-gray-600">
								<li>记录关键用户操作和导航</li>
								<li>包含有意义的上下文数据</li>
								<li>设置适当的日志级别</li>
								<li>避免记录敏感信息</li>
								<li>定期清理过多的面包屑</li>
							</ul>
						</div>

						<div>
							<h3 className="mb-2 font-semibold text-gray-900">❌ 避免做法</h3>
							<ul className="list-inside list-disc space-y-1 text-gray-600">
								<li>不要记录过多的无关事件</li>
								<li>避免记录密码、令牌等敏感数据</li>
								<li>不要在高频事件中添加面包屑</li>
								<li>避免在面包屑中存储大数据</li>
							</ul>
						</div>
					</div>

					<div className="mt-4 rounded border border-yellow-200 bg-yellow-50 p-3">
						<p className="text-sm text-yellow-800">
							<strong>Sentry 提示:</strong> 面包屑会自动包含在错误报告中，帮助重现错误发生时的用户操作路径。
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}

"use client";

import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";

export default function ActivityAPIPage() {
	return (
		<Layout>
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8">
						<h1 className="mb-4 font-bold text-4xl text-gray-900 dark:text-white">Activity API - React 19 新特性</h1>
						<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
							<h2 className="mb-4 font-semibold text-2xl text-gray-800 dark:text-white">🔄 3W 法则解析</h2>
							<div className="grid gap-6 md:grid-cols-3">
								<div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
									<h3 className="mb-2 font-bold text-emerald-800 text-lg dark:text-emerald-300">What - 它是什么？</h3>
									<p className="text-gray-700 dark:text-gray-300">
										Activity API 是 React 19
										中用于保持组件状态和活动状态的新机制，允许在组件挂起、卸载或重新挂载时保持状态连续性。
									</p>
								</div>
								<div className="rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
									<h3 className="mb-2 font-bold text-lg text-teal-800 dark:text-teal-300">Why - 为什么需要？</h3>
									<p className="text-gray-700 dark:text-gray-300">
										解决传统组件状态丢失、表单数据重置、滚动位置丢失、用户操作中断等问题，提供更流畅的用户体验。
									</p>
								</div>
								<div className="rounded-lg bg-cyan-50 p-4 dark:bg-cyan-900/20">
									<h3 className="mb-2 font-bold text-cyan-800 text-lg dark:text-cyan-300">When - 何时使用？</h3>
									<p className="text-gray-700 dark:text-gray-300">
										表单状态保持、页面切换状态保留、多步骤流程、长时间操作保持等需要状态连续性的场景。
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Activity API 基础演示 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">Activity API 基础功能</h2>
						<div className="grid gap-6 lg:grid-cols-2">
							<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
								<h3 className="mb-4 font-semibold text-red-600 text-xl dark:text-red-400">🚫 传统状态管理的问题</h3>
								<div className="space-y-4">
									<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
										<p className="mb-2 text-gray-600 text-sm dark:text-gray-300">传统组件状态问题：</p>
										<ul className="space-y-2 text-gray-700 text-sm dark:text-gray-300">
											<li>• 组件卸载时状态丢失</li>
											<li>• 表单数据需要手动保存</li>
											<li>• 页面切换状态重置</li>
											<li>• 用户操作中断无法恢复</li>
										</ul>
									</div>
									<div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
										<p className="font-medium text-red-800 text-sm dark:text-red-300">❌ 常见问题：</p>
										<ul className="mt-2 text-red-700 text-sm dark:text-red-400">
											<li>• 表单填写到一半被中断</li>
											<li>• 滚动位置跳回顶部</li>
											<li>• 搜索条件需要重新输入</li>
											<li>• 购物车状态意外清空</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
								<h3 className="mb-4 font-semibold text-green-600 text-xl dark:text-green-400">
									✅ Activity API 的优势
								</h3>
								<div className="space-y-4">
									<ActivityBasicDemo />
								</div>
							</div>
						</div>
					</div>

					{/* 表单状态保持演示 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">表单状态保持</h2>
						<FormPersistenceDemo />
					</div>

					{/* 页面状态保持演示 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">页面状态保持</h2>
						<PageStateDemo />
					</div>

					{/* 复杂状态管理演示 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">复杂状态管理</h2>
						<ComplexStateDemo />
					</div>

					{/* 最佳实践 */}
					<div className="mb-8">
						<h2 className="mb-6 font-bold text-3xl text-gray-900 dark:text-white">Activity API 最佳实践</h2>
						<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h3 className="mb-4 font-semibold text-green-600 text-xl dark:text-green-400">✅ 推荐做法</h3>
									<ul className="space-y-3">
										<li className="flex items-start">
											<span className="mr-2 text-green-500">✓</span>
											<span className="text-gray-700 dark:text-gray-300">合理设置活动状态标识</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-green-500">✓</span>
											<span className="text-gray-700 dark:text-gray-300">区分临时状态和持久状态</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-green-500">✓</span>
											<span className="text-gray-700 dark:text-gray-300">提供状态重置机制</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-green-500">✓</span>
											<span className="text-gray-700 dark:text-gray-300">监控状态生命周期</span>
										</li>
									</ul>
								</div>
								<div>
									<h3 className="mb-4 font-semibold text-red-600 text-xl dark:text-red-400">❌ 避免做法</h3>
									<ul className="space-y-3">
										<li className="flex items-start">
											<span className="mr-2 text-red-500">✗</span>
											<span className="text-gray-700 dark:text-gray-300">保持过多不必要的状态</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-red-500">✗</span>
											<span className="text-gray-700 dark:text-gray-300">忽略内存泄漏风险</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-red-500">✗</span>
											<span className="text-gray-700 dark:text-gray-300">状态结构过于复杂</span>
										</li>
										<li className="flex items-start">
											<span className="mr-2 text-red-500">✗</span>
											<span className="text-gray-700 dark:text-gray-300">缺乏状态清理机制</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

// Activity API 基础演示组件
function ActivityBasicDemo() {
	const [isActive, setIsActive] = useState(false);
	const [componentState, setComponentState] = useState({
		counter: 0,
		message: "",
		timestamp: Date.now(),
	});

	// 模拟 React 19 的 Activity API
	const saveActivityState = () => {
		sessionStorage.setItem("activity-demo-state", JSON.stringify(componentState));
	};

	const restoreActivityState = () => {
		const savedState = sessionStorage.getItem("activity-demo-state");
		if (savedState) {
			setComponentState(JSON.parse(savedState));
		}
	};

	const clearActivityState = () => {
		sessionStorage.removeItem("activity-demo-state");
		setComponentState({
			counter: 0,
			message: "",
			timestamp: Date.now(),
		});
	};

	useEffect(() => {
		if (isActive) {
			saveActivityState();
		}
	}, [componentState, isActive]);

	return (
		<div className="space-y-4">
			<div className="flex gap-4">
				<button
					onClick={() => setIsActive(!isActive)}
					className={`rounded-lg px-4 py-2 transition-colors ${
						isActive ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-gray-600 text-white hover:bg-gray-700"
					}`}
				>
					{isActive ? "活动状态" : "非活动状态"}
				</button>

				<button
					onClick={restoreActivityState}
					className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					恢复状态
				</button>

				<button
					onClick={clearActivityState}
					className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
				>
					清除状态
				</button>
			</div>

			<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
				<h4 className="mb-3 font-medium text-gray-800 dark:text-white">组件状态：</h4>
				<div className="space-y-2">
					<div className="flex justify-between">
						<span className="text-gray-600 text-sm dark:text-gray-400">计数器:</span>
						<span className="font-medium text-sm">{componentState.counter}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600 text-sm dark:text-gray-400">消息:</span>
						<span className="font-medium text-sm">{componentState.message || "无"}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600 text-sm dark:text-gray-400">时间戳:</span>
						<span className="font-medium text-sm">{new Date(componentState.timestamp).toLocaleTimeString()}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600 text-sm dark:text-gray-400">活动状态:</span>
						<span className={`font-medium text-sm ${isActive ? "text-green-600" : "text-gray-500"}`}>
							{isActive ? "活动中" : "暂停"}
						</span>
					</div>
				</div>
			</div>

			<div className="space-y-3">
				<div className="flex gap-2">
					<button
						onClick={() =>
							setComponentState((prev) => ({
								...prev,
								counter: prev.counter + 1,
								timestamp: Date.now(),
							}))
						}
						className="rounded bg-purple-600 px-3 py-1 text-sm text-white transition-colors hover:bg-purple-700"
					>
						增加计数
					</button>
					<input
						type="text"
						value={componentState.message}
						onChange={(e) =>
							setComponentState((prev) => ({
								...prev,
								message: e.target.value,
								timestamp: Date.now(),
							}))
						}
						placeholder="输入消息..."
						className="rounded border border-gray-300 bg-white px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
					/>
				</div>
			</div>

			<div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
				<p className="mb-2 font-medium text-emerald-800 text-sm dark:text-emerald-300">🎯 Activity API 的优势：</p>
				<ul className="space-y-1 text-emerald-700 text-sm dark:text-emerald-400">
					<li>• 状态自动保存和恢复</li>
					<li>• 组件生命周期管理</li>
					<li>• 用户操作不中断</li>
					<li>• 更好的用户体验</li>
				</ul>
			</div>
		</div>
	);
}

// 表单状态保持演示组件
function FormPersistenceDemo() {
	const [formActive, setFormActive] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		preferences: [] as string[],
		agreed: false,
	});

	// 模拟表单状态的 Activity API 保存和恢复
	const saveFormState = () => {
		if (formActive) {
			sessionStorage.setItem("form-demo-state", JSON.stringify(formData));
		}
	};

	const restoreFormState = () => {
		const savedFormState = sessionStorage.getItem("form-demo-state");
		if (savedFormState) {
			setFormData(JSON.parse(savedFormState));
		}
	};

	const clearFormState = () => {
		sessionStorage.removeItem("form-demo-state");
		setFormData({
			name: "",
			email: "",
			phone: "",
			address: "",
			preferences: [],
			agreed: false,
		});
	};

	useEffect(() => {
		saveFormState();
	}, [formData, formActive]);

	const togglePreference = (preference: string) => {
		setFormData((prev) => ({
			...prev,
			preferences: prev.preferences.includes(preference)
				? prev.preferences.filter((p) => p !== preference)
				: [...prev.preferences, preference],
		}));
	};

	const formProgress =
		Object.values(formData).filter(
			(value) => value !== "" && value !== false && (Array.isArray(value) ? value.length > 0 : true),
		).length / 6;

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
			<h3 className="mb-4 font-semibold text-gray-800 text-xl dark:text-white">📝 表单状态保持演示</h3>

			<div className="mb-6">
				<div className="mb-4 flex gap-4">
					<button
						onClick={() => setFormActive(!formActive)}
						className={`rounded-lg px-4 py-2 transition-colors ${
							formActive ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-gray-600 text-white hover:bg-gray-700"
						}`}
					>
						{formActive ? "表单活动" : "表单暂停"}
					</button>

					<button
						onClick={restoreFormState}
						className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
					>
						恢复表单
					</button>

					<button
						onClick={clearFormState}
						className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
					>
						重置表单
					</button>
				</div>

				<div className="mb-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
					<div className="flex items-center justify-between">
						<span className="font-medium text-gray-700 text-sm dark:text-gray-300">表单完成度:</span>
						<span className="font-bold text-emerald-600 text-sm dark:text-emerald-400">
							{Math.round(formProgress * 100)}%
						</span>
					</div>
					<div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
						<div
							className="h-2 rounded-full bg-emerald-600 transition-all duration-300"
							style={{ width: `${formProgress * 100}%` }}
						></div>
					</div>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<div>
					<h4 className="mb-3 font-medium text-gray-700 dark:text-gray-300">用户信息：</h4>
					<div className="space-y-3">
						<div>
							<label className="mb-1 block font-medium text-gray-600 text-sm dark:text-gray-400">姓名</label>
							<input
								type="text"
								value={formData.name}
								onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
								placeholder="请输入姓名"
							/>
						</div>

						<div>
							<label className="mb-1 block font-medium text-gray-600 text-sm dark:text-gray-400">邮箱</label>
							<input
								type="email"
								value={formData.email}
								onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
								placeholder="请输入邮箱"
							/>
						</div>

						<div>
							<label className="mb-1 block font-medium text-gray-600 text-sm dark:text-gray-400">电话</label>
							<input
								type="tel"
								value={formData.phone}
								onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
								placeholder="请输入电话"
							/>
						</div>
					</div>
				</div>

				<div>
					<h4 className="mb-3 font-medium text-gray-700 dark:text-gray-300">其他信息：</h4>
					<div className="space-y-3">
						<div>
							<label className="mb-1 block font-medium text-gray-600 text-sm dark:text-gray-400">地址</label>
							<textarea
								value={formData.address}
								onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
								placeholder="请输入地址"
								rows={3}
							/>
						</div>

						<div>
							<label className="mb-2 block font-medium text-gray-600 text-sm dark:text-gray-400">偏好设置</label>
							<div className="space-y-2">
								{["新闻资讯", "产品更新", "优惠活动", "技术分享"].map((preference) => (
									<label key={preference} className="flex items-center">
										<input
											type="checkbox"
											checked={formData.preferences.includes(preference)}
											onChange={() => togglePreference(preference)}
											className="mr-2 rounded text-emerald-600"
										/>
										<span className="text-gray-700 text-sm dark:text-gray-300">{preference}</span>
									</label>
								))}
							</div>
						</div>

						<label className="flex items-center">
							<input
								type="checkbox"
								checked={formData.agreed}
								onChange={(e) => setFormData((prev) => ({ ...prev, agreed: e.target.checked }))}
								className="mr-2 rounded text-emerald-600"
							/>
							<span className="text-gray-700 text-sm dark:text-gray-300">我同意服务条款和隐私政策</span>
						</label>
					</div>
				</div>
			</div>

			<div className="mt-6 rounded-lg bg-teal-50 p-4 dark:bg-teal-900/20">
				<p className="text-sm text-teal-800 dark:text-teal-300">
					💡 <strong>Activity API 价值：</strong>
					即使用户在填写表单过程中离开页面，表单状态也会被自动保存。当用户返回时，可以继续之前的填写，大大提升了用户体验。
				</p>
			</div>
		</div>
	);
}

// 页面状态保持演示组件
function PageStateDemo() {
	const [pageActive, setPageActive] = useState(false);
	const [pageState, setPageState] = useState({
		scrollPosition: 0,
		selectedTab: "overview",
		searchQuery: "",
		filters: {
			category: "",
			priceRange: "",
			rating: "",
		},
		viewMode: "grid" as "grid" | "list",
		sortOrder: "newest" as "newest" | "oldest" | "popular",
	});

	// 模拟页面状态的 Activity API 管理
	const savePageState = () => {
		if (pageActive) {
			sessionStorage.setItem("page-demo-state", JSON.stringify(pageState));
		}
	};

	const restorePageState = () => {
		const savedPageState = sessionStorage.getItem("page-demo-state");
		if (savedPageState) {
			const restored = JSON.parse(savedPageState);
			setPageState(restored);
			// 模拟滚动到之前的位置
			window.scrollTo(0, restored.scrollPosition);
		}
	};

	const clearPageState = () => {
		sessionStorage.removeItem("page-demo-state");
		setPageState({
			scrollPosition: 0,
			selectedTab: "overview",
			searchQuery: "",
			filters: { category: "", priceRange: "", rating: "" },
			viewMode: "grid",
			sortOrder: "newest",
		});
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		savePageState();
	}, [pageState, pageActive]);

	useEffect(() => {
		const handleScroll = () => {
			setPageState((prev) => ({ ...prev, scrollPosition: window.scrollY }));
		};

		if (pageActive) {
			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}
	}, [pageActive]);

	const tabs = [
		{ id: "overview", label: "概览", icon: "📊" },
		{ id: "products", label: "产品", icon: "🛍️" },
		{ id: "reviews", label: "评价", icon: "⭐" },
		{ id: "settings", label: "设置", icon: "⚙️" },
	];

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
			<h3 className="mb-4 font-semibold text-gray-800 text-xl dark:text-white">📄 页面状态保持演示</h3>

			<div className="mb-6">
				<div className="mb-4 flex gap-4">
					<button
						onClick={() => setPageActive(!pageActive)}
						className={`rounded-lg px-4 py-2 transition-colors ${
							pageActive ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-gray-600 text-white hover:bg-gray-700"
						}`}
					>
						{pageActive ? "页面活动" : "页面暂停"}
					</button>

					<button
						onClick={restorePageState}
						className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
					>
						恢复页面状态
					</button>

					<button
						onClick={clearPageState}
						className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
					>
						重置页面状态
					</button>
				</div>

				<div className="mb-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
					<p className="text-gray-600 text-sm dark:text-gray-400">
						当前滚动位置: {Math.round(pageState.scrollPosition)}px
					</p>
				</div>
			</div>

			{/* 标签页导航 */}
			<div className="mb-6">
				<div className="flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-700">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setPageState((prev) => ({ ...prev, selectedTab: tab.id }))}
							className={`flex flex-1 items-center justify-center rounded-md px-4 py-2 transition-colors ${
								pageState.selectedTab === tab.id
									? "bg-white text-emerald-600 shadow-sm dark:bg-gray-800 dark:text-emerald-400"
									: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
							}`}
						>
							<span className="mr-2">{tab.icon}</span>
							<span className="font-medium text-sm">{tab.label}</span>
						</button>
					))}
				</div>
			</div>

			{/* 搜索和过滤 */}
			<div className="mb-6">
				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<input
							type="text"
							value={pageState.searchQuery}
							onChange={(e) => setPageState((prev) => ({ ...prev, searchQuery: e.target.value }))}
							placeholder="搜索内容..."
							className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
						/>
					</div>
					<div className="flex gap-2">
						<button
							onClick={() =>
								setPageState((prev) => ({ ...prev, viewMode: prev.viewMode === "grid" ? "list" : "grid" }))
							}
							className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
						>
							{pageState.viewMode === "grid" ? "📋 列表" : "⚏ 网格"}
						</button>
						<select
							value={pageState.sortOrder}
							onChange={(e) => setPageState((prev) => ({ ...prev, sortOrder: e.target.value as any }))}
							className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
						>
							<option value="newest">最新</option>
							<option value="oldest">最早</option>
							<option value="popular">最热</option>
						</select>
					</div>
				</div>
			</div>

			{/* 过滤器 */}
			<div className="mb-6">
				<h4 className="mb-3 font-medium text-gray-700 dark:text-gray-300">过滤器：</h4>
				<div className="grid grid-cols-3 gap-4">
					<select
						value={pageState.filters.category}
						onChange={(e) =>
							setPageState((prev) => ({
								...prev,
								filters: { ...prev.filters, category: e.target.value },
							}))
						}
						className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
					>
						<option value="">所有分类</option>
						<option value="electronics">电子产品</option>
						<option value="clothing">服装</option>
						<option value="books">图书</option>
					</select>

					<select
						value={pageState.filters.priceRange}
						onChange={(e) =>
							setPageState((prev) => ({
								...prev,
								filters: { ...prev.filters, priceRange: e.target.value },
							}))
						}
						className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
					>
						<option value="">所有价格</option>
						<option value="0-100">¥0-100</option>
						<option value="100-500">¥100-500</option>
						<option value="500+">¥500+</option>
					</select>

					<select
						value={pageState.filters.rating}
						onChange={(e) =>
							setPageState((prev) => ({
								...prev,
								filters: { ...prev.filters, rating: e.target.value },
							}))
						}
						className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
					>
						<option value="">所有评分</option>
						<option value="5">5星</option>
						<option value="4+">4星以上</option>
						<option value="3+">3星以上</option>
					</select>
				</div>
			</div>

			{/* 模拟内容区域 - 用于测试滚动 */}
			<div className="space-y-4">
				{Array.from({ length: 10 }, (_, i) => (
					<div key={i} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
						<h4 className="mb-2 font-medium text-gray-800 dark:text-white">内容项 {i + 1}</h4>
						<p className="text-gray-600 text-sm dark:text-gray-400">
							这是演示页面状态保持的内容项。尝试滚动页面、切换标签、设置过滤条件， 然后切换页面状态或刷新页面来测试
							Activity API 的状态保持功能。
						</p>
					</div>
				))}
			</div>

			<div className="mt-6 rounded-lg bg-cyan-50 p-4 dark:bg-cyan-900/20">
				<p className="text-cyan-800 text-sm dark:text-cyan-300">
					🔄 <strong>页面状态保持：</strong>
					Activity API 可以保存用户的浏览状态，包括滚动位置、搜索条件、过滤器设置等，
					让用户在返回页面时能够无缝继续之前的操作。
				</p>
			</div>
		</div>
	);
}

// 复杂状态管理演示组件
function ComplexStateDemo() {
	const [complexActive, setComplexActive] = useState(false);
	const [complexState, setComplexState] = useState({
		userSession: {
			loginTime: Date.now(),
			lastActivity: Date.now(),
			sessionId: "",
		},
		applicationState: {
			currentModule: "dashboard",
			openTabs: [] as string[],
			notificationCount: 0,
			theme: "light" as "light" | "dark",
		},
		workInProgress: {
			unsavedChanges: false,
			backupData: null as any,
			autoSaveTimestamp: null as number | null,
		},
		performanceMetrics: {
			renderCount: 0,
			errorCount: 0,
			lastError: null as string | null,
		},
	});

	// 模拟复杂状态的 Activity API 管理
	const saveComplexState = () => {
		if (complexActive) {
			const stateToSave = {
				...complexState,
				userSession: {
					...complexState.userSession,
					lastActivity: Date.now(),
				},
			};
			sessionStorage.setItem("complex-demo-state", JSON.stringify(stateToSave));
		}
	};

	const restoreComplexState = () => {
		const savedComplexState = sessionStorage.getItem("complex-demo-state");
		if (savedComplexState) {
			setComplexState(JSON.parse(savedComplexState));
		}
	};

	const clearComplexState = () => {
		sessionStorage.removeItem("complex-demo-state");
		setComplexState({
			userSession: { loginTime: Date.now(), lastActivity: Date.now(), sessionId: "" },
			applicationState: { currentModule: "dashboard", openTabs: [], notificationCount: 0, theme: "light" },
			workInProgress: { unsavedChanges: false, backupData: null, autoSaveTimestamp: null },
			performanceMetrics: { renderCount: 0, errorCount: 0, lastError: null },
		});
	};

	useEffect(() => {
		saveComplexState();
	}, [complexState, complexActive]);

	const simulateUserActivity = () => {
		setComplexState((prev) => ({
			...prev,
			userSession: { ...prev.userSession, lastActivity: Date.now() },
			performanceMetrics: { ...prev.performanceMetrics, renderCount: prev.performanceMetrics.renderCount + 1 },
		}));
	};

	const addTab = (tabName: string) => {
		setComplexState((prev) => ({
			...prev,
			applicationState: {
				...prev.applicationState,
				openTabs: [...prev.applicationState.openTabs, tabName],
			},
			workInProgress: {
				...prev.workInProgress,
				unsavedChanges: true,
				autoSaveTimestamp: Date.now(),
			},
		}));
	};

	const simulateError = () => {
		const errorMessage = `模拟错误 ${Date.now()}`;
		setComplexState((prev) => ({
			...prev,
			performanceMetrics: {
				...prev.performanceMetrics,
				errorCount: prev.performanceMetrics.errorCount + 1,
				lastError: errorMessage,
			},
		}));
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
			<h3 className="mb-4 font-semibold text-gray-800 text-xl dark:text-white">🔧 复杂状态管理演示</h3>

			<div className="mb-6">
				<div className="mb-4 flex gap-4">
					<button
						onClick={() => setComplexActive(!complexActive)}
						className={`rounded-lg px-4 py-2 transition-colors ${
							complexActive
								? "bg-emerald-600 text-white hover:bg-emerald-700"
								: "bg-gray-600 text-white hover:bg-gray-700"
						}`}
					>
						{complexActive ? "复杂状态活动" : "复杂状态暂停"}
					</button>

					<button
						onClick={restoreComplexState}
						className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
					>
						恢复复杂状态
					</button>

					<button
						onClick={clearComplexState}
						className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
					>
						重置复杂状态
					</button>

					<button
						onClick={simulateUserActivity}
						className="rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
					>
						模拟用户活动
					</button>

					<button
						onClick={simulateError}
						className="rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700"
					>
						模拟错误
					</button>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<div className="space-y-4">
					<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
						<h4 className="mb-3 font-medium text-gray-800 dark:text-white">用户会话状态</h4>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-400">登录时间:</span>
								<span className="text-gray-800 dark:text-white">
									{new Date(complexState.userSession.loginTime).toLocaleTimeString()}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-400">最后活动:</span>
								<span className="text-gray-800 dark:text-white">
									{new Date(complexState.userSession.lastActivity).toLocaleTimeString()}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-400">会话时长:</span>
								<span className="text-gray-800 dark:text-white">
									{Math.round((Date.now() - complexState.userSession.loginTime) / 1000 / 60)} 分钟
								</span>
							</div>
						</div>
					</div>

					<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
						<h4 className="mb-3 font-medium text-gray-800 dark:text-white">应用状态</h4>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-400">当前模块:</span>
								<span className="text-gray-800 dark:text-white">{complexState.applicationState.currentModule}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-400">打开标签:</span>
								<span className="text-gray-800 dark:text-white">
									{complexState.applicationState.openTabs.length} 个
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-400">通知数量:</span>
								<span className="text-gray-800 dark:text-white">{complexState.applicationState.notificationCount}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-400">主题:</span>
								<span className="text-gray-800 dark:text-white">{complexState.applicationState.theme}</span>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
						<h4 className="mb-3 font-medium text-gray-800 dark:text-white">工作进度状态</h4>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-400">未保存更改:</span>
								<span
									className={`font-medium ${complexState.workInProgress.unsavedChanges ? "text-orange-600" : "text-green-600"}`}
								>
									{complexState.workInProgress.unsavedChanges ? "是" : "否"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-400">自动保存时间:</span>
								<span className="text-gray-800 dark:text-white">
									{complexState.workInProgress.autoSaveTimestamp
										? new Date(complexState.workInProgress.autoSaveTimestamp).toLocaleTimeString()
										: "未保存"}
								</span>
							</div>
						</div>

						<div className="mt-3 flex gap-2">
							{["文档", "表格", "图片", "视频"].map((item) => (
								<button
									key={item}
									onClick={() => addTab(item)}
									className="rounded bg-blue-600 px-3 py-1 text-white text-xs transition-colors hover:bg-blue-700"
								>
									打开 {item}
								</button>
							))}
						</div>
					</div>

					<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
						<h4 className="mb-3 font-medium text-gray-800 dark:text-white">性能指标</h4>
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-400">渲染次数:</span>
								<span className="text-gray-800 dark:text-white">{complexState.performanceMetrics.renderCount}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-400">错误次数:</span>
								<span
									className={`font-medium ${complexState.performanceMetrics.errorCount > 0 ? "text-red-600" : "text-green-600"}`}
								>
									{complexState.performanceMetrics.errorCount}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600 dark:text-gray-400">最后错误:</span>
								<span className="max-w-[150px] truncate text-gray-800 dark:text-white">
									{complexState.performanceMetrics.lastError || "无"}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/20">
				<p className="text-emerald-800 text-sm dark:text-emerald-300">
					🎯 <strong>复杂状态管理：</strong>
					Activity API 能够管理复杂的多层次状态结构，包括用户会话、应用状态、工作进度和性能指标等，
					为复杂应用提供完整的状态保持解决方案。
				</p>
			</div>
		</div>
	);
}

"use client";

import { useCallback, useMemo, useState } from "react";

export default function SmartOptimizationDemo() {
	const [strategy, setStrategy] = useState<"memo" | "callback" | "dependency">("memo");
	const [_data, _setData] = useState<any>({});
	const [_optimizationReport, _setOptimizationReport] = useState<any>({});

	// React.memo 自动优化演示
	const MemoDemo = () => {
		const [props, setProps] = useState({ id: 1, name: "组件A", value: 100 });
		const [parentState, setParentState] = useState(0);

		// 模拟编译器分析组件是否需要 memo
		const shouldMemo = useMemo(() => {
			// 模拟编译器分析：组件有复杂渲染逻辑且 props 不频繁变化
			const hasComplexRendering = true;
			const propsChangeFrequency = "low";
			return hasComplexRendering && propsChangeFrequency === "low";
		}, []);

		const updateProps = () => {
			setProps((prev) => ({ ...prev, value: prev.value + 10 }));
		};

		const updateParentState = () => {
			setParentState((prev) => prev + 1);
		};

		return (
			<div className="space-y-4">
				<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-medium text-gray-800 dark:text-white">组件优化分析</h4>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span>需要 React.memo:</span>
							<span className={`font-medium ${shouldMemo ? "text-green-600" : "text-red-600"}`}>
								{shouldMemo ? "是" : "否"}
							</span>
						</div>
						<div className="flex justify-between">
							<span>Props ID:</span>
							<span>{props.id}</span>
						</div>
						<div className="flex justify-between">
							<span>Props Value:</span>
							<span>{props.value}</span>
						</div>
						<div className="flex justify-between">
							<span>父组件状态:</span>
							<span>{parentState}</span>
						</div>
					</div>
				</div>

				<div className="flex gap-2">
					<button
						onClick={updateProps}
						className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
					>
						更新 Props
					</button>
					<button
						onClick={updateParentState}
						className="rounded bg-purple-600 px-3 py-1 text-sm text-white transition-colors hover:bg-purple-700"
					>
						更新父状态
					</button>
				</div>

				{shouldMemo && (
					<div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
						<p className="text-green-800 text-sm dark:text-green-300">
							✅ 编译器建议：此组件适合使用 React.memo 优化，因为 props 变化不频繁但组件渲染较复杂。
						</p>
					</div>
				)}
			</div>
		);
	};

	// useCallback 自动优化演示
	const CallbackDemo = () => {
		const [items, setItems] = useState([1, 2, 3]);
		const [filter, setFilter] = useState("");

		// 模拟编译器分析事件处理器
		const handleItemClick = useCallback((itemId: number) => {
			console.log(`Item ${itemId} clicked`);
			setItems((prev) => prev.filter((id) => id !== itemId));
		}, []);

		const analyzeCallback = useCallback(() => {
			// 模拟编译器分析：处理器传递给子组件且依赖项稳定
			const passedToChild = true;
			const stableDependencies = true;
			const performanceCritical = true;

			return {
				shouldOptimize: passedToChild && stableDependencies && performanceCritical,
				reason: performanceCritical ? "性能关键路径" : "普通优化",
			};
		}, []);

		const analysis = analyzeCallback();

		return (
			<div className="space-y-4">
				<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-medium text-gray-800 dark:text-white">事件处理器分析</h4>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span>需要 useCallback:</span>
							<span className={`font-medium ${analysis.shouldOptimize ? "text-green-600" : "text-red-600"}`}>
								{analysis.shouldOptimize ? "是" : "否"}
							</span>
						</div>
						<div className="flex justify-between">
							<span>优化原因:</span>
							<span>{analysis.reason}</span>
						</div>
						<div className="flex justify-between">
							<span>当前项目数:</span>
							<span>{items.length}</span>
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<input
						type="text"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						placeholder="过滤项目..."
						className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
					/>
					<div className="flex flex-wrap gap-2">
						{items
							.filter((item) => !filter || item.toString().includes(filter))
							.map((item) => (
								<button
									key={item}
									onClick={() => handleItemClick(item)}
									className="rounded bg-blue-100 px-3 py-1 text-blue-800 text-sm transition-colors hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:hover:bg-blue-900/70"
								>
									项目 {item}
								</button>
							))}
					</div>
				</div>

				{analysis.shouldOptimize && (
					<div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
						<p className="text-green-800 text-sm dark:text-green-300">
							✅ 编译器建议：此事件处理器传递给子组件，使用 useCallback 可以避免不必要的重渲染。
						</p>
					</div>
				)}
			</div>
		);
	};

	// 依赖项优化演示
	const DependencyDemo = () => {
		const [user, setUser] = useState({ id: 1, name: "张三" });
		const [posts, setPosts] = useState<any[]>([]);
		const [settings, setSettings] = useState({ theme: "light" });

		// 模拟编译器分析依赖项
		const analyzeDependencies = useCallback(() => {
			// 模拟复杂的数据依赖关系
			const userPosts = posts.filter((post) => post.userId === user.id);
			const processedPosts = userPosts.map((post) => ({
				...post,
				displayName: `${settings.theme === "dark" ? "🌙" : "☀️"} ${post.title}`,
			}));

			return {
				userPostsCount: userPosts.length,
				processedPostsCount: processedPosts.length,
				dependencies: {
					user: true,
					posts: true,
					settings: true,
				},
			};
		}, [user.id, posts, settings.theme]);

		const analysis = analyzeDependencies();

		const loadPosts = () => {
			const newPosts = [
				{ id: 1, userId: user.id, title: "文章1" },
				{ id: 2, userId: user.id, title: "文章2" },
				{ id: 3, userId: 2, title: "其他文章" },
			];
			setPosts(newPosts);
		};

		return (
			<div className="space-y-4">
				<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-3 font-medium text-gray-800 dark:text-white">依赖项分析</h4>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between">
							<span>用户相关文章:</span>
							<span>{analysis.userPostsCount}</span>
						</div>
						<div className="flex justify-between">
							<span>处理后文章:</span>
							<span>{analysis.processedPostsCount}</span>
						</div>
						<div className="flex justify-between">
							<span>依赖项数量:</span>
							<span>{Object.values(analysis.dependencies).filter(Boolean).length}</span>
						</div>
					</div>
				</div>

				<div className="flex gap-2">
					<button
						onClick={loadPosts}
						className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
					>
						加载文章
					</button>
					<button
						onClick={() => setUser((prev) => ({ ...prev, name: prev.name === "张三" ? "李四" : "张三" }))}
						className="rounded bg-purple-600 px-3 py-1 text-sm text-white transition-colors hover:bg-purple-700"
					>
						切换用户
					</button>
					<button
						onClick={() => setSettings((prev) => ({ ...prev, theme: prev.theme === "light" ? "dark" : "light" }))}
						className="rounded bg-indigo-600 px-3 py-1 text-sm text-white transition-colors hover:bg-indigo-700"
					>
						切换主题
					</button>
				</div>

				<div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
					<p className="text-blue-800 text-sm dark:text-blue-300">
						🔍 编译器分析：检测到 3 个依赖项，建议使用 useMemo 缓存计算结果，避免重复处理。
					</p>
				</div>
			</div>
		);
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
			<h3 className="mb-4 font-semibold text-gray-800 text-xl dark:text-white">🧠 智能优化策略</h3>

			<div className="mb-6">
				<div className="flex gap-2">
					{[
						{ key: "memo", label: "React.memo", icon: "📦" },
						{ key: "callback", label: "useCallback", icon: "🎯" },
						{ key: "dependency", label: "依赖分析", icon: "🔗" },
					].map(({ key, label, icon }) => (
						<button
							key={key}
							onClick={() => setStrategy(key as any)}
							className={`rounded-lg px-4 py-2 transition-colors ${
								strategy === key
									? "bg-indigo-600 text-white"
									: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
							}`}
						>
							{icon} {label}
						</button>
					))}
				</div>
			</div>

			{strategy === "memo" && <MemoDemo />}
			{strategy === "callback" && <CallbackDemo />}
			{strategy === "dependency" && <DependencyDemo />}

			<div className="mt-6 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 p-4 dark:from-purple-900/20 dark:to-indigo-900/20">
				<p className="text-purple-800 text-sm dark:text-purple-300">
					🤖 <strong>智能优化策略：</strong>
					React Compiler 能够智能分析代码模式，自动应用最合适的优化策略，无需开发者手动干预。
				</p>
			</div>
		</div>
	);
}
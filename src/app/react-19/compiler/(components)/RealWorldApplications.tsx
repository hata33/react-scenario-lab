"use client";

import { useMemo, useState } from "react";

export default function RealWorldApplications() {
	const [application, setApplication] = useState<"ecommerce" | "dashboard" | "social">("ecommerce");

	// 电商应用演示
	const EcommerceDemo = () => {
		const [products, setProducts] = useState<any[]>([]);
		const [_cart, _setCart] = useState<any[]>([]);
		const [filters, setFilters] = useState({ category: "", priceRange: "" });

		// 模拟编译器优化电商应用
		const optimizedProductList = useMemo(() => {
			// 编译器会自动优化这个复杂的产品列表计算
			return products
				.filter((product) => {
					if (filters.category && product.category !== filters.category) return false;
					if (filters.priceRange) {
						const [min, max] = filters.priceRange.split("-").map(Number);
						if (product.price < min || product.price > max) return false;
					}
					return true;
				})
				.map((product) => ({
					...product,
					discountPrice: product.price * 0.9,
					inStock: product.stock > 0,
				}));
		}, [products, filters]);

		const loadProducts = () => {
			const mockProducts = Array.from({ length: 100 }, (_, i) => ({
				id: i + 1,
				name: `商品 ${i + 1}`,
				price: Math.random() * 1000 + 50,
				category: ["电子产品", "服装", "图书", "家居"][i % 4],
				stock: Math.floor(Math.random() * 100),
			}));
			setProducts(mockProducts);
		};

		return (
			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={loadProducts}
						className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
					>
						加载商品
					</button>
					<select
						value={filters.category}
						onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
						className="rounded border border-gray-300 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
					>
						<option value="">所有分类</option>
						<option value="电子产品">电子产品</option>
						<option value="服装">服装</option>
						<option value="图书">图书</option>
						<option value="家居">家居</option>
					</select>
				</div>

				<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-2 font-medium text-gray-800 dark:text-white">
						优化结果 ({optimizedProductList.length} 件商品)
					</h4>
					<div className="grid grid-cols-3 gap-2">
						{optimizedProductList.slice(0, 6).map((product) => (
							<div key={product.id} className="rounded bg-white p-2 text-xs dark:bg-gray-800">
								<p className="truncate font-medium">{product.name}</p>
								<p className="text-gray-600 dark:text-gray-400">
									¥{product.price.toFixed(0)} → ¥{product.discountPrice.toFixed(0)}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
					<p className="text-green-800 text-sm dark:text-green-300">
						🛒 编译器优化：自动优化了产品列表的过滤、排序和价格计算，提升了页面响应速度。
					</p>
				</div>
			</div>
		);
	};

	// 仪表板应用演示
	const DashboardDemo = () => {
		const [metrics, setMetrics] = useState<any>({});
		const [timeRange, setTimeRange] = useState("7d");

		// 模拟编译器优化仪表板数据处理
		const optimizedMetrics = useMemo(() => {
			// 编译器会自动优化这些复杂的数据聚合计算
			return {
				totalRevenue: metrics.revenue?.reduce((sum: number, item: any) => sum + item.amount, 0) || 0,
				averageOrderValue:
					metrics.orders?.length > 0
						? metrics.orders.reduce((sum: number, order: any) => sum + order.total, 0) / metrics.orders.length
						: 0,
				conversionRate:
					metrics.visitors && metrics.conversions ? ((metrics.conversions / metrics.visitors) * 100).toFixed(2) : 0,
				activeUsers:
					metrics.users?.filter((user: any) => user.lastActive > Date.now() - 24 * 60 * 60 * 1000).length || 0,
			};
		}, [metrics]);

		const loadMetrics = () => {
			const mockMetrics = {
				revenue: Array.from({ length: 30 }, (_, _i) => ({ amount: Math.random() * 10000 + 1000 })),
				orders: Array.from({ length: 50 }, (_, _i) => ({ total: Math.random() * 500 + 50 })),
				visitors: 10000,
				conversions: 250,
				users: Array.from({ length: 100 }, (_, _i) => ({
					lastActive: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
				})),
			};
			setMetrics(mockMetrics);
		};

		return (
			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={loadMetrics}
						className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
					>
						加载指标
					</button>
					<select
						value={timeRange}
						onChange={(e) => setTimeRange(e.target.value)}
						className="rounded border border-gray-300 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
					>
						<option value="7d">7天</option>
						<option value="30d">30天</option>
						<option value="90d">90天</option>
					</select>
				</div>

				<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
					<div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700">
						<p className="text-gray-600 text-sm dark:text-gray-400">总收入</p>
						<p className="font-bold text-gray-800 text-lg dark:text-white">
							¥{optimizedMetrics.totalRevenue.toFixed(0)}
						</p>
					</div>
					<div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700">
						<p className="text-gray-600 text-sm dark:text-gray-400">平均订单</p>
						<p className="font-bold text-gray-800 text-lg dark:text-white">
							¥{optimizedMetrics.averageOrderValue.toFixed(0)}
						</p>
					</div>
					<div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700">
						<p className="text-gray-600 text-sm dark:text-gray-400">转化率</p>
						<p className="font-bold text-gray-800 text-lg dark:text-white">{optimizedMetrics.conversionRate}%</p>
					</div>
					<div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700">
						<p className="text-gray-600 text-sm dark:text-gray-400">活跃用户</p>
						<p className="font-bold text-gray-800 text-lg dark:text-white">{optimizedMetrics.activeUsers}</p>
					</div>
				</div>

				<div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
					<p className="text-blue-800 text-sm dark:text-blue-300">
						📊 编译器优化：自动缓存了复杂的数据聚合计算，确保仪表板快速响应。
					</p>
				</div>
			</div>
		);
	};

	// 社交应用演示
	const SocialDemo = () => {
		const [posts, setPosts] = useState<any[]>([]);
		const [userInteractions, setUserInteractions] = useState<any>({});

		// 模拟编译器优化社交动态
		const optimizedFeed = useMemo(() => {
			// 编译器会自动优化这个复杂的社交动态排序算法
			return posts
				.map((post) => ({
					...post,
					engagementScore: post.likes + post.comments * 2 + post.shares * 3,
					trendingScore: (post.engagementScore / (Date.now() - post.timestamp)) * 100000,
					personalizedScore: userInteractions.interests
						? post.tags.some((tag: string) => userInteractions.interests.includes(tag))
							? 1.5
							: 1
						: 1,
				}))
				.sort((a, b) => b.trendingScore * b.personalizedScore - a.trendingScore * a.personalizedScore);
		}, [posts, userInteractions]);

		const loadPosts = () => {
			const mockPosts = Array.from({ length: 50 }, (_, i) => ({
				id: i + 1,
				content: `动态内容 ${i + 1}`,
				likes: Math.floor(Math.random() * 1000),
				comments: Math.floor(Math.random() * 100),
				shares: Math.floor(Math.random() * 50),
				timestamp: Date.now() - Math.random() * 24 * 60 * 60 * 1000,
				tags: ["科技", "生活", "娱乐", "体育"].slice(0, Math.floor(Math.random() * 3) + 1),
			}));
			setPosts(mockPosts);
			setUserInteractions({ interests: ["科技", "生活"] });
		};

		return (
			<div className="space-y-4">
				<div className="flex gap-4">
					<button
						onClick={loadPosts}
						className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
					>
						加载动态
					</button>
				</div>

				<div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<h4 className="mb-2 font-medium text-gray-800 dark:text-white">个性化推荐 (前5条)</h4>
					<div className="space-y-2">
						{optimizedFeed.slice(0, 5).map((post) => (
							<div key={post.id} className="rounded bg-white p-3 dark:bg-gray-800">
								<p className="font-medium text-sm">{post.content}</p>
								<p className="mt-1 text-gray-600 text-xs dark:text-gray-400">
									互动: {post.engagementScore} | 趋势: {post.trendingScore.toFixed(1)}
									{post.personalizedScore > 1 && " | 🎯 个性化推荐"}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
					<p className="text-purple-800 text-sm dark:text-purple-300">
						💬 编译器优化：自动优化了复杂的推荐算法和个性化计算，提升了用户体验。
					</p>
				</div>
			</div>
		);
	};

	return (
		<div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
			<h3 className="mb-4 font-semibold text-gray-800 text-xl dark:text-white">🌍 实际应用场景</h3>

			<div className="mb-6">
				<div className="flex gap-2">
					{[
						{ key: "ecommerce", label: "电商应用", icon: "🛒" },
						{ key: "dashboard", label: "数据仪表板", icon: "📊" },
						{ key: "social", label: "社交应用", icon: "💬" },
					].map(({ key, label, icon }) => (
						<button
							key={key}
							onClick={() => setApplication(key as any)}
							className={`rounded-lg px-4 py-2 transition-colors ${
								application === key
									? "bg-indigo-600 text-white"
									: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
							}`}
						>
							{icon} {label}
						</button>
					))}
				</div>
			</div>

			{application === "ecommerce" && <EcommerceDemo />}
			{application === "dashboard" && <DashboardDemo />}
			{application === "social" && <SocialDemo />}

			<div className="mt-6 rounded-lg bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-4 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
				<p className="text-indigo-800 text-sm dark:text-indigo-300">
					🚀 <strong>React Compiler 革命性影响：</strong>
					通过自动优化，React Compiler 让开发者专注于业务逻辑，而将性能优化交给编译器处理，
					大大提升了开发效率和应用性能。
				</p>
			</div>
		</div>
	);
}

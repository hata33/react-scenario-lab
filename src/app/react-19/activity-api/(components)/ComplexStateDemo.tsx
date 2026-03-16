"use client";

import { useCallback, useEffect, useState } from "react";
import { useActivity } from "./hooks";

interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	category: string;
	image: string;
	description: string;
	sku: string;
	discount: number;
}

interface ShoppingCart {
	items: CartItem[];
	subtotal: number;
	tax: number;
	shipping: number;
	total: number;
	coupon: string;
	discount: number;
	lastUpdated: string;
	userId?: string;
	sessionId: string;
}

export default function ComplexStateDemo() {
	const initialCart: ShoppingCart = {
		items: [],
		subtotal: 0,
		tax: 0,
		shipping: 0,
		total: 0,
		coupon: "",
		discount: 0,
		lastUpdated: new Date().toISOString(),
		sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
	};

	const {
		state: cart,
		setState: setCart,
		clearState: clearCart,
		isSyncing,
		lastSync,
	} = useActivity("shopping-cart-demo", initialCart);
	const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced" | "error">("idle");
	const [couponInput, setCouponInput] = useState("");
	const [showCheckout, setShowCheckout] = useState(false);

	const sampleProducts: CartItem[] = [
		{
			id: "1",
			name: "Wireless Headphones",
			price: 79.99,
			quantity: 1,
			category: "Electronics",
			image: "🎧",
			description: "Premium noise-canceling wireless headphones",
			sku: "WH-001",
			discount: 0,
		},
		{
			id: "2",
			name: "Smart Watch",
			price: 199.99,
			quantity: 1,
			category: "Electronics",
			image: "⌚",
			description: "Fitness tracking smartwatch with heart rate monitor",
			sku: "SW-002",
			discount: 10,
		},
		{
			id: "3",
			name: "Laptop Stand",
			price: 49.99,
			quantity: 1,
			category: "Accessories",
			image: "💻",
			description: "Adjustable aluminum laptop stand",
			sku: "LS-003",
			discount: 0,
		},
		{
			id: "4",
			name: "Mechanical Keyboard",
			price: 129.99,
			quantity: 1,
			category: "Electronics",
			image: "⌨️",
			description: "RGB mechanical gaming keyboard",
			sku: "MK-004",
			discount: 15,
		},
		{
			id: "5",
			name: "Webcam HD",
			price: 89.99,
			quantity: 1,
			category: "Electronics",
			image: "📹",
			description: "1080p HD webcam with auto-focus",
			sku: "WC-005",
			discount: 5,
		},
	];

	const calculateTotals = useCallback((items: CartItem[], couponDiscount: number = 0) => {
		const subtotal = items.reduce((total, item) => {
			const itemPrice = item.price * (1 - item.discount / 100);
			return total + itemPrice * item.quantity;
		}, 0);

		const discount = subtotal * (couponDiscount / 100);
		const afterDiscount = subtotal - discount;
		const tax = afterDiscount * 0.08; // 8% tax
		const shipping = items.length > 0 ? (afterDiscount > 100 ? 0 : 9.99) : 0;
		const total = afterDiscount + tax + shipping;

		return {
			subtotal: parseFloat(subtotal.toFixed(2)),
			tax: parseFloat(tax.toFixed(2)),
			shipping: parseFloat(shipping.toFixed(2)),
			total: parseFloat(total.toFixed(2)),
			discount: parseFloat(discount.toFixed(2)),
		};
	}, []);

	const addToCart = useCallback(
		(product: CartItem) => {
			setSyncStatus("syncing");

			setCart((prev) => {
				const existingItem = prev.items.find((item) => item.id === product.id);
				let updatedItems: CartItem[];

				if (existingItem) {
					updatedItems = prev.items.map((item) =>
						item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
					);
				} else {
					updatedItems = [...prev.items, { ...product, quantity: 1 }];
				}

				const totals = calculateTotals(updatedItems, prev.discount);

				return {
					...prev,
					items: updatedItems,
					...totals,
					lastUpdated: new Date().toISOString(),
				};
			});

			setTimeout(() => setSyncStatus("synced"), 300);
			setTimeout(() => setSyncStatus("idle"), 2000);
		},
		[setCart, calculateTotals],
	);

	const updateQuantity = useCallback(
		(itemId: string, quantity: number) => {
			if (quantity < 1) return;

			setSyncStatus("syncing");
			setCart((prev) => {
				const updatedItems = prev.items.map((item) => (item.id === itemId ? { ...item, quantity } : item));

				const totals = calculateTotals(updatedItems, prev.discount);

				return {
					...prev,
					items: updatedItems,
					...totals,
					lastUpdated: new Date().toISOString(),
				};
			});

			setTimeout(() => setSyncStatus("synced"), 300);
			setTimeout(() => setSyncStatus("idle"), 2000);
		},
		[setCart, calculateTotals],
	);

	const removeFromCart = useCallback(
		(itemId: string) => {
			setSyncStatus("syncing");
			setCart((prev) => {
				const updatedItems = prev.items.filter((item) => item.id !== itemId);
				const totals = calculateTotals(updatedItems, prev.discount);

				return {
					...prev,
					items: updatedItems,
					...totals,
					lastUpdated: new Date().toISOString(),
				};
			});

			setTimeout(() => setSyncStatus("synced"), 300);
			setTimeout(() => setSyncStatus("idle"), 2000);
		},
		[setCart, calculateTotals],
	);

	const applyCoupon = useCallback(() => {
		const coupons: Record<string, number> = {
			WELCOME10: 10,
			SAVE20: 20,
			STUDENT15: 15,
		};

		const discount = coupons[couponInput.toUpperCase()] || 0;

		setSyncStatus("syncing");
		setCart((prev) => {
			const totals = calculateTotals(prev.items, discount);
			return {
				...prev,
				coupon: discount > 0 ? couponInput.toUpperCase() : "",
				...totals,
				lastUpdated: new Date().toISOString(),
			};
		});

		setCouponInput("");
		setTimeout(() => setSyncStatus("synced"), 500);
		setTimeout(() => setSyncStatus("idle"), 2000);
	}, [couponInput, setCart, calculateTotals]);

	const loadSampleCart = useCallback(() => {
		const sampleItems = sampleProducts.slice(0, 3).map((product) => ({
			...product,
			quantity: Math.floor(Math.random() * 3) + 1,
		}));

		const totals = calculateTotals(sampleItems, 10);

		setCart({
			...initialCart,
			items: sampleItems,
			coupon: "WELCOME10",
			...totals,
			lastUpdated: new Date().toISOString(),
		});

		setSyncStatus("synced");
		setTimeout(() => setSyncStatus("idle"), 2000);
	}, [setCart, calculateTotals, initialCart]);

	const handleStorageChange = useCallback((e: StorageEvent) => {
		if (e.key === "activity-shopping-cart-demo") {
			setSyncStatus("syncing");
			setTimeout(() => setSyncStatus("synced"), 500);
			setTimeout(() => setSyncStatus("idle"), 2000);
		}
	}, []);

	useEffect(() => {
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, [handleStorageChange]);

	const getSyncStatusIcon = () => {
		switch (syncStatus) {
			case "syncing":
				return <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>;
			case "synced":
				return (
					<svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case "error":
				return (
					<svg className="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clipRule="evenodd"
						/>
					</svg>
				);
			default:
				return null;
		}
	};

	return (
		<div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
			<div className="mb-6">
				<h3 className="mb-2 font-semibold text-gray-900 text-lg">复杂对象状态演示</h3>
				<p className="mb-4 text-gray-600 text-sm">购物车复杂对象序列化演示。展示如何处理嵌套状态、计算和业务逻辑。</p>

				<div className="mb-4 rounded-md border border-gray-200 bg-gray-50 p-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							{isSyncing ? (
								<div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
							) : (
								getSyncStatusIcon()
							)}
							<span className="text-gray-700 text-sm">
								{isSyncing || syncStatus === "syncing"
									? "购物车同步中..."
									: syncStatus === "synced"
										? "购物车同步成功"
										: syncStatus === "error"
											? "购物车同步失败"
											: `购物车保存于 ${new Date(cart.lastUpdated).toLocaleTimeString()}`}
							</span>
							{lastSync && !isSyncing && syncStatus === "idle" && (
								<span className="ml-2 text-gray-500 text-xs">• 同步: {lastSync.toLocaleTimeString()}</span>
							)}
						</div>
						<div className="flex items-center space-x-4">
							<span className="text-gray-500 text-sm">{cart.items.length} 件商品</span>
							<span className="font-medium text-gray-900 text-sm">总计: ${cart.total}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<div className="mb-6">
						<div className="mb-4 flex items-center justify-between">
							<h4 className="font-medium text-gray-900 text-md">可选商品</h4>
							<button
								onClick={loadSampleCart}
								className="rounded-md bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
							>
								加载示例购物车
							</button>
						</div>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{sampleProducts.map((product) => {
								const inCart = cart.items.find((item) => item.id === product.id);
								return (
									<div
										key={product.id}
										className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
									>
										<div className="mb-3 flex items-start justify-between">
											<div className="flex items-center">
												<span className="mr-3 text-2xl">{product.image}</span>
												<div>
													<h5 className="font-medium text-gray-900">{product.name}</h5>
													<p className="text-gray-500 text-xs">{product.category}</p>
												</div>
											</div>
											{product.discount > 0 && (
												<span className="rounded bg-red-100 px-2 py-1 font-medium text-red-800 text-xs">
													-{product.discount}%
												</span>
											)}
										</div>
										<p className="mb-3 text-gray-600 text-sm">{product.description}</p>
										<div className="flex items-center justify-between">
											<div>
												<span className="font-bold text-gray-900 text-lg">
													${(product.price * (1 - product.discount / 100)).toFixed(2)}
												</span>
												{product.discount > 0 && (
													<span className="ml-2 text-gray-500 text-sm line-through">${product.price.toFixed(2)}</span>
												)}
											</div>
											<button
												onClick={() => addToCart(product)}
												disabled={!!inCart}
												className={`rounded px-3 py-1 text-sm transition-colors ${
													inCart
														? "cursor-not-allowed bg-gray-100 text-gray-400"
														: "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
												}`}
											>
												{inCart ? `已添加 (${inCart.quantity})` : "加入购物车"}
											</button>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{cart.items.length > 0 && (
						<div>
							<h4 className="mb-4 font-medium text-gray-900 text-md">购物车</h4>
							<div className="space-y-3">
								{cart.items.map((item) => (
									<div key={item.id} className="rounded-lg border border-gray-200 p-4">
										<div className="flex items-center justify-between">
											<div className="flex flex-1 items-center">
												<span className="mr-3 text-2xl">{item.image}</span>
												<div className="flex-1">
													<h5 className="font-medium text-gray-900">{item.name}</h5>
													<p className="text-gray-500 text-sm">SKU: {item.sku}</p>
												</div>
											</div>
											<div className="flex items-center space-x-4">
												<div className="flex items-center space-x-2">
													<button
														onClick={() => updateQuantity(item.id, item.quantity - 1)}
														className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
													>
														-
													</button>
													<span className="w-12 text-center font-medium">{item.quantity}</span>
													<button
														onClick={() => updateQuantity(item.id, item.quantity + 1)}
														className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
													>
														+
													</button>
												</div>
												<div className="text-right">
													<div className="font-medium text-gray-900">
														${(item.price * (1 - item.discount / 100) * item.quantity).toFixed(2)}
													</div>
													<div className="text-gray-500 text-sm">单价 ${item.price.toFixed(2)}</div>
												</div>
												<button
													onClick={() => removeFromCart(item.id)}
													className="ml-2 text-red-600 hover:text-red-800 focus:outline-none"
													title="移除商品"
												>
													<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
														<path
															fillRule="evenodd"
															d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
															clipRule="evenodd"
														/>
													</svg>
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				<div>
					<div className="sticky top-4 rounded-lg bg-gray-50 p-4">
						<h4 className="mb-4 font-medium text-gray-900 text-md">订单摘要</h4>

						<div className="mb-4 space-y-3">
							{cart.items.length > 0 && (
								<>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">小计</span>
										<span className="font-medium">${cart.subtotal}</span>
									</div>
									{cart.discount > 0 && (
										<div className="flex justify-between text-sm">
											<span className="text-gray-600">优惠券 ({cart.coupon})</span>
											<span className="font-medium text-green-600">-${cart.discount}</span>
										</div>
									)}
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">税费 (8%)</span>
										<span className="font-medium">${cart.tax}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">运费</span>
										<span className="font-medium">{cart.shipping === 0 ? "免费" : `$${cart.shipping}`}</span>
									</div>
									{cart.shipping > 0 && <div className="text-gray-500 text-xs">订单满100美元免费送货</div>}
								</>
							)}

							<div className="border-t pt-3">
								<div className="flex justify-between">
									<span className="font-bold text-gray-900 text-lg">总计</span>
									<span className="font-bold text-gray-900 text-lg">${cart.total}</span>
								</div>
							</div>

							{cart.items.length === 0 && (
								<div className="py-8 text-center text-gray-500">
									<span className="mb-2 block text-3xl">🛒</span>
									购物车为空
								</div>
							)}

							<div className="mt-4 space-y-3">
								{!cart.coupon && cart.items.length > 0 && (
									<div>
										<div className="flex space-x-2">
											<input
												type="text"
												value={couponInput}
												onChange={(e) => setCouponInput(e.target.value)}
												placeholder="输入优惠券代码"
												className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
											/>
											<button
												onClick={applyCoupon}
												className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											>
												使用
											</button>
										</div>
										<div className="text-gray-500 text-xs">试试：WELCOME10, SAVE20, STUDENT15</div>
									</div>
								)}

								{cart.items.length > 0 && (
									<>
										<button
											onClick={() => setShowCheckout(!showCheckout)}
											className="w-full rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
										>
											开始结算
										</button>
										<button
											onClick={clearCart}
											className="w-full rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
										>
											清空购物车
										</button>
									</>
								)}
							</div>

							{showCheckout && (
								<div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
									<div className="mb-2 font-medium text-green-800 text-sm">🎉 结算流程已开始</div>
									<div className="text-green-700 text-xs">
										购物车数据已序列化，准备结算处理。会话 ID：{cart.sessionId}
									</div>
								</div>
							)}
						</div>

						<div className="mt-6 border-gray-200 border-t pt-4">
							<div className="space-y-1 text-gray-500 text-xs">
								<div>会话 ID：{cart.sessionId}</div>
								{cart.userId && <div>用户 ID：{cart.userId}</div>}
								<div>购物车跨会话持久化</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
				<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
					<div className="mb-1 font-medium text-blue-900">复杂状态特性：</div>
					<ul className="space-y-1 text-blue-800">
						<li>• 嵌套对象序列化</li>
						<li>• 实时价格计算</li>
						<li>• 会话管理</li>
						<li>• 业务逻辑保持</li>
					</ul>
				</div>
				<div className="rounded-lg border border-green-200 bg-green-50 p-4">
					<div className="mb-1 font-medium text-green-900">测试场景：</div>
					<ul className="space-y-1 text-green-800">
						<li>• 添加商品并刷新页面</li>
						<li>• 在多个标签页中更改数量</li>
						<li>• 应用优惠券并查看持久化</li>
						<li>• 测试大型复杂购物车</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

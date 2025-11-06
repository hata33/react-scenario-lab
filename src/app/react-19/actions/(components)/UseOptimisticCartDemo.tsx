"use client";

import { useState } from "react";

type CartItem = { id: number; name: string; price: number; quantity: number; optimistic?: boolean };

export default function UseOptimisticCartDemo() {
	const [items, setItems] = useState<CartItem[]>([
		{ id: 1, name: "React 19 完全指南", price: 89, quantity: 1 },
		{ id: 2, name: "现代前端开发实战", price: 128, quantity: 2 },
	]);
	const [optimisticItems, setOptimisticItems] = useState<CartItem[]>(items);

	const updateQuantity = async (itemId: number, newQuantity: number) => {
		if (newQuantity < 0) return;

		// 乐观更新：立即更新数量
		setOptimisticItems((prev) =>
			prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity, optimistic: true } : item)),
		);

		// 模拟网络请求
		await new Promise((resolve) => setTimeout(resolve, 600));

		// 实际更新
		setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));

		// 移除乐观状态
		setOptimisticItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, optimistic: false } : item)));
	};

	const removeItem = async (itemId: number) => {
		// 乐观更新：立即移除
		setOptimisticItems((prev) =>
			prev.map((item) => (item.id === itemId ? { ...item, quantity: 0, optimistic: true } : item)),
		);

		// 模拟网络请求
		await new Promise((resolve) => setTimeout(resolve, 500));

		// 实际移除
		setItems((prev) => prev.filter((item) => item.id !== itemId));
		setOptimisticItems((prev) => prev.filter((item) => item.id !== itemId));
	};

	const totalPrice = optimisticItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
			<h5 className="mb-3 font-semibold text-gray-800">🛒 购物车场景</h5>
			<div className="space-y-3">
				{optimisticItems.map((item) => (
					<div
						key={item.id}
						className={`rounded-lg border p-3 ${
							item.optimistic ? "border-yellow-200 bg-yellow-50" : "border-gray-200 bg-white"
						}`}
					>
						<div className="mb-2 flex items-center justify-between">
							<div>
								<h6 className="font-medium text-gray-900">{item.name}</h6>
								<p className="text-gray-600 text-sm">¥{item.price}</p>
							</div>
							{item.optimistic && <span className="font-medium text-xs text-yellow-600">更新中...</span>}
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() => updateQuantity(item.id, item.quantity - 1)}
								disabled={item.quantity <= 0}
								className="h-8 w-8 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
							>
								-
							</button>
							<span className="w-12 text-center font-medium">{item.quantity}</span>
							<button
								onClick={() => updateQuantity(item.id, item.quantity + 1)}
								className="h-8 w-8 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
							>
								+
							</button>
							<button onClick={() => removeItem(item.id)} className="ml-auto text-red-600 text-sm hover:text-red-700">
								删除
							</button>
						</div>
					</div>
				))}
			</div>
			<div className="mt-4 border-gray-200 border-t pt-3">
				<div className="flex items-center justify-between">
					<span className="font-semibold text-gray-900">总计：</span>
					<span className="font-bold text-blue-600 text-lg">¥{totalPrice}</span>
				</div>
			</div>
		</div>
	);
}

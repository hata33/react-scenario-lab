"use client";

import React, { useRef, useState } from "react";

export default function SimplifiedRefDemo() {
	const [traditionalInputValue, setTraditionalInputValue] = useState("");
	const [modernInputValue, setModernInputValue] = useState("");
	const [focusedInput, setFocusedInput] = useState("traditional");

	const traditionalInputRef = useRef<HTMLInputElement | null>(null);
	const modernInputRef = useRef<HTMLInputElement | null>(null);

	const focusTraditionalInput = () => {
		traditionalInputRef.current?.focus();
		setFocusedInput("traditional");
	};

	const focusModernInput = () => {
		modernInputRef.current?.focus();
		setFocusedInput("modern");
	};

	// 传统 forwardRef 组件
	const TraditionalInput = React.forwardRef<HTMLInputElement, { placeholder: string }>(
		({ placeholder }, forwardedRef) => {
			return (
				<div className="space-y-2">
					<h4 className="font-medium text-gray-700 text-sm">传统 forwardRef 输入框</h4>
					<input
						ref={forwardedRef}
						type="text"
						value={traditionalInputValue}
						onChange={(e) => setTraditionalInputValue(e.target.value)}
						placeholder={placeholder}
						className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							focusedInput === "traditional"
								? "border-blue-500 ring-2 ring-blue-500"
								: "border-gray-300"
						}`}
					/>
					<p className="text-gray-500 text-xs">需要通过 forwardRef 包装才能接收 ref</p>
				</div>
			);
		},
	);

	// React 19 现代组件
	const ModernInput = ({
		placeholder,
		ref,
	}: {
		placeholder: string;
		ref: React.Ref<HTMLInputElement>;
	}) => {
		return (
			<div className="space-y-2">
				<h4 className="font-medium text-gray-700 text-sm">React 19 直接 ref 属性输入框</h4>
				<input
					ref={ref}
					type="text"
					value={modernInputValue}
					onChange={(e) => setModernInputValue(e.target.value)}
					placeholder={placeholder}
					className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
						focusedInput === "modern"
							? "border-green-500 ring-2 ring-green-500"
							: "border-gray-300"
					}`}
				/>
				<p className="text-gray-500 text-xs">直接接收 ref 作为普通属性</p>
			</div>
		);
	};

	return (
		<div className="grid gap-6 md:grid-cols-2">
			<div className="rounded-md bg-gray-50 p-4">
				<h4 className="mb-4 font-semibold text-gray-900">传统方式 (需要 forwardRef)</h4>
				<div className="space-y-4">
					<TraditionalInput ref={traditionalInputRef} placeholder="传统输入框 - 使用 forwardRef" />
					<button
						onClick={focusTraditionalInput}
						className="w-full rounded-md bg-red-500 py-2 text-white transition-colors hover:bg-red-600"
					>
						聚焦传统输入框
					</button>
					<div className="text-gray-600 text-sm">
						<p>输入内容: {traditionalInputValue || "(空)"}</p>
						<p>聚焦状态: {focusedInput === "traditional" ? "✅ 已聚焦" : "❌ 未聚焦"}</p>
					</div>
				</div>
			</div>

			<div className="rounded-md bg-gray-50 p-4">
				<h4 className="mb-4 font-semibold text-gray-900">React 19 新方式 (ref 作为属性)</h4>
				<div className="space-y-4">
					<ModernInput ref={modernInputRef} placeholder="现代输入框 - ref 作为属性" />
					<button
						onClick={focusModernInput}
						className="w-full rounded-md bg-green-500 py-2 text-white transition-colors hover:bg-green-600"
					>
						聚焦现代输入框
					</button>
					<div className="text-gray-600 text-sm">
						<p>输入内容: {modernInputValue || "(空)"}</p>
						<p>聚焦状态: {focusedInput === "modern" ? "✅ 已聚焦" : "❌ 未聚焦"}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
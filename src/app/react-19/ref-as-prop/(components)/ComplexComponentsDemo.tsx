"use client";

import React, { type ChangeEvent, useRef, useState } from "react";

// 表单字段组件
const FormField = <T extends HTMLInputElement | HTMLTextAreaElement>({
	label,
	type = "text",
	ref,
	error,
	...props
}: {
	label: string;
	type?: string;
	ref: React.Ref<T>;
	error?: string;
	[key: string]: any;
}) => {
	return (
		<div className="space-y-1">
			<label className="block font-medium text-gray-700 text-sm">{label}</label>
			{type === "textarea" ? (
				<textarea
					ref={ref as React.RefObject<HTMLTextAreaElement>}
					className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
						error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
					}`}
					{...props}
				/>
			) : (
				<input
					ref={ref as React.RefObject<HTMLInputElement>}
					type={type}
					className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
						error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
					}`}
					{...props}
				/>
			)}
			{error && <span className="text-red-500 text-sm">{error}</span>}
		</div>
	);
};

// 可编辑文本组件
const EditableText = ({
	value,
	onChange,
	ref,
	placeholder,
}: {
	value: string;
	onChange: (value: string) => void;
	ref: React.Ref<HTMLTextAreaElement>;
	placeholder: string;
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value);

	const handleSave = () => {
		onChange(editValue);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditValue(value);
		setIsEditing(false);
	};

	return (
		<div className="space-y-2">
			<label className="block font-medium text-gray-700 text-sm">可编辑文本</label>
			{isEditing ? (
				<div className="space-y-2">
					<textarea
						ref={ref as React.RefObject<HTMLTextAreaElement>}
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						placeholder={placeholder}
						className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows={4}
					/>
					<div className="flex gap-2">
						<button onClick={handleSave} className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600">
							保存
						</button>
						<button onClick={handleCancel} className="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600">
							取消
						</button>
					</div>
				</div>
			) : (
				<div
					className="w-full cursor-pointer rounded-md border px-3 py-2 transition-colors hover:bg-gray-50"
					onClick={() => setIsEditing(true)}
				>
					{value || <span className="text-gray-400">点击编辑</span>}
				</div>
			)}
		</div>
	);
};

export default function ComplexComponentsDemo() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		message: "",
		agree: false,
	});

	const formRef = useRef<HTMLFormElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const messageRef = useRef<HTMLTextAreaElement>(null);
	const agreeRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert("表单提交成功！");
	};

	const focusFirstError = () => {
		if (!formData.username) {
			usernameRef.current?.focus();
		} else if (!formData.email) {
			emailRef.current?.focus();
		} else if (!formData.message) {
			messageRef.current?.focus();
		}
	};

	return (
		<form ref={formRef} onSubmit={handleSubmit} className="max-w-md space-y-4">
			<FormField
				label="用户名"
				name="username"
				ref={usernameRef}
				value={formData.username}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, username: e.target.value })}
				placeholder="请输入用户名"
				error={!formData.username ? "用户名是必填项" : undefined}
			/>

			<FormField
				label="邮箱"
				name="email"
				type="email"
				ref={emailRef}
				value={formData.email}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
				placeholder="请输入邮箱"
				error={!formData.email ? "邮箱是必填项" : undefined}
			/>

			<EditableText
				ref={messageRef}
				value={formData.message}
				onChange={(value) => setFormData({ ...formData, message: value })}
				placeholder="点击编辑消息内容"
			/>

			<div className="flex items-center">
				<FormField
					label=""
					type="checkbox"
					ref={agreeRef}
					checked={formData.agree}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, agree: e.target.checked })}
				/>
				<label className="text-gray-700 text-sm">我同意服务条款和隐私政策</label>
			</div>

			<div className="flex gap-2">
				<button type="submit" className="flex-1 rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600">
					提交表单
				</button>
				<button
					type="button"
					onClick={focusFirstError}
					className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
				>
					聚焦第一个错误字段
				</button>
			</div>
		</form>
	);
}

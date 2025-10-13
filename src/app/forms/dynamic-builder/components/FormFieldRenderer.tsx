"use client";

import React from "react";
import { FormField } from "../types";
import {
	UploadIcon,
	Star,
	Calendar,
	Clock,
	MapPin,
	Users,
	CreditCard,
	Trash2,
	Grid3x3,
	List,
	Type,
	FileText,
	Target,
	CheckCircle,
	Check,
} from "lucide-react";

interface FormFieldRendererProps {
	field: FormField;
	value: any;
	onChange: (value: any) => void;
	error?: string;
}

const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
	field,
	value,
	onChange,
	error,
}) => {
	const renderField = () => {
		switch (field.type) {
			case "text":
			case "email":
			case "password":
			case "number":
			case "tel":
			case "url":
				return (
					<input
						type={field.type}
						name={field.name}
						placeholder={field.placeholder}
						value={value || ""}
						onChange={(e) => onChange(e.target.value)}
						disabled={field.disabled}
						required={field.required}
						className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
							error ? "border-red-500" : "border-gray-300"
						} ${field.disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
					/>
				);

			case "textarea":
				return (
					<textarea
						name={field.name}
						placeholder={field.placeholder}
						value={value || ""}
						onChange={(e) => onChange(e.target.value)}
						disabled={field.disabled}
						required={field.required}
						rows={4}
						className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
							error ? "border-red-500" : "border-gray-300"
						} ${field.disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
					/>
				);

			case "rich-text":
				return (
					<div className="border rounded-lg p-2">
						<div className="border-b p-2 mb-2 flex gap-2">
							<button
								type="button"
								className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
							>
								B
							</button>
							<button
								type="button"
								className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
							>
								I
							</button>
							<button
								type="button"
								className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
							>
								U
							</button>
						</div>
						<div
							contentEditable
							className="min-h-[100px] p-2 focus:outline-none"
							onInput={(e) => onChange(e.currentTarget.innerHTML)}
							dangerouslySetInnerHTML={{ __html: value || "" }}
						/>
					</div>
				);

			case "select":
				return (
					<select
						name={field.name}
						value={value || ""}
						onChange={(e) => onChange(e.target.value)}
						disabled={field.disabled}
						required={field.required}
						className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
							error ? "border-red-500" : "border-gray-300"
						} ${field.disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
					>
						<option value="">{field.placeholder || "请选择"}</option>
						{field.options?.map((option) => (
							<option
								key={option.value}
								value={option.value}
								disabled={option.disabled}
							>
								{option.label}
							</option>
						))}
					</select>
				);

			case "multiselect":
				return (
					<div className="space-y-2">
						{field.options?.map((option) => (
							<label key={option.value} className="flex items-center space-x-2">
								<input
									type="checkbox"
									checked={Array.isArray(value) && value.includes(option.value)}
									onChange={(e) => {
										const currentValue = Array.isArray(value) ? value : [];
										if (e.target.checked) {
											onChange([...currentValue, option.value]);
										} else {
											onChange(currentValue.filter((v) => v !== option.value));
										}
									}}
									disabled={field.disabled || option.disabled}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<span className={option.disabled ? "text-gray-400" : ""}>
									{option.label}
								</span>
							</label>
						))}
					</div>
				);

			case "radio":
				return (
					<div className="space-y-2">
						{field.options?.map((option) => (
							<label key={option.value} className="flex items-center space-x-2">
								<input
									type="radio"
									name={field.name}
									value={option.value}
									checked={value === option.value}
									onChange={(e) => onChange(e.target.value)}
									disabled={field.disabled || option.disabled}
									className="text-blue-600 focus:ring-blue-500"
								/>
								<span className={option.disabled ? "text-gray-400" : ""}>
									{option.label}
								</span>
							</label>
						))}
					</div>
				);

			case "checkbox":
				return (
					<label className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={!!value}
							onChange={(e) => onChange(e.target.checked)}
							disabled={field.disabled}
							className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<span>{field.label}</span>
					</label>
				);

			case "switch":
				return (
					<button
						type="button"
						onClick={() => onChange(!value)}
						disabled={field.disabled}
						className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
							value ? "bg-blue-600" : "bg-gray-200"
						} ${field.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
					>
						<span
							className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								value ? "translate-x-6" : "translate-x-1"
							}`}
						/>
					</button>
				);

			case "date":
				return (
					<input
						type="date"
						name={field.name}
						value={value || ""}
						onChange={(e) => onChange(e.target.value)}
						disabled={field.disabled}
						required={field.required}
						className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
							error ? "border-red-500" : "border-gray-300"
						} ${field.disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
					/>
				);

			case "datetime":
				return (
					<input
						type="datetime-local"
						name={field.name}
						value={value || ""}
						onChange={(e) => onChange(e.target.value)}
						disabled={field.disabled}
						required={field.required}
						className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
							error ? "border-red-500" : "border-gray-300"
						} ${field.disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
					/>
				);

			case "time":
				return (
					<input
						type="time"
						name={field.name}
						value={value || ""}
						onChange={(e) => onChange(e.target.value)}
						disabled={field.disabled}
						required={field.required}
						className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
							error ? "border-red-500" : "border-gray-300"
						} ${field.disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
					/>
				);

			case "daterange":
				return (
					<div className="flex gap-2">
						<input
							type="date"
							placeholder="开始日期"
							value={value?.start || ""}
							onChange={(e) => onChange({ ...value, start: e.target.value })}
							disabled={field.disabled}
							className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
								error ? "border-red-500" : "border-gray-300"
							} ${field.disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
						/>
						<input
							type="date"
							placeholder="结束日期"
							value={value?.end || ""}
							onChange={(e) => onChange({ ...value, end: e.target.value })}
							disabled={field.disabled}
							className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
								error ? "border-red-500" : "border-gray-300"
							} ${field.disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
						/>
					</div>
				);

			case "file":
			case "image":
			case "video":
			case "audio":
				return (
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
						<UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
						<div className="mt-2">
							<p className="text-sm text-gray-600">
								点击上传或拖拽文件到此区域
							</p>
							<p className="text-xs text-gray-500">
								{field.type === "image" && "支持 PNG, JPG, GIF 格式"}
								{field.type === "video" && "支持 MP4, AVI, MOV 格式"}
								{field.type === "audio" && "支持 MP3, WAV, AAC 格式"}
								{field.type === "file" && "支持所有文件格式"}
							</p>
						</div>
						<input
							type="file"
							accept={
								field.type === "image"
									? "image/*"
									: field.type === "video"
										? "video/*"
										: field.type === "audio"
											? "audio/*"
											: "*"
							}
							onChange={(e) => onChange(e.target.files?.[0])}
							disabled={field.disabled}
							className="hidden"
							id={`file-${field.id}`}
						/>
						<label
							htmlFor={`file-${field.id}`}
							className={`mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer ${
								field.disabled ? "opacity-50 cursor-not-allowed" : ""
							}`}
						>
							选择文件
						</label>
						{value && (
							<div className="mt-2 text-sm text-gray-600">
								已选择: {value.name}
							</div>
						)}
					</div>
				);

			case "range":
				return (
					<div className="space-y-2">
						<input
							type="range"
							min={field.validation.find((v) => v.type === "min")?.value || 0}
							max={field.validation.find((v) => v.type === "max")?.value || 100}
							value={value || 0}
							onChange={(e) => onChange(Number(e.target.value))}
							disabled={field.disabled}
							className="w-full"
						/>
						<div className="text-center text-sm text-gray-600">
							{value || 0}
						</div>
					</div>
				);

			case "rating":
				return (
					<div className="flex space-x-1">
						{[1, 2, 3, 4, 5].map((star) => (
							<button
								key={star}
								type="button"
								onClick={() => onChange(star)}
								disabled={field.disabled}
								className="focus:outline-none"
							>
								<Star
									className={`w-6 h-6 ${
										star <= (value || 0)
											? "text-yellow-400 fill-current"
											: "text-gray-300"
									} ${field.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:text-yellow-400"}`}
								/>
							</button>
						))}
					</div>
				);

			case "color":
				return (
					<input
						type="color"
						value={value || "#000000"}
						onChange={(e) => onChange(e.target.value)}
						disabled={field.disabled}
						className="h-10 w-20 border rounded cursor-pointer"
					/>
				);

			case "address":
				return (
					<div className="space-y-3">
						<input
							type="text"
							placeholder="街道地址"
							value={value?.street || ""}
							onChange={(e) => onChange({ ...value, street: e.target.value })}
							disabled={field.disabled}
							className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						<div className="grid grid-cols-2 gap-3">
							<input
								type="text"
								placeholder="城市"
								value={value?.city || ""}
								onChange={(e) => onChange({ ...value, city: e.target.value })}
								disabled={field.disabled}
								className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
							<input
								type="text"
								placeholder="省份"
								value={value?.state || ""}
								onChange={(e) => onChange({ ...value, state: e.target.value })}
								disabled={field.disabled}
								className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<input
								type="text"
								placeholder="邮政编码"
								value={value?.zipCode || ""}
								onChange={(e) =>
									onChange({ ...value, zipCode: e.target.value })
								}
								disabled={field.disabled}
								className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
							<input
								type="text"
								placeholder="国家"
								value={value?.country || ""}
								onChange={(e) =>
									onChange({ ...value, country: e.target.value })
								}
								disabled={field.disabled}
								className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
					</div>
				);

			case "contact":
				return (
					<div className="space-y-3">
						<input
							type="text"
							placeholder="姓名"
							value={value?.name || ""}
							onChange={(e) => onChange({ ...value, name: e.target.value })}
							disabled={field.disabled}
							className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						<input
							type="email"
							placeholder="邮箱"
							value={value?.email || ""}
							onChange={(e) => onChange({ ...value, email: e.target.value })}
							disabled={field.disabled}
							className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						<input
							type="tel"
							placeholder="电话"
							value={value?.phone || ""}
							onChange={(e) => onChange({ ...value, phone: e.target.value })}
							disabled={field.disabled}
							className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						<input
							type="text"
							placeholder="职位"
							value={value?.position || ""}
							onChange={(e) => onChange({ ...value, position: e.target.value })}
							disabled={field.disabled}
							className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
				);

			case "payment":
				return (
					<div className="space-y-3">
						<input
							type="text"
							placeholder="持卡人姓名"
							value={value?.cardholderName || ""}
							onChange={(e) =>
								onChange({ ...value, cardholderName: e.target.value })
							}
							disabled={field.disabled}
							className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						<input
							type="text"
							placeholder="卡号"
							value={value?.cardNumber || ""}
							onChange={(e) =>
								onChange({ ...value, cardNumber: e.target.value })
							}
							disabled={field.disabled}
							maxLength={19}
							className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						<div className="grid grid-cols-2 gap-3">
							<input
								type="text"
								placeholder="MM/YY"
								value={value?.expiry || ""}
								onChange={(e) => onChange({ ...value, expiry: e.target.value })}
								disabled={field.disabled}
								maxLength={5}
								className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
							<input
								type="text"
								placeholder="CVV"
								value={value?.cvv || ""}
								onChange={(e) => onChange({ ...value, cvv: e.target.value })}
								disabled={field.disabled}
								maxLength={4}
								className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
					</div>
				);

			case "signature":
				return (
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
						<canvas
							width={400}
							height={200}
							className="border border-gray-400 rounded cursor-crosshair bg-white"
							onClick={() => {
								// 签名功能实现
								const canvas = document.querySelector("canvas");
								if (canvas) {
									const ctx = canvas.getContext("2d");
									if (ctx) {
										ctx.strokeStyle = "#000";
										ctx.lineWidth = 2;
										ctx.beginPath();
										// 这里应该实现实际的签名功能
									}
								}
							}}
						/>
						<p className="text-sm text-gray-500 mt-2 text-center">
							请在上方区域签名
						</p>
					</div>
				);

			case "table":
				return (
					<div className="border rounded-lg overflow-hidden">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										列1
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										列2
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										操作
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								<tr>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										<input type="text" className="border rounded px-2 py-1" />
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										<input type="text" className="border rounded px-2 py-1" />
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										<button
											type="button"
											className="text-red-600 hover:text-red-900"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</td>
								</tr>
							</tbody>
						</table>
						<button
							type="button"
							className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700"
						>
							+ 添加行
						</button>
					</div>
				);

			case "repeater":
				return (
					<div className="space-y-4">
						<div className="border rounded-lg p-4 bg-gray-50">
							<div className="flex justify-between items-center mb-3">
								<h4 className="font-medium">重复项 #1</h4>
								<button
									type="button"
									className="text-red-600 hover:text-red-900"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
							<div className="space-y-3">
								<input
									type="text"
									placeholder="字段1"
									className="w-full px-4 py-2 border rounded-lg"
								/>
								<input
									type="text"
									placeholder="字段2"
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
						</div>
						<button
							type="button"
							className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 text-sm font-medium text-blue-700 rounded-lg"
						>
							+ 添加项目
						</button>
					</div>
				);

			case "divider":
				return <hr className="my-6 border-gray-300" />;

			case "heading":
				return (
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						{field.label || "标题"}
					</h3>
				);

			case "paragraph":
				return (
					<p className="text-gray-600 mb-4">
						{field.description || "段落文本内容"}
					</p>
				);

			default:
				return (
					<input
						type="text"
						placeholder="未知字段类型"
						disabled
						className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
					/>
				);
		}
	};

	return (
		<div className={`space-y-2 ${field.styling?.className || ""}`}>
			{field.type !== "divider" &&
				field.type !== "heading" &&
				field.type !== "paragraph" && (
					<label className="block text-sm font-medium text-gray-700">
						{field.label}
						{field.required && <span className="text-red-500 ml-1">*</span>}
					</label>
				)}

			{renderField()}

			{field.description && (
				<p className="text-sm text-gray-500">{field.description}</p>
			)}

			{error && <p className="text-sm text-red-600">{error}</p>}
		</div>
	);
};

export default FormFieldRenderer;

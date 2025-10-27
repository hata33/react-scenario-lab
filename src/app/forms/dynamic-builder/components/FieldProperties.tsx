"use client";

import { Settings, Trash2 } from "lucide-react";
import type React from "react";
import type { FieldOption, FormField } from "../types";

interface FieldPropertiesProps {
	selectedField: FormField | null;
	onFieldUpdate: (fieldId: string, updates: Partial<FormField>) => void;
	validationResults?: Record<string, any>;
}

const FieldProperties: React.FC<FieldPropertiesProps> = ({ selectedField, onFieldUpdate, validationResults }) => {
	if (!selectedField) {
		return (
			<div className="rounded-lg border bg-white shadow-sm">
				<div className="border-b p-4">
					<h3 className="font-medium text-gray-900">字段属性</h3>
				</div>

				<div className="p-4">
					<div className="py-8 text-center text-gray-500">
						<Settings className="mx-auto mb-4 h-12 w-12 text-gray-300" />
						<p>选择一个字段来编辑属性</p>
					</div>
				</div>
			</div>
		);
	}

	const handleLabelChange = (label: string) => {
		onFieldUpdate(selectedField.id, { label });
	};

	const handleNameChange = (name: string) => {
		onFieldUpdate(selectedField.id, { name });
	};

	const handlePlaceholderChange = (placeholder: string) => {
		onFieldUpdate(selectedField.id, { placeholder });
	};

	const handleDescriptionChange = (description: string) => {
		onFieldUpdate(selectedField.id, { description });
	};

	const handleRequiredChange = (required: boolean) => {
		onFieldUpdate(selectedField.id, { required });
	};

	const handleDisabledChange = (disabled: boolean) => {
		onFieldUpdate(selectedField.id, { disabled });
	};

	const handleOptionChange = (index: number, field: keyof FieldOption, value: string) => {
		const newOptions = [...(selectedField.options || [])];
		newOptions[index] = { ...newOptions[index], [field]: value };
		onFieldUpdate(selectedField.id, { options: newOptions });
	};

	const handleOptionDelete = (index: number) => {
		const newOptions = selectedField.options?.filter((_, i) => i !== index) || [];
		onFieldUpdate(selectedField.id, { options: newOptions });
	};

	const handleOptionAdd = () => {
		const newOptions = [...(selectedField.options || []), { label: "", value: "" }];
		onFieldUpdate(selectedField.id, { options: newOptions });
	};

	return (
		<div className="rounded-lg border bg-white shadow-sm">
			<div className="border-b p-4">
				<h3 className="font-medium text-gray-900">字段属性</h3>
			</div>

			<div className="p-4">
				<div className="space-y-4">
					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">字段标签</label>
						<input
							type="text"
							value={selectedField.label}
							onChange={(e) => handleLabelChange(e.target.value)}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">字段名称</label>
						<input
							type="text"
							value={selectedField.name}
							onChange={(e) => handleNameChange(e.target.value)}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">占位符</label>
						<input
							type="text"
							value={selectedField.placeholder || ""}
							onChange={(e) => handlePlaceholderChange(e.target.value)}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">描述</label>
						<textarea
							value={selectedField.description || ""}
							onChange={(e) => handleDescriptionChange(e.target.value)}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							rows={3}
						/>
					</div>

					<div className="flex items-center space-x-4">
						<label className="flex items-center space-x-2">
							<input
								type="checkbox"
								checked={selectedField.required}
								onChange={(e) => handleRequiredChange(e.target.checked)}
								className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<span className="text-gray-700 text-sm">必填</span>
						</label>

						<label className="flex items-center space-x-2">
							<input
								type="checkbox"
								checked={selectedField.disabled}
								onChange={(e) => handleDisabledChange(e.target.checked)}
								className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<span className="text-gray-700 text-sm">禁用</span>
						</label>
					</div>

					{selectedField.options && (
						<div>
							<label className="mb-1 block font-medium text-gray-700 text-sm">选项</label>
							<div className="space-y-2">
								{selectedField.options.map((option, index) => (
									<div key={index} className="flex space-x-2">
										<input
											type="text"
											value={option.label}
											onChange={(e) => handleOptionChange(index, "label", e.target.value)}
											className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
											placeholder="标签"
										/>
										<input
											type="text"
											value={option.value}
											onChange={(e) => handleOptionChange(index, "value", e.target.value)}
											className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
											placeholder="值"
										/>
										<button onClick={() => handleOptionDelete(index)} className="text-red-500 hover:text-red-700">
											<Trash2 className="h-4 w-4" />
										</button>
									</div>
								))}
								<button
									onClick={handleOptionAdd}
									className="w-full rounded-lg border border-gray-300 border-dashed px-3 py-2 text-gray-600 text-sm hover:border-gray-400"
								>
									+ 添加选项
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FieldProperties;

"use client";

import React from "react";
import { FormField, FieldOption } from "../types";
import { Trash2, Settings } from "lucide-react";

interface FieldPropertiesProps {
	selectedField: FormField | null;
	onFieldUpdate: (fieldId: string, updates: Partial<FormField>) => void;
	validationResults?: Record<string, any>;
}

const FieldProperties: React.FC<FieldPropertiesProps> = ({
	selectedField,
	onFieldUpdate,
	validationResults,
}) => {
	if (!selectedField) {
		return (
			<div className="bg-white rounded-lg shadow-sm border">
				<div className="p-4 border-b">
					<h3 className="font-medium text-gray-900">字段属性</h3>
				</div>

				<div className="p-4">
					<div className="text-center text-gray-500 py-8">
						<Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
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

	const handleOptionChange = (
		index: number,
		field: keyof FieldOption,
		value: string,
	) => {
		const newOptions = [...(selectedField.options || [])];
		newOptions[index] = { ...newOptions[index], [field]: value };
		onFieldUpdate(selectedField.id, { options: newOptions });
	};

	const handleOptionDelete = (index: number) => {
		const newOptions =
			selectedField.options?.filter((_, i) => i !== index) || [];
		onFieldUpdate(selectedField.id, { options: newOptions });
	};

	const handleOptionAdd = () => {
		const newOptions = [
			...(selectedField.options || []),
			{ label: "", value: "" },
		];
		onFieldUpdate(selectedField.id, { options: newOptions });
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border">
			<div className="p-4 border-b">
				<h3 className="font-medium text-gray-900">字段属性</h3>
			</div>

			<div className="p-4">
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							字段标签
						</label>
						<input
							type="text"
							value={selectedField.label}
							onChange={(e) => handleLabelChange(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							字段名称
						</label>
						<input
							type="text"
							value={selectedField.name}
							onChange={(e) => handleNameChange(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							占位符
						</label>
						<input
							type="text"
							value={selectedField.placeholder || ""}
							onChange={(e) => handlePlaceholderChange(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							描述
						</label>
						<textarea
							value={selectedField.description || ""}
							onChange={(e) => handleDescriptionChange(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
							<span className="text-sm text-gray-700">必填</span>
						</label>

						<label className="flex items-center space-x-2">
							<input
								type="checkbox"
								checked={selectedField.disabled}
								onChange={(e) => handleDisabledChange(e.target.checked)}
								className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<span className="text-sm text-gray-700">禁用</span>
						</label>
					</div>

					{selectedField.options && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								选项
							</label>
							<div className="space-y-2">
								{selectedField.options.map((option, index) => (
									<div key={index} className="flex space-x-2">
										<input
											type="text"
											value={option.label}
											onChange={(e) =>
												handleOptionChange(index, "label", e.target.value)
											}
											className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
											placeholder="标签"
										/>
										<input
											type="text"
											value={option.value}
											onChange={(e) =>
												handleOptionChange(index, "value", e.target.value)
											}
											className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
											placeholder="值"
										/>
										<button
											onClick={() => handleOptionDelete(index)}
											className="text-red-500 hover:text-red-700"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								))}
								<button
									onClick={handleOptionAdd}
									className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400"
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

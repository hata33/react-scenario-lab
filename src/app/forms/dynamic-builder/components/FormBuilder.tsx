"use client";

import { ChevronDown, ChevronRight, GripVertical, Trash2 } from "lucide-react";
import React from "react";
import { FIELD_TYPES } from "../constants";
import { FormConfig, FormField, FormSection } from "../types";
import FieldIcon from "./FieldIcon";
import FormFieldRenderer from "./FormFieldRenderer";

interface FormBuilderProps {
	formConfig: FormConfig;
	onConfigChange: (config: FormConfig) => void;
	onFieldSelect: (field: FormField) => void;
	onFieldDelete: (fieldId: string) => void;
	selectedField: FormField | null;
	formData: Record<string, any>;
	onFieldChange: (fieldName: string, value: any) => void;
	errors: Record<string, string>;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
	formConfig,
	onConfigChange,
	onFieldSelect,
	onFieldDelete,
	selectedField,
	formData,
	onFieldChange,
	errors,
}) => {
	const handleTitleChange = (title: string) => {
		onConfigChange({ ...formConfig, title });
	};

	const handleDescriptionChange = (description: string) => {
		onConfigChange({ ...formConfig, description });
	};

	const toggleSectionCollapse = (sectionId: string) => {
		onConfigChange({
			...formConfig,
			sections: formConfig.sections.map((section) =>
				section.id === sectionId
					? { ...section, collapsed: !section.collapsed }
					: section,
			),
		});
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border">
			<div className="p-6 border-b">
				<input
					type="text"
					value={formConfig.title}
					onChange={(e) => handleTitleChange(e.target.value)}
					className="text-xl font-semibold bg-transparent border-none focus:outline-none w-full"
					placeholder="表单标题"
				/>
				<textarea
					value={formConfig.description}
					onChange={(e) => handleDescriptionChange(e.target.value)}
					className="w-full mt-2 text-sm text-gray-600 bg-transparent border-none focus:outline-none resize-none"
					placeholder="表单描述"
					rows={2}
				/>
			</div>

			<div className="p-6">
				{formConfig.sections.map((section, sectionIndex) => (
					<div key={section.id} className="mb-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-medium text-gray-900">
								{section.title}
							</h3>
							<button
								onClick={() => toggleSectionCollapse(section.id)}
								className="text-gray-400 hover:text-gray-600"
							>
								{section.collapsed ? (
									<ChevronRight className="w-5 h-5" />
								) : (
									<ChevronDown className="w-5 h-5" />
								)}
							</button>
						</div>

						{!section.collapsed && (
							<div className="space-y-4">
								{section.fields.length === 0 ? (
									<div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
										<p className="text-gray-500">
											从左侧拖拽字段到这里开始构建表单
										</p>
									</div>
								) : (
									section.fields.map((field) => (
										<div
											key={field.id}
											className={`border rounded-lg p-4 hover:border-blue-300 transition-colors ${
												selectedField?.id === field.id
													? "border-blue-500 bg-blue-50"
													: "border-gray-200"
											}`}
											onClick={() => onFieldSelect(field)}
										>
											<div className="flex items-start justify-between">
												<div className="flex items-center space-x-2">
													<GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
													<span className="text-blue-600">
														<FieldIcon
															iconName={
																FIELD_TYPES.find((f) => f.type === field.type)
																	?.icon || "text"
															}
														/>
													</span>
												</div>

												<button
													onClick={(e) => {
														e.stopPropagation();
														onFieldDelete(field.id);
													}}
													className="text-red-500 hover:text-red-700"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>

											<div className="mt-3">
												<FormFieldRenderer
													field={field}
													value={formData[field.name]}
													onChange={(value) => onFieldChange(field.name, value)}
													error={errors[field.name]}
												/>
											</div>
										</div>
									))
								)}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default FormBuilder;

"use client";

import { ChevronDown, ChevronRight, GripVertical, Trash2 } from "lucide-react";
import type React from "react";
import { FIELD_TYPES } from "../constants";
import { type FormConfig, type FormField, FormSection } from "../types";
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
	onDrop?: (item: any, position: { x: number; y: number }) => void;
	validationResults?: Record<string, any>;
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
	onDrop,
	validationResults,
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
				section.id === sectionId ? { ...section, collapsed: !section.collapsed } : section,
			),
		});
	};

	return (
		<div className="rounded-lg border bg-white shadow-sm">
			<div className="border-b p-6">
				<input
					type="text"
					value={formConfig.title}
					onChange={(e) => handleTitleChange(e.target.value)}
					className="w-full border-none bg-transparent font-semibold text-xl focus:outline-none"
					placeholder="表单标题"
				/>
				<textarea
					value={formConfig.description}
					onChange={(e) => handleDescriptionChange(e.target.value)}
					className="mt-2 w-full resize-none border-none bg-transparent text-gray-600 text-sm focus:outline-none"
					placeholder="表单描述"
					rows={2}
				/>
			</div>

			<div className="p-6">
				{formConfig.sections.map((section, sectionIndex) => (
					<div key={section.id} className="mb-6">
						<div className="mb-4 flex items-center justify-between">
							<h3 className="font-medium text-gray-900 text-lg">{section.title}</h3>
							<button onClick={() => toggleSectionCollapse(section.id)} className="text-gray-400 hover:text-gray-600">
								{section.collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
							</button>
						</div>

						{!section.collapsed && (
							<div className="space-y-4">
								{section.fields.length === 0 ? (
									<div className="rounded-lg border-2 border-gray-300 border-dashed p-8 text-center">
										<p className="text-gray-500">从左侧拖拽字段到这里开始构建表单</p>
									</div>
								) : (
									section.fields.map((field) => (
										<div
											key={field.id}
											className={`rounded-lg border p-4 transition-colors hover:border-blue-300 ${
												selectedField?.id === field.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
											}`}
											onClick={() => onFieldSelect(field)}
										>
											<div className="flex items-start justify-between">
												<div className="flex items-center space-x-2">
													<GripVertical className="h-5 w-5 cursor-move text-gray-400" />
													<span className="text-blue-600">
														<FieldIcon iconName={FIELD_TYPES.find((f) => f.type === field.type)?.icon || "text"} />
													</span>
												</div>

												<button
													onClick={(e) => {
														e.stopPropagation();
														onFieldDelete(field.id);
													}}
													className="text-red-500 hover:text-red-700"
												>
													<Trash2 className="h-4 w-4" />
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

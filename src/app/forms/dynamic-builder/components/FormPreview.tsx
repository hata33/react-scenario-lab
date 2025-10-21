"use client";

import React from "react";
import { FormConfig } from "../types";
import FormFieldRenderer from "./FormFieldRenderer";

interface FormPreviewProps {
	formConfig: FormConfig;
	formData: Record<string, any>;
	onFieldChange: (fieldName: string, value: any) => void;
	onSubmit: (e?: React.FormEvent) => void | Promise<boolean>;
	onReset: () => void;
	errors: Record<string, string>;
	validationResults?: Record<string, any>;
}

const FormPreview: React.FC<FormPreviewProps> = ({
	formConfig,
	formData,
	onFieldChange,
	onSubmit,
	onReset,
	errors,
	validationResults,
}) => {
	const calculateProgress = () => {
		const allFields = formConfig.sections.flatMap((section) => section.fields);
		const filledFields = allFields.filter((field) => {
			const value = formData[field.name];
			return (
				value &&
				value !== "" &&
				(Array.isArray(value) ? value.length > 0 : true)
			);
		});
		return allFields.length > 0
			? Math.round((filledFields.length / allFields.length) * 100)
			: 0;
	};

	const progress = calculateProgress();

	return (
		<div className="max-w-3xl mx-auto">
			<div className="bg-white rounded-lg shadow-sm border">
				<div className="p-6 border-b">
					<h2 className="text-2xl font-bold text-gray-900">
						{formConfig.title}
					</h2>
					{formConfig.description && (
						<p className="text-gray-600 mt-2">{formConfig.description}</p>
					)}
				</div>

				<form onSubmit={(e) => {
					e.preventDefault();
					onSubmit?.(e);
				}} className="p-6">
					{formConfig.settings.showProgressBar && (
						<div className="mb-6">
							<div className="flex justify-between text-sm text-gray-600 mb-2">
								<span>完成进度</span>
								<span>{progress}%</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-blue-600 h-2 rounded-full transition-all duration-300"
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>
					)}

					{formConfig.sections.map((section) => (
						<div key={section.id} className="mb-8">
							<h3 className="text-lg font-semibold text-gray-900 mb-4">
								{section.title}
							</h3>
							{section.description && (
								<p className="text-gray-600 mb-4">{section.description}</p>
							)}

							<div className="space-y-6">
								{section.fields.map((field) => (
									<FormFieldRenderer
										key={field.id}
										field={field}
										value={formData[field.name]}
										onChange={(value) => onFieldChange(field.name, value)}
										error={errors[field.name]}
									/>
								))}
							</div>
						</div>
					))}

					<div className="flex space-x-4">
						<button
							type="submit"
							className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
						>
							{formConfig.settings.submitButtonText}
						</button>

						<button
							type="button"
							onClick={onReset}
							className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
						>
							{formConfig.settings.resetButtonText}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FormPreview;

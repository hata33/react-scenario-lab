"use client";

import type React from "react";
import type { FormConfig } from "../types";
import FormFieldRenderer from "./FormFieldRenderer";

interface FormPreviewProps {
	formConfig: FormConfig;
	formData: Record<string, any>;
	onFieldChange: (fieldName: string, value: any) => void;
	onSubmit: (e?: React.FormEvent) => undefined | Promise<boolean>;
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
			return value && value !== "" && (Array.isArray(value) ? value.length > 0 : true);
		});
		return allFields.length > 0 ? Math.round((filledFields.length / allFields.length) * 100) : 0;
	};

	const progress = calculateProgress();

	return (
		<div className="mx-auto max-w-3xl">
			<div className="rounded-lg border bg-white shadow-sm">
				<div className="border-b p-6">
					<h2 className="font-bold text-2xl text-gray-900">{formConfig.title}</h2>
					{formConfig.description && <p className="mt-2 text-gray-600">{formConfig.description}</p>}
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit?.(e);
					}}
					className="p-6"
				>
					{formConfig.settings.showProgressBar && (
						<div className="mb-6">
							<div className="mb-2 flex justify-between text-gray-600 text-sm">
								<span>完成进度</span>
								<span>{progress}%</span>
							</div>
							<div className="h-2 w-full rounded-full bg-gray-200">
								<div
									className="h-2 rounded-full bg-blue-600 transition-all duration-300"
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>
					)}

					{formConfig.sections.map((section) => (
						<div key={section.id} className="mb-8">
							<h3 className="mb-4 font-semibold text-gray-900 text-lg">{section.title}</h3>
							{section.description && <p className="mb-4 text-gray-600">{section.description}</p>}

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
							className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
						>
							{formConfig.settings.submitButtonText}
						</button>

						<button
							type="button"
							onClick={onReset}
							className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300"
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

"use client";

import React from "react";
import { FIELD_TYPES, FORM_TEMPLATES } from "../constants";
import type { ActiveTab, FieldType, FieldTypeConfig } from "../types";
import FieldIcon from "./FieldIcon";

interface FieldLibraryProps {
	activeTab: ActiveTab;
	onTabChange: (tab: ActiveTab) => void;
	onFieldSelect: (fieldType: FieldType) => void;
	onTemplateSelect: (template: any) => void;
}

const FieldLibrary: React.FC<FieldLibraryProps> = ({ activeTab, onTabChange, onFieldSelect, onTemplateSelect }) => {
	// 按类别组织字段类型
	const fieldCategories = React.useMemo(() => {
		const categories = FIELD_TYPES.reduce(
			(acc, field) => {
				if (!acc[field.category]) {
					acc[field.category] = [];
				}
				acc[field.category].push(field);
				return acc;
			},
			{} as Record<string, FieldTypeConfig[]>,
		);

		return categories;
	}, []);

	return (
		<div className="rounded-lg border bg-white shadow-sm">
			<div className="border-b p-4">
				<div className="flex space-x-2">
					<button
						onClick={() => onTabChange("fields")}
						className={`flex-1 rounded-lg px-3 py-2 font-medium text-sm transition-colors ${
							activeTab === "fields" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
						}`}
					>
						字段库
					</button>
					<button
						onClick={() => onTabChange("templates")}
						className={`flex-1 rounded-lg px-3 py-2 font-medium text-sm transition-colors ${
							activeTab === "templates" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
						}`}
					>
						模板
					</button>
				</div>
			</div>

			<div className="max-h-[600px] overflow-y-auto p-4">
				{activeTab === "fields" && (
					<div className="space-y-4">
						{Object.entries(fieldCategories).map(([category, fields]) => (
							<div key={category}>
								<h3 className="mb-2 font-medium text-gray-900 text-sm">{category}</h3>
								<div className="space-y-1">
									{fields.map((field) => (
										<div
											key={field.type}
											onClick={() => onFieldSelect(field.type)}
											className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 transition-colors hover:bg-gray-100"
										>
											<span className="text-blue-600">
												<FieldIcon iconName={field.icon} />
											</span>
											<div className="flex-1">
												<div className="font-medium text-gray-900 text-sm">{field.label}</div>
												<div className="text-gray-500 text-xs">{field.description}</div>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				)}

				{activeTab === "templates" && (
					<div className="space-y-3">
						{FORM_TEMPLATES.map((template, index) => (
							<div
								key={index}
								className="cursor-pointer rounded-lg border p-3 hover:bg-gray-50"
								onClick={() => onTemplateSelect(template.config)}
							>
								<h4 className="font-medium text-gray-900">{template.name}</h4>
								<p className="mt-1 text-gray-600 text-sm">{template.description}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default FieldLibrary;

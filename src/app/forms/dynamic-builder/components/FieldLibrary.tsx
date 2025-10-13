"use client";

import React from "react";
import { FieldType, FieldTypeConfig, ActiveTab } from "../types";
import { FIELD_TYPES, FORM_TEMPLATES } from "../constants";
import FieldIcon from "./FieldIcon";

interface FieldLibraryProps {
	activeTab: ActiveTab;
	onTabChange: (tab: ActiveTab) => void;
	onFieldSelect: (fieldType: FieldType) => void;
	onTemplateSelect: (template: any) => void;
}

const FieldLibrary: React.FC<FieldLibraryProps> = ({
	activeTab,
	onTabChange,
	onFieldSelect,
	onTemplateSelect,
}) => {
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
		<div className="bg-white rounded-lg shadow-sm border">
			<div className="p-4 border-b">
				<div className="flex space-x-2">
					<button
						onClick={() => onTabChange("fields")}
						className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
							activeTab === "fields"
								? "bg-blue-600 text-white"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200"
						}`}
					>
						字段库
					</button>
					<button
						onClick={() => onTabChange("templates")}
						className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
							activeTab === "templates"
								? "bg-blue-600 text-white"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200"
						}`}
					>
						模板
					</button>
				</div>
			</div>

			<div className="p-4 max-h-[600px] overflow-y-auto">
				{activeTab === "fields" && (
					<div className="space-y-4">
						{Object.entries(fieldCategories).map(([category, fields]) => (
							<div key={category}>
								<h3 className="font-medium text-gray-900 mb-2 text-sm">
									{category}
								</h3>
								<div className="space-y-1">
									{fields.map((field) => (
										<div
											key={field.type}
											onClick={() => onFieldSelect(field.type)}
											className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
										>
											<span className="text-blue-600">
												<FieldIcon iconName={field.icon} />
											</span>
											<div className="flex-1">
												<div className="text-sm font-medium text-gray-900">
													{field.label}
												</div>
												<div className="text-xs text-gray-500">
													{field.description}
												</div>
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
								className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
								onClick={() => onTemplateSelect(template.config)}
							>
								<h4 className="font-medium text-gray-900">{template.name}</h4>
								<p className="text-sm text-gray-600 mt-1">
									{template.description}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default FieldLibrary;

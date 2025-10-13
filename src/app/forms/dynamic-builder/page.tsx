"use client";

import React from "react";
import { useFormManager } from "./hooks/useFormManager";
import FormHeader from "./components/FormHeader";
import FieldLibrary from "./components/FieldLibrary";
import FormBuilder from "./components/FormBuilder";
import FieldProperties from "./components/FieldProperties";
import FormPreview from "./components/FormPreview";

export default function DynamicFormBuilder() {
	const {
		mode,
		activeTab,
		formConfig,
		formData,
		errors,
		selectedField,
		fileInputRef,
		setActiveTab,
		setFormConfig,
		handleFieldChange,
		setSelectedField,
		addField,
		deleteField,
		updateField,
		exportForm,
		importForm,
		loadTemplate,
		handleSubmit,
		resetForm,
		toggleMode,
	} = useFormManager();

	return (
		<div className="min-h-screen bg-gray-50">
			{/* 头部导航 */}
			<FormHeader
				mode={mode}
				onModeToggle={toggleMode}
				onExport={exportForm}
				onImport={importForm}
				fileInputRef={fileInputRef}
			/>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{mode === "builder" ? (
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
						{/* 左侧：字段选择器 */}
						<div className="lg:col-span-1">
							<FieldLibrary
								activeTab={activeTab}
								onTabChange={setActiveTab}
								onFieldSelect={addField}
								onTemplateSelect={loadTemplate}
							/>
						</div>

						{/* 中间：表单构建区 */}
						<div className="lg:col-span-2">
							<FormBuilder
								formConfig={formConfig}
								onConfigChange={setFormConfig}
								onFieldSelect={setSelectedField}
								onFieldDelete={deleteField}
								selectedField={selectedField}
								formData={formData}
								onFieldChange={handleFieldChange}
								errors={errors}
							/>
						</div>

						{/* 右侧：字段属性编辑器 */}
						<div className="lg:col-span-1">
							<FieldProperties
								selectedField={selectedField}
								onFieldUpdate={updateField}
							/>
						</div>
					</div>
				) : (
					/* 预览模式 */
					<FormPreview
						formConfig={formConfig}
						formData={formData}
						onFieldChange={handleFieldChange}
						onSubmit={handleSubmit}
						onReset={resetForm}
						errors={errors}
					/>
				)}
			</div>
		</div>
	);
}

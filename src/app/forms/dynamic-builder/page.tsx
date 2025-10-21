"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useFormManager } from "./hooks/useFormManager";
import FormHeader from "./components/FormHeader";
import FieldLibrary from "./components/FieldLibrary";
import FormBuilder from "./components/FormBuilder";
import FieldProperties from "./components/FieldProperties";
import FormPreview from "./components/FormPreview";
import Layout from "@/components/Layout";
import { OptimizedDndProvider } from "@/components/forms/builder/drag-drop-system";
import { validationEngine, builtInRules } from "@/components/forms/validation/validation-engine";
import { FormSchema, FormField as DynamicFormField, ConditionEvaluator, SchemaValidator } from "@/components/forms/dynamic-form/form-schema";
import { FormField as BuilderFormField } from "./types";
import VirtualFormRenderer from "@/components/forms/virtualization/virtual-form-renderer";

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

	// 增强功能状态
	const [validationResults, setValidationResults] = useState<Record<string, any>>({});
	const [isVirtualMode, setIsVirtualMode] = useState(false);
	const [complexValidation, setComplexValidation] = useState(false);

	// 转换表单配置为动态表单schema
	const convertToFormSchema = useCallback((config: any): FormSchema => {
		return {
			id: config.id,
			title: config.title,
			description: config.description,
			sections: config.sections.map((section: any) => ({
				id: section.id,
				title: section.title,
				description: section.description,
				fields: section.fields.map((field: BuilderFormField): DynamicFormField => ({
					id: field.id,
					type: field.type as any,
					name: field.name,
					label: field.label,
					placeholder: field.placeholder,
					description: field.description,
					defaultValue: field.defaultValue,
					options: field.options,
					validation: field.validation && Array.isArray(field.validation) ? undefined : field.validation,
					dependency: field.conditional ? {
						showWhen: field.conditional ? [{
							field: field.conditional.field,
							operator: field.conditional.operator as any,
							value: field.conditional.value
						}] : undefined
					} : undefined,
					props: field.advanced || {}
				}))
			}))
		};
	}, []);

	// 计算表单复杂度指标
	const complexityMetrics = useMemo(() => {
		const totalFields = formConfig.sections?.reduce((sum, section) =>
			sum + (section.fields?.length || 0), 0
		) || 0;

		const hasComplexValidation = formConfig.sections?.some(section =>
			section.fields?.some(field =>
				(field.validation && 'custom' in field.validation && field.validation.custom) || field.conditional
			)
		) || false;

		const hasDependencies = formConfig.sections?.some(section =>
			section.fields?.some(field => field.conditional)
		) || false;

		return {
			totalFields,
			isComplex: totalFields > 50 || hasComplexValidation,
			hasDependencies,
			estimatedRenderTime: totalFields > 100 ? totalFields * 2 : totalFields
		};
	}, [formConfig]);

	// 自动决定是否启用虚拟化渲染
	useEffect(() => {
		setIsVirtualMode(complexityMetrics.totalFields > 100);
	}, [complexityMetrics.totalFields]);

	// 增强验证功能
	const enhancedValidateForm = useCallback(async () => {
		if (!formConfig) return false;

		const results: Record<string, any> = {};
		const enhancedErrors: Record<string, string[]> = {};

		// 基础验证
		for (const section of formConfig.sections || []) {
			for (const field of section.fields || []) {
				const value = formData[field.name];
				const context = {
					formData,
					fieldPath: field.name,
					triggerType: 'submit' as const,
					globalContext: {}
				};

				// 注册验证规则
				const rules: any[] = [];

				// 检查validation规则是否为数组格式
				const validationRules = Array.isArray(field.validation) ? field.validation : [];
				const hasRequired = validationRules.some((rule: any) => rule.type === 'required');

				if (hasRequired) {
					rules.push(builtInRules.required);
				}

				if (field.type === 'email' && hasRequired) {
					rules.push(builtInRules.email);
				}

				// 添加自定义验证规则 - 支持新的验证格式
				if (field.validation && 'custom' in field.validation && field.validation.custom) {
					const customRules = Array.isArray(field.validation.custom) ? field.validation.custom : [field.validation.custom];
					for (const customRule of customRules) {
						try {
							// 动态加载自定义验证器
							const customValidator = eval(customRule.validator);
							rules.push({
								name: customRule.name,
								validate: (value: any, context: any) => {
									const result = customValidator(value, context);
									return {
										isValid: result.isValid,
										errors: result.isValid ? [] : [{
											field: context.fieldPath,
											message: customRule.message,
											code: customRule.name,
											severity: 'error' as const
										}]
									};
								},
								async: customRule.async || false
							});
						} catch (error) {
							console.warn(`Failed to load custom validator: ${customRule.name}`, error);
						}
					}
				}

				if (rules.length > 0) {
					validationEngine.registerRule(field.name, rules);
					const result = await validationEngine.validateField(field.name, context);
					results[field.name] = result;

					if (!result.isValid) {
						enhancedErrors[field.name] = result.errors.map(e => e.message);
					}
				}
			}
		}

		// 跨字段验证
		const crossFieldRules: Array<{ rule: any; fields: string[] }> = [];

		// 这里可以添加业务特定的跨字段验证逻辑
		if (formConfig.title === "企业级表单示例") {
			// 示例：密码确认验证
			crossFieldRules.push({
				rule: {
					name: 'password-confirm',
					validate: (values: any) => {
						const isValid = values.password === values.confirmPassword;
						return {
							isValid,
							errors: isValid ? [] : [{
								field: 'confirmPassword',
								message: '两次输入的密码不一致',
								code: 'PASSWORD_MISMATCH',
								severity: 'error' as const
							}]
						};
					}
				},
				fields: ['password', 'confirmPassword']
			});
		}

		if (crossFieldRules.length > 0) {
			const crossFieldResult = await validationEngine.validateCrossFields?.(
				crossFieldRules,
				{
					formData,
					fieldPath: 'cross-field-validation',
					triggerType: 'submit',
					globalContext: {}
				}
			);

			if (!crossFieldResult.isValid) {
				crossFieldResult.errors.forEach(error => {
					const fieldName = error.field.split(',')[0];
					if (!enhancedErrors[fieldName]) {
						enhancedErrors[fieldName] = [];
					}
					enhancedErrors[fieldName].push(error.message);
				});
			}
		}

		setValidationResults(results);
		setComplexValidation(true);

		// 更新错误状态
		const finalErrors: Record<string, string[]> = {};
		Object.keys(errors).forEach(key => {
			finalErrors[key] = enhancedErrors[key] || errors[key] || [];
		});

		Object.keys(enhancedErrors).forEach(key => {
			finalErrors[key] = enhancedErrors[key];
		});

		return Object.keys(finalErrors).length === 0;
	}, [formConfig, formData, errors]);

	// 拖拽增强功能
	const handleComponentDrop = useCallback((item: any, position: { x: number; y: number }) => {
		// 这里可以添加更复杂的拖拽逻辑，比如碰撞检测、自动布局等
		console.log('Enhanced drop:', item, position);
		// 调用原有的 addField 函数
		if (item.componentType) {
			addField(item.componentType as any);
		}
	}, [addField]);

	// 性能监控
	const performanceMetrics = useMemo(() => {
		const startTime = performance.now();

		return {
			...complexityMetrics,
			validationTime: Object.keys(validationResults).length > 0 ? '已计算' : '未计算',
			renderTime: isVirtualMode ? '虚拟化渲染' : '标准渲染',
			lastUpdated: new Date().toLocaleTimeString()
		};
	}, [complexityMetrics, validationResults, isVirtualMode]);

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				<OptimizedDndProvider>
					{/* 头部导航 - 增强版 */}
					<FormHeader
						mode={mode}
						onModeToggle={toggleMode}
						onExport={exportForm}
						onImport={importForm}
						fileInputRef={fileInputRef}
						performanceMetrics={performanceMetrics}
						isVirtualMode={isVirtualMode}
						onToggleVirtualMode={() => setIsVirtualMode(!isVirtualMode)}
					/>

					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						{/* 性能指标显示 */}
						{(complexityMetrics.isComplex || complexValidation) && (
							<div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-sm font-medium text-blue-900">性能指标</h3>
										<div className="text-xs text-blue-700 mt-1">
											总字段: {complexityMetrics.totalFields} |
											渲染模式: {performanceMetrics.renderTime} |
											复杂验证: {complexValidation ? '启用' : '禁用'}
										</div>
									</div>
									{complexityMetrics.totalFields > 100 && (
										<div className="text-xs text-blue-600">
											提示: 字段较多，已启用虚拟化渲染
										</div>
									)}
								</div>
							</div>
						)}

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
									{isVirtualMode ? (
										<div className="bg-white rounded-lg shadow-sm p-4">
											<h3 className="text-lg font-semibold text-gray-900 mb-2">虚拟化渲染模式</h3>
											<VirtualFormRenderer
												schema={convertToFormSchema(formConfig)}
												state={{
													values: formData,
													errors: Object.keys(errors).reduce((acc, key) => ({
														...acc,
														[key]: Array.isArray(errors[key]) ? errors[key] : [errors[key]]
													}), {}),
													touched: {},
													isValidating: {},
													isVisible: {},
													isDisabled: {},
													sections: {}
												}}
												onFieldChange={handleFieldChange}
												onFieldBlur={(fieldId) => console.log('Field blur:', fieldId)}
												onFieldFocus={(fieldId) => console.log('Field focus:', fieldId)}
											/>
										</div>
									) : (
										<FormBuilder
											formConfig={formConfig}
											onConfigChange={setFormConfig}
											onFieldSelect={setSelectedField}
											onFieldDelete={deleteField}
											selectedField={selectedField}
											formData={formData}
											onFieldChange={handleFieldChange}
											errors={errors}
											onDrop={handleComponentDrop}
											validationResults={validationResults}
										/>
									)}
								</div>

								{/* 右侧：字段属性编辑器 - 增强版 */}
								<div className="lg:col-span-1">
									<FieldProperties
										selectedField={selectedField}
										onFieldUpdate={updateField}
										validationResults={validationResults}
									/>
								</div>
							</div>
						) : (
							/* 预览模式 - 增强版 */
							<FormPreview
								formConfig={formConfig}
								formData={formData}
								onFieldChange={handleFieldChange}
								onSubmit={enhancedValidateForm}
								onReset={resetForm}
								errors={errors}
								validationResults={validationResults}
							/>
						)}
					</div>
				</OptimizedDndProvider>
			</div>
		</Layout>
	);
}
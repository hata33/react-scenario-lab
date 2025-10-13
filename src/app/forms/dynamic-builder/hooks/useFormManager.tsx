import { useState, useCallback, useRef, useEffect } from "react";
import {
	FormConfig,
	FormField,
	FieldType,
	BuilderMode,
	ActiveTab,
} from "../types";
import { DEFAULT_FORM_CONFIG, FIELD_TYPES } from "../constants";
import { useFormValidator } from "../components/FormValidator";

export const useFormManager = () => {
	const [mode, setMode] = useState<BuilderMode>("builder");
	const [activeTab, setActiveTab] = useState<ActiveTab>("fields");
	const [formConfig, setFormConfig] = useState<FormConfig>(DEFAULT_FORM_CONFIG);
	const [formData, setFormData] = useState<Record<string, any>>({});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [selectedField, setSelectedField] = useState<FormField | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { validateField, validateForm } = useFormValidator();

	// 处理字段值变化
	const handleFieldChange = useCallback(
		(fieldName: string, value: any) => {
			setFormData((prev) => ({ ...prev, [fieldName]: value }));

			// 清除该字段的错误
			if (errors[fieldName]) {
				setErrors((prev) => {
					const newErrors = { ...prev };
					delete newErrors[fieldName];
					return newErrors;
				});
			}

			// 如果是实时验证模式
			if (formConfig.settings.validationMode === "onChange") {
				const field = formConfig.sections
					.flatMap((s) => s.fields)
					.find((f) => f.name === fieldName);
				if (field) {
					const error = validateField(field, value);
					if (error) {
						setErrors((prev) => ({ ...prev, [fieldName]: error }));
					}
				}
			}
		},
		[errors, formConfig, validateField],
	);

	// 添加字段到表单
	const addField = useCallback(
		(fieldType: FieldType) => {
			const newField: FormField = {
				id: `field-${Date.now()}`,
				type: fieldType,
				label: FIELD_TYPES.find((f) => f.type === fieldType)?.label || "新字段",
				name: `field_${Date.now()}`,
				required: false,
				disabled: false,
				validation: [],
				styling: {
					width: "full",
				},
			};

			// 为特定类型添加默认选项
			if (
				fieldType === "select" ||
				fieldType === "radio" ||
				fieldType === "multiselect"
			) {
				newField.options = [
					{ label: "选项 1", value: "option1" },
					{ label: "选项 2", value: "option2" },
					{ label: "选项 3", value: "option3" },
				];
			}

			setFormConfig((prev) => ({
				...prev,
				sections: prev.sections.map((section) =>
					section.id === formConfig.sections[formConfig.sections.length - 1].id
						? { ...section, fields: [...section.fields, newField] }
						: section,
				),
			}));

			// 自动选择新添加的字段
			setSelectedField(newField);
		},
		[formConfig.sections],
	);

	// 删除字段
	const deleteField = useCallback(
		(fieldId: string) => {
			setFormConfig((prev) => ({
				...prev,
				sections: prev.sections.map((section) => ({
					...section,
					fields: section.fields.filter((field) => field.id !== fieldId),
				})),
			}));
			if (selectedField?.id === fieldId) {
				setSelectedField(null);
			}
		},
		[selectedField],
	);

	// 更新字段
	const updateField = useCallback(
		(fieldId: string, updates: Partial<FormField>) => {
			setFormConfig((prev) => ({
				...prev,
				sections: prev.sections.map((section) => ({
					...section,
					fields: section.fields.map((field) =>
						field.id === fieldId ? { ...field, ...updates } : field,
					),
				})),
			}));

			// 如果正在编辑的字段被更新，同时更新 selectedField
			if (selectedField?.id === fieldId) {
				setSelectedField((prev) => (prev ? { ...prev, ...updates } : null));
			}
		},
		[selectedField],
	);

	// 导出表单配置
	const exportForm = useCallback(() => {
		const dataStr = JSON.stringify(formConfig, null, 2);
		const dataUri =
			"data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

		const exportFileDefaultName = `form-config-${Date.now()}.json`;

		const linkElement = document.createElement("a");
		linkElement.setAttribute("href", dataUri);
		linkElement.setAttribute("download", exportFileDefaultName);
		linkElement.click();
	}, [formConfig]);

	// 导入表单配置
	const importForm = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					try {
						const config = JSON.parse(e.target?.result as string);
						setFormConfig(config);
						setSelectedField(null);
					} catch (error) {
						alert("文件格式错误，请选择有效的配置文件");
					}
				};
				reader.readAsText(file);
			}
		},
		[],
	);

	// 加载模板
	const loadTemplate = useCallback((template: Partial<FormConfig>) => {
		setFormConfig((prev) => ({
			...prev,
			...template,
			id: `form-${Date.now()}`,
			sections:
				template.sections?.map((section) => ({
					...section,
					id: `section-${Date.now()}`,
					fields:
						section.fields?.map((field) => ({
							...field,
							id: `field-${Date.now()}`,
							name: field.name || `field_${Date.now()}`,
						})) || [],
				})) || prev.sections,
		}));
		setSelectedField(null);
	}, []);

	// 提交表单
	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();

			const allFields = formConfig.sections.flatMap(
				(section) => section.fields,
			);
			const validation = validateForm(allFields, formData);

			setErrors(validation.errors);

			if (validation.isValid) {
				console.log("表单数据:", formData);
				alert("表单提交成功！");
			} else {
				alert("请修正表单中的错误");
			}
		},
		[formConfig, formData, validateForm],
	);

	// 重置表单数据
	const resetForm = useCallback(() => {
		setFormData({});
		setErrors({});
	}, []);

	// 切换模式
	const toggleMode = useCallback(() => {
		setMode((prev) => (prev === "builder" ? "preview" : "builder"));
	}, []);

	return {
		// 状态
		mode,
		activeTab,
		formConfig,
		formData,
		errors,
		selectedField,
		fileInputRef,

		// 操作方法
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
	};
};

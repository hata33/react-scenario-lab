import { useCallback } from "react";
import { FormField, ValidationRule } from "../types";

export const useFormValidator = () => {
	// 验证单个字段
	const validateField = useCallback(
		(field: FormField, value: any): string | null => {
			for (const rule of field.validation) {
				switch (rule.type) {
					case "required":
						if (!value || (Array.isArray(value) && value.length === 0)) {
							return rule.message || "此字段为必填项";
						}
						break;
					case "minLength":
						if (value && value.length < Number(rule.value)) {
							return rule.message || `最少需要 ${rule.value} 个字符`;
						}
						break;
					case "maxLength":
						if (value && value.length > Number(rule.value)) {
							return rule.message || `最多允许 ${rule.value} 个字符`;
						}
						break;
					case "min":
						if (value && Number(value) < Number(rule.value)) {
							return rule.message || `值不能小于 ${rule.value}`;
						}
						break;
					case "max":
						if (value && Number(value) > Number(rule.value)) {
							return rule.message || `值不能大于 ${rule.value}`;
						}
						break;
					case "pattern":
						if (value && !new RegExp(rule.pattern || "").test(value)) {
							return rule.message || "格式不正确";
						}
						break;
					case "email":
						if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
							return rule.message || "请输入有效的邮箱地址";
						}
						break;
					case "url":
						if (value && !/^https?:\/\/.+/.test(value)) {
							return rule.message || "请输入有效的URL";
						}
						break;
				}
			}
			return null;
		},
		[],
	);

	// 验证整个表单
	const validateForm = useCallback(
		(fields: FormField[], formData: Record<string, any>) => {
			const newErrors: Record<string, string> = {};

			fields.forEach((field) => {
				const error = validateField(field, formData[field.name]);
				if (error) {
					newErrors[field.name] = error;
				}
			});

			return {
				errors: newErrors,
				isValid: Object.keys(newErrors).length === 0,
			};
		},
		[validateField],
	);

	return {
		validateField,
		validateForm,
	};
};

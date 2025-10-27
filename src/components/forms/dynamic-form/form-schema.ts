"use client";

// 表单字段类型定义
export type FieldType =
	| "text"
	| "email"
	| "password"
	| "number"
	| "textarea"
	| "select"
	| "checkbox"
	| "radio"
	| "date"
	| "file"
	| "custom"
	| "array"
	| "object";

export interface FieldCondition {
	field: string;
	operator: "equals" | "not_equals" | "contains" | "not_contains" | "greater_than" | "less_than";
	value: any;
	logic?: "and" | "or";
}

export interface FieldDependency {
	showWhen?: FieldCondition[];
	hideWhen?: FieldCondition[];
	enableWhen?: FieldCondition[];
	disableWhen?: FieldCondition[];
	updateWhen?: {
		field: string;
		operator: "equals" | "not_equals";
		value: any;
		action: "setValue" | "addOption" | "removeOption";
		target: string | string[];
		targetValue?: any;
	}[];
}

export interface FieldValidation {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
	pattern?: string;
	custom?: Array<{
		name: string;
		message: string;
		validator: string; // 函数名称或表达式
		async?: boolean;
	}>;
}

export interface FieldOption {
	value: any;
	label: string;
	disabled?: boolean;
	description?: string;
}

export interface FormField {
	id: string;
	type: FieldType;
	name: string;
	label: string;
	placeholder?: string;
	description?: string;
	defaultValue?: any;
	options?: FieldOption[];
	validation?: FieldValidation;
	dependency?: FieldDependency;
	props?: Record<string, any>;
	layout?: {
		width?: number; // 1-12 栅格宽度
		offset?: number;
		order?: number;
	};
	// 数组字段特有属性
	arrayConfig?: {
		minItems?: number;
		maxItems?: number;
		addItemLabel?: string;
		removeItemLabel?: string;
		itemTemplate?: FormField[];
	};
	// 对象字段特有属性
	objectConfig?: {
		fields: FormField[];
		collapsible?: boolean;
		defaultCollapsed?: boolean;
	};
}

export interface FormSection {
	id: string;
	title: string;
	description?: string;
	fields: FormField[];
	collapsible?: boolean;
	defaultCollapsed?: boolean;
	layout?: {
		columns?: number;
		spacing?: number;
	};
}

export interface FormSchema {
	id: string;
	title: string;
	description?: string;
	sections: FormSection[];
	layout?: {
		mode?: "vertical" | "horizontal" | "grid";
		columns?: number;
		spacing?: "compact" | "normal" | "loose";
	};
	settings?: {
		autoSave?: boolean;
		validateOnChange?: boolean;
		showProgress?: boolean;
		allowReset?: boolean;
	};
}

// 表单状态管理
export interface FormState {
	values: Record<string, any>;
	errors: Record<string, string[]>;
	touched: Record<string, boolean>;
	isValidating: Record<string, boolean>;
	isVisible: Record<string, boolean>;
	isDisabled: Record<string, boolean>;
	sections: Record<
		string,
		{
			collapsed: boolean;
		}
	>;
}

// 表单动作类型
export type FormAction =
	| { type: "SET_VALUE"; payload: { field: string; value: any } }
	| { type: "SET_VALUES"; payload: Record<string, any> }
	| { type: "SET_ERROR"; payload: { field: string; errors: string[] } }
	| { type: "CLEAR_ERROR"; payload: string }
	| { type: "SET_TOUCHED"; payload: { field: string; touched: boolean } }
	| { type: "SET_VALIDATING"; payload: { field: string; validating: boolean } }
	| { type: "TOGGLE_SECTION"; payload: string }
	| { type: "RESET_FORM"; payload?: Partial<FormState> }
	| { type: "UPDATE_VISIBILITY"; payload: Record<string, boolean> }
	| { type: "UPDATE_DISABLED"; payload: Record<string, boolean> }
	| { type: "ADD_ARRAY_ITEM"; payload: { field: string; item: any } }
	| { type: "REMOVE_ARRAY_ITEM"; payload: { field: string; index: number } }
	| { type: "MOVE_ARRAY_ITEM"; payload: { field: string; fromIndex: number; toIndex: number } };

// 表单状态reducer
export function formReducer(state: FormState, action: FormAction): FormState {
	switch (action.type) {
		case "SET_VALUE":
			return {
				...state,
				values: {
					...state.values,
					[action.payload.field]: action.payload.value,
				},
			};

		case "SET_VALUES":
			return {
				...state,
				values: {
					...state.values,
					...action.payload,
				},
			};

		case "SET_ERROR":
			return {
				...state,
				errors: {
					...state.errors,
					[action.payload.field]: action.payload.errors,
				},
			};

		case "CLEAR_ERROR": {
			const { [action.payload]: removedError, ...restErrors } = state.errors;
			return {
				...state,
				errors: restErrors,
			};
		}

		case "SET_TOUCHED":
			return {
				...state,
				touched: {
					...state.touched,
					[action.payload.field]: action.payload.touched,
				},
			};

		case "SET_VALIDATING":
			return {
				...state,
				isValidating: {
					...state.isValidating,
					[action.payload.field]: action.payload.validating,
				},
			};

		case "TOGGLE_SECTION":
			return {
				...state,
				sections: {
					...state.sections,
					[action.payload]: {
						collapsed: !state.sections[action.payload]?.collapsed,
					},
				},
			};

		case "RESET_FORM":
			return {
				values: {},
				errors: {},
				touched: {},
				isValidating: {},
				isVisible: {},
				isDisabled: {},
				sections: {},
				...action.payload,
			};

		case "UPDATE_VISIBILITY":
			return {
				...state,
				isVisible: {
					...state.isVisible,
					...action.payload,
				},
			};

		case "UPDATE_DISABLED":
			return {
				...state,
				isDisabled: {
					...state.isDisabled,
					...action.payload,
				},
			};

		case "ADD_ARRAY_ITEM": {
			const currentArray = state.values[action.payload.field] || [];
			return {
				...state,
				values: {
					...state.values,
					[action.payload.field]: [...currentArray, action.payload.item],
				},
			};
		}

		case "REMOVE_ARRAY_ITEM": {
			const array = [...(state.values[action.payload.field] || [])];
			array.splice(action.payload.index, 1);
			return {
				...state,
				values: {
					...state.values,
					[action.payload.field]: array,
				},
			};
		}

		case "MOVE_ARRAY_ITEM": {
			const sourceArray = [...(state.values[action.payload.field] || [])];
			const [movedItem] = sourceArray.splice(action.payload.fromIndex, 1);
			sourceArray.splice(action.payload.toIndex, 0, movedItem);
			return {
				...state,
				values: {
					...state.values,
					[action.payload.field]: sourceArray,
				},
			};
		}

		default:
			return state;
	}
}

// 条件求值器
export class ConditionEvaluator {
	static evaluate(condition: FieldCondition, formData: Record<string, any>): boolean {
		const fieldValue = formData[condition.field];
		let result = false;

		switch (condition.operator) {
			case "equals":
				result = fieldValue === condition.value;
				break;
			case "not_equals":
				result = fieldValue !== condition.value;
				break;
			case "contains":
				result = Array.isArray(fieldValue)
					? fieldValue.includes(condition.value)
					: String(fieldValue).includes(String(condition.value));
				break;
			case "not_contains":
				result = !Array.isArray(fieldValue)
					? !fieldValue.includes(condition.value)
					: !String(fieldValue).includes(String(condition.value));
				break;
			case "greater_than":
				result = Number(fieldValue) > Number(condition.value);
				break;
			case "less_than":
				result = Number(fieldValue) < Number(condition.value);
				break;
		}

		return result;
	}

	static evaluateConditions(
		conditions: FieldCondition[],
		formData: Record<string, any>,
		logic: "and" | "or" = "and",
	): boolean {
		if (conditions.length === 0) return true;

		return logic === "and"
			? conditions.every((condition) => ConditionEvaluator.evaluate(condition, formData))
			: conditions.some((condition) => ConditionEvaluator.evaluate(condition, formData));
	}

	static getFieldVisibility(field: FormField, formData: Record<string, any>): boolean {
		const dependency = field.dependency;
		if (!dependency) return true;

		// 检查隐藏条件
		if (dependency.hideWhen) {
			const shouldHide = ConditionEvaluator.evaluateConditions(
				dependency.hideWhen,
				formData,
				dependency.hideWhen[0]?.logic || "and",
			);
			if (shouldHide) return false;
		}

		// 检查显示条件
		if (dependency.showWhen) {
			const shouldShow = ConditionEvaluator.evaluateConditions(
				dependency.showWhen,
				formData,
				dependency.showWhen[0]?.logic || "and",
			);
			return shouldShow;
		}

		return true;
	}

	static getFieldDisabled(field: FormField, formData: Record<string, any>): boolean {
		const dependency = field.dependency;
		if (!dependency) return false;

		// 检查禁用条件
		if (dependency.disableWhen) {
			const shouldDisable = ConditionEvaluator.evaluateConditions(
				dependency.disableWhen,
				formData,
				dependency.disableWhen[0]?.logic || "and",
			);
			if (shouldDisable) return true;
		}

		// 检查启用条件
		if (dependency.enableWhen) {
			const shouldEnable = ConditionEvaluator.evaluateConditions(
				dependency.enableWhen,
				formData,
				dependency.enableWhen[0]?.logic || "and",
			);
			return !shouldEnable;
		}

		return false;
	}

	static handleFieldUpdates(
		field: FormField,
		formData: Record<string, any>,
		setFieldValue: (field: string, value: any) => void,
	): void {
		const dependency = field.dependency;
		if (!dependency?.updateWhen) return;

		for (const update of dependency.updateWhen) {
			const shouldUpdate = ConditionEvaluator.evaluate(
				{
					field: update.field,
					operator: update.operator,
					value: update.value,
				},
				formData,
			);

			if (shouldUpdate) {
				switch (update.action) {
					case "setValue":
						if (Array.isArray(update.target)) {
							update.target.forEach((targetField) => {
								setFieldValue(targetField, update.targetValue);
							});
						} else {
							setFieldValue(update.target, update.targetValue);
						}
						break;
					case "addOption":
						// 这里需要特殊处理，因为涉及到选项更新
						console.log("Add option to field:", update.target);
						break;
					case "removeOption":
						console.log("Remove option from field:", update.target);
						break;
				}
			}
		}
	}
}

// 表单Schema验证器
export class SchemaValidator {
	static validate(schema: FormSchema): { isValid: boolean; errors: string[] } {
		const errors: string[] = [];

		// 验证基本结构
		if (!schema.id || schema.id.trim() === "") {
			errors.push("Schema ID is required");
		}

		if (!schema.title || schema.title.trim() === "") {
			errors.push("Schema title is required");
		}

		if (!Array.isArray(schema.sections) || schema.sections.length === 0) {
			errors.push("Schema must have at least one section");
		}

		// 验证sections
		schema.sections.forEach((section, index) => {
			if (!section.id) {
				errors.push(`Section ${index + 1} is missing ID`);
			}

			if (!section.title) {
				errors.push(`Section ${section.id} is missing title`);
			}

			if (!Array.isArray(section.fields) || section.fields.length === 0) {
				errors.push(`Section ${section.id} must have at least one field`);
			}

			// 验证fields
			section.fields.forEach((field, fieldIndex) => {
				if (!field.id) {
					errors.push(`Field ${fieldIndex + 1} in section ${section.id} is missing ID`);
				}

				if (!field.name) {
					errors.push(`Field ${field.id} is missing name`);
				}

				if (!field.type) {
					errors.push(`Field ${field.id} is missing type`);
				}

				// 验证字段类型特定的配置
				if (field.type === "select" || field.type === "radio") {
					if (!Array.isArray(field.options) || field.options.length === 0) {
						errors.push(`Field ${field.id} of type ${field.type} must have options`);
					}
				}

				// 验证数组字段配置
				if (field.type === "array" && !field.arrayConfig) {
					errors.push(`Array field ${field.id} must have arrayConfig`);
				}

				// 验证对象字段配置
				if (field.type === "object" && !field.objectConfig) {
					errors.push(`Object field ${field.id} must have objectConfig`);
				}
			});
		});

		return {
			isValid: errors.length === 0,
			errors,
		};
	}
}

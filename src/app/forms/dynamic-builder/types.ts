// 表单字段类型定义
export type FieldType =
	| "text"
	| "email"
	| "password"
	| "number"
	| "tel"
	| "url"
	| "textarea"
	| "rich-text"
	| "select"
	| "multiselect"
	| "radio"
	| "checkbox"
	| "switch"
	| "date"
	| "datetime"
	| "time"
	| "daterange"
	| "file"
	| "image"
	| "video"
	| "audio"
	| "range"
	| "rating"
	| "color"
	| "address"
	| "contact"
	| "payment"
	| "signature"
	| "table"
	| "repeater"
	| "divider"
	| "heading"
	| "paragraph";

export interface FieldOption {
	label: string;
	value: string;
	disabled?: boolean;
	description?: string;
}

export interface ValidationRule {
	type: "required" | "minLength" | "maxLength" | "min" | "max" | "pattern" | "email" | "url" | "custom";
	value?: string | number;
	message?: string;
	pattern?: string;
}

export interface FormField {
	id: string;
	type: FieldType;
	label: string;
	name: string;
	placeholder?: string;
	description?: string;
	required: boolean;
	disabled: boolean;
	options?: FieldOption[];
	validation: ValidationRule[];
	defaultValue?: any;
	conditional?: {
		field: string;
		operator: "equals" | "not_equals" | "contains" | "not_contains" | "greater_than" | "less_than";
		value: any;
	};
	styling?: {
		width: "full" | "half" | "third" | "quarter";
		className?: string;
	};
	advanced?: {
		dependsOn?: string[];
		autoSave?: boolean;
		calculate?: string;
		apiEndpoint?: string;
	};
}

export interface FormSection {
	id: string;
	title: string;
	description?: string;
	fields: FormField[];
	collapsed: boolean;
	conditional?: {
		field: string;
		operator: string;
		value: any;
	};
}

export interface FormConfig {
	id: string;
	title: string;
	description: string;
	sections: FormSection[];
	settings: {
		submitButtonText: string;
		resetButtonText: string;
		showProgressBar: boolean;
		allowSave: boolean;
		validationMode: "onSubmit" | "onChange" | "onBlur";
		theme: "default" | "material" | "bootstrap" | "tailwind";
		layout: "single-column" | "two-column" | "three-column";
	};
}

export interface FieldTypeConfig {
	type: FieldType;
	label: string;
	icon: string;
	category: string;
	description: string;
}

export interface FormTemplate {
	name: string;
	description: string;
	config: Partial<FormConfig>;
}

export type BuilderMode = "builder" | "preview";
export type ActiveTab = "fields" | "settings" | "templates";

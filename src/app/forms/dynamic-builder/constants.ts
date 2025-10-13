import { FieldType, FieldTypeConfig, FormTemplate } from "./types";

// 字段类型配置
export const FIELD_TYPES: FieldTypeConfig[] = [
	// 基础输入
	{
		type: "text",
		label: "文本输入",
		icon: "text",
		category: "基础",
		description: "单行文本输入框",
	},
	{
		type: "email",
		label: "邮箱",
		icon: "mail",
		category: "基础",
		description: "邮箱地址输入",
	},
	{
		type: "password",
		label: "密码",
		icon: "shield",
		category: "基础",
		description: "密码输入框",
	},
	{
		type: "number",
		label: "数字",
		icon: "hash",
		category: "基础",
		description: "数字输入框",
	},
	{
		type: "tel",
		label: "电话",
		icon: "phone",
		category: "基础",
		description: "电话号码输入",
	},
	{
		type: "url",
		label: "网址",
		icon: "link",
		category: "基础",
		description: "URL链接输入",
	},

	// 文本区域
	{
		type: "textarea",
		label: "多行文本",
		icon: "file-text",
		category: "文本",
		description: "多行文本输入区域",
	},
	{
		type: "rich-text",
		label: "富文本",
		icon: "code",
		category: "文本",
		description: "富文本编辑器",
	},

	// 选择类
	{
		type: "select",
		label: "下拉选择",
		icon: "chevron-down",
		category: "选择",
		description: "单选下拉框",
	},
	{
		type: "multiselect",
		label: "多选下拉",
		icon: "check-square",
		category: "选择",
		description: "多选下拉框",
	},
	{
		type: "radio",
		label: "单选按钮",
		icon: "radio",
		category: "选择",
		description: "单选按钮组",
	},
	{
		type: "checkbox",
		label: "复选框",
		icon: "check",
		category: "选择",
		description: "复选框组",
	},
	{
		type: "switch",
		label: "开关",
		icon: "toggle-left",
		category: "选择",
		description: "切换开关",
	},

	// 日期时间
	{
		type: "date",
		label: "日期",
		icon: "calendar",
		category: "日期时间",
		description: "日期选择器",
	},
	{
		type: "datetime",
		label: "日期时间",
		icon: "clock",
		category: "日期时间",
		description: "日期时间选择器",
	},
	{
		type: "time",
		label: "时间",
		icon: "clock",
		category: "日期时间",
		description: "时间选择器",
	},
	{
		type: "daterange",
		label: "日期范围",
		icon: "calendar",
		category: "日期时间",
		description: "日期范围选择器",
	},

	// 文件上传
	{
		type: "file",
		label: "文件上传",
		icon: "upload",
		category: "文件",
		description: "通用文件上传",
	},
	{
		type: "image",
		label: "图片上传",
		icon: "image",
		category: "文件",
		description: "图片文件上传",
	},
	{
		type: "video",
		label: "视频上传",
		icon: "video",
		category: "文件",
		description: "视频文件上传",
	},
	{
		type: "audio",
		label: "音频上传",
		icon: "music",
		category: "文件",
		description: "音频文件上传",
	},

	// 特殊组件
	{
		type: "range",
		label: "滑块",
		icon: "sliders",
		category: "特殊",
		description: "范围滑块",
	},
	{
		type: "rating",
		label: "评分",
		icon: "star",
		category: "特殊",
		description: "星级评分组件",
	},
	{
		type: "color",
		label: "颜色",
		icon: "palette",
		category: "特殊",
		description: "颜色选择器",
	},
	{
		type: "address",
		label: "地址",
		icon: "map-pin",
		category: "特殊",
		description: "地址输入组件",
	},
	{
		type: "contact",
		label: "联系人",
		icon: "users",
		category: "特殊",
		description: "联系人信息组件",
	},
	{
		type: "payment",
		label: "支付",
		icon: "credit-card",
		category: "特殊",
		description: "支付信息组件",
	},
	{
		type: "signature",
		label: "签名",
		icon: "pen-tool",
		category: "特殊",
		description: "电子签名组件",
	},

	// 高级组件
	{
		type: "table",
		label: "表格",
		icon: "grid",
		category: "高级",
		description: "数据表格组件",
	},
	{
		type: "repeater",
		label: "重复器",
		icon: "list",
		category: "高级",
		description: "可重复字段组",
	},

	// 布局组件
	{
		type: "divider",
		label: "分割线",
		icon: "minus",
		category: "布局",
		description: "分割线",
	},
	{
		type: "heading",
		label: "标题",
		icon: "type",
		category: "布局",
		description: "标题文本",
	},
	{
		type: "paragraph",
		label: "段落",
		icon: "file-text",
		category: "布局",
		description: "段落文本",
	},
];

// 预设表单模板
export const FORM_TEMPLATES: FormTemplate[] = [
	{
		name: "用户注册表单",
		description: "完整的用户注册信息收集",
		config: {
			title: "用户注册",
			description: "请填写以下信息完成注册",
			sections: [
				{
					id: "basic-info",
					title: "基本信息",
					fields: [
						{
							id: "username",
							type: "text",
							label: "用户名",
							name: "username",
							required: true,
							disabled: false,
							validation: [
								{ type: "required", message: "请输入用户名" },
								{ type: "minLength", value: 3, message: "用户名至少3个字符" },
							],
						},
						{
							id: "email",
							type: "email",
							label: "邮箱地址",
							name: "email",
							required: true,
							disabled: false,
							validation: [
								{ type: "required", message: "请输入邮箱地址" },
								{ type: "email", message: "请输入有效的邮箱地址" },
							],
						},
						{
							id: "password",
							type: "password",
							label: "密码",
							name: "password",
							required: true,
							disabled: false,
							validation: [
								{ type: "required", message: "请输入密码" },
								{ type: "minLength", value: 8, message: "密码至少8个字符" },
							],
						},
					],
					collapsed: false,
				},
				{
					id: "personal-info",
					title: "个人信息",
					fields: [
						{
							id: "fullname",
							type: "text",
							label: "真实姓名",
							name: "fullname",
							required: true,
							disabled: false,
							validation: [{ type: "required", message: "请输入真实姓名" }],
						},
						{
							id: "phone",
							type: "tel",
							label: "手机号码",
							name: "phone",
							required: true,
							disabled: false,
							validation: [
								{ type: "required", message: "请输入手机号码" },
								{
									type: "pattern",
									value: "^1[3-9]\\d{9}$",
									message: "请输入有效的手机号码",
								},
							],
						},
						{
							id: "avatar",
							type: "image",
							label: "头像",
							name: "avatar",
							required: false,
							disabled: false,
							validation: [],
						},
					],
					collapsed: false,
				},
			],
		},
	},
	{
		name: "企业信息收集",
		description: "全面的企业信息登记表单",
		config: {
			title: "企业信息登记",
			description: "请填写企业相关信息",
			sections: [
				{
					id: "company-basic",
					title: "企业基本信息",
					fields: [
						{
							id: "company-name",
							type: "text",
							label: "企业名称",
							name: "company_name",
							required: true,
							disabled: false,
							validation: [{ type: "required", message: "请输入企业名称" }],
						},
						{
							id: "business-type",
							type: "select",
							label: "企业类型",
							name: "business_type",
							required: true,
							disabled: false,
							options: [
								{ label: "有限责任公司", value: "llc" },
								{ label: "股份有限公司", value: "corp" },
								{ label: "个体工商户", value: "individual" },
								{ label: "合伙企业", value: "partnership" },
							],
							validation: [{ type: "required", message: "请选择企业类型" }],
						},
						{
							id: "address",
							type: "address",
							label: "企业地址",
							name: "address",
							required: true,
							disabled: false,
							validation: [{ type: "required", message: "请输入企业地址" }],
						},
					],
					collapsed: false,
				},
			],
		},
	},
];

// 默认表单配置
export const DEFAULT_FORM_CONFIG = {
	id: "dynamic-form",
	title: "动态表单构建器",
	description: "拖拽式表单构建器，支持多种字段类型和验证规则",
	sections: [
		{
			id: "section-1",
			title: "表单部分",
			description: "第一个表单部分",
			fields: [],
			collapsed: false,
		},
	],
	settings: {
		submitButtonText: "提交",
		resetButtonText: "重置",
		showProgressBar: true,
		allowSave: true,
		validationMode: "onSubmit" as const,
		theme: "default" as const,
		layout: "single-column" as const,
	},
};

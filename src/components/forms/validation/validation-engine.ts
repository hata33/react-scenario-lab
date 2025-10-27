"use client";

// 验证结果类型
export interface ValidationResult {
	isValid: boolean;
	errors: ValidationError[];
	warnings?: ValidationWarning[];
}

export interface ValidationError {
	field: string;
	message: string;
	code: string;
	severity: "error" | "warning";
}

export interface ValidationWarning {
	field: string;
	message: string;
	code: string;
}

// 验证规则接口
export interface ValidationRule {
	name: string;
	validate: (value: any, context: ValidationContext) => ValidationResult | Promise<ValidationResult>;
	async?: boolean;
	dependencies?: string[]; // 依赖的字段
}

export interface ValidationContext {
	formData: Record<string, any>;
	fieldPath: string;
	triggerType: "change" | "blur" | "submit";
	globalContext?: Record<string, any>;
}

// 验证任务接口
interface ValidationTask {
	fieldPath: string;
	rules: ValidationRule[];
	context: ValidationContext;
	resolve: (result: ValidationResult) => void;
	reject: (error: Error) => void;
}

// 验证引擎核心类
export class ValidationEngine {
	private rules: Map<string, ValidationRule[]> = new Map();
	private validationCache: Map<string, ValidationResult> = new Map();
	private debounceTimers: Map<string, NodeJS.Timeout> = new Map();
	private validationQueue: ValidationTask[] = [];
	private isProcessing = false;

	// 注册验证规则
	registerRule(fieldPath: string, rules: ValidationRule[]) {
		this.rules.set(fieldPath, rules);
		this.clearCache(fieldPath);
	}

	// 清除缓存
	private clearCache(fieldPath?: string) {
		if (fieldPath) {
			this.validationCache.delete(fieldPath);
		} else {
			this.validationCache.clear();
		}
	}

	// 防抖验证
	private debounceValidation(
		fieldPath: string,
		context: ValidationContext,
		delay: number = 300,
	): Promise<ValidationResult> {
		return new Promise((resolve) => {
			// 清除之前的定时器
			const existingTimer = this.debounceTimers.get(fieldPath);
			if (existingTimer) {
				clearTimeout(existingTimer);
			}

			// 设置新的定时器
			const timer = setTimeout(async () => {
				this.debounceTimers.delete(fieldPath);
				const result = await this.validateField(fieldPath, context);
				resolve(result);
			}, delay);

			this.debounceTimers.set(fieldPath, timer);
		});
	}

	// 验证单个字段
	async validateField(fieldPath: string, context: ValidationContext): Promise<ValidationResult> {
		const cacheKey = `${fieldPath}-${JSON.stringify(context.formData[fieldPath])}`;

		// 检查缓存
		if (this.validationCache.has(cacheKey)) {
			return this.validationCache.get(cacheKey)!;
		}

		const rules = this.rules.get(fieldPath) || [];
		const errors: ValidationError[] = [];
		const warnings: ValidationWarning[] = [];

		// 执行同步验证
		for (const rule of rules.filter((r) => !r.async)) {
			try {
				const result = rule.validate(context.formData[fieldPath], context);
				// 处理可能是Promise的结果
				if (result instanceof Promise) {
					// 同步规则不应该返回Promise，跳过
					continue;
				}
				if (!result.isValid) {
					errors.push(...result.errors);
				}
				if (result.warnings) {
					warnings.push(...result.warnings);
				}
			} catch (error) {
				console.error(`Validation rule '${rule.name}' failed:`, error);
				errors.push({
					field: fieldPath,
					message: `验证规则执行失败: ${rule.name}`,
					code: "VALIDATION_RULE_ERROR",
					severity: "error",
				});
			}
		}

		// 异步验证规则加入队列
		const asyncRules = rules.filter((r) => r.async);
		if (asyncRules.length > 0) {
			this.addToQueue({
				fieldPath,
				rules: asyncRules,
				context,
				resolve: () => {},
				reject: () => {},
			});
			this.processQueue();
		}

		const result: ValidationResult = {
			isValid: errors.length === 0,
			errors,
			warnings: warnings.length > 0 ? warnings : undefined,
		};

		// 缓存结果
		this.validationCache.set(cacheKey, result);
		return result;
	}

	// 添加任务到队列
	private addToQueue(task: ValidationTask) {
		this.validationQueue.push(task);
	}

	// 处理验证队列
	private async processQueue() {
		if (this.isProcessing || this.validationQueue.length === 0) {
			return;
		}

		this.isProcessing = true;

		while (this.validationQueue.length > 0) {
			const task = this.validationQueue.shift()!;

			try {
				const results = await Promise.all(
					task.rules.map((rule) => this.executeAsyncRule(rule, task.context.formData[task.fieldPath], task.context)),
				);

				const allErrors = results.flatMap((r) => r.errors);
				const allWarnings = results.flatMap((r) => r.warnings || []);

				task.resolve({
					isValid: allErrors.length === 0,
					errors: allErrors,
					warnings: allWarnings.length > 0 ? allWarnings : undefined,
				});
			} catch (error) {
				task.reject(error as Error);
			}
		}

		this.isProcessing = false;
	}

	// 执行异步验证规则
	private async executeAsyncRule(
		rule: ValidationRule,
		value: any,
		context: ValidationContext,
	): Promise<ValidationResult> {
		try {
			return await rule.validate(value, context);
		} catch (error) {
			console.error(`Async validation rule '${rule.name}' failed:`, error);
			return {
				isValid: false,
				errors: [
					{
						field: context.fieldPath,
						message: `异步验证失败: ${rule.name}`,
						code: "ASYNC_VALIDATION_ERROR",
						severity: "error",
					},
				],
			};
		}
	}

	// 跨字段验证
	async validateCrossFields(
		rules: Array<{ rule: ValidationRule; fields: string[] }>,
		context: ValidationContext,
	): Promise<ValidationResult> {
		const errors: ValidationError[] = [];
		const warnings: ValidationWarning[] = [];

		for (const { rule, fields } of rules) {
			try {
				const fieldValues = fields.reduce(
					(acc, field) => {
						acc[field] = context.formData[field];
						return acc;
					},
					{} as Record<string, any>,
				);

				const enhancedContext = {
					...context,
					formData: {
						...context.formData,
						...fieldValues,
					},
				};

				const result = await rule.validate(fieldValues, enhancedContext);

				if (!result.isValid) {
					errors.push(...result.errors);
				}
				if (result.warnings) {
					warnings.push(...result.warnings);
				}
			} catch (error) {
				console.error("Cross-field validation failed:", error);
				errors.push({
					field: fields.join(","),
					message: `跨字段验证失败: ${rule.name}`,
					code: "CROSS_FIELD_VALIDATION_ERROR",
					severity: "error",
				});
			}
		}

		return {
			isValid: errors.length === 0,
			errors,
			warnings: warnings.length > 0 ? warnings : undefined,
		};
	}

	// 清理资源
	destroy() {
		this.debounceTimers.forEach((timer) => clearTimeout(timer));
		this.debounceTimers.clear();
		this.validationCache.clear();
		this.validationQueue = [];
	}
}

// 全局验证引擎实例
export const validationEngine = new ValidationEngine();

// 预定义验证规则
export const builtInRules = {
	required: {
		name: "required",
		validate: (value: any) => ({
			isValid: value !== null && value !== undefined && value !== "",
			errors:
				value === null || value === undefined || value === ""
					? [
							{
								field: "",
								message: "此字段为必填项",
								code: "REQUIRED",
								severity: "error" as const,
							},
						]
					: [],
		}),
	},

	email: {
		name: "email",
		validate: (value: string) => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return {
				isValid: !value || emailRegex.test(value),
				errors:
					value && !emailRegex.test(value)
						? [
								{
									field: "",
									message: "请输入有效的邮箱地址",
									code: "INVALID_EMAIL",
									severity: "error" as const,
								},
							]
						: [],
			};
		},
	},

	minLength: (min: number) => ({
		name: "minLength",
		validate: (value: string) => ({
			isValid: !value || value.length >= min,
			errors:
				value && value.length < min
					? [
							{
								field: "",
								message: `最少需要 ${min} 个字符`,
								code: "MIN_LENGTH",
								severity: "error" as const,
							},
						]
					: [],
		}),
	}),

	maxLength: (max: number) => ({
		name: "maxLength",
		validate: (value: string) => ({
			isValid: !value || value.length <= max,
			errors:
				value && value.length > max
					? [
							{
								field: "",
								message: `最多只能输入 ${max} 个字符`,
								code: "MAX_LENGTH",
								severity: "error" as const,
							},
						]
					: [],
		}),
	}),

	pattern: (regex: RegExp, message: string) => ({
		name: "pattern",
		validate: (value: string) => ({
			isValid: !value || regex.test(value),
			errors:
				value && !regex.test(value)
					? [
							{
								field: "",
								message,
								code: "PATTERN_MISMATCH",
								severity: "error" as const,
							},
						]
					: [],
		}),
	}),

	// 异步验证示例：检查用户名是否已存在
	uniqueUsername: {
		name: "uniqueUsername",
		async: true,
		validate: async (value: string) => {
			// 模拟API调用
			await new Promise((resolve) => setTimeout(resolve, 1000));
			const takenUsernames = ["admin", "user", "test"];
			return {
				isValid: !takenUsernames.includes(value.toLowerCase()),
				errors: takenUsernames.includes(value.toLowerCase())
					? [
							{
								field: "",
								message: "用户名已被占用",
								code: "USERNAME_TAKEN",
								severity: "error" as const,
							},
						]
					: [],
			};
		},
	},
};

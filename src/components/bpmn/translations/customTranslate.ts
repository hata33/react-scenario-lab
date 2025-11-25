import chineseTranslations from 'bpmn-js-i18n/translations/zn';

/**
 * 自定义翻译函数
 * @param template 模板字符串
 * @param replacements 替换参数
 * @returns 翻译后的字符串
 */
export function customTranslate(template: string, replacements?: any): string {
	replacements = replacements || {};

	// 替换模板中的占位符
	template = template.replace(/{([^}]+)}/g, (_, key) => {
		return replacements[key] || `{${key}}`;
	});

	// 查找中文翻译
	if (chineseTranslations[template]) {
		return chineseTranslations[template];
	}

	// 如果没有找到翻译，返回原始模板
	return template;
}

/**
 * 创建自定义翻译模块
 */
export const customTranslateModule = {
	translate: [ 'value', customTranslate ]
};
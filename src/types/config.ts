import type { Era } from "./era";

// 网站配置
export interface SiteConfig {
	title: string;
	description?: string;
}

// 时代数据类型
export interface EraData {
	id: string;
	slug: string;
	template: string;
	data: {
		title: string;
		description?: string;
		blocks: unknown[];
	};
}

// 主配置文件
export interface ContentConfig {
	site: SiteConfig;
	eras: Era[];
}

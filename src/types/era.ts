// 时代主题类型
export type EraThemeUIStyle =
	| "retro" // 复古风格（早期时代）
	| "classic" // 经典风格（中期时代）
	| "modern" // 现代风格（近期时代）
	| "futuristic"; // 未来风格（AI时代）

export type EraAnimationLevel = "minimal" | "moderate" | "rich";

export interface EraTheme {
	/** 主色调 */
	primaryColor: string;
	/** 次要色调 */
	secondaryColor: string;
	/** 强调色 */
	accentColor: string;
	/** 背景色 */
	backgroundColor: string;
	/** 文字颜色 */
	textColor: string;
	/** 字体族 */
	fontFamily: string;
	/** UI风格类型 */
	uiStyle: EraThemeUIStyle;
	/** 动画级别 */
	animationLevel: EraAnimationLevel;
}

// 内容块类型
export type ContentBlockType =
	| "hero" // 英雄区块
	| "text" // 文本区块
	| "image" // 图片区块
	| "code" // 代码示例区块
	| "timeline" // 时间线展示区块
	| "quote" // 引用区块
	| "biography" // 人物传记区块
	| "event" // 事件区块
	| "chart"; // 数据图表区块

// 基础内容块接口
export interface BaseContentBlock {
	id?: string;
	type: ContentBlockType;
}

// HeroBlock 内容
export interface HeroBlockContent {
	title: string;
	subtitle?: string;
	description?: string;
	backgroundImage?: {
		src: string;
		alt: string;
		opacity?: number;
	};
	cta?: {
		label: string;
		href: string;
		variant?: "primary" | "secondary" | "outline";
	};
}

// TextBlock 内容
export interface TextBlockContent {
	content: string | TextContentItem[];
	variant?: "default" | "lead" | "caption";
	align?: "left" | "center" | "justify";
	maxWidth?: "sm" | "md" | "lg" | "full";
}

export interface TextContentItem {
	type: "paragraph" | "heading" | "list" | "blockquote";
	content: string | string[];
	level?: number;
}

// ImageBlock 内容
export interface ImageBlockContent {
	image: {
		src: string;
		alt: string;
		width?: number;
		height?: number;
	};
	caption?: string;
	source?: {
		text: string;
		url: string;
	};
	layout?: "contain" | "cover" | "wide" | "full";
	rounded?: "none" | "sm" | "md" | "lg" | "full";
	shadow?: boolean;
}

// CodeBlock 内容
export interface CodeBlockContent {
	code: string;
	language?: string;
	filename?: string;
	showLineNumbers?: boolean;
	startLineNumber?: number;
	showCopyButton?: boolean;
	title?: string;
}

// TimelineBlock 内容
export interface TimelineBlockContent {
	events: TimelineEvent[];
	orientation?: "vertical" | "horizontal";
	theme?: "default" | "era" | "custom";
	customColor?: string;
	showEraMarkers?: boolean;
}

export interface TimelineEvent {
	id: string;
	date: string;
	title: string;
	description?: string;
	href?: string;
	icon?: string;
	highlighted?: boolean;
	era?: string;
}

// QuoteBlock 内容
export interface QuoteBlockContent {
	quote: string;
	cite?: string;
	citeTitle?: string;
	citeUrl?: string;
	variant?: "default" | "prominent" | "era";
}

// BiographyBlock 内容
export interface BiographyBlockContent {
	person: {
		name: string;
		title?: string;
		lifespan?: {
			birth: string;
			death?: string;
		};
		photo?: {
			src: string;
			alt: string;
		};
		bio: string;
		contributions?: string[];
		links?: {
			label: string;
			url: string;
		}[];
	};
	layout?: "card" | "profile" | "compact";
}

// EventBlock 内容
export interface EventBlockContent {
	id: string;
	title: string;
	date: string;
	year: number;
	description?: string;
	tags?: string[];
	image?: {
		src: string;
		alt: string;
	};
	link?: string;
}

// ChartBlock 内容
export interface ChartBlockContent {
	chartType: "line" | "bar" | "pie" | "area" | "scatter";
	title?: string;
	description?: string;
	data: ChartDataPoint[];
	xAxis?: {
		label: string;
		format?: "number" | "year" | "percentage";
	};
	yAxis?: {
		label: string;
		min?: number;
		max?: number;
		format?: "number" | "percentage";
	};
	showLegend?: boolean;
	animation?: boolean;
	colors?: string[];
	tooltip?: {
		enabled?: boolean;
		format?: string;
	};
}

export interface ChartDataPoint {
	label: string;
	value: number | { [key: string]: number };
	color?: string;
	description?: string;
}

// 内容块内容类型映射
export type ContentBlockContent = {
	hero: HeroBlockContent;
	text: TextBlockContent;
	image: ImageBlockContent;
	code: CodeBlockContent;
	timeline: TimelineBlockContent;
	quote: QuoteBlockContent;
	biography: BiographyBlockContent;
	event: EventBlockContent;
	chart: ChartBlockContent;
};

// 内容块样式配置
export interface ContentBlockStyles {
	theme?: EraThemeType;
	variant?: string;
	className?: string;
	source?: {
		text: string;
		url: string;
	};
}

export type EraThemeType = "prehistoric" | "browser" | "ajax" | "framework" | "engineering" | "ai" | "default";

// 完整的内容块类型
export interface ContentBlock extends BaseContentBlock {
	content: ContentBlockContent[ContentBlockType];
	styles?: ContentBlockStyles;
}

// 时代内容配置
export interface EraContent {
	blocks: ContentBlock[];
	title?: string;
	subtitle?: string;
	featuredImage?: string;
}

// 时代类型
export interface Era {
	id: string;
	slug: string;
	name: string;
	nameEn?: string;
	period: [number, number];
	description: string;
	theme: EraTheme;
	template: string;
	content: EraContent;
	related?: {
		previous?: string;
		next?: string;
	};
}

// 时代摘要信息
export interface EraSummary {
	id: string;
	slug: string;
	name: string;
	period: [number, number];
	theme: EraTheme;
}

// 时代配置
export interface EraConfig extends Era {
	_filePath?: string;
	_lastModified?: string;
}

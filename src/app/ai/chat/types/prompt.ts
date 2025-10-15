export interface PromptTemplate {
	id: string;
	title: string;
	content: string;
	description?: string;
	category: string;
	tags: string[];
	variables?: PromptVariable[];
	createdAt: Date;
	updatedAt: Date;
	isFavorite: boolean;
	usageCount: number;
}

export interface PromptVariable {
	name: string;
	description?: string;
	defaultValue?: string;
	required: boolean;
}

export interface PromptCategory {
	id: string;
	name: string;
	description?: string;
	color?: string;
	icon?: string;
}

export interface PromptTemplateFormData {
	title: string;
	content: string;
	description: string;
	category: string;
	tags: string[];
	variables: PromptVariable[];
}

export interface PromptSearchFilters {
	category?: string;
	tags?: string[];
	isFavorite?: boolean;
	searchText?: string;
}

// 默认分类
export const DEFAULT_CATEGORIES: PromptCategory[] = [
	{ id: "general", name: "通用", description: "通用提示词模板", color: "#3B82F6", icon: "💬" },
	{ id: "coding", name: "编程", description: "代码相关提示词", color: "#10B981", icon: "💻" },
	{ id: "writing", name: "写作", description: "写作辅助提示词", color: "#8B5CF6", icon: "✍️" },
	{ id: "analysis", name: "分析", description: "数据分析提示词", color: "#F59E0B", icon: "📊" },
	{ id: "creative", name: "创意", description: "创意生成提示词", color: "#EC4899", icon: "🎨" },
	{ id: "business", name: "商务", description: "商务办公提示词", color: "#6366F1", icon: "💼" },
	{ id: "learning", name: "学习", description: "教育学习提示词", color: "#14B8A6", icon: "📚" },
];

// 默认模板
export const DEFAULT_TEMPLATES: Omit<PromptTemplate, "id" | "createdAt" | "updatedAt" | "usageCount">[] = [
	{
		title: "代码解释器",
		content: `请解释以下代码的功能和工作原理：

\`\`\`{{language}}
{{code}}
\`\`\`

请从以下几个方面进行详细分析：
1. 代码的主要功能和目的
2. 关键算法或逻辑的实现方式
3. 代码结构和设计模式
4. 可能的优化建议
5. 潜在的问题或改进点`,
		description: "用于解释和分析代码片段的功能",
		category: "coding",
		tags: ["代码", "解释", "分析"],
		variables: [
			{ name: "language", description: "编程语言", required: true },
			{ name: "code", description: "要解释的代码", required: true }
		],
		isFavorite: true,
	},
	{
		title: "文章总结",
		content: `请对以下文章进行总结：

文章标题：{{title}}
文章内容：{{content}}

请提供：
1. 核心观点总结（3-5个要点）
2. 主要论证逻辑
3. 关键数据或事实
4. 个人见解或评价
5. 相关延伸思考

总结要求：简洁明了，重点突出，逻辑清晰。`,
		description: "快速总结文章的核心内容",
		category: "writing",
		tags: ["总结", "文章", "提炼"],
		variables: [
			{ name: "title", description: "文章标题", required: false },
			{ name: "content", description: "文章内容", required: true }
		],
		isFavorite: false,
	},
	{
		title: "学习计划制定",
		content: `我想学习 {{topic}}，请为我制定一个详细的学习计划。

学习目标：{{goal}}
可用时间：{{timeAvailable}}
当前水平：{{currentLevel}}

请提供：
1. 学习路线图（分阶段目标）
2. 推荐学习资源（书籍、课程、网站等）
3. 每日/每周学习计划
4. 实践项目建议
5. 进度评估方法
6. 可能遇到的困难及解决方案

计划要求：切实可行，循序渐进，注重实践。`,
		description: "制定个性化的学习计划",
		category: "learning",
		tags: ["学习", "计划", "教育"],
		variables: [
			{ name: "topic", description: "学习主题", required: true },
			{ name: "goal", description: "学习目标", required: true },
			{ name: "timeAvailable", description: "可用时间", required: true },
			{ name: "currentLevel", description: "当前水平", required: false }
		],
		isFavorite: true,
	},
	{
		title: "商务邮件",
		content: `请帮我写一封商务邮件：

收件人：{{recipient}}
邮件主题：{{subject}}
邮件目的：{{purpose}}
核心内容：{{content}}

邮件要求：
1. 语气专业、礼貌
2. 结构清晰、逻辑性强
3. 重点突出、详略得当
4. 符合商务邮件格式规范

请提供完整的邮件内容，包括称呼、正文、结尾、署名等。`,
		description: "生成专业的商务邮件",
		category: "business",
		tags: ["邮件", "商务", "沟通"],
		variables: [
			{ name: "recipient", description: "收件人", required: true },
			{ name: "subject", description: "邮件主题", required: true },
			{ name: "purpose", description: "邮件目的", required: true },
			{ name: "content", description: "核心内容", required: true }
		],
		isFavorite: false,
	},
	{
		title: "创意头脑风暴",
		content: `我需要进行关于 {{topic}} 的创意头脑风暴。

背景信息：{{background}}
目标受众：{{audience}}
期望结果：{{outcome}}

请从以下角度提供创意点子：
1. 打破常规的创新思路
2. 跨界融合的可能性
3. 技术实现的可行方案
4. 用户体验的优化点
5. 市场差异化的亮点

每个创意点子请包括：
- 核心概念描述
- 实现路径
- 预期效果
- 风险评估

请提供至少 5 个有价值的创意建议。`,
		description: "激发创意思维和头脑风暴",
		category: "creative",
		tags: ["创意", "头脑风暴", "创新"],
		variables: [
			{ name: "topic", description: "创意主题", required: true },
			{ name: "background", description: "背景信息", required: false },
			{ name: "audience", description: "目标受众", required: false },
			{ name: "outcome", description: "期望结果", required: true }
		],
		isFavorite: false,
	},
	{
		title: "数据分析报告",
		content: `请分析以下数据并生成报告：

数据类型：{{dataType}}
数据描述：{{dataDescription}}
分析目标：{{analysisGoal}}

请提供：
1. 数据概览和基本统计
2. 关键趋势和模式识别
3. 异常值和特殊发现
4. 相关性分析
5. 预测模型或推断
6. 业务建议和行动方案

报告要求：
- 数据驱动的结论
- 清晰的可视化建议
- 实用的业务洞察
- 风险和局限性说明`,
		description: "数据分析和报告生成",
		category: "analysis",
		tags: ["数据", "分析", "报告"],
		variables: [
			{ name: "dataType", description: "数据类型", required: true },
			{ name: "dataDescription", description: "数据描述", required: true },
			{ name: "analysisGoal", description: "分析目标", required: true }
		],
		isFavorite: false,
	}
];
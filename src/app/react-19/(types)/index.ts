export interface ActionExample {
	id: string;
	title: string;
	description: string;
	category: string;
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	icon: React.ReactNode;
	codeSnippet: string;
	benefits: string[];
	useCases: string[];
	problemsSolved: Array<{
		problem: string;
		description: string;
		solution: string;
	}>;
}

export interface WSection {
	description: string;
	features: string[];
}

export interface FeatureCard {
	icon: React.ReactNode;
	title: string;
	description: string;
	bgColor: string;
	iconColor: string;
	titleColor: string;
	descriptionColor: string;
}

export interface OfficialExample {
	title: string;
	code: string;
	description?: string;
}

export interface CacheSignalExample {
	id: string;
	title: string;
	description: string;
	category: string;
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	icon: React.ReactNode;
	codeSnippet: string;
	benefits: string[];
	useCases: string[];
	problemsSolved: Array<{
		problem: string;
		description: string;
		solution: string;
	}>;
}

export interface CompilerExample {
	id: string;
	title: string;
	description: string;
	category: string;
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	icon: React.ReactNode;
	codeSnippet: string;
	benefits: string[];
	useCases: string[];
	problemsSolved: Array<{
		problem: string;
		description: string;
		solution: string;
	}>;
}

export interface MetadataExample {
	id: string;
	title: string;
	description: string;
	category: string;
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	icon: React.ReactNode;
	codeSnippet: string;
	benefits: string[];
	useCases: string[];
	problemsSolved: Array<{
		problem: string;
		description: string;
		solution: string;
	}>;
}

export interface OwnerStackExample {
	id: string;
	title: string;
	description: string;
	category: string;
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	icon: React.ReactNode;
	codeSnippet: string;
	benefits: string[];
	useCases: string[];
	problemsSolved: Array<{
		problem: string;
		description: string;
		solution: string;
	}>;
}

export interface RefAsPropExample {
	id: string;
	title: string;
	description: string;
	category: string;
	difficulty: "初级" | "中级" | "高级";
	status: "completed" | "in-progress" | "planned";
	icon: React.ReactNode;
	codeSnippet: string;
	benefits: string[];
	useCases: string[];
	problemsSolved: Array<{
		problem: string;
		description: string;
		solution: string;
	}>;
}

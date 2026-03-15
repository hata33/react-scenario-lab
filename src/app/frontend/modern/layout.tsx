import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "现代前端工程化实践 - React Scenario Lab",
	description: "深入了解现代前端开发的核心技能、职责范围和工程化实践",
};

export default function ModernFrontendLayout({ children }: { children: React.ReactNode }) {
	return children;
}

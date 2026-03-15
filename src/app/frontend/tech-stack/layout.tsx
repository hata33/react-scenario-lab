import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "前端技术栈演进 - React Scenario Lab",
	description: "从 Web 诞生到 AI 时代，了解前端技术栈的演进历程，回顾那些改变前端发展历程的重要技术里程碑",
};

export default function TechStackLayout({ children }: { children: React.ReactNode }) {
	return children;
}

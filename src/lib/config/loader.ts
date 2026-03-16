import type { ContentConfig } from "@/types/config";

// 服务端加载配置
export async function loadContentConfig(): Promise<ContentConfig> {
	const fs = await import("node:fs/promises");
	const path = await import("node:path");

	const configPath = path.join(process.cwd(), "config", "content.json");
	const content = await fs.readFile(configPath, "utf-8");
	const data = JSON.parse(content);

	return data as ContentConfig;
}

// 客户端加载配置
export async function loadContentConfigClient(): Promise<ContentConfig> {
	const response = await fetch("/config/content.json");
	const data = await response.json();

	return data as ContentConfig;
}

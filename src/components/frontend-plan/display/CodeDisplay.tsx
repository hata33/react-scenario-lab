"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";

interface CodeDisplayProps {
	code: string;
	language?: string;
	theme?: "light" | "dark";
	height?: string;
	title?: string;
	showCopyButton?: boolean;
	className?: string;
}

// Monaco Editor 支持的语言映射
function getMonacoLanguage(language: string): string {
	const langMap: Record<string, string> = {
		typescript: "typescript",
		javascript: "javascript",
		css: "css",
		html: "html",
		xml: "xml",
		json: "json",
		python: "python",
		java: "java",
		cpp: "cpp",
		c: "c",
		csharp: "csharp",
		php: "php",
		ruby: "ruby",
		go: "go",
		rust: "rust",
		sql: "sql",
		markdown: "markdown",
		// Swift/ObjC 使用 C 语言模式，因为语法相似
		swift: "c",
		objectivec: "c",
		// WXML 使用 HTML
		wxml: "html",
	};
	return langMap[language.toLowerCase()] || language;
}

export function CodeDisplay({
	code,
	language = "typescript",
	theme = "dark",
	height = "auto",
	title,
	showCopyButton = true,
	className = "",
}: CodeDisplayProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// 计算代码行数来自动设置高度
	const lineCount = code.split("\n").length;
	const autoHeight = height === "auto" ? `${Math.max(200, lineCount * 20 + 40)}px` : height;
	const monacoLanguage = getMonacoLanguage(language);

	return (
		<div className={`code-display rounded-2xl border border-slate-200 overflow-hidden shadow-xl dark:border-slate-700 ${className}`}>
			{/* 头部 */}
			{(title || showCopyButton) && (
				<div className="flex items-center justify-between border-slate-200 border-b bg-gradient-to-r from-slate-100 to-slate-50 px-4 py-3 dark:border-slate-700 dark:from-slate-800 dark:to-slate-800/50">
					<div className="flex items-center gap-3">
						{/* macOS 风格的窗口控制点 */}
						<div className="flex gap-1.5">
							<div className="h-3 w-3 rounded-full bg-red-500" />
							<div className="h-3 w-3 rounded-full bg-yellow-500" />
							<div className="h-3 w-3 rounded-full bg-green-500" />
						</div>
						{title && (
							<span className="ml-2 font-medium text-slate-600 text-sm dark:text-slate-400">{title}</span>
						)}
					</div>
					{showCopyButton && (
						<button
							onClick={handleCopy}
							className="group relative inline-flex items-center gap-2 rounded-lg bg-slate-200 px-3 py-1.5 font-semibold text-slate-600 text-sm transition-all hover:bg-slate-300 hover:scale-105 active:scale-95 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600"
						>
							{copied ? (
								<>
									<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									已复制
								</>
							) : (
								<>
									<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
										/>
									</svg>
									复制代码
								</>
							)}
						</button>
					)}
				</div>
			)}

			{/* 编辑器 */}
			<div className="monaco-display-wrapper">
				<Editor
					height={autoHeight}
					value={code}
					language={monacoLanguage}
					theme={theme === "dark" ? "vs-dark" : "light"}
					options={{
						readOnly: true,
						domReadOnly: true,
						selection: { inEditableScope: false },
						minimap: { enabled: false },
						scrollBeyondLastLine: false,
						fontSize: 14,
						lineHeight: 20,
						padding: { top: 16, bottom: 16 },
						automaticLayout: true,
						scrollbar: {
							vertical: "auto",
							horizontal: "auto",
							useShadows: false,
							verticalScrollbarSize: 10,
							horizontalScrollbarSize: 10,
						},
						lineNumbers: "on",
						renderLineHighlight: "none",
						overviewRulerLanes: 0,
						hideCursorInOverviewRuler: true,
						overviewRulerBorder: false,
						folding: false,
						renderWhitespace: "selection",
						tabSize: 2,
						insertSpaces: true,
						wordWrap: "on",
					}}
				/>
			</div>
		</div>
	);
}

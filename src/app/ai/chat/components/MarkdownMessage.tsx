"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownMessageProps {
	content: string;
	className?: string;
}

export default function MarkdownMessage({ content, className = "" }: MarkdownMessageProps) {
	return (
		<div className={`prose prose-sm max-w-none ${className}`}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					code({ node, className, children, ...props }: any) {
						const inline = (props as any).inline || false;
						const match = /language-(\w+)/.exec(className || "");
						const language = match ? match[1] : "";

						return !inline && language ? (
							<div className="relative my-4">
								<div className="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 text-xs font-mono rounded-t-md">
									<span>{language}</span>
									<button
										onClick={() => {
											navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
										}}
										className="hover:text-white transition-colors"
									>
										复制
									</button>
								</div>
								<SyntaxHighlighter
									style={oneDark}
									language={language}
									PreTag="div"
									className="!mt-0 !rounded-t-none"
									{...props}
								>
									{String(children).replace(/\n$/, "")}
								</SyntaxHighlighter>
							</div>
						) : (
							<code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props}>
								{children}
							</code>
						);
					},
					pre({ children }) {
						return <>{children}</>;
					},
					blockquote({ children }) {
						return (
							<blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600">
								{children}
							</blockquote>
						);
					},
					ul({ children }) {
						return <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>;
					},
					ol({ children }) {
						return <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>;
					},
					h1({ children }) {
						return <h1 className="text-2xl font-bold my-4">{children}</h1>;
					},
					h2({ children }) {
						return <h2 className="text-xl font-bold my-3">{children}</h2>;
					},
					h3({ children }) {
						return <h3 className="text-lg font-bold my-2">{children}</h3>;
					},
					p({ children }) {
						return <p className="my-2">{children}</p>;
					},
					a({ children, href }) {
						return (
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:text-blue-800 underline"
							>
								{children}
							</a>
						);
					},
					table({ children }) {
						return (
							<div className="overflow-x-auto my-4">
								<table className="min-w-full border-collapse border border-gray-300">
									{children}
								</table>
							</div>
						);
					},
					th({ children }) {
						return (
							<th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold">
								{children}
							</th>
						);
					},
					td({ children }) {
						return (
							<td className="border border-gray-300 px-4 py-2">
								{children}
							</td>
						);
					},
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
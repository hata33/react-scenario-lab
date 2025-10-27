"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

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
								<div className="flex items-center justify-between rounded-t-md bg-gray-800 px-4 py-2 font-mono text-gray-300 text-xs">
									<span>{language}</span>
									<button
										onClick={() => {
											navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
										}}
										className="transition-colors hover:text-white"
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
							<code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm" {...props}>
								{children}
							</code>
						);
					},
					pre({ children }) {
						return <>{children}</>;
					},
					blockquote({ children }) {
						return (
							<blockquote className="my-4 border-gray-300 border-l-4 pl-4 text-gray-600 italic">{children}</blockquote>
						);
					},
					ul({ children }) {
						return <ul className="my-2 list-inside list-disc space-y-1">{children}</ul>;
					},
					ol({ children }) {
						return <ol className="my-2 list-inside list-decimal space-y-1">{children}</ol>;
					},
					h1({ children }) {
						return <h1 className="my-4 font-bold text-2xl">{children}</h1>;
					},
					h2({ children }) {
						return <h2 className="my-3 font-bold text-xl">{children}</h2>;
					},
					h3({ children }) {
						return <h3 className="my-2 font-bold text-lg">{children}</h3>;
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
								className="text-blue-600 underline hover:text-blue-800"
							>
								{children}
							</a>
						);
					},
					table({ children }) {
						return (
							<div className="my-4 overflow-x-auto">
								<table className="min-w-full border-collapse border border-gray-300">{children}</table>
							</div>
						);
					},
					th({ children }) {
						return <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold">{children}</th>;
					},
					td({ children }) {
						return <td className="border border-gray-300 px-4 py-2">{children}</td>;
					},
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}

"use client";

import React, { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

interface MonacoEditorProps {
	height?: string;
	width?: string;
	defaultValue?: string;
	value?: string;
	language?: string;
	theme?: "light" | "dark";
	onChange?: (value: string) => void;
	options?: any;
	path?: string;
}

export default function MonacoEditor({
	height = "400px",
	width = "100%",
	defaultValue = "// 在这里编写你的代码",
	value,
	language = "typescript",
	theme = "light",
	onChange,
	options = {},
	path,
}: MonacoEditorProps) {
	const [internalValue, setInternalValue] = useState(value || defaultValue);
	const editorRef = useRef<any>(null);

	const defaultOptions = {
		selectOnLineNumbers: true,
		minimap: { enabled: false },
		fontSize: 14,
		scrollBeyondLastLine: false,
		automaticLayout: true,
		tabSize: 2,
		insertSpaces: true,
		wordWrap: "on",
		bracketPairColorization: { enabled: true },
		...options,
	};

	const handleEditorDidMount = (editor: any, monaco: any) => {
		editorRef.current = editor;

		// 添加快捷键
		editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
			// Ctrl/Cmd + S 保存快捷键
			console.log("保存代码:", editor.getValue());
		});
	};

	const handleEditorChange = (value: string | undefined) => {
		const stringValue = value || "";
		// 如果是受控组件（传入了 value），只调用 onChange
		// 如果是非受控组件，更新内部状态
		if (value === undefined) {
			setInternalValue(stringValue);
		}
		onChange?.(stringValue);
	};

	return (
		<div className="monaco-editor-container">
			<Editor
				height={height}
				width={width}
				language={language}
				theme={theme === "dark" ? "vs-dark" : "light"}
				value={value !== undefined ? value : internalValue}
				defaultValue={defaultValue}
				onChange={handleEditorChange}
				onMount={handleEditorDidMount}
				options={defaultOptions}
				path={path}
				loading={
					<div className="flex items-center justify-center p-8">
						<div className="text-center">
							<div className="mb-2 text-lg">正在加载编辑器...</div>
							<div className="text-sm text-gray-500">请稍候</div>
						</div>
					</div>
				}
			/>
		</div>
	);
}
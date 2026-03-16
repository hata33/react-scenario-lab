"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

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

// 移动端检测 hook
function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return isMobile;
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
	const isMobile = useIsMobile();

	// 移动端使用较小的高度和较大的字体（防止 iOS 自动缩放）
	const responsiveHeight = isMobile ? "300px" : height;
	const mobileFontSize = 16; // 16px 防止 iOS Safari 自动缩放

	const defaultOptions = {
		selectOnLineNumbers: true,
		minimap: { enabled: false },
		fontSize: isMobile ? mobileFontSize : 14,
		scrollBeyondLastLine: false,
		automaticLayout: true,
		tabSize: 2,
		insertSpaces: true,
		wordWrap: "on",
		bracketPairColorization: { enabled: true },
		lineNumbers: isMobile ? "off" : "on", // 移动端隐藏行号节省空间
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
				height={responsiveHeight}
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
							<div className="text-gray-500 text-sm">请稍候</div>
						</div>
					</div>
				}
			/>
		</div>
	);
}

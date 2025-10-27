"use client";

import { useState } from "react";

interface SettingsPanelProps {
	onModelChange: (model: string) => void;
	onApiKeyChange: (apiKey: string) => void;
}

export default function SettingsPanel({ onModelChange, onApiKeyChange }: SettingsPanelProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
	const [apiKey, setApiKey] = useState("");

	const handleModelChange = (model: string) => {
		setSelectedModel(model);
		onModelChange(model);
	};

	const handleApiKeyChange = (key: string) => {
		setApiKey(key);
		onApiKeyChange(key);
	};

	return (
		<div className="border-gray-200 border-b p-4">
			<button onClick={() => setIsOpen(!isOpen)} className="mb-2 text-gray-600 text-sm hover:text-gray-800">
				{isOpen ? "隐藏设置" : "显示设置"} ▼
			</button>

			{isOpen && (
				<div className="mt-3 space-y-3">
					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">AI 模型</label>
						<select
							value={selectedModel}
							onChange={(e) => handleModelChange(e.target.value)}
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
							<option value="gpt-4">GPT-4</option>
							<option value="claude-3">Claude-3</option>
							<option value="qwen-max">通义千问 Max</option>
							<option value="ernie-bot">文心一言</option>
						</select>
					</div>

					<div>
						<label className="mb-1 block font-medium text-gray-700 text-sm">API 密钥</label>
						<input
							type="password"
							value={apiKey}
							onChange={(e) => handleApiKeyChange(e.target.value)}
							placeholder="请输入 API 密钥..."
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>
			)}
		</div>
	);
}

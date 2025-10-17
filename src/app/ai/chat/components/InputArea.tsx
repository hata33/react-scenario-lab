"use client";

interface InputAreaProps {
	value: string;
	onChange: (value: string) => void;
	onSendMessage: () => void;
}

export default function InputArea({
	value,
	onChange,
	onSendMessage,
}: InputAreaProps) {
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSendMessage();
		}
	};

	return (
		<div className="border-t border-gray-200 p-4">
			<div className="flex gap-2">
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="输入您的问题..."
					className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
				<button
					onClick={onSendMessage}
					className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					发送
				</button>
			</div>
		</div>
	);
}

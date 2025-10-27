"use client";

interface InputAreaProps {
	value: string;
	onChange: (value: string) => void;
	onSendMessage: () => void;
}

export default function InputArea({ value, onChange, onSendMessage }: InputAreaProps) {
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSendMessage();
		}
	};

	return (
		<div className="border-gray-200 border-t p-4">
			<div className="flex gap-2">
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="输入您的问题..."
					className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					onClick={onSendMessage}
					className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					发送
				</button>
			</div>
		</div>
	);
}

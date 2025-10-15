"use client";

interface Message {
	id: number;
	type: "user" | "assistant";
	content: string;
}

interface MessageListProps {
	messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
	return (
		<div className="flex-1 overflow-y-auto p-4 space-y-4">
			{messages.map((message) => (
				<div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
					<div className={`max-w-[70%] rounded-lg px-4 py-2 ${
						message.type === "user"
							? "bg-blue-500 text-white"
							: "bg-gray-100 text-gray-800"
					}`}>
						{message.content}
					</div>
				</div>
			))}
		</div>
	);
}
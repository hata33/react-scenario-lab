import { useEffect, useRef, useState } from "react";

type Msg = { id: number; text: string };

export default function ChatRoom() {
	const [messages, setMessages] = useState<Msg[]>([]);
	const [input, setInput] = useState("");
	const wsRef = useRef<WebSocket | null>(null);

	useEffect(() => {
		const ws = new WebSocket("wss://echo.websocket.events");
		wsRef.current = ws;
		ws.onmessage = (e) => setMessages((arr) => [...arr, { id: Date.now() + Math.random(), text: String(e.data) }]);
		return () => ws.close();
	}, []);

	const send = () => {
		if (!input.trim()) return;
		wsRef.current?.send(input.trim());
		setInput("");
	};

	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl md:text-3xl">聊天室 (WebSocket)</h2>
			<div className="h-64 space-y-1 overflow-auto rounded border bg-white p-3 md:h-80">
				{messages.map((m) => (
					<div key={m.id} className="text-sm">
						{m.text}
					</div>
				))}
			</div>
			<div className="mt-3 flex flex-col gap-2 sm:flex-row">
				<input
					className="min-h-[44px] flex-1 rounded border px-3 py-3 text-base"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button
					className="min-h-[44px] min-w-[88px] touch-manipulation rounded bg-gray-900 px-4 py-3 text-white transition-transform active:scale-95"
					onClick={send}
				>
					发送
				</button>
			</div>
		</div>
	);
}

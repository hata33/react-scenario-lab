"use client";

import Layout from "@/components/Layout";
import ChatRoom from "@/components/pages/Chat/ChatRoom";

export default function ChatRoomPage() {
	return (
		<Layout>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">聊天室(WebSocket)</h1>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<ChatRoom />
				</div>
			</div>
		</Layout>
	);
}

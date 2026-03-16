import { useState } from "react";

export default function Login() {
	const [user, setUser] = useState("");
	const login = () => {
		if (!user.trim()) return;
		localStorage.setItem("token", "demo");
	};
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl md:text-3xl">登录</h2>
			<div className="max-w-sm">
				<input
					className="min-h-[44px] w-full rounded border px-3 py-3 text-base"
					placeholder="用户名"
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
				<button
					className="mt-3 min-h-[44px] w-full touch-manipulation rounded bg-gray-900 px-4 py-3 text-white transition-transform active:scale-95"
					onClick={login}
				>
					登录
				</button>
			</div>
		</div>
	);
}

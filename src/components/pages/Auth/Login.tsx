import { useState } from "react";

export default function Login() {
	const [user, setUser] = useState("");
	const login = () => {
		if (!user.trim()) return;
		localStorage.setItem("token", "demo");
	};
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">登录</h2>
			<div className="max-w-sm">
				<input
					className="w-full rounded border px-3 py-2"
					placeholder="用户名"
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
				<button
					className="mt-3 rounded bg-gray-900 px-3 py-2 text-white"
					onClick={login}
				>
					登录
				</button>
			</div>
		</div>
	);
}

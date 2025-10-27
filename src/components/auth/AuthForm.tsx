"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function AuthForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const router = useRouter();

	const handleAuth = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			if (isSignUp) {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: `${window.location.origin}/supabase/auth/callback`,
					},
				});
				if (error) throw error;
				setError("请检查邮箱确认注册");
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password,
				});
				if (error) throw error;
				router.refresh();
			}
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mx-auto mt-8 max-w-md rounded-lg bg-white p-6 shadow-md">
			<h2 className="mb-6 text-center font-bold text-2xl">{isSignUp ? "注册" : "登录"}</h2>

			<form onSubmit={handleAuth} className="space-y-4">
				<div>
					<label className="block font-medium text-gray-700 text-sm">邮箱</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						required
					/>
				</div>

				<div>
					<label className="block font-medium text-gray-700 text-sm">密码</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						required
						minLength={6}
					/>
				</div>

				{error && <div className="text-red-500 text-sm">{error}</div>}

				<button
					type="submit"
					disabled={loading}
					className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
				>
					{loading ? "处理中..." : isSignUp ? "注册" : "登录"}
				</button>
			</form>

			<div className="mt-4 text-center">
				<button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500 hover:text-blue-600">
					{isSignUp ? "已有账户？点击登录" : "没有账户？点击注册"}
				</button>
			</div>
		</div>
	);
}

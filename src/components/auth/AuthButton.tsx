"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase-client";

export default function AuthButton() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleSignOut = async () => {
		setLoading(true);
		await supabase.auth.signOut();
		router.refresh();
	};

	return (
		<button
			onClick={handleSignOut}
			disabled={loading}
			className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50"
		>
			{loading ? "Signing out..." : "Sign out"}
		</button>
	);
}

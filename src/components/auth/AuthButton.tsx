'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'

export default function AuthButton() {
	const router = useRouter()
	const supabase = createClient()
	const [loading, setLoading] = useState(false)

	const handleSignOut = async () => {
		setLoading(true)
		await supabase.auth.signOut()
		router.refresh()
	}

	return (
		<button
			onClick={handleSignOut}
			disabled={loading}
			className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
		>
			{loading ? 'Signing out...' : 'Sign out'}
		</button>
	)
}
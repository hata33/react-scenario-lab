"use client";

import { createContext, useContext, useState } from "react";

const FormStatusContext = createContext<{
	pending: boolean;
	data: FormData | null;
}>({
	pending: false,
	data: null,
});

// 模拟 useFormStatus Hook
export function useFormStatus() {
	return useContext(FormStatusContext);
}

// 模拟 useTransition Hook
export function useTransition(): [boolean, (callback: () => void) => void] {
	const [isPending, setIsPending] = useState(false);

	const startTransition = (callback: () => void) => {
		setIsPending(true);
		setTimeout(() => {
			callback();
			setIsPending(false);
		}, 0);
	};

	return [isPending, startTransition];
}

export { FormStatusContext };

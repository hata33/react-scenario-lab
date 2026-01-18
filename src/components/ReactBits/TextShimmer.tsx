"use client";

import { useEffect, useRef, useState } from "react";

interface TextShimmerProps {
	children: string;
	className?: string;
	speed?: number;
}

export function TextShimmer({ children, className = "", speed = 2 }: TextShimmerProps) {
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setOffset((prev) => (prev + speed) % 100);
		}, 50);
		return () => clearInterval(interval);
	}, [speed]);

	return (
		<span className={`inline-block ${className}`}>
			<span
				className="bg-gradient-to-r from-transparent via-white to-transparent bg-clip-text text-transparent bg-[length:200%_100%]"
				style={{
					backgroundPosition: `${offset}% 0`,
					transition: "background-position 0.1s linear",
				}}
			>
				{children}
			</span>
		</span>
	);
}

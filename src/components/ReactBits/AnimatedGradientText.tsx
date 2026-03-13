"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface AnimatedGradientTextProps {
	children: string;
	className?: string;
	colors?: string[];
}

export function AnimatedGradientText({
	children,
	className = "",
	colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"],
}: AnimatedGradientTextProps) {
	const textRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!textRef.current) return;

		const text = textRef.current;

		const animateGradient = () => {
			gsap.to(text, {
				duration: 3,
				backgroundPosition: "100% 50%",
				ease: "none",
				repeat: -1,
				yoyo: true,
			});
		};

		animateGradient();
	}, []);

	return (
		<span
			ref={textRef}
			className={`inline-block bg-gradient-to-r bg-clip-text text-transparent ${className}`}
			style={{
				backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
				backgroundSize: "200% 200%",
				backgroundPosition: "0% 50%",
			}}
		>
			{children}
		</span>
	);
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FloatingElementProps {
	children: React.ReactNode;
	className?: string;
	duration?: number;
	distance?: number;
}

export function FloatingElement({
	children,
	className = "",
	duration = 3,
	distance = 20,
}: FloatingElementProps) {
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!elementRef.current) return;

		gsap.to(elementRef.current, {
			y: -distance,
			duration,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
		});
	}, [distance, duration]);

	return (
		<div ref={elementRef} className={className}>
			{children}
		</div>
	);
}

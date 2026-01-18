"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface InfiniteScrollProps {
	children: React.ReactNode;
	className?: string;
	speed?: number;
	direction?: "left" | "right";
}

export function InfiniteScroll({
	children,
	className = "",
	speed = 50,
	direction = "left",
}: InfiniteScrollProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current || !scrollRef.current) return;

		const container = containerRef.current;
		const scroll = scrollRef.current;

		// Duplicate content for seamless loop
		const content = scroll.innerHTML;
		scroll.innerHTML = content + content;

		gsap.to(scroll, {
			x: direction === "left" ? "-50%" : "50%",
			duration: speed,
			repeat: -1,
			ease: "none",
		});
	}, [direction, speed]);

	return (
		<div ref={containerRef} className={`overflow-hidden ${className}`}>
			<div ref={scrollRef} className="flex whitespace-nowrap">
				{children}
			</div>
		</div>
	);
}

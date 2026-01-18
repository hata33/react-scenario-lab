"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface AnimatedCounterProps {
	end: number;
	duration?: number;
	className?: string;
	suffix?: string;
	prefix?: string;
}

export function AnimatedCounter({
	end,
	duration = 2,
	className = "",
	suffix = "",
	prefix = "",
}: AnimatedCounterProps) {
	const [count, setCount] = useState(0);
	const countRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!countRef.current) return;

		const obj = { value: 0 };

		gsap.to(obj, {
			value: end,
			duration,
			ease: "power2.out",
			onUpdate: () => {
				setCount(Math.round(obj.value));
			},
		});
	}, [end, duration]);

	return (
		<span ref={countRef} className={className}>
			{prefix}
			{count}
			{suffix}
		</span>
	);
}

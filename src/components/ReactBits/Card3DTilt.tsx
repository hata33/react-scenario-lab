"use client";

import { useRef, useState } from "react";

interface Card3DTiltProps {
	children: React.ReactNode;
	className?: string;
	maxTilt?: number;
}

export function Card3DTilt({ children, className = "", maxTilt = 10 }: Card3DTiltProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const [transform, setTransform] = useState("");

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;

		const card = cardRef.current;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = ((y - centerY) / centerY) * -maxTilt;
		const rotateY = ((x - centerX) / centerX) * maxTilt;

		setTransform(
			`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
		);
	};

	const handleMouseLeave = () => {
		setTransform("perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)");
	};

	return (
		<div
			ref={cardRef}
			className={className}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				transform,
				transition: "transform 0.1s ease-out",
				transformStyle: "preserve-3d",
			}}
		>
			{children}
		</div>
	);
}

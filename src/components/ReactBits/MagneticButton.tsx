"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
	children: React.ReactNode;
	className?: string;
	strength?: number;
	onClick?: () => void;
}

export function MagneticButton({
	children,
	className = "",
	strength = 0.3,
	onClick,
}: MagneticButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!buttonRef.current) return;

		const button = buttonRef.current;
		const rect = button.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;

		gsap.to(button, {
			x: x * strength,
			y: y * strength,
			duration: 0.3,
			ease: "power2.out",
		});
	};

	const handleMouseLeave = () => {
		if (!buttonRef.current) return;

		setIsHovered(false);

		gsap.to(buttonRef.current, {
			x: 0,
			y: 0,
			duration: 0.5,
			ease: "elastic.out(1, 0.3)",
		});
	};

	return (
		<button
			ref={buttonRef}
			className={className}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={() => setIsHovered(true)}
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	);
}

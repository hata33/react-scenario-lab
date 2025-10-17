"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Page() {
	const boxRef = useRef<HTMLDivElement>(null);
	const tlRef = useRef<gsap.core.Timeline | null>(null);

	useEffect(() => {
		const el = boxRef.current;
		if (!el) return;
		// 基础入门：to/from/fromTo/set 演示
		tlRef.current = gsap
			.timeline({ defaults: { duration: 0.8, ease: "power2.out" } })
			.set(el, { opacity: 0, x: -60, rotate: -10 })
			.to(el, { opacity: 1, x: 0, rotate: 0 })
			.to(el, { y: 40 })
			.fromTo(el, { scale: 1 }, { scale: 1.15 })
			.to(el, { scale: 1, y: 0 });
		return () => {
			tlRef.current?.kill();
		};
	}, []);

	return (
		<div style={{ padding: 24 }}>
			<h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
				GSAP 基础入门
			</h1>
			<p style={{ color: "#666", marginBottom: 16 }}>
				演示 gsap.set / gsap.to / gsap.fromTo 的基本用法。
			</p>
			<div
				ref={boxRef}
				style={{
					width: 120,
					height: 120,
					borderRadius: 12,
					background: "linear-gradient(135deg,#60a5fa,#34d399)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "#fff",
					fontWeight: 700,
					boxShadow: "0 8px 24px rgba(0,0,0,.15)",
				}}
			>
				GSAP
			</div>
		</div>
	);
}

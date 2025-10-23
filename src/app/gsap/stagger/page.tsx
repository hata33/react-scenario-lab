"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Layout from "@/components/Layout";

export default function Page() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [from, setFrom] = useState<
		"start" | "center" | "end" | "edges" | "random"
	>("start");
	const [grid, setGrid] = useState<[number, number] | null>([3, 4]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		const boxes = Array.from(
			container.querySelectorAll<HTMLDivElement>(".cell"),
		);
		gsap.set(boxes, { opacity: 0, y: 24, scale: 0.9 });
		gsap.to(boxes, {
			opacity: 1,
			y: 0,
			scale: 1,
			ease: "power2.out",
			duration: 0.5,
			stagger: {
				each: 0.05,
				from,
				grid: grid ?? undefined,
			},
		});
	}, [from, grid]);

	const toggleGrid = () => setGrid((g) => (g ? null : [3, 4]));

	return (
		<Layout>
			<div style={{ padding: 24 }}>
				<h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
					Stagger 错位动画
				</h1>
			<p style={{ color: "#666", marginBottom: 16 }}>
				切换 from 与 grid 观察入场顺序变化。
			</p>

			<div
				style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}
			>
				{(["start", "center", "end", "edges", "random"] as const).map((f) => (
					<button
						key={f}
						onClick={() => setFrom(f)}
						style={{
							padding: "6px 10px",
							borderRadius: 6,
							border: "1px solid #ddd",
							background: from === f ? "#111" : "#fff",
							color: from === f ? "#fff" : "#111",
							cursor: "pointer",
						}}
					>
						from: {f}
					</button>
				))}
				<button
					onClick={toggleGrid}
					style={{
						padding: "6px 10px",
						borderRadius: 6,
						border: "1px solid #ddd",
						background: "#fff",
					}}
				>
					{grid ? "grid: [3,4]" : "grid: off"}
				</button>
			</div>

			<div
				ref={containerRef}
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4, 70px)",
					gap: 10,
				}}
			>
				{Array.from({ length: 12 }).map((_, i) => (
					<div
						key={i}
						className="cell"
						style={{
							width: 70,
							height: 70,
							borderRadius: 10,
							background: "linear-gradient(135deg,#22d3ee,#818cf8)",
							boxShadow: "0 6px 16px rgba(0,0,0,.12)",
						}}
					/>
				))}
			</div>
		</div>
	</Layout>
);
}

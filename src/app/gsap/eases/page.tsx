"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";

const EASES = [
	"power1.inOut",
	"power2.out",
	"power3.in",
	"back.out(1.7)",
	"elastic.out(1, 0.3)",
	"bounce.out",
	"circ.out",
	"expo.out",
	"sine.inOut",
	"steps(5)",
];

export default function Page() {
	const ballRef = useRef<HTMLDivElement>(null);
	const [ease, setEase] = useState(EASES[0]);

	useEffect(() => {
		const el = ballRef.current;
		if (!el) return;
		gsap.killTweensOf(el);
		gsap.set(el, { x: 0 });
		gsap.to(el, { x: 320, duration: 1.2, ease });
	}, [ease]);

	return (
		<Layout>
			<div style={{ padding: 24 }}>
				<h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Eases 缓动函数</h1>
				<p style={{ color: "#666", marginBottom: 16 }}>选择不同缓动并观察运动差异（包含 steps 示例）。</p>

				<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
					{EASES.map((e) => (
						<button
							key={e}
							onClick={() => setEase(e)}
							style={{
								padding: "6px 10px",
								borderRadius: 6,
								border: "1px solid #ddd",
								background: ease === e ? "#111" : "#fff",
								color: ease === e ? "#fff" : "#111",
								cursor: "pointer",
							}}
						>
							{e}
						</button>
					))}
				</div>

				<div
					style={{
						position: "relative",
						height: 60,
						background: "#f7f7f7",
						borderRadius: 8,
						padding: 10,
					}}
				>
					<div
						ref={ballRef}
						style={{
							width: 36,
							height: 36,
							borderRadius: 18,
							background: "#3b82f6",
						}}
					/>
				</div>
			</div>
		</Layout>
	);
}

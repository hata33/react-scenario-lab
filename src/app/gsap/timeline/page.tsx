"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Layout from "@/components/Layout";

export default function Page() {
	const itemsRef = useRef<HTMLDivElement[]>([]);
	const tlRef = useRef<gsap.core.Timeline | null>(null);

	useEffect(() => {
		const items = itemsRef.current.filter(Boolean);
		if (items.length === 0) return () => {};

		const tl = gsap.timeline({
			defaults: { duration: 0.5, ease: "power3.out" },
		});
		tlRef.current = tl;

		tl.from(items[0], { y: 20, opacity: 0 }, 0)
			.from(items[1], { y: 20, opacity: 0 }, 0.2)
			.from(items[2], { y: 20, opacity: 0 }, 0.4)
			.addLabel("spin")
			.to(items, { rotate: 8 }, "spin")
			.to(items, { rotate: 0 })
			.addPause()
			.to(items, { x: 8, yoyo: true, repeat: 1 });

		return () => tl.kill();
	}, []);

	const setRef = (idx: number) => (el: HTMLDivElement | null) => {
		if (!el) return;
		itemsRef.current[idx] = el;
	};

	return (
		<Layout>
			<div style={{ padding: 24 }}>
				<h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Timeline 时间轴</h1>
				<p style={{ color: "#666", marginBottom: 16 }}>演示 label、错峰入场、控制（暂停位置）。</p>
				<div style={{ display: "flex", gap: 12 }}>
					{[1, 2, 3].map((n, i) => (
						<div
							key={n}
							ref={setRef(i)}
							style={{
								width: 90,
								height: 90,
								borderRadius: 12,
								background: "linear-gradient(135deg,#f59e0b,#ef4444)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "#fff",
								fontWeight: 700,
							}}
						>
							{n}
						</div>
					))}
				</div>
				<div style={{ marginTop: 16, display: "flex", gap: 8 }}>
					<button onClick={() => tlRef.current?.play()} className="btn">
						Play
					</button>
					<button onClick={() => tlRef.current?.pause()} className="btn">
						Pause
					</button>
					<button onClick={() => tlRef.current?.reverse()} className="btn">
						Reverse
					</button>
					<button onClick={() => tlRef.current?.seek(0)} className="btn">
						Seek 0
					</button>
					<button onClick={() => tlRef.current?.restart()} className="btn">
						Restart
					</button>
				</div>
				<style>{`.btn{padding:6px 10px;border:1px solid #ddd;border-radius:6px;background:#fff;cursor:pointer}`}</style>
			</div>
		</Layout>
	);
}

"use client";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import ControlPanel from "./components/ControlPanel";
import FeatureCards from "./components/FeatureCards";
import FloatingElements from "./components/FloatingElements";
// 导入组件
import HeroSection from "./components/HeroSection";
import PinSection from "./components/PinSection";
import ProgressBar from "./components/ProgressBar";
import TimelineSection from "./components/TimelineSection";

gsap.registerPlugin(ScrollTrigger, Draggable);

type TabKey = "eases" | "timeline" | "stagger" | "base" | "scrolltrigger" | "draggable" | "advanced";

export default function Page() {
	const [tab, setTab] = useState<TabKey>("scrolltrigger");
	const [scrubValue, setScrubValue] = useState(true);
	const [markers, setMarkers] = useState(false);
	const [animationSpeed, setAnimationSpeed] = useState(1);
	const mainContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// 确保所有ScrollTrigger实例使用正确的配置
		ScrollTrigger.config({
			autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
			ignoreMobileResize: true,
			// invalidateOnRefresh: true
		});

		// 延迟refresh以确保所有元素都已渲染
		const timer = setTimeout(() => {
			ScrollTrigger.refresh();
		}, 300);

		return () => {
			clearTimeout(timer);
			ScrollTrigger.getAll().forEach((st) => st.kill());
		};
	}, []);

	// 处理tab切换时的清理
	useEffect(() => {
		if (tab !== "scrolltrigger") {
			// 切换到其他tab时清理ScrollTrigger
			ScrollTrigger.getAll().forEach((st) => st.kill());
		}
	}, [tab]);

	// 全局配置更新
	useEffect(() => {
		// 更新所有ScrollTrigger实例的scrub和markers设置
		ScrollTrigger.getAll().forEach((st) => {
			if (st.vars.scrub !== undefined) {
				st.vars.scrub = scrubValue ? 1 : false;
				st.update();
			}
			if (st.vars.markers !== undefined) {
				st.vars.markers = markers;
				st.update();
			}
		});
	}, [scrubValue, markers]);

	// 动画速度控制
	useEffect(() => {
		gsap.globalTimeline.timeScale(animationSpeed);
	}, [animationSpeed]);

	if (tab === "scrolltrigger") {
		return (
			<Layout>
				<div ref={mainContainerRef} style={{ position: "relative" }}>
					{/* 进度条 */}
					<ProgressBar scrubValue={scrubValue} showPercentage={true} position="top" />

					{/* 控制面板 */}
					<ControlPanel onScrubChange={setScrubValue} onMarkersChange={setMarkers} onSpeedChange={setAnimationSpeed} />

					{/* ScrollTrigger 内容 */}
					<div style={{ paddingTop: 60 }}>
						<HeroSection />
						<FeatureCards />
						<FloatingElements />
						<PinSection />
						<TimelineSection />

						{/* 完成区域 */}
						<div
							style={{
								height: "100vh",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
								position: "relative",
								overflow: "hidden",
							}}
						>
							{/* 背景装饰 */}
							<div
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%",
									background: `
									radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
									radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)
								`,
								}}
							/>

							{/* 主要内容 */}
							<div
								style={{
									position: "relative",
									zIndex: 2,
									textAlign: "center",
									color: "white",
									maxWidth: 800,
									padding: "0 40px",
								}}
							>
								<div
									style={{
										fontSize: 80,
										marginBottom: 30,
										animation: "pulse 2s infinite",
									}}
								>
									🎉
								</div>
								<h2
									style={{
										fontSize: "clamp(42px, 6vw, 64px)",
										fontWeight: 800,
										marginBottom: 24,
										textShadow: "0 4px 20px rgba(0,0,0,0.3)",
									}}
								>
									ScrollTrigger 演示完成
								</h2>
								<p
									style={{
										fontSize: "clamp(18px, 2.5vw, 24px)",
										opacity: 0.9,
										maxWidth: 600,
										margin: "0 auto 40px",
										lineHeight: 1.6,
									}}
								>
									你已经体验了 GSAP ScrollTrigger 的强大功能，包括视差滚动、固定元素、进度指示和时间轴动画。
								</p>

								{/* 统计信息 */}
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
										gap: 20,
										marginBottom: 40,
										maxWidth: 600,
										marginLeft: "auto",
										marginRight: "auto",
									}}
								>
									{[
										{ label: "组件数量", value: "5+" },
										{ label: "动画效果", value: "20+" },
										{ label: "交互特性", value: "10+" },
										{ label: "代码示例", value: "15+" },
									].map((stat, i) => (
										<div
											key={i}
											style={{
												background: "rgba(255,255,255,0.1)",
												backdropFilter: "blur(10px)",
												padding: "20px",
												borderRadius: 16,
												border: "1px solid rgba(255,255,255,0.2)",
											}}
										>
											<div
												style={{
													fontSize: 32,
													fontWeight: 800,
													marginBottom: 8,
												}}
											>
												{stat.value}
											</div>
											<div
												style={{
													fontSize: 14,
													opacity: 0.8,
												}}
											>
												{stat.label}
											</div>
										</div>
									))}
								</div>

								{/* 操作按钮 */}
								<div
									style={{
										display: "flex",
										gap: 20,
										justifyContent: "center",
										flexWrap: "wrap",
									}}
								>
									<button
										onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
										style={{
											padding: "16px 32px",
											background: "rgba(255,255,255,0.2)",
											backdropFilter: "blur(10px)",
											border: "1px solid rgba(255,255,255,0.3)",
											borderRadius: 50,
											color: "white",
											fontSize: 16,
											fontWeight: 600,
											cursor: "pointer",
											transition: "all 0.3s ease",
										}}
									>
										🚀 回到顶部
									</button>
									<button
										onClick={() => setTab("eases")}
										style={{
											padding: "16px 32px",
											background: "rgba(255,255,255,0.1)",
											backdropFilter: "blur(10px)",
											border: "1px solid rgba(255,255,255,0.2)",
											borderRadius: 50,
											color: "white",
											fontSize: 16,
											fontWeight: 600,
											cursor: "pointer",
											transition: "all 0.3s ease",
										}}
									>
										🎨 探索更多动画
									</button>
								</div>
							</div>

							<style>{`
								@keyframes pulse {
									0%, 100% { transform: scale(1); }
									50% { transform: scale(1.1); }
								}
							`}</style>
						</div>
					</div>
				</div>
			</Layout>
		);
	}

	// 原有的其他tab内容
	return (
		<Layout>
			<div style={{ padding: 24 }}>
				<h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>GSAP 高级实验室</h1>
				<p style={{ color: "#666", marginBottom: 16 }}>
					基于真实项目需求的复杂动画示例集合，包含 ScrollTrigger、Draggable 等高级功能。
				</p>

				<Tabs
					value={tab}
					onChange={setTab}
					items={[
						{ key: "eases", label: "Eases 缓动" },
						{ key: "timeline", label: "Timeline 时间轴" },
						{ key: "stagger", label: "Stagger 错位" },
						{ key: "base", label: "基础 API" },
						{ key: "scrolltrigger", label: "ScrollTrigger 滚动" },
						{ key: "draggable", label: "Draggable 拖拽" },
						{ key: "advanced", label: "高级组合" },
					]}
				/>

				<div style={{ marginTop: 16 }}>
					{tab === "eases" && <EasesDemo />}
					{tab === "timeline" && <TimelineDemo />}
					{tab === "stagger" && <StaggerDemo />}
					{tab === "base" && <BaseDemo />}
					{tab === "draggable" && <DraggableDemo />}
					{tab === "advanced" && <AdvancedDemo />}
				</div>
			</div>
		</Layout>
	);
}

// Tab组件
function Tabs(props: { value: TabKey; onChange: (v: TabKey) => void; items: { key: TabKey; label: string }[] }) {
	return (
		<div
			style={{
				display: "flex",
				gap: 8,
				borderBottom: "1px solid #eee",
				paddingBottom: 8,
			}}
		>
			{props.items.map((it) => (
				<button
					key={it.key}
					onClick={() => props.onChange(it.key)}
					style={{
						padding: "8px 12px",
						borderRadius: 8,
						border: "1px solid #ddd",
						background: props.value === it.key ? "#111" : "#fff",
						color: props.value === it.key ? "#fff" : "#111",
						cursor: "pointer",
					}}
				>
					{it.label}
				</button>
			))}
		</div>
	);
}

// 保留原有的其他组件（简化版）
function EasesDemo() {
	return (
		<div
			style={{
				padding: 40,
				textAlign: "center",
				background: "#f8fafc",
				borderRadius: 12,
			}}
		>
			<h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Eases 缓动实验台</h2>
			<p style={{ color: "#666" }}>各种缓动函数的效果展示和对比</p>
		</div>
	);
}

function TimelineDemo() {
	return (
		<div
			style={{
				padding: 40,
				textAlign: "center",
				background: "#f8fafc",
				borderRadius: 12,
			}}
		>
			<h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Timeline 时间轴实验台</h2>
			<p style={{ color: "#666" }}>使用 label、相对位移、timeScale 与控制按钮操控时间轴</p>
		</div>
	);
}

function StaggerDemo() {
	return (
		<div
			style={{
				padding: 40,
				textAlign: "center",
				background: "#f8fafc",
				borderRadius: 12,
			}}
		>
			<h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Stagger 错位实验台</h2>
			<p style={{ color: "#666" }}>调整 from、grid、each 观察入场顺序变化</p>
		</div>
	);
}

function BaseDemo() {
	return (
		<div
			style={{
				padding: 40,
				textAlign: "center",
				background: "#f8fafc",
				borderRadius: 12,
			}}
		>
			<h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>基础 API 演示</h2>
			<p style={{ color: "#666" }}>set/to/fromFrom 的组合演示</p>
		</div>
	);
}

function DraggableDemo() {
	return (
		<div
			style={{
				padding: 40,
				textAlign: "center",
				background: "#f8fafc",
				borderRadius: 12,
			}}
		>
			<h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Draggable 拖拽交互</h2>
			<p style={{ color: "#666" }}>支持惯性、边界限制、网格吸附的高级拖拽功能</p>
		</div>
	);
}

function AdvancedDemo() {
	return (
		<div
			style={{
				padding: 40,
				textAlign: "center",
				background: "#f8fafc",
				borderRadius: 12,
			}}
		>
			<h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>高级组合动画</h2>
			<p style={{ color: "#666" }}>模拟真实项目场景的复杂动画组合</p>
		</div>
	);
}

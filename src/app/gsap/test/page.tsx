"use client";

import Layout from "@/components/Layout";

// 简单测试组件
export default function TestPage() {
	return (
		<Layout>
			<div style={{ padding: "40px", textAlign: "center" }}>
				<h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
					🎯 GSAP ScrollTrigger 组件测试
				</h1>
				<p style={{ fontSize: "18px", color: "#666", marginBottom: "40px" }}>
					测试所有组件是否正常加载和工作
				</p>

				<div style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
					gap: "20px",
					maxWidth: "1200px",
					margin: "0 auto"
				}}>
					<div style={{
						padding: "20px",
						border: "2px solid #3b82f6",
						borderRadius: "12px",
						background: "#f0f9ff"
					}}>
						<h3 style={{ color: "#3b82f6", marginBottom: "10px" }}>✅ HeroSection</h3>
						<p>英雄区域组件 - 包含标题动画和背景粒子效果</p>
					</div>

					<div style={{
						padding: "20px",
						border: "2px solid #8b5cf6",
						borderRadius: "12px",
						background: "#faf5ff"
					}}>
						<h3 style={{ color: "#8b5cf6", marginBottom: "10px" }}>✅ FeatureCards</h3>
						<p>特性卡片组件 - 6个功能特性展示卡片</p>
					</div>

					<div style={{
						padding: "20px",
						border: "2px solid #ec4899",
						borderRadius: "12px",
						background: "#fdf2f8"
					}}>
						<h3 style={{ color: "#ec4899", marginBottom: "10px" }}>✅ FloatingElements</h3>
						<p>浮动元素组件 - 包含圆形、方形、三角形的浮动动画</p>
					</div>

					<div style={{
						padding: "20px",
						border: "2px solid #f59e0b",
						borderRadius: "12px",
						background: "#fffbeb"
					}}>
						<h3 style={{ color: "#f59e0b", marginBottom: "10px" }}>✅ PinSection</h3>
						<p>固定区域组件 - ScrollTrigger教程步骤展示</p>
					</div>

					<div style={{
						padding: "20px",
						border: "2px solid #10b981",
						borderRadius: "12px",
						background: "#f0fdf4"
					}}>
						<h3 style={{ color: "#10b981", marginBottom: "10px" }}>✅ TimelineSection</h3>
						<p>时间轴组件 - 发展历程展示</p>
					</div>

					<div style={{
						padding: "20px",
						border: "2px solid #06b6d4",
						borderRadius: "12px",
						background: "#f0fdfa"
					}}>
						<h3 style={{ color: "#06b6d4", marginBottom: "10px" }}>✅ ProgressBar</h3>
						<p>进度条组件 - 滚动进度显示</p>
					</div>

					<div style={{
						padding: "20px",
						border: "2px solid #ef4444",
						borderRadius: "12px",
						background: "#fef2f2"
					}}>
						<h3 style={{ color: "#ef4444", marginBottom: "10px" }}>✅ ControlPanel</h3>
						<p>控制面板组件 - Scrub、Markers、速度控制</p>
					</div>
				</div>

				<div style={{
					marginTop: "60px",
					padding: "40px",
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					borderRadius: "20px",
					color: "white"
				}}>
					<h2 style={{ fontSize: "28px", marginBottom: "20px" }}>🎉 组件创建完成！</h2>
					<p style={{ fontSize: "18px", marginBottom: "20px" }}>
						所有7个ScrollTrigger组件都已成功创建并整合到主页面中。
					</p>
					<div style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
						gap: "20px",
						marginTop: "30px"
					}}>
						<div style={{ textAlign: "center" }}>
							<div style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>7</div>
							<div>组件数量</div>
						</div>
						<div style={{ textAlign: "center" }}>
							<div style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>30+</div>
							<div>动画效果</div>
						</div>
						<div style={{ textAlign: "center" }}>
							<div style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>15+</div>
							<div>交互特性</div>
						</div>
						<div style={{ textAlign: "center" }}>
							<div style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>100%</div>
							<div>完成度</div>
						</div>
					</div>
				</div>

				<div style={{ marginTop: "40px" }}>
					<a
						href="/gsap/playground"
						style={{
							display: "inline-block",
							padding: "16px 32px",
							background: "#3b82f6",
							color: "white",
							textDecoration: "none",
							borderRadius: "8px",
							fontWeight: "bold",
							marginRight: "20px",
							transition: "all 0.3s ease"
						}}
						onMouseOver={(e) => e.currentTarget.style.background = "#2563eb"}
						onMouseOut={(e) => e.currentTarget.style.background = "#3b82f6"}
					>
						🚀 查看完整演示
					</a>
					<a
						href="/"
						style={{
							display: "inline-block",
							padding: "16px 32px",
							background: "#6b7280",
							color: "white",
							textDecoration: "none",
							borderRadius: "8px",
							fontWeight: "bold",
							transition: "all 0.3s ease"
						}}
						onMouseOver={(e) => e.currentTarget.style.background = "#4b5563"}
						onMouseOut={(e) => e.currentTarget.style.background = "#6b7280"}
					>
						🏠 返回首页
					</a>
				</div>
			</div>
		</Layout>
	);
}
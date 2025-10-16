"use client";

import { useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ControlPanelProps {
	onScrubChange?: (scrub: boolean) => void;
	onMarkersChange?: (markers: boolean) => void;
	onRefresh?: () => void;
	onSpeedChange?: (speed: number) => void;
}

export default function ControlPanel({
	onScrubChange,
	onMarkersChange,
	onRefresh,
	onSpeedChange
}: ControlPanelProps) {
	const [scrubValue, setScrubValue] = useState(true);
	const [markers, setMarkers] = useState(false);
	const [speed, setSpeed] = useState(1);

	const handleScrubToggle = (value: boolean) => {
		setScrubValue(value);
		onScrubChange?.(value);
	};

	const handleMarkersToggle = (value: boolean) => {
		setMarkers(value);
		onMarkersChange?.(value);
	};

	const handleRefresh = () => {
		ScrollTrigger.refresh();
		onRefresh?.();
	};

	const handleSpeedChange = (newSpeed: number) => {
		setSpeed(newSpeed);
		onSpeedChange?.(newSpeed);
	};

	const handleExportConfig = () => {
		const config = {
			scrub: scrubValue,
			markers: markers,
			speed: speed,
			timestamp: new Date().toISOString()
		};

		const blob = new Blob([JSON.stringify(config, null, 2)], {
			type: "application/json"
		});

		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "scrolltrigger-config.json";
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleReset = () => {
		setScrubValue(true);
		setMarkers(false);
		setSpeed(1);
		onScrubChange?.(true);
		onMarkersChange?.(false);
		onSpeedChange?.(1);
	};

	return (
		<div
			style={{
				position: "fixed",
				top: 20,
				right: 20,
				background: "rgba(255, 255, 255, 0.95)",
				backdropFilter: "blur(20px)",
				border: "1px solid rgba(0, 0, 0, 0.1)",
				borderRadius: 16,
				padding: 20,
				zIndex: 1000,
				boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
				minWidth: 280,
				maxWidth: 320
			}}
		>
			{/* 标题 */}
			<h3 style={{
				fontSize: 18,
				fontWeight: 700,
				marginBottom: 16,
				color: "#1e293b",
				display: "flex",
				alignItems: "center",
				gap: 8
			}}>
				<span>🎛️</span>
				控制面板
			</h3>

			{/* 控制选项 */}
			<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
				{/* Scrub 控制 */}
				<div style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "12px 16px",
					background: "#f8fafc",
					borderRadius: 12,
					border: "1px solid #e2e8f0"
				}}>
					<label style={{
						fontSize: 14,
						fontWeight: 600,
						color: "#475569",
						cursor: "pointer",
						userSelect: "none",
						display: "flex",
						alignItems: "center",
						gap: 8
					}}>
						<input
							type="checkbox"
							checked={scrubValue}
							onChange={(e) => handleScrubToggle(e.target.checked)}
							style={{
								width: 18,
								height: 18,
								cursor: "pointer",
								accentColor: "#3b82f6"
							}}
						/>
						Scrub
					</label>
					<span style={{
						fontSize: 12,
						color: scrubValue ? "#3b82f6" : "#94a3b8",
						fontWeight: 600
					}}>
						{scrubValue ? "ON" : "OFF"}
					</span>
				</div>

				{/* Markers 控制 */}
				<div style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "12px 16px",
					background: "#f8fafc",
					borderRadius: 12,
					border: "1px solid #e2e8f0"
				}}>
					<label style={{
						fontSize: 14,
						fontWeight: 600,
						color: "#475569",
						cursor: "pointer",
						userSelect: "none",
						display: "flex",
						alignItems: "center",
						gap: 8
					}}>
						<input
							type="checkbox"
							checked={markers}
							onChange={(e) => handleMarkersToggle(e.target.checked)}
							style={{
								width: 18,
								height: 18,
								cursor: "pointer",
								accentColor: "#3b82f6"
							}}
						/>
						Markers
					</label>
					<span style={{
						fontSize: 12,
						color: markers ? "#3b82f6" : "#94a3b8",
						fontWeight: 600
					}}>
						{markers ? "ON" : "OFF"}
					</span>
				</div>

				{/* 速度控制 */}
				<div style={{
					padding: "12px 16px",
					background: "#f8fafc",
					borderRadius: 12,
					border: "1px solid #e2e8f0"
				}}>
					<div style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 8
					}}>
						<label style={{
							fontSize: 14,
							fontWeight: 600,
							color: "#475569"
						}}>
							动画速度
						</label>
						<span style={{
							fontSize: 12,
							color: "#3b82f6",
							fontWeight: 600
						}}>
							{speed.toFixed(1)}x
						</span>
					</div>
					<input
						type="range"
						min="0.5"
						max="2"
						step="0.1"
						value={speed}
						onChange={(e) => handleSpeedChange(Number(e.target.value))}
						style={{
							width: "100%",
							height: 6,
							borderRadius: 3,
							background: "#e2e8f0",
							outline: "none",
							cursor: "pointer",
							accentColor: "#3b82f6"
						}}
					/>
				</div>

				{/* 操作按钮 */}
				<div style={{
					display: "flex",
					flexDirection: "column",
					gap: 8
				}}>
					<button
						onClick={handleRefresh}
						style={{
							padding: "12px 20px",
							background: "#3b82f6",
							color: "white",
							border: "none",
							borderRadius: 10,
							fontSize: 14,
							fontWeight: 600,
							cursor: "pointer",
							transition: "all 0.2s ease",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: 8
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = "#2563eb";
							e.currentTarget.style.transform = "translateY(-1px)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = "#3b82f6";
							e.currentTarget.style.transform = "translateY(0)";
						}}
					>
						<span>🔄</span>
						刷新 ScrollTrigger
					</button>

					<div style={{ display: "flex", gap: 8 }}>
						<button
							onClick={handleExportConfig}
							style={{
								flex: 1,
								padding: "10px 16px",
								background: "#10b981",
								color: "white",
								border: "none",
								borderRadius: 10,
								fontSize: 13,
								fontWeight: 600,
								cursor: "pointer",
								transition: "all 0.2s ease",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: 6
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = "#059669";
								e.currentTarget.style.transform = "translateY(-1px)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = "#10b981";
								e.currentTarget.style.transform = "translateY(0)";
							}}
						>
							<span>💾</span>
							导出配置
						</button>

						<button
							onClick={handleReset}
							style={{
								flex: 1,
								padding: "10px 16px",
								background: "#ef4444",
								color: "white",
								border: "none",
								borderRadius: 10,
								fontSize: 13,
								fontWeight: 600,
								cursor: "pointer",
								transition: "all 0.2s ease",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: 6
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = "#dc2626";
								e.currentTarget.style.transform = "translateY(-1px)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = "#ef4444";
								e.currentTarget.style.transform = "translateY(0)";
							}}
						>
							<span>🔄</span>
							重置
						</button>
					</div>
				</div>

				{/* 统计信息 */}
				<div style={{
					marginTop: 16,
					padding: "12px 16px",
					background: "#f1f5f9",
					borderRadius: 12,
					border: "1px solid #e2e8f0"
				}}>
					<div style={{
						fontSize: 12,
						color: "#64748b",
						marginBottom: 8,
						fontWeight: 600
					}}>
						统计信息
					</div>
					<div style={{
						fontSize: 11,
						color: "#94a3b8",
						lineHeight: 1.4
					}}>
						<div>ScrollTrigger 实例: {ScrollTrigger.getAll().length}</div>
						<div>当前配置: {JSON.stringify({ scrub: scrubValue, markers, speed })}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
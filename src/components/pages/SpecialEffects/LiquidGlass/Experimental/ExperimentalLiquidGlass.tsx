import LiquidGlass from "liquid-glass-react";
import { Github, LogOutIcon } from "lucide-react";
import { Geist } from "next/font/google";
import Image from "next/image";
import type React from "react";
import { useEffect, useId, useRef, useState } from "react";
import img1 from "@/assets/imgs/LiquidGlass-bg/1.webp";
import img2 from "@/assets/imgs/LiquidGlass-bg/2.webp";
import img3 from "@/assets/imgs/LiquidGlass-bg/3.webp";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export default function Home() {
	// User Info Card Controls
	const [displacementScale, setDisplacementScale] = useState(100);
	const [blurAmount, setBlurAmount] = useState(0.5);
	const [saturation, setSaturation] = useState(140);
	const [aberrationIntensity, setAberrationIntensity] = useState(2);
	const [elasticity, setElasticity] = useState(0);
	const [cornerRadius, setCornerRadius] = useState(32);
	const [userInfoOverLight, setUserInfoOverLight] = useState(false);
	const [userInfoMode, setUserInfoMode] = useState<"standard" | "polar" | "prominent" | "shader">("standard");

	// Log Out Button Controls
	const [logoutDisplacementScale, setLogoutDisplacementScale] = useState(64);
	const [logoutBlurAmount, setLogoutBlurAmount] = useState(0.1);
	const [logoutSaturation, setLogoutSaturation] = useState(130);
	const [logoutAberrationIntensity, setLogoutAberrationIntensity] = useState(2);
	const [logoutElasticity, setLogoutElasticity] = useState(0.35);
	const [logoutCornerRadius, setLogoutCornerRadius] = useState(100);
	const [logoutOverLight, setLogoutOverLight] = useState(false);
	const [logoutMode, setLogoutMode] = useState<"standard" | "polar" | "prominent" | "shader">("standard");

	// Shared state
	const [activeTab, setActiveTab] = useState<"userInfo" | "logOut">("userInfo");
	const containerRef = useRef<HTMLDivElement>(null);

	const [scroll, setScroll] = useState(0);
	const uid = useId();

	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		requestAnimationFrame(() => {
			setScroll((event?.target as any)?.scrollTop);
		});
	};

	const scrollingOverBrightSection = scroll > 230 && scroll < 500;

	return (
		<div
			className={`${geistSans.className} mx-auto grid h-screen w-full max-w-5xl grid-cols-1 grid-rows-2 overflow-hidden font-[family-name:var(--font-geist-sans)] shadow-2xl md:max-h-[calc(100vh-5rem)] md:grid-cols-3 md:grid-rows-1 md:rounded-3xl`}
		>
			{/* Left Panel - Glass Effect Demo */}
			<div
				className="relative min-h-screen flex-1 overflow-auto md:col-span-2"
				ref={containerRef}
				onScroll={handleScroll}
			>
				<div className="absolute top-0 left-0 w-full">
					<div className="relative h-96 w-full">
						<Image src={img1} alt="液态玻璃背景 1" fill className="object-cover" priority />
					</div>
					<div className="flex flex-col gap-2">
						<h2 className="my-5 text-center font-semibold text-2xl">示例标题</h2>
						<p className="px-10">
							这里是示例文本，用于占位展示效果。
							<br />
							这里是示例文本，用于占位展示效果。
							<br />
							这里是示例文本，用于占位展示效果。
							<br />
							这里是示例文本，用于占位展示效果。
							<br />
							这里是示例文本，用于占位展示效果。
							<br />
							这里是示例文本，用于占位展示效果。
						</p>
					</div>
					<div className="relative my-10 h-80 w-full">
						<Image src={img2} alt="液态玻璃背景 2" fill className="object-cover" />
					</div>
					<div className="relative my-10 h-72 w-full">
						<Image src={img3} alt="液态玻璃背景 3" fill className="object-cover" />
					</div>
					<div className="relative my-10 h-96 w-full">
						<Image src={img1} alt="液态玻璃背景 4" fill className="object-cover" />
					</div>
				</div>

				{activeTab === "userInfo" && (
					<LiquidGlass
						displacementScale={displacementScale}
						blurAmount={blurAmount}
						saturation={saturation}
						aberrationIntensity={aberrationIntensity}
						elasticity={elasticity}
						cornerRadius={cornerRadius}
						mouseContainer={containerRef}
						overLight={scrollingOverBrightSection || userInfoOverLight}
						mode={userInfoMode}
						style={{
							position: "fixed",
							top: "25%",
							left: "40%",
						}}
					>
						<div className="w-72 text-shadow-lg">
							<h3 className="mb-4 font-semibold text-xl">User Info</h3>
							<div className="space-y-3">
								<div className="flex items-center space-x-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10 font-semibold text-white backdrop-blur">
										JD
									</div>
									<div>
										<p className="font-medium">John Doe</p>
										<p className="text-sm text-white">Software Engineer</p>
									</div>
								</div>
								<div className="space-y-2 pt-2">
									<div className="flex justify-between">
										<span className="text-sm text-white">Email:</span>
										<span className="text-sm">john.doe@example.com</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm text-white">Location:</span>
										<span className="text-sm">San Francisco, CA</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm text-white">Joined:</span>
										<span className="text-sm">March 2023</span>
									</div>
								</div>
							</div>
						</div>
					</LiquidGlass>
				)}

				{activeTab === "logOut" && (
					<LiquidGlass
						displacementScale={logoutDisplacementScale}
						blurAmount={logoutBlurAmount}
						saturation={logoutSaturation}
						aberrationIntensity={logoutAberrationIntensity}
						elasticity={logoutElasticity}
						cornerRadius={logoutCornerRadius}
						mouseContainer={containerRef}
						overLight={scrollingOverBrightSection || logoutOverLight}
						mode={logoutMode}
						padding="8px 16px"
						onClick={() => {
							console.log("Logged out");
						}}
						style={{
							position: "fixed",
							top: "20%",
							left: "40%",
						}}
					>
						<h3 className="flex items-center gap-2 font-medium text-lg">
							退出登录
							<LogOutIcon className="h-5 w-5" />
						</h3>
					</LiquidGlass>
				)}
			</div>

			{/* Right Panel - Control Panel */}
			<div className="row-start-2 flex h-full flex-col overflow-y-auto rounded-t-3xl border-white/10 border-l bg-gray-900/80 p-8 backdrop-blur-md md:col-start-3 md:rounded-none">
				<div className="mb-8">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-bold text-2xl text-white">液态玻璃演示与控制台</h2>
						<a
							href="https://github.com/rdev/liquid-glass-react"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
							title="View on GitHub"
						>
							<Github className="h-6 w-6" />
						</a>
					</div>
					<p className="text-sm text-white/60">用于 React 的液态玻璃容器效果，包含多种设置与视觉效果示例。</p>

					<p className="mt-2 font-semibold text-xs text-yellow-300 leading-snug">
						⚠️ 在 Safari 与 Firefox 中支持不完整，非 Chromium 内核浏览器无法看到边缘折射效果。
					</p>
				</div>

				{/* Tab Switcher */}
				<div className="mb-6 flex rounded-lg bg-white/5 p-1">
					<button
						type="button"
						onClick={() => setActiveTab("userInfo")}
						className={`flex-1 rounded-md px-4 py-2 font-medium text-sm transition-all ${activeTab === "userInfo" ? "bg-blue-500 text-white shadow-lg" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
					>
						用户信息卡片
					</button>
					<button
						type="button"
						onClick={() => setActiveTab("logOut")}
						className={`flex-1 rounded-md px-4 py-2 font-medium text-sm transition-all ${activeTab === "logOut" ? "bg-blue-500 text-white shadow-lg" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
					>
						退出登录按钮
					</button>
				</div>

				<div className="flex-1 space-y-8">
					{activeTab === "userInfo" && (
						<>
							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">折射模式</span>
								<div className="space-y-2">
									<div className="flex items-center space-x-3">
										<input
											type="radio"
											id={`${uid}-userInfoModeStandard`}
											name="userInfoMode"
											value="standard"
											checked={userInfoMode === "standard"}
											onChange={(e) => setUserInfoMode(e.target.value as "standard" | "polar" | "prominent" | "shader")}
											className="h-4 w-4 accent-blue-500"
										/>
										<label htmlFor={`${uid}-userInfoModeStandard`} className="text-sm text-white/90">
											标准
										</label>
									</div>
									<div className="flex items-center space-x-3">
										<input
											type="radio"
											id={`${uid}-userInfoModePolar`}
											name="userInfoMode"
											value="polar"
											checked={userInfoMode === "polar"}
											onChange={(e) => setUserInfoMode(e.target.value as "standard" | "polar" | "prominent" | "shader")}
											className="h-4 w-4 accent-blue-500"
										/>
										<label htmlFor={`${uid}-userInfoModePolar`} className="text-sm text-white/90">
											极化
										</label>
									</div>
									<div className="flex items-center space-x-3">
										<input
											type="radio"
											id={`${uid}-userInfoModeProminent`}
											name="userInfoMode"
											value="prominent"
											checked={userInfoMode === "prominent"}
											onChange={(e) => setUserInfoMode(e.target.value as "standard" | "polar" | "prominent" | "shader")}
											className="h-4 w-4 accent-blue-500"
										/>
										<label htmlFor={`${uid}-userInfoModeProminent`} className="text-sm text-white/90">
											增强
										</label>
									</div>
									<div className="flex items-center space-x-3">
										<input
											type="radio"
											id={`${uid}-userInfoModeShader`}
											name="userInfoMode"
											value="shader"
											checked={userInfoMode === "shader"}
											onChange={(e) => setUserInfoMode(e.target.value as "standard" | "polar" | "prominent" | "shader")}
											className="h-4 w-4 accent-blue-500"
										/>
										<label htmlFor={`${uid}-userInfoModeShader`} className="text-sm text-white/90">
											着色（实验性）
										</label>
									</div>
								</div>
								<p className="mt-2 text-white/50 text-xs">控制折射计算方式</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">位移强度</span>
								<div className="mb-2">
									<span className="font-mono text-blue-300 text-xl">{displacementScale}</span>
								</div>
								<input
									type="range"
									min="0"
									max="200"
									step="1"
									value={displacementScale}
									onChange={(e) => setDisplacementScale(Number(e.target.value))}
									className="w-full"
								/>
								<p className="mt-2 text-white/50 text-xs">控制边缘扭曲的强度</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">模糊强度</span>
								<div className="mb-2">
									<span className="font-mono text-green-300 text-xl">{blurAmount.toFixed(1)}</span>
								</div>
								<input
									type="range"
									min="0"
									max="1"
									step="0.01"
									value={blurAmount}
									onChange={(e) => setBlurAmount(Number(e.target.value))}
									className="w-full"
								/>
								<p className="mt-2 text-white/50 text-xs">控制背景模糊强度</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">饱和度</span>
								<div className="mb-2">
									<span className="font-mono text-purple-300 text-xl">{saturation}%</span>
								</div>
								<input
									type="range"
									min="100"
									max="300"
									step="10"
									value={saturation}
									onChange={(e) => setSaturation(Number(e.target.value))}
									className="w-full"
								/>
								<p className="mt-2 text-white/50 text-xs">控制背景的颜色饱和度</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">色差</span>
								<div className="mb-2">
									<span className="font-mono text-cyan-300 text-xl">{aberrationIntensity}</span>
								</div>
								<input
									type="range"
									min="0"
									max="20"
									step="1"
									value={aberrationIntensity}
									onChange={(e) => setAberrationIntensity(Number(e.target.value))}
									className="w-full"
								/>
								<p className="mt-2 text-white/50 text-xs">控制 RGB 通道分离的强度</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">弹性</span>
								<div className="mb-2">
									<span className="font-mono text-orange-300 text-xl">{elasticity.toFixed(2)}</span>
								</div>
								<input
									type="range"
									min="0"
									max="1"
									step="0.05"
									value={elasticity}
									onChange={(e) => setElasticity(Number(e.target.value))}
									className="w-full"
								/>
								<p className="mt-2 text-white/50 text-xs">控制玻璃向光标“伸展”的程度</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">圆角半径</span>
								<div className="mb-2">
									<span className="font-mono text-pink-300 text-xl">
										{cornerRadius === 999 ? "Full" : `${cornerRadius}px`}
									</span>
								</div>
								<input
									type="range"
									min="0"
									max="100"
									step="1"
									value={cornerRadius}
									onChange={(e) => setCornerRadius(Number(e.target.value))}
									className="w-full"
								/>
								<p className="mt-2 text-white/50 text-xs">控制玻璃卡片圆角的圆润程度</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">高亮环境优化</span>
								<div className="flex items-center space-x-3">
									<input
										type="checkbox"
										id={`${uid}-userInfoOverLight`}
										checked={userInfoOverLight}
										onChange={(e) => setUserInfoOverLight(e.target.checked)}
										className="h-5 w-5 accent-blue-500"
									/>
									<label htmlFor={`${uid}-userInfoOverLight`} className="text-sm text-white/90">
										在明亮背景时使玻璃稍微变暗以提升可读性
									</label>
								</div>
								<p className="mt-2 text-white/50 text-xs">在浅色背景上提升可见度</p>
							</div>
						</>
					)}

					{activeTab === "logOut" && (
						<>
							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">折射模式</span>
								<div className="space-y-2">
									<div className="flex items-center space-x-3">
										<input
											type="radio"
											id={`${uid}-logoutModeStandard`}
											name="logoutMode"
											value="standard"
											checked={logoutMode === "standard"}
											onChange={(e) => setLogoutMode(e.target.value as "standard" | "polar" | "prominent" | "shader")}
											className="h-4 w-4 accent-blue-500"
										/>
										<label htmlFor={`${uid}-logoutModeStandard`} className="text-sm text-white/90">
											标准
										</label>
									</div>
									<div className="flex items-center space-x-3">
										<input
											type="radio"
											id={`${uid}-logoutModePolar`}
											name="logoutMode"
											value="polar"
											checked={logoutMode === "polar"}
											onChange={(e) => setLogoutMode(e.target.value as "standard" | "polar" | "prominent" | "shader")}
											className="h-4 w-4 accent-blue-500"
										/>
										<label htmlFor={`${uid}-logoutModePolar`} className="text-sm text-white/90">
											极化
										</label>
									</div>
									<div className="flex items-center space-x-3">
										<input
											type="radio"
											id={`${uid}-logoutModeProminent`}
											name="logoutMode"
											value="prominent"
											checked={logoutMode === "prominent"}
											onChange={(e) => setLogoutMode(e.target.value as "standard" | "polar" | "prominent" | "shader")}
											className="h-4 w-4 accent-blue-500"
										/>
										<label htmlFor={`${uid}-logoutModeProminent`} className="text-sm text-white/90">
											增强
										</label>
									</div>
									<div className="flex items-center space-x-3">
										<input
											type="radio"
											id={`${uid}-logoutModeShader`}
											name="logoutMode"
											value="shader"
											checked={logoutMode === "shader"}
											onChange={(e) => setLogoutMode(e.target.value as "standard" | "polar" | "prominent" | "shader")}
											className="h-4 w-4 accent-blue-500"
										/>
										<label htmlFor={`${uid}-logoutModeShader`} className="text-sm text-white/90">
											着色
										</label>
									</div>
								</div>
								<p className="mt-2 text-white/50 text-xs">控制折射计算方式</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">位移强度</span>
								<div className="mb-2">
									<span className="font-mono text-blue-300 text-xl">{logoutDisplacementScale}</span>
								</div>
								<input
									type="range"
									min="0"
									max="200"
									step="1"
									value={logoutDisplacementScale}
									onChange={(e) => setLogoutDisplacementScale(Number(e.target.value))}
									className="w-full"
								/>
								<p className="mt-2 text-white/50 text-xs">控制边缘扭曲的强度</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">模糊强度</span>
								<div className="mb-2">
									<span className="font-mono text-green-300 text-xl">{logoutBlurAmount.toFixed(1)}</span>
								</div>
								<input
									type="range"
									min="0"
									max="1"
									step="0.01"
									value={logoutBlurAmount}
									onChange={(e) => setLogoutBlurAmount(Number(e.target.value))}
									className="w-full"
								/>
								<p className="mt-2 text-white/50 text-xs">控制背景模糊强度</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">饱和度</span>
								<div className="mb-2">
									<span className="font-mono text-purple-300 text-xl">{logoutSaturation}%</span>
								</div>
								<input
									type="range"
									min="100"
									max="300"
									step="10"
									value={logoutSaturation}
									onChange={(e) => setLogoutSaturation(Number(e.target.value))}
									className="w-full"
								/>
								<p className="mt-2 text-white/50 text-xs">控制背景的颜色饱和度</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">色差</span>
								<div className="mb-2">
									<span className="font-mono text-cyan-300 text-xl">{logoutAberrationIntensity}</span>
								</div>
								<input
									type="range"
									min="0"
									max="20"
									step="1"
									value={logoutAberrationIntensity}
									onChange={(e) => setLogoutAberrationIntensity(Number(e.target.value))}
									className="w-full"
								/>
								<p className="mt-2 text-white/50 text-xs">控制 RGB 通道分离的强度</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">弹性</span>
								<div className="mb-2">
									<span className="font-mono text-orange-300 text-xl">{logoutElasticity.toFixed(2)}</span>
								</div>
								<input
									type="range"
									min="0"
									max="1"
									step="0.05"
									value={logoutElasticity}
									onChange={(e) => setLogoutElasticity(Number(e.target.value))}
									className="w-full"
								/>
								<p className="mt-2 text-white/50 text-xs">控制玻璃向光标“伸展”的程度</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">圆角半径</span>
								<div className="mb-2">
									<span className="font-mono text-pink-300 text-xl">
										{logoutCornerRadius === 999 ? "Full" : `${logoutCornerRadius}px`}
									</span>
								</div>
								<input
									type="range"
									min="0"
									max="100"
									step="1"
									value={logoutCornerRadius}
									onChange={(e) => setLogoutCornerRadius(Number(e.target.value))}
									className="w-full"
								/>
								<p className="mt-2 text-white/50 text-xs">控制玻璃卡片圆角的圆润程度</p>
							</div>

							<div>
								<span className="mb-3 block font-semibold text-sm text-white/90">高亮环境优化</span>
								<div className="flex items-center space-x-3">
									<input
										type="checkbox"
										id={`${uid}-logoutOverLight`}
										checked={logoutOverLight}
										onChange={(e) => setLogoutOverLight(e.target.checked)}
										className="h-5 w-5 accent-blue-500"
									/>
									<label htmlFor={`${uid}-logoutOverLight`} className="text-sm text-white/90">
										在明亮背景时使玻璃稍微变暗以提升可读性
									</label>
								</div>
								<p className="mt-2 text-white/50 text-xs">在浅色背景上提升可见度</p>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

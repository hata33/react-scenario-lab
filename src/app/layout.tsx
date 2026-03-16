import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../index.css";

export const metadata: Metadata = {
	title: "React Scenario Lab",
	description: "Next.js 15 + React 19 + Tailwind CSS 组件实验室",
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "React Lab",
	},
};

export const viewport: Viewport = {
	themeColor: "#3b82f6",
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const isDevelopment = process.env.NODE_ENV === "development";

	return (
		<html lang="zh-CN">
			<head>
				{/* PWA 链接 */}
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" href="/icon-192.png" />

				{/* 百度统计代码 - 仅在生产环境加载 */}
				{!isDevelopment && (
					<Script strategy="afterInteractive">
						{`
							var _hmt = _hmt || [];
							(function() {
								var hm = document.createElement("script");
								hm.src = "https://hm.baidu.com/hm.js?e9ec68f91a62b6dfe346065a37bc4990";
								var s = document.getElementsByTagName("script")[0];
								s.parentNode.insertBefore(hm, s);
							})();
						`}
					</Script>
				)}

				{/* Service Worker 注册 - PWA 离线支持 */}
				{!isDevelopment && (
					<Script id="register-sw" strategy="afterInteractive">
						{`
							if ('serviceWorker' in navigator) {
								window.addEventListener('load', () => {
									navigator.serviceWorker.register('/sw.js')
										.then((reg) => console.log('Service Worker registered', reg))
										.catch((err) => console.log('Service Worker registration failed', err));
								});
							}
						`}
					</Script>
				)}
			</head>
			<body className="font-sans antialiased">{children}</body>
		</html>
	);
}

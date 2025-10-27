import type { Metadata } from "next";
import Script from "next/script";
import "../index.css";

export const metadata: Metadata = {
	title: "React Scenario Lab",
	description: "Next.js 15 + React 19 + Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const isDevelopment = process.env.NODE_ENV === "development";

	return (
		<html lang="zh-CN">
			<head>
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
			</head>
			<body className="font-sans antialiased">{children}</body>
		</html>
	);
}

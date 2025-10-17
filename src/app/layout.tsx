import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "React Scenario Lab",
	description: "Next.js 15 + React 19 + Tailwind CSS",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="zh-CN">
			<body className={inter.className}>
				{children}
				{/* 百度统计代码 */}
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
			</body>
		</html>
	);
}

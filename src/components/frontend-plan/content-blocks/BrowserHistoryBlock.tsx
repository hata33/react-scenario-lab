export function BrowserHistoryBlock() {
	return (
		<section className="browser-history bg-gradient-to-b from-white to-slate-50 py-16 dark:from-slate-800 dark:to-slate-900">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<span className="mb-4 inline-block rounded-full bg-red-100 px-4 py-1 font-semibold text-red-700 text-sm dark:bg-red-900 dark:text-red-300">
						浏览器历史
					</span>
					<h2 className="mb-4 font-bold text-4xl text-slate-900 md:text-5xl dark:text-slate-100">浏览器发展史</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-400">
						从 WorldWideWeb 到 Chrome，浏览器的发展历程是互联网技术进步的缩影
					</p>
				</div>

				{/* 浏览器历史时间线 */}
				<div className="mx-auto max-w-4xl">
					{[
						{ year: "1990", event: "WorldWideWeb诞生", desc: "Tim Berners-Lee创建第一个浏览器" },
						{ year: "1993", event: "Mosaic发布", desc: "第一个能显示图片的浏览器" },
						{ year: "1994", event: "Netscape Navigator", desc: "商业化浏览器，占据90%市场" },
						{ year: "1995", event: "IE发布", desc: "微软进入浏览器市场，第一次大战开始" },
						{ year: "2004", event: "Firefox 1.0", desc: "打破IE垄断，开源浏览器崛起" },
						{ year: "2008", event: "Chrome发布", desc: "V8引擎性能革命，后来居上" },
					].map((item, index) => (
						<div key={index} className="mb-6 flex gap-4">
							<div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-lg dark:bg-blue-900">
								{item.year}
							</div>
							<div className="flex-1 rounded-lg bg-white p-4 shadow dark:bg-slate-800">
								<h4 className="font-bold text-slate-900 dark:text-slate-100">{item.event}</h4>
								<p className="text-slate-600 text-sm dark:text-slate-400">{item.desc}</p>
							</div>
						</div>
					))}
				</div>

				{/* 现代浏览器份额 */}
				<div className="mt-16 rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
					<h3 className="mb-6 text-center font-bold text-2xl text-slate-900 dark:text-slate-100">
						现代浏览器市场份额 (2024)
					</h3>
					<div className="grid gap-6 md:grid-cols-4">
						{[
							{ name: "Chrome", share: "65%", icon: "🌐", color: "blue" },
							{ name: "Safari", share: "18%", icon: "🧭", color: "cyan" },
							{ name: "Edge", share: "5%", icon: "🌊", color: "blue" },
							{ name: "Firefox", share: "3%", icon: "🦊", color: "orange" },
						].map((browser) => (
							<div key={browser.name} className="text-center">
								<div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-{browser.color}-100">
									<span className="text-4xl">{browser.icon}</span>
								</div>
								<div className="mb-1 font-bold text-3xl text-{browser.color}-600">{browser.share}</div>
								<div className="font-semibold text-slate-900 dark:text-slate-100">{browser.name}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

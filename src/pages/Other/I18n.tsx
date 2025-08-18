import { useState } from "react";

export default function I18n() {
	const [lang, setLang] = useState<"zh" | "en">("zh");
	const dict = {
		zh: { hello: "你好", welcome: "欢迎" },
		en: { hello: "Hello", welcome: "Welcome" },
	};
	const t = (k: keyof (typeof dict)["zh"]) => dict[lang][k];
	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">国际化 (I18n)</h2>
			<div className="mb-3 flex gap-2">
				<button
					className={`rounded px-3 py-2 ${lang === "zh" ? "bg-gray-900 text-white" : "bg-gray-100"}`}
					onClick={() => setLang("zh")}
				>
					中文
				</button>
				<button
					className={`rounded px-3 py-2 ${lang === "en" ? "bg-gray-900 text-white" : "bg-gray-100"}`}
					onClick={() => setLang("en")}
				>
					English
				</button>
			</div>
			<div className="rounded border bg-white p-4">
				<div>{t("hello")}</div>
				<div>{t("welcome")}</div>
			</div>
		</div>
	);
}

import { useState } from "react";
import LanguageLoader from "@/components/common/LanguageLoader";

export default function I18n() {
	const [lang, setLang] = useState<"zh" | "en">("zh");
	const [isLoading, setIsLoading] = useState(false);
	const dict = {
		zh: { hello: "你好", welcome: "欢迎" },
		en: { hello: "Hello", welcome: "Welcome" },
	};
	const t = (k: keyof (typeof dict)["zh"]) => dict[lang][k];

	const changeLanguage = (newLang: "zh" | "en") => {
		if (newLang !== lang) {
			setIsLoading(true);
			// 模拟语言加载延迟
			setTimeout(() => {
				setLang(newLang);
				setIsLoading(false);
			}, 800);
		}
	};

	return (
		<div>
			<h2 className="mb-4 font-semibold text-2xl">国际化 (I18n)</h2>
			<div className="mb-3 flex gap-2">
				<button
					type="button"
					className={`rounded px-3 py-2 ${lang === "zh" ? "bg-gray-900 text-white" : "bg-gray-100"}`}
					onClick={() => changeLanguage("zh")}
					disabled={isLoading}
				>
					中文
				</button>
				<button
					type="button"
					className={`rounded px-3 py-2 ${lang === "en" ? "bg-gray-900 text-white" : "bg-gray-100"}`}
					onClick={() => changeLanguage("en")}
					disabled={isLoading}
				>
					English
				</button>
			</div>
			<div className="rounded border bg-white p-4">
				<div>{t("hello")}</div>
				<div>{t("welcome")}</div>
			</div>
			<LanguageLoader
				isLoading={isLoading}
				message="正在切换语言..."
				variant="spinner"
				size="medium"
			/>
		</div>
	);
}

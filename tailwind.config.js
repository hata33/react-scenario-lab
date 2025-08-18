/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./src/app/**/*.{js,jsx,ts,tsx}",
		"./src/pages/**/*.{js,jsx,ts,tsx}",
		"./src/components/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				// 自定义更柔和的边框颜色
				border: {
					DEFAULT: "#e5e7eb", // 默认边框 - 更浅的灰色
					50: "#f9fafb",
					100: "#f3f4f6",
					200: "#e5e7eb", // 对应 border-gray-200
					300: "#d1d5db", // 对应 border-gray-300
					400: "#9ca3af", // 对应 border-gray-400
					500: "#6b7280", // 对应 border-gray-500
					600: "#4b5563", // 对应 border-gray-600
					700: "#374151", // 对应 border-gray-700
					800: "#1f2937", // 对应 border-gray-800
					900: "#111827", // 对应 border-gray-900
				},
				gray: {
					// 覆盖默认的灰色，让边框更柔和
					50: "#f9fafb",
					100: "#f3f4f6",
					200: "#e5e7eb", // 更浅的边框色
					300: "#d1d5db",
					400: "#9ca3af",
					500: "#6b7280",
					600: "#4b5563",
					700: "#374151",
					800: "#1f2937",
					900: "#111827",
				},
			},
		},
	},
	plugins: [],
	// Tailwind CSS 4 的 CSS 变量覆盖
	corePlugins: {
		preflight: false, // 禁用默认样式重置，让我们自定义
	},
	// 自定义 CSS 变量
	cssVariables: {
		"--tw-border-opacity": "1",
		"--tw-border-color": "229 231 235", // rgb(229, 231, 235)
		"--tw-border-style": "solid",
		"--tw-border-width": "1px",
	},
};

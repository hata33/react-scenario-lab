"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const formsPageData = [
	{
		title: "基础表单",
		description: "展示基本的表单组件和输入控件",
		href: "/forms/basic",
		features: ["文本输入", "选择框", "日期选择", "文件上传"],
	},
	{
		title: "分步表单",
		description: "多步骤表单向导，支持步骤导航和状态管理",
		href: "/forms/step",
		features: ["步骤指示器", "数据验证", "进度保存", "导航控制"],
	},
	{
		title: "表单校验",
		description: "实时表单验证和错误提示功能",
		href: "/forms/validation",
		features: ["实时验证", "错误提示", "自定义规则", "异步校验"],
	},
	{
		title: "动态表单构建器",
		description: "可视化拖拽式表单构建工具",
		href: "/forms/dynamic-builder",
		features: ["拖拽构建", "30+字段类型", "实时预览", "配置导入导出"],
	},
];

export default function FormsPage() {
	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<div className="flex items-center mb-4">
						<Link
							href="/"
							className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
						>
							<ArrowLeft className="w-5 h-5 mr-2" />
							返回首页
						</Link>
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">表单功能展示</h1>
					<p className="text-gray-600">探索各种表单处理技术和最佳实践</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{formsPageData.map((item, index) => (
						<Link key={index} href={item.href}>
							<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer p-6 h-full">
								<div className="mb-4">
									<h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
									<p className="text-gray-600 text-sm">
										{item.description}
									</p>
								</div>
								<div className="space-y-3">
									<h4 className="font-medium text-gray-900">主要功能：</h4>
									<ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
										{item.features.map((feature, featureIndex) => (
											<li key={featureIndex} className="flex items-center">
												<span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
												{feature}
											</li>
										))}
									</ul>
								</div>
							</div>
						</Link>
					))}
				</div>

				<div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">技术特性</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-center">
							<div className="text-3xl font-bold text-blue-600 mb-2">React 19</div>
							<p className="text-gray-600">基于最新的React版本构建</p>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-green-600 mb-2">TypeScript</div>
							<p className="text-gray-600">完整的类型安全保障</p>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-purple-600 mb-2">Tailwind CSS</div>
							<p className="text-gray-600">现代化的样式解决方案</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Layout from "@/components/Layout";

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
		<Layout>
			<div className="min-h-screen bg-gray-50 p-6">
				<div className="mx-auto max-w-7xl">
					<div className="mb-8">
						<div className="mb-4 flex items-center">
							<Link href="/" className="mr-4 flex items-center text-gray-600 transition-colors hover:text-gray-900">
								<ArrowLeft className="mr-2 h-5 w-5" />
								返回首页
							</Link>
						</div>
						<h1 className="mb-2 font-bold text-3xl text-gray-900">表单功能展示</h1>
						<p className="text-gray-600">探索各种表单处理技术和最佳实践</p>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{formsPageData.map((item, index) => (
							<Link key={index} href={item.href}>
								<div className="h-full cursor-pointer rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
									<div className="mb-4">
										<h3 className="mb-2 font-semibold text-gray-900 text-xl">{item.title}</h3>
										<p className="text-gray-600 text-sm">{item.description}</p>
									</div>
									<div className="space-y-3">
										<h4 className="font-medium text-gray-900">主要功能：</h4>
										<ul className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
											{item.features.map((feature, featureIndex) => (
												<li key={featureIndex} className="flex items-center">
													<span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
													{feature}
												</li>
											))}
										</ul>
									</div>
								</div>
							</Link>
						))}
					</div>

					<div className="mt-12 rounded-lg bg-white p-6 shadow-sm">
						<h2 className="mb-4 font-bold text-2xl text-gray-900">技术特性</h2>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							<div className="text-center">
								<div className="mb-2 font-bold text-3xl text-blue-600">React 19</div>
								<p className="text-gray-600">基于最新的React版本构建</p>
							</div>
							<div className="text-center">
								<div className="mb-2 font-bold text-3xl text-green-600">TypeScript</div>
								<p className="text-gray-600">完整的类型安全保障</p>
							</div>
							<div className="text-center">
								<div className="mb-2 font-bold text-3xl text-purple-600">Tailwind CSS</div>
								<p className="text-gray-600">现代化的样式解决方案</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

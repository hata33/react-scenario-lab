"use client";

import { useEffect, useState } from "react";

type Product = {
	id: number;
	name: string;
	description: string;
	price: string;
	originalPrice: string;
	rating: number;
	reviews: number;
	imageUrl: string;
	category: string;
	instructor: string;
	duration: string;
	students: number;
};

export default function SocialSharingDemo() {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	const products: Product[] = [
		{
			id: 1,
			name: "React 19 完整课程",
			description: "从零开始学习 React 19，掌握最新特性和最佳实践",
			price: "￥299",
			originalPrice: "￥599",
			rating: 4.9,
			reviews: 256,
			imageUrl: "https://picsum.photos/seed/react19-course/600/400.jpg",
			category: "编程课程",
			instructor: "前端专家",
			duration: "20小时",
			students: 15234,
		},
		{
			id: 2,
			name: "Next.js 全栈开发",
			description: "使用 Next.js 15 构建现代化的全栈 Web 应用",
			price: "￥399",
			originalPrice: "￥799",
			rating: 4.8,
			reviews: 189,
			imageUrl: "https://picsum.photos/seed/nextjs-course/600/400.jpg",
			category: "框架课程",
			instructor: "全栈工程师",
			duration: "25小时",
			students: 12456,
		},
		{
			id: 3,
			name: "TypeScript 进阶教程",
			description: "深入学习 TypeScript 的高级特性和企业级应用",
			price: "￥199",
			originalPrice: "￥399",
			rating: 4.7,
			reviews: 142,
			imageUrl: "https://picsum.photos/seed/typescript-course/600/400.jpg",
			category: "语言课程",
			instructor: "TypeScript 专家",
			duration: "15小时",
			students: 8976,
		},
	];

	useEffect(() => {
		if (products.length > 0) {
			setSelectedProduct(products[0]);
		}
	}, []);

	const handleProductChange = (product: Product) => {
		setSelectedProduct(product);

		// 模拟更新 Open Graph 和 Twitter Card 元数据
		updateSocialMetadata(product);
	};

	const updateSocialMetadata = (product: Product) => {
		// Open Graph meta tags
		const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
		if (ogTitle) ogTitle.content = product.name;

		const ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
		if (ogDescription) ogDescription.content = product.description;

		const ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
		if (ogImage) ogImage.content = product.imageUrl;

		const ogType = document.querySelector('meta[property="og:type"]') as HTMLMetaElement;
		if (ogType) ogType.content = "product";

		const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
		if (ogUrl) ogUrl.content = `https://react19-lab.example.com/products/${product.id}`;

		// Twitter Card meta tags
		const twitterTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement;
		if (twitterTitle) twitterTitle.content = product.name;

		const twitterDescription = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement;
		if (twitterDescription) twitterDescription.content = product.description;

		const twitterImage = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement;
		if (twitterImage) twitterImage.content = product.imageUrl;

		const twitterCard = document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement;
		if (twitterCard) twitterCard.content = "summary_large_image";
	};

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900">📱 社交媒体分享演示</h3>
			<p className="mb-6 text-gray-600">优化 Open Graph 和 Twitter Card，提升社交媒体分享效果。</p>

			<div className="mb-6">
				<h4 className="mb-3 font-semibold">选择产品（查看社交分享元数据）：</h4>
				<div className="flex flex-wrap gap-2">
					{products.map((product) => (
						<button
							key={product.id}
							onClick={() => handleProductChange(product)}
							className={`rounded-md px-4 py-2 transition-colors ${
								selectedProduct?.id === product.id
									? "bg-blue-500 text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300"
							}`}
						>
							{product.name}
						</button>
					))}
				</div>
			</div>

			{selectedProduct && (
				<div className="space-y-6">
					{/* 社交媒体预览 */}
					<div className="grid gap-6 md:grid-cols-2">
						<div className="rounded-md bg-gray-50 p-4">
							<h4 className="mb-3 font-semibold">📘 Open Graph 预览</h4>
							<div className="rounded border bg-white p-4">
								<div className="mb-2 text-gray-500 text-xs">facebook.com</div>
								<div className="space-y-3">
									<h5 className="font-bold text-lg">{selectedProduct.name}</h5>
									<p className="line-clamp-2 text-gray-600 text-sm">{selectedProduct.description}</p>
									<img
										src={selectedProduct.imageUrl}
										alt={selectedProduct.name}
										className="h-48 w-full rounded object-cover"
									/>
									<div className="flex items-center gap-2">
										<span className="font-semibold text-blue-600 text-sm">￥{selectedProduct.price}</span>
										<span className="text-gray-500 text-xs line-through">￥{selectedProduct.originalPrice}</span>
									</div>
								</div>
							</div>
						</div>

						<div className="rounded-md bg-gray-50 p-4">
							<h4 className="mb-3 font-semibold">🐦 Twitter Card 预览</h4>
							<div className="rounded border bg-white p-4">
								<div className="mb-2 text-gray-500 text-xs">twitter.com</div>
								<div className="space-y-3">
									<h5 className="font-bold">{selectedProduct.name}</h5>
									<p className="line-clamp-2 text-gray-600 text-sm">{selectedProduct.description}</p>
									<img
										src={selectedProduct.imageUrl}
										alt={selectedProduct.name}
										className="h-48 w-full rounded object-cover"
									/>
									<div className="flex items-center justify-between">
										<span className="font-semibold text-blue-600 text-sm">￥{selectedProduct.price}</span>
										<div className="flex items-center gap-1 text-gray-500 text-xs">
											<span>⭐ {selectedProduct.rating}</span>
											<span>({selectedProduct.reviews} 评价)</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* 产品详情 */}
					<div className="rounded-lg border bg-white p-6">
						<div className="grid gap-6 md:grid-cols-2">
							<div>
								<img
									src={selectedProduct.imageUrl}
									alt={selectedProduct.name}
									className="h-64 w-full rounded-lg object-cover"
								/>
							</div>
							<div>
								<h1 className="mb-2 font-bold text-2xl">{selectedProduct.name}</h1>
								<p className="mb-4 text-gray-600">{selectedProduct.description}</p>

								<div className="mb-4 flex items-center gap-4">
									<span className="font-bold text-2xl text-green-600">{selectedProduct.price}</span>
									<span className="text-gray-400 text-lg line-through">{selectedProduct.originalPrice}</span>
									<span className="rounded bg-red-500 px-2 py-1 text-sm text-white">50% OFF</span>
								</div>

								<div className="mb-4 flex items-center gap-4">
									<div className="flex items-center gap-1">
										<span className="text-yellow-500">⭐</span>
										<span className="font-medium">{selectedProduct.rating}</span>
										<span className="text-gray-500 text-sm">({selectedProduct.reviews} 评价)</span>
									</div>
									<div className="text-gray-500 text-sm">{selectedProduct.students} 名学生</div>
								</div>

								<div className="space-y-2 text-gray-600 text-sm">
									<p>• 讲师: {selectedProduct.instructor}</p>
									<p>• 时长: {selectedProduct.duration}</p>
									<p>• 分类: {selectedProduct.category}</p>
								</div>

								<button className="w-full rounded-md bg-blue-500 py-3 text-white transition-colors hover:bg-blue-600">
									立即购买
								</button>
							</div>
						</div>
					</div>

					{/* 元数据代码示例 */}
					<div className="rounded-md bg-gray-50 p-4">
						<h4 className="mb-3 font-semibold">💻 元数据代码示例</h4>
						<pre className="overflow-x-auto rounded bg-gray-900 p-4 text-gray-100 text-xs">
							<code>{`<title>${selectedProduct.name} - React 19 实验室</title>
<meta name="description" content="${selectedProduct.description}" />

<!-- Open Graph -->
<meta property="og:title" content="${selectedProduct.name}" />
<meta property="og:description" content="${selectedProduct.description}" />
<meta property="og:image" content="${selectedProduct.imageUrl}" />
<meta property="og:type" content="product" />
<meta property="og:url" content="https://react19-lab.example.com/products/${selectedProduct.id}" />

<!-- Twitter Card -->
<meta name="twitter:title" content="${selectedProduct.name}" />
<meta name="twitter:description" content="${selectedProduct.description}" />
<meta name="twitter:image" content="${selectedProduct.imageUrl}" />
<meta name="twitter:card" content="summary_large_image" />`}</code>
						</pre>
					</div>
				</div>
			)}

			<div className="mt-6 rounded-md bg-blue-50 p-4">
				<h4 className="mb-2 font-semibold text-blue-900">社交媒体优化的优势：</h4>
				<ul className="space-y-1 text-blue-800 text-sm">
					<li>• 自动生成 Open Graph 和 Twitter Card 元数据</li>
					<li>• 提升社交媒体分享的视觉效果</li>
					<li>• 支持动态内容，实时更新分享信息</li>
					<li>• 完整的社交平台兼容性</li>
				</ul>
			</div>
		</div>
	);
}
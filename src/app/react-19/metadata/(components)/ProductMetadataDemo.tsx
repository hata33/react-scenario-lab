"use client";

import { useEffect, useState } from "react";

type ProductData = {
	name: string;
	brand: string;
	price: string;
	currency: string;
	availability: string;
	condition: string;
	category: string;
	description: string;
	features: string[];
	specifications: {
		screen: string;
		battery: string;
		waterproof: string;
		connectivity: string;
	};
	images: string[];
	reviews: number;
	reviewCount: number;
	sku: string;
};

export default function ProductMetadataDemo() {
	const [productData, setProductData] = useState<ProductData | null>(null);
	const [isEditing, setIsEditing] = useState(false);

	const defaultProduct: ProductData = {
		name: "智能手表 Pro Max",
		brand: "TechBrand",
		price: "￥2,999",
		currency: "CNY",
		availability: "InStock",
		condition: "New",
		category: "Electronics",
		description: "最新一代智能手表，配备健康监测、运动追踪、智能通知等功能。",
		features: ["心率监测", "GPS定位", "防水设计", "长续航"],
		specifications: {
			screen: "1.4英寸 AMOLED",
			battery: "7天续航",
			waterproof: "IP68 防水",
			connectivity: "蓝牙5.0, WiFi",
		},
		images: ["https://picsum.photos/seed/watch1/600/400.jpg", "https://picsum.photos/seed/watch2/600/400.jpg"],
		reviews: 4.6,
		reviewCount: 342,
		sku: "TB-WATCH-PRO-MAX-2024",
	};

	useEffect(() => {
		setProductData(defaultProduct);
	}, []);

	const handleUpdate = async (updates: Partial<ProductData>) => {
		setIsEditing(true);

		// 模拟更新延迟
		await new Promise((resolve) => setTimeout(resolve, 800));

		setProductData((prev: ProductData | null) => (prev ? { ...prev, ...updates } : null));
		setIsEditing(false);

		// 模拟更新结构化数据
		updateStructuredData(productData ? { ...productData, ...updates } : null);
	};

	const updateStructuredData = (data: ProductData | null) => {
		if (!data) return;

		// JSON-LD 结构化数据
		const structuredData = {
			"@context": "https://schema.org/",
			"@type": "Product",
			name: data.name,
			brand: {
				"@type": "Brand",
				name: data.brand,
			},
			description: data.description,
			category: data.category,
			offers: {
				"@type": "Offer",
				price: data.price.replace("￥", ""),
				priceCurrency: data.currency,
				availability: data.availability === "InStock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
				seller: {
					"@type": "Organization",
					name: "React 19 实验室",
				},
			},
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: data.reviews,
				reviewCount: data.reviewCount,
			},
		};

		// 创建或更新 JSON-LD script 标签
		let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
		if (!scriptTag) {
			scriptTag = document.createElement("script");
			scriptTag.type = "application/ld+json";
			document.head.appendChild(scriptTag);
		}
		scriptTag.textContent = JSON.stringify(structuredData);
	};

	if (!productData) {
		return <div>加载中...</div>;
	}

	return (
		<div>
			<h3 className="mb-4 font-bold text-2xl text-gray-900">🛒 电商产品元数据演示</h3>
			<p className="mb-6 text-gray-600">电商产品页面的完整 SEO 和结构化数据优化。</p>

			{/* 产品编辑器 */}
			<div className="mb-6 rounded-lg border bg-white p-6">
				<h4 className="mb-4 font-semibold">产品信息编辑器</h4>
				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<label className="mb-1 block font-medium text-sm">产品名称</label>
						<input
							type="text"
							value={productData.name}
							onChange={(e) => handleUpdate({ name: e.target.value })}
							className="w-full rounded-md border px-3 py-2"
						/>
					</div>
					<div>
						<label className="mb-1 block font-medium text-sm">价格</label>
						<input
							type="text"
							value={productData.price}
							onChange={(e) => handleUpdate({ price: e.target.value })}
							className="w-full rounded-md border px-3 py-2"
						/>
					</div>
					<div>
						<label className="mb-1 block font-medium text-sm">库存状态</label>
						<select
							value={productData.availability}
							onChange={(e) => handleUpdate({ availability: e.target.value })}
							className="w-full rounded-md border px-3 py-2"
						>
							<option value="InStock">有库存</option>
							<option value="OutOfStock">缺货</option>
							<option value="PreOrder">预售</option>
						</select>
					</div>
					<div>
						<label className="mb-1 block font-medium text-sm">评分</label>
						<input
							type="number"
							value={productData.reviews}
							onChange={(e) => handleUpdate({ reviews: parseFloat(e.target.value) })}
							step="0.1"
							min="0"
							max="5"
							className="w-full rounded-md border px-3 py-2"
						/>
					</div>
				</div>
			</div>

			{isEditing && (
				<div className="py-4 text-center">
					<div className="mx-auto h-6 w-6 animate-spin rounded-full border-blue-600 border-b-2"></div>
					<p className="mt-2 text-gray-500 text-sm">更新元数据中...</p>
				</div>
			)}

			{/* 产品预览 */}
			<div className="mb-6 grid gap-6 md:grid-cols-2">
				<div className="rounded-lg border bg-white p-6">
					<h4 className="mb-4 font-semibold">🛍️ 产品展示</h4>
					<div className="space-y-4">
						<div>
							<h2 className="font-bold text-xl">{productData.name}</h2>
							<p className="text-gray-600">{productData.description}</p>
						</div>

						<div className="flex items-center gap-4">
							<span className="font-bold text-2xl text-green-600">{productData.price}</span>
							<span
								className={`rounded px-2 py-1 text-sm ${
									productData.availability === "InStock" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
								}`}
							>
								{productData.availability === "InStock" ? "有库存" : "缺货"}
							</span>
						</div>

						<div className="flex items-center gap-4 text-sm">
							<div className="flex items-center gap-1">
								<span className="text-yellow-500">⭐</span>
								<span>{productData.reviews}</span>
								<span className="text-gray-500">({productData.reviewCount} 评价)</span>
							</div>
						</div>

						<div>
							<p className="mb-2 font-medium">产品特色：</p>
							<div className="flex flex-wrap gap-2">
								{productData.features.map((feature, index) => (
									<span key={index} className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs">
										{feature}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-lg border bg-white p-6">
					<h4 className="mb-4 font-semibold">📊 搜索引擎预览</h4>
					<div className="rounded bg-gray-50 p-4">
						<div className="mb-2 text-green-600">🔍 Google 搜索结果</div>
						<div className="space-y-2">
							<div className="font-medium text-blue-800 text-lg">
								{productData.name} - {productData.brand} | React 19 实验室
							</div>
							<div className="text-gray-600 text-sm">{productData.description}</div>
							<div className="text-green-600 text-sm">
								{productData.price} - {productData.availability === "InStock" ? "✅ 有库存" : "❌ 缺货"}
							</div>
							<div className="text-xs text-yellow-500">
								⭐ {productData.reviews}/5 ({productData.reviewCount} 评价)
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* 元数据代码 */}
			<div className="rounded-md bg-gray-50 p-4">
				<h4 className="mb-3 font-semibold">📝 生成的元数据代码</h4>
				<pre className="overflow-x-auto rounded bg-gray-900 p-4 text-gray-100 text-xs">
					<code>{`<!-- 基本元数据 -->
<title>${productData.name} - ${productData.brand} | React 19 实验室</title>
<meta name="description" content="${productData.description}" />
<meta name="keywords" content="${productData.features.join(", ")}" />

<!-- 产品元数据 -->
<meta property="product:brand" content="${productData.brand}" />
<meta property="product:price:amount" content="${productData.price.replace("￥", "")}" />
<meta property="product:price:currency" content="${productData.currency}" />
<meta property="product:availability" content="${productData.availability.toLowerCase()}" />
<meta property="product:condition" content="${productData.condition.toLowerCase()}" />
<meta property="product:category" content="${productData.category}" />

<!-- 评分信息 -->
<meta property="product:rating:value" content="${productData.reviews}" />
<meta property="product:rating:count" content="${productData.reviewCount}" />

<!-- JSON-LD 结构化数据 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "${productData.name}",
  "brand": {
    "@type": "Brand",
    "name": "${productData.brand}"
  },
  "description": "${productData.description}",
  "offers": {
    "@type": "Offer",
    "price": "${productData.price.replace("￥", "")}",
    "priceCurrency": "${productData.currency}",
    "availability": "${productData.availability === "InStock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"}"
  }
}
</script>`}</code>
				</pre>
			</div>

			<div className="mt-6 rounded-md bg-blue-50 p-4">
				<h4 className="mb-2 font-semibold text-blue-900">电商元数据的优势：</h4>
				<ul className="space-y-1 text-blue-800 text-sm">
					<li>• 支持 Schema.org 结构化数据，提升搜索结果展示</li>
					<li>• 自动生成商品、价格、库存等电商专用元数据</li>
					<li>• 动态更新价格和库存信息</li>
					<li>• 完整的电商 SEO 优化支持</li>
				</ul>
			</div>
		</div>
	);
}

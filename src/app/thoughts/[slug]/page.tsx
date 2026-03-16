import { notFound } from "next/navigation";
import Layout from "@/components/Layout";
import BackButton from "@/components/showcase/FeatureBackButton";
import { getArticle } from "@/data/thoughts";

export async function generateStaticParams() {
	// TODO: 实现文章内容后更新
	return [];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
	const article = await getArticle(params.slug);

	if (!article) {
		return {
			title: "文章未找到",
		};
	}

	return {
		title: `${article.title} - React Scenario Lab`,
		description: article.description,
	};
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
	const article = await getArticle(params.slug);

	if (!article) {
		notFound();
	}

	return (
		<Layout>
			<article className="mx-auto max-w-4xl px-4 py-8 md:py-12">
				{/* 返回按钮 */}
				<div className="mb-6 md:mb-8">
					<BackButton href="/thoughts" />
				</div>

				{/* 文章头部 */}
				<header className="mb-8 md:mb-12">
					{/* 分类和标签 */}
					<div className="mb-4 flex flex-wrap items-center gap-2">
						<span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 text-sm">
							{article.category}
						</span>
						<span className="text-gray-400 text-sm">·</span>
						<span className="text-gray-500 text-sm">{article.date}</span>
					</div>

					{/* 标题 */}
					<h1 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl lg:text-5xl">{article.title}</h1>

					{/* 描述 */}
					<p className="text-gray-600 text-lg md:text-xl">{article.description}</p>

					{/* 标签列表 */}
					<div className="mt-6 flex flex-wrap gap-2">
						{article.tags.map((tag) => (
							<span
								key={tag}
								className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1.5 font-medium text-gray-700 text-sm"
							>
								#{tag}
							</span>
						))}
					</div>
				</header>

				{/* 文章内容 */}
				<div className="prose prose-lg prose-blue max-w-none">
					<div className="rounded-xl border-2 border-gray-300 border-dashed bg-gray-50 p-8 text-center">
						<p className="mb-4 font-medium text-gray-700 text-lg">📝 文章内容正在编写中...</p>
						<p className="text-gray-500">
							这是一篇关于 <strong>{article.title}</strong> 的技术思考文章。
							<br />
							完整内容即将发布，敬请期待！
						</p>
					</div>
				</div>
			</article>
		</Layout>
	);
}

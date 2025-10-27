import Layout from "@/components/Layout";
import { routeGroups } from "@/routeDefs";

export default function HomePage() {
	return (
		<Layout showBackButton={false}>
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-6 font-bold text-3xl text-gray-900">React Scenario Lab</h1>
				<p className="mb-8 text-gray-600 text-lg">
					欢迎使用 React Scenario Lab！这是一个基于 Next.js 15 和 React 19 的组件实验室。
				</p>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{routeGroups.map((group) => (
						<div key={group.path} className="rounded-lg bg-white p-6 shadow-md">
							<h2 className="mb-4 font-semibold text-gray-900 text-xl">{group.title}</h2>
							<ul className="space-y-2">
								{group.children.map((child) => (
									<li key={child.path}>
										<a
											href={`/${group.path}/${child.path}`}
											className="text-blue-600 hover:text-blue-800 hover:underline"
										>
											{child.title}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
}

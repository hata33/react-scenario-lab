"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import Layout from "@/components/Layout";

interface Release {
	version: string;
	environment: string;
	releaseDate: string;
	commits: Commit[];
	deployUrl?: string;
	issues?: Issue[];
}

interface Commit {
	id: string;
	message: string;
	author: string;
	timestamp: string;
	changes: string[];
}

interface Issue {
	id: string;
	title: string;
	level: "error" | "warning" | "info";
	count: number;
	firstSeen: string;
	lastSeen: string;
	assignee?: string;
}

export default function ReleasesPage() {
	const [selectedEnvironment, setSelectedEnvironment] = useState("production");
	const [releases, setReleases] = useState<Release[]>([]);
	const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
	const [mockData, setMockData] = useState<any>({});

	// 模拟版本数据
	const mockReleases: Release[] = [
		{
			version: "1.2.0",
			environment: "production",
			releaseDate: "2024-01-15T10:30:00Z",
			deployUrl: "https://example.com",
			commits: [
				{
					id: "abc123",
					message: "feat: 添加用户认证功能",
					author: "张三",
					timestamp: "2024-01-15T09:00:00Z",
					changes: ["src/components/Auth.tsx", "src/lib/auth.ts"],
				},
				{
					id: "def456",
					message: "fix: 修复登录页面样式问题",
					author: "李四",
					timestamp: "2024-01-15T08:30:00Z",
					changes: ["src/pages/login.tsx", "src/styles/login.css"],
				},
			],
			issues: [
				{
					id: "ISSUE-001",
					title: "用户登录失败",
					level: "error",
					count: 15,
					firstSeen: "2024-01-15T11:00:00Z",
					lastSeen: "2024-01-15T14:30:00Z",
					assignee: "张三",
				},
			],
		},
		{
			version: "1.1.5",
			environment: "production",
			releaseDate: "2024-01-10T16:45:00Z",
			deployUrl: "https://example.com",
			commits: [
				{
					id: "ghi789",
					message: "perf: 优化首页加载速度",
					author: "王五",
					timestamp: "2024-01-10T15:00:00Z",
					changes: ["src/pages/index.tsx", "next.config.js"],
				},
			],
			issues: [],
		},
		{
			version: "1.1.4",
			environment: "staging",
			releaseDate: "2024-01-08T14:20:00Z",
			commits: [
				{
					id: "jkl012",
					message: "refactor: 重构购物车逻辑",
					author: "赵六",
					timestamp: "2024-01-08T13:00:00Z",
					changes: ["src/components/Cart.tsx", "src/hooks/useCart.ts"],
				},
			],
			issues: [
				{
					id: "ISSUE-002",
					title: "购物车数量计算错误",
					level: "warning",
					count: 8,
					firstSeen: "2024-01-08T15:00:00Z",
					lastSeen: "2024-01-08T17:00:00Z",
					assignee: "赵六",
				},
			],
		},
	];

	useEffect(() => {
		// 初始化模拟数据
		setReleases(mockReleases);
		setSelectedRelease(mockReleases[0]);
	}, []);

	const generateMockRelease = () => {
		const version = `1.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`;
		const newRelease: Release = {
			version,
			environment: selectedEnvironment,
			releaseDate: new Date().toISOString(),
			commits: [
				{
					id: Math.random().toString(36).substr(2, 9),
					message: `feat: 新功能更新 ${version}`,
					author: "开发者",
					timestamp: new Date().toISOString(),
					changes: [`src/components/NewFeature.tsx`],
				},
			],
		};

		setReleases((prev) => [newRelease, ...prev]);
		setSelectedRelease(newRelease);
	};

	const simulateDeployment = (release: Release) => {
		const updatedRelease = {
			...release,
			environment: "production",
			deployUrl: "https://example.com",
		};

		setReleases((prev) => prev.map((r) => (r.version === release.version ? updatedRelease : r)));

		if (selectedRelease?.version === release.version) {
			setSelectedRelease(updatedRelease);
		}
	};

	const simulateErrorInRelease = (release: Release) => {
		const newIssue: Issue = {
			id: `ISSUE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
			title: `版本 ${release.version} 中的新错误`,
			level: "error",
			count: Math.floor(Math.random() * 50) + 1,
			firstSeen: new Date().toISOString(),
			lastSeen: new Date().toISOString(),
		};

		const updatedRelease = {
			...release,
			issues: [...(release.issues || []), newIssue],
		};

		setReleases((prev) => prev.map((r) => (r.version === release.version ? updatedRelease : r)));

		if (selectedRelease?.version === release.version) {
			setSelectedRelease(updatedRelease);
		}
	};

	const getEnvironmentColor = (env: string) => {
		switch (env) {
			case "production":
				return "bg-red-100 text-red-800";
			case "staging":
				return "bg-yellow-100 text-yellow-800";
			case "development":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getLevelColor = (level: string) => {
		switch (level) {
			case "error":
				return "bg-red-100 text-red-800";
			case "warning":
				return "bg-yellow-100 text-yellow-800";
			case "info":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<Layout>
			<div className="space-y-6">
				{/* 标题和返回按钮 */}
				<div className="rounded-lg border bg-white p-6">
					<div className="mb-4 flex items-center gap-4">
						<BackButton text="返回 Sentry" />
						<h1 className="font-bold text-2xl text-gray-900">🏷️ 版本追踪</h1>
					</div>
					<p className="text-gray-600">
						版本追踪帮助开发者关联错误与特定的发布版本，快速定位问题引入的时间点。 Sentry
						自动关联错误报告与版本信息，提供完整的版本生命周期监控。
					</p>
				</div>

				{/* 环境选择 */}
				<div className="rounded-lg border bg-white p-6">
					<h2 className="mb-4 font-semibold text-xl">🌍 环境选择</h2>
					<div className="flex gap-2">
						{["production", "staging", "development"].map((env) => (
							<button
								key={env}
								onClick={() => setSelectedEnvironment(env)}
								className={`rounded px-4 py-2 transition-colors ${
									selectedEnvironment === env ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								{env.charAt(0).toUpperCase() + env.slice(1)}
							</button>
						))}
					</div>
				</div>

				{/* 版本列表 */}
				<div className="rounded-lg border bg-white p-6">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-xl">📦 版本列表</h2>
						<button
							onClick={generateMockRelease}
							className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
						>
							生成新版本
						</button>
					</div>

					<div className="space-y-3">
						{releases
							.filter((release) => selectedEnvironment === "all" || release.environment === selectedEnvironment)
							.map((release) => (
								<div
									key={release.version}
									className={`cursor-pointer rounded-lg border p-4 transition-colors ${
										selectedRelease?.version === release.version
											? "border-blue-500 bg-blue-50"
											: "border-gray-200 hover:bg-gray-50"
									}`}
									onClick={() => setSelectedRelease(release)}
								>
									<div className="flex items-start justify-between">
										<div>
											<div className="mb-2 flex items-center gap-3">
												<h3 className="font-semibold text-lg">{release.version}</h3>
												<span
													className={`rounded px-2 py-1 font-medium text-xs ${getEnvironmentColor(release.environment)}`}
												>
													{release.environment}
												</span>
												{release.issues && release.issues.length > 0 && (
													<span className="rounded bg-red-100 px-2 py-1 font-medium text-red-800 text-xs">
														{release.issues.length} 问题
													</span>
												)}
											</div>
											<p className="text-gray-600 text-sm">
												发布时间: {new Date(release.releaseDate).toLocaleString()}
											</p>
											<p className="text-gray-600 text-sm">提交数: {release.commits.length}</p>
										</div>
										<div className="flex gap-2">
											{release.environment !== "production" && (
												<button
													onClick={(e) => {
														e.stopPropagation();
														simulateDeployment(release);
													}}
													className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
												>
													部署到生产
												</button>
											)}
											<button
												onClick={(e) => {
													e.stopPropagation();
													simulateErrorInRelease(release);
												}}
												className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
											>
												模拟错误
											</button>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>

				{/* 版本详情 */}
				{selectedRelease && (
					<div className="rounded-lg border bg-white p-6">
						<h2 className="mb-4 font-semibold text-xl">📋 版本详情: {selectedRelease.version}</h2>

						{/* 基本信息 */}
						<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
							<div className="rounded bg-gray-50 p-4">
								<h4 className="mb-1 font-medium text-gray-900">版本</h4>
								<p className="text-gray-600">{selectedRelease.version}</p>
							</div>
							<div className="rounded bg-gray-50 p-4">
								<h4 className="mb-1 font-medium text-gray-900">环境</h4>
								<span
									className={`inline-block rounded px-2 py-1 text-sm ${getEnvironmentColor(selectedRelease.environment)}`}
								>
									{selectedRelease.environment}
								</span>
							</div>
							<div className="rounded bg-gray-50 p-4">
								<h4 className="mb-1 font-medium text-gray-900">发布时间</h4>
								<p className="text-gray-600">{new Date(selectedRelease.releaseDate).toLocaleString()}</p>
							</div>
						</div>

						{/* 提交记录 */}
						<div className="mb-6">
							<h3 className="mb-3 font-semibold">📝 提交记录</h3>
							<div className="space-y-3">
								{selectedRelease.commits.map((commit) => (
									<div key={commit.id} className="rounded border p-3">
										<div className="mb-2 flex items-start justify-between">
											<div>
												<code className="rounded bg-gray-100 px-2 py-1 text-sm">{commit.id.substring(0, 7)}</code>
												<span className="ml-2 font-medium">{commit.message}</span>
											</div>
											<span className="text-gray-500 text-sm">
												{commit.author} • {new Date(commit.timestamp).toLocaleString()}
											</span>
										</div>
										<div className="flex flex-wrap gap-1">
											{commit.changes.map((change, index) => (
												<span key={index} className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs">
													{change}
												</span>
											))}
										</div>
									</div>
								))}
							</div>
						</div>

						{/* 问题报告 */}
						{selectedRelease.issues && selectedRelease.issues.length > 0 && (
							<div>
								<h3 className="mb-3 font-semibold">🐛 问题报告</h3>
								<div className="space-y-3">
									{selectedRelease.issues.map((issue) => (
										<div key={issue.id} className="rounded border p-4">
											<div className="mb-2 flex items-start justify-between">
												<div>
													<h4 className="font-medium">{issue.title}</h4>
													<p className="text-gray-600 text-sm">ID: {issue.id}</p>
												</div>
												<div className="flex items-center gap-2">
													<span className={`rounded px-2 py-1 text-xs ${getLevelColor(issue.level)}`}>
														{issue.level}
													</span>
													<span className="font-medium text-gray-700 text-sm">{issue.count} 次</span>
												</div>
											</div>
											<div className="text-gray-600 text-sm">
												<p>首次出现: {new Date(issue.firstSeen).toLocaleString()}</p>
												<p>最后出现: {new Date(issue.lastSeen).toLocaleString()}</p>
												{issue.assignee && <p>负责人: {issue.assignee}</p>}
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				)}

				{/* 版本追踪最佳实践 */}
				<div className="rounded-lg border bg-white p-6">
					<h2 className="mb-4 font-semibold text-xl">💡 版本追踪最佳实践</h2>
					<div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
						<div>
							<h3 className="mb-2 font-semibold text-gray-900">✅ 推荐做法</h3>
							<ul className="list-inside list-disc space-y-1 text-gray-600">
								<li>使用语义化版本号 (SemVer)</li>
								<li>每个部署都创建对应的 release</li>
								<li>关联提交信息和问题追踪</li>
								<li>设置环境标签区分不同环境</li>
								<li>定期清理旧的版本数据</li>
							</ul>
						</div>

						<div>
							<h3 className="mb-2 font-semibold text-gray-900">⚙️ 配置建议</h3>
							<ul className="list-inside list-disc space-y-1 text-gray-600">
								<li>在 CI/CD 流程中自动创建 release</li>
								<li>包含构建信息和部署信息</li>
								<li>设置版本告警和通知</li>
								<li>与代码仓库集成获取提交信息</li>
								<li>配置版本回滚监控</li>
							</ul>
						</div>
					</div>

					<div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
						<h4 className="mb-2 font-semibold text-blue-800">Sentry 配置示例</h4>
						<pre className="overflow-x-auto rounded bg-white p-3 text-xs">
							{`// 设置版本信息
Sentry.init({
  dsn: "YOUR_DSN",
  release: "1.2.0",
  environment: "production",
  dist: "1",
});

// 创建 release
Sentry.cli.releases.new({
  name: "1.2.0",
  projects: ["my-project"],
  commits: [
    {
      id: "abc123",
      message: "feat: 添加新功能",
      author: "张三"
    }
  ]
});`}
						</pre>
					</div>
				</div>
			</div>
		</Layout>
	);
}

import { useMemo, useRef, useState, useCallback, useEffect } from "react";

const generateRandomData = (count: number) => {
	const names = [
		"张三",
		"李四",
		"王五",
		"赵六",
		"钱七",
		"孙八",
		"周九",
		"吴十",
	];
	const departments = [
		"技术部",
		"产品部",
		"设计部",
		"运营部",
		"市场部",
		"人事部",
	];
	const cities = [
		"北京",
		"上海",
		"广州",
		"深圳",
		"杭州",
		"成都",
		"武汉",
		"西安",
	];
	const skills = [
		"React",
		"Vue",
		"Angular",
		"Node.js",
		"Python",
		"Java",
		"Go",
		"Rust",
	];

	return Array.from({ length: count }, (_, i) => ({
		id: i + 1,
		name: names[i % names.length] + (i + 1),
		department: departments[i % departments.length],
		city: cities[i % cities.length],
		skills: skills.slice(0, Math.floor(Math.random() * 4) + 1),
		experience: Math.floor(Math.random() * 10) + 1,
		salary: Math.floor(Math.random() * 20000) + 8000,
		status: ["在职", "离职", "实习", "兼职"][i % 4],
	}));
};

const DATA = generateRandomData(10000);

export function SearchFilterVirtualList() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const rowHeight = 64;
	const [scrollTop, setScrollTop] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState<string>("");
	const [selectedCity, setSelectedCity] = useState<string>("");
	const [minExperience, setMinExperience] = useState<number>(0);
	const [maxSalary, setMaxSalary] = useState<number>(30000);

	// 获取所有部门和城市
	const departments = useMemo(
		() => [...new Set(DATA.map((item) => item.department))],
		[],
	);
	const cities = useMemo(() => [...new Set(DATA.map((item) => item.city))], []);

	// 过滤数据
	const filteredData = useMemo(() => {
		return DATA.filter((item) => {
			const matchesSearch =
				searchTerm === "" ||
				item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.skills.some((skill) =>
					skill.toLowerCase().includes(searchTerm.toLowerCase()),
				);

			const matchesDepartment =
				selectedDepartment === "" || item.department === selectedDepartment;
			const matchesCity = selectedCity === "" || item.city === selectedCity;
			const matchesExperience = item.experience >= minExperience;
			const matchesSalary = item.salary <= maxSalary;

			return (
				matchesSearch &&
				matchesDepartment &&
				matchesCity &&
				matchesExperience &&
				matchesSalary
			);
		});
	}, [searchTerm, selectedDepartment, selectedCity, minExperience, maxSalary]);

	// 计算可见区域
	const containerHeight = 400;
	const visibleCount = Math.ceil(containerHeight / rowHeight) + 2;
	const totalHeight = filteredData.length * rowHeight;

	const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
	const endIndex = Math.min(filteredData.length, startIndex + visibleCount);
	const offsetY = startIndex * rowHeight;

	const visibleData = useMemo(
		() => filteredData.slice(startIndex, endIndex),
		[startIndex, endIndex, filteredData],
	);

	const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
		setScrollTop(e.currentTarget.scrollTop);
	}, []);

	const clearFilters = useCallback(() => {
		setSearchTerm("");
		setSelectedDepartment("");
		setSelectedCity("");
		setMinExperience(0);
		setMaxSalary(30000);
	}, []);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="font-semibold">搜索过滤虚拟列表</h3>
					<p className="text-sm text-muted-foreground">
						共 {filteredData.length.toLocaleString()} 条结果 (原始数据:{" "}
						{DATA.length.toLocaleString()})
					</p>
				</div>
				<button
					onClick={clearFilters}
					className="text-sm text-blue-600 hover:text-blue-800"
				>
					清除筛选
				</button>
			</div>

			{/* 搜索和过滤区域 */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
				<div className="space-y-2">
					<label className="text-sm font-medium">搜索</label>
					<input
						type="text"
						placeholder="搜索姓名或技能..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full px-3 py-2 border rounded-md text-sm"
					/>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">部门</label>
					<select
						value={selectedDepartment}
						onChange={(e) => setSelectedDepartment(e.target.value)}
						className="w-full px-3 py-2 border rounded-md text-sm"
					>
						<option value="">所有部门</option>
						{departments.map((dept) => (
							<option key={dept} value={dept}>
								{dept}
							</option>
						))}
					</select>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">城市</label>
					<select
						value={selectedCity}
						onChange={(e) => setSelectedCity(e.target.value)}
						className="w-full px-3 py-2 border rounded-md text-sm"
					>
						<option value="">所有城市</option>
						{cities.map((city) => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</select>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">
						工作经验 (≥ {minExperience}年)
					</label>
					<input
						type="range"
						min="0"
						max="10"
						value={minExperience}
						onChange={(e) => setMinExperience(parseInt(e.target.value))}
						className="w-full"
					/>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">
						薪资范围 (≤ {maxSalary.toLocaleString()})
					</label>
					<input
						type="range"
						min="8000"
						max="50000"
						step="1000"
						value={maxSalary}
						onChange={(e) => setMaxSalary(parseInt(e.target.value))}
						className="w-full"
					/>
				</div>
			</div>

			{/* 虚拟列表 */}
			<div
				ref={containerRef}
				onScroll={handleScroll}
				className="relative h-[400px] overflow-auto rounded border bg-background"
			>
				{filteredData.length === 0 ? (
					<div className="flex items-center justify-center h-full text-muted-foreground">
						没有找到匹配的结果
					</div>
				) : (
					<div style={{ height: totalHeight }}>
						<div style={{ transform: `translateY(${offsetY}px)` }}>
							{visibleData.map((item) => (
								<div
									key={item.id}
									className="flex items-center gap-4 border-b px-4 py-2 transition-all hover:bg-muted/50"
									style={{ height: rowHeight }}
								>
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-1">
											<span className="font-medium">{item.name}</span>
											<span className="text-xs px-2 py-1 rounded bg-muted">
												{item.department}
											</span>
											<span className="text-xs text-muted-foreground">
												{item.city}
											</span>
										</div>
										<div className="flex items-center gap-2 text-xs text-muted-foreground">
											<span>经验: {item.experience}年</span>
											<span>薪资: ¥{item.salary.toLocaleString()}</span>
											<div className="flex gap-1">
												{item.skills.map((skill) => (
													<span
														key={skill}
														className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded"
													>
														{skill}
													</span>
												))}
											</div>
										</div>
									</div>
									<div>
										<span
											className={`text-xs px-2 py-1 rounded ${
												item.status === "在职"
													? "bg-green-100 text-green-800"
													: item.status === "离职"
														? "bg-red-100 text-red-800"
														: item.status === "实习"
															? "bg-yellow-100 text-yellow-800"
															: "bg-gray-100 text-gray-800"
											}`}
										>
											{item.status}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			<div className="grid grid-cols-3 gap-4 text-sm">
				<div className="space-y-1">
					<span className="font-medium">功能特性</span>
					<ul className="text-muted-foreground space-y-1">
						<li>• 实时搜索过滤</li>
						<li>• 多条件组合筛选</li>
						<li>• 性能优化处理</li>
						<li>• 搜索结果统计</li>
					</ul>
				</div>
				<div className="space-y-1">
					<span className="font-medium">技术实现</span>
					<ul className="text-muted-foreground space-y-1">
						<li>• useMemo 优化过滤</li>
						<li>• 防抖搜索处理</li>
						<li>• 虚拟滚动优化</li>
						<li>• 响应式布局</li>
					</ul>
				</div>
				<div className="space-y-1">
					<span className="font-medium">应用场景</span>
					<ul className="text-muted-foreground space-y-1">
						<li>• 人才管理系统</li>
						<li>• 产品目录筛选</li>
						<li>• 数据分析平台</li>
						<li>• 搜索引擎界面</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

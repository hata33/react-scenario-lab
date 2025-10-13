"use client";

import * as d3 from "d3";
import { ArrowLeft, RotateCcw, Search, ZoomIn, ZoomOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Node {
	id: string;
	name: string;
	group: number;
	level: number;
	children?: Node[];
	x?: number;
	y?: number;
	fx?: number;
	fy?: number;
	expanded?: boolean;
}

interface Link {
	source: string | Node;
	target: string | Node;
	value: number;
}

interface GraphData {
	nodes: Node[];
	links: Link[];
}

export default function MultiLevelNodesPage() {
	const svgRef = useRef<SVGSVGElement>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedNode, setSelectedNode] = useState<Node | null>(null);
	const [zoom, setZoom] = useState(1);

	// 生成示例数据
	const generateData = (): GraphData => {
		const nodes: Node[] = [
			{ id: "1", name: "根节点", group: 1, level: 0, expanded: true },
			{ id: "2", name: "技术栈", group: 2, level: 1 },
			{ id: "3", name: "前端框架", group: 3, level: 2 },
			{ id: "4", name: "React", group: 4, level: 3 },
			{ id: "5", name: "Vue", group: 4, level: 3 },
			{ id: "6", name: "Angular", group: 4, level: 3 },
			{ id: "7", name: "后端框架", group: 3, level: 2 },
			{ id: "8", name: "Node.js", group: 4, level: 3 },
			{ id: "9", name: "Express", group: 4, level: 3 },
			{ id: "10", name: "数据库", group: 2, level: 1 },
			{ id: "11", name: "关系型数据库", group: 3, level: 2 },
			{ id: "12", name: "MySQL", group: 4, level: 3 },
			{ id: "13", name: "PostgreSQL", group: 4, level: 3 },
			{ id: "14", name: "NoSQL", group: 3, level: 2 },
			{ id: "15", name: "MongoDB", group: 4, level: 3 },
			{ id: "16", name: "Redis", group: 4, level: 3 },
		];

		const links: Link[] = [
			{ source: "1", target: "2", value: 2 },
			{ source: "1", target: "10", value: 2 },
			{ source: "2", target: "3", value: 1 },
			{ source: "2", target: "7", value: 1 },
			{ source: "3", target: "4", value: 1 },
			{ source: "3", target: "5", value: 1 },
			{ source: "3", target: "6", value: 1 },
			{ source: "7", target: "8", value: 1 },
			{ source: "7", target: "9", value: 1 },
			{ source: "10", target: "11", value: 1 },
			{ source: "10", target: "14", value: 1 },
			{ source: "11", target: "12", value: 1 },
			{ source: "11", target: "13", value: 1 },
			{ source: "14", target: "15", value: 1 },
			{ source: "14", target: "16", value: 1 },
		];

		return { nodes, links };
	};

	useEffect(() => {
		if (!svgRef.current) return;

		const width = 800;
		const height = 600;
		const data = generateData();

		// 清除之前的SVG内容
		d3.select(svgRef.current).selectAll("*").remove();

		const svg = d3
			.select(svgRef.current)
			.attr("width", width)
			.attr("height", height)
			.attr("viewBox", [0, 0, width, height]);

		// 创建缩放行为
		const zoomBehavior = d3
			.zoom()
			.scaleExtent([0.1, 4])
			.on("zoom", (event) => {
				g.attr("transform", event.transform);
				setZoom(event.transform.k);
			});

		svg.call(zoomBehavior as any);

		const g = svg.append("g");

		// 创建力导向模拟
		const simulation = d3
			.forceSimulation(data.nodes as any)
			.force(
				"link",
				d3
					.forceLink(data.links)
					.id((d: any) => d.id)
					.distance(80),
			)
			.force("charge", d3.forceManyBody().strength(-300))
			.force("center", d3.forceCenter(width / 2, height / 2))
			.force("collision", d3.forceCollide().radius(30));

		// 创建箭头标记
		svg
			.append("defs")
			.append("marker")
			.attr("id", "arrowhead")
			.attr("viewBox", "-0 -5 10 10")
			.attr("refX", 20)
			.attr("refY", 0)
			.attr("orient", "auto")
			.attr("markerWidth", 8)
			.attr("markerHeight", 8)
			.attr("xoverflow", "visible")
			.append("svg:path")
			.attr("d", "M 0,-5 L 10 ,0 L 0,5")
			.attr("fill", "#999")
			.style("stroke", "none");

		// 创建连接线
		const link = g
			.append("g")
			.selectAll("line")
			.data(data.links)
			.enter()
			.append("line")
			.attr("stroke", "#999")
			.attr("stroke-opacity", 0.6)
			.attr("stroke-width", (d) => Math.sqrt(d.value))
			.attr("marker-end", "url(#arrowhead)");

		// 创建节点组
		const node = g
			.append("g")
			.selectAll("g")
			.data(data.nodes)
			.enter()
			.append("g")
			.call(
				d3
					.drag()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended) as any,
			)
			.on("click", (event, d) => {
				setSelectedNode(d);
			});

		// 添加节点圆圈
		node
			.append("circle")
			.attr("r", (d) => 10 + d.group * 3)
			.attr("fill", (d) => {
				const colors = [
					"#ff7f0e", // 橙色
					"#1f77b4", // 蓝色
					"#2ca02c", // 绿色
					"#d62728", // 红色
				];
				return colors[d.group % colors.length];
			})
			.attr("stroke", "#fff")
			.attr("stroke-width", 2)
			.style("cursor", "pointer")
			.on("mouseover", function (event, d) {
				d3.select(this).attr("r", (d: any) => 12 + d.group * 3);
			})
			.on("mouseout", function (event, d) {
				d3.select(this).attr("r", (d: any) => 10 + d.group * 3);
			});

		// 添加节点文本
		node
			.append("text")
			.text((d) => d.name)
			.attr("x", 0)
			.attr("y", (d) => 15 + d.group * 3)
			.attr("text-anchor", "middle")
			.attr("font-size", "12px")
			.attr("fill", "#333")
			.style("pointer-events", "none");

		// 模拟更新
		simulation.on("tick", () => {
			link
				.attr("x1", (d: any) => d.source.x)
				.attr("y1", (d: any) => d.source.y)
				.attr("x2", (d: any) => d.target.x)
				.attr("y2", (d: any) => d.target.y);

			node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
		});

		function dragstarted(event: any, d: any) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(event: any, d: any) {
			d.fx = event.x;
			d.fy = event.y;
		}

		function dragended(event: any, d: any) {
			if (!event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}

		return () => {
			simulation.stop();
		};
	}, []);

	// 处理搜索
	const handleSearch = (term: string) => {
		setSearchTerm(term);
		if (!svgRef.current) return;

		const svg = d3.select(svgRef.current);

		// 只选择有数据的节点组（包含圆圈的g元素）
		const nodes = svg.selectAll("g").filter(function(d: any) {
			// 过滤掉没有数据的g元素（如连接线的容器g）
			return d && d.name; // 确保有数据且包含name属性
		});

		console.log("找到节点数量:", nodes.size());

		if (term.trim() === "") {
			nodes.style("opacity", 1);
			return;
		}

		nodes.style("opacity", (d: any) => {
			const isMatch = d?.name?.toLowerCase().includes(term.toLowerCase());
			console.log(`节点: ${d?.name}, 匹配: ${isMatch}`);
			return isMatch ? 1 : 0.1; // 增强对比度
		});
	};

	// 缩放控制
	const handleZoomIn = () => {
		if (!svgRef.current) return;
		const svg = d3.select(svgRef.current);
		const zoomBehavior = d3.zoom();
		svg
			.transition()
			.duration(300)
			.call(
				zoomBehavior.transform as any,
				d3.zoomIdentity.scale(Math.min(zoom * 1.2, 4)),
			);
	};

	const handleZoomOut = () => {
		if (!svgRef.current) return;
		const svg = d3.select(svgRef.current);
		const zoomBehavior = d3.zoom();
		svg
			.transition()
			.duration(300)
			.call(
				zoomBehavior.transform as any,
				d3.zoomIdentity.scale(Math.max(zoom * 0.8, 0.1)),
			);
	};

	const handleReset = () => {
		if (!svgRef.current) return;
		const svg = d3.select(svgRef.current);
		const zoomBehavior = d3.zoom();
		svg
			.transition()
			.duration(300)
			.call(zoomBehavior.transform as any, d3.zoomIdentity);
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				{/* 头部导航 */}
				<div className="mb-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<Link
								href="/d3js"
								className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
							>
								<ArrowLeft className="w-5 h-5 mr-2" />
								返回D3.js列表
							</Link>
							<h1 className="text-3xl font-bold text-gray-900">
								多层级节点关系图
							</h1>
						</div>
					</div>
					<p className="text-gray-600 mt-2">
						交互式的力导向图，展示多层级节点关系，支持拖拽、缩放和搜索
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
					{/* 控制面板 */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">
								控制面板
							</h2>

							{/* 搜索功能 */}
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									搜索节点
								</label>
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
									<input
										type="text"
										value={searchTerm}
										onChange={(e) => handleSearch(e.target.value)}
										placeholder="输入节点名称..."
										className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
								</div>
							</div>

							{/* 缩放控制 */}
							<div className="mb-6">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									缩放控制
								</label>
								<div className="flex space-x-2">
									<button
										onClick={handleZoomIn}
										className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
									>
										<ZoomIn className="w-4 h-4" />
									</button>
									<button
										onClick={handleZoomOut}
										className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
									>
										<ZoomOut className="w-4 h-4" />
									</button>
									<button
										onClick={handleReset}
										className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
									>
										<RotateCcw className="w-4 h-4" />
									</button>
								</div>
								<div className="mt-2 text-sm text-gray-600 text-center">
									当前缩放: {(zoom * 100).toFixed(0)}%
								</div>
							</div>

							{/* 选中节点信息 */}
							{selectedNode && (
								<div className="mb-6">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										选中节点
									</label>
									<div className="p-3 bg-blue-50 rounded-lg">
										<div className="font-medium text-blue-900">
											{selectedNode.name}
										</div>
										<div className="text-sm text-blue-700">
											级别: {selectedNode.level} | 组: {selectedNode.group}
										</div>
									</div>
								</div>
							)}

							{/* 图例 */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									图例
								</label>
								<div className="space-y-2 text-sm">
									<div className="flex items-center">
										<div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
										<span>根节点</span>
									</div>
									<div className="flex items-center">
										<div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
										<span>主分类</span>
									</div>
									<div className="flex items-center">
										<div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
										<span>子分类</span>
									</div>
									<div className="flex items-center">
										<div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
										<span>具体项目</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* 图表区域 */}
					<div className="lg:col-span-3">
						<div className="bg-white rounded-lg shadow-md p-6">
							<div className="border-2 border-gray-200 rounded-lg overflow-hidden">
								<svg
									ref={svgRef}
									className="w-full h-full"
									style={{ minHeight: "600px" }}
								></svg>
							</div>
							<div className="mt-4 text-sm text-gray-600">
								<p>• 拖拽节点可以调整位置</p>
								<p>• 使用鼠标滚轮进行缩放</p>
								<p>• 点击节点查看详细信息</p>
								<p>• 使用搜索框过滤节点</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

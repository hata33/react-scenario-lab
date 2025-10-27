"use client";

import type { Selection, Simulation } from "d3";
import * as d3 from "d3";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";

// 图形节点接口定义
interface Node {
	id: string;
	name: string;
	x?: number;
	y?: number;
	fx?: number | null;
	fy?: number | null;
	size?: number;
	isLinkNode?: boolean;
	description?: string;
	type?: string;
	value?: number;
}

// 图形边接口定义
interface Edge {
	source: string | Node;
	target: string | Node;
	label?: string;
	value?: string;
	[key: string]: any;
}

// 图形数据接口定义
interface GraphData {
	nodes: Node[];
	edges: Edge[];
}

// 数据生成配置接口
interface DataGenerationConfig {
	nodeCount: number; // 节点总数
	levels: number; // 层级数
	connectionsPerNode: number; // 每个节点的平均连接数
	connectionDensity: number; // 连接密度 (0-1)
	branchingFactor: number; // 分支因子
}

// 主题配置
const THEME = {
	colors: {
		primary: "#2774fd", // 主要节点颜色
		secondary: "#89d0ac", // 次要节点颜色
		highlight: "#45b97c", // 高亮颜色
		stroke: "#97cbff", // 边框颜色
		text: "#333", // 文本颜色
		background: "#f0f2f5", // 背景颜色
		tooltip: {
			background: "rgba(255, 255, 255, 0.4)",
			border: "#ddd",
			shadow: "rgba(0, 0, 0, 0.15)",
			text: "#666",
		},
		arrow: {
			normal: "#d4eee1",
			highlight: "#45b97c",
		},
	},
	sizes: {
		mainNode: 30, // 主节点大小
		normalNode: 20, // 普通节点大小
		strokeWidth: 2, // 边框宽度
		edgeWidth: 1.5, // 边的宽度
		fontSize: {
			large: "14px",
			normal: "12px",
		},
		tooltip: {
			maxWidth: 300,
			padding: 12,
			borderRadius: 6,
		},
	},
	transitions: {
		duration: {
			fast: 200,
			normal: 300,
		},
	},
	opacity: {
		full: 1,
		dim: 0.05,
		edge: 0.6,
		dimText: 0.1,
	},
} as const;

// 力导向图配置
const FORCE_CONFIG = {
	zoom: {
		min: 0.1,
		max: 4,
	},
} as const;

// 样式配置
const STYLES = {
	tooltip: {
		container: `
      line-height: 1.5;
      z-index: 1000;
    `,
		title: `
      font-size: 16px;
      font-weight: 500;
    `,
		label: `
      width: 60px;
    `,
		value: `
      margin-bottom: 4px;
    `,
		id: `
      margin-top: 8px;
      font-size: 12px;
    `,
	},
} as const;

// 动态数据生成函数
const generateDynamicData = (config: DataGenerationConfig): GraphData => {
	const { nodeCount, levels, connectionsPerNode, connectionDensity, branchingFactor } = config;

	// 中文节点名称库
	const nodeNames = [
		"核心",
		"中心",
		"总部",
		"主体",
		"根基",
		"枢纽",
		"引擎",
		"核心",
		"大脑",
		"心脏",
		"节点",
		"分部",
		"单元",
		"模块",
		"部门",
		"组件",
		"部分",
		"区域",
		"站点",
		"端口",
		"终端",
		"接口",
		"入口",
		"出口",
		"通道",
		"连接",
		"桥梁",
		"纽带",
		"链接",
		"关联",
		"处理器",
		"分析器",
		"控制器",
		"管理器",
		"监控器",
		"执行器",
		"计算器",
		"存储器",
		"缓存器",
		"传输器",
		"服务",
		"系统",
		"平台",
		"应用",
		"工具",
		"框架",
		"库",
		"接口",
		"协议",
		"标准",
		"数据",
		"信息",
		"内容",
		"资源",
		"文件",
		"文档",
		"记录",
		"日志",
		"报告",
		"统计",
		"用户",
		"客户",
		"管理者",
		"开发者",
		"使用者",
		"访问者",
		"操作员",
		"管理员",
		"维护者",
		"设计者",
	];

	const descriptions = [
		"系统的核心组件",
		"负责数据处理",
		"管理用户交互",
		"提供关键服务",
		"执行重要任务",
		"维护系统稳定",
		"优化性能表现",
		"保障安全运行",
		"监控状态变化",
		"协调各模块工作",
	];

	const relationshipTypes = [
		{ label: "管理", value: "管理关系" },
		{ label: "支持", value: "支持关系" },
		{ label: "连接", value: "连接关系" },
		{ label: "依赖", value: "依赖关系" },
		{ label: "协作", value: "协作关系" },
		{ label: "通信", value: "通信关系" },
		{ label: "同步", value: "同步关系" },
		{ label: "控制", value: "控制关系" },
	];

	// 生成节点
	const nodes: Node[] = [];

	// 根节点
	nodes.push({
		id: "root",
		name: "根节点",
		value: 100,
		description: "整个系统的主要根节点",
		type: "root",
		size: THEME.sizes.mainNode,
	});

	// 按层级生成其他节点
	let currentNodeIndex = 1;
	const nodesPerLevel = Math.floor((nodeCount - 1) / levels);
	const remainingNodes = (nodeCount - 1) % levels;

	for (let level = 1; level <= levels; level++) {
		const nodesInThisLevel = nodesPerLevel + (level <= remainingNodes ? 1 : 0);

		for (let i = 0; i < nodesInThisLevel && currentNodeIndex < nodeCount; i++) {
			const nameIndex = (currentNodeIndex + level + i) % nodeNames.length;
			const descIndex = (currentNodeIndex + level + i) % descriptions.length;

			nodes.push({
				id: `node_${currentNodeIndex}`,
				name: `${nodeNames[nameIndex]}${level}-${i + 1}`,
				value: Math.max(20, 100 - level * 15 + Math.random() * 20),
				description: descriptions[descIndex],
				type: `level_${level}`,
				size: Math.max(15, THEME.sizes.normalNode - level * 2),
			});
			currentNodeIndex++;
		}
	}

	// 生成边
	const edges: Edge[] = [];
	const maxPossibleEdges = (nodeCount * (nodeCount - 1)) / 2;
	const targetEdgeCount = Math.floor(maxPossibleEdges * connectionDensity);

	// 确保连通性：为每个非根节点至少创建一个连接
	for (let i = 1; i < Math.min(nodes.length, branchingFactor + 1); i++) {
		const relationship = relationshipTypes[Math.floor(Math.random() * relationshipTypes.length)];
		edges.push({
			source: "root",
			target: nodes[i].id,
			label: relationship.label,
			value: relationship.value,
		});
	}

	// 按层级创建连接
	for (let level = 1; level < levels; level++) {
		const currentLevelNodes = nodes.filter((n) => n.type === `level_${level}`);
		const nextLevelNodes = nodes.filter((n) => n.type === `level_${level + 1}`);

		currentLevelNodes.forEach((currentNode) => {
			const connectionsToMake = Math.min(Math.ceil(branchingFactor * 0.7), nextLevelNodes.length);

			for (let i = 0; i < connectionsToMake; i++) {
				const targetNode = nextLevelNodes[Math.floor(Math.random() * nextLevelNodes.length)];
				const relationship = relationshipTypes[Math.floor(Math.random() * relationshipTypes.length)];

				// 避免重复边
				const exists = edges.some(
					(e) =>
						(e.source === currentNode.id && e.target === targetNode.id) ||
						(e.source === targetNode.id && e.target === currentNode.id),
				);

				if (!exists) {
					edges.push({
						source: currentNode.id,
						target: targetNode.id,
						label: relationship.label,
						value: relationship.value,
					});
				}
			}
		});
	}

	// 添加随机连接以满足连接密度要求
	let attempts = 0;
	while (edges.length < targetEdgeCount && attempts < targetEdgeCount * 2) {
		const sourceIndex = Math.floor(Math.random() * nodes.length);
		const targetIndex = Math.floor(Math.random() * nodes.length);

		if (sourceIndex !== targetIndex) {
			const source = nodes[sourceIndex];
			const target = nodes[targetIndex];

			// 避免重复边和自连接
			const exists = edges.some(
				(e) => (e.source === source.id && e.target === target.id) || (e.source === target.id && e.target === source.id),
			);

			if (!exists) {
				const relationship = relationshipTypes[Math.floor(Math.random() * relationshipTypes.length)];
				edges.push({
					source: source.id,
					target: target.id,
					label: relationship.label,
					value: relationship.value,
				});
			}
		}
		attempts++;
	}

	return { nodes, edges };
};

// 示例数据
const sampleData: GraphData = {
	nodes: [
		{
			id: "root",
			name: "根节点",
			value: 100,
			description: "图形的主要根节点",
		},
		{
			id: "node1",
			name: "节点一",
			value: 80,
			description: "第一个子节点",
		},
		{
			id: "node2",
			name: "节点二",
			value: 60,
			description: "第二个子节点",
		},
		{
			id: "node3",
			name: "节点三",
			value: 40,
			description: "第三个子节点",
		},
		{
			id: "node4",
			name: "节点四",
			value: 30,
			description: "第四个子节点",
		},
		{
			id: "node5",
			name: "节点五",
			value: 20,
			description: "第五个子节点",
		},
	],
	edges: [
		{
			source: "root",
			target: "node1",
			label: "连接到",
			value: "强连接",
		},
		{
			source: "root",
			target: "node2",
			label: "连接到",
			value: "中等连接",
		},
		{
			source: "node1",
			target: "node3",
			label: "连接到",
			value: "弱连接",
		},
		{
			source: "node2",
			target: "node4",
			label: "连接到",
			value: "弱连接",
		},
		{
			source: "node3",
			target: "node5",
			label: "连接到",
			value: "弱连接",
		},
	],
};

export default function NewStyleGraphPage() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(true);
	const [graphData, setGraphData] = useState<GraphData>(sampleData);
	const [useDynamicData, setUseDynamicData] = useState(false);
	const [config, setConfig] = useState<DataGenerationConfig>({
		nodeCount: 20,
		levels: 3,
		connectionsPerNode: 3,
		connectionDensity: 0.3,
		branchingFactor: 3,
	});

	// D3 相关引用
	const svgRef = useRef<Selection<SVGSVGElement, unknown, null, undefined> | null>(null);
	const simulationRef = useRef<Simulation<Node, Edge> | null>(null);
	const tooltipRef = useRef<Selection<HTMLDivElement, unknown, null, undefined> | null>(null);

	// 工具函数
	const isMainNode = useCallback((d: Node) => d.name === "根节点", []);
	const getNodeRadius = useCallback(
		(d: Node) => (isMainNode(d) ? THEME.sizes.mainNode : d.size || THEME.sizes.normalNode),
		[isMainNode],
	);
	const getNodeColor = useCallback(
		(d: Node) => (isMainNode(d) ? THEME.colors.highlight : THEME.colors.primary),
		[isMainNode],
	);
	const getNodeStroke = useCallback((d: Node) => (d.isLinkNode ? THEME.colors.secondary : THEME.colors.stroke), []);
	const getNodeStrokeWidth = useCallback((d: Node) => (d.isLinkNode ? 1 : THEME.sizes.strokeWidth), []);

	// 创建提示框内容
	const createTooltipContent = useCallback((d: Node) => {
		return `
      <div style="${STYLES.tooltip.container}">
        <div style="${STYLES.tooltip.title}; color: ${THEME.colors.primary}">
          ${d.name}
        </div>
        ${d.description ? `<div style="margin-top: 8px;">${d.description}</div>` : ""}
        ${d.value ? `<div style="margin-top: 4px;">数值: ${d.value}</div>` : ""}
        <div style="${STYLES.tooltip.id}; color: ${THEME.colors.tooltip.text}">
          ID: ${d.id}
        </div>
      </div>
    `;
	}, []);

	// 获取到根节点的路径
	const getPathToRoot = useCallback(
		(targetId: string, rootId: string = "root"): string[][] => {
			const paths: string[][] = [];
			const visited = new Set<string>();
			const queue: [string, string[]][] = [[targetId, [targetId]]];

			while (queue.length > 0) {
				const [currentId, path] = queue.shift()!;

				if (currentId === rootId) {
					paths.push(path);
					continue;
				}

				if (visited.has(currentId)) continue;
				visited.add(currentId);

				// 查找连接到当前节点的所有边
				graphData.edges.forEach((edge) => {
					const sourceId = typeof edge.source === "string" ? edge.source : edge.source.id;
					const targetId = typeof edge.target === "string" ? edge.target : edge.target.id;

					if (targetId === currentId && !visited.has(sourceId)) {
						queue.push([sourceId, [...path, sourceId]]);
					}
				});
			}

			return paths;
		},
		[graphData.edges],
	);

	// 高亮相关节点
	const highlightRelatedNodes = useCallback(
		(targetId: string) => {
			if (!svgRef.current) return;

			const svg = svgRef.current;
			const linkSelection = svg.selectAll<SVGLineElement, Edge>(".link");
			const nodeSelection = svg.selectAll<SVGGElement, Node>(".node");

			// 获取相关的边
			const relatedLinks = linkSelection.filter((l) => {
				const sourceId = typeof l.source === "string" ? l.source : l.source.id;
				const targetId = typeof l.target === "string" ? l.target : l.target.id;
				return sourceId === targetId || targetId === targetId;
			});

			// 获取相关的节点
			const relatedNodeIds = new Set([targetId]);
			relatedLinks.each((l) => {
				const sourceId = typeof l.source === "string" ? l.source : l.source.id;
				const targetId = typeof l.target === "string" ? l.target : l.target.id;
				relatedNodeIds.add(sourceId);
				relatedNodeIds.add(targetId);
			});

			const paths = getPathToRoot(targetId);
			paths.forEach((path) => {
				path.forEach((id) => {
					relatedNodeIds.add(id);
				});
			});

			// 高亮相关节点，淡化其他节点
			nodeSelection.each(function (n) {
				const element = d3.select(this);
				const isRelated = relatedNodeIds.has(n.id);

				element
					.select("circle")
					.transition()
					.duration(THEME.transitions.duration.normal)
					.attr("opacity", isRelated ? THEME.opacity.full : THEME.opacity.dim)
					.attr("fill", isRelated ? getNodeColor(n) : THEME.colors.secondary)
					.attr("r", isRelated ? getNodeRadius(n) : getNodeRadius(n) * 0.8);

				element
					.select("text")
					.transition()
					.duration(THEME.transitions.duration.normal)
					.attr("opacity", isRelated ? THEME.opacity.full : THEME.opacity.dimText);
			});

			linkSelection
				.transition()
				.duration(THEME.transitions.duration.normal)
				.attr("opacity", (l) => {
					const sourceId = typeof l.source === "string" ? l.source : l.source.id;
					const targetId = typeof l.target === "string" ? l.target : l.target.id;
					return relatedNodeIds.has(sourceId) && relatedNodeIds.has(targetId) ? THEME.opacity.edge : THEME.opacity.dim;
				})
				.attr("stroke", (l) => {
					const sourceId = typeof l.source === "string" ? l.source : l.source.id;
					const targetId = typeof l.target === "string" ? l.target : l.target.id;
					return relatedNodeIds.has(sourceId) && relatedNodeIds.has(targetId)
						? THEME.colors.highlight
						: THEME.colors.secondary;
				})
				.attr("stroke-width", (l) => {
					const sourceId = typeof l.source === "string" ? l.source : l.source.id;
					const targetId = typeof l.target === "string" ? l.target : l.target.id;
					return relatedNodeIds.has(sourceId) && relatedNodeIds.has(targetId)
						? THEME.sizes.edgeWidth * 2
						: THEME.sizes.edgeWidth;
				})
				.attr("marker-end", (l) => {
					const sourceId = typeof l.source === "string" ? l.source : l.source.id;
					const targetId = typeof l.target === "string" ? l.target : l.target.id;
					return relatedNodeIds.has(sourceId) && relatedNodeIds.has(targetId)
						? "url(#arrowhead-highlight)"
						: "url(#arrowhead-normal)";
				});
		},
		[getPathToRoot, getNodeColor, getNodeRadius],
	);

	// 重置高亮状态
	const resetHighlight = useCallback(() => {
		if (!svgRef.current) return;

		const svg = svgRef.current;
		const linkSelection = svg.selectAll<SVGLineElement, Edge>(".link");
		const nodeSelection = svg.selectAll<SVGGElement, Node>(".node");

		nodeSelection.each(function (n) {
			const element = d3.select(this);

			element
				.select("circle")
				.transition()
				.duration(THEME.transitions.duration.normal)
				.attr("opacity", THEME.opacity.full)
				.attr("fill", getNodeColor(n))
				.attr("r", getNodeRadius(n))
				.attr("stroke-width", getNodeStrokeWidth(n));

			element
				.select("text")
				.transition()
				.duration(THEME.transitions.duration.normal)
				.attr("opacity", THEME.opacity.full);
		});

		linkSelection
			.transition()
			.duration(THEME.transitions.duration.normal)
			.attr("opacity", THEME.opacity.edge)
			.attr("stroke", THEME.colors.secondary)
			.attr("stroke-width", THEME.sizes.edgeWidth)
			.attr("marker-end", "url(#arrowhead-normal)");
	}, [getNodeColor, getNodeRadius, getNodeStrokeWidth]);

	// 中心化节点
	const centerNode = useCallback(
		(targetId: string) => {
			if (!svgRef.current || !containerRef.current) return;

			const svg = svgRef.current;
			const targetNode = graphData.nodes.find((node) => node.id === targetId);

			if (!targetNode) {
				console.error("目标节点未找到！");
				return;
			}

			const width = containerRef.current.clientWidth;
			const height = containerRef.current.clientHeight;

			const centerX = width / 2;
			const centerY = height / 2;

			const offsetX = centerX - (targetNode.x || 0);
			const offsetY = centerY - (targetNode.y || 0);

			const zoom = d3
				.zoom<SVGSVGElement, unknown>()
				.scaleExtent([FORCE_CONFIG.zoom.min, FORCE_CONFIG.zoom.max])
				.on("zoom", (event) => {
					svg.select("g").attr("transform", event.transform);
				});

			const transform = d3.zoomIdentity.translate(offsetX, offsetY).scale(1);

			svg
				.transition()
				.duration(THEME.transitions.duration.normal * 2)
				.call(zoom.transform, transform);
		},
		[graphData.nodes],
	);

	// 拖拽相关函数
	const dragstarted = useCallback((event: d3.D3DragEvent<SVGGElement, Node, unknown>, d: Node) => {
		if (!event.active && simulationRef.current) {
			simulationRef.current.alphaTarget(0.3).restart();
		}
		d.fx = d.x;
		d.fy = d.y;
	}, []);

	const dragged = useCallback((event: d3.D3DragEvent<SVGGElement, Node, unknown>, d: Node) => {
		d.fx = event.x;
		d.fy = event.y;
	}, []);

	const dragended = useCallback((event: d3.D3DragEvent<SVGGElement, Node, unknown>, d: Node) => {
		if (!event.active && simulationRef.current) {
			simulationRef.current.alphaTarget(0);
		}
		d.fx = null;
		d.fy = null;
	}, []);

	// 初始化图形
	const initGraph = useCallback(() => {
		if (!containerRef.current) return;

		setLoading(true);

		// 清除已有的SVG
		d3.select(containerRef.current).selectAll("svg").remove();

		const width = containerRef.current.clientWidth;
		const height = containerRef.current.clientHeight;

		// 创建SVG容器
		const svg = d3.select(containerRef.current).append("svg").attr("width", width).attr("height", height);

		svgRef.current = svg;

		// 创建提示框
		const tooltip = d3
			.select("body")
			.append("div")
			.attr("class", "tooltip")
			.style("position", "absolute")
			.style("visibility", "hidden")
			.style("background-color", THEME.colors.tooltip.background)
			.style("backdrop-filter", "blur(5px)")
			.style("z-index", "1000")
			.style("border", `1px solid ${THEME.colors.tooltip.border}`)
			.style("box-shadow", `0 2px 8px ${THEME.colors.tooltip.shadow}`)
			.style("padding", `${THEME.sizes.tooltip.padding}px`)
			.style("border-radius", `${THEME.sizes.tooltip.borderRadius}px`)
			.style("font-size", THEME.sizes.fontSize.normal)
			.style("pointer-events", "none")
			.style("max-width", `${THEME.sizes.tooltip.maxWidth}px`)
			.style("word-wrap", "break-word");

		tooltipRef.current = tooltip as any;

		svg.on("click", (event) => {
			if (event && event.defaultPrevented) return;
			resetHighlight();
		});

		// 添加缩放功能
		const g = svg.append("g");
		svg.call(
			d3
				.zoom<SVGSVGElement, unknown>()
				.scaleExtent([FORCE_CONFIG.zoom.min, FORCE_CONFIG.zoom.max])
				.on("zoom", (event) => {
					g.attr("transform", event.transform);
				}),
		);

		// 创建箭头标记
		svg
			.append("defs")
			.selectAll("marker")
			.data(["normal", "highlight"])
			.join("marker")
			.attr("id", (d) => `arrowhead-${d}`)
			.attr("viewBox", "-0 -5 10 10")
			.attr("refX", 30)
			.attr("refY", 0)
			.attr("orient", "auto")
			.attr("markerWidth", 10)
			.attr("markerHeight", 10)
			.attr("markerUnits", "userSpaceOnUse")
			.append("path")
			.attr("d", "M 0,-5 L 10,0 L 0,5")
			.attr("fill", (d) => (d === "highlight" ? THEME.colors.arrow.highlight : THEME.colors.arrow.normal))
			.attr("stroke-width", 0);

		// 创建力导向图
		const simulation = d3
			.forceSimulation<Node>(graphData.nodes)
			.force(
				"link",
				d3
					.forceLink<Node, Edge>(graphData.edges)
					.id((d) => d.id)
					.distance(100),
			)
			.force("charge", d3.forceManyBody().strength(-1500))
			.force("center", d3.forceCenter(width / 2, height / 2))
			.force("collision", d3.forceCollide().radius(1))
			.force("x", d3.forceX(width / 2).strength(0.1))
			.force("y", d3.forceY(height / 2).strength(0.1));

		simulationRef.current = simulation;

		// 创建边
		const link = g
			.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(graphData.edges)
			.join("line")
			.attr("class", "link")
			.attr("stroke", THEME.colors.secondary)
			.attr("stroke-width", THEME.sizes.edgeWidth)
			.attr("opacity", THEME.opacity.edge)
			.attr("marker-end", "url(#arrowhead-normal)");

		// 创建节点
		const node = g
			.append("g")
			.attr("class", "nodes")
			.selectAll("g")
			.data(graphData.nodes)
			.join("g")
			.attr("class", "node")
			.call(d3.drag<SVGGElement, Node>().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any);

		// 添加节点圆圈
		node
			.append("circle")
			.attr("r", getNodeRadius)
			.attr("fill", getNodeColor)
			.attr("stroke", getNodeStroke)
			.attr("stroke-width", getNodeStrokeWidth)
			.style("cursor", "pointer")
			.on("mouseover", (event, d) => {
				if (tooltipRef.current) {
					tooltipRef.current.html(createTooltipContent(d)).style("visibility", "visible");
				}
			})
			.on("mousemove", (event) => {
				if (tooltipRef.current) {
					tooltipRef.current.style("top", event.pageY - 10 + "px").style("left", event.pageX + 10 + "px");
				}
			})
			.on("mouseout", () => {
				if (tooltipRef.current) {
					tooltipRef.current.style("visibility", "hidden");
				}
			})
			.on("click", (event, d) => {
				event.stopPropagation();
				highlightRelatedNodes(d.id);
			});

		// 添加节点文本
		node
			.append("text")
			.text((d) => d.name)
			.attr("font-size", (d) => (isMainNode(d) ? THEME.sizes.fontSize.large : THEME.sizes.fontSize.normal))
			.attr("text-anchor", "middle")
			.attr("dy", (d) => getNodeRadius(d) + 15)
			.attr("fill", THEME.colors.text)
			.style("pointer-events", "none");

		// 更新位置
		simulation.on("tick", () => {
			link
				.attr("x1", (d) => (d.source as Node).x || 0)
				.attr("y1", (d) => (d.source as Node).y || 0)
				.attr("x2", (d) => (d.target as Node).x || 0)
				.attr("y2", (d) => (d.target as Node).y || 0);

			node.attr("transform", (d) => `translate(${d.x || 0},${d.y || 0})`);
		});

		simulation.on("end", () => {
			const rootNode = graphData.nodes.find((n) => n.name === "根节点");
			if (rootNode) {
				centerNode(rootNode.id);
			}
			setLoading(false);
		});

		// 重启模拟器
		simulation.alpha(1).restart();
	}, [
		graphData,
		dragstarted,
		dragged,
		dragended,
		getNodeRadius,
		getNodeColor,
		getNodeStroke,
		getNodeStrokeWidth,
		createTooltipContent,
		highlightRelatedNodes,
		centerNode,
		isMainNode,
	]);

	// 重新生成数据
	const regenerateData = useCallback(() => {
		if (useDynamicData) {
			const newData = generateDynamicData(config);
			setGraphData(newData);
		}
	}, [useDynamicData, config]);

	// 处理窗口大小变化
	useEffect(() => {
		const handleResize = () => {
			if (containerRef.current && svgRef.current) {
				const width = containerRef.current.clientWidth;
				const height = containerRef.current.clientHeight;
				svgRef.current.attr("width", width).attr("height", height);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// 初始化
	useEffect(() => {
		initGraph();

		return () => {
			// 清理
			if (tooltipRef.current) {
				tooltipRef.current.remove();
			}
			if (containerRef.current) {
				d3.select(containerRef.current).selectAll("svg").remove();
			}
			if (simulationRef.current) {
				simulationRef.current.stop();
			}
		};
	}, [initGraph]);

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8">
						<h1 className="mb-2 font-bold text-3xl text-gray-900">交互式力导向图形</h1>
						<p className="text-gray-600">点击节点高亮连接关系。拖拽重新定位。滚轮缩放视图。</p>
					</div>

					<div className="rounded-lg bg-white p-4 shadow-lg">
						<div className="mb-6">
							<div className="mb-4 flex items-center justify-between">
								<h2 className="font-semibold text-gray-800 text-lg">动态数据控制</h2>
								<label className="flex cursor-pointer items-center">
									<input
										type="checkbox"
										checked={useDynamicData}
										onChange={(e) => setUseDynamicData(e.target.checked)}
										className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
									<span className="text-gray-700 text-sm">启用动态生成</span>
								</label>
							</div>

							{useDynamicData && (
								<div className="grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-2 lg:grid-cols-3">
									<div>
										<label className="mb-2 block font-medium text-gray-700 text-sm">节点数量: {config.nodeCount}</label>
										<input
											type="range"
											min="5"
											max="100"
											value={config.nodeCount}
											onChange={(e) =>
												setConfig({
													...config,
													nodeCount: parseInt(e.target.value),
												})
											}
											className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
										/>
									</div>

									<div>
										<label className="mb-2 block font-medium text-gray-700 text-sm">层级数: {config.levels}</label>
										<input
											type="range"
											min="1"
											max="10"
											value={config.levels}
											onChange={(e) =>
												setConfig({
													...config,
													levels: parseInt(e.target.value),
												})
											}
											className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
										/>
									</div>

									<div>
										<label className="mb-2 block font-medium text-gray-700 text-sm">
											连接密度: {(config.connectionDensity * 100).toFixed(0)}%
										</label>
										<input
											type="range"
											min="0.1"
											max="0.8"
											step="0.1"
											value={config.connectionDensity}
											onChange={(e) =>
												setConfig({
													...config,
													connectionDensity: parseFloat(e.target.value),
												})
											}
											className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
										/>
									</div>

									<div>
										<label className="mb-2 block font-medium text-gray-700 text-sm">
											分支因子: {config.branchingFactor}
										</label>
										<input
											type="range"
											min="1"
											max="10"
											value={config.branchingFactor}
											onChange={(e) =>
												setConfig({
													...config,
													branchingFactor: parseInt(e.target.value),
												})
											}
											className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
										/>
									</div>

									<div className="flex items-end">
										<button
											onClick={regenerateData}
											className="rounded bg-green-500 px-6 py-2 font-medium text-white transition-colors hover:bg-green-600"
										>
											重新生成数据
										</button>
									</div>
								</div>
							)}
						</div>

						<div className="mb-4 flex flex-wrap gap-4">
							<button
								onClick={() => centerNode("root")}
								className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
							>
								居中根节点
							</button>
							<button
								onClick={resetHighlight}
								className="rounded bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
							>
								重置高亮
							</button>
							{loading && (
								<div className="flex items-center">
									<div className="h-5 w-5 animate-spin rounded-full border-blue-500 border-b-2"></div>
									<span className="ml-2 text-gray-600">正在加载图形...</span>
								</div>
							)}
						</div>

						<div
							ref={containerRef}
							className="grid-background h-[600px] w-full rounded border border-gray-200"
							style={{
								backgroundImage: `
                linear-gradient(rgba(200, 200, 200, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(200, 200, 200, 0.2) 1px, transparent 1px)
              `,
								backgroundSize: "20px 20px",
							}}
						/>
					</div>

					<div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
						<h2 className="mb-4 font-semibold text-xl">图形信息</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							<div className="rounded bg-gray-50 p-4">
								<h3 className="font-medium text-gray-700">节点数量</h3>
								<p className="font-bold text-2xl text-blue-600">{graphData.nodes.length}</p>
							</div>
							<div className="rounded bg-gray-50 p-4">
								<h3 className="font-medium text-gray-700">连接数量</h3>
								<p className="font-bold text-2xl text-green-600">{graphData.edges.length}</p>
							</div>
							<div className="rounded bg-gray-50 p-4">
								<h3 className="font-medium text-gray-700">状态</h3>
								<p className="font-semibold text-gray-600 text-lg">{loading ? "加载中..." : "就绪"}</p>
							</div>
						</div>
					</div>

					<div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
						<h2 className="mb-4 font-semibold text-xl">使用说明</h2>
						<div className="space-y-2 text-gray-600">
							<p>
								• <strong>点击节点</strong>：高亮显示该节点的所有连接关系
							</p>
							<p>
								• <strong>拖拽节点</strong>：重新排列节点的位置
							</p>
							<p>
								• <strong>滚轮缩放</strong>：放大或缩小图形视图
							</p>
							<p>
								• <strong>拖拽画布</strong>：平移整个图形
							</p>
							<p>
								• <strong>悬停节点</strong>：查看节点的详细信息
							</p>
							<p>
								• <strong>点击空白区域</strong>：重置高亮状态
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

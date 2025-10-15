"use client";

import { useState } from "react";
import {
	BpmnEditorAdvanced,
	BpmnEditorWithProperties,
	BpmnViewerAdvanced,
	defaultBpmnXml,
} from "@/components/bpmn";

// 复杂的示例 BPMN XML
const complexBpmnXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                 xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                 xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                 xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                 xmlns:camunda="http://camunda.org/schema/1.0/bpmn"
                 id="Definitions_1"
                 targetNamespace="http://bpmn.io/schema/bpmn"
                 exporter="Camunda Modeler"
                 exporterVersion="1.16.0">
  <bpmn:process id="Order_Process" name="订单处理流程" isExecutable="true">
    <bpmn:startEvent id="Start_Event" name="收到订单">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>

    <bpmn:userTask id="Check_Inventory" name="检查库存" camunda:assignee="inventory@company.com">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:userTask>

    <bpmn:exclusiveGateway id="Inventory_Check" name="库存充足?">
      <bpmn:incoming>Flow_2</bpmn:incoming>
      <bpmn:outgoing>Flow_3</bpmn:outgoing>
      <bpmn:outgoing>Flow_4</bpmn:outgoing>
    </bpmn:exclusiveGateway>

    <bpmn:serviceTask id="Process_Payment" name="处理支付" camunda:class="com.company.PaymentService">
      <bpmn:incoming>Flow_3</bpmn:incoming>
      <bpmn:outgoing>Flow_5</bpmn:outgoing>
    </bpmn:serviceTask>

    <bpmn:serviceTask id="Restock_Inventory" name="补充库存" camunda:class="com.company.RestockService">
      <bpmn:incoming>Flow_4</bpmn:incoming>
      <bpmn:outgoing>Flow_6</bpmn:outgoing>
    </bpmn:serviceTask>

    <bpmn:parallelGateway id="Fork_Shipping" name="开始发货">
      <bpmn:incoming>Flow_5</bpmn:incoming>
      <bpmn:incoming>Flow_6</bpmn:incoming>
      <bpmn:outgoing>Flow_7</bpmn:outgoing>
      <bpmn:outgoing>Flow_8</bpmn:outgoing>
    </bpmn:parallelGateway>

    <bpmn:userTask id="Package_Items" name="打包商品" camunda:assignee="warehouse@company.com">
      <bpmn:incoming>Flow_7</bpmn:incoming>
      <bpmn:outgoing>Flow_9</bpmn:outgoing>
    </bpmn:userTask>

    <bpmn:userTask id="Arrange_Shipping" name="安排物流" camunda:assignee="logistics@company.com">
      <bpmn:incoming>Flow_8</bpmn:incoming>
      <bpmn:outgoing>Flow_10</bpmn:outgoing>
    </bpmn:userTask>

    <bpmn:parallelGateway id="Join_Shipping" name="发货完成">
      <bpmn:incoming>Flow_9</bpmn:incoming>
      <bpmn:incoming>Flow_10</bpmn:incoming>
      <bpmn:outgoing>Flow_11</bpmn:outgoing>
    </bpmn:parallelGateway>

    <bpmn:endEvent id="Order_Completed" name="订单完成">
      <bpmn:incoming>Flow_11</bpmn:incoming>
    </bpmn:endEvent>

    <bpmn:sequenceFlow id="Flow_1" sourceRef="Start_Event" targetRef="Check_Inventory" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Check_Inventory" targetRef="Inventory_Check" />
    <bpmn:sequenceFlow id="Flow_3" name="充足" sourceRef="Inventory_Check" targetRef="Process_Payment" />
    <bpmn:sequenceFlow id="Flow_4" name="不足" sourceRef="Inventory_Check" targetRef="Restock_Inventory" />
    <bpmn:sequenceFlow id="Flow_5" sourceRef="Process_Payment" targetRef="Fork_Shipping" />
    <bpmn:sequenceFlow id="Flow_6" sourceRef="Restock_Inventory" targetRef="Fork_Shipping" />
    <bpmn:sequenceFlow id="Flow_7" sourceRef="Fork_Shipping" targetRef="Package_Items" />
    <bpmn:sequenceFlow id="Flow_8" sourceRef="Fork_Shipping" targetRef="Arrange_Shipping" />
    <bpmn:sequenceFlow id="Flow_9" sourceRef="Package_Items" targetRef="Join_Shipping" />
    <bpmn:sequenceFlow id="Flow_10" sourceRef="Arrange_Shipping" targetRef="Join_Shipping" />
    <bpmn:sequenceFlow id="Flow_11" sourceRef="Join_Shipping" targetRef="Order_Completed" />
  </bpmn:process>

  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Order_Process">
      <bpmndi:BPMNShape id="Start_Event_di" bpmnElement="Start_Event">
        <dc:Bounds x="152" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="140" y="145" width="60" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Check_Inventory_di" bpmnElement="Check_Inventory">
        <dc:Bounds x="250" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Inventory_Check_di" bpmnElement="Inventory_Check">
        <dc:Bounds x="410" y="85" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="395" y="145" width="80" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Process_Payment_di" bpmnElement="Process_Payment">
        <dc:Bounds x="530" y="40" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Restock_Inventory_di" bpmnElement="Restock_Inventory">
        <dc:Bounds x="530" y="140" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Fork_Shipping_di" bpmnElement="Fork_Shipping">
        <dc:Bounds x="700" y="85" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="685" y="145" width="80" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Package_Items_di" bpmnElement="Package_Items">
        <dc:Bounds x="820" y="40" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Arrange_Shipping_di" bpmnElement="Arrange_Shipping">
        <dc:Bounds x="820" y="140" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Join_Shipping_di" bpmnElement="Join_Shipping">
        <dc:Bounds x="990" y="85" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="975" y="145" width="80" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Order_Completed_di" bpmnElement="Order_Completed">
        <dc:Bounds x="1110" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1098" y="145" width="60" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>

      <!-- 连接线 -->
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="188" y="120" />
        <di:waypoint x="250" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="350" y="120" />
        <di:waypoint x="410" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="460" y="110" />
        <di:waypoint x="530" y="80" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="483" y="85" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <di:waypoint x="460" y="130" />
        <di:waypoint x="530" y="180" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="483" y="155" width="24" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_5_di" bpmnElement="Flow_5">
        <di:waypoint x="630" y="80" />
        <di:waypoint x="700" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_6_di" bpmnElement="Flow_6">
        <di:waypoint x="630" y="180" />
        <di:waypoint x="700" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_7_di" bpmnElement="Flow_7">
        <di:waypoint x="750" y="110" />
        <di:waypoint x="820" y="80" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_8_di" bpmnElement="Flow_8">
        <di:waypoint x="750" y="110" />
        <di:waypoint x="820" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_9_di" bpmnElement="Flow_9">
        <di:waypoint x="920" y="80" />
        <di:waypoint x="990" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_10_di" bpmnElement="Flow_10">
        <di:waypoint x="920" y="180" />
        <di:waypoint x="990" y="110" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_11_di" bpmnElement="Flow_11">
        <di:waypoint x="1040" y="110" />
        <di:waypoint x="1110" y="120" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

export default function BpmnAdvancedPage() {
	const [activeTab, setActiveTab] = useState<'editor' | 'editor-props' | 'viewer'>('editor');
	const [bpmnXml, setBpmnXml] = useState(complexBpmnXml);
	const [showProperties, setShowProperties] = useState(true);
	const [propertiesPosition, setPropertiesPosition] = useState<'left' | 'right'>('right');

	const handleLoad = () => {
		console.log("BPMN 组件加载完成");
	};

	const handleError = (error: Error) => {
		console.error("BPMN 组件加载失败:", error);
	};

	const handleExport = async () => {
		try {
			const xml = (window as any).bpmnEditor?.getXml?.();
			if (xml) {
				const blob = new Blob([xml], { type: "text/xml" });
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = "advanced-diagram.bpmn";
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
			}
		} catch (error) {
			console.error("导出失败:", error);
		}
	};

	const handleLoadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const xml = e.target?.result as string;
				setBpmnXml(xml);
			};
			reader.readAsText(file);
		}
	};

	const tabs = [
		{ id: 'editor', label: '高级编辑器', description: '增强功能编辑器' },
		{ id: 'editor-props', label: '属性面板编辑器', description: '完整属性面板' },
		{ id: 'viewer', label: '高级查看器', description: '带导航的查看器' },
	];

	return (
		<div className="container mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">
					BPMN 高级组件演示
				</h1>
				<p className="text-gray-600">
					展示基于最新 bpmn-js 的高级 BPMN 编辑器和查看器功能。
				</p>
			</div>

			{/* 功能选项卡 */}
			<div className="mb-6">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-8">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id as any)}
								className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
									activeTab === tab.id
										? "border-blue-500 text-blue-600"
										: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
								}`}
							>
								{tab.label}
								<span className="block text-xs text-gray-500 mt-1">
									{tab.description}
								</span>
							</button>
						))}
					</nav>
				</div>
			</div>

			{/* 控制面板 */}
			<div className="mb-6 bg-white rounded-lg shadow p-4">
				<div className="flex flex-wrap items-center gap-4">
					<div className="flex items-center space-x-2">
						<label className="text-sm font-medium text-gray-700">XML 文件:</label>
						<input
							type="file"
							accept=".bpmn,.xml"
							onChange={handleLoadFile}
							className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
						/>
					</div>

					{(activeTab === 'editor-props') && (
						<>
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									id="show-properties"
									checked={showProperties}
									onChange={(e) => setShowProperties(e.target.checked)}
									className="rounded"
								/>
								<label htmlFor="show-properties" className="text-sm font-medium text-gray-700">
									显示属性面板
								</label>
							</div>

							{showProperties && (
								<div className="flex items-center space-x-2">
									<label className="text-sm font-medium text-gray-700">面板位置:</label>
									<select
										value={propertiesPosition}
										onChange={(e) => setPropertiesPosition(e.target.value as 'left' | 'right')}
										className="text-sm border border-gray-300 rounded px-2 py-1"
									>
										<option value="right">右侧</option>
										<option value="left">左侧</option>
									</select>
								</div>
							)}
						</>
					)}

					<button
						onClick={handleExport}
						className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
					>
						导出 BPMN
					</button>

					{activeTab !== 'viewer' && (
						<button
							onClick={() => {
								if ((window as any).bpmnEditor?.validateDiagram) {
									(window as any).bpmnEditor.validateDiagram();
								}
							}}
							className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
						>
							验证图表
						</button>
					)}
				</div>
			</div>

			{/* BPMN 组件展示区域 */}
			<div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '700px' }}>
				{activeTab === 'editor' && (
					<BpmnEditorAdvanced
						xml={bpmnXml}
						showPropertiesPanel={true}
						onLoad={handleLoad}
						onError={handleError}
						className="w-full h-full"
					/>
				)}

				{activeTab === 'editor-props' && (
					<BpmnEditorWithProperties
						xml={bpmnXml}
						showPropertiesPanel={showProperties}
						propertiesPanelPosition={propertiesPosition}
						onLoad={handleLoad}
						onError={handleError}
						className="w-full h-full"
					/>
				)}

				{activeTab === 'viewer' && (
					<BpmnViewerAdvanced
						xml={bpmnXml}
						showNavigation={true}
						center={true}
						onLoad={handleLoad}
						onError={handleError}
						className="w-full h-full"
					/>
				)}
			</div>

			{/* 功能说明 */}
			<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="bg-blue-50 rounded-lg p-4">
					<h3 className="text-lg font-semibold text-blue-800 mb-2">
						🔧 高级编辑器
					</h3>
					<ul className="text-sm text-blue-700 space-y-1">
						<li>• 完整的编辑功能支持</li>
						<li>• 内置属性显示面板</li>
						<li>• 图表验证和警告提示</li>
						<li>• 动态附加/分离功能测试</li>
						<li>• 缩放和导航工具栏</li>
					</ul>
				</div>

				<div className="bg-green-50 rounded-lg p-4">
					<h3 className="text-lg font-semibold text-green-800 mb-2">
						⚙️ 属性面板编辑器
					</h3>
					<ul className="text-sm text-green-700 space-y-1">
						<li>• 完整的 bpmn-js 属性面板</li>
						<li>• Camunda 扩展属性支持</li>
						<li>• 可配置面板位置</li>
						<li>• 只读模式支持</li>
						<li>• 状态栏显示选中元素</li>
					</ul>
				</div>

				<div className="bg-purple-50 rounded-lg p-4">
					<h3 className="text-lg font-semibold text-purple-800 mb-2">
						👁️ 高级查看器
					</h3>
					<ul className="text-sm text-purple-700 space-y-1">
						<li>• 只读模式安全查看</li>
						<li>• 完整的导航控制面板</li>
						<li>• 元素搜索和快速定位</li>
						<li>• 缩放和平移功能</li>
						<li>• 元素列表和统计信息</li>
					</ul>
				</div>
			</div>

			{/* 技术说明 */}
			<div className="mt-6 bg-gray-50 rounded-lg p-6">
				<h3 className="text-lg font-semibold text-gray-800 mb-3">
					🚀 技术特性
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
					<div>
						<h4 className="font-medium text-gray-700 mb-2">依赖版本</h4>
						<ul className="space-y-1 font-mono text-xs">
							<li>• bpmn-js: ^15.4.0</li>
							<li>• @bpmn-io/properties-panel: ^3.33.0</li>
							<li>• bpmn-js-properties-panel: ^5.42.1</li>
							<li>• diagram-js: ^18.7.0</li>
						</ul>
					</div>
					<div>
						<h4 className="font-medium text-gray-700 mb-2">核心功能</h4>
						<ul className="space-y-1">
							<li>• 动态 attachTo/detach API</li>
							<li>• 完整的 TypeScript 支持</li>
							<li>• React Hooks 集成</li>
							<li>• 错误处理和验证</li>
							<li>• 响应式设计</li>
						</ul>
					</div>
				</div>
			</div>

			{/* 使用示例 */}
			<div className="mt-6 bg-yellow-50 rounded-lg p-6">
				<h3 className="text-lg font-semibold text-yellow-800 mb-3">
					📝 使用示例
				</h3>
				<div className="bg-white rounded p-4 font-mono text-xs overflow-x-auto">
					<pre>{`import {
  BpmnEditorAdvanced,
  BpmnEditorWithProperties,
  BpmnViewerAdvanced
} from '@/components/bpmn';

// 高级编辑器
<BpmnEditorAdvanced
  xml={xml}
  showPropertiesPanel={true}
  onLoad={() => console.log('loaded')}
/>

// 属性面板编辑器
<BpmnEditorWithProperties
  xml={xml}
  propertiesPanelPosition="right"
  showPropertiesPanel={true}
/>

// 高级查看器
<BpmnViewerAdvanced
  xml={xml}
  showNavigation={true}
  center={true}
/>`}</pre>
				</div>
			</div>
		</div>
	);
}
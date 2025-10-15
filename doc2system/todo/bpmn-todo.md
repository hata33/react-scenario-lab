# BPMN 流程编辑器开发计划

## 项目概述

使用 bpmn-js 及相关依赖实现 BPMN 图的编辑和查看功能，确保能正常运行，采用最小实现方案。

## 核心功能

### 1. BPMN 编辑器 ✅
- [x] 使用 bpmn-js 实现基础编辑器
- [x] 左侧元素面板（拖拽添加元素）
- [x] 选中元素的操作按钮
- [x] 拖拽边缘创建连接
- [x] 双击编辑元素名称
- [x] 右键菜单
- [x] 键盘快捷键（Ctrl+Z/Y, Delete等）
- [x] 缩放和平移

### 2. BPMN 查看器
- [ ] 只读模式查看
- [ ] 流程图展示
- [ ] 缩放和导航控制

## 技术实现

### 核心依赖
```json
{
  "dependencies": {
    "bpmn-js": "^14.0.0"
  }
}
```

### bpmn-js 插件说明

**bpmn-js 本身包含完整的编辑功能**：
- ✅ 左侧元素面板 (palette)
- ✅ 选中元素操作按钮 (contextPad)
- ✅ 拖拽创建连接 (connection)
- ✅ 连线编辑 (bendpoints)
- ✅ 键盘快捷键 (keyboard)
- ✅ 右键菜单 (contextMenu)
- ✅ 缩放平移 (zoom)

**可选插件（根据需要添加）**：
- `bpmn-js-properties-panel`: 右侧属性面板（编辑元素属性）
- `bpmn-js-color-picker`: 颜色选择器
- `diagram-js-minimap`: 小地图导航
- `diagram-js-grid`: 网格背景

### 组件结构
```
src/components/bpmn/
├── editor/
│   └── BpmnEditor.tsx     # BPMN 编辑器组件 ✅
├── viewer/
│   └── BpmnViewer.tsx      # BPMN 查看器组件 (待实现)
└── types/
    └── bpmn.types.ts       # 类型定义 ✅
```

### 最小实现要求
1. ✅ 使用 bpmn-js 的默认配置
2. ✅ 启用所有内置编辑功能
3. ✅ 提供基本的容器和样式
4. ✅ 支持编辑模式（readonly 属性）

## 实现状态

### 已完成 ✅
- BpmnEditor 组件基础实现
- bpmn-js 核心功能集成
- 左侧元素面板
- 元素操作（拖拽、连接、编辑）
- 键盘快捷键支持
- 右键菜单
- 撤销/重做功能
- 缩放控制

### 待实现 📋
- BpmnViewer 只读查看器组件
- 属性面板集成（可选）
- 流程模板功能（可选）
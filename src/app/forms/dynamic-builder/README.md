# 动态表单构建器

这是一个功能完整的拖拽式表单构建器，支持30+种字段类型、实时预览、表单验证和配置导入导出。

## 组件架构

### 目录结构
```
dynamic-builder/
├── types.ts                    # 类型定义
├── constants.ts                # 常量和配置
├── hooks/
│   └── useFormManager.ts      # 主要状态管理Hook
├── components/
│   ├── FormFieldRenderer.tsx  # 表单字段渲染器
│   ├── FormValidator.ts       # 表单验证Hook
│   ├── FieldLibrary.tsx       # 字段库组件
│   ├── FormBuilder.tsx        # 表单构建器组件
│   ├── FieldProperties.tsx    # 字段属性编辑器
│   ├── FormPreview.tsx        # 表单预览组件
│   └── FormHeader.tsx         # 表单头部组件
├── page.tsx                   # 主页面组件
└── README.md                  # 文档
```

### 组件说明

#### 1. 类型定义 (`types.ts`)
- `FieldType`: 支持的字段类型
- `FormField`: 表单字段配置
- `FormSection`: 表单分区
- `FormConfig`: 完整表单配置
- `ValidationRule`: 验证规则

#### 2. 常量配置 (`constants.ts`)
- `FIELD_TYPES`: 所有支持的字段类型配置
- `FORM_TEMPLATES`: 预设表单模板
- `DEFAULT_FORM_CONFIG`: 默认表单配置

#### 3. 状态管理 Hook (`hooks/useFormManager.ts`)
管理表单构建器的所有状态和操作：
- 表单配置管理
- 字段操作（添加、删除、更新）
- 数据验证
- 模式切换（编辑/预览）
- 导入导出功能

#### 4. 核心组件

##### FormFieldRenderer
负责渲染所有类型的表单字段，支持30+种字段类型：
- 基础输入：文本、邮箱、密码、数字等
- 选择器：下拉框、单选、多选、开关等
- 日期时间：日期、时间、日期范围等
- 文件上传：通用文件、图片、视频、音频
- 特殊组件：评分、颜色、地址、联系人、支付、签名等
- 高级组件：表格、重复器
- 布局组件：分割线、标题、段落

##### FieldLibrary
左侧字段库，包含：
- 字段类型分类展示
- 表单模板选择
- 字段搜索和过滤

##### FormBuilder
中间表单构建区域：
- 可视化表单编辑
- 字段拖拽排序
- 实时预览
- 分区管理

##### FieldProperties
右侧属性编辑面板：
- 字段基本属性编辑
- 验证规则配置
- 选项管理
- 样式设置

##### FormPreview
预览模式组件：
- 完整表单渲染
- 实时数据收集
- 表单验证
- 进度显示

##### FormHeader
顶部导航栏：
- 模式切换
- 导入导出功能
- 导航链接

## 功能特性

### 🎨 30+ 字段类型
- 基础输入控件
- 高级选择器
- 文件上传组件
- 特殊业务组件
- 布局装饰组件

### 🔧 强大的编辑功能
- 拖拽式表单构建
- 实时属性编辑
- 字段验证配置
- 响应式布局

### 📊 表单管理
- 多模板支持
- 配置导入导出
- 实时预览
- 数据收集

### ✅ 完善的验证
- 多种验证规则
- 实时/提交验证
- 自定义错误消息
- 条件验证

### 🎯 用户体验
- 直观的操作界面
- 平滑的动画过渡
- 响应式设计
- 键盘快捷键支持

## 使用方法

1. 从左侧字段库选择需要的字段类型
2. 在中间区域构建表单结构
3. 在右侧面板配置字段属性
4. 切换到预览模式测试表单
5. 导出配置保存或分享

## 扩展开发

### 添加新字段类型
1. 在 `types.ts` 中添加新的 `FieldType`
2. 在 `constants.ts` 中配置字段信息
3. 在 `FormFieldRenderer.tsx` 中实现渲染逻辑
4. 在 `FormValidator.ts` 中添加验证规则（如需要）

### 自定义验证规则
扩展 `ValidationRule` 类型并在 `FormValidator.ts` 中实现验证逻辑。

### 添加新模板
在 `constants.ts` 的 `FORM_TEMPLATES` 中添加新的模板配置。

## 技术栈
- React 19 + TypeScript
- Tailwind CSS
- Lucide React Icons
- Next.js App Router
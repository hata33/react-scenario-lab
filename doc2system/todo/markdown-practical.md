# React Scenario Lab - 实用型 Markdown 编辑器方案

## 🎯 重新定位：解决实际问题
基于实际开发需求，设计一个**轻量级、易集成、功能实用**的 Markdown 编辑器，专注于文档编辑的核心体验，避免过度工程化。

### 实际应用场景
- **博客文章编辑** - 支持实时预览、语法高亮、图片上传
- **项目文档编写** - 支持文档目录、代码块高亮、表格编辑
- **技术分享平台** - 支持代码片段、数学公式、图表嵌入
- **个人知识库** - 支持标签分类、全文搜索、导出功能

## 📋 核心功能规划

### P0 - 基础功能 (1-2周)
- [ ] **实时预览编辑器** - 左右分屏，实时渲染 | High | 1周
  - 使用 `@uiw/react-md-editor` 或 `react-markdown` + `textarea`
  - 支持滚动同步和语法高亮
  - 基础 Markdown 语法支持

- [ ] **工具栏功能** - 常用格式化快捷操作 | Medium | 3天
  - 加粗、斜体、标题、链接、图片、代码块
  - 键盘快捷键支持 (Ctrl+B, Ctrl+I 等)
  - 撤销/重做功能

- [ ] **代码块增强** - 语法高亮和复制功能 | Medium | 2天
  - 使用 `prismjs` 或 `highlight.js`
  - 支持多种编程语言
  - 一键复制代码功能

### P1 - 增强功能 (1-2周)
- [ ] **图片处理** - 拖拽上传、粘贴上传、预览 | Medium | 3天
  - 支持拖拽和粘贴上传
  - 图片压缩和格式转换
  - 本地预览和URL管理

- [ ] **扩展语法** - 表格编辑器、数学公式 | Medium | 4天
  - 可视化表格编辑器
  - KaTeX 数学公式支持
  - 任务列表和脚注

- [ ] **文档管理** - 自动保存、版本历史、导出 | Medium | 3天
  - LocalStorage 自动保存
  - 简单的版本历史记录
  - 支持 HTML、PDF 导出

### P2 - 高级功能 (可选)
- [ ] **插件系统** - 自定义语法扩展 | Low | 1周
- [ ] **协作编辑** - 简单的多人编辑支持 | Low | 2周
- [ ] **全文搜索** - 文档内容搜索和高亮 | Low | 1周

## 🛠️ 技术选型 (实用优先)

### 核心编辑器
```typescript
// 推荐方案1: react-md-editor (一体化解决方案)
import MDEditor from '@uiw/react-md-editor';

// 推荐方案2: react-markdown + textarea (灵活定制)
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
```

**选型对比:**
- `@uiw/react-md-editor`: 功能完整，开箱即用，适合快速开发
- `react-markdown + textarea`: 更灵活，可定制性强，适合特殊需求
- `toast-ui/editor`: 功能强大，但体积较大，适合复杂场景

### 语法高亮
```typescript
// 使用 highlight.js
import hljs from 'highlight.js';

// 或者使用 prismjs
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
```

### 数学公式
```typescript
// 使用 KaTeX
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
```

## 📐 组件架构设计

### 核心组件结构
```
MarkdownEditor/
├── components/
│   ├── MarkdownEditor.tsx      // 主编辑器组件
│   ├── MarkdownPreview.tsx     // 预览组件
│   ├── ToolBar.tsx             // 工具栏
│   ├── ImageUpload.tsx          // 图片上传
│   └── TableEditor.tsx          // 表格编辑器
├── hooks/
│   ├── useMarkdown.ts          // Markdown 处理逻辑
│   ├── useAutoSave.ts          // 自动保存
│   └── useShortcuts.ts         // 快捷键
├── utils/
│   ├── parser.ts               // Markdown 解析
│   ├── shortcuts.ts            // 快捷键定义
│   └── export.ts               // 导出功能
└── types/
    └── index.ts                // 类型定义
```

### 核心接口设计
```typescript
interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
  preview?: boolean;
  toolbar?: boolean;
  autoSave?: boolean;
  shortcuts?: boolean;
}

interface ToolBarProps {
  onAction: (action: string, value?: any) => void;
  disabled?: boolean;
  items?: ToolBarItem[];
}

interface ImageUploadProps {
  onUpload: (file: File) => Promise<string>;
  accept?: string;
  maxSize?: number;
}
```

## 🎨 实用功能实现

### 1. 实时预览编辑器
```typescript
const MarkdownEditor = () => {
  const [value, setValue] = useState('# Hello World\n\nThis is a **markdown** editor.');
  const [preview, setPreview] = useState(true);

  return (
    <div className="flex h-96">
      <div className="w-1/2 border-r">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-full p-4 resize-none focus:outline-none"
          placeholder="开始输入 Markdown..."
        />
      </div>
      <div className="w-1/2 p-4 overflow-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {value}
        </ReactMarkdown>
      </div>
    </div>
  );
};
```

### 2. 实用工具栏
```typescript
const ToolBar = ({ onAction }) => {
  const actions = [
    { icon: 'B', action: 'bold', shortcut: 'Ctrl+B' },
    { icon: 'I', action: 'italic', shortcut: 'Ctrl+I' },
    { icon: 'H', action: 'heading', shortcut: 'Ctrl+H' },
    { icon: '🔗', action: 'link', shortcut: 'Ctrl+K' },
    { icon: '📷', action: 'image', shortcut: 'Ctrl+G' },
    { icon: '💻', action: 'code', shortcut: 'Ctrl+`' },
  ];

  return (
    <div className="flex gap-2 p-2 border-b">
      {actions.map(item => (
        <button
          key={item.action}
          onClick={() => onAction(item.action)}
          className="p-2 hover:bg-gray-100 rounded"
          title={`${item.shortcut}`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};
```

### 3. 图片上传功能
```typescript
const ImageUpload = ({ onUpload }) => {
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // 压缩图片
      const compressed = await compressImage(file);
      // 上传到服务器或转换为 base64
      const url = await onUpload(compressed);
      // 插入到编辑器
      insertImageToEditor(url);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileSelect}
      className="hidden"
      id="image-upload"
    />
  );
};
```

## 📱 响应式设计

### 移动端适配
```css
/* 小屏幕垂直布局 */
.markdown-editor {
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
}

.toolbar {
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1px;
  }
}

.toolbar button {
  @media (max-width: 768px) {
    flex: 1;
    min-width: 40px;
  }
}
```

### 触摸优化
```typescript
// 支持触摸设备的工具栏
const TouchFriendlyToolBar = () => {
  return (
    <div className="toolbar touch-friendly">
      {/* 更大的点击区域 */}
      <button className="touch-target">
        <span className="icon">B</span>
      </button>
    </div>
  );
};
```

## 🚀 性能优化

### 1. 渲染优化
```typescript
// 使用 React.memo 优化预览组件
const MarkdownPreview = React.memo(({ content }) => {
  return (
    <div className="markdown-preview">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
});

// 使用防抖优化输入
const debouncedOnChange = useMemo(
  () => debounce(onChange, 300),
  [onChange]
);
```

### 2. 大文件处理
```typescript
// 虚拟滚动支持
const VirtualScrollPreview = ({ content }) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 100 });

  // 只渲染可见部分
  const visibleContent = useMemo(() => {
    const lines = content.split('\n');
    return lines.slice(visibleRange.start, visibleRange.end).join('\n');
  }, [content, visibleRange]);

  return <div>{visibleContent}</div>;
};
```

## 🔧 实际开发建议

### 1. 渐进式开发
```typescript
// 第一阶段：基础编辑器
const BasicMarkdownEditor = () => {
  // 只实现基础功能
};

// 第二阶段：增强功能
const EnhancedMarkdownEditor = () => {
  // 添加工具栏、图片上传等
};

// 第三阶段：高级功能
const AdvancedMarkdownEditor = () => {
  // 添加协作、插件系统等
};
```

### 2. 可配置设计
```typescript
interface MarkdownConfig {
  toolbar?: boolean;
  preview?: boolean;
  autoSave?: boolean;
  shortcuts?: boolean;
  theme?: 'light' | 'dark';
  height?: number;
}

const MarkdownEditor = ({ config }: { config?: MarkdownConfig }) => {
  const {
    toolbar = true,
    preview = true,
    autoSave = false,
    shortcuts = true,
    theme = 'light',
    height = 400
  } = config || {};

  // 根据配置渲染组件
};
```

### 3. 主题支持
```css
/* 支持暗色主题 */
.markdown-editor.dark {
  background-color: #1a1a1a;
  color: #e0e0e0;
}

.markdown-editor.dark textarea {
  background-color: #2d2d2d;
  color: #e0e0e0;
}

.markdown-editor.dark .markdown-preview {
  background-color: #2d2d2d;
}
```

## 📋 实际开发路线图

### Week 1: 基础功能
- [ ] 搭建项目结构和基础组件
- [ ] 实现左右分屏编辑器
- [ ] 集成 react-markdown 预览
- [ ] 添加基础工具栏功能

### Week 2: 增强功能
- [ ] 实现图片上传和管理
- [ ] 添加代码块语法高亮
- [ ] 支持扩展语法 (表格、数学公式)
- [ ] 实现自动保存功能

### Week 3: 优化完善
- [ ] 响应式设计和移动端适配
- [ ] 性能优化和虚拟滚动
- [ ] 错误处理和用户体验优化
- [ ] 文档和测试

## 💡 关键技术决策

### 1. 避免过度工程化
- **不实现复杂的协作算法** - 大多数应用不需要实时协作
- **不使用 Monoca Editor** - 这是代码编辑器，不适合文档编辑
- **不重新发明轮子** - 优先使用成熟的开源库

### 2. 专注核心体验
- **编辑体验** - 流畅的输入和预览
- **性能表现** - 快速响应和大文件支持
- **易用性** - 直观的工具栏和快捷键

### 3. 可扩展设计
- **插件化架构** - 支持功能扩展
- **主题系统** - 支持多种外观
- **配置化** - 支持不同的使用场景

## 🎯 实际价值

### 技术价值
- 掌握 Markdown 编辑器的核心原理
- 理解实时预览和语法高亮的实现
- 学会组件化设计和性能优化

### 业务价值
- 提供开箱即用的 Markdown 编辑器
- 支持多种业务场景 (博客、文档、知识库)
- 提升内容创作和编辑效率

### 学习价值
- React 组件设计和状态管理
- 文本处理和解析技术
- 前端性能优化和用户体验

这个方案更贴近实际开发需求，避免了过度复杂化，专注于核心功能实现，适合快速集成和部署。
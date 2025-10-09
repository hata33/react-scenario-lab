# 导出功能模块

一个功能丰富的前端导出模块，支持多种文件格式的数据导出功能。

## 功能特性

### 📄 支持的导出格式

#### 文本格式
- **TXT**: 纯文本格式，支持多种编码
- **CSV**: 逗号分隔值，支持自定义分隔符和BOM头
- **JSON**: 结构化数据，支持格式化和压缩
- **XML**: 标记语言，支持自定义标签和属性

#### 表格格式
- **Excel (XLSX/XLS)**: 多工作表、单元格样式、公式支持
- **高级CSV**: 大数据分片处理、特殊字符转义

#### 文档格式
- **PDF**: 可自定义页面布局、水印、页眉页脚
- **Word (DOCX)**: 富文本支持、样式设置
- **Markdown**: 轻量级标记语言

#### 图片格式
- **PNG**: 无损压缩，支持透明背景
- **JPG**: 有损压缩，可调质量
- **SVG**: 矢量图形，可编辑
- **Canvas截图**: HTML元素转图片

#### 数据格式
- **ZIP**: 多文件打包，支持压缩
- **多工作表Excel**: 复杂数据结构导出

### 🎯 核心功能

- **智能导出管理器**: 统一的导出接口
- **实时进度反馈**: 导出进度条和状态提示
- **导出历史记录**: 本地存储，支持管理
- **数据预览功能**: 导出前预览数据格式
- **批量导出**: 支持多格式同时导出
- **数据过滤**: 支持多种过滤条件
- **错误处理**: 完善的错误处理机制

## 安装依赖

```bash
# 核心依赖
pnpm add file-saver xlsx jspdf jspdf-autotable docx html2canvas jszip

# UI组件（如果使用）
pnpm add antd @ant-design/icons
```

## 快速开始

### 基础使用

```tsx
import { ExportButton } from '@/components/export';

function MyComponent() {
  const data = [
    { name: '张三', age: 25, email: 'zhangsan@example.com' },
    { name: '李四', age: 30, email: 'lisi@example.com' }
  ];

  return (
    <ExportButton
      data={data}
      filename="用户数据"
      availableFormats={['xlsx', 'csv', 'json', 'pdf']}
      onExportComplete={() => console.log('导出完成')}
    />
  );
}
```

### 使用Hook

```tsx
import { useExport } from '@/hooks/export';

function MyComponent() {
  const { export, exporting, progress } = useExport({
    defaultFilename: 'export_data',
    defaultFormat: 'xlsx'
  });

  const handleExport = async () => {
    const data = { /* 你的数据 */ };
    await export({
      filename: 'my_data',
      format: 'xlsx',
      data,
      options: {
        includeHeaders: true,
        encoding: 'utf-8'
      }
    });
  };

  return (
    <div>
      <Button onClick={handleExport} loading={exporting}>
        导出数据
      </Button>
      {progress && (
        <Progress percent={progress.progress} status={progress.status} />
      )}
    </div>
  );
}
```

### 快速导出

```tsx
import { useQuickExport } from '@/hooks/export';

function MyComponent() {
  const data = { /* 你的数据 */ };
  const { export } = useQuickExport(data);

  return (
    <Button onClick={() => export('quick_export', 'xlsx')}>
      快速导出
    </Button>
  );
}
```

### 批量导出

```tsx
import { useBatchExport } from '@/hooks/export';

function MyComponent() {
  const { exportBatch } = useBatchExport();

  const datasets = [
    { data: users, filename: 'users', format: 'xlsx' },
    { data: products, filename: 'products', format: 'csv' },
    { data: logs, filename: 'logs', format: 'json' }
  ];

  return (
    <Button onClick={() => exportBatch(datasets)}>
      批量导出
    </Button>
  );
}
```

## 高级配置

### 导出选项

```typescript
interface ExportOptions {
  // 编码设置
  encoding?: 'utf-8' | 'gbk' | 'ascii';

  // CSV选项
  delimiter?: string;
  includeHeaders?: boolean;

  // Excel选项
  sheetName?: string;

  // PDF选项
  pageSize?: 'A4' | 'A3' | 'Letter';
  orientation?: 'portrait' | 'landscape';
  watermark?: string;

  // 图片选项
  quality?: number;
  scale?: number;
  backgroundColor?: string;
  transparent?: boolean;

  // 安全选项
  password?: string;
  compression?: number;
}
```

### 数据过滤

```typescript
interface ExportFilter {
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
  value: any;
}

const filters = [
  { field: 'age', operator: 'greaterThan', value: 18 },
  { field: 'name', operator: 'contains', value: '张' }
];

const filteredData = ExportUtils.filterData(data, filters);
```

### 自定义导出

```typescript
// 使用导出管理器
import { ExportManager } from '@/services/export/exportManager';

const exportManager = ExportManager.getInstance();

await exportManager.export({
  filename: 'custom_export',
  format: 'xlsx',
  data: yourData,
  options: {
    sheetName: 'Data',
    includeHeaders: true,
    watermark: 'Confidential'
  }
});
```

## 组件API

### ExportButton Props

```typescript
interface ExportButtonProps {
  data: any;                              // 要导出的数据
  filename?: string;                       // 文件名
  availableFormats?: ExportFormat[];       // 可用格式
  className?: string;                      // 自定义类名
  children?: React.ReactNode;              // 自定义按钮内容
  onExportStart?: () => void;             // 导出开始回调
  onExportComplete?: () => void;          // 导出完成回调
  onExportError?: (error: Error) => void; // 导出错误回调
}
```

## 工具函数

### ExportUtils

```typescript
// 数据验证
const validation = ExportUtils.validateData(data);

// 文件名安全化
const safeName = ExportUtils.sanitizeFilename('file/name.txt');

// 估算文件大小
const size = ExportUtils.estimateFileSize(data, 'xlsx');

// 格式化文件大小
const formattedSize = ExportUtils.formatFileSize(1024); // "1 KB"

// 数据过滤
const filtered = ExportUtils.filterData(data, filters);

// 浏览器兼容性检查
const support = ExportUtils.checkBrowserSupport();
```

## 测试

```bash
# 运行测试
pnpm test

# 运行测试覆盖率
pnpm test:coverage
```

## 性能优化

### 大数据量处理

```typescript
// 使用分片处理大数据
const largeData = Array(100000).fill(0).map((_, i) => ({ id: i }));

// Excel导出会自动分片处理
await exportManager.export({
  filename: 'large_data',
  format: 'xlsx',
  data: largeData
});
```

### Web Workers

```typescript
// 对于特别大的数据，可以使用Web Workers
const worker = new Worker('./exportWorker.js');

worker.postMessage({
  data: largeData,
  format: 'xlsx'
});

worker.onmessage = (event) => {
  const blob = event.data;
  saveAs(blob, 'export.xlsx');
};
```

## 浏览器兼容性

- Chrome/Edge 60+
- Firefox 55+
- Safari 12+
- IE 11 (部分功能)

### 注意事项

- 部分功能（如PDF、图片导出）仅在客户端可用
- 大文件导出可能需要较长时间
- 建议在导出大文件时显示进度提示
- 导出历史记录存储在localStorage中

## 常见问题

### Q: 如何处理特殊字符？
A: 导出器会自动处理特殊字符的转义，确保数据正确导出。

### Q: 如何导出复杂的数据结构？
A: 支持嵌套对象、数组等复杂数据结构，会自动转换为合适的格式。

### Q: 如何自定义导出格式？
A: 可以通过继承相应的导出器类来实现自定义格式。

### Q: 导出的文件中文乱码怎么办？
A: 确保使用UTF-8编码，导出器会自动添加BOM头。

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础导出格式
- 实现导出管理器
- 添加进度反馈功能

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License
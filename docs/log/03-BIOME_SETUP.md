# Biome 配置与使用指南

本项目已从 ESLint 迁移到 **Biome**，这是一个更快速、更现代的 JavaScript/TypeScript 代码质量工具。

## 🚀 Biome 简介

**Biome** 是一个用 Rust 编写的极速 JavaScript/TypeScript 工具链，集成了：
- **Linter** - 代码质量检查
- **Formatter** - 代码格式化
- **Import Sorter** - 导入语句排序
- **TypeScript 支持** - 完整的 TS 语法支持

## ✨ 主要优势

### 性能优势
- **极速执行**：比 ESLint + Prettier 快 10-100 倍
- **内存占用低**：Rust 原生性能，内存使用更少
- **并行处理**：支持多核并行检查

### 功能优势
- **零配置**：开箱即用，无需复杂配置
- **统一工具**：一个工具替代多个工具（ESLint + Prettier + Import Sorter）
- **TypeScript 优先**：原生支持 TS，无需额外配置
- **React 友好**：内置 React 最佳实践规则

### 开发体验
- **实时反馈**：编辑器集成提供即时错误提示
- **自动修复**：大部分问题可以自动修复
- **一致性**：统一的代码风格和规则

## 📦 安装与依赖

```bash
# 安装项目依赖
pnpm install

# 全局安装 Biome（可选）
pnpm add -g @biomejs/biome
```

## 🛠️ 可用的脚本命令

### 代码检查
```bash
pnpm lint          # 运行 Biome 代码检查
pnpm check         # 运行完整的 Biome 检查（包括格式化和 linting）
```

### 代码格式化
```bash
pnpm format        # 格式化代码并自动修复

pnpm fix           # 检查并自动修复代码问题

pnpm fix           # 检查并自动修复代码问题
```

## ⚙️ Biome 配置详解

配置文件：`biome.json`

### 核心配置
```json
{
  "$schema": "https://biomejs.dev/schemas/2.2.0/schema.json",
  "vcs": {
    "enabled": false,           // 禁用版本控制集成
    "clientKind": "git",
    "useIgnoreFile": false
  },
  "files": {
    "ignoreUnknown": false      // 不忽略未知文件类型
  }
}
```

### 格式化器配置
```json
{
  "formatter": {
    "enabled": true,            // 启用格式化器
    "indentStyle": "tab"        // 使用 Tab 缩进
  }
}
```

### 代码检查配置
```json
{
  "linter": {
    "enabled": true,            // 启用 linter
    "rules": {
      "recommended": true,      // 启用推荐规则
      "nursery": {
        "useSortedClasses": {   // Tailwind CSS 类名排序
          "fix": "safe",
          "level": "warn"
        }
      },
      "suspicious": {
        "noExplicitAny": "off"  // 允许使用 any 类型
      },
      "a11y": {                 // 无障碍性规则
        "useKeyWithClickEvents": "off",
        "noStaticElementInteractions": "off",
        "noLabelWithoutControl": "off"
      }
    }
  }
}
```

### JavaScript/TypeScript 配置
```json
{
  "javascript": {
    "formatter": {
      "quoteStyle": "double"    // 使用双引号
    }
  }
}
```

### 辅助功能配置
```json
{
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": "on"  // 自动整理导入语句
      }
    }
  }
}
```

## 🔧 编辑器集成

### VS Code
1. 安装 `biome` 扩展
2. 在设置中启用 Biome 作为默认格式化器
3. 启用保存时自动格式化

```json
// settings.json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit"
  }
}
```

### 其他编辑器
- **WebStorm/IntelliJ**: 内置支持
- **Neovim**: 通过 LSP 支持
- **Emacs**: 通过 LSP 支持

## 📚 常用命令

### 命令行使用
```bash
# 检查代码
biome check src/

# 格式化代码
biome format src/

# 自动修复
biome check --write src/

# 检查特定文件
biome check src/components/Button.tsx

# 生成配置文件
biome init
```

### 忽略文件
创建 `.biomeignore` 文件来忽略特定文件：
```
node_modules/
dist/
.next/
*.min.js
```

## 🔄 从 ESLint 迁移

### 已完成的迁移
- ✅ 删除了 `.eslintrc.json` 文件
- ✅ 删除了 `eslint` 和 `eslint-config-next` 依赖
- ✅ 更新了 `package.json` 中的脚本命令
- ✅ 更新了 `next.config.js` 移除了 ESLint 配置

### 迁移优势
- **性能提升**：检查速度提升 10-100 倍
- **配置简化**：一个配置文件替代多个
- **功能增强**：内置导入排序和格式化
- **维护成本降低**：减少依赖和配置复杂度

## 🌐 官方资源

- **官方网站**: [https://biomejs.dev/](https://biomejs.dev/)
- **GitHub**: [https://github.com/biomejs/biome](https://github.com/biomejs/biome)
- **文档**: [https://biomejs.dev/guides/](https://biomejs.dev/guides/)
- **Playground**: [https://biomejs.dev/playground/](https://biomejs.dev/playground/)
- **规则参考**: [https://biomejs.dev/linter/rules/](https://biomejs.dev/linter/rules/)

## 🎯 最佳实践

### 团队协作
1. **统一配置**：所有开发者使用相同的 `biome.json`
2. **预提交钩子**：在 git hooks 中运行 Biome 检查
3. **CI/CD 集成**：在构建流程中运行代码检查

### 代码质量
1. **渐进式采用**：先启用基础规则，逐步增加严格规则
2. **自定义规则**：根据项目需求调整规则配置
3. **定期更新**：保持 Biome 版本更新以获得最新功能

## 🚨 常见问题

### Q: Biome 和 ESLint 可以同时使用吗？
A: 不建议同时使用，可能产生冲突。建议完全迁移到 Biome。

### Q: 如何禁用特定规则？
A: 在 `biome.json` 的 `rules` 部分设置规则为 `"off"`。

### Q: 支持哪些文件类型？
A: 支持 `.js`, `.jsx`, `.ts`, `.tsx`, `.json` 等主流文件类型。

---
=======
>>>>>>> Stashed changes
```

## ⚙️ Biome 配置详解

配置文件：`biome.json`

### 核心配置
```json
{
  "$schema": "https://biomejs.dev/schemas/2.2.0/schema.json",
  "vcs": {
    "enabled": false,           // 禁用版本控制集成
    "clientKind": "git",
    "useIgnoreFile": false
  },
  "files": {
    "ignoreUnknown": false      // 不忽略未知文件类型
  }
}
```

### 格式化器配置
```json
{
  "formatter": {
    "enabled": true,            // 启用格式化器
    "indentStyle": "tab"        // 使用 Tab 缩进
  }
}
```

### 代码检查配置
```json
{
  "linter": {
    "enabled": true,            // 启用 linter
    "rules": {
      "recommended": true,      // 启用推荐规则
      "nursery": {
        "useSortedClasses": {   // Tailwind CSS 类名排序
          "fix": "safe",
          "level": "warn"
        }
      },
      "suspicious": {
        "noExplicitAny": "off"  // 允许使用 any 类型
      },
      "a11y": {                 // 无障碍性规则
        "useKeyWithClickEvents": "off",
        "noStaticElementInteractions": "off",
        "noLabelWithoutControl": "off"
      }
    }
  }
}
```

### JavaScript/TypeScript 配置
```json
{
  "javascript": {
    "formatter": {
      "quoteStyle": "double"    // 使用双引号
    }
  }
}
```

### 辅助功能配置
```json
{
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": "on"  // 自动整理导入语句
      }
    }
  }
}
```

## 🔧 编辑器集成

### VS Code
1. 安装 `biome` 扩展
2. 在设置中启用 Biome 作为默认格式化器
3. 启用保存时自动格式化

```json
// settings.json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit"
  }
}
```

### 其他编辑器
- **WebStorm/IntelliJ**: 内置支持
- **Neovim**: 通过 LSP 支持
- **Emacs**: 通过 LSP 支持

## 📚 常用命令

### 命令行使用
```bash
# 检查代码
biome check src/

# 格式化代码
biome format src/

# 自动修复
biome check --write src/

# 检查特定文件
biome check src/components/Button.tsx

# 生成配置文件
biome init
```

### 忽略文件
创建 `.biomeignore` 文件来忽略特定文件：
```
node_modules/
dist/
.next/
*.min.js
```

## 🔄 从 ESLint 迁移

### 已完成的迁移
- ✅ 删除了 `.eslintrc.json` 文件
- ✅ 删除了 `eslint` 和 `eslint-config-next` 依赖
- ✅ 更新了 `package.json` 中的脚本命令
- ✅ 更新了 `next.config.js` 移除了 ESLint 配置

### 迁移优势
- **性能提升**：检查速度提升 10-100 倍
- **配置简化**：一个配置文件替代多个
- **功能增强**：内置导入排序和格式化
- **维护成本降低**：减少依赖和配置复杂度

## 🌐 官方资源

- **官方网站**: [https://biomejs.dev/](https://biomejs.dev/)
- **GitHub**: [https://github.com/biomejs/biome](https://github.com/biomejs/biome)
- **文档**: [https://biomejs.dev/guides/](https://biomejs.dev/guides/)
- **Playground**: [https://biomejs.dev/playground/](https://biomejs.dev/playground/)
- **规则参考**: [https://biomejs.dev/linter/rules/](https://biomejs.dev/linter/rules/)

## 🎯 最佳实践

### 团队协作
1. **统一配置**：所有开发者使用相同的 `biome.json`
2. **预提交钩子**：在 git hooks 中运行 Biome 检查
3. **CI/CD 集成**：在构建流程中运行代码检查

### 代码质量
1. **渐进式采用**：先启用基础规则，逐步增加严格规则
2. **自定义规则**：根据项目需求调整规则配置
3. **定期更新**：保持 Biome 版本更新以获得最新功能

## 🚨 常见问题

### Q: Biome 和 ESLint 可以同时使用吗？
A: 不建议同时使用，可能产生冲突。建议完全迁移到 Biome。

### Q: 如何禁用特定规则？
A: 在 `biome.json` 的 `rules` 部分设置规则为 `"off"`。

### Q: 支持哪些文件类型？
A: 支持 `.js`, `.jsx`, `.ts`, `.tsx`, `.json` 等主流文件类型。

## Biome 配置

配置文件：`biome.json`

主要特性：
- **自动导入排序**：自动整理和排序 import 语句
- **代码格式化**：统一的代码风格，使用 2 空格缩进
- **代码检查**：启用推荐的 linting 规则
- **TypeScript 支持**：完全支持 TypeScript 和 React

## 编辑器集成

### VS Code
安装 `biome` 扩展以获得实时代码检查和格式化功能。

### 其他编辑器
Biome 支持大多数主流编辑器，请参考 [Biome 官方文档](https://biomejs.dev/)。

## 从 ESLint 迁移

- 删除了 `.eslintrc.json` 文件
- 删除了 `eslint` 和 `eslint-config-next` 依赖
- 更新了 `package.json` 中的脚本命令
- 更新了 `next.config.js` 移除了 ESLint 配置

## Tailwind CSS 4.1

项目已升级到 Tailwind CSS 4.1 版本，配置文件 `tailwind.config.js` 已相应更新。

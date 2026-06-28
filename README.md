# HAOAI导航 - 全球AI工具大全

一个基于 Next.js 14 构建的现代 AI 工具导航网站，收录全球最新最全 AI 工具，国内可用工具重点标注。

## 功能特性

- **42+ AI 工具收录**：覆盖对话、图像、视频、音频、代码、搜索等 10 大分类
- **国内直连标注**：清晰标识哪些工具无需 VPN 即可在中国大陆使用
- **实时筛选搜索**：按分类、定价、可访问性快速过滤
- **工具详情页**：每款工具独立详情页，含相关工具推荐
- **工具提交**：支持通过 GitHub Issues 提交新工具
- **SEO 友好**：完整 sitemap、robots.txt、Open Graph 元数据
- **移动端优先**：响应式布局，手机/平板/桌面完美适配

## 技术栈

- **框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **语言**: TypeScript（严格模式）
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **渲染**: Server Components 优先，Client Components 仅用于交互
- **数据**: 静态数据文件（`lib/data/tools.ts`），可接 PostgreSQL/Supabase

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/yourusername/haoai123.git
cd haoai123

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可查看。

## 项目结构

```
haoai123/
├── app/
│   ├── category/[slug]/    # 分类页
│   ├── tool/[slug]/        # 工具详情页
│   ├── submit/             # 提交工具页
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx            # 首页
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── CategoryFilter.tsx  # 分类筛选（Client）
│   ├── HomeClient.tsx      # 首页交互逻辑（Client）
│   ├── SearchBar.tsx       # 搜索栏（Client）
│   └── ToolCard.tsx        # 工具卡片（Server）
├── lib/
│   └── data/
│       └── tools.ts        # 工具数据 + 辅助函数
└── schema.sql              # PostgreSQL Schema（可接数据库时用）
```

## 如何贡献

### 提交新工具

1. 访问网站的「提交工具」页面，填写表单后会自动创建 GitHub Issue
2. 或者直接 [创建 Issue](https://github.com/yourusername/haoai123/issues/new)

### 参与开发

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feat/your-feature`
3. 提交更改：`git commit -m 'feat: add your feature'`
4. 推送分支：`git push origin feat/your-feature`
5. 创建 Pull Request

### 添加工具数据

编辑 `lib/data/tools.ts`，在 `tools` 数组中按照现有格式添加新工具条目即可。

## 配色规范

| 用途 | 颜色值 |
|------|--------|
| 背景 | `#0a0a0a` |
| 卡片面 | `rgba(255,255,255,0.04)` |
| 边框 | `rgba(255,255,255,0.08)` |
| 强调色 | `#f5c518` |
| 强调色悬停 | `#d4a900` |
| 文字主色 | `#ffffff` |
| 文字次色 | `#9ca3af` |

## 部署

推荐部署到 [Vercel](https://vercel.com)：

```bash
npm run build
```

或一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/haoai123)

## License

[MIT](LICENSE) © 2024 haoai123

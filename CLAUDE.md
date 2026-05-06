# Realtime News Board — CLAUDE.md

## 项目概述
实时资讯看板前端 MVP，使用 mock 数据演示实时新闻滚动、高亮和分类筛选。无后端、无数据库、无真实 API。

## 技术栈
- React 18 + TypeScript
- Vite + @tailwindcss/vite
- Tailwind CSS v4
- clsx + tailwind-merge（cn 工具函数）

## 目录结构
```
src/
  components/   # UI 组件
  data/         # mock 数据
  hooks/        # 自定义 hooks
  lib/          # 工具函数（cn 等）
  types/        # TypeScript 类型定义
  App.tsx
  main.tsx
  index.css
```

## 核心约定
- 组件使用函数式 + hooks，禁用 class component
- 类型定义统一放 `src/types/`，不使用 `any`
- mock 数据放 `src/data/mockNews.ts`，结构模拟真实 API 返回格式
- 自动刷新逻辑封装在 `useAutoRefresh` hook，间隔 30 秒
- className 合并使用 `src/lib/cn.ts` 中的 `cn()` 函数
- 不使用路由，单页应用
- 不引入额外状态管理库

## 禁止事项
- 不接真实新闻 API
- 不做登录 / 鉴权
- 不做服务端渲染
- 不引入 Redux / Zustand 等状态管理库

## 运行命令
```bash
npm install      # 安装依赖
npm run dev      # 开发服务器（http://localhost:5173）
npm run build    # 构建生产产物
npm run preview  # 预览构建产物
```

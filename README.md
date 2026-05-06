# Realtime News Board

实时资讯看板——展示滚动时事资讯的前端 MVP 演示项目。

## 在线预览

**https://realtime-news-board.vercel.app**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://realtime-news-board.vercel.app)

## 功能
- 实时资讯 Dashboard（每 30 秒自动刷新 mock 数据）
- 横向滚动新闻条（Breaking News ticker）
- 重要新闻高亮展示
- 新闻列表（时间倒序）
- 分类筛选（政治、科技、财经、体育等）

## 技术栈
React 18 · TypeScript · Vite · Tailwind CSS v4

## 本地运行

```bash
npm install
npm run dev
# 浏览器访问 http://localhost:5173
```

## 数据说明
当前版本使用 mock 数据，无需任何 API Key 或后端服务。

## 项目结构
```
src/
  components/   # UI 组件
  data/         # mock 数据
  hooks/        # 自定义 hooks
  lib/          # 工具函数
  types/        # TypeScript 类型定义
```

自动部署测试

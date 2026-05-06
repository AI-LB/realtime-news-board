import { useEffect, useState } from 'react'
import { useNews } from '../hooks/useNews'
import { NewsTicker } from './NewsTicker'
import { CategoryFilter } from './CategoryFilter'
import { NewsCard } from './NewsCard'

export function NewsDashboard() {
  const {
    items,
    breakingItems,
    activeCategory,
    setActiveCategory,
    secondsUntilRefresh,
    totalSeconds,
    categoryCounts,
    breakingCount,
    highCount,
    totalCount,
  } = useNews()

  const [clock, setClock] = useState(() => formatClock())

  useEffect(() => {
    const id = setInterval(() => setClock(formatClock()), 1000)
    return () => clearInterval(id)
  }, [])

  const progressPct = (secondsUntilRefresh / totalSeconds) * 100

  return (
    <div className="min-h-screen bg-[#07090f] text-gray-100 flex flex-col">

      {/* ── Top nav bar ── */}
      <nav className="border-b border-gray-800/80 px-5 h-11 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-blue-400 font-bold text-xs tracking-[0.2em] uppercase">
            Realtime
          </span>
          <span className="text-gray-700 text-xs">|</span>
          <span className="text-gray-300 font-semibold text-xs tracking-widest uppercase">
            News Board
          </span>
        </div>
        <div className="flex items-center gap-5 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
          <span className="text-gray-500">{clock}</span>
        </div>
      </nav>

      {/* ── Breaking ticker ── */}
      <NewsTicker items={breakingItems} />

      {/* ── Refresh progress bar ── */}
      <div className="h-px bg-gray-800">
        <div
          className="h-full bg-blue-500/60 transition-all duration-1000 ease-linear"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-5 flex flex-col gap-4">

        {/* Stats summary */}
        <div className="flex items-center gap-5 text-xs font-mono border-b border-gray-800/60 pb-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-red-400">突发 {breakingCount}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-amber-400">重要 {highCount}</span>
          </span>
          <span className="text-gray-600">总计 {totalCount} 条</span>
          <span className="ml-auto text-gray-600">
            {secondsUntilRefresh}s 后刷新
          </span>
        </div>

        {/* Category filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          onChange={setActiveCategory}
          totalCount={totalCount}
          categoryCounts={categoryCounts}
        />

        {/* Filtered count label */}
        {activeCategory && (
          <p className="text-xs text-gray-600 font-mono -mt-1">
            「{activeCategory}」{items.length} 条结果
          </p>
        )}

        {/* News grid — breaking/high full-width, normal 2-col on md+ */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={item.importance !== 'normal' ? 'md:col-span-2' : ''}
              >
                <NewsCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-700">
            <p className="text-sm mb-3">暂无「{activeCategory}」分类的资讯</p>
            <button
              className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
              onClick={() => setActiveCategory(null)}
            >
              查看全部资讯
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function formatClock(): string {
  return new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

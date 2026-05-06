import type { NewsCategory, NewsItem } from '../types/news'
import { cn } from '../lib/cn'

interface Props {
  item: NewsItem
}

const cardStyle: Record<NewsItem['importance'], string> = {
  breaking:
    'border-l-2 border-red-500 bg-red-950/25 shadow-[0_0_24px_rgba(239,68,68,0.12)] hover:bg-red-950/35',
  high: 'border-l-2 border-amber-500 bg-amber-950/15 hover:bg-amber-950/25',
  normal: 'border-l-2 border-gray-700 bg-gray-900/60 hover:bg-gray-800/60 hover:border-gray-500',
}

const titleStyle: Record<NewsItem['importance'], string> = {
  breaking: 'text-white text-base font-semibold',
  high:     'text-white text-sm font-semibold',
  normal:   'text-gray-100 text-sm font-medium',
}

const badgeStyle: Record<NewsItem['importance'], string | null> = {
  breaking: 'bg-red-600 text-white text-xs px-1.5 py-0.5 font-bold tracking-wide',
  high:     'bg-amber-500 text-black text-xs px-1.5 py-0.5 font-bold tracking-wide',
  normal:   null,
}

const categoryColor: Record<NewsCategory, string> = {
  政治: 'text-blue-400',
  科技: 'text-cyan-400',
  财经: 'text-emerald-400',
  体育: 'text-purple-400',
  国际: 'text-orange-400',
  社会: 'text-pink-400',
}

export function NewsCard({ item }: Props) {
  const badge = badgeStyle[item.importance]

  return (
    <article className={cn('p-4 rounded-r transition-colors', cardStyle[item.importance])}>
      {/* Title row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className={cn('leading-snug flex-1', titleStyle[item.importance])}>
          {item.title}
        </h3>
        {badge && (
          <span className={cn('shrink-0 rounded-sm mt-0.5', badge)}>
            {item.importance === 'breaking' ? '突发' : '重要'}
          </span>
        )}
      </div>

      {/* Summary */}
      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
        {item.summary}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className={cn('font-medium', categoryColor[item.category])}>{item.category}</span>
        <span className="text-gray-700">·</span>
        <span className="text-gray-500">{item.source}</span>
        <span className="ml-auto text-gray-600">{formatTimeAgo(item.publishedAt)}</span>
      </div>
    </article>
  )
}

function formatTimeAgo(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

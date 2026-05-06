import { NEWS_CATEGORIES } from '../data/mockNews'
import type { NewsCategory } from '../types/news'
import { cn } from '../lib/cn'

interface Props {
  activeCategory: NewsCategory | null
  onChange: (category: NewsCategory | null) => void
  totalCount: number
  categoryCounts: Record<NewsCategory, number>
}

const btnBase =
  'flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer border'
const btnActive = 'bg-blue-500 border-blue-500 text-white'
const btnInactive = 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'

export function CategoryFilter({ activeCategory, onChange, totalCount, categoryCounts }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={cn(btnBase, activeCategory === null ? btnActive : btnInactive)}
        onClick={() => onChange(null)}
      >
        全部
        <span className={cn('text-xs opacity-70', activeCategory === null ? '' : 'text-gray-500')}>
          {totalCount}
        </span>
      </button>

      {NEWS_CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={cn(btnBase, activeCategory === cat ? btnActive : btnInactive)}
          onClick={() => onChange(cat)}
        >
          {cat}
          <span className={cn('text-xs opacity-70', activeCategory === cat ? '' : 'text-gray-600')}>
            {categoryCounts[cat]}
          </span>
        </button>
      ))}
    </div>
  )
}

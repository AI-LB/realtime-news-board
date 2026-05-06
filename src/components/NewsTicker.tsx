import type { NewsItem } from '../types/news'

interface Props {
  items: NewsItem[]
}

export function NewsTicker({ items }: Props) {
  if (items.length === 0) return null

  const displayed = [...items, ...items]

  return (
    <div className="relative flex items-center h-9 bg-red-700 text-white overflow-hidden ticker-container">
      {/* Label */}
      <span className="shrink-0 bg-red-900 px-4 h-full flex items-center gap-2 text-xs font-bold tracking-widest z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        BREAKING
      </span>

      {/* Scrolling area */}
      <div className="overflow-hidden flex-1 h-full flex items-center">
        <div className="ticker-scroll flex whitespace-nowrap">
          {displayed.map((item, i) => (
            <span key={`${item.id}-${i}`} className="text-xs px-8 tracking-wide">
              {item.title}
              <span className="ml-8 opacity-30">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-red-700 to-transparent pointer-events-none z-10" />
    </div>
  )
}

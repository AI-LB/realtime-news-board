import { useState, useMemo, useCallback } from 'react'
import { getMockNewsState, NEWS_CATEGORIES } from '../data/mockNews'
import type { NewsCategory, NewsItem, NewsState } from '../types/news'
import { useAutoRefresh } from './useAutoRefresh'

export function useNews() {
  const [newsState, setNewsState] = useState<NewsState>(getMockNewsState)
  const [activeCategory, setActiveCategory] = useState<NewsCategory | null>(null)

  const refresh = useCallback(() => {
    setNewsState(getMockNewsState())
  }, [])

  const { lastRefreshed, secondsUntilRefresh, totalSeconds } = useAutoRefresh(refresh)

  const filteredItems = useMemo<NewsItem[]>(() => {
    const items = activeCategory
      ? newsState.items.filter((item) => item.category === activeCategory)
      : newsState.items
    return [...items].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }, [newsState.items, activeCategory])

  const breakingItems = useMemo(
    () => newsState.items.filter((item) => item.importance === 'breaking'),
    [newsState.items]
  )

  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        NEWS_CATEGORIES.map((cat) => [
          cat,
          newsState.items.filter((i) => i.category === cat).length,
        ])
      ) as Record<NewsCategory, number>,
    [newsState.items]
  )

  const breakingCount = breakingItems.length
  const highCount = useMemo(
    () => newsState.items.filter((i) => i.importance === 'high').length,
    [newsState.items]
  )

  return {
    items: filteredItems,
    breakingItems,
    activeCategory,
    setActiveCategory,
    lastRefreshed,
    secondsUntilRefresh,
    totalSeconds,
    categoryCounts,
    breakingCount,
    highCount,
    totalCount: newsState.items.length,
  }
}

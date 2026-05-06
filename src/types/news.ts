export type NewsCategory = '政治' | '科技' | '财经' | '体育' | '国际' | '社会'

export type NewsImportance = 'breaking' | 'high' | 'normal'

export interface NewsItem {
  id: string
  title: string
  summary: string
  category: NewsCategory
  importance: NewsImportance
  source: string
  publishedAt: string // ISO 8601
}

export interface NewsState {
  items: NewsItem[]
  lastUpdated: string // ISO 8601
}

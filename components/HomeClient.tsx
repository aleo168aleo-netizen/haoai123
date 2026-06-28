'use client'

import { useMemo, useState } from 'react'
import { AITool, CategorySlug } from '@/lib/data/tools'
import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'
import ToolCard from './ToolCard'

interface Props {
  tools: AITool[]
}

type QuickFilter = 'all' | 'china' | 'free'

export default function HomeClient({ tools }: Props) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategorySlug | 'all'>('all')
  const [quick, setQuick] = useState<QuickFilter>('all')

  const filtered = useMemo(() => {
    return tools.filter(t => {
      if (quick === 'china' && !t.china_accessible) return false
      if (quick === 'free' && t.pricing !== 'free') return false
      if (category !== 'all' && !t.categories.includes(category as CategorySlug)) return false
      if (query) {
        const q = query.toLowerCase()
        return (
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some(tag => tag.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [tools, query, category, quick])

  const counts = useMemo(() => {
    const result: Record<string, number> = {}
    const src = tools.filter(t => {
      if (quick === 'china' && !t.china_accessible) return false
      if (quick === 'free' && t.pricing !== 'free') return false
      if (query) {
        const q = query.toLowerCase()
        return t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      }
      return true
    })
    src.forEach(t => {
      t.categories.forEach(c => {
        result[c] = (result[c] ?? 0) + 1
      })
    })
    return result
  }, [tools, quick, query])

  const quickBtns: { key: QuickFilter; label: string }[] = [
    { key: 'all', label: '全部工具' },
    { key: 'china', label: '🇨🇳 国内直连' },
    { key: 'free', label: '🆓 完全免费' },
  ]

  return (
    <div className="space-y-6">
      {/* Search */}
      <SearchBar value={query} onChange={setQuery} />

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2">
        {quickBtns.map(b => (
          <button
            key={b.key}
            onClick={() => setQuick(b.key)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
              quick === b.key
                ? 'border-[#f5c518] bg-[#f5c518] text-black'
                : 'border-white/[0.08] bg-white/[0.03] text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <CategoryFilter active={category} onChange={setCategory} counts={counts} />

      {/* Results count */}
      <p className="text-sm text-gray-600">
        共 <span className="text-[#f5c518] font-medium">{filtered.length}</span> 个工具
        {query && <span>，搜索「{query}」</span>}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="mb-3 text-4xl">🤖</span>
          <p className="text-gray-400">没有找到相关工具</p>
          <button
            onClick={() => { setQuery(''); setCategory('all'); setQuick('all') }}
            className="mt-3 text-sm text-[#f5c518] hover:underline"
          >
            清除筛选
          </button>
        </div>
      )}
    </div>
  )
}

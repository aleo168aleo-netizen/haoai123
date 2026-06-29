'use client'

import { CATEGORIES, CategorySlug } from '@/lib/data/tools'

interface Props {
  active: CategorySlug | 'all'
  onChange: (v: CategorySlug | 'all') => void
  counts: Record<string, number>
}

export default function CategoryFilter({ active, onChange, counts }: Props) {
  const all = [{ slug: 'all', name: '全部', icon: '✦' }, ...CATEGORIES]

  return (
    <div className="flex gap-2 overflow-x-auto pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible sm:pb-0">
      {all.map(cat => {
        const isActive = active === cat.slug
        const count = cat.slug === 'all'
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : (counts[cat.slug] ?? 0)
        return (
          <button
            key={cat.slug}
            onClick={() => onChange(cat.slug as CategorySlug | 'all')}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
              isActive
                ? 'border-[#f5c518] bg-[#f5c518] text-black'
                : 'border-white/[0.08] bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
            <span className={`text-xs ${isActive ? 'text-black/60' : 'text-gray-600'}`}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

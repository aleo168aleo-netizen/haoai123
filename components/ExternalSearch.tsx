'use client'

import { useState, type FormEvent } from 'react'

type Engine = 'baidu' | 'arena'

const ENGINES: { key: Engine; label: string; placeholder: string; btn: string; url: (q: string) => string }[] = [
  {
    key: 'baidu',
    label: '百度',
    placeholder: '百度一下，你就知道',
    btn: '百度一下',
    url: q => `https://www.baidu.com/s?wd=${encodeURIComponent(q)}`,
  },
  {
    key: 'arena',
    label: 'Arena',
    placeholder: '对比全球AI模型，找最强的那个...',
    btn: '去 Arena',
    url: () => 'https://lmarena.ai/',
  },
]

export default function ExternalSearch() {
  const [engine, setEngine] = useState<Engine>('baidu')
  const [query, setQuery] = useState('')

  const current = ENGINES.find(e => e.key === engine)!

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    window.open(current.url(query), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl">
      {/* Engine tabs */}
      <div className="flex gap-0.5">
        {ENGINES.map(eng => (
          <button
            key={eng.key}
            type="button"
            onClick={() => setEngine(eng.key)}
            className={`rounded-t-lg px-5 py-1.5 text-sm font-medium transition-all duration-150 ${
              engine === eng.key
                ? 'bg-[#f5c518] text-black'
                : 'bg-white/[0.05] text-gray-500 hover:bg-white/[0.08] hover:text-gray-300'
            }`}
          >
            {eng.label}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="flex overflow-hidden rounded-b-xl rounded-tr-xl border border-[#f5c518]/40 bg-white/[0.04] focus-within:border-[#f5c518]/70 transition-colors">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={current.placeholder}
          className="flex-1 bg-transparent px-5 py-3.5 text-white placeholder:text-gray-600 outline-none"
        />
        <button
          type="submit"
          className="shrink-0 bg-[#f5c518] px-7 text-sm font-semibold text-black transition hover:bg-[#d4a900] active:scale-95"
        >
          {current.btn}
        </button>
      </div>
    </form>
  )
}

'use client'

interface Props {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div className="relative w-full">
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? '搜索AI工具...'}
        className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] pl-12 pr-4 text-white placeholder:text-gray-600 outline-none transition focus:border-[#f5c518]/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#f5c518]/30"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="清除搜索"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

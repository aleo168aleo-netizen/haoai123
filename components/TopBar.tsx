'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const DAYS = ['日', '一', '二', '三', '四', '五', '六']

const LINKS = [
  { label: '提示词库', href: 'https://prompt.best' },
  { label: 'AI论文', href: 'https://paperswithcode.com' },
  { label: '开源模型', href: 'https://huggingface.co' },
  { label: 'AI新闻', href: 'https://36kr.com/information/AI' },
  { label: 'GitHub热榜', href: 'https://github.com/trending' },
  { label: '提交收录', href: '/submit', internal: true },
]

export default function TopBar() {
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    const now = new Date()
    const y = now.getFullYear()
    const m = now.getMonth() + 1
    const d = now.getDate()
    const day = DAYS[now.getDay()]
    setDateStr(`${y}年${m}月${d}日 星期${day}`)
  }, [])

  return (
    <div className="border-b border-white/[0.04] bg-black/40 text-[11px] text-gray-600">
      <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4">
        <span className="tabular-nums">{dateStr}</span>
        <div className="flex items-center">
          {LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center">
              {i > 0 && <span className="mx-2 opacity-30">·</span>}
              {'internal' in link ? (
                <Link
                  href={link.href}
                  className="transition-colors duration-150 hover:text-[#f5c518]"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150 hover:text-[#f5c518]"
                >
                  {link.label}
                </a>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

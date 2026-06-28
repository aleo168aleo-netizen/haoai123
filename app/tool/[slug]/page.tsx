import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { tools, getToolBySlug, getToolColor, getInitials, CATEGORIES, CategorySlug } from '@/lib/data/tools'
import ToolCard from '@/components/ToolCard'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.slug)
  if (!tool) return {}
  return {
    title: `${tool.name} - AI工具详情 | AI导航`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} | AI导航`,
      description: tool.description,
      type: 'website',
    },
  }
}

const pricingMap: Record<string, string> = {
  free: '完全免费',
  freemium: '免费+付费版',
  paid: '付费订阅',
}

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.slug)
  if (!tool) notFound()

  const color = getToolColor(tool.name)
  const initials = getInitials(tool.name)

  const related = tools
    .filter(t => t.slug !== tool.slug && t.categories.some(c => tool.categories.includes(c)))
    .slice(0, 4)

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-4 px-4">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <Link href="/" className="text-xl font-bold">
            <span className="text-[#f5c518]">HAO</span><span className="text-white">AI</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        {/* Tool hero */}
        <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
          <div className="mb-6 flex items-start gap-5">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-black"
              style={{ backgroundColor: color }}
            >
              {initials}
            </div>
            <div className="flex-1">
              <h1 className="mb-1 text-2xl font-bold">{tool.name}</h1>
              <p className="text-gray-400">{tool.description}</p>
            </div>
          </div>

          {/* Meta info */}
          <div className="mb-6 flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2">
              <span className="text-gray-500">定价</span>
              <span className={tool.pricing === 'free' ? 'text-emerald-400' : tool.pricing === 'paid' ? 'text-gray-300' : 'text-[#f5c518]'}>
                {pricingMap[tool.pricing]}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2">
              <span className="text-gray-500">访问</span>
              <span className={tool.china_accessible ? 'text-emerald-400' : 'text-gray-400'}>
                {tool.china_accessible ? '国内直连' : '需要VPN'}
              </span>
            </div>
            {tool.monthly_visits && (
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                <span className="text-gray-500">月访问</span>
                <span className="text-white">{(tool.monthly_visits / 1e8).toFixed(1)}亿+</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {tool.tags.map(tag => (
              <span key={tag} className="rounded-full border border-white/[0.08] px-3 py-1 text-sm text-gray-400">
                {tag}
              </span>
            ))}
          </div>

          {/* Categories */}
          <div className="mb-6 flex flex-wrap gap-2">
            {tool.categories.map(c => {
              const cat = CATEGORIES.find(cat => cat.slug === c)
              return cat ? (
                <Link
                  key={c}
                  href={`/category/${c}`}
                  className="flex items-center gap-1 rounded-full border border-[#f5c518]/20 bg-[#f5c518]/5 px-3 py-1 text-sm text-[#f5c518] hover:bg-[#f5c518]/10 transition-colors"
                >
                  {cat.icon} {cat.name}
                </Link>
              ) : null
            })}
          </div>

          {/* CTA */}
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#f5c518] px-6 py-3 font-semibold text-black transition hover:bg-[#d4a900]"
          >
            访问官网
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          {tool.need_vpn && (
            <p className="mt-3 text-sm text-gray-600">该工具在中国大陆需要VPN才能访问</p>
          )}
        </div>

        {/* Related tools */}
        {related.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-300">相关工具</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {related.map(t => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

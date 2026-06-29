import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CATEGORIES, getToolsByCategory, CategorySlug } from '@/lib/data/tools'
import ToolCard from '@/components/ToolCard'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return CATEGORIES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = CATEGORIES.find(c => c.slug === params.slug)
  if (!cat) return {}
  return {
    title: `${cat.name} - AI工具分类 | AI导航`,
    description: `收录全球最全的${cat.name}AI工具，包含国内外主流${cat.name}产品，国内可直连工具特别标注。`,
  }
}

export default function CategoryPage({ params }: Props) {
  const cat = CATEGORIES.find(c => c.slug === params.slug)
  if (!cat) notFound()

  const categoryTools = getToolsByCategory(params.slug as CategorySlug)

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
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

      <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-10">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-3xl">{cat.icon}</span>
            <h1 className="text-3xl font-bold">{cat.name}</h1>
          </div>
          <p className="text-gray-400">
            共收录 <span className="text-[#f5c518] font-medium">{categoryTools.length}</span> 款{cat.name}工具
          </p>
        </div>

        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 py-20 text-center">该分类暂无工具</p>
        )}

        {/* Other categories */}
        <div className="mt-12 border-t border-white/[0.06] pt-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-300">其他分类</h2>
          <div className="flex gap-2 overflow-x-auto pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible sm:pb-0">
            {CATEGORIES.filter(c => c.slug !== params.slug).map(c => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-1.5 text-sm text-gray-400 hover:border-[#f5c518]/50 hover:text-[#f5c518] transition-all"
              >
                <span>{c.icon}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

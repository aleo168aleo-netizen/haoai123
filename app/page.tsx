import { tools } from '@/lib/data/tools'
import HomeClient from '@/components/HomeClient'
import ExternalSearch from '@/components/ExternalSearch'
import Logo from '@/components/Logo'
import Link from 'next/link'
import OpenChatButton from '@/components/OpenChatButton'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/submit" className="text-gray-400 hover:text-white transition-colors">
              提交工具
            </Link>
            <a
              href="https://github.com/aleo168aleo-netizen/haoai123"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-1.5 text-gray-400 hover:border-[#f5c518]/50 hover:text-[#f5c518] transition-all"
            >
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-white/[0.04] py-10 sm:py-14 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f5c518]/20 bg-[#f5c518]/5 px-4 py-1.5 text-sm text-[#f5c518]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f5c518] animate-pulse" />
            收录 {tools.length}+ 款全球最新AI工具
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            发现最好用的 <span className="text-[#f5c518]">AI 工具</span>
          </h1>
          <p className="mb-5 text-lg text-gray-400">
            国内外AI工具一站导航，国内直连工具重点标注，帮你快速找到最适合的AI助手
          </p>

          <div className="mb-6">
            <OpenChatButton />
          </div>

          {/* External search: Baidu + Arena */}
          <div className="mb-8">
            <ExternalSearch />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-sm text-gray-500">
            <span>🇨🇳 {tools.filter(t => t.china_accessible).length} 个国内直连</span>
            <span className="hidden sm:inline text-gray-700">·</span>
            <span>🆓 {tools.filter(t => t.pricing === 'free').length} 个完全免费</span>
            <span className="hidden sm:inline text-gray-700">·</span>
            <span>🌏 覆盖 22 大分类</span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8">
        <HomeClient tools={tools} />
      </main>

      {/* Quick links */}
      <div className="border-t border-white/[0.04] bg-white/[0.01] py-8">
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <p className="mb-4 text-sm font-medium text-gray-500">更多功能</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/guide"
              className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
            >
              <span>🇨🇳</span>
              <div>
                <p className="font-medium">国内使用指南</p>
                <p className="text-[11px] text-emerald-600">直连工具 · 免费额度 · 注册攻略</p>
              </div>
            </Link>
            <Link
              href="/builder"
              className="flex items-center gap-2 rounded-xl border border-[#f5c518]/20 bg-[#f5c518]/5 px-4 py-3 text-sm text-[#f5c518] hover:border-[#f5c518]/40 hover:bg-[#f5c518]/10 transition-all"
            >
              <span>📱</span>
              <div>
                <p className="font-medium">AI应用生成器</p>
                <p className="text-[11px] text-[#f5c518]/60">对话生成手机APP界面 · 实时预览</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/[0.06] py-8 text-center text-sm text-gray-600">
        <p>
          <span className="text-[#f5c518] font-medium">HAOAI导航</span> — 全球AI工具大全 ·{' '}
          <Link href="/submit" className="hover:text-gray-400 transition-colors">提交工具</Link>
          {' · '}
          <a
            href="https://github.com/aleo168aleo-netizen/haoai123"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            开源 GitHub
          </a>
        </p>
        <p className="mt-2 text-gray-700">数据持续更新中，如有遗漏欢迎提交</p>
      </footer>
    </div>
  )
}

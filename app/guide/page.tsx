import Link from 'next/link'
import type { Metadata } from 'next'
import { tools } from '@/lib/data/tools'
import GuideCTAButton from '@/components/GuideCTAButton'

export const metadata: Metadata = {
  title: '国内使用AI工具完整指南 | HAOAI导航',
  description: '无需科学上网，国内直连AI工具大全。包含国内可用AI工具推荐、免费额度、注册方法、国产AI替代品。',
}

const chinaTools = tools.filter(t => t.china_accessible)
const freeChina = chinaTools.filter(t => t.pricing === 'free' || t.pricing === 'freemium')

const DOMESTIC_PICKS = [
  { slug: 'doubao', name: '豆包', desc: '字节旗下，对话+图像+语音，免费不限量', tag: '🏆 推荐' },
  { slug: 'kimi', name: 'Kimi', desc: '月之暗面出品，超长上下文200万字，免费', tag: '📄 长文档' },
  { slug: 'deepseek', name: 'DeepSeek', desc: '性能比肩 GPT-4o，完全免费，速度快', tag: '🆓 免费' },
  { slug: 'tongyi', name: '通义千问', desc: '阿里出品，多模态，支持文件/图片理解', tag: '🖼️ 多模态' },
  { slug: 'wenxin', name: '文心一言', desc: '百度出品，中文写作能力强，生态完整', tag: '✍️ 写作' },
  { slug: 'hailuo', name: '海螺AI', desc: 'MiniMax出品，支持AI视频生成，每天免费额度', tag: '🎬 视频' },
]

const CATEGORIES_CN = [
  { label: '对话 & 写作', slug: 'chat', icon: '💬', tools: chinaTools.filter(t => t.categories.includes('chat')).slice(0, 6) },
  { label: '图像生成', slug: 'image', icon: '🎨', tools: chinaTools.filter(t => t.categories.includes('image')).slice(0, 6) },
  { label: '视频创作', slug: 'video', icon: '🎬', tools: chinaTools.filter(t => t.categories.includes('video')).slice(0, 6) },
  { label: '编程 & 代码', slug: 'code', icon: '💻', tools: chinaTools.filter(t => t.categories.includes('code')).slice(0, 6) },
  { label: '效率 & 办公', slug: 'productivity', icon: '📊', tools: chinaTools.filter(t => t.categories.includes('productivity')).slice(0, 6) },
  { label: '音频 & 配音', slug: 'audio', icon: '🎵', tools: chinaTools.filter(t => t.categories.includes('audio')).slice(0, 6) },
]

const REGISTER_FAQ = [
  {
    q: '需要手机号吗？',
    a: '国内工具（豆包、Kimi、DeepSeek 等）直接用+86手机号注册，无障碍。部分工具支持邮箱注册。',
  },
  {
    q: '邮箱用什么？',
    a: 'QQ邮箱、163邮箱都可以注册国内工具。如需注册境外工具（需科学上网），可使用 Gmail 或 Outlook，申请完全免费。',
  },
  {
    q: '要付费吗？',
    a: '本页推荐的工具均有充足的免费额度。豆包、Kimi 免费版已够日常使用，DeepSeek 完全免费无限制。',
  },
  {
    q: '数据安全吗？',
    a: '国内工具均在境内服务器运行，受国内法律保护。敏感内容建议不要上传到任何在线 AI 工具。',
  },
]

export default function GuidePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
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

      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm text-emerald-400">
            🇨🇳 国内直连 · 无需科学上网
          </div>
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">国内使用AI工具完整指南</h1>
          <p className="text-gray-400">
            站内收录 <span className="text-emerald-400 font-medium">{chinaTools.length}</span> 个国内直连工具，
            其中 <span className="text-[#f5c518] font-medium">{freeChina.length}</span> 个免费或含免费版
          </p>
        </div>

        {/* Picks */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-semibold">🏆 强烈推荐的国内直连AI</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DOMESTIC_PICKS.map(p => {
              const tool = tools.find(t => t.slug === p.slug)
              return (
                <Link
                  key={p.slug}
                  href={`/tool/${p.slug}`}
                  className="group rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all hover:border-emerald-500/30 hover:bg-white/[0.06]"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{p.name}</span>
                    <span className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">{p.tag}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* By category */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-semibold">📂 按用途分类</h2>
          <div className="space-y-6">
            {CATEGORIES_CN.map(cat => cat.tools.length > 0 && (
              <div key={cat.slug}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium text-gray-300">
                    {cat.icon} {cat.label}
                  </h3>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-xs text-gray-600 hover:text-[#f5c518] transition-colors"
                  >
                    查看全部 →
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.tools.map(t => (
                    <Link
                      key={t.slug}
                      href={`/tool/${t.slug}`}
                      className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-gray-400 hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
                    >
                      {t.name}
                      {t.pricing === 'free' && <span className="text-[10px] text-emerald-500">免费</span>}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Register FAQ */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-semibold">❓ 注册常见问题</h2>
          <div className="space-y-3">
            {REGISTER_FAQ.map(faq => (
              <div key={faq.q} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <p className="mb-2 font-medium text-white">{faq.q}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Free tier table */}
        <section className="mb-12">
          <h2 className="mb-5 text-xl font-semibold">🆓 主流工具免费额度一览</h2>
          <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                  <th className="px-4 py-3 text-left font-medium text-gray-400">工具</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-400">免费额度</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-400">够用吗</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  { name: 'DeepSeek', free: '完全免费，无上限', enough: '✅ 非常够' },
                  { name: '豆包', free: '每日大量免费对话', enough: '✅ 日常够用' },
                  { name: 'Kimi', free: '每月200万字上下文，免费', enough: '✅ 长文档首选' },
                  { name: '通义千问', free: '每月一定对话次数', enough: '🟡 轻度够' },
                  { name: '文心一言', free: '基础版免费', enough: '🟡 轻度够' },
                  { name: '即梦（图像）', free: '每日有限次数', enough: '🟡 够体验' },
                  { name: '海螺AI（视频）', free: '每日免费生成2-3个', enough: '🟡 够体验' },
                  { name: '讯飞星火', free: '每月有限tokens', enough: '🟡 轻度够' },
                ].map(row => (
                  <tr key={row.name} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium text-white">{row.name}</td>
                    <td className="px-4 py-3 text-gray-400">{row.free}</td>
                    <td className="px-4 py-3">{row.enough}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* AI assistant CTA */}
        <section className="rounded-2xl border border-[#f5c518]/20 bg-[#f5c518]/5 p-6 text-center">
          <p className="mb-2 font-semibold text-[#f5c518]">🤖 还没想好用哪个？</p>
          <p className="mb-4 text-sm text-gray-400">告诉AI助手你想做什么，帮你找最合适的工具</p>
          <GuideCTAButton />
        </section>
      </main>
    </div>
  )
}

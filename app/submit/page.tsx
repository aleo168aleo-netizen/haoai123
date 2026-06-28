'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function SubmitPage() {
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    category: '',
    pricing: 'freemium',
    china: 'false',
    email: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const title = encodeURIComponent(`[新工具提交] ${form.name}`)
    const body = encodeURIComponent(
      `## 工具信息\n\n- **名称**: ${form.name}\n- **网址**: ${form.url}\n- **分类**: ${form.category}\n- **定价**: ${form.pricing}\n- **国内可直连**: ${form.china === 'true' ? '是' : '否'}\n- **描述**: ${form.description}\n- **提交人邮箱**: ${form.email || '未填写'}\n\n---\n*通过 haoai123.com 提交*`
    )
    window.open(`https://github.com/aleo168aleo-netizen/haoai123/issues/new?title=${title}&body=${body}`, '_blank')
  }

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const inputCls = 'w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder:text-gray-600 outline-none transition focus:border-[#f5c518]/50 focus:ring-1 focus:ring-[#f5c518]/30'
  const labelCls = 'mb-1.5 block text-sm font-medium text-gray-400'

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-4 px-4">
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

      <main className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold">提交新工具</h1>
          <p className="text-gray-400">发现了好用的AI工具？欢迎提交，我们会审核后收录。提交将创建一个 GitHub Issue。</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
          <div>
            <label className={labelCls}>工具名称 *</label>
            <input required placeholder="如：ChatGPT" className={inputCls} value={form.name} onChange={set('name')} />
          </div>
          <div>
            <label className={labelCls}>官网地址 *</label>
            <input required type="url" placeholder="https://..." className={inputCls} value={form.url} onChange={set('url')} />
          </div>
          <div>
            <label className={labelCls}>一句话描述 *</label>
            <textarea required rows={2} placeholder="简短描述这个工具的核心功能和亮点" className={`${inputCls} resize-none`} value={form.description} onChange={set('description')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>分类</label>
              <select className={inputCls} value={form.category} onChange={set('category')}>
                <option value="">请选择</option>
                <option value="chat">对话助手</option>
                <option value="image">图像生成</option>
                <option value="video">视频生成</option>
                <option value="audio">音频音乐</option>
                <option value="code">代码编程</option>
                <option value="search">AI搜索</option>
                <option value="agent">Agent自动化</option>
                <option value="productivity">办公效率</option>
                <option value="avatar">虚拟人</option>
                <option value="open-source">开源模型</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>定价模式</label>
              <select className={inputCls} value={form.pricing} onChange={set('pricing')}>
                <option value="free">完全免费</option>
                <option value="freemium">免费+付费</option>
                <option value="paid">纯付费</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls}>国内可直连</label>
            <select className={inputCls} value={form.china} onChange={set('china')}>
              <option value="true">是，可以直连</option>
              <option value="false">否，需要VPN</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>您的邮箱（选填，收录后通知）</label>
            <input type="email" placeholder="your@email.com" className={inputCls} value={form.email} onChange={set('email')} />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-[#f5c518] py-3 font-semibold text-black transition hover:bg-[#d4a900]"
          >
            提交到 GitHub Issues →
          </button>
          <p className="text-center text-xs text-gray-600">
            提交即代表同意将工具信息公开收录，审核通常在 1-3 个工作日内完成
          </p>
        </form>
      </main>
    </div>
  )
}

'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const PLACEHOLDER_HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,sans-serif;background:#f5f5f7;display:flex;align-items:center;justify-content:center;min-height:100vh}
.wrap{text-align:center;padding:32px 24px;color:#666}
.icon{font-size:48px;margin-bottom:16px}
h3{font-size:17px;color:#333;font-weight:600;margin-bottom:8px}
p{font-size:13px;line-height:1.6;color:#999}
.tips{margin-top:20px;display:flex;flex-direction:column;gap:8px}
.tip{background:#fff;border-radius:12px;padding:10px 14px;font-size:12px;color:#555;text-align:left;box-shadow:0 1px 4px rgba(0,0,0,.08)}
</style>
</head>
<body>
<div class="wrap">
  <div class="icon">📱</div>
  <h3>描述你想要的APP界面</h3>
  <p>AI会立即生成并实时更新手机预览</p>
  <div class="tips">
    <div class="tip">💡 "帮我做一个外卖APP首页"</div>
    <div class="tip">💡 "给我设计一个音乐播放器"</div>
    <div class="tip">💡 "做个电商商品详情页"</div>
  </div>
</div>
</body>
</html>`

const EXAMPLES = ['外卖APP首页', '音乐播放器', '电商商品详情页', '社交媒体主页', '健身打卡APP', '新闻资讯首页']

export default function BuilderPage() {
  const [html, setHtml] = useState(PLACEHOLDER_HTML)
  const [streamingHtml, setStreamingHtml] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounce iframe update to reduce flicker
  useEffect(() => {
    if (!streamingHtml) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setHtml(streamingHtml)
    }, 150)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [streamingHtml])

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }, [messages])

  const send = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg || loading) return

    const userMsg: Message = { role: 'user', content: msg }

    // If we have existing generated HTML, include it as context for modification
    const apiContent = html !== PLACEHOLDER_HTML
      ? `当前界面的HTML代码（请在此基础上修改）：\n${html}\n\n用户新要求：${msg}`
      : msg

    const apiMessages = [
      ...messages.filter(m => m.role === 'user' && m.content !== msg).map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: apiContent },
    ]

    setMessages(prev => [...prev, userMsg, { role: 'assistant', content: '' }])
    setInput('')
    setLoading(true)
    setIsStreaming(true)

    try {
      const res = await fetch('/api/builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!res.ok || !res.body) throw new Error('request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      let buf = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += decoder.decode(value, { stream: true })
        const lines = buf.split('\n')
        buf = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const raw = line.slice(6).trim()
          if (raw === '[DONE]') continue
          try {
            const delta = JSON.parse(raw).choices?.[0]?.delta?.content ?? ''
            acc += delta
            // Strip any accidental code fences
            const clean = acc.replace(/^```html?\n?/, '').replace(/\n?```\s*$/, '')
            setStreamingHtml(clean)
          } catch {}
        }
      }

      // Finalize
      const finalHtml = acc.replace(/^```html?\n?/, '').replace(/\n?```\s*$/, '').trim()
      if (finalHtml.startsWith('<!DOCTYPE') || finalHtml.startsWith('<html')) {
        setHtml(finalHtml)
      }
      setMessages(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = { role: 'assistant', content: '✅ 已生成！继续说你想修改的地方。' }
        return copy
      })
    } catch {
      setMessages(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = { role: 'assistant', content: '出了点问题，请重试 🙏' }
        return copy
      })
    } finally {
      setLoading(false)
      setIsStreaming(false)
      setStreamingHtml('')
    }
  }, [input, loading, messages, html])

  return (
    <div className="flex h-screen flex-col bg-[#0a0a0a] text-white overflow-hidden">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-4 h-12">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <span className="text-sm font-semibold">
            <span className="text-[#f5c518]">HAO</span>AI <span className="text-gray-500 font-normal">/ AI应用生成器</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-[#f5c518]/20 bg-[#f5c518]/5 px-3 py-1 text-[11px] text-[#f5c518]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f5c518] animate-pulse" />
          NVIDIA AI
        </div>
      </header>

      {/* Split layout */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">

        {/* Phone preview — left on desktop, top on mobile */}
        <div className="flex shrink-0 items-center justify-center bg-[#050505] border-b border-white/[0.06] lg:border-b-0 lg:border-r lg:w-[54%] overflow-hidden"
          style={{ height: 'clamp(260px, 48vw, 50%)' }}
        >
          <div className="relative">
            {/* Outer shell */}
            <div className="relative rounded-[40px] border-[6px] border-gray-700 bg-black shadow-2xl shadow-black/70"
              style={{ width: 270, height: 554 }}
            >
              {/* Notch */}
              <div className="absolute left-1/2 top-0 z-10 h-4 w-24 -translate-x-1/2 rounded-b-2xl bg-gray-800" />
              {/* Status bar */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-1 text-[9px] text-white/70 z-10 pointer-events-none">
                <span className="font-semibold">9:41</span>
                <span>●●● 🔋</span>
              </div>
              {/* Iframe */}
              <iframe
                srcDoc={html}
                className="absolute inset-0 rounded-[34px]"
                style={{ width: '100%', height: '100%', border: 'none' }}
                sandbox="allow-scripts"
                title="App Preview"
              />
              {/* Generating overlay */}
              {isStreaming && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[34px] bg-black/20 backdrop-blur-[1px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 150, 300].map(d => (
                        <span key={d} className="h-2 w-2 rounded-full bg-[#f5c518] animate-bounce" style={{ animationDelay: `${d}ms` }} />
                      ))}
                    </div>
                    <span className="text-[11px] text-white/60">生成中...</span>
                  </div>
                </div>
              )}
              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 h-0.5 w-20 -translate-x-1/2 rounded-full bg-white/30" />
            </div>
          </div>
        </div>

        {/* Chat panel — right on desktop, bottom on mobile */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center gap-5 py-8 text-center">
                <div>
                  <p className="font-medium text-gray-300 text-base">💡 描述你想要的APP界面</p>
                  <p className="mt-1 text-sm text-gray-600">AI即时生成并在手机上预览</p>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                  {EXAMPLES.map(eg => (
                    <button
                      key={eg}
                      onClick={() => send(`帮我设计一个${eg}界面`)}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-xs text-gray-400 hover:border-[#f5c518]/40 hover:text-[#f5c518] transition-all text-left"
                    >
                      {eg}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f5c518] text-[10px] font-bold text-black">AI</div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'rounded-br-sm bg-[#f5c518] text-black'
                    : 'rounded-bl-sm bg-white/[0.06] text-gray-200'
                }`}>
                  {loading && i === messages.length - 1 && msg.content === '' ? (
                    <span className="flex items-center gap-1.5">
                      <span className="flex gap-1">
                        {[0, 150, 300].map(d => (
                          <span key={d} className="h-1.5 w-1.5 rounded-full bg-[#f5c518] animate-bounce" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </span>
                      <span className="text-gray-500">正在生成...</span>
                    </span>
                  ) : msg.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-white/[0.06] p-3">
            <div className="flex items-end gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-3 py-2 focus-within:border-[#f5c518]/30 transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => {
                  setInput(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
                }}
                placeholder="描述想要的APP界面，或说要改哪里..."
                className="flex-1 resize-none bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                rows={1}
                autoFocus
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5c518] text-black disabled:opacity-30 enabled:hover:bg-[#ffd52b] transition-all"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-gray-700">Enter 发送 · 可连续对话修改界面</p>
          </div>
        </div>
      </div>
    </div>
  )
}

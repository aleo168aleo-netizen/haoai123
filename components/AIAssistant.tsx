'use client'
import { useState, useRef, useEffect, useCallback } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const WELCOME: Message = {
  role: 'assistant',
  content: `你好！我是HAOAI助手小好 👋

告诉我你想用AI来做什么，我帮你从站内找最合适的工具。

比如问我：
• 我想做AI绘画，哪个工具最好？
• 有没有国内直接能用的AI写作工具？
• 帮我找个免费的AI翻译，不用VPN的`,
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-ai-chat', handler)
    return () => window.removeEventListener('open-ai-chat', handler)
  }, [])

  useEffect(() => {
    if (open && messages.length === 0) setMessages([WELCOME])
  }, [open, messages.length])

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    return () => clearTimeout(t)
  }, [open, messages])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.filter(m => m.content).map(m => ({ role: m.role, content: m.content })),
        }),
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
            setMessages(prev => {
              const copy = [...prev]
              copy[copy.length - 1] = { role: 'assistant', content: acc }
              return copy
            })
          } catch {}
        }
      }
    } catch {
      setMessages(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = { role: 'assistant', content: '出了点问题，请稍后重试 🙏' }
        return copy
      })
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages])

  const isTyping = loading && messages.at(-1)?.content === ''

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#f5c518] px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-black/40 transition-all hover:scale-105 hover:bg-[#ffd52b]"
      >
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        不知道选哪个？
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}

      {open && (
        <div className="fixed bottom-0 right-0 z-50 flex h-[85vh] w-full flex-col overflow-hidden border border-white/[0.08] bg-[#0d0d0d] shadow-2xl sm:bottom-6 sm:right-6 sm:h-[580px] sm:w-[390px] sm:rounded-2xl">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5c518] text-sm font-bold text-black">好</div>
              <div>
                <p className="text-sm font-semibold text-white">AI助手小好</p>
                <p className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  在线 · 帮你找最合适的AI工具
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-gray-500 transition-all hover:bg-white/[0.06] hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f5c518] text-[10px] font-bold text-black">好</div>
                )}
                <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'rounded-br-sm bg-[#f5c518] text-black'
                    : 'rounded-bl-sm bg-white/[0.06] text-gray-200'
                }`}>
                  {isTyping && i === messages.length - 1 ? (
                    <span className="flex items-center gap-1 py-0.5">
                      {[0, 150, 300].map(d => (
                        <span key={d} className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                      ))}
                    </span>
                  ) : (
                    <span className="whitespace-pre-wrap">{msg.content}</span>
                  )}
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
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 80)}px`
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
                }}
                placeholder="说说你想用AI来做什么..."
                className="flex-1 resize-none bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                rows={1}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f5c518] text-black transition-all disabled:opacity-30 enabled:hover:bg-[#ffd52b]"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-gray-700">Enter 发送 · Shift+Enter 换行</p>
          </div>
        </div>
      )}
    </>
  )
}

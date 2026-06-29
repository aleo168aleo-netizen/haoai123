'use client'

export default function OpenChatButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event('open-ai-chat'))}
      className="group inline-flex items-center gap-2 rounded-full border border-[#f5c518]/30 bg-[#f5c518]/5 px-4 py-2 text-sm font-medium text-[#f5c518] transition-all hover:border-[#f5c518]/60 hover:bg-[#f5c518]/10"
    >
      <span>🤖</span>
      不知道选哪个？让AI帮我推荐
      <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}

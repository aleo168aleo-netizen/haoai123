'use client'

export default function GuideCTAButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event('open-ai-chat'))}
      className="inline-flex items-center gap-2 rounded-full bg-[#f5c518] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#ffd52b] transition-all"
    >
      让AI帮我推荐 →
    </button>
  )
}

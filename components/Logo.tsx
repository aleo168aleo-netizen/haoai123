'use client'

interface Props {
  size?: 'sm' | 'lg'
}

export default function Logo({ size = 'sm' }: Props) {
  const isSm = size === 'sm'

  return (
    <span
      className={`inline-flex items-baseline font-black tracking-tight select-none ${
        isSm ? 'text-xl' : 'text-5xl sm:text-6xl'
      }`}
      style={{ fontFamily: 'inherit' }}
    >
      {/* HAO — 逐字渐现 + 黄色 */}
      {['H', 'A', 'O'].map((ch, i) => (
        <span
          key={ch}
          className="inline-block text-[#f5c518] animate-[fadeSlideIn_0.4s_ease_both]"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {ch}
        </span>
      ))}

      {/* AI — 白色，带下划线扫光 */}
      <span className="relative ml-0.5">
        <span
          className="inline-block text-white animate-[fadeSlideIn_0.4s_ease_both]"
          style={{ animationDelay: '280ms' }}
        >
          A
        </span>
        <span
          className="inline-block text-white animate-[fadeSlideIn_0.4s_ease_both]"
          style={{ animationDelay: '340ms' }}
        >
          I
        </span>
        {/* 扫光下划线 */}
        <span
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full animate-[scanLine_1.2s_ease_0.5s_both] bg-gradient-to-r from-transparent via-[#f5c518] to-transparent"
          aria-hidden
        />
      </span>

      {/* 导航 小字 */}
      {isSm && (
        <span
          className="ml-1 text-sm font-normal text-gray-500 animate-[fadeSlideIn_0.4s_ease_both]"
          style={{ animationDelay: '420ms' }}
        >
          导航
        </span>
      )}
    </span>
  )
}

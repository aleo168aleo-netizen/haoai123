'use client'

import { useState } from 'react'

interface Props {
  url: string
  name: string
  color: string
  initials: string
  size?: number
}

export default function ToolLogo({ url, name, color, initials, size = 40 }: Props) {
  const [failed, setFailed] = useState(false)

  let domain = ''
  try { domain = new URL(url).hostname } catch { /* invalid url */ }

  const px = `${size}px`

  if (!domain || failed) {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-lg text-sm font-bold text-black"
        style={{ width: px, height: px, backgroundColor: color }}
      >
        {initials}
      </div>
    )
  }

  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.06]"
      style={{ width: px, height: px }}
    >
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt={name}
        width={size - 10}
        height={size - 10}
        onError={() => setFailed(true)}
        className="object-contain"
      />
    </div>
  )
}

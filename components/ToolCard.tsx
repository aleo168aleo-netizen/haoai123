import Link from 'next/link'
import { AITool, getToolColor, getInitials } from '@/lib/data/tools'
import ToolLogo from './ToolLogo'

interface Props {
  tool: AITool
}

const pricingLabel: Record<string, string> = {
  free: '免费',
  freemium: '免费+',
  paid: '付费',
}

const pricingColor: Record<string, string> = {
  free: 'text-emerald-400 bg-emerald-400/10',
  freemium: 'text-[#f5c518] bg-[#f5c518]/10',
  paid: 'text-gray-400 bg-gray-400/10',
}

export default function ToolCard({ tool }: Props) {
  const color = getToolColor(tool.name)
  const initials = getInitials(tool.name)

  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group block rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.06] hover:shadow-lg"
    >
      {/* Header */}
      <div className="mb-3 flex items-start gap-3">
        <ToolLogo url={tool.url} name={tool.name} color={color} initials={initials} size={40} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-white group-hover:text-[#f5c518] transition-colors">
              {tool.name}
            </h3>
            {!tool.china_accessible && (
              <span className="shrink-0 rounded px-1 py-0.5 text-[10px] font-medium text-gray-500 bg-gray-500/10 border border-gray-500/20">
                科学上网
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${pricingColor[tool.pricing]}`}>
              {pricingLabel[tool.pricing]}
            </span>
            {tool.china_accessible && (
              <span className="rounded px-1.5 py-0.5 text-[10px] font-medium text-emerald-400 bg-emerald-400/10">
                国内直连
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-400">
        {tool.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {tool.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[11px] text-gray-500 transition-all duration-150 hover:border-[#f5c518]/40 hover:text-[#f5c518] hover:scale-105"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}

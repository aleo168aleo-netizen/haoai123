import type { Metadata } from 'next'
import './globals.css'
import TopBar from '@/components/TopBar'

export const metadata: Metadata = {
  title: 'AI导航 - 全球AI工具大全，一站式发现最好用的AI',
  description: '收录全球最新最全AI工具，按分类整理，国内可用工具重点标注。ChatGPT、Claude、Midjourney、豆包、DeepSeek等热门AI工具一站导航。',
  keywords: 'AI工具,AI导航,人工智能,ChatGPT,Claude,Midjourney,豆包,DeepSeek,AI大全,人工智能工具',
  authors: [{ name: 'haoai123' }],
  openGraph: {
    title: 'AI导航 - 全球AI工具大全',
    description: '一站式发现最好用的AI工具',
    type: 'website',
    locale: 'zh_CN',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-[#0a0a0a] text-white antialiased min-h-screen">
        <TopBar />
        {children}
      </body>
    </html>
  )
}

import { NextRequest } from 'next/server'
import { tools } from '@/lib/data/tools'

const toolIndex = tools.map(t => {
  const price = t.pricing === 'free' ? '免费' : t.pricing === 'freemium' ? '部分免费' : '付费'
  const access = t.china_accessible ? '直连' : 'VPN'
  return `${t.name}(${t.slug})[${access}][${price}]: ${t.description.slice(0, 45)}`
}).join('\n')

const SYSTEM = `你是HAOAI导航站（haoai123.vercel.app）的AI助手"小好"，专门帮助用户找到最合适的AI工具。

站内收录了 ${tools.length} 个AI工具（格式：名称(slug)[访问][定价]: 简介）：
${toolIndex}

职责：
1. 根据用户需求，从上面推荐 1-3 个最合适的工具
2. 每个推荐需说明：为什么适合 + 访问地址 /tool/[slug] + 是否免费 + 简要用法
3. 需求模糊时，先追问再推荐
4. 用中文简洁回答，不废话
5. 优先推荐"直连"工具（国内无需VPN）
6. 如果用户询问某个工具怎么用，尽量给出实用建议`

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const key = process.env.NVIDIA_API_KEY
  if (!key) return new Response('NVIDIA_API_KEY not configured', { status: 500 })

  const upstream = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: process.env.NVIDIA_MODEL ?? 'meta/llama-3.1-70b-instruct',
      messages: [{ role: 'system', content: SYSTEM }, ...messages],
      stream: true,
      max_tokens: 1024,
      temperature: 0.6,
    }),
  })

  if (!upstream.ok) {
    const err = await upstream.text()
    console.error('NVIDIA upstream error', upstream.status, err)
    return new Response('AI服务暂时不可用', { status: 502 })
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

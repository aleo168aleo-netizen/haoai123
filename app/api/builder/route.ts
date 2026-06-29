import { NextRequest } from 'next/server'

const SYSTEM = `你是一个专业的手机APP UI设计师。根据用户描述，生成精美的手机APP界面HTML代码。

极其重要：
- 只输出HTML代码，不要任何解释、描述或代码块标记（不要\`\`\`）
- 第一行直接是 <!DOCTYPE html>，最后一行是 </html>

HTML技术规范：
- 所有CSS内联在 <style> 标签中，零外部依赖
- body: margin:0; padding:0; font-family:-apple-system,BlinkMacSystemFont,'PingFang SC',sans-serif; overflow-x:hidden;
- 设计宽度：360px，内容自适应
- 隐藏滚动条：body::-webkit-scrollbar{display:none} body{scrollbar-width:none}
- 不写任何 JavaScript（会被沙盒拦截）

设计质量要求（务必达到）：
- 现代高级感：圆角卡片、微妙渐变、柔和阴影
- 层次分明：顶部栏 + 内容区 + 底部导航（适用时）
- 色彩专业：选一个主色调，配合中性色，避免大红大绿
- 用emoji作为图标（🏠🔍💬👤❤️🛒📦🎵🎨⭐🔔等）
- 内容要真实：填入合理的假数据（商品名、价格、用户名等）
- 中文界面（除非用户指定英语）

每次修改时，基于上一版HTML进行增量更新，保持整体风格一致。`

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
      model: process.env.NVIDIA_BUILDER_MODEL ?? process.env.NVIDIA_MODEL ?? 'meta/llama-3.1-70b-instruct',
      messages: [{ role: 'system', content: SYSTEM }, ...messages],
      stream: true,
      max_tokens: 4096,
      temperature: 0.7,
    }),
  })

  if (!upstream.ok) {
    const err = await upstream.text()
    console.error('NVIDIA builder error', upstream.status, err)
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

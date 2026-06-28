import { MetadataRoute } from 'next'
import { tools, CATEGORIES } from '@/lib/data/tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://haoai123.com'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/submit`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    ...CATEGORIES.map(c => ({
      url: `${base}/category/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...tools.map(t => ({
      url: `${base}/tool/${t.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}

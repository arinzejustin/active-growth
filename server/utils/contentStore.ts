import fs from 'node:fs'
import path from 'node:path'
import { sql } from './db'

export interface ContentItem {
  id: string
  type: 'story' | 'program' | 'news'
  title: string
  subtitle?: string
  quote?: string
  content?: string
  mediaUrl?: string
  mediaType?: 'image' | 'video'
  accent?: string
  category?: string
  author?: string
  date?: string
  createdAt?: string
}

export const defaultItems: ContentItem[] = [
  // Initial Stories
  {
    id: 'story-1',
    type: 'story',
    title: 'Ogochukwu Anyanwu',
    subtitle: 'Community beneficiary',
    quote:
      'At the crucial time of need, you supported me and my family. Your help is invaluable, and your commitment to help individuals like me is deeply appreciated.',
    mediaUrl: 'https://activegrowthgroups.my.canva.site/_assets/media/113747c97c567daf71b6305fb478fe7a.jpg',
    mediaType: 'image',
    accent: 'teal',
    category: 'Family Support',
    date: '2026-06-12',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'story-2',
    type: 'story',
    title: 'Greg Hills',
    subtitle: 'Community beneficiary',
    quote:
      'I am beyond grateful for the support provided by this organization. Their dedication and generosity have made a significant difference in my life.',
    mediaUrl: 'https://activegrowthgroups.my.canva.site/_assets/media/c4831dc67c8b142d52711778119ef1ad.jpg',
    mediaType: 'image',
    accent: 'lime',
    category: 'Mentorship',
    date: '2026-06-20',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'story-3',
    type: 'story',
    title: 'Amina & Yusuf Bello',
    subtitle: 'Youth Mentorship Participants',
    quote:
      'Through structured mentoring and real career guidance, we went from feeling stuck after school to launching our first tech initiatives and mentoring younger peers.',
    mediaUrl: 'https://activegrowthgroups.my.canva.site/_assets/video/37dfe4155d1c9f51c7ded17736862c13.mp4',
    mediaType: 'video',
    accent: 'aurora',
    category: 'Youth Leadership',
    date: '2026-07-01',
    createdAt: new Date().toISOString(),
  },
]

const DATA_DIR = path.resolve(process.cwd(), '.data')
const CONTENT_FILE = path.join(DATA_DIR, 'content.json')

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
  } catch (err) {
    // Read-only filesystem on Vercel or serverless environment
  }
}

// Local fallback store
function getLocalItems(): ContentItem[] {
  try {
    ensureDataDir()
    if (!fs.existsSync(CONTENT_FILE)) {
      saveLocalItems(defaultItems)
      return defaultItems
    }
    const raw = fs.readFileSync(CONTENT_FILE, 'utf-8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      // Clean out old dummy seed items for programs and news if they were previously saved
      const cleaned = parsed.filter(item => {
        if (['prog-1', 'prog-2', 'prog-3', 'prog-4', 'news-1', 'news-2', 'news-3'].includes(item.id)) {
          return false
        }
        return true
      })
      if (cleaned.length !== parsed.length) {
        saveLocalItems(cleaned)
      }
      return cleaned
    }
    saveLocalItems(defaultItems)
    return defaultItems
  } catch {
    return defaultItems
  }
}

function saveLocalItems(items: ContentItem[]) {
  try {
    ensureDataDir()
    if (fs.existsSync(DATA_DIR)) {
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(items, null, 2), 'utf-8')
    }
  } catch (e) {
    console.warn('[Storage] Read-only filesystem or write failure in saveLocalItems (expected on Vercel without DATABASE_URL).')
  }
}

export async function getAllContentItems(typeFilter?: string): Promise<ContentItem[]> {
  if (sql) {
    try {
      const rows = await sql`
        SELECT id, type, title, subtitle, quote, content, media_url as "mediaUrl", media_type as "mediaType", accent, category, author, date, created_at as "createdAt"
        FROM content_items
        ORDER BY created_at DESC;
      `
      if (rows) {
        const result = (rows as ContentItem[]).filter(
          item => !['prog-1', 'prog-2', 'prog-3', 'prog-4', 'news-1', 'news-2', 'news-3'].includes(item.id)
        )
        return typeFilter ? result.filter(item => item.type === typeFilter) : result
      }
    } catch (err) {
      console.warn('[DB] Failed to load content items from DB, using local fallback:', err)
    }
  }

  const items = getLocalItems()
  return typeFilter ? items.filter(item => item.type === typeFilter) : items
}

export async function saveContentItem(item: ContentItem): Promise<ContentItem> {
  if (sql) {
    try {
      await sql`
        INSERT INTO content_items (id, type, title, subtitle, quote, content, media_url, media_type, accent, category, author, date, created_at)
        VALUES (${item.id}, ${item.type}, ${item.title}, ${item.subtitle || null}, ${item.quote || null}, ${item.content || null}, ${item.mediaUrl || null}, ${item.mediaType || 'image'}, ${item.accent || 'teal'}, ${item.category || null}, ${item.author || null}, ${item.date || null}, ${item.createdAt || new Date().toISOString()})
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          quote = EXCLUDED.quote,
          content = EXCLUDED.content,
          media_url = EXCLUDED.media_url,
          media_type = EXCLUDED.media_type,
          accent = EXCLUDED.accent,
          category = EXCLUDED.category,
          author = EXCLUDED.author,
          date = EXCLUDED.date;
      `
    } catch (err) {
      console.warn('[DB] Failed to save to Postgres, saving to local JSON:', err)
    }
  }

  const items = getLocalItems()
  const index = items.findIndex(i => i.id === item.id)
  if (index >= 0) {
    items[index] = item
  } else {
    items.unshift(item)
  }
  saveLocalItems(items)
  return item
}

export async function deleteContentItem(id: string): Promise<boolean> {
  if (sql) {
    try {
      await sql`DELETE FROM content_items WHERE id = ${id};`
    } catch (err) {
      console.warn('[DB] Failed to delete from Postgres:', err)
    }
  }

  const items = getLocalItems()
  const next = items.filter(i => i.id !== id)
  saveLocalItems(next)
  return true
}

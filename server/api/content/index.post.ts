import { defineEventHandler, readBody, createError } from 'h3'
import { saveContentItem, type ContentItem } from '../../utils/contentStore'
import { requireAdminAuth } from '../../utils/adminAuth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const body = await readBody(event)
  if (!body || !body.title || !body.type) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title and content type are required.',
    })
  }

  const id = body.id || `${body.type}-${Date.now()}`
  const item: ContentItem = {
    id,
    type: body.type,
    title: body.title.trim(),
    subtitle: body.subtitle ? body.subtitle.trim() : undefined,
    quote: body.quote ? body.quote.trim() : undefined,
    content: body.content ? body.content.trim() : undefined,
    mediaUrl: body.mediaUrl || undefined,
    mediaType: body.mediaType || 'image',
    accent: body.accent || 'teal',
    category: body.category || undefined,
    author: body.author || undefined,
    date: body.date || new Date().toISOString().split('T')[0],
    createdAt: body.createdAt || new Date().toISOString(),
  }

  const saved = await saveContentItem(item)
  return {
    success: true,
    item: saved,
  }
})

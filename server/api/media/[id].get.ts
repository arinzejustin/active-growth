import { defineEventHandler, createError, setHeader, getRouterParam } from 'h3'
import { getMediaFile } from '../../utils/mediaStore'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Media ID required' })
  }

  const media = await getMediaFile(id)
  if (!media) {
    throw createError({ statusCode: 404, statusMessage: 'Media file not found' })
  }

  setHeader(event, 'Content-Type', media.contentType)
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  return media.data
})

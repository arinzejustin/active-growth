import { defineEventHandler, createError, getRouterParam } from 'h3'
import { deleteContentItem } from '../../utils/contentStore'
import { requireAdminAuth } from '../../utils/adminAuth'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Item ID required' })
  }

  await deleteContentItem(id)
  return { success: true }
})

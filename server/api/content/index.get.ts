import { defineEventHandler, getQuery } from 'h3'
import { getAllContentItems } from '../../utils/contentStore'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const typeFilter = query.type ? String(query.type) : undefined
  const items = await getAllContentItems(typeFilter)
  return {
    success: true,
    items,
  }
})

import { defineNitroPlugin } from 'nitropack/runtime/plugin'
import { initDb } from '../utils/db'

export default defineNitroPlugin(async (nitroApp) => {
  console.log('[Nitro Plugin] Initializing database...')
  await initDb()
})

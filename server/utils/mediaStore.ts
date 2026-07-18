import fs from 'node:fs'
import path from 'node:path'
import { sql } from './db'

export interface MediaFileRecord {
  id: string
  filename: string
  contentType: string
  sizeBytes: number
  dataBase64: string
  createdAt: string
}

const MEDIA_DIR = path.resolve(process.cwd(), '.data/media')

function ensureMediaDir() {
  try {
    if (!fs.existsSync(MEDIA_DIR)) {
      fs.mkdirSync(MEDIA_DIR, { recursive: true })
    }
  } catch (err) {
    // On Vercel or read-only serverless environments, fs.mkdirSync may throw EROFS. We safely ignore and rely on database storage.
  }
}

export async function saveMediaFile(file: {
  filename: string
  contentType: string
  data: Buffer
}): Promise<{ id: string; url: string; mediaType: 'image' | 'video' }> {
  ensureMediaDir()

  const id = 'media_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8)
  const isVideo = file.contentType.startsWith('video/') || /\.(mp4|webm|mov|mkv)$/i.test(file.filename)
  const mediaType: 'image' | 'video' = isVideo ? 'video' : 'image'

  const base64Data = file.data.toString('base64')

  // Attempt local file copy (works on local dev or persistent disks)
  const ext = path.extname(file.filename) || (isVideo ? '.mp4' : '.jpg')
  const diskFilename = `${id}${ext}`
  const diskPath = path.join(MEDIA_DIR, diskFilename)
  try {
    if (fs.existsSync(MEDIA_DIR)) {
      fs.writeFileSync(diskPath, file.data)
    }
  } catch (e) {
    console.warn('[Storage] Read-only filesystem detected or write error (expected on Vercel if not using /tmp): delegating to database.')
  }

  if (sql) {
    try {
      await sql`
        INSERT INTO media_files (id, filename, content_type, size_bytes, data_base64, created_at)
        VALUES (${id}, ${file.filename}, ${file.contentType}, ${file.data.length}, ${base64Data}, NOW());
      `
    } catch (err) {
      console.error('[DB] Could not store media file in Postgres:', err)
    }
  } else {
    console.warn('[Storage] DATABASE_URL is not set. On Vercel, uploaded files will only exist in temporary memory unless DATABASE_URL is configured.')
  }

  return {
    id,
    url: `/api/media/${id}`,
    mediaType,
  }
}

export async function getMediaFile(id: string): Promise<{
  data: Buffer
  contentType: string
  filename: string
} | null> {
  // Check local disk first for speed
  try {
    ensureMediaDir()
    if (fs.existsSync(MEDIA_DIR)) {
      const files = fs.readdirSync(MEDIA_DIR)
      const foundDiskFile = files.find(f => f.startsWith(id))
      if (foundDiskFile) {
        const fullPath = path.join(MEDIA_DIR, foundDiskFile)
        const data = fs.readFileSync(fullPath)
        const isVideo = /\.(mp4|webm|mov|mkv)$/i.test(foundDiskFile)
        return {
          data,
          contentType: isVideo ? 'video/mp4' : 'image/jpeg',
          filename: foundDiskFile,
        }
      }
    }
  } catch (err) {
    // Safely continue to check database
  }

  // Check database
  if (sql) {
    try {
      const rows = await sql`
        SELECT filename, content_type as "contentType", data_base64 as "dataBase64"
        FROM media_files
        WHERE id = ${id}
        LIMIT 1;
      `
      if (rows && rows.length > 0) {
        const row = rows[0]
        return {
          data: Buffer.from(row.dataBase64, 'base64'),
          contentType: row.contentType || 'application/octet-stream',
          filename: row.filename || id,
        }
      }
    } catch (err) {
      console.error('[DB] Error loading media file:', err)
    }
  }

  return null
}

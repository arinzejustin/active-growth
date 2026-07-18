import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { saveMediaFile } from '../../utils/mediaStore'
import { requireAdminAuth } from '../../utils/adminAuth'

const MAX_IMAGE_BYTES = 10 * 1024 * 1024 // 10MB limit for images
const MAX_VIDEO_BYTES = 25 * 1024 * 1024 // 25MB limit for videos

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const multipartData = await readMultipartFormData(event)
  if (!multipartData || multipartData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file uploaded. Please select an image or video file.',
    })
  }

  const filePart = multipartData.find(part => part.name === 'file' || part.filename)
  if (!filePart || !filePart.data || !filePart.filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid file upload request.',
    })
  }

  const contentType = filePart.type || 'application/octet-stream'
  const isVideo = contentType.startsWith('video/') || /\.(mp4|webm|mov|mkv)$/i.test(filePart.filename)
  const maxBytes = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES

  if (filePart.data.length > maxBytes) {
    const limitMb = maxBytes / (1024 * 1024)
    throw createError({
      statusCode: 400,
      statusMessage: `File size (${(filePart.data.length / (1024 * 1024)).toFixed(1)}MB) exceeds the maximum allowed limit of ${limitMb}MB for ${isVideo ? 'videos' : 'images'}.`,
    })
  }

  const saved = await saveMediaFile({
    filename: filePart.filename,
    contentType,
    data: filePart.data,
  })

  return {
    success: true,
    fileId: saved.id,
    url: saved.url,
    mediaType: saved.mediaType,
    filename: filePart.filename,
    sizeBytes: filePart.data.length,
  }
})

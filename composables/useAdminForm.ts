import { ref } from 'vue'
import { useContentItems, type ContentItem } from '~/composables/useContentItems'

function getAdminAuthHeaders(): Record<string, string> {
  if (typeof localStorage === 'undefined') return {}
  const token = localStorage.getItem('ag_admin_token') || ''
  return token ? { 'Authorization': `Bearer ${token}`, 'x-admin-token': token } : {}
}

export function useAdminForm(type: 'story' | 'program' | 'news') {
  const { stories, programs, news, isLoading, errorMessage, fetchAllContent, saveItem, deleteItem } = useContentItems()

  const editingId = ref<string | null>(null)
  const formTitle = ref('')
  const formSubtitle = ref(type === 'story' ? 'Community beneficiary' : type === 'program' ? 'Core Initiative' : 'Community Update')
  const formQuote = ref('')
  const formContent = ref('')
  const formMediaType = ref<'image' | 'video'>('image')
  const formMediaUrl = ref('')
  const formAccent = ref('teal')
  const formCategory = ref('')
  const formAuthor = ref('')
  const formDate = ref(new Date().toISOString().split('T')[0])

  const uploadFileObj = ref<File | null>(null)
  const isUploading = ref(false)
  const uploadError = ref('')
  const uploadProgressMsg = ref('')
  const isSaving = ref(false)
  const successNotice = ref('')

  const MAX_IMAGE_BYTES = 10 * 1024 * 1024
  const MAX_VIDEO_BYTES = 25 * 1024 * 1024

  function resetForm() {
    editingId.value = null
    formTitle.value = ''
    formSubtitle.value = type === 'story' ? 'Community beneficiary' : type === 'program' ? 'Core Initiative' : 'Community Update'
    formQuote.value = ''
    formContent.value = ''
    formMediaType.value = 'image'
    formMediaUrl.value = ''
    formAccent.value = 'teal'
    formCategory.value = ''
    formAuthor.value = ''
    formDate.value = new Date().toISOString().split('T')[0]
    uploadFileObj.value = null
    uploadError.value = ''
    uploadProgressMsg.value = ''
  }

  function editItem(item: ContentItem) {
    editingId.value = item.id
    formTitle.value = item.title || ''
    formSubtitle.value = item.subtitle || ''
    formQuote.value = item.quote || ''
    formContent.value = item.content || ''
    formMediaType.value = item.mediaType || 'image'
    formMediaUrl.value = item.mediaUrl || ''
    formAccent.value = item.accent || 'teal'
    formCategory.value = item.category || ''
    formAuthor.value = item.author || ''
    formDate.value = item.date || new Date().toISOString().split('T')[0]
    uploadFileObj.value = null
    uploadError.value = ''
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  async function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    uploadError.value = ''
    uploadProgressMsg.value = ''

    const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|mkv)$/i.test(file.name)
    const maxBytes = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES

    if (file.size > maxBytes) {
      const limitMb = maxBytes / (1024 * 1024)
      uploadError.value = `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds limit of ${limitMb}MB for ${isVideo ? 'videos' : 'images'}.`
      uploadFileObj.value = null
      return
    }

    formMediaType.value = isVideo ? 'video' : 'image'
    uploadFileObj.value = file
  }

  async function performFileUpload(): Promise<string | null> {
    if (!uploadFileObj.value) return formMediaUrl.value || null

    isUploading.value = true
    uploadError.value = ''
    uploadProgressMsg.value = `Uploading ${uploadFileObj.value.name} (${(uploadFileObj.value.size / (1024 * 1024)).toFixed(2)}MB)...`

    try {
      const formData = new FormData()
      formData.append('file', uploadFileObj.value)

      const res = await $fetch<{
        success: boolean
        url: string
        mediaType: 'image' | 'video'
      }>('/api/admin/upload', {
        method: 'POST',
        body: formData,
        headers: getAdminAuthHeaders(),
      })

      if (res && res.url) {
        formMediaUrl.value = res.url
        formMediaType.value = res.mediaType
        uploadProgressMsg.value = 'Upload completed successfully!'
        return res.url
      }
    } catch (err: any) {
      uploadError.value = err?.statusMessage || err?.message || 'File upload failed'
      return null
    } finally {
      isUploading.value = false
    }
    return formMediaUrl.value
  }

  async function handleSubmit() {
    if (!formTitle.value.trim()) {
      alert('Please enter a title or name.')
      return
    }

    isSaving.value = true
    successNotice.value = ''
    uploadError.value = ''

    try {
      const uploadedUrl = await performFileUpload()

      await saveItem({
        id: editingId.value || undefined,
        type,
        title: formTitle.value.trim(),
        subtitle: formSubtitle.value.trim(),
        quote: formQuote.value.trim(),
        content: formContent.value.trim(),
        mediaUrl: uploadedUrl || 'https://activegrowthgroups.my.canva.site/_assets/media/113747c97c567daf71b6305fb478fe7a.jpg',
        mediaType: formMediaType.value,
        accent: formAccent.value,
        category: formCategory.value,
        author: formAuthor.value,
        date: formDate.value,
      })

      const typeName = type === 'story' ? 'Impact Story' : type === 'program' ? 'Program Initiative' : 'News Article'
      successNotice.value = `${typeName} saved successfully!`
      resetForm()
      setTimeout(() => {
        successNotice.value = ''
      }, 4000)
    } catch (err: any) {
      uploadError.value = err?.statusMessage || err?.message || 'Failed to save item'
    } finally {
      isSaving.value = false
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return
    await deleteItem(id)
  }

  return {
    stories,
    programs,
    news,
    isLoading,
    errorMessage,
    fetchAllContent,
    editingId,
    formTitle,
    formSubtitle,
    formQuote,
    formContent,
    formMediaType,
    formMediaUrl,
    formAccent,
    formCategory,
    formAuthor,
    formDate,
    uploadFileObj,
    isUploading,
    uploadError,
    uploadProgressMsg,
    isSaving,
    successNotice,
    resetForm,
    editItem,
    handleFileSelect,
    handleSubmit,
    handleDelete,
  }
}

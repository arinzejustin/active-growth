import { ref, onMounted } from 'vue'

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

function getAdminAuthHeaders(): Record<string, string> {
  if (typeof localStorage === 'undefined') return {}
  const token = localStorage.getItem('ag_admin_token') || ''
  return token ? { 'Authorization': `Bearer ${token}`, 'x-admin-token': token } : {}
}

export function useContentItems() {
  const stories = ref<ContentItem[]>([])
  const programs = ref<ContentItem[]>([])
  const news = ref<ContentItem[]>([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  onMounted(() => {
    if (stories.value.length === 0 && programs.value.length === 0 && news.value.length === 0 && !isLoading.value) {
      fetchAllContent()
    }
  })

  async function fetchAllContent() {
    isLoading.value = true
    errorMessage.value = ''
    try {
      const res = await $fetch<{ success: boolean; items: ContentItem[] }>('/api/content')
      if (res && res.items) {
        stories.value = res.items.filter(i => i.type === 'story')
        programs.value = res.items.filter(i => i.type === 'program')
        news.value = res.items.filter(i => i.type === 'news')
      }
    } catch (err: any) {
      errorMessage.value = err?.statusMessage || err?.message || 'Failed to load content items'
    } finally {
      isLoading.value = false
    }
  }

  async function saveItem(item: Partial<ContentItem> & { type: 'story' | 'program' | 'news'; title: string }) {
    const res = await $fetch<{ success: boolean; item: ContentItem }>('/api/content', {
      method: 'POST',
      body: item,
      headers: getAdminAuthHeaders(),
    })
    await fetchAllContent()
    return res.item
  }

  async function deleteItem(id: string) {
    await $fetch(`/api/content/${id}`, {
      method: 'DELETE',
      headers: getAdminAuthHeaders(),
    })
    await fetchAllContent()
  }

  return {
    stories,
    programs,
    news,
    isLoading,
    errorMessage,
    fetchAllContent,
    saveItem,
    deleteItem,
  }
}

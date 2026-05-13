import { computed, onMounted, ref, watch } from 'vue'

type ThemeMode = 'dark' | 'light'

const storageKey = 'active-growth-theme'
const theme = ref<ThemeMode>('dark')
const mounted = ref(false)

export const useTheme = () => {
  const applyTheme = (mode: ThemeMode) => {
    theme.value = mode

    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', mode === 'dark')
      localStorage.setItem(storageKey, mode)
    }
  }

  onMounted(() => {
    const storedTheme = localStorage.getItem(storageKey) as ThemeMode | null
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(storedTheme ?? (preferredDark ? 'dark' : 'light'))
    mounted.value = true
  })

  watch(theme, (value) => {
    if (mounted.value) {
      document.documentElement.classList.toggle('dark', value === 'dark')
    }
  })

  return {
    isDark: computed(() => theme.value === 'dark'),
    theme: computed(() => theme.value),
    toggleTheme: () => applyTheme(theme.value === 'dark' ? 'light' : 'dark'),
  }
}

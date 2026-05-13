<script setup lang="ts">
const props = defineProps<{
  links: Array<{ label: string; href: string }>
}>()

const isOpen = ref(false)
const { isDark, toggleTheme } = useTheme()

const closeMenu = () => {
  isOpen.value = false
}

watch(
  () => props.links,
  () => {
    closeMenu()
  },
)
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <div class="shell pt-4">
      <div
        class="surface-card flex items-center justify-between rounded-full px-4 py-3 sm:px-5"
      >
        <a href="#top" class="flex items-center gap-3" aria-label="Active Growth Groups home">
          <span
            class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg shadow-accent/15 ring-1 ring-accent/15"
          >
            <img
              src="/favicon.svg"
              alt="Active Growth Groups leaf logo"
              class="h-7 w-7"
            >
          </span>
          <div class="hidden sm:block">
            <p class="font-display text-sm font-semibold tracking-[-0.03em]">Active Growth Groups</p>
            <p class="text-xs text-muted">Community development and youth empowerment</p>
          </div>
        </a>

        <nav class="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="text-sm font-semibold text-muted transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="hidden h-11 w-11 items-center justify-center rounded-full border border-line/70 bg-surfaceStrong/80 text-ink transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:inline-flex"
            :aria-pressed="isDark"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              class="h-5 w-5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              class="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
          </button>
          <a
            href="#contact"
            class="action-button hidden bg-ink text-canvas sm:inline-flex dark:bg-white dark:text-slate-950"
          >
            Contact us
          </a>
          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/70 text-ink lg:hidden"
            :aria-expanded="isOpen"
            aria-label="Toggle navigation menu"
            @click="isOpen = !isOpen"
          >
            <span class="space-y-1.5">
              <span class="block h-0.5 w-5 bg-current" />
              <span class="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      <div
        v-if="isOpen"
        class="surface-card mt-3 rounded-3xl p-4 lg:hidden"
      >
        <nav class="grid gap-3" aria-label="Mobile navigation">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="rounded-2xl px-3 py-3 text-sm font-semibold text-ink transition hover:bg-accent/10"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
          <button
            type="button"
            class="mt-2 inline-flex h-11 w-full items-center justify-center gap-3 rounded-full border border-line/70 bg-surfaceStrong/70 px-4 text-sm font-bold text-ink transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              class="h-4 w-4"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              class="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
            <span>{{ isDark ? 'Light mode' : 'Dark mode' }}</span>
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

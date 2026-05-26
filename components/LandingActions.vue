<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  cards: Array<{ title: string; body: string; cta: string }>
}>()

const emit = defineEmits<{
  (e: 'donate-click'): void
}>()

const isShareOpen = ref(false)
const showCopiedAlert = ref(false)
const shareContainer = ref<HTMLElement | null>(null)

const shareUrl = 'https://activegrowthgroups.com.ng'
const shareText = 'Check out Active Growth Groups - community development and youth empowerment!'

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl)
    showCopiedAlert.value = true
    setTimeout(() => {
      showCopiedAlert.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

const handleAction = (card: { title: string; body: string; cta: string }, event: Event) => {
  const title = card.title.toLowerCase()
  if (title === 'donate') {
    event.preventDefault()
    emit('donate-click')
  } else if (title === 'spread the word') {
    event.preventDefault()
    isShareOpen.value = !isShareOpen.value
  }
}

const getCardHref = (card: { title: string }) => {
  const title = card.title.toLowerCase()
  if (title === 'donate') return '#'
  if (title === 'volunteer') return '/volunteer'
  return '#contact'
}

const isVolunteer = (card: { title: string }) => card.title.toLowerCase() === 'volunteer'

const handleClickOutside = (event: MouseEvent) => {
  if (shareContainer.value && !shareContainer.value.contains(event.target as Node)) {
    isShareOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <section id="get-involved" class="section-space scroll-mt-32">
    <div class="shell space-y-12">
      <div class="reveal reveal-soft">
        <SectionHeader
          eyebrow="Get involved"
          title="Three clear ways to strengthen the mission."
          body="Whether you donate, volunteer, or share the advocacy, each action creates more access, visibility, and momentum."
          align="center"
         />
      </div>

      <div class="grid gap-5 lg:grid-cols-3">
        <article
          v-for="(card, index) in cards"
          :key="card.title"
          class="surface-card interactive-card reveal reveal-scale flex h-full flex-col rounded-[1.8rem] p-6 sm:p-7"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <p class="section-kicker">{{ card.title }}</p>
          <h3 class="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-ink">
            {{ card.cta }}
          </h3>
          <p class="mt-4 flex-1 text-sm leading-7 text-muted">{{ card.body }}</p>
          <div class="mt-6 h-px w-full bg-gradient-to-r from-accent/40 via-line/20 to-transparent" />

          <!-- Use NuxtLink for volunteer, custom popover for share, regular anchor for others -->
          <NuxtLink
            v-if="isVolunteer(card)"
            to="/volunteer"
            class="action-button mt-8 justify-between border border-line/70 bg-surfaceStrong/70 text-ink"
          >
            <span>{{ card.title }}</span>
            <span aria-hidden="true">-></span>
          </NuxtLink>
          <div v-else-if="card.title.toLowerCase() === 'spread the word'" ref="shareContainer" class="relative mt-8">
            <button
              type="button"
              class="action-button w-full justify-between border border-line/70 bg-surfaceStrong/70 text-ink cursor-pointer"
              @click="handleAction(card, $event)"
            >
              <span>{{ card.title }}</span>
              <span aria-hidden="true">-></span>
            </button>
            
            <!-- Popover Share Overlay -->
            <Transition name="popover">
              <div 
                v-if="isShareOpen"
                class="absolute bottom-full left-0 right-0 z-20 mb-3 rounded-2xl border border-line/80 bg-surface/95 p-4 shadow-xl backdrop-blur-md"
              >
                <!-- Title & Close -->
                <div class="flex items-center justify-between pb-3 border-b border-line/50">
                  <span class="text-xs font-bold text-ink tracking-tight">Share Active Growth</span>
                  <button 
                    type="button" 
                    class="text-muted hover:text-ink transition cursor-pointer"
                    @click.stop="isShareOpen = false"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <!-- Share options grid -->
                <div class="grid grid-cols-4 gap-2 pt-3">
                  <!-- WhatsApp -->
                  <a 
                    :href="`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-accent/10 text-muted hover:text-accent transition-colors"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span class="text-[9px] font-semibold">WhatsApp</span>
                  </a>
                  <!-- Twitter/X -->
                  <a 
                    :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-accent/10 text-muted hover:text-accent transition-colors"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span class="text-[9px] font-semibold">Twitter</span>
                  </a>
                  <!-- Facebook -->
                  <a 
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-accent/10 text-muted hover:text-accent transition-colors"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-[9px] font-semibold">Facebook</span>
                  </a>
                  <!-- Copy Link -->
                  <button 
                    type="button"
                    class="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-accent/10 text-muted hover:text-accent transition-colors cursor-pointer"
                    @click.stop="copyLink"
                  >
                    <svg v-if="!showCopiedAlert" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-accent animate-ping">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-[9px] font-semibold">{{ showCopiedAlert ? 'Copied!' : 'Copy' }}</span>
                  </button>
                </div>
              </div>
            </Transition>
          </div>
          <a
            v-else
            :href="getCardHref(card)"
            class="action-button mt-8 justify-between border border-line/70 bg-surfaceStrong/70 text-ink"
            @click="handleAction(card, $event)"
          >
            <span>{{ card.title }}</span>
            <span aria-hidden="true">-></span>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.popover-enter-active,
.popover-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}
</style>


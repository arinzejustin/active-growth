<script setup lang="ts">
import { computed } from 'vue'

export interface StoryProp {
  id?: string
  name?: string
  title?: string
  quote?: string
  image?: string
  mediaUrl?: string
  mediaType?: 'image' | 'video' | string
  accent?: string
  subtitle?: string
}

const props = defineProps<{
  stories: Array<StoryProp>
}>()

// Take the last 4 stories
const latestFourStories = computed(() => {
  const list = props.stories || []
  return list.slice(0, 4)
})

// Repeat the list so the marquee scrolls seamlessly in an infinite loop on any screen size
const marqueeTrack = computed(() => {
  const base = latestFourStories.value
  if (base.length === 0) return []
  return [...base, ...base, ...base, ...base]
})

function isVideo(story: StoryProp) {
  if (story.mediaType === 'video') return true
  const url = story.mediaUrl || story.image || ''
  return /\.(mp4|webm|mov|mkv)$/i.test(url)
}

function getMedia(story: StoryProp) {
  return story.mediaUrl || story.image || ''
}

function getName(story: StoryProp) {
  return story.title || story.name || 'Community Beneficiary'
}

function getSubtitle(story: StoryProp) {
  return story.subtitle || 'Community beneficiary'
}
</script>

<template>
  <section class="section-space relative overflow-hidden">
    <div class="shell space-y-10">
      <!-- Section Header -->
      <div class="reveal reveal-left flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <SectionHeader
            eyebrow="Impact stories"
            title="Real human outcomes, moving communities forward."
            body="Every effort contributes to a stronger community. Watch our moving stream of lived beneficiary stories."
          />
        </div>
        <div class="shrink-0">
          <NuxtLink
            to="/stories"
            class="inline-flex items-center gap-2 rounded-full border border-line/80 bg-surfaceStrong/80 px-6 py-3.5 text-sm font-bold text-ink transition duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surfaceStrong hover:text-accent shadow-sm"
          >
            <span>Explore all stories</span>
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Moving Marquee Container -->
      <div class="relative -mx-4 sm:-mx-8 overflow-hidden py-4">
        <!-- Fade masks on left & right edges -->
        <div class="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-r from-canvas to-transparent" />
        <div class="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 sm:w-24 bg-gradient-to-l from-canvas to-transparent" />

        <!-- Marquee Track -->
        <div
          v-if="marqueeTrack.length > 0"
          class="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused]"
        >
          <article
            v-for="(story, index) in marqueeTrack"
            :key="`${getName(story)}-${index}`"
            class="surface-card interactive-card group w-[22rem] sm:w-[28rem] shrink-0 overflow-hidden rounded-[2rem] flex flex-col justify-between"
          >
            <!-- Media Top -->
            <div class="relative h-56 w-full overflow-hidden bg-surfaceStrong">
              <div v-if="isVideo(story)" class="relative h-full w-full">
                <video
                  :src="getMedia(story)"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  controls
                  preload="metadata"
                  playsinline
                  muted
                />
                <span
                  class="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 text-xs font-bold text-white backdrop-blur-md"
                >
                  <span class="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                  Video Story
                </span>
              </div>
              <div v-else class="h-full w-full">
                <img
                  :src="getMedia(story)"
                  :alt="getName(story)"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Content Bottom -->
            <div class="flex flex-col justify-between p-6 flex-1">
              <div>
                <div
                  class="mb-3 h-1.5 w-12 rounded-full"
                  :class="story.accent === 'lime' ? 'bg-lime' : story.accent === 'aurora' ? 'bg-aurora' : 'bg-accent'"
                />
                <p class="text-base leading-7 text-ink italic line-clamp-3">
                  "{{ story.quote }}"
                </p>
              </div>

              <div class="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
                <div>
                  <p class="font-display text-lg font-bold text-ink">
                    {{ getName(story) }}
                  </p>
                  <p class="text-xs text-muted">{{ getSubtitle(story) }}</p>
                </div>
                <NuxtLink
                  to="/stories"
                  class="text-xs font-bold text-accent hover:underline"
                >
                  Full Story →
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="surface-card p-12 text-center text-muted rounded-[2rem]">
          No stories available yet.
        </div>
      </div>
    </div>
  </section>
</template>

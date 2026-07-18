<script setup lang="ts">
import type { ContentItem } from '~/composables/useContentItems'

defineProps<{
  news: ContentItem[]
}>()
</script>

<template>
  <section class="section-space relative overflow-hidden">
    <div class="shell space-y-12">
      <div class="reveal reveal-left flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <SectionHeader
            eyebrow="Latest Updates"
            title="News & community announcements."
            body="Stay up to date with community progress, upcoming leadership workshops, and outreach milestones."
          />
        </div>
        <div class="shrink-0">
          <NuxtLink
            to="/news"
            class="inline-flex items-center gap-2 rounded-full border border-line/80 bg-surfaceStrong/80 px-6 py-3.5 text-sm font-bold text-ink transition duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surfaceStrong hover:text-accent shadow-sm"
          >
            <span>View all news</span>
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l7-7m7-7H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <div v-if="news && news.length > 0" class="grid gap-6 lg:grid-cols-3">
        <article
          v-for="(item, index) in news.slice(0, 3)"
          :key="item.id"
          class="surface-card interactive-card overflow-hidden rounded-[2rem] flex flex-col justify-between"
          :style="{ transitionDelay: `${index * 120}ms` }"
        >
          <div v-if="item.mediaUrl" class="h-48 w-full overflow-hidden bg-surfaceStrong">
            <img
              :src="item.mediaUrl"
              :alt="item.title"
              class="h-full w-full object-cover transition duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>

          <div class="p-6 sm:p-7 space-y-3 flex-1">
            <div class="flex items-center justify-between text-xs text-muted">
              <span class="metric-chip">{{ item.category || 'Update' }}</span>
              <span>{{ item.date }}</span>
            </div>
            <h3 class="font-display text-lg font-bold text-ink leading-snug line-clamp-2">
              {{ item.title }}
            </h3>
            <p v-if="item.subtitle" class="text-xs font-semibold text-accent">{{ item.subtitle }}</p>
            <p class="text-sm text-muted leading-relaxed line-clamp-3">
              {{ item.content }}
            </p>
          </div>

          <div class="px-6 pb-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs">
            <span class="text-muted">By {{ item.author || 'Editorial Team' }}</span>
            <NuxtLink to="/news" class="font-bold text-accent hover:underline">
              Read article →
            </NuxtLink>
          </div>
        </article>
      </div>

      <div v-else class="surface-card rounded-[2rem] p-10 sm:p-14 border border-line/80 bg-surfaceStrong/50 text-center space-y-3">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 class="font-display text-xl font-bold text-ink">No News Articles Available</h3>
        <p class="text-sm text-muted max-w-lg mx-auto">
          We are currently gathering our latest community outreach updates and announcements. Check back soon for new stories and event updates!
        </p>
      </div>
    </div>
  </section>
</template>

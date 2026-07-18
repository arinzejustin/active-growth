<script setup lang="ts">
import { onMounted } from 'vue'
import { useContentItems } from '~/composables/useContentItems'
import { pageUrl, siteName, seoImageUrl, seoImageAlt } from '~/utils/site'

const { news, fetchAllContent, isLoading } = useContentItems()

const pageTitle = `News & Updates | ${siteName}`
const pageDescription =
  'Stay informed on community milestones, upcoming workshops, impact reports, and local initiatives from Active Growth Groups.'

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: pageUrl('/news'),
  ogImage: seoImageUrl,
  ogImageAlt: seoImageAlt,
})

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "News", href: "/news" },
  { label: "Stories", href: "/stories" },
  { label: "Get involved", href: "/volunteer" },
  { label: "FAQ", href: "/faq" },
];

onMounted(() => {
  fetchAllContent()
})
</script>

<template>
  <div class="relative overflow-hidden min-h-screen flex flex-col justify-between">
    <LandingNav :links="navLinks" />

    <main class="pt-28 pb-20">
      <section class="section-space pb-12">
        <div class="shell">
          <div class="mx-auto max-w-3xl text-center">
            <span class="section-kicker">Updates & Announcements</span>
            <h1 class="mt-4 font-display text-4xl font-bold tracking-[-0.04em] text-ink sm:text-6xl">
              Latest news from the community.
            </h1>
            <p class="mt-6 text-lg leading-8 text-muted">
              Follow our community expansion, workshop schedules, and lived impact updates across our mentorship network.
            </p>
          </div>
        </div>
      </section>

      <section class="py-12">
        <div class="shell">
          <div v-if="isLoading" class="flex justify-center py-20">
            <div class="flex items-center gap-3 text-muted">
              <span class="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
              <span>Loading news...</span>
            </div>
          </div>

          <div v-else-if="news && news.length > 0" class="grid gap-8 lg:grid-cols-3">
            <article
              v-for="item in news"
              :key="item.id"
              class="surface-card interactive-card overflow-hidden rounded-[2.5rem] flex flex-col justify-between"
            >
              <div v-if="item.mediaUrl" class="h-56 w-full overflow-hidden bg-surfaceStrong">
                <img
                  :src="item.mediaUrl"
                  :alt="item.title"
                  class="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div class="p-7 space-y-4 flex-1">
                <div class="flex items-center justify-between text-xs text-muted">
                  <span class="metric-chip">{{ item.category || 'Announcement' }}</span>
                  <span>{{ item.date }}</span>
                </div>
                <h2 class="font-display text-xl font-bold text-ink leading-snug">{{ item.title }}</h2>
                <p v-if="item.subtitle" class="text-sm font-semibold text-accent">{{ item.subtitle }}</p>
                <p class="text-sm text-muted leading-relaxed line-clamp-4">{{ item.content }}</p>
              </div>

              <div class="px-7 pb-7 pt-4 border-t border-line/60 flex items-center justify-between text-xs text-muted">
                <span>By {{ item.author || 'Editorial Team' }}</span>
                <span class="font-bold text-accent">Read more →</span>
              </div>
            </article>
          </div>

          <div v-else class="surface-card rounded-[2.5rem] p-12 sm:p-16 border border-line/80 bg-surfaceStrong/50 text-center space-y-4 max-w-2xl mx-auto">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
              <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 class="font-display text-2xl font-bold text-ink">No News Updates Available Right Now</h3>
            <p class="text-base text-muted leading-relaxed">
              Our editorial and community outreach teams are gathering the latest announcements, progress reports, and event summaries. Check back soon for exciting updates!
            </p>
            <div class="pt-4">
              <NuxtLink to="/contact" class="inline-flex items-center gap-2 rounded-full border border-line/80 bg-surfaceStrong px-6 py-3 text-sm font-bold text-ink transition hover:border-accent hover:text-accent">
                Subscribe or Reach Out
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>

    <LandingFooter :links="navLinks" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useContentItems } from "~/composables/useContentItems";

const { stories, programs, news, isLoading, fetchAllContent } =
  useContentItems();

onMounted(() => {
  fetchAllContent()
})
</script>

<template>
  <div class="space-y-8">
    <!-- Overview Banner -->
    <div
      class="surface-card relative overflow-hidden rounded-[2.5rem] p-8 sm:p-10 bg-gradient-to-br from-surface to-surfaceStrong border-line/80 shadow-xl"
    >
      <div class="grid gap-8 lg:grid-cols-12 items-center">
        <div class="lg:col-span-7 space-y-3">
          <span class="section-kicker">Multi-Route Portal</span>
          <h1 class="font-display text-3xl font-bold text-ink sm:text-4xl">
            Admin Dashboard Hub
          </h1>
          <p class="text-sm text-muted leading-relaxed">
            Welcome to the separated entry routes for Active Growth content
            management. Each content section now has its own dedicated URL and
            workflow so you can bookmark or manage specific sections directly
            without tab clutter.
          </p>
        </div>

        <!-- Counters -->
        <div class="lg:col-span-5 grid grid-cols-3 gap-3">
          <NuxtLink
            to="/admin/stories"
            class="rounded-2xl border border-line/60 bg-surfaceStrong/80 p-4 text-center transition hover:border-accent hover:scale-[1.02]"
          >
            <p class="font-display text-2xl font-bold text-accent">
              {{ stories.length }}
            </p>
            <p class="text-xs font-semibold text-muted mt-1">Stories</p>
          </NuxtLink>
          <NuxtLink
            to="/admin/programs"
            class="rounded-2xl border border-line/60 bg-surfaceStrong/80 p-4 text-center transition hover:border-lime hover:scale-[1.02]"
          >
            <p class="font-display text-2xl font-bold text-lime">
              {{ programs.length }}
            </p>
            <p class="text-xs font-semibold text-muted mt-1">Programs</p>
          </NuxtLink>
          <NuxtLink
            to="/admin/news"
            class="rounded-2xl border border-line/60 bg-surfaceStrong/80 p-4 text-center transition hover:border-aurora hover:scale-[1.02]"
          >
            <p class="font-display text-2xl font-bold text-aurora">
              {{ news.length }}
            </p>
            <p class="text-xs font-semibold text-muted mt-1">News</p>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Entry Point Cards -->
    <div class="grid gap-6 md:grid-cols-3">
      <!-- Stories Portal Card -->
      <div
        class="surface-card rounded-[2rem] p-7 border border-line/80 flex flex-col justify-between space-y-6 transition hover:border-accent"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span
              class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </span>
            <span
              class="text-xs font-mono font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full"
              >/admin/stories</span
            >
          </div>
          <h2 class="font-display text-xl font-bold text-ink">
            Impact Stories Manager
          </h2>
          <p class="text-xs text-muted leading-relaxed">
            Upload photo and video testimonials from community beneficiaries.
            Includes beneficiary quote formatting and multi-media support.
          </p>
        </div>
        <NuxtLink
          to="/admin/stories"
          class="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-accent-soft w-full"
        >
          <span>Manage Stories ({{ stories.length }})</span>
          <span>→</span>
        </NuxtLink>
      </div>

      <!-- Programs Portal Card -->
      <div
        class="surface-card rounded-[2rem] p-7 border border-line/80 flex flex-col justify-between space-y-6 transition hover:border-lime"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span
              class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-lime/15 text-lime"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </span>
            <span
              class="text-xs font-mono font-bold text-lime bg-lime/10 px-2.5 py-1 rounded-full"
              >/admin/programs</span
            >
          </div>
          <h2 class="font-display text-xl font-bold text-ink">
            Programs Initiative Portal
          </h2>
          <p class="text-xs text-muted leading-relaxed">
            Create and maintain core mentorship pillars, educational
            initiatives, and community workshops that show on the homepage and
            programs page.
          </p>
        </div>
        <NuxtLink
          to="/admin/programs"
          class="inline-flex items-center justify-center gap-2 rounded-2xl bg-lime px-5 py-3 text-xs font-bold text-slate-950 transition hover:opacity-90 w-full"
        >
          <span>Manage Programs ({{ programs.length }})</span>
          <span>→</span>
        </NuxtLink>
      </div>

      <!-- News Portal Card -->
      <div
        class="surface-card rounded-[2rem] p-7 border border-line/80 flex flex-col justify-between space-y-6 transition hover:border-aurora"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span
              class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-aurora/15 text-aurora"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </span>
            <span
              class="text-xs font-mono font-bold text-aurora bg-aurora/10 px-2.5 py-1 rounded-full"
              >/admin/news</span
            >
          </div>
          <h2 class="font-display text-xl font-bold text-ink">
            News & Updates Portal
          </h2>
          <p class="text-xs text-muted leading-relaxed">
            Publish community announcements, press releases, and outreach
            milestones. Appears right on the homepage and news section.
          </p>
        </div>
        <NuxtLink
          to="/admin/news"
          class="inline-flex items-center justify-center gap-2 rounded-2xl bg-aurora px-5 py-3 text-xs font-bold text-slate-950 transition hover:opacity-90 w-full"
        >
          <span>Manage News ({{ news.length }})</span>
          <span>→</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

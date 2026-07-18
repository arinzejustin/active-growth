<script setup lang="ts">
export interface PillarItem {
  id?: string
  title: string
  body?: string
  content?: string
  subtitle?: string
  category?: string
  mediaUrl?: string
}

defineProps<{
  pillars: Array<PillarItem>
}>()
</script>

<template>
  <section id="mission" class="section-space scroll-mt-32">
    <div class="shell space-y-14">
      <div class="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div class="reveal reveal-left">
          <SectionHeader
            eyebrow="Our programs"
            title="Building brighter tomorrows through direct support, practical tools, and shared momentum."
            body="By providing mentorship programs, workshops, community events, online resources, networking opportunities, support groups, career development, and after-school tutoring, Active Growth Groups helps underserved communities move toward a brighter tomorrow."
          />
        </div>

        <div class="reveal reveal-right surface-card rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <p class="section-kicker">Our belief</p>
            <p class="mt-5 text-lg leading-8 text-ink">
              We believe everyone has potential. Growth is a lifelong journey, and
              stronger communities are built when people have access to education, support,
              and opportunities to connect.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-line/60 flex justify-end">
            <NuxtLink to="/programs" class="text-sm font-bold text-accent hover:underline">
              Explore all programs →
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-if="pillars && pillars.length > 0" class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="(pillar, index) in pillars"
          :key="pillar.id || pillar.title"
          class="surface-card interactive-card reveal reveal-soft rounded-[1.8rem] p-6 flex flex-col justify-between"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div>
            <div class="flex items-center justify-between">
              <p class="text-sm font-black uppercase tracking-[0.2em] text-accent">0{{ index + 1 }}</p>
              <span v-if="pillar.category" class="metric-chip text-[10px]">{{ pillar.category }}</span>
            </div>
            <h3 class="mt-5 font-display text-2xl font-semibold tracking-[-0.04em] text-ink">
              {{ pillar.title }}
            </h3>
            <p class="mt-4 text-sm leading-7 text-muted">
              {{ pillar.content || pillar.body }}
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
            <NuxtLink to="/programs" class="text-xs font-bold text-accent hover:underline">
              Learn more →
            </NuxtLink>
          </div>
        </article>
      </div>

      <div v-else class="surface-card rounded-[2rem] p-10 sm:p-14 border border-line/80 bg-surfaceStrong/50 text-center space-y-3">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="font-display text-xl font-bold text-ink">No Programs Published Yet</h3>
        <p class="text-sm text-muted max-w-lg mx-auto">
          Our team is actively updating our core initiatives and support networks. Please check back shortly for our upcoming mentorship schedules and community workshops.
        </p>
      </div>
    </div>
  </section>
</template>

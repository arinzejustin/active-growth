<script setup lang="ts">
defineProps<{
  stories: Array<{ name: string; quote: string; image: string; accent: string }>
}>()
</script>

<template>
  <section class="section-space">
    <div class="shell space-y-12">
      <div class="reveal reveal-left">
        <SectionHeader
          eyebrow="Impact stories"
          title="Real human outcomes, not just good intentions."
          body="Every effort contributes to a stronger, more compassionate community. These stories reflect the lived impact behind the work."
        />
      </div>

      <div class="grid gap-5 lg:grid-cols-2">
        <article
          v-for="(story, index) in stories"
          :key="story.name"
          class="surface-card interactive-card reveal reveal-scale overflow-hidden rounded-[2rem]"
          :style="{ transitionDelay: `${index * 120}ms` }"
        >
          <div class="grid md:grid-cols-[0.84fr_1.16fr]">
            <img :src="story.image" :alt="story.name" class="h-full min-h-72 w-full object-cover" />
            <div class="flex flex-col justify-between p-6 sm:p-8">
              <div>
                <div
                  class="mb-5 h-1.5 w-16 rounded-full"
                  :class="story.accent === 'lime' ? 'bg-lime' : 'bg-accent'"
                />
                <p class="text-lg leading-8 text-ink">"{{ story.quote }}"</p>
              </div>
              <div class="mt-8">
                <p class="font-display text-2xl font-semibold tracking-[-0.04em] text-ink">
                  {{ story.name }}
                </p>
                <p class="mt-1 text-sm text-muted">Community beneficiary</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

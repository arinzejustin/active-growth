<script setup lang="ts">
defineProps<{
  stats: Array<{ value: string; label: string; body: string }>
}>()
</script>

<template>
  <section class="section-space">
    <div class="shell">
      <div class="grid gap-4 md:grid-cols-3">
        <article
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="surface-card interactive-card reveal reveal-scale rounded-[1.8rem] p-6"
          :style="{ transitionDelay: `${index * 110}ms` }"
        >
          <p class="font-display text-4xl font-semibold tracking-[-0.06em] text-ink lg:text-5xl">
            {{ stat.value }}
          </p>
          <h3 class="mt-3 text-base font-bold text-ink">{{ stat.label }}</h3>
          <p class="mt-2 text-sm leading-7 text-muted">{{ stat.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

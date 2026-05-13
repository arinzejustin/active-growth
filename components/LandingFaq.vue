<script setup lang="ts">
defineProps<{
  items: Array<{ question: string; answer: string }>
}>()
</script>

<template>
  <section class="section-space">
    <div class="shell grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
      <div class="reveal reveal-left">
        <SectionHeader
          eyebrow="FAQ"
          title="Clarity for supporters, volunteers, and community partners."
          body="A premium landing page still needs practical answers. These keep the call-to-action clear and low-friction."
        />
      </div>

      <div class="grid gap-4">
        <details
          v-for="(item, index) in items"
          :key="item.question"
          class="surface-card interactive-card reveal reveal-right group rounded-[1.6rem] p-5"
          :style="{ transitionDelay: `${index * 90}ms` }"
        >
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-display text-xl font-semibold tracking-[-0.03em] text-ink"
          >
            {{ item.question }}
            <span
              class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line/70 text-sm transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p class="mt-4 max-w-2xl text-sm leading-7 text-muted">
            {{ item.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>

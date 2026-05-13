<script setup lang="ts">
defineProps<{
  imageSrc: string
  steps: Array<{ title: string; body: string }>
}>()
</script>

<template>
  <section class="section-space">
    <div class="shell">
      <div class="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div class="reveal reveal-left relative">
          <div class="absolute -left-8 top-8 h-28 w-28 rounded-full bg-accent/20 blur-3xl dark:bg-accent/10" />
          <img
            :src="imageSrc"
            alt="Active Growth Groups community showcase"
            class="surface-card relative aspect-[4/5] w-full rounded-[2rem] object-cover p-2"
          >
        </div>

        <div class="space-y-8">
          <div class="reveal reveal-right">
            <SectionHeader
              eyebrow="In action"
              title="A clear path from support to confidence, connection, and opportunity."
              body="Every initiative is designed to reduce friction for people who need practical help and a trusted community around them."
            />
          </div>

          <div class="grid gap-4">
            <article
              v-for="(step, index) in steps"
              :key="step.title"
              class="surface-card interactive-card reveal reveal-right rounded-[1.8rem] p-5 sm:p-6"
              :style="{ transitionDelay: `${index * 110}ms` }"
            >
              <div class="flex gap-4">
                <div
                  class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-lime text-sm font-black text-white"
                >
                  0{{ index + 1 }}
                </div>
                <div>
                  <h3 class="font-display text-2xl font-semibold tracking-[-0.04em] text-ink">
                    {{ step.title }}
                  </h3>
                  <p class="mt-3 text-sm leading-7 text-muted">{{ step.body }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

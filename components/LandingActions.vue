<script setup lang="ts">
defineProps<{
  cards: Array<{ title: string; body: string; cta: string }>
}>()

const emit = defineEmits<{
  (e: 'donate-click'): void
}>()

const handleAction = (card: { title: string; body: string; cta: string }, event: Event) => {
  if (card.title.toLowerCase() === 'donate') {
    event.preventDefault()
    emit('donate-click')
  }
}

const getCardHref = (card: { title: string }) => {
  const title = card.title.toLowerCase()
  if (title === 'donate') return '#'
  if (title === 'volunteer') return '/volunteer'
  return '#contact'
}

const isVolunteer = (card: { title: string }) => card.title.toLowerCase() === 'volunteer'
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

          <!-- Use NuxtLink for volunteer, regular anchor for others -->
          <NuxtLink
            v-if="isVolunteer(card)"
            to="/volunteer"
            class="action-button mt-8 justify-between border border-line/70 bg-surfaceStrong/70 text-ink"
          >
            <span>{{ card.title }}</span>
            <span aria-hidden="true">-></span>
          </NuxtLink>
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


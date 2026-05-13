<script setup lang="ts">
defineProps<{
  pillars: Array<{ title: string; body: string }>
}>()
</script>

<template>
  <section id="mission" class="section-space scroll-mt-32">
    <div class="shell space-y-14">
      <div class="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div class="reveal reveal-left">
          <SectionHeader
            eyebrow="Our mission"
            title="Building brighter tomorrows through direct support, practical tools, and shared momentum."
            body="By providing mentorship programs, workshops, community events, online resources, networking opportunities, support groups, career development, and after-school tutoring, Active Growth Groups helps underserved communities move toward a brighter tomorrow."
          />
        </div>

        <div class="reveal reveal-right surface-card rounded-[2rem] p-6 sm:p-8">
          <p class="section-kicker">Our belief</p>
          <p class="mt-5 text-lg leading-8 text-ink">
            We believe everyone has potential. Growth is a lifelong journey, and
            stronger communities are built when people have access to education, support,
            and opportunities to connect.
          </p>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="(pillar, index) in pillars"
          :key="pillar.title"
          class="surface-card interactive-card reveal reveal-soft rounded-[1.8rem] p-6"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <p class="text-sm font-black uppercase tracking-[0.2em] text-accent">0{{ index + 1 }}</p>
          <h3 class="mt-5 font-display text-2xl font-semibold tracking-[-0.04em] text-ink">
            {{ pillar.title }}
          </h3>
          <p class="mt-4 text-sm leading-7 text-muted">
            {{ pillar.body }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

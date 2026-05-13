<script setup lang="ts">
defineProps<{
  videoSrc: string
  imageSrc: string
  bullets: string[]
}>()
</script>

<template>
  <section id="top" class="relative scroll-mt-32 overflow-hidden pt-28 sm:pt-32">
    <div class="absolute inset-0 -z-20 bg-grid bg-[length:72px_72px] opacity-[0.06]" />
    <div
      class="absolute inset-x-0 top-24 -z-10 mx-auto h-72 w-72 rounded-full bg-accent/30 blur-3xl dark:bg-accent/20"
    />
    <div
      class="absolute right-0 top-40 -z-10 h-80 w-80 rounded-full bg-aurora/20 blur-3xl dark:bg-aurora/10"
    />
    <div
      class="absolute left-[6%] top-[18%] -z-10 h-40 w-40 rounded-full border border-white/10 bg-white/5 blur-2xl animate-pulse-glow"
    />

    <div class="shell">
      <div class="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div class="reveal reveal-left space-y-8 pt-2">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-line/70 bg-surface/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-accent shadow-halo"
          >
            Empowering people
            <span class="h-1.5 w-1.5 rounded-full bg-lime" />
            Building stronger communities
          </div>

          <div class="space-y-6">
            <h1
              class="max-w-4xl font-display text-5xl font-semibold tracking-[-0.07em] text-ink sm:text-6xl lg:text-7xl xl:text-[5.6rem]"
            >
              A modern support network for
              <span class="bg-gradient-to-r from-accent via-lime to-aurora bg-clip-text text-transparent">
                youth empowerment
              </span>
              and community growth.
            </h1>
            <p class="max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              Active Growth Groups unlocks potential through mentorship, workshops,
              practical support, and community-driven opportunities that help people thrive.
            </p>
          </div>

          <div class="flex flex-col gap-4 sm:flex-row">
            <a href="#get-involved" class="action-button bg-ink text-canvas shadow-halo dark:bg-white dark:text-slate-950">
              Get involved
            </a>
            <a href="#mission" class="action-button border border-line/70 bg-surface/80 text-ink">
              Explore the mission
            </a>
          </div>

          <div class="flex flex-wrap gap-3">
            <span class="metric-chip">Mentorship</span>
            <span class="metric-chip">Workshops</span>
            <span class="metric-chip">Support groups</span>
            <span class="metric-chip">Career development</span>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <div class="surface-card interactive-card rounded-3xl p-4">
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-muted">Programs</p>
              <p class="mt-2 font-display text-3xl font-semibold tracking-[-0.05em]">4 pillars</p>
            </div>
            <div class="surface-card interactive-card rounded-3xl p-4">
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-muted">Community</p>
              <p class="mt-2 font-display text-3xl font-semibold tracking-[-0.05em]">People-first</p>
            </div>
            <div class="surface-card interactive-card rounded-3xl p-4">
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-muted">Impact</p>
              <p class="mt-2 font-display text-3xl font-semibold tracking-[-0.05em]">Long-term</p>
            </div>
          </div>
        </div>

        <div class="reveal reveal-right relative lg:-mt-28">
          <div class="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/30 via-transparent to-aurora/20 blur-2xl" />
          <div class="relative">
            <div class="surface-card accent-frame relative overflow-hidden rounded-[2rem] p-3">
              <div class="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#050505]">
                <img
                  :src="imageSrc"
                  alt="Active Growth Groups community illustration"
                  class="h-[30rem] w-full object-cover transition duration-700 hover:scale-[1.02] sm:h-[36rem]"
                >
                <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.08),rgba(7,7,7,0.24)_42%,rgba(7,7,7,0.82)_100%)]" />
                <div class="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-xl">
                  Visionary nonprofit
                </div>
                <div class="absolute right-5 top-5 hidden max-w-[14rem] rounded-[1.25rem] border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl md:block">
                  <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-300">Our belief</p>
                  <p class="mt-2 text-sm leading-6 text-white">
                    Growth is lifelong, and communities become stronger when people are equipped to thrive together.
                  </p>
                </div>

                <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div class="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                    <div class="rounded-[1.4rem] border border-white/10 bg-black/45 p-5 backdrop-blur-xl">
                      <p class="text-xs font-bold uppercase tracking-[0.22em] text-slate-300">Community-first model</p>
                      <h2 class="mt-3 font-display text-2xl font-semibold tracking-[-0.05em] text-white">
                        Join a community of innovators, creators, and changemakers.
                      </h2>
                      <div class="mt-5 flex flex-wrap gap-3">
                        <span class="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200">
                          Community development
                        </span>
                        <span class="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200">
                          Youth empowerment
                        </span>
                      </div>
                    </div>

                    <div class="rounded-[1.4rem] border border-white/10 bg-black/45 p-5 backdrop-blur-xl">
                      <p class="text-xs font-bold uppercase tracking-[0.22em] text-slate-300">Focus areas</p>
                      <ul class="mt-4 grid gap-3">
                        <li
                          v-for="bullet in bullets"
                          :key="bullet"
                          class="flex items-center gap-3 text-sm text-slate-200"
                        >
                          <span class="h-2 w-2 rounded-full bg-lime shadow-[0_0_18px_rgba(171,255,112,0.9)]" />
                          <span>{{ bullet }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pointer-events-none absolute -bottom-6 -left-6 hidden w-[15rem] rounded-[1.6rem] border border-white/10 bg-black/60 p-3 shadow-2xl backdrop-blur-xl md:block">
              <video
                :src="videoSrc"
                autoplay
                muted
                loop
                playsinline
                class="h-40 w-full rounded-[1rem] object-cover opacity-85"
              />
              <div class="mt-3 px-1">
                <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-300">In motion</p>
                <p class="mt-2 text-sm leading-6 text-white">Programs built around people, not process.</p>
              </div>
            </div>

            <div class="pointer-events-none absolute -right-4 top-20 hidden rounded-[1.5rem] border border-white/10 bg-[#101010]/85 px-5 py-4 shadow-2xl backdrop-blur-xl xl:block">
              <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Trusted direction</p>
              <p class="mt-2 font-display text-3xl font-semibold tracking-[-0.05em] text-white">People-first</p>
              <p class="mt-1 text-sm text-slate-300">Practical support and long-term growth</p>
            </div>
          </div>
        </div>
      </div>

      <div class="reveal reveal-soft mt-8 grid gap-3 border-t border-line/60 pt-6 sm:grid-cols-3">
        <div class="text-sm text-muted">Built on mentorship, education, and practical support.</div>
        <div class="text-sm text-muted">Designed to create confidence, access, and connection.</div>
        <div class="text-sm text-muted">Focused on real outcomes for underserved communities.</div>
      </div>
    </div>
  </section>
</template>

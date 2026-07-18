<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useContentItems } from "~/composables/useContentItems";
import { pageUrl, siteName, seoImageUrl, seoImageAlt } from "~/utils/site";

const { programs, fetchAllContent, isLoading } = useContentItems();

const pageTitle = `Our Programs | ${siteName}`;
const pageDescription =
  "Discover Active Growth Groups programs including mentorship, practical workshops, community networks, and growth resources.";

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: pageUrl("/programs"),
  ogImage: seoImageUrl,
  ogImageAlt: seoImageAlt,
});

const Links = [
  { label: "Home", href: "/" },
  { label: "Mission", href: "/#mission" },
  { label: "Programs", href: "/programs" },
  { label: "News", href: "/news" },
  { label: "Stories", href: "/stories" },
  { label: "Get involved", href: "/volunteer" },
  { label: "FAQ", href: "/#faq" },
];

onMounted(() => {
  fetchAllContent();
});
</script>

<template>
  <div
    class="relative overflow-hidden min-h-screen flex flex-col justify-between"
  >
    <LandingNav :links="Links" />

    <main class="pt-28 pb-20">
      <section class="section-space pb-12">
        <div class="shell">
          <div class="mx-auto max-w-3xl text-center">
            <span class="section-kicker">Core Pillars & Initiatives</span>
            <h1
              class="mt-4 font-display text-4xl font-bold tracking-[-0.04em] text-ink sm:text-6xl"
            >
              Practical programs built for lasting momentum.
            </h1>
            <p class="mt-6 text-lg leading-8 text-muted">
              We focus on measurable capability through mentorship, hands-on
              leadership training, community mutual aid, and ongoing educational
              resources.
            </p>
          </div>
        </div>
      </section>

      <section class="py-12">
        <div class="shell">
          <div v-if="isLoading" class="flex justify-center py-20">
            <div class="flex items-center gap-3 text-muted">
              <span
                class="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent"
              />
              <span>Loading programs...</span>
            </div>
          </div>

          <div v-else-if="programs && programs.length > 0" class="grid gap-8 md:grid-cols-2">
            <article
              v-for="prog in programs"
              :key="prog.id"
              class="surface-card interactive-card overflow-hidden rounded-[2.5rem] flex flex-col justify-between"
            >
              <div
                v-if="prog.mediaUrl"
                class="h-64 w-full overflow-hidden bg-surfaceStrong"
              >
                <img
                  :src="prog.mediaUrl"
                  :alt="prog.title"
                  class="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div class="p-8 space-y-4">
                <div class="flex items-center justify-between">
                  <span class="metric-chip">{{
                    prog.category || "Core Pillar"
                  }}</span>
                  <span class="text-xs text-muted">{{
                    prog.date || "Active"
                  }}</span>
                </div>
                <h2 class="font-display text-2xl font-bold text-ink">
                  {{ prog.title }}
                </h2>
                <p
                  v-if="prog.subtitle"
                  class="text-sm font-semibold text-accent"
                >
                  {{ prog.subtitle }}
                </p>
                <p class="text-muted leading-relaxed">{{ prog.content }}</p>
              </div>

              <div
                class="px-8 pb-8 pt-4 border-t border-line/60 flex items-center justify-between"
              >
                <NuxtLink
                  to="/contact"
                  class="text-sm font-bold text-accent hover:underline flex items-center gap-1.5"
                >
                  <span>Inquire about this program</span>
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </NuxtLink>
              </div>
            </article>
          </div>

          <div v-else class="surface-card rounded-[2.5rem] p-12 sm:p-16 border border-line/80 bg-surfaceStrong/50 text-center space-y-4 max-w-2xl mx-auto">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
              <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 class="font-display text-2xl font-bold text-ink">No Programs Available Yet</h3>
            <p class="text-base text-muted leading-relaxed">
              We are currently designing and updating our upcoming mentorship cohorts, workshops, and community assistance initiatives. Please check back shortly or reach out to our team if you would like to get involved early.
            </p>
            <div class="pt-4">
              <NuxtLink to="/contact" class="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-accent-soft">
                Contact Us for Program Inquiries
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>

    <LandingFooter :links="Links" />
  </div>
</template>

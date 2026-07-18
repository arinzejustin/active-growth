<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  useContentItems,
  type ContentItem,
} from "~/composables/useContentItems";
import { pageUrl, siteName, seoImageUrl, seoImageAlt } from "~/utils/site";

const { stories, fetchAllContent, isLoading } = useContentItems();

const selectedFilter = ref<"all" | "video" | "image">("all");
const searchQuery = ref("");
const selectedStory = ref<ContentItem | null>(null);

const pageTitle = `Impact Stories | ${siteName}`;
const pageDescription =
  "Explore real human stories and video testimonies from community beneficiaries, mentors, and youth empowerment participants.";

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: pageUrl("/stories"),
  ogImage: seoImageUrl,
  ogImageAlt: seoImageAlt,
});

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "News", href: "/news" },
  { label: "Stories", href: "/stories" },
  { label: "Get involved", href: "/volunteer" },
];

const filteredStories = computed(() => {
  return stories.value.filter((story) => {
    // Filter by media type
    const isVid =
      story.mediaType === "video" ||
      /\.(mp4|webm|mov|mkv)$/i.test(story.mediaUrl || "");
    if (selectedFilter.value === "video" && !isVid) return false;
    if (selectedFilter.value === "image" && isVid) return false;

    // Filter by search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase();
      const matchTitle = story.title.toLowerCase().includes(q);
      const matchQuote = (story.quote || "").toLowerCase().includes(q);
      const matchSub = (story.subtitle || "").toLowerCase().includes(q);
      const matchCat = (story.category || "").toLowerCase().includes(q);
      return matchTitle || matchQuote || matchSub || matchCat;
    }

    return true;
  });
});

function isVideo(story: ContentItem) {
  return (
    story.mediaType === "video" ||
    /\.(mp4|webm|mov|mkv)$/i.test(story.mediaUrl || "")
  );
}

onMounted(() => {
  fetchAllContent();
});
</script>

<template>
  <div
    class="relative overflow-hidden min-h-screen flex flex-col justify-between"
  >
    <LandingNav :links="navLinks" />

    <main class="pt-28 pb-20">
      <!-- Hero Section -->
      <section class="section-space pb-12">
        <div class="shell">
          <div class="mx-auto max-w-3xl text-center">
            <span class="section-kicker">Lived Outcomes</span>
            <h1
              class="mt-4 font-display text-4xl font-bold tracking-[-0.04em] text-ink sm:text-6xl"
            >
              Voices of community transformation.
            </h1>
            <p class="mt-6 text-lg leading-8 text-muted">
              Behind every program and initiative are real people whose lives
              have been impacted. Explore photo and video stories directly from
              community beneficiaries and mentors.
            </p>
          </div>

          <!-- Stats Ribbon -->
          <div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
            <div class="surface-card p-6 text-center">
              <p class="font-display text-3xl font-bold text-accent">100%</p>
              <p
                class="mt-1 text-xs font-semibold text-muted uppercase tracking-wider"
              >
                Direct Lived Impact
              </p>
            </div>
            <div class="surface-card p-6 text-center">
              <p class="font-display text-3xl font-bold text-lime">
                {{ stories.length }}+
              </p>
              <p
                class="mt-1 text-xs font-semibold text-muted uppercase tracking-wider"
              >
                Verified Stories
              </p>
            </div>
            <div class="surface-card p-6 text-center">
              <p class="font-display text-3xl font-bold text-aurora">
                Photo & Video
              </p>
              <p
                class="mt-1 text-xs font-semibold text-muted uppercase tracking-wider"
              >
                Multi-format Testimonies
              </p>
            </div>
            <div class="surface-card p-6 text-center">
              <p class="font-display text-3xl font-bold text-ink">
                Lagos & Beyond
              </p>
              <p
                class="mt-1 text-xs font-semibold text-muted uppercase tracking-wider"
              >
                Grassroots Reach
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Search & Filters -->
      <section class="py-6">
        <div class="shell">
          <div
            class="surface-card flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center rounded-3xl"
          >
            <!-- Filter Tabs -->
            <div class="flex flex-wrap items-center gap-2">
              <button
                type="button"
                class="rounded-full px-5 py-2 text-sm font-bold transition duration-200"
                :class="
                  selectedFilter === 'all'
                    ? 'bg-ink text-canvas dark:bg-white dark:text-slate-950 shadow-md'
                    : 'text-muted hover:text-ink hover:bg-surfaceStrong'
                "
                @click="selectedFilter = 'all'"
              >
                All Stories ({{ stories.length }})
              </button>
              <button
                type="button"
                class="rounded-full px-5 py-2 text-sm font-bold transition duration-200 flex items-center gap-2"
                :class="
                  selectedFilter === 'video'
                    ? 'bg-ink text-canvas dark:bg-white dark:text-slate-950 shadow-md'
                    : 'text-muted hover:text-ink hover:bg-surfaceStrong'
                "
                @click="selectedFilter = 'video'"
              >
                <span class="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                Video Stories
              </button>
              <button
                type="button"
                class="rounded-full px-5 py-2 text-sm font-bold transition duration-200 flex items-center gap-2"
                :class="
                  selectedFilter === 'image'
                    ? 'bg-ink text-canvas dark:bg-white dark:text-slate-950 shadow-md'
                    : 'text-muted hover:text-ink hover:bg-surfaceStrong'
                "
                @click="selectedFilter = 'image'"
              >
                Photo Stories
              </button>
            </div>

            <!-- Search input -->
            <div class="relative w-full sm:w-72">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search stories or names..."
                class="w-full rounded-full border border-line/80 bg-surfaceStrong/70 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
              <svg
                class="absolute left-3.5 top-3 h-4 w-4 text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <!-- Stories Grid -->
      <section class="py-12">
        <div class="shell">
          <div v-if="isLoading" class="flex justify-center py-20">
            <div class="flex items-center gap-3 text-muted">
              <span
                class="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent"
              />
              <span>Loading stories...</span>
            </div>
          </div>

          <div
            v-else-if="filteredStories.length === 0"
            class="surface-card py-20 text-center rounded-3xl"
          >
            <p class="font-display text-2xl font-semibold text-ink">
              No stories found
            </p>
            <p class="mt-2 text-muted">
              Try adjusting your search filter or checking back later.
            </p>
            <button
              type="button"
              class="action-button bg-ink text-canvas mt-6 dark:bg-white dark:text-slate-950"
              @click="
                selectedFilter = 'all';
                searchQuery = '';
              "
            >
              Reset Filters
            </button>
          </div>

          <div v-else class="grid gap-8 lg:grid-cols-2">
            <article
              v-for="story in filteredStories"
              :key="story.id"
              class="surface-card interactive-card overflow-hidden rounded-[2.5rem] flex flex-col justify-between"
            >
              <div class="grid md:grid-cols-[0.85fr_1.15fr] h-full">
                <!-- Media Section -->
                <div
                  class="relative min-h-72 w-full overflow-hidden bg-surfaceStrong"
                >
                  <div v-if="isVideo(story)" class="relative h-full w-full">
                    <video
                      :src="story.mediaUrl"
                      class="h-full min-h-72 w-full object-cover"
                      controls
                      preload="metadata"
                      playsinline
                    />
                    <span
                      class="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md shadow-lg"
                    >
                      <span
                        class="h-2 w-2 rounded-full bg-rose-500 animate-pulse"
                      />
                      Video Story
                    </span>
                  </div>
                  <div v-else class="h-full w-full relative group">
                    <img
                      :src="story.mediaUrl"
                      :alt="story.title"
                      class="h-full min-h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span
                      v-if="story.category"
                      class="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md"
                    >
                      {{ story.category }}
                    </span>
                  </div>
                </div>

                <!-- Content Section -->
                <div class="flex flex-col justify-between p-7 sm:p-9">
                  <div>
                    <div
                      class="mb-5 h-1.5 w-16 rounded-full"
                      :class="
                        story.accent === 'lime'
                          ? 'bg-lime'
                          : story.accent === 'aurora'
                            ? 'bg-aurora'
                            : 'bg-accent'
                      "
                    />
                    <p class="text-lg leading-8 text-ink italic">
                      "{{ story.quote }}"
                    </p>
                  </div>
                  <div
                    class="mt-8 pt-6 border-t border-line/60 flex items-center justify-between"
                  >
                    <div>
                      <p
                        class="font-display text-2xl font-bold tracking-[-0.03em] text-ink"
                      >
                        {{ story.title }}
                      </p>
                      <p class="mt-1 text-sm text-muted">
                        {{ story.subtitle || "Community beneficiary" }}
                      </p>
                    </div>
                    <button
                      type="button"
                      class="rounded-full p-3 border border-line/70 text-ink transition hover:border-accent hover:text-accent hover:bg-accent/10"
                      title="View details"
                      @click="selectedStory = story"
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- CTA to Share Story or Admin -->
      <section class="pt-12">
        <div class="shell">
          <div
            class="surface-card rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-br from-surface to-surfaceStrong border-accent/20"
          >
            <h2 class="font-display text-3xl font-bold text-ink sm:text-4xl">
              Have a story to share or want to upload new impact items?
            </h2>
            <p class="mt-4 text-base text-muted max-w-xl mx-auto">
              Our team regularly features stories from youth mentors, partners,
              and community members across Lagos.
            </p>
            <div class="mt-8 flex flex-wrap justify-center gap-4">
              <NuxtLink
                to="/volunteer"
                class="action-button bg-accent text-slate-950 hover:bg-accent-soft font-bold"
              >
                Get Involved
              </NuxtLink>
              <NuxtLink
                to="/#faq"
                class="action-button border border-line/80 bg-surfaceStrong text-ink hover:border-accent"
              >
                Share Your Testimony
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Full Story Modal -->
    <div
      v-if="selectedStory"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      @click.self="selectedStory = null"
    >
      <div
        class="surface-card relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8"
      >
        <button
          type="button"
          class="absolute right-6 top-6 rounded-full p-2 text-muted hover:bg-surfaceStrong hover:text-ink"
          @click="selectedStory = null"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div class="space-y-6">
          <div class="overflow-hidden rounded-2xl bg-surfaceStrong max-h-96">
            <video
              v-if="isVideo(selectedStory)"
              :src="selectedStory.mediaUrl"
              controls
              autoplay
              class="w-full h-full max-h-96 object-contain"
            />
            <img
              v-else
              :src="selectedStory.mediaUrl"
              :alt="selectedStory.title"
              class="w-full h-full max-h-96 object-cover"
            />
          </div>

          <div>
            <span class="section-kicker">{{
              selectedStory.category || "Impact Story"
            }}</span>
            <h3 class="mt-1 font-display text-3xl font-bold text-ink">
              {{ selectedStory.title }}
            </h3>
            <p class="text-sm text-muted">
              {{ selectedStory.subtitle || "Community beneficiary" }}
            </p>
          </div>

          <div
            class="rounded-2xl border border-line/60 bg-surfaceStrong/60 p-6"
          >
            <p class="text-xl italic leading-relaxed text-ink">
              "{{ selectedStory.quote }}"
            </p>
          </div>

          <p
            v-if="selectedStory.content"
            class="text-base text-muted leading-relaxed"
          >
            {{ selectedStory.content }}
          </p>

          <div class="flex justify-end pt-4">
            <button
              type="button"
              class="action-button bg-ink text-canvas dark:bg-white dark:text-slate-950"
              @click="selectedStory = null"
            >
              Close Story
            </button>
          </div>
        </div>
      </div>
    </div>

    <LandingFooter :links="navLinks" />
  </div>
</template>

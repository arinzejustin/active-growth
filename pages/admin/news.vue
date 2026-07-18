<script setup lang="ts">
import { onMounted } from 'vue'
import { useAdminForm } from '~/composables/useAdminForm'
import { siteName } from '~/utils/site'

useSeoMeta({
  title: `News Portal | ${siteName}`,
  description: 'Manage community announcements, press releases, and outreach articles.',
})

const {
  news,
  editingId,
  formTitle,
  formSubtitle,
  formContent,
  formMediaType,
  formMediaUrl,
  formCategory,
  formAuthor,
  formDate,
  uploadFileObj,
  isUploading,
  uploadError,
  uploadProgressMsg,
  isSaving,
  successNotice,
  resetForm,
  editItem,
  handleFileSelect,
  handleSubmit,
  handleDelete,
  fetchAllContent,
} = useAdminForm('news')

onMounted(() => {
  fetchAllContent()
  resetForm()
})
</script>

<template>
  <div class="space-y-10">
    <!-- Header Banner -->
    <div class="surface-card rounded-[2.5rem] p-7 sm:p-9 border border-line/80 bg-gradient-to-r from-surface to-surfaceStrong flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div>
        <span class="section-kicker text-aurora">Dedicated Route: /admin/news</span>
        <h1 class="font-display text-2xl sm:text-3xl font-bold text-ink mt-1">News & Announcements Management Portal</h1>
        <p class="text-xs text-muted mt-1 max-w-xl">
          Publish community announcements, progress reports, and outreach updates. News articles added here show up right on the homepage preview and the `/news` feed.
        </p>
      </div>
      <button
        type="button"
        @click="resetForm()"
        class="rounded-full bg-aurora/20 border border-aurora/40 px-5 py-2.5 text-xs font-bold text-aurora hover:bg-aurora hover:text-slate-950 transition shrink-0 self-start sm:self-center"
      >
        + Add New Article
      </button>
    </div>

    <!-- Success Notification -->
    <div
      v-if="successNotice"
      class="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-400 font-bold flex items-center justify-between"
    >
      <div class="flex items-center gap-3">
        <span>✓ {{ successNotice }}</span>
      </div>
      <button type="button" @click="successNotice = ''" class="hover:text-white">✕</button>
    </div>

    <!-- Split Form & Live Preview Area -->
    <div class="grid gap-8 lg:grid-cols-12">
      <!-- Form Area (7 Cols) -->
      <div class="lg:col-span-7 space-y-6">
        <div class="surface-card rounded-[2rem] p-6 sm:p-8 border border-line/80">
          <div class="flex items-center justify-between border-b border-line/70 pb-5 mb-6">
            <div>
              <h2 class="font-display text-xl font-bold text-ink">
                {{ editingId ? 'Edit News Article' : 'Publish New News Article' }}
              </h2>
              <p class="text-xs text-muted mt-1">
                Enter headline, category tag, publication date, author, and article body below.
              </p>
            </div>
            <span v-if="editingId" class="rounded-full bg-amber-500/20 text-amber-400 px-3 py-1 text-xs font-bold">
              Editing Mode
            </span>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid gap-6 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                  News Headline / Title *
                </label>
                <input
                  v-model="formTitle"
                  type="text"
                  required
                  placeholder="e.g. 500+ Families Supported in Our Q3 Outreach"
                  class="w-full rounded-2xl border border-line/80 bg-surfaceStrong/70 px-4 py-3 text-sm text-ink focus:border-aurora focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                  Subtitle / Highlight
                </label>
                <input
                  v-model="formSubtitle"
                  type="text"
                  placeholder="e.g. Key milestone achieved across 12 communities"
                  class="w-full rounded-2xl border border-line/80 bg-surfaceStrong/70 px-4 py-3 text-sm text-ink focus:border-aurora focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                  Category Tag
                </label>
                <input
                  v-model="formCategory"
                  type="text"
                  placeholder="e.g. Community Impact"
                  class="w-full rounded-2xl border border-line/80 bg-surfaceStrong/70 px-4 py-3 text-sm text-ink focus:border-aurora focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                  Author / Byline
                </label>
                <input
                  v-model="formAuthor"
                  type="text"
                  placeholder="e.g. Editorial Team"
                  class="w-full rounded-2xl border border-line/80 bg-surfaceStrong/70 px-4 py-3 text-sm text-ink focus:border-aurora focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                  Publication Date
                </label>
                <input
                  v-model="formDate"
                  type="date"
                  class="w-full rounded-2xl border border-line/80 bg-surfaceStrong/70 px-4 py-3 text-sm text-ink focus:border-aurora focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                Article Body / Summary Content *
              </label>
              <textarea
                v-model="formContent"
                rows="6"
                required
                placeholder="Provide comprehensive article details, quotes, and highlights..."
                class="w-full rounded-2xl border border-line/80 bg-surfaceStrong/70 px-4 py-3 text-sm text-ink focus:border-aurora focus:outline-none"
              />
            </div>

            <!-- File Upload Box -->
            <div class="rounded-3xl border border-line/80 bg-surfaceStrong/50 p-6 space-y-4">
              <div class="flex items-center justify-between">
                <label class="block text-xs font-bold uppercase tracking-wider text-ink">
                  Article Cover Photo Upload
                </label>
                <span class="rounded-full bg-aurora/20 text-aurora px-3 py-1 text-[11px] font-bold">
                  Photo Mode (Max 10MB)
                </span>
              </div>

              <div class="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line/80 bg-surface/50 p-6 text-center hover:border-aurora transition">
                <input
                  type="file"
                  accept="image/*,video/*"
                  class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  @change="handleFileSelect"
                />
                <div class="space-y-2 pointer-events-none">
                  <span class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surfaceStrong text-aurora">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </span>
                  <p class="text-sm font-semibold text-ink">Click or drag cover photo here to upload</p>
                  <p class="text-xs text-muted">Supports JPG, PNG, WEBP images</p>
                </div>
              </div>

              <div v-if="uploadFileObj" class="flex items-center justify-between rounded-xl bg-surface p-3 border border-line">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-bold text-aurora">Selected file:</span>
                  <span class="text-sm text-ink truncate max-w-xs">{{ uploadFileObj.name }}</span>
                  <span class="text-xs text-muted">({{ (uploadFileObj.size / (1024 * 1024)).toFixed(2) }} MB)</span>
                </div>
                <button type="button" @click="uploadFileObj = null" class="text-xs font-bold text-rose-400">Remove</button>
              </div>

              <div v-if="uploadError" class="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-400 font-bold">
                {{ uploadError }}
              </div>

              <div v-if="uploadProgressMsg" class="rounded-xl border border-aurora/40 bg-aurora/10 p-3 text-xs text-aurora font-bold">
                {{ uploadProgressMsg }}
              </div>

              <div>
                <label class="block text-[11px] font-semibold text-muted mb-1">Or paste external Cover Image URL:</label>
                <input
                  v-model="formMediaUrl"
                  type="text"
                  placeholder="https://..."
                  class="w-full rounded-xl border border-line/70 bg-surface px-3 py-2 text-xs text-ink focus:border-aurora focus:outline-none"
                />
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-line/70">
              <button
                type="button"
                @click="resetForm()"
                class="rounded-full px-5 py-2.5 text-sm font-semibold text-muted hover:text-ink"
              >
                Clear Form
              </button>
              <button
                type="submit"
                :disabled="isSaving || isUploading"
                class="rounded-full bg-aurora px-8 py-3 text-sm font-bold text-slate-950 transition hover:opacity-90 disabled:opacity-50 shadow-md"
              >
                <span v-if="isSaving || isUploading" class="flex items-center gap-2">
                  <span class="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                  <span>Saving Article...</span>
                </span>
                <span v-else>{{ editingId ? 'Update Article' : 'Publish Article' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Live Preview Card (5 Cols) -->
      <div class="lg:col-span-5 space-y-6">
        <div class="sticky top-24 space-y-6">
          <div class="surface-card rounded-[2rem] p-6 border border-line/80">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-bold uppercase tracking-wider text-aurora">Live Article Card Preview</span>
              <span class="text-xs text-muted">Website card preview</span>
            </div>

            <article class="surface-card interactive-card overflow-hidden rounded-[2rem] border border-line shadow-lg">
              <div class="flex flex-col">
                <div class="relative h-56 w-full overflow-hidden bg-surfaceStrong">
                  <img
                    :src="formMediaUrl || 'https://activegrowthgroups.my.canva.site/_assets/media/113747c97c567daf71b6305fb478fe7a.jpg'"
                    :alt="formTitle"
                    class="h-full w-full object-cover"
                  />
                  <span class="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-aurora backdrop-blur-md">
                    {{ formCategory || 'News Update' }}
                  </span>
                </div>

                <div class="p-6 space-y-4">
                  <div class="flex items-center justify-between text-xs text-muted">
                    <span class="metric-chip">{{ formCategory || 'Announcement' }}</span>
                    <span>{{ formDate || 'Today' }}</span>
                  </div>
                  <h3 class="font-display text-xl font-bold text-ink leading-snug">{{ formTitle || 'News Headline' }}</h3>
                  <p v-if="formSubtitle" class="text-sm font-semibold text-aurora">{{ formSubtitle }}</p>
                  <p class="text-sm text-muted leading-relaxed line-clamp-4">
                    {{ formContent || 'Full article text summary will appear here...' }}
                  </p>
                  <div class="pt-3 border-t border-line/60 flex items-center justify-between text-xs text-muted">
                    <span>By {{ formAuthor || 'Editorial Team' }}</span>
                    <span class="font-bold text-aurora">Read more →</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <!-- Published News Table -->
    <div class="surface-card rounded-[2rem] p-6 sm:p-8 border border-line/80">
      <div class="flex items-center justify-between border-b border-line/70 pb-6 mb-6">
        <div>
          <h3 class="font-display text-2xl font-bold text-ink">
            Published News Articles ({{ news.length }})
          </h3>
          <p class="text-xs text-muted mt-1">
            Click Edit to modify or Delete to instantly remove from the website feed.
          </p>
        </div>
      </div>

      <div v-if="news.length === 0" class="py-12 text-center text-muted">
        No news articles published yet. Use the form above to post your first update.
      </div>

      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in news"
          :key="item.id"
          class="rounded-2xl border border-line/80 bg-surfaceStrong/60 p-5 flex flex-col justify-between space-y-4"
        >
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-aurora/20 text-aurora">
                {{ item.category || 'News' }}
              </span>
              <span class="text-xs text-muted">{{ item.date || 'Published' }}</span>
            </div>
            <h4 class="font-display text-lg font-bold text-ink truncate">{{ item.title }}</h4>
            <p v-if="item.content" class="text-xs text-muted line-clamp-2">{{ item.content }}</p>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-line/60">
            <button type="button" @click="editItem(item)" class="text-xs font-bold text-aurora hover:underline">
              Edit Article
            </button>
            <button type="button" @click="handleDelete(item.id, item.title)" class="text-xs font-bold text-rose-400 hover:text-rose-300">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

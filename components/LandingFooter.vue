<script setup lang="ts">
defineProps<{
  links: Array<{ label: string; href: string }>
}>()
</script>

<template>
  <footer class="border-t border-line/60 py-8">
    <div class="shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="font-display text-xl font-semibold tracking-[-0.04em] text-ink">Active Growth Groups</p>
        <p class="mt-1 text-sm text-muted">
          Empowering individuals, fostering growth, and building stronger communities.
        </p>
      </div>

      <nav class="flex flex-wrap gap-4" aria-label="Footer navigation">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-sm font-semibold text-muted transition hover:text-ink"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </footer>
</template>

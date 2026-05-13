<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  body?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div
    class="space-y-5"
    :class="align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left'"
  >
    <p class="section-kicker">{{ eyebrow }}</p>
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="body" class="section-body">
      {{ body }}
    </p>
  </div>
</template>

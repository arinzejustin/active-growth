<script setup lang="ts">
useHead({
  script: [
    {
      key: 'theme-init',
      textContent: `
        (() => {
          const stored = localStorage.getItem('active-growth-theme');
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const mode = stored || (prefersDark ? 'dark' : 'light');
          document.documentElement.classList.toggle('dark', mode === 'dark');
        })();
      `,
    },
  ],
})
</script>

<template>
  <NuxtPage />
</template>

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: ['@nuxtjs/tailwindcss'],
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Active Growth Groups',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'A modern nonprofit landing page for Active Growth Groups focused on youth empowerment, community development, and practical support programs.',
        },
        { name: 'format-detection', content: 'telephone=no, address=no, email=no' },
        { name: 'theme-color', content: '#2f9e44' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'author', content: 'Active Growth Groups' },
        { name: 'generator', content: 'Nuxt 3' },
        { property: 'og:site_name', content: 'Active Growth Groups' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Active Growth Groups' },
        {
          property: 'og:description',
          content:
            'A modern nonprofit landing page for Active Growth Groups focused on youth empowerment, community development, and practical support programs.',
        },
        { property: 'og:url', content: 'https://activegrowthgroups.my.canva.site/' },
        { property: 'og:image', content: 'https://activegrowthgroups.my.canva.site/favicon.svg' },
        { property: 'og:image:type', content: 'image/svg+xml' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Active Growth Groups' },
        {
          name: 'twitter:description',
          content:
            'A modern nonprofit landing page for Active Growth Groups focused on youth empowerment, community development, and practical support programs.',
        },
        { name: 'twitter:image', content: '/favicon.svg' },
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://activegrowthgroups.my.canva.site/',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
        {
          rel: 'mask-icon',
          href: '/favicon.svg',
          color: '#2f9e44',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap',
        },
      ],
    },
  },
  css: ['~/assets/css/tailwind.css'],
  tailwindcss: {
    viewer: false,
  },
})

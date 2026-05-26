import {
  pageUrl,
  seoImageAlt,
  seoImageHeight,
  seoImageUrl,
  seoImageWidth,
  siteDescription,
  siteName,
} from './utils/site'

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
      title: siteName,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: siteDescription,
        },
        { name: 'format-detection', content: 'telephone=no, address=no, email=no' },
        { name: 'theme-color', content: '#2f9e44' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'author', content: siteName },
        { name: 'generator', content: 'Nuxt 3' },
        { property: 'og:site_name', content: siteName },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: siteName },
        {
          property: 'og:description',
          content: siteDescription,
        },
        { property: 'og:url', content: pageUrl('/') },
        { property: 'og:image', content: seoImageUrl },
        { property: 'og:image:alt', content: seoImageAlt },
        { property: 'og:image:width', content: String(seoImageWidth) },
        { property: 'og:image:height', content: String(seoImageHeight) },
        { property: 'og:image:type', content: 'image/jpeg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: siteName },
        {
          name: 'twitter:description',
          content: siteDescription,
        },
        { name: 'twitter:image', content: seoImageUrl },
        { name: 'twitter:image:alt', content: seoImageAlt },
      ],
      link: [
        {
          rel: 'canonical',
          href: pageUrl('/'),
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
  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: parseInt(process.env.SMTP_PORT || '587', 10),
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    mailTo: process.env.MAIL_TO || '',
    public: {
      donateAccountNumber: process.env.NUXT_PUBLIC_DONATE_ACCOUNT_NUMBER || '2177174407',
      donateBankName: process.env.NUXT_PUBLIC_DONATE_BANK_NAME || 'United Bank Of Africa',
      donateAccountName: process.env.NUXT_PUBLIC_DONATE_ACCOUNT_NAME || 'Ugwu Ubasinachi Ejifor',
    },
  },
})

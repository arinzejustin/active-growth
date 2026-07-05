<script setup lang="ts">
import {
  pageUrl,
  seoImageAlt,
  seoImageHeight,
  seoImageUrl,
  seoImageWidth,
  siteName,
  siteUrl,
} from '~/utils/site'

const heroVideo = 'https://activegrowthgroups.my.canva.site/_assets/video/37dfe4155d1c9f51c7ded17736862c13.mp4'
const showcaseImage = 'https://activegrowthgroups.my.canva.site/_assets/media/c82c29178950c7a13ee42581ef37bded.jpg'
const storyOneImage = 'https://activegrowthgroups.my.canva.site/_assets/media/113747c97c567daf71b6305fb478fe7a.jpg'
const storyTwoImage = 'https://activegrowthgroups.my.canva.site/_assets/media/c4831dc67c8b142d52711778119ef1ad.jpg'

const navLinks = [
  { label: 'Mission', href: '#mission' },
  { label: 'Programs', href: '/programs' },
  { label: "News", href: "/news" },
  { label: 'Stories', href: '#stories' },
  { label: 'Get involved', href: '#get-involved' },
  { label: 'FAQ', href: '#faq' },
]

const heroBullets = [
  'Mentorship programs',
  'Workshops and training sessions',
  'Support groups and networking opportunities',
  'Career and personal development',
]

const stats = [
  {
    value: '4',
    label: 'Core support pillars',
    body: 'Mentorship, training, support networks, and growth resources create a balanced path toward long-term progress.',
  },
  {
    value: '3',
    label: 'Ways to help today',
    body: 'Support the mission through donations, volunteering, or sharing the advocacy with people in your network.',
  },
  {
    value: '1',
    label: 'Shared mission',
    body: 'Empower individuals, foster growth, and build stronger communities with practical, people-first support.',
  },
]

const programPillars = [
  {
    title: 'Mentorship and tutoring',
    body: 'After-school tutoring, one-on-one coaching, and direct guidance that help young people build confidence and momentum.',
  },
  {
    title: 'Workshops and training',
    body: 'Practical sessions in personal development, career readiness, and leadership for underserved communities.',
  },
  {
    title: 'Support networks',
    body: 'Community events, support groups, and relationship-building spaces that reduce isolation and increase access.',
  },
  {
    title: 'Growth resources',
    body: 'Online tools, networking opportunities, and structured pathways for long-term personal and community impact.',
  },
]

const showcaseSteps = [
  {
    title: 'Meet immediate needs',
    body: 'Support begins with accessible resources, compassionate guidance, and programs that remove barriers for individuals and families.',
  },
  {
    title: 'Build lasting capability',
    body: 'Training, mentorship, and development opportunities help participants strengthen confidence, skills, and direction.',
  },
  {
    title: 'Create stronger communities',
    body: 'As individuals grow, they contribute to healthier local networks built on encouragement, connection, and shared opportunity.',
  },
]

const impactStories = [
  {
    name: 'Ogochukwu Anyanwu',
    quote:
      'At the crucial time of need, you supported me and my family. Your help is invaluable, and your commitment to help individuals like me is deeply appreciated.',
    image: storyOneImage,
    accent: 'teal',
  },
  {
    name: 'Greg Hills',
    quote:
      'I am beyond grateful for the support provided by this organization. Their dedication and generosity have made a significant difference in my life.',
    image: storyTwoImage,
    accent: 'lime',
  },
]

const actionCards = [
  {
    title: 'Donate',
    body: 'No matter the amount, your donation can make a meaningful difference in the lives of our beneficiaries.',
    cta: 'Support the mission',
  },
  {
    title: 'Volunteer',
    body: 'Join community outreach activities and awareness campaigns with a team committed to practical local change.',
    cta: 'Give your time',
  },
  {
    title: 'Spread the word',
    body: 'Share the advocacy with your friends, family, and colleagues so the network of support keeps expanding.',
    cta: 'Amplify the cause',
  },
]

const faqItems = [
  {
    question: 'What does Active Growth Groups focus on?',
    answer:
      'The organization focuses on community development and youth empowerment through mentorship, workshops, support groups, networking opportunities, and practical learning resources.',
  },
  {
    question: 'How can I support the mission?',
    answer:
      'You can support the mission by donating, volunteering in outreach activities, or sharing the advocacy with people in your network.',
  },
  {
    question: 'Who benefits from these programs?',
    answer:
      'The programs are designed for individuals and families in underserved communities who need practical support, growth opportunities, and stronger community connections.',
  },
  {
    question: 'How do I get in touch?',
    answer:
      'You can contact Active Growth Groups directly at activegrowthgroups@gmail.com. The organization is based in Lagos, Nigeria.',
  },
]

const isDonateModalOpen = ref(false)

useScrollReveal()

const pageTitle = `${siteName} | Youth Empowerment and Community Development`
const pageDescription =
  'Active Growth Groups supports youth empowerment and community development through mentorship, workshops, support networks, and practical growth resources.'

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: pageUrl('/'),
  ogType: 'website',
  ogSiteName: siteName,
  ogImage: seoImageUrl,
  ogImageAlt: seoImageAlt,
  ogImageWidth: seoImageWidth,
  ogImageHeight: seoImageHeight,
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterCard: 'summary_large_image',
  twitterImage: seoImageUrl,
  twitterImageAlt: seoImageAlt,
})

useHead({
  bodyAttrs: {
    class: 'bg-canvas',
  },
  link: [
    {
      rel: 'canonical',
      href: pageUrl('/'),
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${siteUrl}#organization`,
            name: siteName,
            url: siteUrl,
            logo: pageUrl('/favicon.svg'),
            email: 'activegrowthgroups@gmail.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Lagos',
              addressCountry: 'NG',
            },
            sameAs: [siteUrl],
          },
          {
            '@type': 'NGO',
            '@id': `${siteUrl}#ngo`,
            name: siteName,
            url: siteUrl,
            description: pageDescription,
            areaServed: 'Nigeria',
            parentOrganization: {
              '@id': `${siteUrl}#organization`,
            },
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}#website`,
            name: siteName,
            url: siteUrl,
            publisher: {
              '@id': `${siteUrl}#organization`,
            },
          },
          {
            '@type': 'WebPage',
            '@id': `${siteUrl}#webpage`,
            name: pageTitle,
            url: siteUrl,
            description: pageDescription,
            isPartOf: {
              '@id': `${siteUrl}#website`,
            },
            about: {
              '@id': `${siteUrl}#ngo`,
            },
          },
          {
            '@type': 'FAQPage',
            '@id': `${siteUrl}#faq`,
            mainEntity: faqItems.map(item => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div class="relative overflow-hidden">
    <LandingNav :links="navLinks" />

    <main>
      <LandingHero :video-src="heroVideo" :image-src="showcaseImage" :bullets="heroBullets" />
      <LandingStats :stats="stats" />
      <LandingPrograms :pillars="programPillars" />
      <LandingShowcase :image-src="showcaseImage" :steps="showcaseSteps" />
      <section id="stories" class="scroll-mt-32">
        <LandingStories :stories="impactStories" />
      </section>
      <LandingActions :cards="actionCards" @donate-click="isDonateModalOpen = true" />
      <section id="faq" class="scroll-mt-32">
        <LandingFaq :items="faqItems" />
      </section>
      <LandingContactCta />
    </main>

    <LandingFooter :links="navLinks" />

    <DonateModal :is-open="isDonateModalOpen" @close="isDonateModalOpen = false" />
  </div>
</template>

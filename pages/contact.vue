<script setup lang="ts">
import { ref } from 'vue'
import {
  pageUrl,
  seoImageAlt,
  seoImageHeight,
  seoImageUrl,
  seoImageWidth,
  siteName,
} from '~/utils/site'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'support', label: 'Request Support' },
  { value: 'donation', label: 'Donation Question' },
  { value: 'other', label: 'Other' },
]

const submitForm = async () => {
  if (!form.value.name.trim() || !form.value.email.trim() || !form.value.message.trim()) {
    submitError.value = 'Please fill out all required fields (Name, Email, and Message).'
    return
  }

  isSubmitting.value = true
  submitError.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form.value },
    })
    submitSuccess.value = true
  } catch (err: any) {
    console.error('Error submitting contact form:', err)
    submitError.value =
      err.data?.statusMessage || err.message || 'An error occurred while sending your message. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }
  submitSuccess.value = false
  submitError.value = ''
}

const pageTitle = `Contact Us | ${siteName}`
const pageDescription =
  'Have questions or want to partner with us? Get in touch with the Active Growth Groups team today.'

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: pageUrl('/contact'),
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
  link: [
    {
      rel: 'canonical',
      href: pageUrl('/contact'),
    },
  ],
})

const footerLinks = [
  { label: 'Mission', href: '/#mission' },
  { label: 'Programs', href: '/#mission' },
  { label: 'Stories', href: '/#stories' },
  { label: 'Get involved', href: '/#get-involved' },
  { label: 'FAQ', href: '/#faq' },
]
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Ambient background glows -->
    <div
      class="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px]"
    />
    <div
      class="pointer-events-none absolute -right-32 top-40 h-[22rem] w-[22rem] rounded-full bg-aurora/8 blur-[100px]"
    />
    <div
      class="pointer-events-none absolute -bottom-20 left-1/3 h-[20rem] w-[20rem] rounded-full bg-lime/6 blur-[100px]"
    />

    <!-- Landing navigation -->
    <LandingNav :links="footerLinks" />

    <main class="shell pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
      <!-- Page Header -->
      <div class="mx-auto max-w-2xl text-center">
        <span class="section-kicker">Get in Touch</span>
        <h1 class="mt-3 font-display text-4xl font-bold tracking-[-0.05em] text-ink sm:text-5xl">
          Start a Conversation
        </h1>
        <p class="mt-4 text-base leading-8 text-muted sm:text-lg">
          Have questions about our programs, want to collaborate, or need support? Drop us a message, and our team will get back to you shortly.
        </p>
      </div>

      <div class="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-5">
        <!-- Contact Information sidebar -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Quick contact card -->
          <div class="surface-card rounded-[2rem] p-6 sm:p-8 space-y-6">
            <h3 class="font-display text-xl font-bold tracking-tight text-ink">
              Contact Information
            </h3>
            
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-muted uppercase tracking-wider">Email Us</h4>
                  <a href="mailto:helpdesk@activegrowthgroups.com.ng" class="text-sm font-semibold text-ink hover:text-accent transition-colors">
                    helpdesk@activegrowthgroups.com.ng
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-muted uppercase tracking-wider">Location</h4>
                  <p class="text-sm font-semibold text-ink">
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="h-px w-full bg-gradient-to-r from-transparent via-line/60 to-transparent" />

            <!-- Social channels -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold text-muted uppercase tracking-wider">Follow Us</h4>
              <div class="flex items-center gap-4">
                <a href="https://www.facebook.com/share/1CT5dJBFFk/?mibextid=wwXIfr" class="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-canvas/40 text-muted hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300" aria-label="Facebook">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="https://x.com/activegrowthgroups" class="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-canvas/40 text-muted hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300" aria-label="Twitter">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/active_growth_groups_?igsh=NTQ2djZjNDE5Nmlt" class="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-canvas/40 text-muted hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300" aria-label="Instagram">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://whatsapp.com/channel/0029VbDROs060eBeh1SBqO1h" class="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-canvas/40 text-muted hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300" aria-label="WhatsApp">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form Main Card -->
        <div class="lg:col-span-3">
          <Transition name="fade" mode="out-in">
            <div
              v-if="submitSuccess"
              class="surface-card flex flex-col items-center justify-center rounded-[2rem] p-8 text-center h-full min-h-[350px]"
            >
              <!-- Animated checkmark -->
              <div class="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  class="h-10 w-10 animate-draw-check"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span class="absolute inset-0 animate-ping rounded-full bg-accent/15" />
              </div>

              <h2 class="mt-6 font-display text-2xl font-bold tracking-tight text-ink">
                Message Sent!
              </h2>
              <p class="mt-3 max-w-sm text-sm leading-6 text-muted">
                Thank you for reaching out to Active Growth Groups. We have received your message and will respond to you as soon as possible.
              </p>

              <div class="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  class="action-button border border-line bg-surfaceStrong/70 text-ink"
                  @click="resetForm"
                >
                  Send another message
                </button>
                <NuxtLink
                  to="/"
                  class="action-button bg-ink text-canvas dark:bg-white dark:text-slate-950"
                >
                  Return Home
                </NuxtLink>
              </div>
            </div>

            <!-- Form State -->
            <form
              v-else
              class="surface-card rounded-[2rem] p-6 sm:p-8 space-y-6"
              @submit.prevent="submitForm"
            >
              <div class="grid gap-5 sm:grid-cols-2">
                <!-- Name -->
                <div class="space-y-1.5">
                  <label for="contact-name" class="text-xs font-bold text-muted">Full Name *</label>
                  <input
                    id="contact-name"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Your full name"
                    class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink placeholder-muted/65 transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 outline-none"
                  />
                </div>

                <!-- Email -->
                <div class="space-y-1.5">
                  <label for="contact-email" class="text-xs font-bold text-muted">Email Address *</label>
                  <input
                    id="contact-email"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink placeholder-muted/65 transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 outline-none"
                  />
                </div>
              </div>

              <!-- Subject dropdown/select -->
              <div class="space-y-1.5">
                <label for="contact-subject" class="text-xs font-bold text-muted">Subject</label>
                <div class="relative">
                  <select
                    id="contact-subject"
                    v-model="form.subject"
                    class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled selected>Select a subject</option>
                    <option v-for="opt in subjectOptions" :key="opt.value" :value="opt.label">
                      {{ opt.label }}
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Message -->
              <div class="space-y-1.5">
                <label for="contact-message" class="text-xs font-bold text-muted">Message *</label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  required
                  rows="5"
                  placeholder="How can we help you?"
                  class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink placeholder-muted/65 transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 outline-none resize-none"
                />
              </div>

              <!-- Error Alert -->
              <div
                v-if="submitError"
                class="flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-xs font-semibold text-red-600 dark:bg-red-500/15 dark:text-red-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.2"
                  class="h-4 w-4 shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{{ submitError }}</span>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  class="action-button border border-line bg-surfaceStrong/70 text-ink order-last sm:order-first cursor-pointer"
                  @click="resetForm"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  class="action-button bg-ink text-canvas hover:shadow-halo dark:bg-white dark:text-slate-950 flex items-center justify-center gap-2"
                  :disabled="isSubmitting"
                  :class="{ 'opacity-65 cursor-not-allowed': isSubmitting }"
                >
                  <!-- Spinner -->
                  <svg
                    v-if="isSubmitting"
                    class="h-4 w-4 animate-spin text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
                </button>
              </div>
            </form>
          </Transition>
        </div>
      </div>
    </main>

    <!-- Landing footer -->
    <LandingFooter :links="footerLinks" />
  </div>
</template>

<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Checkmark drawing animation */
@keyframes drawCheck {
  from {
    stroke-dashoffset: 24;
  }
  to {
    stroke-dashoffset: 0;
  }
}
.animate-draw-check {
  stroke-dasharray: 24;
  animation: drawCheck 0.5s cubic-bezier(0.65, 0, 0.35, 1) 0.15s forwards;
  stroke-dashoffset: 24;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  location: '',
  interests: [] as string[],
  availability: '',
  experience: '',
  message: '',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const interestOptions = [
  { value: 'mentorship', label: 'Mentorship & Tutoring' },
  { value: 'workshops', label: 'Workshops & Training' },
  { value: 'outreach', label: 'Community Outreach' },
  { value: 'events', label: 'Event Planning' },
  { value: 'fundraising', label: 'Fundraising' },
  { value: 'social-media', label: 'Social Media & Advocacy' },
  { value: 'admin', label: 'Administrative Support' },
  { value: 'other', label: 'Other' },
]

const availabilityOptions = [
  { value: 'weekdays', label: 'Weekdays' },
  { value: 'weekends', label: 'Weekends' },
  { value: 'flexible', label: 'Flexible / Both' },
  { value: 'remote', label: 'Remote Only' },
]

const toggleInterest = (value: string) => {
  const idx = form.value.interests.indexOf(value)
  if (idx > -1) {
    form.value.interests.splice(idx, 1)
  } else {
    form.value.interests.push(value)
  }
}

const submitForm = async () => {
  if (!form.value.fullName.trim() || !form.value.email.trim()) {
    submitError.value = 'Please provide your full name and email address.'
    return
  }

  isSubmitting.value = true
  submitError.value = ''

  try {
    await $fetch('/api/volunteer', {
      method: 'POST',
      body: { ...form.value },
    })
    submitSuccess.value = true
  } catch (err: any) {
    console.error('Error submitting volunteer form:', err)
    submitError.value =
      err.data?.statusMessage || err.message || 'An error occurred while submitting your application. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  form.value = {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    interests: [],
    availability: '',
    experience: '',
    message: '',
  }
  submitSuccess.value = false
  submitError.value = ''
}

useSeoMeta({
  title: 'Volunteer Sign Up | Active Growth Groups',
  description:
    'Join Active Growth Groups as a volunteer. Contribute your time and skills to support youth empowerment and community development programs.',
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

    <!-- Landing navigation of main page -->
    <LandingNav :links="footerLinks" />

    <main class="shell pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
      <!-- Page Header -->
      <div class="mx-auto max-w-2xl text-center">
        <span class="section-kicker">Volunteer</span>
        <h1 class="mt-3 font-display text-4xl font-bold tracking-[-0.05em] text-ink sm:text-5xl">
          Join the Movement
        </h1>
        <p class="mt-4 text-base leading-8 text-muted sm:text-lg">
          Whether you have a few hours or a whole weekend, your time and skills can make a lasting
          difference in someone's life. Sign up to volunteer today.
        </p>
      </div>

      <!-- Form Card -->
      <div class="mx-auto mt-12 max-w-2xl">
        <!-- Success State -->
        <Transition name="fade" mode="out-in">
          <div
            v-if="submitSuccess"
            class="surface-card flex flex-col items-center rounded-[2rem] p-8 text-center sm:p-12"
          >
            <!-- Animated checkmark -->
            <div
              class="relative flex h-24 w-24 items-center justify-center rounded-full bg-accent/10 text-accent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                class="h-12 w-12 animate-draw-check"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="absolute inset-0 animate-ping rounded-full bg-accent/15" />
            </div>

            <h2 class="mt-8 font-display text-3xl font-bold tracking-[-0.04em] text-ink">
              Welcome aboard!
            </h2>
            <p class="mt-4 max-w-md text-sm leading-7 text-muted">
              Thank you for signing up to volunteer with Active Growth Groups. Our team will reach
              out to you soon with more information about upcoming opportunities.
            </p>

            <div class="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                class="action-button border border-line bg-surfaceStrong/70 text-ink"
                @click="resetForm"
              >
                Submit another application
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
            class="surface-card rounded-[2rem] p-6 sm:p-8 lg:p-10"
            @submit.prevent="submitForm"
          >
            <!-- Personal Info Section -->
            <div class="space-y-1">
              <h2 class="font-display text-xl font-bold tracking-tight text-ink">
                Personal Information
              </h2>
              <p class="text-xs text-muted">Fields marked with * are required.</p>
            </div>

            <div class="mt-6 grid gap-5 sm:grid-cols-2">
              <!-- Full Name -->
              <div class="space-y-1.5">
                <label for="vol-name" class="text-xs font-bold text-muted">Full Name *</label>
                <input
                  id="vol-name"
                  v-model="form.fullName"
                  type="text"
                  required
                  placeholder="Your full name"
                  class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink placeholder-muted/65 transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 outline-none"
                />
              </div>

              <!-- Email -->
              <div class="space-y-1.5">
                <label for="vol-email" class="text-xs font-bold text-muted">Email Address *</label>
                <input
                  id="vol-email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink placeholder-muted/65 transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 outline-none"
                />
              </div>

              <!-- Phone -->
              <div class="space-y-1.5">
                <label for="vol-phone" class="text-xs font-bold text-muted">Phone Number</label>
                <input
                  id="vol-phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink placeholder-muted/65 transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 outline-none"
                />
              </div>

              <!-- Location -->
              <div class="space-y-1.5">
                <label for="vol-location" class="text-xs font-bold text-muted">Location</label>
                <input
                  id="vol-location"
                  v-model="form.location"
                  type="text"
                  placeholder="City, State"
                  class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink placeholder-muted/65 transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 outline-none"
                />
              </div>
            </div>

            <!-- Divider -->
            <div class="my-8 h-px w-full bg-gradient-to-r from-transparent via-line/60 to-transparent" />

            <!-- Interests Section -->
            <div class="space-y-1">
              <h2 class="font-display text-xl font-bold tracking-tight text-ink">
                Areas of Interest
              </h2>
              <p class="text-xs text-muted">Select the areas where you'd like to contribute.</p>
            </div>

            <div class="mt-5 flex flex-wrap gap-3">
              <button
                v-for="option in interestOptions"
                :key="option.value"
                type="button"
                class="chip-button flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition-all duration-300 relative overflow-hidden backdrop-blur-md cursor-pointer"
                :class="form.interests.includes(option.value) ? 'chip-button-active border-accent/60 bg-accent/10 text-accent' : 'chip-button-inactive border-line/60 bg-canvas/40 text-muted hover:border-accent/30 hover:bg-canvas/80 hover:text-ink hover:-translate-y-0.5'"
                @click="toggleInterest(option.value)"
              >
                <span class="flex items-center gap-2 whitespace-nowrap">
                  <!-- Custom premium SVG Icons -->
                  <svg v-if="option.value === 'mentorship'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <svg v-else-if="option.value === 'workshops'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <svg v-else-if="option.value === 'outreach'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <svg v-else-if="option.value === 'events'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <svg v-else-if="option.value === 'fundraising'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <svg v-else-if="option.value === 'social-media'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 10.742l8.17 4.085m0 0a3 3 0 104.186 2.517 3 3 0 00-4.186-2.517zM19.043 5.417a3 3 0 10-4.188 2.52 3 3 0 004.188-2.52zM6 10.5a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                  <svg v-else-if="option.value === 'admin'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ option.label }}
                </span>
              </button>
            </div>

            <!-- Divider -->
            <div class="my-8 h-px w-full bg-gradient-to-r from-transparent via-line/60 to-transparent" />

            <!-- Availability -->
            <div class="space-y-1">
              <h2 class="font-display text-xl font-bold tracking-tight text-ink">
                Availability
              </h2>
              <p class="text-xs text-muted">When are you most available?</p>
            </div>

            <div class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <button
                v-for="opt in availabilityOptions"
                :key="opt.value"
                type="button"
                class="chip-button justify-center text-center flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition-all duration-300 relative overflow-hidden backdrop-blur-md cursor-pointer"
                :class="form.availability === opt.value ? 'chip-button-active border-accent/60 bg-accent/10 text-accent' : 'chip-button-inactive border-line/60 bg-canvas/40 text-muted hover:border-accent/30 hover:bg-canvas/80 hover:text-ink hover:-translate-y-0.5'"
                @click="form.availability = form.availability === opt.value ? '' : opt.value"
              >
                <span class="flex items-center gap-2 whitespace-nowrap">
                  <svg v-if="opt.value === 'weekdays'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.022 12.022l.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
                  </svg>
                  <svg v-else-if="opt.value === 'weekends'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <svg v-else-if="opt.value === 'flexible'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {{ opt.label }}
                </span>
              </button>
            </div>

            <!-- Divider -->
            <div class="my-8 h-px w-full bg-gradient-to-r from-transparent via-line/60 to-transparent" />

            <!-- Experience & Message -->
            <div class="space-y-5">
              <div class="space-y-1.5">
                <label for="vol-experience" class="text-xs font-bold text-muted"
                  >Relevant Experience</label
                >
                <textarea
                  id="vol-experience"
                  v-model="form.experience"
                  rows="3"
                  placeholder="Tell us about any relevant skills, experience, or background (optional)"
                  class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink placeholder-muted/65 transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 outline-none resize-none"
                />
              </div>

              <div class="space-y-1.5">
                <label for="vol-message" class="text-xs font-bold text-muted"
                  >Anything else?</label
                >
                <textarea
                  id="vol-message"
                  v-model="form.message"
                  rows="3"
                  placeholder="Any additional information, questions, or notes (optional)"
                  class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink placeholder-muted/65 transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 outline-none resize-none"
                />
              </div>
            </div>

            <!-- Error Alert -->
            <div
              v-if="submitError"
              class="mt-6 flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-xs font-semibold text-red-600 dark:bg-red-500/15 dark:text-red-400"
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
            <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <NuxtLink
                to="/"
                class="action-button border border-line bg-surfaceStrong/70 text-ink order-last sm:order-first"
              >
                Cancel
              </NuxtLink>
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
                <span>{{ isSubmitting ? 'Submitting...' : 'Sign Up to Volunteer' }}</span>
              </button>
            </div>
          </form>
        </Transition>
      </div>
    </main>

    <!-- Landing footer of main page -->
    <LandingFooter :links="footerLinks" />
  </div>
</template>

<style scoped>
/* Chip buttons */
.chip-button {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.chip-button-active {
  box-shadow: 0 8px 20px oklch(var(--accent) / 0.12), inset 0 0 10px oklch(var(--accent) / 0.04);
  transform: translateY(-0.5px);
}

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

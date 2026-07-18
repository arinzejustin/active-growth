<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const config = useRuntimeConfig()

// Bank Details from runtime config (defaults as fallback)
const accountNumber = computed(() => config.public.donateAccountNumber || '2177174407')
const bankName = computed(() => config.public.donateBankName || 'United Bank Of Africa')
const accountName = computed(() => config.public.donateAccountName || 'Ugwu Ubasinachi Ejiofor')

// Copy state
const copied = ref(false)
const copyAccount = async () => {
  try {
    await navigator.clipboard.writeText(accountNumber.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy account number:', err)
  }
}

// Form state
const name = ref('')
const email = ref('')
const amount = ref('')
const currency = ref('NGN')
const exchangeRate = 1600
const file = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const dragOver = ref(false)
const filePreview = ref<string | null>(null)

const convertedNaira = computed(() => {
  if (!amount.value || isNaN(Number(amount.value))) return 0
  if (currency.value === 'USD') {
    return Number(amount.value) * exchangeRate
  }
  return Number(amount.value)
})

const formattedNaira = computed(() => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(convertedNaira.value)
})

// Submission states
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

// File upload helpers
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    setFile(target.files[0])
  }
}

const handleDrop = (e: DragEvent) => {
  dragOver.value = false
  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    setFile(e.dataTransfer.files[0])
  }
}

const setFile = (selectedFile: File) => {
  // Validate file size (max 5MB)
  if (selectedFile.size > 5 * 1024 * 1024) {
    submitError.value = 'File size exceeds the 5MB limit.'
    return
  }
  submitError.value = ''
  file.value = selectedFile

  // Create image preview if applicable
  if (selectedFile.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      filePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(selectedFile)
  } else {
    filePreview.value = null // PDF or other document types
  }
}

const removeFile = () => {
  file.value = null
  filePreview.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Format file size
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// Reset form
const resetForm = () => {
  name.value = ''
  email.value = ''
  amount.value = ''
  currency.value = 'NGN'
  removeFile()
  submitSuccess.value = false
  submitError.value = ''
}

// Submit proof
const submitProof = async () => {
  if (!name.value.trim()) {
    submitError.value = 'Please enter your name.'
    return
  }
  if (!amount.value || Number(amount.value) <= 0) {
    submitError.value = 'Please enter a valid donation amount.'
    return
  }
  if (!file.value) {
    submitError.value = 'Please attach a proof of payment.'
    return
  }

  isSubmitting.value = true
  submitError.value = ''

  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('amount', amount.value)
  formData.append('currency', currency.value)
  formData.append('proof', file.value)

  try {
    const response = await $fetch('/api/send-proof', {
      method: 'POST',
      body: formData,
    })

    submitSuccess.value = true
  } catch (err: any) {
    console.error('Error submitting proof:', err)
    submitError.value = err.data?.statusMessage || err.message || 'An error occurred while submitting your proof. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-slate-950/65 backdrop-blur-md transition-opacity duration-300"
        @click="emit('close')"
      />

      <!-- Modal Content Wrapper -->
      <Transition name="slide-up">
        <div
          v-if="isOpen"
          class="relative w-full max-w-xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-[2.2rem] border border-line/60 bg-surface/95 p-6 shadow-halo backdrop-blur-2xl transition-all duration-300 sm:p-8 md:p-9 modal-scroll"
        >
          <!-- Close Button -->
          <button
            type="button"
            class="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-line/50 bg-canvas/50 text-muted transition hover:border-accent/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            aria-label="Close modal"
            @click="emit('close')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="h-5 w-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <!-- Normal Form State -->
          <div v-if="!submitSuccess">
            <div class="mb-6">
              <span class="section-kicker">Support us</span>
              <h3 class="mt-2 font-display text-3xl font-bold tracking-[-0.04em] text-ink">
                Make a Donation
              </h3>
              <p class="mt-2 text-sm text-muted">
                Transfer to our bank details below and upload your proof of payment to complete.
              </p>
            </div>

            <!-- Virtual Credit Card Design (WOW factor) -->
            <div class="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-red-600 via-[#b32b35] to-[#731920] p-6 text-white shadow-lg shadow-red-900/10">
              <!-- Decorative elements -->
              <div class="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-white/5 blur-2xl pointer-events-none" />
              <div class="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-black/10 blur-2xl pointer-events-none" />
              
              <!-- Card Header -->
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-wider text-white/70">Bank Details</p>
                  <p class="font-display text-lg font-semibold tracking-tight">{{ bankName }}</p>
                </div>
                <!-- UBA Logo -->
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 p-1 shadow-md">
                  <img
                    src="/uba-logo.svg"
                    alt="UBA Logo"
                    class="h-full w-full object-contain"
                  />
                </div>
              </div>

              <!-- Card Number (Account Number) -->
              <div class="mt-8">
                <p class="text-[10px] font-bold uppercase tracking-wider text-white/70">Account Number</p>
                <div class="mt-1 flex items-center justify-between">
                  <span class="font-mono text-2xl font-semibold tracking-[0.15em] sm:text-3xl">
                    {{ accountNumber }}
                  </span>
                  
                  <!-- Copy Button -->
                  <button
                    type="button"
                    class="relative flex h-10 items-center gap-2 rounded-full bg-white/10 px-3.5 text-xs font-bold text-white transition hover:bg-white/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/40"
                    @click="copyAccount"
                  >
                    <svg
                      v-if="!copied"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.2"
                      class="h-3.5 w-3.5"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="h-3.5 w-3.5 text-green-300 animate-scale-up"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{{ copied ? 'Copied' : 'Copy' }}</span>
                  </button>
                </div>
              </div>

              <!-- Card Footer (Account Name) -->
              <div class="mt-8 flex items-end justify-between border-t border-white/10 pt-4">
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-wider text-white/70">Account Name</p>
                  <p class="mt-0.5 font-display text-sm font-semibold tracking-tight">
                    {{ accountName }}
                  </p>
                </div>
                <div class="text-right">
                  <span class="rounded bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/90">
                    DONATION CARD
                  </span>
                </div>
              </div>
            </div>

            <!-- Upload Form -->
            <form @submit.prevent="submitProof" class="mt-6 space-y-4">
              <!-- Name & Email (2-Column Grid) -->
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="space-y-1.5">
                  <label for="donor-name" class="text-xs font-bold text-muted">Your Name *</label>
                  <input
                    id="donor-name"
                    v-model="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink placeholder-muted/65 transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 outline-none"
                  />
                </div>

                <div class="space-y-1.5">
                  <label for="donor-email" class="text-xs font-bold text-muted">Your Email</label>
                  <input
                    id="donor-email"
                    v-model="email"
                    type="email"
                    placeholder="Enter email (optional)"
                    class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink placeholder-muted/65 transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 outline-none"
                  />
                </div>
              </div>

              <!-- Currency & Amount Selector (3-Column Grid) -->
              <div class="grid gap-4 sm:grid-cols-3">
                <div class="space-y-1.5 sm:col-span-1">
                  <label for="donor-currency" class="text-xs font-bold text-muted">Currency *</label>
                  <div class="relative">
                    <select
                      id="donor-currency"
                      v-model="currency"
                      class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 appearance-none cursor-pointer"
                    >
                      <option value="NGN">NGN (₦)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="space-y-1.5 sm:col-span-2">
                  <label for="donor-amount" class="text-xs font-bold text-muted">
                    Amount Donated ({{ currency === 'USD' ? '$' : '₦' }}) *
                  </label>
                  <input
                    id="donor-amount"
                    v-model="amount"
                    type="number"
                    required
                    min="1"
                    :placeholder="currency === 'USD' ? 'Enter amount in USD' : 'Enter amount in Naira'"
                    class="w-full rounded-xl border border-line/60 bg-canvas/40 px-4 py-2.5 text-sm text-ink placeholder-muted/65 transition focus:border-accent/80 focus:ring-1 focus:ring-accent/80 outline-none"
                  />
                </div>
              </div>

              <!-- Dynamic Naira Conversion Display (WOW UX) -->
              <div v-if="amount" class="mt-2 rounded-xl bg-accent/5 border border-accent/20 p-3 text-xs text-ink flex items-center justify-between animate-scale-up">
                <div class="flex items-center gap-2">
                  <span class="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent font-bold">₦</span>
                  <span>
                    <span class="font-bold text-muted">Amount to Transfer:</span>
                    <span class="ml-1 text-sm font-extrabold text-accent">{{ formattedNaira }}</span>
                  </span>
                </div>
                <span v-if="currency === 'USD'" class="text-[10px] text-muted italic">
                  Rate: $1 = ₦{{ exchangeRate.toLocaleString() }}
                </span>
              </div>

              <!-- File Attachment (Drag & Drop) -->
              <div class="space-y-1.5">
                <span class="text-xs font-bold text-muted">Proof of Payment *</span>
                
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*,application/pdf"
                  class="hidden"
                  @change="handleFileChange"
                />

                <!-- Drag & Drop Zone -->
                <div
                  v-if="!file"
                  class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-canvas/30 px-6 py-8 text-center transition cursor-pointer hover:bg-canvas/60 hover:border-accent/40"
                  :class="{ 'border-accent/60 bg-accent/5': dragOver }"
                  @dragover.prevent="dragOver = true"
                  @dragleave.prevent="dragOver = false"
                  @drop.prevent="handleDrop"
                  @click="triggerFileInput"
                >
                  <div class="rounded-full bg-accent/10 p-3 text-accent dark:bg-accent/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="h-6 w-6"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p class="mt-3 text-sm font-semibold text-ink">
                    Click to upload or drag & drop proof
                  </p>
                  <p class="mt-1 text-xs text-muted">
                    Supports JPG, PNG, or PDF up to 5MB
                  </p>
                </div>

                <!-- Attached File Preview -->
                <div
                  v-else
                  class="relative flex items-center justify-between rounded-2xl border border-line bg-canvas/30 p-3"
                >
                  <div class="flex items-center gap-3">
                    <!-- Image Preview -->
                    <div
                      v-if="filePreview"
                      class="h-12 w-12 overflow-hidden rounded-lg border border-line bg-slate-100"
                    >
                      <img
                        :src="filePreview"
                        alt="Proof Preview"
                        class="h-full w-full object-cover"
                      />
                    </div>
                    
                    <!-- File Icon for PDFs/documents -->
                    <div
                      v-else
                      class="flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-accent/5 text-accent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="h-6 w-6"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>

                    <!-- File Details -->
                    <div class="max-w-[12rem] sm:max-w-[18rem] truncate">
                      <p class="text-sm font-semibold text-ink truncate">{{ file.name }}</p>
                      <p class="text-xs text-muted">{{ formatBytes(file.size) }}</p>
                    </div>
                  </div>

                  <!-- Remove File Button -->
                  <button
                    type="button"
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-line/40 text-muted hover:bg-line/80 hover:text-ink"
                    @click="removeFile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.2"
                      class="h-4 w-4"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
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
              <div class="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  class="action-button border border-line bg-surfaceStrong/70 text-ink order-last sm:order-first"
                  :disabled="isSubmitting"
                  @click="emit('close')"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="action-button bg-ink text-canvas hover:shadow-halo dark:bg-white dark:text-slate-950 flex items-center justify-center gap-2"
                  :disabled="isSubmitting || !file"
                  :class="{ 'opacity-65 cursor-not-allowed': isSubmitting || !file }"
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
                  <span>{{ isSubmitting ? 'Uploading proof...' : 'Submit Proof' }}</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Success State -->
          <div v-else class="flex flex-col items-center py-8 text-center animate-scale-up">
            <div class="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500 dark:bg-green-500/15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                class="h-10 w-10"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <!-- Radial pulse effect -->
              <span class="absolute inset-0 animate-ping rounded-full bg-green-500/20" />
            </div>

            <h3 class="mt-6 font-display text-2xl font-bold tracking-[-0.04em] text-ink">
              Proof Received!
            </h3>
            <p class="mt-3 max-w-sm text-sm leading-6 text-muted">
              Thank you so much for your donation. We have successfully received your proof of payment. Our team will verify and process it shortly.
            </p>

            <div class="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                class="action-button border border-line bg-surfaceStrong/70 text-ink"
                @click="resetForm"
              >
                Submit another proof
              </button>
              <button
                type="button"
                class="action-button bg-ink text-canvas dark:bg-white dark:text-slate-950"
                @click="emit('close')"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
/* Modal entry/exit animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translate3d(0, 16px, 0) scale(0.975);
}

/* Micro-animations */
@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Custom modal scrollbar */
.modal-scroll {
  scrollbar-width: thin;
  scrollbar-color: oklch(var(--line) / 0.5) transparent;
}
.modal-scroll::-webkit-scrollbar {
  width: 6px;
}
.modal-scroll::-webkit-scrollbar-track {
  background: transparent;
  margin-block: 1rem;
}
.modal-scroll::-webkit-scrollbar-thumb {
  background: oklch(var(--line) / 0.5);
  border-radius: 9999px;
}
.modal-scroll::-webkit-scrollbar-thumb:hover {
  background: oklch(var(--line) / 0.7);
}
</style>

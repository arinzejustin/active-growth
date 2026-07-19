<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { siteName } from "~/utils/site";

const route = useRoute();
const isAuthenticated = ref(false);
const passwordInput = ref("");
const showPassword = ref(false);
const authError = ref("");
const isAuthenticating = ref(false);

useSeoMeta({
  title: `Admin Studio | ${siteName}`,
  description:
    "Protected Admin Portal for Active Growth Groups content management.",
});

async function loginAdmin() {
  authError.value = "";
  if (!passwordInput.value.trim()) {
    authError.value = "Please enter the admin password.";
    return;
  }
  isAuthenticating.value = true;
  try {
    const res = await $fetch<{ success: boolean; token?: string }>(
      "/api/admin/auth",
      {
        method: "POST",
        body: { password: passwordInput.value },
      },
    );
    if (res && res.success) {
      const tokenVal = res.token || "ag-authenticated-admin-session";
      isAuthenticated.value = true;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("ag_admin_token", tokenVal);
      }
      if (typeof document !== "undefined") {
        document.cookie = `ag_admin_token=${tokenVal}; path=/; max-age=86400; SameSite=Strict`;
      }
    }
  } catch (err: any) {
    authError.value =
      err?.data?.message || "Incorrect password. Please try again.";
  } finally {
    isAuthenticating.value = false;
  }
}

function logoutAdmin() {
  isAuthenticated.value = false;
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("ag_admin_token");
  }
  if (typeof document !== "undefined") {
    document.cookie = "ag_admin_token=; path=/; max-age=0";
  }
  passwordInput.value = "";
}

onMounted(() => {
  if (
    typeof localStorage !== "undefined" &&
    localStorage.getItem("ag_admin_token")
  ) {
    isAuthenticated.value = true;
  } else if (
    typeof document !== "undefined" &&
    document.cookie.includes("ag_admin_token=")
  ) {
    isAuthenticated.value = true;
  }
});
</script>

<template>
  <div class="min-h-screen bg-canvas text-ink pb-20">
    <!-- Top Admin Navbar -->
    <header
      class="sticky top-0 z-40 border-b border-line/70 bg-surface/85 backdrop-blur-xl"
    >
      <div class="shell flex h-16 items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 font-display text-sm font-bold tracking-tight text-ink hover:text-accent transition"
          >
            <span
              class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </span>
            <span>Back to Website</span>
          </NuxtLink>
          <span class="hidden h-4 w-px bg-line/80 sm:block" />
          <span class="font-display text-base font-bold text-ink">
            Active Growth Admin Studio
          </span>
        </div>

        <div class="flex items-center gap-3">
          <div
            class="hidden sm:flex items-center gap-2 rounded-full border border-line/60 bg-surfaceStrong/70 px-3 py-1.5 text-xs font-semibold text-muted"
          >
            <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Built-in Database Storage Enabled</span>
          </div>
          <button
            v-if="isAuthenticated"
            @click="logoutAdmin"
            type="button"
            class="rounded-full border border-line/80 bg-surfaceStrong px-4 py-1.5 text-xs font-bold text-ink transition hover:border-rose-500/50 hover:text-rose-400"
          >
            Lock / Sign Out
          </button>
        </div>
      </div>
    </header>

    <!-- Password Authentication Gate -->
    <div v-if="!isAuthenticated" class="shell pt-16 max-w-lg mx-auto">
      <div
        class="surface-card rounded-[2.5rem] p-8 sm:p-12 border border-line/80 shadow-2xl space-y-7"
      >
        <div
          class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent"
        >
          <svg
            class="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <div class="text-center space-y-2">
          <h1 class="font-display text-2xl sm:text-3xl font-bold text-ink">
            Protected Admin Studio
          </h1>
          <p class="text-sm text-muted">
            Please enter your administrator password to unlock story, program,
            and news management routes.
          </p>
        </div>

        <form @submit.prevent="loginAdmin" class="space-y-4">
          <div>
            <label
              class="block text-xs font-bold uppercase tracking-wider text-muted mb-2"
            >
              Administrator Password
            </label>
            <div class="relative">
              <input
                v-model="passwordInput"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Enter admin password..."
                class="w-full rounded-2xl border border-line/80 bg-surfaceStrong px-4 py-3.5 pr-12 text-sm text-ink focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition p-1.5 focus:outline-none"
                :title="showPassword ? 'Hide password' : 'Show password'"
              >
                <!-- Eye slash icon when showing -->
                <svg
                  v-if="showPassword"
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
                <!-- Eye icon when hidden -->
                <svg
                  v-else
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p
            v-if="authError"
            class="text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-center"
          >
            {{ authError }}
          </p>

          <button
            type="submit"
            :disabled="isAuthenticating"
            class="w-full rounded-2xl bg-accent px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-accent-soft disabled:opacity-50"
          >
            {{
              isAuthenticating ? "Verifying Password..." : "Unlock Admin Studio"
            }}
          </button>
        </form>
      </div>
    </div>

    <!-- Authenticated Workspace with Separate Routes -->
    <div v-else class="shell pt-8 space-y-8">
      <!-- Route Navigation Bar -->
      <nav
        class="surface-card rounded-[2rem] p-3 border border-line/80 flex flex-wrap items-center justify-between gap-4"
      >
        <div class="flex flex-wrap items-center gap-2">
          <NuxtLink
            to="/admin"
            class="rounded-full px-5 py-2.5 text-sm font-bold transition duration-200"
            :class="
              route.path === '/admin'
                ? 'bg-ink text-canvas dark:bg-white dark:text-slate-950 shadow-md'
                : 'text-muted hover:text-ink hover:bg-surfaceStrong'
            "
          >
            Dashboard Hub
          </NuxtLink>
          <NuxtLink
            to="/admin/stories"
            class="rounded-full px-5 py-2.5 text-sm font-bold transition duration-200"
            :class="
              route.path === '/admin/stories'
                ? 'bg-ink text-canvas dark:bg-white dark:text-slate-950 shadow-md'
                : 'text-muted hover:text-ink hover:bg-surfaceStrong'
            "
          >
            Stories Portal
          </NuxtLink>
          <NuxtLink
            to="/admin/programs"
            class="rounded-full px-5 py-2.5 text-sm font-bold transition duration-200"
            :class="
              route.path === '/admin/programs'
                ? 'bg-ink text-canvas dark:bg-white dark:text-slate-950 shadow-md'
                : 'text-muted hover:text-ink hover:bg-surfaceStrong'
            "
          >
            Programs Portal
          </NuxtLink>
          <NuxtLink
            to="/admin/news"
            class="rounded-full px-5 py-2.5 text-sm font-bold transition duration-200"
            :class="
              route.path === '/admin/news'
                ? 'bg-ink text-canvas dark:bg-white dark:text-slate-950 shadow-md'
                : 'text-muted hover:text-ink hover:bg-surfaceStrong'
            "
          >
            News Portal
          </NuxtLink>
        </div>
        <div
          class="hidden lg:flex items-center gap-2 text-xs font-semibold text-muted pr-3"
        >
          <span>Active Route:</span>
          <code
            class="text-accent font-mono bg-surfaceStrong px-2.5 py-1 rounded-lg border border-line/60"
            >{{ route.path }}</code
          >
        </div>
      </nav>

      <!-- Child Route Content -->
      <NuxtPage />
    </div>
  </div>
</template>

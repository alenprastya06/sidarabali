<template>
  <div class="relative min-h-screen bg-gray-50 overflow-hidden">
    <!-- Decorative background -->
    <div
      class="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none"
    ></div>
    <div
      class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-indigo-200 opacity-40 blur-3xl pointer-events-none"
    ></div>

    <div class="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <!-- Left brand/hero -->
      <section class="hidden lg:flex flex-col justify-between p-12 text-white bg-blue-900">
        <div>
          <div class="flex items-center space-x-3">
            <h1 class="text-2xl font-bold tracking-tight">Sidarabali</h1>
          </div>
          <h2 class="mt-10 text-4xl font-extrabold leading-tight">Selamat datang kembali.</h2>
          <p class="mt-4 text-indigo-100 max-w-md">
            Masuk untuk melanjutkan pengajuan dan memantau status dokumen Anda dengan cepat dan
            aman.
          </p>
        </div>
        <ul class="space-y-3 text-indigo-100/90">
          <li class="flex items-center space-x-3">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
              >✓</span
            >
            <span>Pelacakan status dokumen real‑time</span>
          </li>
          <li class="flex items-center space-x-3">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
              >✓</span
            >
            <span>Notifikasi pembaruan otomatis</span>
          </li>
          <li class="flex items-center space-x-3">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
              >✓</span
            >
            <span>Keamanan data terjamin</span>
          </li>
        </ul>
      </section>

      <!-- Right login card -->
      <section class="flex items-center justify-center px-6 py-12 lg:py-0">
        <div class="w-full max-w-md">
          <div class="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-8">
            <div class="mb-8">
              <div class="flex items-center space-x-3">
                <img
                  class="w-10 h-10"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Coat_of_arms_of_Jakarta.svg/1814px-Coat_of_arms_of_Jakarta.svg.png"
                  alt=""
                />
                <h2 class="text-2xl font-bold text-gray-900">Masuk ke akun</h2>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Gunakan kredensial yang terdaftar untuk mengakses layanan.
              </p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-5">
              <!-- Email -->
              <div>
                <label for="email" class="block text-gray-700 text-sm font-medium mb-2"
                  >Email</label
                >
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206"
                      />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    v-model="email"
                    autocomplete="email"
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Alamat email"
                    required
                  />
                </div>
              </div>

              <!-- Password -->
              <div>
                <label for="password" class="block text-gray-700 text-sm font-medium mb-2"
                  >Kata sandi</label
                >
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 11c-1.657 0-3 .895-3 2v3h6v-3c0-1.105-1.343-2-3-2z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 11V8a5 5 0 10-10 0v3"
                      />
                    </svg>
                  </span>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="password"
                    autocomplete="current-password"
                    class="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Kata sandi"
                    required
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    :aria-label="showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
                  >
                    <svg
                      v-if="!showPassword"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
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
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <svg
                      v-else
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 012.233-3.5M6.223 6.223A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.96 9.96 0 01-4.043 5.197M15 12a3 3 0 00-3-3m0 0a3 3 0 013 3m-3-3l-6.777-6.777M3 3l18 18"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Options -->
              <div class="flex items-center justify-between">
                <label class="flex items-center space-x-2 text-sm text-gray-600 select-none">
                  <input type="checkbox" class="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span>Ingat saya</span>
                </label>
                <a href="#" class="text-sm text-blue-600 hover:text-blue-700">Lupa kata sandi?</a>
              </div>

              <div v-if="authStore.error" class="text-red-600 text-sm text-center">
                {{ authStore.error }}
              </div>

              <button
                type="submit"
                class="relative inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
                :disabled="authStore.loading"
              >
                <span v-if="!authStore.loading">Masuk</span>
                <span v-else class="inline-flex items-center">
                  <svg
                    class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Memproses...
                </span>
              </button>
            </form>

            <p class="text-center text-gray-600 text-sm mt-6">
              Belum punya akun?
              <router-link to="/register" class="text-blue-600 hover:text-blue-800 font-medium"
                >Daftar</router-link
              >
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const handleLogin = async () => {
  await authStore.login({
    email: email.value,
    password: password.value,
  })
}
</script>

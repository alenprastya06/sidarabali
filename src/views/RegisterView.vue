<template>
  <div class="relative min-h-screen bg-gray-50 overflow-hidden">
    <!-- Decorative background -->
    <div
      class="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-200 opacity-40 blur-3xl pointer-events-none"
    ></div>
    <div
      class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-indigo-200 opacity-40 blur-3xl pointer-events-none"
    ></div>

    <div class="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <!-- Left brand/hero -->
      <section
        class="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
      >
        <div>
          <div class="flex items-center space-x-3">
            <svg class="h-9 w-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <h1 class="text-2xl font-bold tracking-tight">Sidarabali</h1>
          </div>
          <h2 class="mt-10 text-4xl font-extrabold leading-tight">Buat akun baru.</h2>
          <p class="mt-4 text-indigo-100 max-w-md">
            Daftar untuk memulai pengajuan dokumen Anda dengan mudah dan nyaman.
          </p>
        </div>
        <ul class="space-y-3 text-indigo-100/90">
          <li class="flex items-center space-x-3">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
              >✓</span
            >
            <span>Antarmuka yang sederhana dan cepat</span>
          </li>
          <li class="flex items-center space-x-3">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
              >✓</span
            >
            <span>Riwayat pengajuan tersimpan</span>
          </li>
          <li class="flex items-center space-x-3">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
              >✓</span
            >
            <span>Keamanan data terjamin</span>
          </li>
        </ul>
      </section>

      <!-- Right register card -->
      <section class="flex items-center justify-center px-6 py-12 lg:py-0">
        <div class="w-full max-w-md">
          <div class="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-8">
            <div class="mb-8">
              <div class="flex items-center space-x-3">
                <svg
                  class="h-8 w-8 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <h2 class="text-2xl font-bold text-gray-900">Daftar akun</h2>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Lengkapi data berikut untuk membuat akun baru.
              </p>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-5">
              <!-- Username -->
              <div>
                <label for="username" class="block text-gray-700 text-sm font-medium mb-2"
                  >Username</label
                >
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0012 20c2.5 0 4.847-.655 6.879-1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <input
                    id="username"
                    type="text"
                    v-model="username"
                    autocomplete="username"
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Nama pengguna"
                    required
                  />
                </div>
              </div>

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
                        d="M16 12H8m8 0a4 4 0 10-8 0m8 0v1a4 4 0 11-8 0v-1m0 0l-2 2m10-2l2 2"
                      />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    v-model="email"
                    autocomplete="email"
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="alamat@email.com"
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
                    autocomplete="new-password"
                    class="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Buat kata sandi"
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

              <!-- Terms -->
              <div class="flex items-start space-x-2 text-sm text-gray-600">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  class="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label for="terms">Saya menyetujui syarat dan ketentuan yang berlaku.</label>
              </div>

              <div v-if="authStore.error" class="text-red-600 text-sm text-center">
                {{ authStore.error }}
              </div>
              <div v-if="successMessage" class="text-green-600 text-sm text-center">
                {{ successMessage }}
              </div>

              <button
                type="submit"
                class="relative inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
                :disabled="authStore.loading"
              >
                <span v-if="!authStore.loading">Daftar</span>
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
              Sudah punya akun?
              <router-link to="/login" class="text-blue-600 hover:text-blue-800 font-medium"
                >Masuk</router-link
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
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const successMessage = ref('') // New ref for success message
const showPassword = ref(false)

const handleRegister = async () => {
  successMessage.value = '' // Clear previous messages
  const success = await authStore.register({
    username: username.value,
    email: email.value,
    password: password.value,
  })
  if (success) {
    successMessage.value = 'Pendaftaran berhasil! Silakan login.' // Set success message
    // Optionally, clear form fields after successful registration
    username.value = ''
    email.value = ''
    password.value = ''
    // Redirect after a short delay to allow user to see the success message
    setTimeout(() => {
      router.push('/login')
    }, 2000) // 2 second delay
  }
}
</script>

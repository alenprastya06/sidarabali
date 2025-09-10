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
          <h2 class="mt-10 text-4xl font-extrabold leading-tight">Lupa Kata Sandi?</h2>
          <p class="mt-4 text-indigo-100 max-w-md">
            Jangan khawatir! Masukkan email Anda dan kami akan mengirimkan link untuk mereset kata
            sandi Anda.
          </p>
        </div>
        <ul class="space-y-3 text-indigo-100/90">
          <li class="flex items-center space-x-3">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
              >✓</span
            >
            <span>Proses reset yang aman</span>
          </li>
          <li class="flex items-center space-x-3">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
              >✓</span
            >
            <span>Link berlaku 24 jam</span>
          </li>
          <li class="flex items-center space-x-3">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
              >✓</span
            >
            <span>Keamanan data terjamin</span>
          </li>
        </ul>
      </section>

      <!-- Right forgot password card -->
      <section class="flex items-center justify-center px-6 py-12 lg:py-0">
        <div class="w-full max-w-md">
          <!-- Form State -->
          <div
            v-if="!isSubmitted"
            class="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <div class="mb-8">
              <div class="flex items-center space-x-3">
                <img
                  class="w-10 h-10"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Coat_of_arms_of_Jakarta.svg/1814px-Coat_of_arms_of_Jakarta.svg.png"
                  alt=""
                />
                <h2 class="text-2xl font-bold text-gray-900">Lupa Kata Sandi</h2>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Masukkan alamat email yang terdaftar untuk menerima link reset password.
              </p>
            </div>

            <form @submit.prevent="submitForgotPassword" class="space-y-5">
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
                    :class="{ 'border-red-500': errors.email }"
                    placeholder="emailpengguna@contoh.com"
                    required
                  />
                </div>
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
              </div>

              <!-- Error Message -->
              <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-red-800">{{ errorMessage }}</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                class="relative inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
                :disabled="isLoading"
              >
                <span v-if="!isLoading">Kirim Link Reset</span>
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
                  Mengirim...
                </span>
              </button>
            </form>

            <p class="text-center text-gray-600 text-sm mt-6">
              Ingat kata sandi Anda?
              <router-link to="/login" class="text-blue-600 hover:text-blue-800 font-medium"
                >Kembali ke Login</router-link
              >
            </p>
          </div>

          <!-- Success State -->
          <div
            v-if="isSubmitted"
            class="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-8 text-center"
          >
            <div
              class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6"
            >
              <svg
                class="h-10 w-10 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Email Terkirim!</h3>
            <p class="text-gray-600 mb-6">
              Jika email <span class="font-medium">{{ email }}</span> terdaftar, sebuah link untuk
              reset password telah dikirimkan.
            </p>
            <p class="text-sm text-gray-500 mb-8">
              Periksa kotak masuk Anda dan klik link yang dikirimkan untuk mereset kata sandi. Link
              akan kadaluarsa dalam 24 jam.
            </p>

            <div class="space-y-3">
              <button
                @click="((isSubmitted = false), (email = ''), (errorMessage = ''))"
                class="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Kirim Ulang Email
              </button>
              <router-link
                to="/login"
                class="inline-block w-full px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-center"
              >
                Kembali ke Login
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// Reactive state variables
const email = ref('')
const isLoading = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')

// Form errors
const errors = ref({
  email: '',
})

// Form validation
const validateForm = () => {
  errors.value = { email: '' }
  let isValid = true

  if (!email.value) {
    errors.value.email = 'Email wajib diisi'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Format email tidak valid'
    isValid = false
  }

  return isValid
}

// Submit forgot password form
const submitForgotPassword = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    // Call API to request password reset
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`,
      {
        email: email.value,
      },
    )

    // Always show success message for security reasons
    // (even if email doesn't exist, we don't want to reveal that)
    isSubmitted.value = true
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value =
        error.response.data.message || 'Terjadi kesalahan saat mengirim email reset password.'
    } else {
      errorMessage.value = 'Terjadi kesalahan yang tidak diketahui.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Styling is handled by Tailwind CSS classes in the template */
</style>

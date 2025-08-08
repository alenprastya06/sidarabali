<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200"
  >
    <div
      class="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105"
    >
      <div class="flex items-center mb-8">
        <!-- Placeholder for a sleek logo -->
        <svg
          class="h-8 w-8 text-blue-600 mr-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
        <h2 class="text-3xl font-extrabold text-gray-900">Daftar</h2>
      </div>
      <form @submit.prevent="handleRegister">
        <div class="mb-5">
          <label for="username" class="block text-gray-700 text-sm font-medium mb-2"
            >Username</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Masukkan username Anda"
            required
          />
        </div>
        <div class="mb-5">
          <label for="email" class="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Masukkan alamat email Anda"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-medium mb-2"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Buat password"
            required
          />
        </div>

        <!-- Display success/error messages -->
        <div v-if="authStore.error" class="text-red-600 text-sm mb-4 text-center">
          {{ authStore.error }}
        </div>
        <div v-if="successMessage" class="text-green-600 text-sm mb-4 text-center">
          {{ successMessage }}
        </div>

        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full transition duration-300 ease-in-out transform hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'Mendaftar...' : 'Daftar' }}
        </button>
      </form>
      <p class="text-center text-gray-600 text-sm mt-6">
        Sudah punya akun?
        <router-link
          to="/login"
          class="text-blue-600 hover:text-blue-800 font-medium transition duration-200 ease-in-out"
          >Login di sini</router-link
        >
      </p>
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

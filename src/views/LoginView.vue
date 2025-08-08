<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200"
  >
    <div
      class="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105"
    >
      <div class="flex items-center mb-8">
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <h2 class="text-3xl font-extrabold text-gray-900">Loginsss</h2>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="mb-5">
          <label for="username" class="block text-gray-700 text-sm font-medium mb-2"
            >Username</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Enter your username"
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
            placeholder="Enter your password"
            required
          />
        </div>
        <div v-if="authStore.error" class="text-red-600 text-sm mb-4 text-center">
          {{ authStore.error }}
        </div>
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full transition duration-300 ease-in-out transform hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <p class="text-center text-gray-600 text-sm mt-6">
        Tidak punya akun?
        <router-link
          to="/register"
          class="text-blue-600 hover:text-blue-800 font-medium transition duration-200 ease-in-out"
          >Daftar di sini</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const handleLogin = async () => {
  await authStore.login({
    username: username.value,
    password: password.value,
  })
}
</script>

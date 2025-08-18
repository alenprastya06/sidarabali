<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <!-- Loading State -->
      <div v-if="status === 'loading'">
        <h2 class="text-2xl font-bold text-gray-800">Mengaktifkan Akun Anda...</h2>
        <p class="text-gray-600">Mohon tunggu sebentar.</p>
        <div class="flex justify-center items-center mt-4">
          <div
            class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
      </div>

      <!-- Success State -->
      <div v-if="status === 'success'">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
          <!-- Heroicons - Check Icon -->
          <svg
            class="h-10 w-10 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 class="mt-4 text-2xl font-bold text-gray-800">Aktivasi Berhasil!</h2>
        <p class="text-gray-600">{{ message }}</p>
        <router-link
          to="/login"
          class="mt-6 inline-block w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Lanjutkan ke Halaman Login
        </router-link>
      </div>

      <!-- Error State -->
      <div v-if="status === 'error'">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
          <!-- Heroicons - X Mark Icon -->
          <svg
            class="h-10 w-10 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 class="mt-4 text-2xl font-bold text-gray-800">Aktivasi Gagal</h2>
        <p class="text-red-600">{{ message }}</p>
        <router-link
          to="/register"
          class="mt-6 inline-block w-full px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Kembali ke Halaman Registrasi
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// Reactive state variables
const status = ref('loading') // 'loading', 'success', 'error'
const message = ref('')

// Get route information, including params
const route = useRoute()

// Function to call the backend API
const activateAccount = async (token) => {
  try {
    // Make sure to use your actual backend URL
    const response = await axios.get(`http://localhost:3000/api/auth/activate/${token}`)

    // Update state on success
    status.value = 'success'
    message.value = response.data.message
  } catch (error) {
    // Update state on error
    status.value = 'error'
    if (error.response && error.response.data && error.response.data.message) {
      message.value = error.response.data.message
    } else {
      message.value = 'Terjadi kesalahan yang tidak diketahui.'
    }
  }
}

// Lifecycle hook, runs when the component is mounted
onMounted(() => {
  const token = route.params.token
  if (token) {
    activateAccount(token)
  } else {
    status.value = 'error'
    message.value = 'Token aktivasi tidak ditemukan di URL.'
  }
})
</script>

<style scoped>
/* Styling is handled by Tailwind CSS classes in the template */
</style>

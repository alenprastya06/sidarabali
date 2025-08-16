<template>
  <UserHeader />
  <div class="min-h-screen bg-gray-50 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="pt-6">
        <button
          @click="$emit('edit-profile')"
          class="inline-flex items-center px-8 py-3 text-blue-600 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>
          Edit Profil
        </button>
      </div>
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-900"
        ></div>
        <p class="mt-4 text-gray-600 font-light">Memuat profil...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="bg-white rounded-2xl shadow-sm border border-red-100 p-8 max-w-md mx-auto">
          <div
            class="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
          </div>
          <p class="text-red-600 font-medium mb-4">{{ error }}</p>
          <button
            @click="fetchProfile"
            class="inline-flex items-center px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Coba Lagi
          </button>
        </div>
      </div>

      <div v-else-if="userProfile" class="space-y-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"></div>

        <!-- Profile Information Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Nama Lengkap</p>
                <p class="text-gray-900 font-semibold">{{ userProfile.nama_lengkap || '-' }}</p>
              </div>
            </div>
          </div>
          <!-- Email -->
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Email</p>
                <p class="text-gray-900 font-semibold">{{ userProfile.email || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- Phone -->
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                <svg
                  class="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Telepon</p>
                <p class="text-gray-900 font-semibold">{{ userProfile.phone || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- Birth Place -->
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                <svg
                  class="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Tempat Lahir</p>
                <p class="text-gray-900 font-semibold">{{ userProfile.tempat_lahir || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- Birth Date -->
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mr-3">
                <svg
                  class="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Tanggal Lahir</p>
                <p class="text-gray-900 font-semibold">
                  {{ formatDate(userProfile.tanggal_lahir) || '-' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Gender -->
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center mr-3">
                <svg
                  class="w-5 h-5 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Jenis Kelamin</p>
                <p class="text-gray-900 font-semibold">
                  {{
                    userProfile.jenis_kelamin === 'L'
                      ? 'Laki-laki'
                      : userProfile.jenis_kelamin === 'P'
                        ? 'Perempuan'
                        : '-'
                  }}
                </p>
              </div>
            </div>
          </div>

          <!-- Religion -->
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mr-3">
                <svg
                  class="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Agama</p>
                <p class="text-gray-900 font-semibold">{{ userProfile.agama || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- Citizenship -->
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-3">
                <svg
                  class="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Kewarganegaraan</p>
                <p class="text-gray-900 font-semibold">{{ userProfile.kewarganegaraan || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- ID Number -->
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center mr-3">
                <svg
                  class="w-5 h-5 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">No. KTP/SKTLD</p>
                <p class="text-gray-900 font-semibold">{{ userProfile.no_ktp_sktld || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- Job -->
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mr-3">
                <svg
                  class="w-5 h-5 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Pekerjaan</p>
                <p class="text-gray-900 font-semibold">{{ userProfile.pekerjaan || '-' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Address Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-start">
            <div
              class="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
            >
              <svg
                class="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-500 mb-1">Alamat Lengkap</p>
              <p class="text-gray-900 font-semibold leading-relaxed">
                {{ userProfile.alamat_lengkap || 'Alamat tidak tersedia' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Edit Button -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import UserHeader from '../UserHeader.vue'

const userProfile = ref(null)
const loading = ref(true)
const error = ref(null)

// Define emits
const emit = defineEmits(['edit-profile'])

const fetchProfile = async () => {
  loading.value = true
  error.value = null
  try {
    // Assuming your authentication token is stored in localStorage or a similar mechanism
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:3001/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    userProfile.value = response.data.user
  } catch (err) {
    console.error('Failed to fetch profile:', err)
    error.value = err.response?.data?.message || 'Gagal mengambil data profil. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

onMounted(fetchProfile)
</script>

<style scoped></style>

<template>
  <UserHeader />
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Buat Pengajuan</h1>
        <p class="text-gray-600">Lengkapi informasi pengajuan untuk melanjutkan proses</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
          <svg class="animate-spin h-5 w-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24">
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="text-blue-700 font-medium">Memuat data pengajuan...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <div
            class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            @click="fetchPengajuan"
            class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
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

      <!-- Main Content -->
      <div v-else class="space-y-6">
        <!-- Pengajuan Selection -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Pilih Jenis Pengajuan</h2>
          </div>

          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-700">
              Jenis Pengajuan <span class="text-red-500">*</span>
            </label>
            <select
              v-model="selectedPengajuanId"
              @change="onPengajuanChange"
              class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Pilih jenis pengajuan...</option>
              <option
                v-for="pengajuan in pengajuanList"
                :key="pengajuan.id_pengajuan"
                :value="pengajuan.id_pengajuan"
              >
                {{ pengajuan.nama_pengajuan }}
              </option>
            </select>

            <div v-if="selectedPengajuan" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start">
                <svg
                  class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div>
                  <p class="text-sm font-medium text-blue-800 mb-1">Pengajuan Terpilih:</p>
                  <p class="text-sm text-blue-700">{{ selectedPengajuan.nama_pengajuan }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Application Form -->
        <div
          v-if="selectedPengajuan"
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Form Pengajuan</h2>
          </div>

          <form @submit.prevent="createApplication" class="space-y-6">
            <!-- Application Title -->
            <div>
              <label for="applicationTitle" class="block text-sm font-medium text-gray-700 mb-2">
                Judul Pengajuan <span class="text-red-500">*</span>
              </label>
              <input
                id="applicationTitle"
                v-model="applicationTitle"
                type="text"
                :placeholder="selectedPengajuan.nama_pengajuan"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
              <p class="text-sm text-gray-500 mt-1">
                Judul akan otomatis terisi sesuai jenis pengajuan yang dipilih
              </p>
            </div>

            <!-- Additional Notes -->
            <div>
              <label for="additionalNotes" class="block text-sm font-medium text-gray-700 mb-2">
                Catatan Tambahan
              </label>
              <textarea
                id="additionalNotes"
                v-model="additionalNotes"
                rows="4"
                placeholder="Tambahkan catatan atau keterangan tambahan untuk pengajuan ini..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="isSubmitting || !canSubmit"
                class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
              >
                <svg
                  v-if="isSubmitting"
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <svg
                  v-else
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                {{ isSubmitting ? 'Membuat Pengajuan...' : 'Buat Pengajuan' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Success Message -->
        <div v-if="applicationCreated" class="bg-green-50 border border-green-200 rounded-xl p-6">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
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
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-green-800 mb-1">Pengajuan Berhasil Dibuat!</h3>
              <p class="text-green-700 text-sm">ID Pengajuan: {{ createdApplicationId }}</p>
              <p class="text-green-700 text-sm">Judul: {{ createdApplicationTitle }}</p>
            </div>
          </div>
          <div class="mt-4 flex space-x-3">
            <button
              @click="resetForm"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Buat Pengajuan Baru
            </button>
            <button
              @click="goToDocuments"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Lihat Dokumen
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'
import UserHeader from './UserHeader.vue'

const router = useRouter()
const route = useRoute()

// Reactive data
const pengajuanList = ref([])
const selectedPengajuanId = ref('')
const applicationTitle = ref('')
const additionalNotes = ref('')
const isLoading = ref(true)
const isSubmitting = ref(false)
const error = ref(null)
const applicationCreated = ref(false)
const createdApplicationId = ref(null)
const createdApplicationTitle = ref(null)

// Get token from localStorage
const token = localStorage.getItem('token')
const userId = parseInt(localStorage.getItem('id')) || null

// Computed properties
const selectedPengajuan = computed(() => {
  return pengajuanList.value.find((p) => p.id_pengajuan === parseInt(selectedPengajuanId.value))
})

const canSubmit = computed(() => {
  return selectedPengajuanId.value && applicationTitle.value.trim()
})

// Methods
const fetchPengajuan = async () => {
  try {
    isLoading.value = true
    error.value = null

    const response = await axios.get('http://localhost:3001/api/documents/pengajuan/names', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    pengajuanList.value = response.data

    // Check if there's an id_pengajuan in route params or query
    const routePengajuanId = route.params.id_pengajuan || route.query.id_pengajuan
    if (routePengajuanId) {
      selectedPengajuanId.value = parseInt(routePengajuanId)
      onPengajuanChange()
    }
  } catch (err) {
    console.error('Error fetching pengajuan:', err)
    error.value = err.response?.data?.message || 'Gagal memuat data pengajuan'
  } finally {
    isLoading.value = false
  }
}

const onPengajuanChange = () => {
  if (selectedPengajuan.value) {
    // Auto-fill application title with pengajuan name
    applicationTitle.value = selectedPengajuan.value.nama_pengajuan
  } else {
    applicationTitle.value = ''
  }
  additionalNotes.value = ''
  applicationCreated.value = false
  createdApplicationId.value = null
  createdApplicationTitle.value = null
}

const createApplication = async () => {
  if (!canSubmit.value) return

  try {
    isSubmitting.value = true

    const payload = {
      id_pengajuan: parseInt(selectedPengajuanId.value),
      application_title: applicationTitle.value,
      additional_notes: additionalNotes.value || null,
      user_id: userId,
    }

    const response = await axios.post('http://localhost/api/documents/applications', payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    // Handle success
    createdApplicationId.value = response.data.id || 'N/A'
    createdApplicationTitle.value = applicationTitle.value
    applicationCreated.value = true

    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Pengajuan berhasil dibuat',
      confirmButtonColor: '#10b981',
    })
  } catch (err) {
    console.error('Error creating application:', err)

    Swal.fire({
      icon: 'error',
      title: 'Gagal Membuat Pengajuan',
      text: err.response?.data?.message || 'Terjadi kesalahan saat membuat pengajuan',
      confirmButtonColor: '#ef4444',
    })
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  selectedPengajuanId.value = ''
  applicationTitle.value = ''
  additionalNotes.value = ''
  applicationCreated.value = false
  createdApplicationId.value = null
  createdApplicationTitle.value = null
}

const goToDocuments = () => {
  // Navigate to documents page or back to HalamanPermohonan
  router.push('/halaman-permohonan')
}

// Lifecycle
onMounted(() => {
  if (!token || !userId) {
    router.push('/login')
    return
  }
  fetchPengajuan()
})
</script>

<style scoped>
/* Add any custom styles here */
</style>

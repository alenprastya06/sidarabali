<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const documents = ref([])
const isLoading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const sortBy = ref('newest') // 'newest', 'oldest', 'name'

const filteredDocuments = computed(() => {
  let filtered = documents.value.filter(
    (doc) =>
      doc.nama_pengajuan.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      doc.file_name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )

  if (sortBy.value === 'newest') {
    filtered.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at))
  } else if (sortBy.value === 'oldest') {
    filtered.sort((a, b) => new Date(a.uploaded_at) - new Date(b.uploaded_at))
  } else if (sortBy.value === 'name') {
    filtered.sort((a, b) => a.nama_pengajuan.localeCompare(b.nama_pengajuan))
  }

  return filtered
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const downloadFile = (fileUrl, fileName) => {
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = fileName
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const previewFile = (fileUrl) => {
  window.open(fileUrl, '_blank')
}

const fetchDocuments = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await axios.get('http://localhost:3001/api/generated-documents/me')
    if (Array.isArray(response.data.data)) {
      documents.value = response.data.data
    } else if (Array.isArray(response.data)) {
      documents.value = response.data
    } else {
      console.warn('API response is not in the expected format:', response.data)
      documents.value = []
    }
  } catch (err) {
    console.error('Error fetching documents:', err)
    const errorMessage = err.response?.data?.message || 'Terjadi kesalahan saat mengambil dokumen. Silakan coba lagi.'
    Swal.fire({
      icon: 'error',
      title: 'Gagal Mengambil Dokumen',
      text: errorMessage,
    })
    error.value = errorMessage
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDocuments()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Dokumen Saya</h1>
              <p class="mt-2 text-gray-600">Kelola dan unduh dokumen yang telah dibuat</p>
            </div>
            <div class="flex items-center space-x-4">
              <div class="bg-blue-50 px-4 py-2 rounded-lg">
                <span class="text-sm font-medium text-blue-700">
                  Total: {{ documents.length }} dokumen
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filter Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-2">Cari Dokumen</label>
            <div class="relative">
              <svg
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari berdasarkan nama atau file..."
                class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div class="sm:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
            <select
              v-model="sortBy"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
              <option value="name">Nama A-Z</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-16">
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
          ></div>
          <p class="text-gray-600">Memuat dokumen...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div class="flex justify-center mb-4">
          <svg class="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-red-800 mb-2">Terjadi Kesalahan</h3>
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button
          @click="fetchDocuments"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Documents List -->
      <div v-else-if="filteredDocuments.length > 0" class="space-y-4">
        <div
          v-for="doc in filteredDocuments"
          :key="doc.id"
          class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-6">
            <div class="flex items-start justify-between">
              <!-- Document Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center mb-2">
                  <svg
                    class="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <h3 class="text-lg font-semibold text-gray-900 truncate">
                    {{ doc.nama_pengajuan }}
                  </h3>
                </div>

                <div class="space-y-2">
                  <p class="text-sm text-gray-600">
                    <span class="font-medium">File:</span> {{ doc.file_name }}
                  </p>
                  <p class="text-sm text-gray-600">
                    <span class="font-medium">Dibuat:</span> {{ formatDate(doc.uploaded_at) }}
                  </p>
                  <p class="text-sm text-gray-600">
                    <span class="font-medium">Pemilik:</span> {{ doc.username }}
                  </p>
                  <p class="text-sm text-gray-600">
                    <span class="font-medium">Ukuran:</span> {{ formatFileSize(doc.file_size) }}
                  </p>
                </div>

                <!-- Tags -->
                <div class="mt-3 flex flex-wrap gap-2">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    PDF
                  </span>
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    Dokumen Resmi
                  </span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="ml-6 flex flex-col space-y-2">
                <button
                  @click="previewFile(doc.file_path)"
                  class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  Preview
                </button>
                <button
                  @click="downloadFile(doc.file_path, doc.file_name)"
                  class="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  Unduh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="mx-auto w-24 h-24 mb-6">
          <svg
            class="w-full h-full text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          {{ searchQuery ? 'Tidak ada dokumen yang cocok' : 'Belum ada dokumen' }}
        </h3>
        <p class="text-gray-500">
          {{
            searchQuery
              ? 'Coba ubah kata kunci pencarian Anda'
              : 'Dokumen yang Anda buat akan muncul di sini'
          }}
        </p>
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Hapus Filter
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles if needed */
</style>

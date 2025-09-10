<template>
  <div class="container mx-auto p-4 sm:p-2 lg:p-2">
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
      role="alert"
    >
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline ml-2">{{ error }}</span>
    </div>

    <div v-else-if="drafts.length === 0" class="flex justify-center items-center h-64">
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p class="text-gray-500 text-xl">Tidak ada draf dokumen yang tersedia.</p>
      </div>
    </div>

    <div v-else class="bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- Table Header -->
      <div class="bg-gradient-to-r from-blue-900 to-blue-900 px-6 py-4">
        <h3 class="text-lg font-semibold text-white">Daftar Draf Dokumen</h3>
      </div>

      <!-- Table Content -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Informasi Pengajuan
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Pemilik & Lokasi
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Detail Lahan
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="draft in drafts"
              :key="draft.id"
              class="hover:bg-gray-50 transition-colors duration-200"
            >
              <!-- Informasi Pengajuan -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col">
                  <div class="text-sm font-semibold text-gray-900">
                    {{ draft.JenisPengajuan.name }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    <span class="font-medium">Kode:</span> {{ draft.kode_pengajuan }}
                  </div>
                </div>
              </td>

              <!-- Pemilik & Lokasi -->
              <td class="px-6 py-4">
                <div class="flex flex-col">
                  <div class="text-sm font-medium text-gray-900">
                    {{ draft.Owner.nama }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1 max-w-xs">
                    {{ draft.Lahan.alamat_rt }}, {{ draft.Lahan.alamat_rw }},<br />
                    {{ draft.Lahan.wilayah_kelurahan }}, {{ draft.Lahan.wilayah_kecamatan }}
                  </div>
                </div>
              </td>

              <!-- Detail Lahan -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  <span class="font-semibold">{{ draft.Lahan.luas_lahan }}</span> m²
                </div>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(draft.status)"
                  class="inline-flex px-3 py-1 text-xs font-semibold rounded-full capitalize"
                >
                  {{ draft.status }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="flex justify-end space-x-3">
                  <!-- Download Button -->
                  <a
                    :href="draft.draft_document_url"
                    target="_blank"
                    class="inline-flex items-center px-3 py-2 bg-blue-900 hover:bg-blue-900 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    title="Unduh Draf Dokumen"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Unduh
                  </a>

                  <!-- Generate Final Document Button -->
                  <button
                    @click="generateFinalDocument(draft.id)"
                    :disabled="isGenerating[draft.id]"
                    class="inline-flex items-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
                    title="Generate Dokumen Final"
                  >
                    <span v-if="isGenerating[draft.id]" class="flex items-center">
                      <div
                        class="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white mr-1"
                      ></div>
                      Loading...
                    </span>
                    <span v-else class="flex items-center">
                      <svg
                        class="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Generate
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table Footer -->
      <div class="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">
            Total: <span class="font-semibold">{{ drafts.length }}</span> draf dokumen
          </div>
          <div class="text-xs text-gray-400">Klik "Generate" untuk membuat dokumen final</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Base URL for the API
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`

// Reactive state for data, loading, and errors
const drafts = ref([])
const isLoading = ref(true)
const error = ref(null)
const isGenerating = ref({})

// Function to fetch data from the API
const fetchDrafts = async () => {
  isLoading.value = true
  error.value = null

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found. Please log in.')
    }

    const response = await fetch(`${BASE_URL}/pengajuan/generated-drafts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    drafts.value = data
  } catch (err) {
    console.error('Failed to fetch drafts:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

// Function to generate the final document
const generateFinalDocument = async (id) => {
  if (isGenerating.value[id]) return

  isGenerating.value = { ...isGenerating.value, [id]: true }

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found. Please log in.')
    }

    const response = await fetch(`${BASE_URL}/pengajuan/${id}/send-document`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || `Failed to generate document! Status: ${response.status}`,
      )
    }

    alert('Dokumen final berhasil digenerasi dan dikirim!')
    await fetchDrafts() // Refresh the list after successful generation
  } catch (err) {
    console.error('Failed to generate final document:', err)
    alert(`Gagal menggenerasi dokumen: ${err.message}`)
  } finally {
    isGenerating.value = { ...isGenerating.value, [id]: false }
  }
}

// Function to get status class for styling
const getStatusClass = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800 border border-green-200'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    case 'rejected':
      return 'bg-red-100 text-red-800 border border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}

// Fetch data when the component is mounted
onMounted(() => {
  fetchDrafts()
})
</script>

<style scoped>
/* Custom scrollbar for the table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>

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

    <div v-else-if="allPengajuan.length === 0" class="flex justify-center items-center h-64">
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
              v-for="pengajuan in allPengajuan"
              :key="pengajuan.id_pengajuan"
              class="hover:bg-gray-50 transition-colors duration-200"
            >
              <!-- Informasi Pengajuan -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col">
                  <div class="text-sm font-semibold text-gray-900">
                    {{ pengajuan.JenisPengajuan.name }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    <span class="font-medium">Kode:</span> {{ pengajuan.kode_pengajuan }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    <span class="font-medium">Dibuat:</span> {{ formatDate(pengajuan.createdAt) }}
                  </div>
                </div>
              </td>

              <!-- Pemilik & Lokasi -->
              <td class="px-6 py-4">
                <div class="flex flex-col">
                  <div class="text-sm font-medium text-gray-900">
                    {{ pengajuan.Owner.nama }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    <span class="font-medium">NIK:</span> {{ pengajuan.Owner.nik }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1 max-w-xs">
                    RT {{ pengajuan.Lahan.alamat_rt }}, RW {{ pengajuan.Lahan.alamat_rw }}<br />
                    {{ pengajuan.Lahan.wilayah_kelurahan }}, {{ pengajuan.Lahan.wilayah_kecamatan
                    }}<br />
                    {{ pengajuan.Lahan.wilayah_kota }}
                  </div>
                </div>
              </td>

              <!-- Detail Lahan -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col">
                  <div class="text-sm text-gray-900">
                    <span class="font-semibold">{{ pengajuan.Lahan.luas_lahan }}</span> m²
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    {{ pengajuan.Lahan.jenis_bangunan }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    No. Surat: {{ pengajuan.Lahan.no_surat_rt }}
                  </div>
                </div>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(pengajuan.status)"
                  class="inline-flex px-3 py-1 text-xs font-semibold rounded-full capitalize"
                >
                  {{ getStatusText(pengajuan.status) }}
                </span>
                <div class="text-xs text-gray-500 mt-1">
                  {{ pengajuan.Documents.length }} dokumen
                </div>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="flex justify-end space-x-3">
                  <!-- Download Draft Button (if available) -->
                  <a
                    v-if="pengajuan.draft_document_url"
                    :href="pengajuan.draft_document_url"
                    target="_blank"
                    class="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
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
                    Draft
                  </a>

                  <!-- Download Final Document Button (if available) -->
                  <a
                    v-if="pengajuan.final_document_url"
                    :href="pengajuan.final_document_url"
                    target="_blank"
                    class="inline-flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    title="Unduh Dokumen Final"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Final
                  </a>

                  <!-- Generate Final Document Button -->
                  <button
                    v-if="pengajuan.status !== 'completed' || !pengajuan.final_document_url"
                    @click="generateFinalDocument(pengajuan.id_pengajuan)"
                    :disabled="isGenerating[pengajuan.id_pengajuan]"
                    class="inline-flex items-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
                    title="Generate Dokumen Final"
                  >
                    <span v-if="isGenerating[pengajuan.id_pengajuan]" class="flex items-center">
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
            Total: <span class="font-semibold">{{ allPengajuan.length }}</span> pengajuan
          </div>
          <div class="text-xs text-gray-400">Klik "Generate" untuk membuat dokumen final</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// Base URL for the API
const BASE_URL = 'http://localhost:3000/api'

const users = ref([])
const isLoading = ref(true)
const error = ref(null)
const isGenerating = ref({})

// Computed property to flatten all pengajuan from all users
const allPengajuan = computed(() => {
  const pengajuanList = []
  users.value.forEach((user) => {
    if (user.pengajuan && Array.isArray(user.pengajuan)) {
      user.pengajuan.forEach((pengajuan) => {
        pengajuanList.push(pengajuan)
      })
    }
  })
  return pengajuanList
})

const fetchDrafts = async () => {
  isLoading.value = true
  error.value = null

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found. Please log in.')
    }

    const response = await fetch(`${BASE_URL}/pengajuan`, {
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

    // Handle the response structure based on your JSON data
    if (Array.isArray(data)) {
      users.value = data
    } else {
      users.value = []
    }
  } catch (err) {
    console.error('Failed to fetch drafts:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const generateFinalDocument = async (pengajuanId) => {
  if (isGenerating.value[pengajuanId]) return

  isGenerating.value = { ...isGenerating.value, [pengajuanId]: true }

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found. Please log in.')
    }

    const response = await fetch(`${BASE_URL}/pengajuan/${pengajuanId}/send-document`, {
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
    isGenerating.value = { ...isGenerating.value, [pengajuanId]: false }
  }
}

// Function to get status class for styling
const getStatusClass = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 border border-green-200'
    case 'approved':
      return 'bg-blue-100 text-blue-800 border border-blue-200'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    case 'rejected':
      return 'bg-red-100 text-red-800 border border-red-200'
    case 'draft':
      return 'bg-gray-100 text-gray-800 border border-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}

// Function to get readable status text
const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'Selesai'
    case 'approved':
      return 'Disetujui'
    case 'pending':
      return 'Menunggu'
    case 'rejected':
      return 'Ditolak'
    case 'draft':
      return 'Draf'
    default:
      return status
  }
}

// Function to format date
const formatDate = (dateString) => {
  if (!dateString) return '-'

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch (err) {
    return dateString
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

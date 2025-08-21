<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <div class="flex">
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error</h3>
            <div class="mt-2 text-sm text-red-700">{{ error }}</div>
          </div>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Disetujui</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ totalApproved }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ uniqueUsers }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Dokumen</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ totalDocuments }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div v-if="!loading && !error" class="bg-white shadow overflow-hidden sm:rounded-md">
        <div v-if="approvedPengajuan.length > 0">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Jenis Pengajuan
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama Pemilik
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tanggal Dibuat
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="pengajuan in approvedPengajuan"
                  :key="pengajuan.kode_pengajuan"
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ pengajuan.JenisPengajuan.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ pengajuan.Owner.nama }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ getUserName(pengajuan.user_id) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      <svg class="w-2 h-2 mr-1 fill-current" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Disetujui
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDateShort(pengajuan.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center space-x-3">
                      <!-- View Detail Button -->
                      <button
                        @click="openDetailModal(pengajuan)"
                        class="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                        title="Lihat Detail"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>

                      <!-- Edit Document Button -->
                      <button
                        @click="openDocumentEditor(pengajuan)"
                        class="text-amber-600 hover:text-amber-900 transition-colors duration-200"
                        title="Edit Dokumen"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>

                      <!-- Generate Document Button -->
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Belum ada pengajuan yang disetujui</h3>
          <p class="mt-1 text-sm text-gray-500">Pengajuan yang disetujui akan muncul di sini.</p>
        </div>
      </div>

      <!-- Detail Modal Component -->
      <PengajuanDetailModal
        v-if="showDetailModal"
        :pengajuan="selectedPengajuan"
        @close="closeDetailModal"
      />

      <!-- Document Editor Modal Component -->
      <EditModal
        v-if="showDocumentEditor"
        :pengajuan="selectedPengajuanForEdit"
        :show="showDocumentEditor"
        @close="closeDocumentEditor"
        @success="handleDocumentEditorSuccess"
        @error="handleDocumentEditorError"
      />

      <!-- Success/Error Messages -->
      <div
        v-if="successMessage"
        class="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-md p-4 shadow-lg z-50"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
          </div>
          <div class="ml-auto pl-3">
            <button @click="successMessage = ''" class="text-green-400 hover:text-green-600">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import PengajuanDetailModal from './Admin/PengajuanDetailModal.vue'
import EditModal from './Admin/EditModal.vue'
import axios from 'axios'

// Reactive data
const loading = ref(true)
const error = ref(null)
const data = ref([])
const showDetailModal = ref(false)
const selectedPengajuan = ref(null)
const showDocumentEditor = ref(false)
const selectedPengajuanForEdit = ref(null)
const generatingPengajuanId = ref(null)
const successMessage = ref('')
const token = localStorage.getItem('token')

// Computed properties
const approvedPengajuan = computed(() => {
  const allPengajuan = []

  data.value.forEach((user) => {
    if (user.pengajuan && Array.isArray(user.pengajuan)) {
      const approvedUserPengajuan = user.pengajuan.filter((p) => p.status === 'approved')
      allPengajuan.push(...approvedUserPengajuan)
    }
  })

  return allPengajuan.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
})

const totalApproved = computed(() => approvedPengajuan.value.length)

const uniqueUsers = computed(() => {
  const userIds = new Set(approvedPengajuan.value.map((p) => p.user_id))
  return userIds.size
})

const totalDocuments = computed(() => {
  return approvedPengajuan.value.reduce((total, pengajuan) => {
    return total + (pengajuan.Documents ? pengajuan.Documents.length : 0)
  }, 0)
})

// Methods
const fetchData = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await axios.get('https://bitwisi.cloud/api/pengajuan', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    data.value = response.data
  } catch (err) {
    error.value = `Failed to fetch data: ${err.response?.data?.message || err.message}`
    console.error('Error fetching pengajuan data:', err)
  } finally {
    loading.value = false
  }
}

const getUserName = (userId) => {
  const user = data.value.find((u) => u.id === userId)
  return user ? user.username : 'Unknown'
}

const formatDateShort = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const openDetailModal = (pengajuan) => {
  selectedPengajuan.value = pengajuan
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedPengajuan.value = null
}

const openDocumentEditor = (pengajuan) => {
  selectedPengajuanForEdit.value = pengajuan
  showDocumentEditor.value = true
}

const closeDocumentEditor = () => {
  showDocumentEditor.value = false
  selectedPengajuanForEdit.value = null
}

const handleDocumentEditorSuccess = (message) => {
  successMessage.value = message
  // Auto hide success message after 5 seconds
  setTimeout(() => {
    successMessage.value = ''
  }, 5000)
}

const handleDocumentEditorError = (errorMessage) => {
  error.value = errorMessage
}

const generateDocument = async (pengajuan) => {
  if (!pengajuan) {
    error.value = 'Data pengajuan tidak valid'
    return
  }

  try {
    const pengajuanId = pengajuan.id_pengajuan || pengajuan.id

    if (!pengajuanId) {
      throw new Error('ID Pengajuan tidak ditemukan')
    }

    generatingPengajuanId.value = pengajuanId
    error.value = null

    console.log('Generating document for pengajuan ID:', pengajuanId)

    const response = await axios.post(
      `https://bitwisi.cloud/api/pengajuan/${pengajuanId}/generate-document`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
        timeout: 60000, // 60 second timeout
      },
    )

    // Validate response
    if (!response.data || response.data.size === 0) {
      throw new Error('File yang dihasilkan kosong')
    }

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
    const link = document.createElement('a')
    link.href = url

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '')
    const filename = `dokumen-${pengajuan.kode_pengajuan}-${timestamp}.pdf`

    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)

    successMessage.value = 'Dokumen berhasil di-generate dan diunduh!'

    // Auto hide success message after 5 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  } catch (err) {
    console.error('Error generating document:', err)

    if (err.code === 'ECONNABORTED') {
      error.value = 'Timeout: Proses generate dokumen terlalu lama'
    } else if (err.response?.status === 404) {
      error.value = 'Endpoint generate dokumen tidak ditemukan'
    } else if (err.response?.status === 403) {
      error.value = 'Tidak memiliki izin untuk generate dokumen'
    } else if (err.response?.status === 500) {
      error.value = 'Error server saat generate dokumen. Silakan coba lagi.'
    } else {
      error.value = `Gagal generate dokumen: ${err.response?.data?.message || err.message}`
    }
  } finally {
    generatingPengajuanId.value = null
  }
}

// Auto-hide error messages after 10 seconds
watch(error, (newError) => {
  if (newError) {
    setTimeout(() => {
      error.value = null
    }, 10000)
  }
})

// Lifecycle
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

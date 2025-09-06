<template>
  <UserHeader />
  <div class="bg-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 p-5">
      <div class="bg-white rounded-lg shadow-lg p-4">
        <button @click="goBack" class="flex items-center gap-2 py-2 rounded mb-5">
          <i class="fa-solid fa-arrow-left"></i>
          Kembali
        </button>
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800">Daftar Pengajuan Perlu Revisi</h2>
          <p class="text-gray-600 mt-1">Kelola pengajuan yang memerlukan perbaikan</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600">Memuat data...</span>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="px-6 py-8">
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
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
                <h3 class="text-sm font-medium text-red-800">Error</h3>
                <p class="mt-1 text-sm text-red-700">{{ error }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Kode Pengajuan
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Jenis Pengajuan
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>

                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tanggal Update
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="pengajuan in pengajuanList" :key="pengajuan.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ pengajuan.kode_pengajuan }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {{ pengajuan.JenisPengajuan?.name || '-' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getStatusBadgeClass(pengajuan.status)"
                  >
                    {{ getStatusText(pengajuan.status) }}
                  </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(pengajuan.updatedAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="openEditModal(pengajuan)"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div v-if="!loading && !error && pengajuanList.length === 0" class="text-center py-12">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
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
            <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada pengajuan</h3>
            <p class="mt-1 text-sm text-gray-500">Belum ada pengajuan yang memerlukan revisi.</p>
          </div>
        </div>
      </div>

      <!-- Edit Modal -->
      <div
        v-if="showEditModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div
          class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white"
        >
          <div class="mt-3">
            <!-- Modal Header -->
            <div class="flex justify-between items-center pb-4 border-b">
              <h3 class="text-lg font-medium text-gray-900">
                Edit Pengajuan: {{ selectedPengajuan?.kode_pengajuan }}
              </h3>
              <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="mt-4 max-h-96 overflow-y-auto">
              <div class="space-y-4">
                <!-- Pengajuan Info -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-900 mb-2">Informasi Pengajuan</h4>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="font-medium text-gray-600">Kode:</span>
                      <span class="ml-2">{{ selectedPengajuan?.kode_pengajuan }}</span>
                    </div>
                    <div>
                      <span class="font-medium text-gray-600">Jenis:</span>
                      <span class="ml-2">{{ selectedPengajuan?.JenisPengajuan?.name }}</span>
                    </div>
                    <div>
                      <span class="font-medium text-gray-600">Status:</span>
                      <span class="ml-2">{{ getStatusText(selectedPengajuan?.status) }}</span>
                    </div>
                    <div>
                      <span class="font-medium text-gray-600">Update Terakhir:</span>
                      <span class="ml-2">{{ formatDate(selectedPengajuan?.updatedAt) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Documents List -->
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">Dokumen dan Upload Perbaikan</h4>
                  <div class="space-y-3">
                    <div
                      v-for="doc in selectedPengajuan?.Documents"
                      :key="doc.id"
                      class="border border-gray-200 rounded-lg p-4"
                    >
                      <div class="space-y-3">
                        <div class="flex justify-between items-start">
                          <div class="flex-1">
                            <h5 class="font-medium text-gray-900 capitalize">
                              {{ doc.document_type.replace(/_/g, ' ') }}
                            </h5>
                            <p class="text-sm text-gray-600 mt-1">{{ doc.original_name }}</p>
                            <div class="flex items-center mt-2">
                              <span
                                class="inline-flex px-2 py-1 text-xs rounded-full"
                                :class="getDocumentStatusClass(doc.status)"
                              >
                                {{ getDocumentStatusText(doc.status) }}
                              </span>
                            </div>
                            <div
                              v-if="doc.admin_note"
                              class="mt-2 p-2 bg-red-50 border border-red-200 rounded"
                            >
                              <p class="text-sm text-red-800">
                                <span class="font-medium">Catatan Admin:</span> {{ doc.admin_note }}
                              </p>
                            </div>
                          </div>
                          <a
                            :href="doc.file_url"
                            target="_blank"
                            class="ml-4 inline-flex items-center px-3 py-1 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
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
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            Download
                          </a>
                        </div>

                        <!-- Upload Section for rejected documents -->
                        <div v-if="doc.status === 'rejected'" class="border-t pt-3">
                          <div class="flex items-center space-x-3">
                            <div class="flex-1">
                              <input
                                :ref="`fileInput-${doc.id}`"
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                @change="(event) => handleFileSelect(event, doc.id)"
                                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              />
                            </div>
                            <button
                              @click="uploadDocument(doc.id)"
                              :disabled="!selectedFiles[doc.id] || uploadingFiles[doc.id]"
                              class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                              <svg
                                v-if="uploadingFiles[doc.id]"
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
                              {{ uploadingFiles[doc.id] ? 'Uploading...' : 'Upload' }}
                            </button>
                          </div>
                          <div
                            v-if="updatedDocuments[doc.id]"
                            class="mt-2 p-2 bg-green-50 border border-green-200 rounded"
                          >
                            <p class="text-sm text-green-800">
                              <span class="font-medium">Dokumen baru berhasil diupload:</span>
                              {{ updatedDocuments[doc.id].original_name }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex justify-between items-center pt-4 border-t mt-4">
              <div class="text-sm text-gray-600">
                <span v-if="hasUpdatedDocuments" class="text-green-600 font-medium">
                  {{ Object.keys(updatedDocuments).length }} dokumen telah diupdate
                </span>
              </div>
              <div class="flex justify-end space-x-3">
                <button
                  @click="closeEditModal"
                  class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Tutup
                </button>
                <button
                  @click="submitRevision"
                  :disabled="!hasUpdatedDocuments || submittingRevision"
                  class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg
                    v-if="submittingRevision"
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
                  {{ submittingRevision ? 'Mengirim...' : 'Kirim Revisi' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import UserHeader from '../UserHeader.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  router.back()
}

const pengajuanList = ref([])
const loading = ref(true)
const error = ref(null)
const selectedPengajuan = ref(null)
const showEditModal = ref(false)
const selectedFiles = ref({})
const uploadingFiles = ref({})
const updatedDocuments = ref({})
const submittingRevision = ref(false)

// Methods
const fetchPengajuanData = async () => {
  try {
    loading.value = true
    error.value = null

    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('Token tidak ditemukan. Silakan login terlebih dahulu.')
    }

    const response = await fetch('https://bitwisi.cloud/api/pengajuan/needs-revision', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    pengajuanList.value = data || []
  } catch (err) {
    error.value = err.message
    console.error('Error fetching pengajuan data:', err)
  } finally {
    loading.value = false
  }
}

const openEditModal = (pengajuan) => {
  selectedPengajuan.value = pengajuan
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedPengajuan.value = null
  // Reset upload states
  selectedFiles.value = {}
  uploadingFiles.value = {}
  updatedDocuments.value = {}
  submittingRevision.value = false
}

const viewDetails = (pengajuan) => {
  // Implementation for viewing details
  console.log('View details for:', pengajuan)
  // You can implement navigation to detail page or open another modal
}

const handleEdit = () => {
  // Implementation for handling edit
  console.log('Edit pengajuan:', selectedPengajuan.value)
  // You can implement the edit functionality here
  closeEditModal()
}

const handleFileSelect = (event, docId) => {
  const file = event.target.files[0]
  if (file) {
    selectedFiles.value[docId] = file
    // Clear any previous upload result for this document
    if (updatedDocuments.value[docId]) {
      delete updatedDocuments.value[docId]
    }
  }
}

const uploadDocument = async (docId) => {
  const file = selectedFiles.value[docId]
  if (!file) return

  try {
    uploadingFiles.value[docId] = true

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('https://invitations.my.id/api/upload-file', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`)
    }

    const result = await response.json()

    if (result.status === 200) {
      // Find the document in selectedPengajuan to get document_type
      const currentDocument = selectedPengajuan.value.Documents.find((doc) => doc.id === docId)

      // Store the updated document info using data.path from upload response
      updatedDocuments.value[docId] = {
        document_type: currentDocument.document_type,
        file_url: result.data.path,
        original_name: file.name,
      }

      // Clear the selected file from reactive state
      delete selectedFiles.value[docId]

      console.log('Upload successful:', result.data.path)
    } else {
      throw new Error(result.message || 'Upload failed')
    }
  } catch (err) {
    console.error('Upload error:', err)
    alert(`Upload gagal: ${err.message}`)
  } finally {
    uploadingFiles.value[docId] = false
  }
}

const submitRevision = async () => {
  if (!selectedPengajuan.value || Object.keys(updatedDocuments.value).length === 0) {
    return
  }

  try {
    submittingRevision.value = true

    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token tidak ditemukan')
    }

    // Prepare documents array - combine existing documents with updated ones
    const documents = selectedPengajuan.value.Documents.map((doc) => {
      // If document has been updated, use new data
      if (updatedDocuments.value[doc.id]) {
        return updatedDocuments.value[doc.id]
      }
      // Otherwise use existing document data
      return {
        document_type: doc.document_type,
        file_url: doc.file_url,
        original_name: doc.original_name,
      }
    })

    const requestBody = {
      documents: documents,
    }

    const response = await fetch(
      `https://bitwisi.cloud/api/pengajuan/${selectedPengajuan.value.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    )

    if (!response.ok) {
      throw new Error(`Pengajuan gagal: ${response.status}`)
    }

    const result = await response.json()

    alert('Revisi berhasil dikirim!')
    closeEditModal()

    // Refresh the data
    await fetchPengajuanData()
  } catch (err) {
    console.error('Submit revision error:', err)
    alert(`Gagal mengirim revisi: ${err.message}`)
  } finally {
    submittingRevision.value = false
  }
}

const getStatusBadgeClass = (status) => {
  const statusClasses = {
    menunggu_perbaikan: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-gray-100 text-gray-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const statusTexts = {
    menunggu_perbaikan: 'Menunggu Perbaikan',
    approved: 'Disetujui',
    rejected: 'Ditolak',
    pending: 'Menunggu',
  }
  return statusTexts[status] || status
}

const getDocumentStatusClass = (status) => {
  const statusClasses = {
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getDocumentStatusText = (status) => {
  const statusTexts = {
    approved: 'Disetujui',
    rejected: 'Ditolak',
    pending: 'Menunggu',
  }
  return statusTexts[status] || status
}

const formatDate = (dateString) => {
  if (!dateString) return '-'

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// Computed property to check if there are updated documents
const hasUpdatedDocuments = computed(() => {
  return Object.keys(updatedDocuments.value).length > 0
})

// Lifecycle
onMounted(() => {
  fetchPengajuanData()
})
</script>

<style scoped>
/* Additional custom styles if needed */
.container {
  max-width: 1200px;
}
</style>

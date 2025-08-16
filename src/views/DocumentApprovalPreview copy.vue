<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const usersWithDocuments = ref([])
const loading = ref(true)
const error = ref(null)

// State for user dropdowns
const expandedUsers = ref(new Set())

// Get token with error handling
const getAuthToken = () => {
  try {
    return localStorage.getItem('token')
  } catch (err) {
    console.error('Failed to access localStorage:', err)
    return null
  }
}

const fetchDocuments = async () => {
  try {
    loading.value = true
    error.value = null

    const token = getAuthToken()
    if (!token) {
      throw new Error('Token autentikasi tidak ditemukan. Silakan login kembali.')
    }

    const response = await axios.get('http://localhost:3001/api/documents', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    })

    if (response.data && Array.isArray(response.data)) {
      usersWithDocuments.value = response.data
    } else {
      throw new Error('Format data tidak valid dari server')
    }
  } catch (err) {
    console.error('Error fetching documents:', err)

    if (err.code === 'ECONNABORTED') {
      error.value = 'Koneksi timeout. Periksa koneksi internet Anda.'
    } else if (err.response) {
      const status = err.response.status
      switch (status) {
        case 401:
          error.value = 'Sesi telah berakhir. Silakan login kembali.'
          break
        case 403:
          error.value = 'Anda tidak memiliki akses untuk melihat dokumen ini.'
          break
        case 404:
          error.value = 'Endpoint tidak ditemukan. Periksa konfigurasi server.'
          break
        case 500:
          error.value = 'Terjadi kesalahan server. Coba lagi nanti.'
          break
        default:
          error.value = `Kesalahan ${status}: ${err.response.data?.message || 'Terjadi kesalahan tidak dikenal'}`
      }
    } else if (err.request) {
      error.value = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
    } else {
      error.value = err.message || 'Terjadi kesalahan tidak dikenal'
    }
  } finally {
    loading.value = false
  }
}

// Flatten all documents for counting
const allDocuments = computed(() => {
  const docs = []
  usersWithDocuments.value.forEach((user) => {
    if (user.documents && Array.isArray(user.documents)) {
      user.documents.forEach((doc) => {
        docs.push({
          ...doc,
          user_info: {
            username: user.username,
            email: user.email,
            user_id: user.user_id,
          },
        })
      })
    }
  })
  return docs
})

// Filter users who have documents and sort documents by date
const usersWithSortedDocuments = computed(() => {
  return usersWithDocuments.value
    .filter((user) => user.documents && user.documents.length > 0)
    .map((user) => ({
      ...user,
      documents: [...user.documents].sort(
        (a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at),
      ),
    }))
    .sort((a, b) => {
      // Sort users by latest document upload date
      const latestA = new Date(a.documents[0]?.uploaded_at || 0)
      const latestB = new Date(b.documents[0]?.uploaded_at || 0)
      return latestB - latestA
    })
})

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return 'Tanggal tidak valid'
    }
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch (err) {
    return 'Tanggal tidak valid'
  }
}

const getStatusClass = (status) => {
  const statusMap = {
    pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    approved: 'bg-green-100 text-green-800 border border-green-200',
    rejected: 'bg-red-100 text-red-800 border border-red-200',
    draft: 'bg-gray-100 text-gray-800 border border-gray-200',
  }
  return statusMap[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border border-gray-200'
}

const getStatusText = (doc) => {
  return doc.status_text || doc.status || 'Status tidak dikenal'
}

const getFileIcon = (mimeType, fileName) => {
  if (!mimeType && fileName) {
    const ext = fileName.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return '🖼️'
    if (['pdf'].includes(ext)) return '📄'
    if (['doc', 'docx'].includes(ext)) return '📝'
    if (['xls', 'xlsx'].includes(ext)) return '📊'
  }

  if (mimeType?.includes('image')) return '🖼️'
  if (mimeType?.includes('pdf')) return '📄'
  if (mimeType?.includes('document')) return '📝'
  if (mimeType?.includes('spreadsheet')) return '📊'

  return '📁'
}

const handleFileView = (doc) => {
  if (!doc.file_path) {
    alert('File tidak tersedia')
    return
  }

  let fileUrl = doc.file_path
  if (!fileUrl.startsWith('http')) {
    fileUrl = `http://localhost:3001/${fileUrl}`
  }

  window.open(fileUrl, '_blank', 'noopener,noreferrer')
}

const retryFetch = () => {
  fetchDocuments()
}

// Toggle user dropdown
const toggleUserExpansion = (userId) => {
  if (expandedUsers.value.has(userId)) {
    expandedUsers.value.delete(userId)
  } else {
    expandedUsers.value.add(userId)
  }
}

const isUserExpanded = (userId) => {
  return expandedUsers.value.has(userId)
}

// Expand/collapse all users
const expandAllUsers = () => {
  const allUserIds = usersWithSortedDocuments.value.map((user) => user.user_id)
  allUserIds.forEach((id) => expandedUsers.value.add(id))
}

const collapseAllUsers = () => {
  expandedUsers.value.clear()
}

// Update document status
const updateDocumentStatus = async (documentId, status, notes = '') => {
  try {
    const token = getAuthToken()
    if (!token) throw new Error('Token autentikasi tidak ditemukan.')

    const response = await axios.put(
      `http://localhost:3001/api/documents/${documentId}/status`,
      {
        status: status,
        admin_notes: notes,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return response.status === 200
  } catch (err) {
    console.error('Error updating document status:', err)
    throw new Error(err.response?.data?.message || err.message)
  }
}

// Individual document actions
const approveDocument = async (doc) => {
  const notes = prompt('Catatan admin (opsional):') || ''

  if (!confirm(`Setujui dokumen "${doc.nama_pengajuan}"?`)) return

  try {
    await updateDocumentStatus(doc.id, 'approved', notes)
    alert('Dokumen berhasil disetujui!')
    await fetchDocuments()
  } catch (err) {
    alert(`Gagal menyetujui dokumen: ${err.message}`)
  }
}

const rejectDocument = async (doc) => {
  const notes = prompt('Alasan penolakan:') || ''

  if (!notes.trim()) {
    alert('Alasan penolakan wajib diisi!')
    return
  }

  if (!confirm(`Tolak dokumen "${doc.nama_pengajuan}"?`)) return

  try {
    await updateDocumentStatus(doc.id, 'rejected', notes)
    alert('Dokumen berhasil ditolak!')
    await fetchDocuments()
  } catch (err) {
    alert(`Gagal menolak dokumen: ${err.message}`)
  }
}

// Get status counts for each user
const getUserStatusCounts = (user) => {
  const counts = {
    pending: 0,
    approved: 0,
    rejected: 0,
    total: user.documents?.length || 0,
  }

  user.documents?.forEach((doc) => {
    const status = doc.status?.toLowerCase()
    if (counts.hasOwnProperty(status)) {
      counts[status]++
    }
  })

  return counts
}

onMounted(() => {
  fetchDocuments()
})
</script>

<template>
  <div class="container mx-auto p-4 max-w-7xl">
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Daftar Dokumen</h1>
        <p class="text-gray-600 mt-1">
          Total {{ allDocuments.length }} dokumen dari
          {{ usersWithSortedDocuments.length }} pengguna
        </p>
      </div>

      <div class="flex gap-2">
        <button
          v-if="usersWithSortedDocuments.length > 0"
          @click="expandAllUsers"
          class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 text-sm"
        >
          Buka Semua
        </button>
        <button
          v-if="usersWithSortedDocuments.length > 0"
          @click="collapseAllUsers"
          class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 text-sm"
        >
          Tutup Semua
        </button>
        <button
          @click="retryFetch"
          :disabled="loading"
          class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
        >
          <svg
            v-if="!loading"
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
          {{ loading ? 'Memuat...' : 'Refresh' }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <p class="text-gray-600">Memuat dokumen...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div class="text-red-600 mb-4">
        <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="text-lg font-semibold">Terjadi Kesalahan</h3>
      </div>
      <p class="text-red-700 mb-4">{{ error }}</p>
      <button
        @click="retryFetch"
        class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
      >
        Coba Lagi
      </button>
    </div>

    <!-- No Documents State -->
    <div v-else-if="usersWithSortedDocuments.length === 0" class="text-center py-12">
      <svg
        class="w-16 h-16 mx-auto text-gray-400 mb-4"
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
      <h3 class="text-lg font-semibold text-gray-600 mb-2">Tidak Ada Dokumen</h3>
      <p class="text-gray-500">Belum ada dokumen yang diunggah.</p>
    </div>

    <!-- Users with Documents List -->
    <div v-else class="space-y-4">
      <div
        v-for="user in usersWithSortedDocuments"
        :key="user.user_id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <!-- User Header (Clickable) -->
        <div
          @click="toggleUserExpansion(user.user_id)"
          class="p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors duration-200 border-b border-gray-200"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-blue-600 font-semibold text-lg">
                    {{ user.username.charAt(0).toUpperCase() }}
                  </span>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">{{ user.username }}</h3>
                <p class="text-sm text-gray-500">{{ user.email }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <!-- Status Summary -->
              <div class="flex gap-2 text-xs">
                <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  {{ getUserStatusCounts(user).pending }} Pending
                </span>
                <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {{ getUserStatusCounts(user).approved }} Approved
                </span>
                <span class="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  {{ getUserStatusCounts(user).rejected }} Rejected
                </span>
              </div>

              <!-- Total Documents Count -->
              <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {{ user.documents.length }} dokumen
              </div>

              <!-- Expand/Collapse Icon -->
              <svg
                :class="{ 'transform rotate-180': isUserExpanded(user.user_id) }"
                class="w-5 h-5 text-gray-500 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Documents List (Collapsible) -->
        <div v-show="isUserExpanded(user.user_id)" class="divide-y divide-gray-100">
          <div
            v-for="doc in user.documents"
            :key="doc.id"
            class="p-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <div class="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
              <div class="flex-grow min-w-0">
                <div class="flex items-start gap-3 mb-3">
                  <span class="text-2xl">{{
                    getFileIcon(doc.mime_type, doc.original_name || doc.file_name)
                  }}</span>
                  <div class="min-w-0 flex-grow">
                    <h4 class="text-lg font-semibold text-blue-600 mb-2 break-words">
                      {{ doc.nama_pengajuan || 'Nama tidak tersedia' }}
                    </h4>
                    <div
                      class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600"
                    >
                      <div>
                        <span class="font-medium text-gray-700">Jenis:</span>
                        <span class="ml-1">{{
                          doc.document_type?.toUpperCase().replace(/_/g, ' ') || 'Tidak diketahui'
                        }}</span>
                      </div>
                      <div>
                        <span class="font-medium text-gray-700">Tanggal:</span>
                        <span class="ml-1">{{ formatDate(doc.uploaded_at) }}</span>
                      </div>
                      <div class="md:col-span-2">
                        <span class="font-medium text-gray-700">Berkas:</span>
                        <span class="ml-1 break-all">{{
                          doc.original_name || doc.file_name || 'Tidak tersedia'
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="flex flex-col sm:flex-row gap-3 items-start sm:items-center xl:flex-shrink-0"
              >
                <div
                  :class="getStatusClass(doc.status)"
                  class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap"
                >
                  {{ getStatusText(doc) }}
                </div>

                <div class="flex gap-2">
                  <button
                    @click="handleFileView(doc)"
                    :disabled="!doc.file_path"
                    class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-3 rounded-lg transition duration-200 text-sm whitespace-nowrap flex items-center gap-1"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    Lihat
                  </button>

                  <div v-if="doc.status === 'pending'" class="flex gap-1">
                    <button
                      @click="approveDocument(doc)"
                      class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg transition duration-200 text-sm whitespace-nowrap flex items-center"
                      title="Setujui"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                    <button
                      @click="rejectDocument(doc)"
                      class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg transition duration-200 text-sm whitespace-nowrap flex items-center"
                      title="Tolak"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth expand/collapse animation */
.user-documents {
  transition: all 0.3s ease-in-out;
}

/* Hover effects */
.user-header:hover {
  transform: translateY(-1px);
}

/* Status badge transitions */
.status-badge {
  transition: all 0.2s ease-in-out;
}
</style>

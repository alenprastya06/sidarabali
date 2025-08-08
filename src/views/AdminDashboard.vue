<template>
  <div class="p-8 antialiased max-w-7xl mx-auto">
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div
        class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition duration-300 ease-in-out"
      >
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
        <p class="text-4xl font-bold text-blue-600">{{ totalUniqueUsers }}</p>
      </div>
      <div
        class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition duration-300 ease-in-out"
      >
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Total Documents</h3>
        <p class="text-4xl font-bold text-green-600">{{ totalDocuments }}</p>
      </div>
      <div
        class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition duration-300 ease-in-out"
      >
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Pending Reviews</h3>
        <p class="text-4xl font-bold text-yellow-600">{{ pendingCount }}</p>
      </div>
      <div
        class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition duration-300 ease-in-out"
      >
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Completion Rate</h3>
        <p class="text-4xl font-bold text-purple-600">
          {{ completionRate }}<span class="text-2xl">%</span>
        </p>
      </div>
    </section>

    <div v-if="totalPages > 1" class="mt-10 flex justify-center">
      <nav
        class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <button
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150"
        >
          <span class="sr-only">Previous</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition duration-150',
            page === currentPage
              ? 'z-10 bg-blue-600 border-blue-600 text-white pointer-events-none'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ page }}
        </button>
        <button
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150"
        >
          <span class="sr-only">Next</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>

    <div
      v-if="showGenerateSuratModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50"
      @click.self="showGenerateSuratModal = false"
    >
      <div
        class="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl transform transition-all duration-300 scale-100 opacity-100"
      >
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Generate Surat Pengantar</h3>
        <p class="text-gray-700 mb-4">
          Generating surat for:
          <span class="font-semibold">{{ suratForm.username }}</span> (Submission:
          <span class="font-semibold">{{ suratForm.submission_name }}</span
          >)
        </p>

        <div class="mb-4">
          <label for="letterNumber" class="block text-sm font-medium text-gray-700 mb-1"
            >Nomor Surat:</label
          >
          <input
            type="text"
            id="letterNumber"
            v-model="suratForm.letter_number"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., SP/ADM/001/2025"
          />
        </div>

        <div class="mb-6">
          <label for="letterContent" class="block text-sm font-medium text-gray-700 mb-1"
            >Isi Surat:</label
          >
          <textarea
            id="letterContent"
            v-model="suratForm.letter_content"
            rows="6"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y"
            placeholder="Masukkan isi surat pengantar di sini..."
          ></textarea>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            @click="showGenerateSuratModal = false"
            type="button"
            class="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Batal
          </button>
          <button
            @click="submitGenerateSurat"
            :disabled="generatingSurat"
            type="button"
            class="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="generatingSurat"
              class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
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
            {{ generatingSurat ? 'Generating...' : 'Generate Surat' }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50"
      @click.self="showSuccessModal = false"
    >
      <div
        class="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center transform transition-all duration-300 scale-100 opacity-100"
      >
        <div class="flex flex-col items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-check-circle text-green-500 mb-3"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
          </svg>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Berhasil!</h3>
        </div>
        <p class="text-gray-700 mb-6">{{ successMessage }}</p>

        <div v-if="generatedSuratDetails.letter_path" class="mb-6">
          <a
            :href="getDownloadLink(generatedSuratDetails.suratId)"
            target="_blank"
            class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            @click="showSuccessModal = false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-download mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Unduh Surat
          </a>
        </div>
        <button
          @click="showSuccessModal = false"
          type="button"
          class="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'
import ListSurat from './ListSurat.vue' // Keep this if ListSurat is a nested component

const authStore = useAuthStore()
const documentsByUsers = ref([])
const loadingDocuments = ref(true)
const expandedUsers = ref([])
const expandedSubmissions = ref([])
const searchQuery = ref('')
const submissionTypeFilter = ref('')
const statusFilter = ref('')
const completenessFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 3

const API_DOCUMENTS_URL = 'https://bitwize.cloud/api/documents'

const API_GENERATE_SURAT_URL = 'https://bitwize.cloud/api/documents/generate-surat'

const showGenerateSuratModal = ref(false)
const generatingSurat = ref(false)
const suratForm = ref({
  user_id: null,
  id_pengajuan: null,
  username: '',
  submission_name: '',
  letter_number: '',
  letter_content: '',
  approved_by: null,
})

const showSuccessModal = ref(false)
const successMessage = ref('')
const generatedSuratDetails = ref({
  suratId: null,
  letter_path: '',
  file_name: '',
})

const allSubmissionTypes = ref([
  {
    value:
      'Standar Pelayanan Kelengkapan Administrasi Permohonan Rekomendasi Hak Atas Tanah Eks Kota Praja',
    label:
      'Standar Pelayanan Kelengkapan Administrasi Permohonan Rekomendasi Hak Atas Tanah Eks Kota Praja',
  },
  {
    value: 'Standar Pelayanan Pencatatan Surat Pernyataan Ahli Waris WNI',
    label: 'Standar Pelayanan Pencatatan Surat Pernyataan Ahli Waris WNI',
  },
  {
    value: 'Standar Pelayanan Pemberian Surat Keterangan Peningkatan Hak atas tanah',
    label: 'Standar Pelayanan Pemberian Surat Keterangan Peningkatan Hak atas tanah',
  },
])
const fetchAllDocuments = async () => {
  loadingDocuments.value = true
  try {
    const response = await axios.get(API_DOCUMENTS_URL, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    documentsByUsers.value = response.data
  } catch (err) {
    console.error('Error fetching all documents:', err)
    alert('Gagal memuat dokumen.')
  } finally {
    loadingDocuments.value = false
  }
}
const toggleUserExpansion = (userId) => {
  const index = expandedUsers.value.indexOf(userId)
  if (index > -1) {
    expandedUsers.value.splice(index, 1)
  } else {
    expandedUsers.value.push(userId)
  }
}

const toggleSubmissionExpansion = (submissionKey) => {
  const index = expandedSubmissions.value.indexOf(submissionKey)
  if (index > -1) {
    expandedSubmissions.value.splice(index, 1)
  } else {
    expandedSubmissions.value.push(submissionKey)
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-gree-500 text-white border border-emerald-200'
    case 'rejected':
      return 'bg-rose-100 text-rose-700 border border-rose-200'
    case 'pending':
    default:
      return 'bg-amber-100 text-amber-700 border border-amber-200'
  }
}

const formatDocumentType = (value) => {
  if (!value) return ''
  return value.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

const canGenerateSurat = (submissionDocs) => {
  if (!submissionDocs || submissionDocs.length === 0) {
    return false
  }
  const allApproved = submissionDocs.every((doc) => doc.status === 'approved')
  return allApproved
}

const openGenerateSuratModal = (userId, idPengajuan, username, submissionName) => {
  suratForm.value = {
    user_id: userId,
    id_pengajuan: idPengajuan,
    username: username,
    submission_name: submissionName,
    letter_number: `SP/${submissionName.replace(/\s/g, '').substring(0, 5).toUpperCase()}/${new Date().getFullYear()}/${Date.now().toString().slice(-4)}`, // Example default letter number
    letter_content: ``, // Example default content
    approved_by: authStore.user?.id, // Use the ID of the logged-in admin
  }
  showGenerateSuratModal.value = true
}

const submitGenerateSurat = async () => {
  if (
    !suratForm.value.letter_number ||
    !suratForm.value.letter_content ||
    !suratForm.value.approved_by
  ) {
    alert('Nomor Surat dan Isi Surat tidak boleh kosong. Pastikan Anda login sebagai Admin.')
    return
  }

  generatingSurat.value = true
  try {
    const payload = {
      user_id: suratForm.value.user_id,
      id_pengajuan: suratForm.value.id_pengajuan,
      letter_number: suratForm.value.letter_number,
      letter_content: suratForm.value.letter_content,
      approved_by: suratForm.value.approved_by,
    }

    const response = await axios.post(API_GENERATE_SURAT_URL, payload, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    successMessage.value = response.data.message || 'Surat pengantar berhasil dibuat!'
    generatedSuratDetails.value = {
      suratId: response.data.suratId,
      letter_path: response.data.letter_path,
      file_name: response.data.file_name,
    }
    showGenerateSuratModal.value = false
    showSuccessModal.value = true
    await fetchAllDocuments()
  } catch (err) {
    console.error('Error generating surat:', err)
    const errorMessage = err.response?.data?.message || 'Gagal membuat surat pengantar.'

    alert(errorMessage)
  } finally {
    generatingSurat.value = false
  }
}

const getDownloadLink = (suratId) => {
  return `https://bitwize.cloud/api/documents/surat/download/${suratId}`
}

const allFlatDocuments = computed(() => {
  const flatDocs = []
  documentsByUsers.value.forEach((userGroup) => {
    if (userGroup.documents && Array.isArray(userGroup.documents)) {
      userGroup.documents.forEach((doc) => {
        flatDocs.push({ ...doc, username: userGroup.username, email: userGroup.email })
      })
    }
  })
  return flatDocs
})

// Dashboard Stats
const totalUniqueUsers = computed(() => {
  return new Set(allFlatDocuments.value.map((doc) => doc.user_id)).size
})

const totalDocuments = computed(() => {
  return allFlatDocuments.value.length
})

const pendingCount = computed(() => {
  return allFlatDocuments.value.filter((doc) => doc.status === 'pending').length
})

const completionRate = computed(() => {
  const total = allFlatDocuments.value.length
  if (total === 0) return '0.00'
  const complete = allFlatDocuments.value.filter((doc) => doc.is_complete === 1).length
  return ((complete / total) * 100).toFixed(0)
})

const groupedAndFilteredUsers = computed(() => {
  let processedUsers = JSON.parse(JSON.stringify(documentsByUsers.value))
  processedUsers = processedUsers
    .map((userGroup) => {
      let filteredDocuments = userGroup.documents
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        const userMatch = userGroup.username.toLowerCase().includes(query)
        filteredDocuments = filteredDocuments.filter(
          (doc) => doc.file_name.toLowerCase().includes(query) || userMatch,
        )
      }

      if (submissionTypeFilter.value) {
        filteredDocuments = filteredDocuments.filter(
          (doc) => doc.nama_pengajuan === submissionTypeFilter.value,
        )
      }
      if (statusFilter.value) {
        filteredDocuments = filteredDocuments.filter((doc) => doc.status === statusFilter.value)
      }
      if (completenessFilter.value) {
        const isComplete = completenessFilter.value === 'complete'
        filteredDocuments = filteredDocuments.filter(
          (doc) => (doc.is_complete === 1) === isComplete,
        )
      }
      return { ...userGroup, documents: filteredDocuments }
    })
    .filter((userGroup) => userGroup.documents.length > 0)
  return processedUsers
    .map((userGroup) => {
      const submissions = {}
      let total_documents_for_user = 0
      const stats = { pending: 0, approved: 0, rejected: 0, complete: 0, incomplete: 0 }

      userGroup.documents.forEach((doc) => {
        const submissionName = doc.nama_pengajuan || 'Unspecified Submission' // Fallback for safety
        if (!submissions[submissionName]) {
          submissions[submissionName] = []
        }
        submissions[submissionName].push(doc)

        total_documents_for_user++
        stats[doc.status] = (stats[doc.status] || 0) + 1
        stats[doc.is_complete === 1 ? 'complete' : 'incomplete']++
      })

      return {
        user_id: userGroup.user_id,
        username: userGroup.username,
        submissions: submissions, // Grouped by nama_pengajuan
        total_documents: total_documents_for_user,
        stats: stats,
      }
    })
    .sort((a, b) => a.username.localeCompare(b.username))
})

const paginatedGroupedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return groupedAndFilteredUsers.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(groupedAndFilteredUsers.value.length / itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisiblePages = 5
  let startPage, endPage

  if (totalPages.value <= maxVisiblePages) {
    startPage = 1
    endPage = totalPages.value
  } else {
    // Calculate start and end page for pagination
    startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2))
    endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})

watch([searchQuery, submissionTypeFilter, statusFilter, completenessFilter], () => {
  currentPage.value = 1
})

onMounted(() => {
  fetchAllDocuments()
})
</script>

<style scoped>
.bg-no-repeat.bg-right-1rem {
  background-position: right 1rem center;
  background-size: 0.8em 0.5em; /* Adjust size of SVG arrow */
  padding-right: 2.5rem; /* Make space for the arrow */
}
</style>

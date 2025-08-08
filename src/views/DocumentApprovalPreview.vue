<template>
  <div class="p-8 antialiased max-w-7xl mx-auto">
    <section class="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
      <div class="flex flex-wrap gap-5 items-center">
        <div class="flex-1 min-w-80">
          <label for="search" class="sr-only">Search</label>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              id="search"
              placeholder="Search by username or filename..."
              class="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 transition duration-200"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <div v-if="loadingDocuments" class="text-center text-gray-600 py-10">
        <p class="mt-3 text-lg">Loading documents...</p>
      </div>
      <div v-else-if="paginatedGroupedUsers.length === 0" class="text-center text-gray-600 py-10">
        <p class="text-lg">No documents found matching your criteria.</p>
      </div>
      <div v-else>
        <div
          v-for="userGroup in paginatedGroupedUsers"
          :key="userGroup.user_id"
          class="bg-white rounded-xl shadow-lg border border-gray-100 mb-6 overflow-hidden"
        >
          <div
            class="bg-gray-50 p-5 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
            @click="toggleUserExpansion(userGroup.user_id)"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-md"
              >
                <span class="text-white font-bold text-xl">{{
                  userGroup.username.charAt(0).toUpperCase()
                }}</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800">
                  {{ userGroup.username }}
                </h3>
                <p class="text-sm text-gray-600">
                  Total Submissions: {{ Object.keys(userGroup.submissions).length }} | Total
                  Documents: {{ userGroup.total_documents }}
                </p>
              </div>
            </div>
            <div class="flex items-center space-x-6">
              <div class="flex space-x-3">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200"
                >
                  {{ userGroup.stats.pending }} pending
                </span>
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                >
                  {{ userGroup.stats.approved }} approved
                </span>
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200"
                >
                  {{ userGroup.stats.rejected }} rejected
                </span>
              </div>
            </div>
          </div>

          <div v-if="expandedUsers.includes(userGroup.user_id)">
            <div
              v-for="(submissionDocs, submissionName) in userGroup.submissions"
              :key="submissionName"
              class="border-t border-gray-100 bg-white"
            >
              <div
                class="bg-gray-100 p-4 pl-12 border-b border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors duration-200 flex items-center justify-between"
                @click="toggleSubmissionExpansion(`${userGroup.user_id}-${submissionName}`)"
              >
                <div class="flex items-center space-x-3">
                  <div
                    class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  >
                    {{ submissionName.charAt(0).toUpperCase() }}
                  </div>
                  <h4 class="text-md font-semibold text-gray-700">
                    {{ submissionName }} ({{ submissionDocs.length }} documents)
                  </h4>
                </div>
                <button
                  v-if="canGenerateSurat(submissionDocs)"
                  @click.stop="
                    openGenerateSuratModal(
                      userGroup.user_id,
                      submissionDocs[0].id_pengajuan,
                      userGroup.username,
                      submissionName,
                    )
                  "
                  class="ml-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out text-sm flex items-center"
                >
                  Generate Surat
                </button>
              </div>

              <div
                v-if="expandedSubmissions.includes(`${userGroup.user_id}-${submissionName}`)"
                class="overflow-x-auto"
              >
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        File Name
                      </th>
                      <th
                        class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Document Type
                      </th>
                      <th
                        class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Completeness
                      </th>
                      <th
                        class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Uploaded At
                      </th>
                      <th
                        class="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                      v-for="doc in submissionDocs"
                      :key="doc.id"
                      class="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td class="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                        {{ doc.file_name }}
                      </td>
                      <td class="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                        {{ formatDocumentType(doc.document_type) }}
                      </td>
                      <td class="py-4 px-6 whitespace-nowrap text-sm">
                        <span
                          :class="getStatusColor(doc.status)"
                          class="py-1.5 px-3 rounded-full text-xs font-semibold"
                        >
                          {{ doc.status }}
                        </span>
                      </td>
                      <td class="py-4 px-6 whitespace-nowrap text-sm">
                        <span
                          :class="
                            doc.is_complete
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-100 text-rose-700 border border-rose-200'
                          "
                          class="py-1.5 px-3 rounded-full text-xs font-semibold"
                        >
                          {{ doc.is_complete ? 'Complete' : 'Incomplete' }}
                        </span>
                      </td>
                      <td class="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                        {{ new Date(doc.uploaded_at).toLocaleString() }}
                      </td>
                      <td class="py-4 px-6 text-center whitespace-nowrap text-sm font-medium">
                        <router-link
                          :to="`/admin/document/${doc.id}`"
                          class="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-sm transition duration-200 ease-in-out text-sm"
                        >
                          Review
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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
        </button>
      </nav>
    </div>

    <div
      v-if="showGenerateSuratModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50"
      @click.self="showGenerateSuratModal = false"
    >
      <div
        style="height: 800px"
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
          <label for="letterContent" class="block text-sm font-medium text-gray-700 mb-2">
            Isi Surat:
          </label>
          <textarea
            id="letterContent"
            v-model="suratForm.letter_content"
            rows="14"
            class="text-xl mt-1 block w-full h-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y leading-relaxed whitespace-pre-wrap transition-colors duration-200 placeholder-gray-400"
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
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Berhasil!</h3>
        </div>
        <p class="text-gray-700 mb-6">{{ successMessage }}</p>

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
const API_KELENGKAPAN_URL = 'https://bitwize.cloud/api/kelengkapan'
const showGenerateSuratModal = ref(false)
const generatingSurat = ref(false)
const loadingKelengkapan = ref(false)
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

const fetchKelengkapanData = async (user_id) => {
  try {
    const response = await axios.get(`${API_KELENGKAPAN_URL}/user/${user_id}/latest`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    return response.data.data
  } catch (err) {
    console.error('Error fetching kelengkapan data:', err)
    throw new Error('Gagal memuat data kelengkapan.')
  }
}
const replacePlaceholders = (template, kelengkapanData) => {
  let content = template

  content = content.replace(/{{kelengkapan_rt}}/g, kelengkapanData.rt || '')
  content = content.replace(/{{kelengkapan_rw}}/g, kelengkapanData.rw || '')
  content = content.replace(
    /{{kelengkapan_no_surat_pengantar}}/g,
    kelengkapanData.no_surat_pengantar || '',
  )

  let formattedDate = ''
  if (kelengkapanData.tanggal_surat_pengantar) {
    const date = new Date(kelengkapanData.tanggal_surat_pengantar)
    formattedDate = date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }
  content = content.replace(/{{kelengkapan_tanggal_surat_pengantar}}/g, formattedDate)

  content = content.replace(/{{kelengkapan_luas_lahan}}/g, kelengkapanData.luas_lahan || '')
  content = content.replace(/{{kelengkapan_alamat_lahan}}/g, kelengkapanData.alamat_lahan || '')

  content = content.replace(
    /{{recipient_nama_lengkap}}/g,
    kelengkapanData.user_nama_lengkap || kelengkapanData.nama_lengkap || '',
  )

  return content
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
      return 'bg-green-500 text-white border border-emerald-200'
    case 'rejected':
      return 'bg-red-500 text-white border border-rose-200'
    case 'pending':
    default:
      return 'bg-yellow-500 text-white border border-amber-200'
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

const openGenerateSuratModal = async (userId, idPengajuan, username, submissionName) => {
  loadingKelengkapan.value = true

  // Default letter content template
  const defaultTemplate = `
Berdasarkan surat pengantar RT {{kelengkapan_rt}} RW {{kelengkapan_rw}} No.{{kelengkapan_no_surat_pengantar}} Tanggal {{kelengkapan_tanggal_surat_pengantar}}, Menerangkan Bahwa benar nama tersebut diatas adalah warga kami yang ingin mengajukan PM1. Berdasarkan surat pernyataan tanggal {{kelengkapan_tanggal_surat_pengantar}}, benar yang bersangkutan diatas akan mengurus peningkatan Sertifikat Hak Guna Bangunan menjadi Sertifikat Hak Milik dengan data Sertifikat Hak Guna Bangunan No. 1310 an. {{recipient_nama_lengkap}} dengan luas {{kelengkapan_luas_lahan}}  M2 yang terletak di {{kelengkapan_alamat_lahan}}. DKI Jakarta dan objek tanah nya berdiri bangunan rumah tinggal. Surat keterangan ini diperlukan untuk kepengurursan Administrasi Ke BPN. Yang dipergunakan Sebagai : Apabila di kemudian hari keterangan/pengakuan yang bersangkutan tidak benar/melanggar aturan yang berlaku/membuat pengakuan/keterangan/keresahan/keberatan dari pihak yang berwenata sebagai pemilik yang memilafatkan surat keterangan ini, maka sepenuhnya menjadi tanggung jawab yang bersangkutan tanpa melibatkan aparat/pejabat yang menandatanganinya dan Surat Keterangan ini dinyatakan tidak berlaku/dibatalkan kecuali ada penyelesaian sesuai peraturan yang berlaku. Demikian Surat Keterangan ini dibuat untuk dapat dipergunakan sebagaimana mestinya dan bukan merupakan rekomendasi dan berlaku selama 3 (tiga) bulan setelah tanggal diterbitkans`

  try {
    // Fetch kelengkapan data
    const kelengkapanData = await fetchKelengkapanData(userId)

    // Replace placeholders in the template
    const processedContent = replacePlaceholders(defaultTemplate, kelengkapanData)

    suratForm.value = {
      user_id: userId,
      id_pengajuan: idPengajuan,
      username: username,
      submission_name: submissionName,
      letter_number: `SP/${submissionName.replace(/\s/g, '').substring(0, 5).toUpperCase()}/${new Date().getFullYear()}/${Date.now().toString().slice(-4)}`,
      letter_content: processedContent,
      approved_by: authStore.user?.id,
    }

    showGenerateSuratModal.value = true
  } catch (err) {
    console.error('Error loading kelengkapan data:', err)
    alert('Gagal memuat data kelengkapan. Menggunakan template default.')

    // Fallback to default template without replacement
    suratForm.value = {
      user_id: userId,
      id_pengajuan: idPengajuan,
      username: username,
      submission_name: submissionName,
      letter_number: `SP/${submissionName.replace(/\s/g, '').substring(0, 5).toUpperCase()}/${new Date().getFullYear()}/${Date.now().toString().slice(-4)}`,
      letter_content: defaultTemplate,
      approved_by: authStore.user?.id,
    }

    showGenerateSuratModal.value = true
  } finally {
    loadingKelengkapan.value = false
  }
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

const user_id_grup = ref(null)

const allFlatDocuments = computed(() => {
  const flatDocs = []
  documentsByUsers.value.forEach((userGroup) => {
    if (userGroup.documents && Array.isArray(userGroup.documents)) {
      userGroup.documents.forEach((doc) => {
        flatDocs.push({
          ...doc,
          username: userGroup.username,
          email: userGroup.email,
        })
      })
    }
    user_id_grup.value = userGroup.user_id
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
  return ((complete / total) * 100).toFixed(2)
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
  console.log(user_id_grup.value)
})
</script>

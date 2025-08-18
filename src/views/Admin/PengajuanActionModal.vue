<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" v-if="pengajuan">
    <div
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="$emit('close')"
    ></div>

    <div
      class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6"
      >
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900">Review Dokumen Pengajuan</h3>
            <p class="text-sm text-gray-500">{{ pengajuan.kode_pengajuan }}</p>
          </div>
          <button
            @click="$emit('close')"
            class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="text-sm font-medium text-gray-900 mb-2">Info Pengajuan</h4>
              <div class="space-y-1 text-sm text-gray-600">
                <p><span class="font-medium">Jenis:</span> {{ pengajuan.JenisPengajuan.name }}</p>
                <p><span class="font-medium">Pemilik:</span> {{ pengajuan.Owner.nama }}</p>
                <p>
                  <span class="font-medium">Lokasi:</span> {{ pengajuan.Lahan.wilayah_kelurahan }},
                  {{ pengajuan.Lahan.wilayah_kecamatan }}
                </p>
              </div>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-900 mb-2">Status Dokumen</h4>
              <div class="space-y-1 text-sm">
                <p>
                  <span class="font-medium text-green-600">Disetujui:</span>
                  {{ approvedDocsCount }}/{{ totalDocsCount }}
                </p>
                <p>
                  <span class="font-medium text-red-600">Ditolak:</span> {{ rejectedDocsCount }}
                </p>
                <p>
                  <span class="font-medium text-blue-600">Menunggu Perbaikan:</span>
                  {{ waitingRepairDocsCount }}
                </p>
                <p>
                  <span class="font-medium text-yellow-600">Pending:</span> {{ pendingDocsCount }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <div class="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress Approval</span>
              <span>{{ Math.round((approvedDocsCount / totalDocsCount) * 100) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-green-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${(approvedDocsCount / totalDocsCount) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>

        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div
            v-for="document in pengajuan.Documents"
            :key="document.id"
            class="border rounded-lg p-4"
            :class="getDocumentBorderClass(document.status)"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2">
                  <h4 class="text-sm font-medium text-gray-900 truncate">
                    {{ formatDocumentType(document.document_type) }}
                  </h4>
                  <span
                    :class="getDocumentStatusClass(document.status)"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ getStatusText(document.status) }}
                  </span>
                </div>

                <p v-if="document.file_url" class="text-xs text-gray-500 mt-1">
                  {{ document.original_name || 'Dokumen tersedia' }}
                </p>
                <p v-else class="text-xs text-red-500 mt-1">Belum diunggah</p>

                <p
                  v-if="document.admin_note"
                  class="text-xs text-gray-600 mt-2 bg-gray-100 p-2 rounded"
                >
                  <span class="font-medium">Catatan Admin:</span> {{ document.admin_note }}
                </p>
              </div>

              <div class="flex flex-col space-y-2 ml-4">
                <button
                  v-if="document.file_url"
                  @click="viewDocument(document.file_url)"
                  class="text-indigo-600 hover:text-indigo-900 text-sm px-2 py-1 border border-indigo-200 rounded hover:bg-indigo-50 transition-colors"
                  title="Lihat Dokumen"
                >
                  <svg
                    class="w-4 h-4 inline mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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

                <div
                  v-if="
                    (document.status === 'pending' || document.status === 'menunggu_perbaikan') &&
                    document.file_url
                  "
                  class="flex space-x-1"
                >
                  <button
                    @click="openActionForm(document, 'approved')"
                    :disabled="processingDocs.has(document.id)"
                    class="px-2 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {{
                      processingDocs.has(document.id) && actionTypes.get(document.id) === 'approved'
                        ? 'Loading...'
                        : 'Setujui'
                    }}
                  </button>
                  <button
                    @click="openActionForm(document, 'rejected')"
                    :disabled="processingDocs.has(document.id)"
                    class="px-2 py-1 text-xs font-medium text-red-700 bg-white border border-red-300 rounded hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {{
                      processingDocs.has(document.id) && actionTypes.get(document.id) === 'rejected'
                        ? 'Loading...'
                        : 'Tolak'
                    }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="showActionForm"
          class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60"
        >
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h4 class="text-lg font-medium text-gray-900 mb-4">
              {{ selectedAction === 'approved' ? 'Setujui Dokumen' : 'Tolak Dokumen' }}
            </h4>
            <p class="text-sm text-gray-600 mb-4">
              {{ formatDocumentType(selectedDocument?.document_type) }}
            </p>

            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{
                    selectedAction === 'approved' ? 'Catatan Admin (Opsional)' : 'Alasan Penolakan'
                  }}
                  <span v-if="selectedAction === 'rejected'" class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="adminNote"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  :placeholder="
                    selectedAction === 'approved'
                      ? 'Tambahkan catatan...'
                      : 'Jelaskan alasan penolakan...'
                  "
                ></textarea>
                <p v-if="noteError" class="mt-1 text-xs text-red-500">{{ noteError }}</p>
              </div>

              <div class="flex space-x-2">
                <button
                  @click="confirmDocumentAction"
                  :disabled="
                    processingDocs.has(selectedDocument?.id) ||
                    (selectedAction === 'rejected' && !adminNote.trim())
                  "
                  :class="
                    selectedAction === 'approved'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  "
                  class="flex-1 px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {{
                    processingDocs.has(selectedDocument?.id)
                      ? 'Memproses...'
                      : selectedAction === 'approved'
                        ? 'Konfirmasi Setujui'
                        : 'Konfirmasi Tolak'
                  }}
                </button>
                <button
                  @click="closeActionForm"
                  :disabled="processingDocs.has(selectedDocument?.id)"
                  class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Reject Pengajuan Modal -->
        <div
          v-if="showRejectModal"
          class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60"
        >
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h4 class="text-lg font-medium text-gray-900 mb-4">Tolak Pengajuan</h4>
            <p class="text-sm text-gray-600 mb-4">
              Apakah Anda yakin ingin menolak pengajuan
              <strong>{{ pengajuan.kode_pengajuan }}</strong
              >?
            </p>

            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Alasan Penolakan <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="rejectReason"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                  placeholder="Jelaskan alasan penolakan pengajuan..."
                ></textarea>
                <p v-if="rejectReasonError" class="mt-1 text-xs text-red-500">
                  {{ rejectReasonError }}
                </p>
              </div>

              <div class="flex space-x-2">
                <button
                  @click="confirmRejectPengajuan"
                  :disabled="rejectingPengajuan || !rejectReason.trim()"
                  class="flex-1 px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <div class="flex items-center justify-center">
                    <svg
                      v-if="rejectingPengajuan"
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
                    {{ rejectingPengajuan ? 'Menolak...' : 'Konfirmasi Tolak' }}
                  </div>
                </button>
                <button
                  @click="closeRejectModal"
                  :disabled="rejectingPengajuan"
                  class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="successMessage" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div class="flex">
            <svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-sm text-green-800">{{ successMessage }}</p>
          </div>
        </div>

        <div v-if="errorMessage" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div class="flex">
            <svg class="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-sm text-red-800">{{ errorMessage }}</p>
          </div>
        </div>

        <div v-if="allDocsApproved" class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div class="flex">
            <svg class="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            <div>
              <p class="text-sm font-medium text-blue-800">Pengajuan Lengkap!</p>
              <p class="text-sm text-blue-700">
                Semua dokumen telah disetujui. Pengajuan akan otomatis disetujui.
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 flex justify-between">
          <!-- Button Tolak Pengajuan -->
          <button
            @click="openRejectModal"
            :disabled="rejectingPengajuan"
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            {{ rejectingPengajuan ? 'Menolak...' : 'Tolak Pengajuan' }}
          </button>

          <!-- Button Tutup -->
          <button
            @click="$emit('close')"
            type="button"
            class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import axios from 'axios'

const props = defineProps({
  pengajuan: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close', 'documentUpdated', 'pengajuanRejected'])

const processingDocs = ref(new Set())
const actionTypes = ref(new Map())
const showActionForm = ref(false)
const selectedDocument = ref(null)
const selectedAction = ref('')
const adminNote = ref('')
const noteError = ref('')
const successMessage = ref('')
const errorMessage = ref('')

// Reject Pengajuan State
const showRejectModal = ref(false)
const rejectingPengajuan = ref(false)
const rejectReason = ref('')
const rejectReasonError = ref('')

const token = localStorage.getItem('token')

// Computed properties
const totalDocsCount = computed(() => props.pengajuan.Documents.length)
const approvedDocsCount = computed(
  () => props.pengajuan.Documents.filter((doc) => doc.status === 'approved').length,
)
const rejectedDocsCount = computed(
  () => props.pengajuan.Documents.filter((doc) => doc.status === 'rejected').length,
)
const pendingDocsCount = computed(
  () => props.pengajuan.Documents.filter((doc) => doc.status === 'pending').length,
)
const waitingRepairDocsCount = computed(
  () => props.pengajuan.Documents.filter((doc) => doc.status === 'menunggu_perbaikan').length,
)
const allDocsApproved = computed(() => approvedDocsCount.value === totalDocsCount.value)

// Methods
const formatDocumentType = (docType) => {
  return docType
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const getDocumentStatusClass = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'menunggu_perbaikan':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getDocumentBorderClass = (status) => {
  switch (status) {
    case 'approved':
      return 'border-green-200 bg-green-50'
    case 'rejected':
      return 'border-red-200 bg-red-50'
    case 'pending':
      return 'border-yellow-200 bg-yellow-50'
    case 'menunggu_perbaikan':
      return 'border-blue-200 bg-blue-50'
    default:
      return 'border-gray-200'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'approved':
      return 'Disetujui'
    case 'rejected':
      return 'Ditolak'
    case 'pending':
      return 'Pending'
    case 'menunggu_perbaikan':
      return 'Menunggu Perbaikan'
    default:
      return status
  }
}

const viewDocument = (fileUrl) => {
  window.open(fileUrl, '_blank')
}

const openActionForm = (document, action) => {
  selectedDocument.value = document
  selectedAction.value = action
  adminNote.value = ''
  noteError.value = ''
  showActionForm.value = true
}

const closeActionForm = () => {
  showActionForm.value = false
  selectedDocument.value = null
  selectedAction.value = ''
  adminNote.value = ''
  noteError.value = ''
}

// Reject Pengajuan Methods
const openRejectModal = () => {
  rejectReason.value = ''
  rejectReasonError.value = ''
  showRejectModal.value = true
}

const closeRejectModal = () => {
  showRejectModal.value = false
  rejectReason.value = ''
  rejectReasonError.value = ''
}

const confirmRejectPengajuan = async () => {
  if (!rejectReason.value.trim()) {
    rejectReasonError.value = 'Alasan penolakan wajib diisi'
    return
  }

  try {
    rejectingPengajuan.value = true
    rejectReasonError.value = ''
    errorMessage.value = ''

    const pengajuanId = props.pengajuan.id_pengajuan || props.pengajuan.id
    if (!pengajuanId) {
      throw new Error('ID Pengajuan tidak ditemukan')
    }

    const response = await axios.put(
      `http://localhost:3000/api/pengajuan/${pengajuanId}/reject`,
      {
        admin_note: rejectReason.value.trim(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      },
    )

    successMessage.value = `Pengajuan ${props.pengajuan.kode_pengajuan} berhasil ditolak`

    setTimeout(() => {
      successMessage.value = ''
    }, 3000)

    emit('pengajuanRejected', response.data)
    closeRejectModal()

    // Optionally close the main modal after a delay
    setTimeout(() => {
      emit('close')
    }, 2000)
  } catch (error) {
    console.error('Error rejecting pengajuan:', error)
    let errorMsg = ''

    if (error.code === 'ECONNABORTED') {
      errorMsg = 'Timeout: Server terlalu lama merespons'
    } else if (error.response?.status === 404) {
      errorMsg = 'Pengajuan tidak ditemukan'
    } else if (error.response?.status === 403) {
      errorMsg = 'Anda tidak memiliki hak akses untuk menolak pengajuan ini'
    } else if (error.response?.status === 400) {
      errorMsg = error.response.data?.message || 'Pengajuan tidak dapat ditolak'
    } else {
      errorMsg = `Gagal menolak pengajuan: ${error.response?.data?.message || error.message}`
    }

    errorMessage.value = errorMsg

    setTimeout(() => {
      errorMessage.value = ''
    }, 5000)
  } finally {
    rejectingPengajuan.value = false
  }
}

const confirmDocumentAction = async () => {
  if (!selectedDocument.value) {
    errorMessage.value = 'Tidak ada dokumen yang dipilih'
    return
  }

  // Jika aksi adalah "tolak", periksa catatan admin
  const finalStatus =
    selectedAction.value === 'rejected' ? 'menunggu_perbaikan' : selectedAction.value

  if (finalStatus === 'menunggu_perbaikan' && !adminNote.value.trim()) {
    noteError.value = 'Alasan penolakan wajib diisi'
    return
  }

  try {
    processingDocs.value.add(selectedDocument.value.id)
    actionTypes.value.set(selectedDocument.value.id, selectedAction.value)
    noteError.value = ''
    errorMessage.value = ''

    const response = await axios.put(
      `http://localhost:3000/api/pengajuan/documents/${selectedDocument.value.id}/status`,
      {
        status: finalStatus,
        admin_note: adminNote.value.trim() || null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.status === 200) {
      const docIndex = props.pengajuan.Documents.findIndex(
        (d) => d.id === selectedDocument.value.id,
      )
      if (docIndex !== -1) {
        props.pengajuan.Documents[docIndex].status = finalStatus
        props.pengajuan.Documents[docIndex].admin_note = adminNote.value.trim()
      }

      successMessage.value = `Status dokumen berhasil diubah menjadi ${getStatusText(finalStatus)}!`

      setTimeout(() => {
        successMessage.value = ''
      }, 3000)

      emit('documentUpdated')
      closeActionForm()
    }
  } catch (error) {
    console.error('Error updating document status:', error)
    errorMessage.value =
      error.response?.data?.message ||
      `Gagal mengubah status dokumen menjadi ${getStatusText(finalStatus)}`

    setTimeout(() => {
      errorMessage.value = ''
    }, 5000)
  } finally {
    processingDocs.value.delete(selectedDocument.value.id)
    actionTypes.value.delete(selectedDocument.value.id)
  }
}
</script>

<style scoped>
.max-h-96::-webkit-scrollbar {
  width: 6px;
}

.max-h-96::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.max-h-96::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.max-h-96::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.z-60 {
  z-index: 60;
}

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

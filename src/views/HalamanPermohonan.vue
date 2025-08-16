<template>
  <UserHeader />
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Persyaratan Izin</h1>
      </div>
      <div v-if="isLoading" class="text-center py-12">
        <p class="text-gray-600">Memuat data pengajuan...</p>
      </div>
      <div v-else-if="error" class="text-center py-12">
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <p class="text-red-600">Terjadi kesalahan: {{ error }}</p>
        </div>
      </div>
      <div v-else class="space-y-6">
        <div class="bg-white rounded-lg shadow border p-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Pilih Jenis Pengajuan <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <select
              v-model="selectedPengajuanId"
              @change="onPengajuanChange"
              class="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
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
          </div>
        </div>

        <PemiliDanLahan
          v-if="selectedPengajuanId"
          :idPengajuan="selectedPengajuanId"
          @owner-updated="handleOwnerUpdate"
          @lahan-updated="handleLahanUpdate"
        />

        <div
          v-if="existingFiles.length > 0"
          class="bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            File yang Sudah Diupload (Status: Pending)
          </h3>

          <div class="space-y-3">
            <div
              v-for="file in existingFiles"
              :key="file.id"
              class="bg-white p-4 rounded-md border border-blue-200"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <span
                      class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2"
                    >
                      {{ file.document_type }}
                    </span>
                    <span
                      class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium"
                    >
                      {{ file.status }}
                    </span>
                  </div>

                  <p class="text-sm text-gray-800 font-medium mb-1">
                    {{ file.file_name }}
                  </p>

                  <p class="text-xs text-gray-500 mb-2">
                    Diupload: {{ formatDate(file.uploaded_at) }}
                  </p>

                  <a
                    :href="file.file_path"
                    target="_blank"
                    class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                    Lihat File
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="selectedPengajuan && selectedPengajuan.requirements.length > 0 && !hasPendingFiles"
          class="bg-white rounded-lg shadow border"
        >
          <div class="flex items-center justify-between p-6 border-b">
            <div class="flex items-center">
              <h2 class="text-lg font-semibold text-gray-800">Persyaratan Izin</h2>
            </div>
            <button
              @click="isCollapsed = !isCollapsed"
              class="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg
                class="w-5 h-5 transform transition-transform duration-200"
                :class="{ 'rotate-180': !isCollapsed }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
          <div v-show="!isCollapsed" class="p-6 space-y-6">
            <div
              v-for="(requirement, index) in selectedPengajuan.requirements"
              :key="requirement.id"
              class="border-b border-gray-100 pb-6 last:border-b-0"
            >
              <div class="flex items-start mb-4">
                <span
                  class="bg-gray-100 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0 mt-1"
                >
                  {{ index + 1 }}
                </span>
                <div class="flex-1">
                  <h3 class="text-gray-900 font-medium mb-2">{{ requirement.label }}</h3>
                  <p v-if="requirement.description" class="text-gray-600 text-sm mb-2">
                    {{ requirement.description }}
                  </p>
                  <div class="flex items-center mb-2">
                    <span v-if="requirement.is_required" class="text-red-500 text-sm"
                      >* Harus Ada</span
                    >
                    <span v-else class="text-gray-500 text-sm">Opsional</span>
                  </div>
                  <div class="text-sm text-gray-600 mb-4">
                    <span class="font-medium">Maks. berukuran</span>
                    <span class="text-red-500 mx-1">{{ getMaxFileSize(requirement) }}</span>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center gap-2">
                      <button
                        @click="selectFile(requirement.id)"
                        class="flex items-center px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md text-sm font-medium transition-colors"
                      >
                        Pilih Berkas
                      </button>
                      <span v-if="selectedFiles[requirement.id]" class="text-sm text-gray-600">
                        {{ selectedFiles[requirement.id].name }} ({{
                          (selectedFiles[requirement.id].size / (1024 * 1024)).toFixed(2)
                        }}
                        MB)
                      </span>
                    </div>

                    <div class="max-w-md">
                      <label class="block text-sm font-medium text-gray-700 mb-1">
                        Catatan (Opsional)
                      </label>
                      <textarea
                        v-model="userNotes[requirement.id]"
                        rows="2"
                        placeholder="Tambahkan catatan untuk dokumen ini..."
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <div
                    v-if="uploadedFiles[requirement.id] && uploadedFiles[requirement.id].length > 0"
                    class="mt-4"
                  >
                    <div class="space-y-2">
                      <div
                        v-for="file in uploadedFiles[requirement.id]"
                        :key="file.id"
                        class="bg-gray-50 p-3 rounded-md"
                      >
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center">
                            <span class="text-sm text-gray-700">{{ file.name }}</span>
                            <span class="text-xs text-gray-500 ml-2">({{ file.size }})</span>
                          </div>
                          <button
                            @click="removeFile(requirement.id, file.id)"
                            class="text-red-500 hover:text-red-700"
                          >
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </button>
                        </div>
                        <div
                          v-if="file.user_note"
                          class="text-xs text-gray-600 bg-gray-100 p-2 rounded"
                        >
                          <strong>Catatan:</strong> {{ file.user_note }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else-if="
            selectedPengajuan && selectedPengajuan.requirements.length === 0 && !hasPendingFiles
          "
          class="bg-white rounded-lg shadow border p-6 text-center"
        >
          <div class="text-gray-500">
            <p class="text-lg font-medium">Tidak ada persyaratan khusus</p>
            <p class="text-sm mt-1">
              Untuk pengajuan "{{ selectedPengajuan.nama_pengajuan }}" tidak memerlukan dokumen
              tambahan.
            </p>
          </div>
        </div>

        <div
          v-if="selectedPengajuan && !hasPendingFiles && (!hasOwnerData || !hasLahanData)"
          class="bg-amber-50 border border-amber-200 rounded-lg p-4"
        >
          <div class="flex items-start">
            <svg
              class="w-5 h-5 text-amber-600 mt-0.5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
            <div class="flex-1">
              <h3 class="text-sm font-medium text-amber-800">Data Belum Lengkap</h3>
              <div class="text-sm text-amber-700 mt-1">
                <p v-if="!hasOwnerData && !hasLahanData">
                  Harap lengkapi data pemilik dan data lahan sebelum melanjutkan.
                </p>
                <p v-else-if="!hasOwnerData">Harap lengkapi data pemilik sebelum melanjutkan.</p>
                <p v-else-if="!hasLahanData">Harap lengkapi data lahan sebelum melanjutkan.</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedPengajuan && !hasPendingFiles" class="text-center">
          <button
            @click="submitDocuments"
            :disabled="!canSubmit"
            class="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors"
          >
            {{ selectedPengajuan.requirements.length === 0 ? 'Lanjutkan' : 'Kirim Dokumen' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, provide } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import UserHeader from './UserHeader.vue'
import PemiliDanLahan from './PemiliDanLahan.vue'

const pengajuanList = ref([])
const selectedPengajuanId = ref('')
const isLoading = ref(true)
const error = ref(null)
const isCollapsed = ref(false)
const token = localStorage.getItem('token')
const userId = parseInt(localStorage.getItem('id')) || null

const uploadedFiles = ref({})
const selectedFiles = ref({})
const userNotes = ref({})
const requirementMessages = ref({})
const userStatus = ref([])
const existingFiles = ref([])

// Data dari child component
const ownerData = ref(null)
const lahanData = ref(null)

// Provide selectedPengajuanId untuk child components yang menggunakan inject
provide('selectedPengajuanId', selectedPengajuanId)

const selectedPengajuan = computed(() => {
  const pengajuan = pengajuanList.value.find((p) => p.id_pengajuan === selectedPengajuanId.value)
  if (pengajuan && !Array.isArray(pengajuan.requirements)) {
    pengajuan.requirements = []
  }
  return pengajuan
})

const hasPendingFiles = computed(() => {
  return existingFiles.value.length > 0
})

const hasOwnerData = computed(() => {
  return ownerData.value && ownerData.value.nama && ownerData.value.nik && ownerData.value.email
})

const hasLahanData = computed(() => {
  return lahanData.value && lahanData.value.jenis_bangunan && lahanData.value.luas_lahan
})

const canSubmit = computed(() => {
  if (!selectedPengajuan.value) return false

  // Jika ada pending files, tidak bisa submit
  if (hasPendingFiles.value) return false

  // Harus ada data owner dan lahan
  if (!hasOwnerData.value || !hasLahanData.value) return false

  // Jika tidak ada persyaratan, bisa submit
  if (selectedPengajuan.value.requirements.length === 0) return true

  // Check required requirements
  const requiredRequirements = selectedPengajuan.value.requirements.filter((r) => r.is_required)
  for (const req of requiredRequirements) {
    const hasSelectedFile = selectedFiles.value[req.id]
    const hasUploadedFile = uploadedFiles.value[req.id] && uploadedFiles.value[req.id].length > 0

    if (!hasSelectedFile && !hasUploadedFile) {
      return false
    }
  }
  return true
})

// Event handlers untuk menerima data dari child component
const handleOwnerUpdate = (data) => {
  ownerData.value = data
}

const handleLahanUpdate = (data) => {
  lahanData.value = data
}

const fetchPengajuan = async () => {
  try {
    const pengajuanResponse = await axios.get(
      'http://localhost:3001/api/documents/pengajuan/names',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    pengajuanList.value = pengajuanResponse.data

    const statusResponse = await axios.get('http://localhost:3001/api/documents/me/status', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    userStatus.value = statusResponse.data
  } catch (err) {
    error.value = err.response ? err.response.data.message : err.message
  } finally {
    isLoading.value = false
  }
}

const onPengajuanChange = () => {
  uploadedFiles.value = {}
  selectedFiles.value = {}
  userNotes.value = {}
  requirementMessages.value = {}
  existingFiles.value = []
  ownerData.value = null
  lahanData.value = null
  isCollapsed.value = false

  // Check if user has pending submission for selected pengajuan
  const selectedId = parseInt(selectedPengajuanId.value)
  const pendingPengajuan = userStatus.value?.find((status) => status.id_pengajuan === selectedId)

  if (pendingPengajuan && pendingPengajuan.pending.length > 0) {
    // Set existing files to display in template
    existingFiles.value = pendingPengajuan.pending

    Swal.fire({
      icon: 'warning',
      title: 'Pengajuan Sedang Ditinjau',
      text: 'Anda tidak bisa mengajukan pengajuan ini, karena anda sudah mengajukan dan sedang di tinjau.',
      confirmButtonText: 'Tutup',
      confirmButtonColor: '#f59e0b',
    })
  }
}

const getMaxFileSize = (requirement) => {
  return requirement.max_file_size || '10 MB'
}

const selectFile = (requirementId) => {
  const requirement = selectedPengajuan.value.requirements.find((r) => r.id === requirementId)
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = false

  input.onchange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const maxSize = requirement.max_file_size
      ? parseInt(requirement.max_file_size) * 1024 * 1024
      : 10 * 1024 * 1024

    if (file.size > maxSize) {
      Swal.fire({
        icon: 'error',
        title: 'Ukuran File Terlalu Besar',
        text: `Ukuran file tidak boleh lebih dari ${getMaxFileSize(requirement)}`,
        confirmButtonColor: '#3085d6',
      })
      return
    }

    selectedFiles.value[requirementId] = file
  }

  input.click()
}

const uploadFile = async (requirementId, file, userNote = '') => {
  const formData = new FormData()
  formData.append('file', file)

  console.log(`Starting upload for requirement ${requirementId}, file: ${file.name}`) // Debug log

  try {
    // Set timeout untuk upload file
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 second timeout for file upload

    const response = await axios.post('https://invitations.my.id/api/upload-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
      timeout: 60000, // 60 second timeout
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(`Upload progress for ${file.name}: ${percentCompleted}%`) // Debug log
      },
    })

    clearTimeout(timeoutId)
    console.log(`Upload completed for ${file.name}:`, response.data) // Debug log

    // Validate response structure
    if (!response.data || !response.data.data || !response.data.data.path) {
      throw new Error('Invalid response structure from upload API')
    }

    const fileUrl = response.data.data.path

    // Update uploadedFiles
    if (!uploadedFiles.value[requirementId]) {
      uploadedFiles.value[requirementId] = []
    }

    const fileObj = {
      id: Date.now(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      path: fileUrl,
      user_note: userNote,
    }

    uploadedFiles.value[requirementId].push(fileObj)

    return {
      url: fileUrl,
      originalName: file.name,
      mimeType: file.type,
      fileSize: file.size,
      userNote: userNote,
    }
  } catch (err) {
    console.error('Upload error details:', {
      error: err,
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    })

    let errorMessage = 'Gagal mengunggah file'

    if (err.name === 'AbortError') {
      errorMessage = 'Upload timeout - file terlalu besar atau koneksi lambat'
    } else if (err.code === 'ECONNABORTED') {
      errorMessage = 'Upload timeout - coba lagi dengan file yang lebih kecil'
    } else if (err.response) {
      errorMessage = err.response.data?.message || `Upload failed: ${err.response.status}`
    } else if (err.request) {
      errorMessage = 'Tidak dapat terhubung ke server upload'
    }

    throw new Error(errorMessage)
  }
}

const removeFile = (requirementId, fileId) => {
  if (uploadedFiles.value[requirementId]) {
    uploadedFiles.value[requirementId] = uploadedFiles.value[requirementId].filter(
      (f) => f.id !== fileId,
    )
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('id-ID')
}

const submitDocuments = async () => {
  if (!selectedPengajuan.value) return

  // Validasi data owner dan lahan
  if (!hasOwnerData.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Data Pemilik Belum Lengkap',
      text: 'Harap lengkapi data pemilik terlebih dahulu.',
      confirmButtonColor: '#f59e0b',
    })
    return
  }

  if (!hasLahanData.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Data Lahan Belum Lengkap',
      text: 'Harap lengkapi data lahan terlebih dahulu.',
      confirmButtonColor: '#f59e0b',
    })
    return
  }

  // Show loading indicator
  Swal.fire({
    title: 'Mengirim Dokumen...',
    text: 'Mohon tunggu, dokumen sedang diproses',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
  })

  try {
    let documents = []

    // If there are requirements, process files
    if (selectedPengajuan.value.requirements.length > 0) {
      // Validate required documents
      const requiredRequirements = selectedPengajuan.value.requirements.filter((r) => r.is_required)
      const missingRequirements = []

      for (const req of requiredRequirements) {
        const hasSelectedFile = selectedFiles.value[req.id]
        const hasUploadedFile =
          uploadedFiles.value[req.id] && uploadedFiles.value[req.id].length > 0

        if (!hasSelectedFile && !hasUploadedFile) {
          missingRequirements.push(req.label)
        }
      }

      if (missingRequirements.length > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Dokumen Belum Lengkap',
          html: `Dokumen berikut masih diperlukan:<br/><br/><strong>${missingRequirements.join('<br/>')}</strong>`,
          confirmButtonColor: '#f59e0b',
        })
        return
      }

      // Process selected files (new uploads)
      for (const [requirementId, file] of Object.entries(selectedFiles.value)) {
        if (file) {
          const userNote = userNotes.value[requirementId] || ''
          try {
            console.log(`Uploading file: ${file.name}`) // Debug log

            const uploadResult = await uploadFile(requirementId, file, userNote)
            const requirement = selectedPengajuan.value.requirements.find(
              (r) => r.id.toString() === requirementId.toString(),
            )

            if (requirement) {
              documents.push({
                document_type: requirement.document_type,
                file_url: uploadResult.url,
                original_name: uploadResult.originalName,
                mime_type: uploadResult.mimeType,
                file_size: uploadResult.fileSize,
                user_note: uploadResult.userNote,
              })
            }
          } catch (error) {
            console.error(`Upload error for ${file.name}:`, error) // Debug log

            Swal.fire({
              icon: 'error',
              title: 'Gagal Upload File',
              text: `Gagal mengunggah file ${file.name}: ${error.message}`,
              confirmButtonColor: '#ef4444',
            })
            return
          }
        }
      }

      // Process previously uploaded files
      for (const [requirementId, files] of Object.entries(uploadedFiles.value)) {
        const requirement = selectedPengajuan.value.requirements.find(
          (r) => r.id.toString() === requirementId.toString(),
        )

        if (files && files.length > 0 && requirement) {
          for (const fileObj of files) {
            documents.push({
              document_type: requirement.document_type,
              file_url: fileObj.path,
              original_name: fileObj.name.replace(/\s*\(\d+(?:\.\d+)?\s*MB\)$/, '').trim(),
              mime_type: 'application/pdf', // You might want to store actual mime type
              file_size: Math.round(parseFloat(fileObj.size.replace(' MB', '')) * 1024 * 1024),
              user_note: fileObj.user_note || '',
            })
          }
        }
      }
    }

    // Prepare payload
    const payload = {
      user_id: userId,
      id_pengajuan: parseInt(selectedPengajuanId.value),
      owner: ownerData.value,
      lahan: lahanData.value,
      documents: documents,
    }

    console.log('Submitting payload:', payload) // Debug log

    // Set a timeout for the request to prevent infinite loading
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      // Submit to API with timeout
      const response = await axios.post(
        'http://localhost:3001/api/documents/upload/bulk-links',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal, // Add abort signal
          timeout: 30000, // 30 second timeout
        },
      )

      clearTimeout(timeoutId) // Clear timeout if request completes
      console.log('Submit response:', response.data) // Debug log

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Pengajuan berhasil dikirim! Data pemilik, lahan, dan dokumen telah tersimpan.',
        confirmButtonColor: '#10b981',
      })

      // Reset form
      uploadedFiles.value = {}
      selectedFiles.value = {}
      userNotes.value = {}
      requirementMessages.value = {}
      ownerData.value = null
      lahanData.value = null
      selectedPengajuanId.value = ''

      // Refresh status to show updated data
      await fetchPengajuan()
    } catch (submitError) {
      clearTimeout(timeoutId)

      if (submitError.name === 'AbortError') {
        throw new Error('Request timeout - server took too long to respond')
      }
      throw submitError
    }
  } catch (err) {
    console.error('Error submitting documents:', err)

    let errorMessage = 'Terjadi kesalahan yang tidak diketahui'

    if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
      errorMessage = 'Request timeout - server tidak merespons dalam waktu yang wajar'
    } else if (err.response) {
      errorMessage = err.response.data.message || `Server error: ${err.response.status}`
    } else if (err.request) {
      errorMessage = 'Tidak dapat terhubung ke server'
    } else {
      errorMessage = err.message
    }

    Swal.fire({
      icon: 'error',
      title: 'Gagal Mengirim Dokumen',
      text: errorMessage,
      confirmButtonColor: '#ef4444',
    })
  }
}
onMounted(() => {
  fetchPengajuan()
})
</script>

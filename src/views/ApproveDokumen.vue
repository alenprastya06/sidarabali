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
                    Kode Pengajuan
                  </th>
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
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ pengajuan.kode_pengajuan }}
                  </td>
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
                      <button
                        @click="generateDocument(pengajuan)"
                        :disabled="generatingPengajuanId === pengajuan.id"
                        :class="[
                          'transition-colors duration-200',
                          generatingPengajuanId === pengajuan.id
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-green-600 hover:text-green-900',
                        ]"
                        title="Generate Dokumen"
                      >
                        <svg
                          v-if="generatingPengajuanId === pengajuan.id"
                          class="w-5 h-5 animate-spin"
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
                        <svg
                          v-else
                          class="w-5 h-5"
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
                      </button>
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

      <!-- Document Editor Modal -->
      <div
        v-if="showDocumentEditor"
        class="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div
          class="relative top-10 mx-auto p-5 border w-11/12 max-w-7xl shadow-lg rounded-md bg-white"
        >
          <!-- Modal Header -->
          <div class="flex items-center justify-between pb-4 mb-4 border-b">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Edit Dokumen</h3>
              <p class="text-sm text-gray-500 mt-1" v-if="selectedPengajuanForEdit">
                Kode Pengajuan: {{ selectedPengajuanForEdit.kode_pengajuan }} -
                {{ selectedPengajuanForEdit.Owner.nama }}
              </p>
            </div>
            <button
              @click="closeDocumentEditor"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="documentLoading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="ml-2 text-gray-600">Memuat dokumen...</span>
          </div>

          <!-- Error State -->
          <div
            v-else-if="documentError"
            class="bg-red-50 border border-red-200 rounded-md p-4 mb-4"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Error</h3>
                <div class="mt-2 text-sm text-red-700">{{ documentError }}</div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Editor Panel -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-md font-medium text-gray-900">HTML Editor</h4>
                <div class="flex space-x-2">
                  <button
                    @click="resetDocumentContent"
                    class="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    :disabled="generatingEditedDocument"
                  >
                    Reset
                  </button>
                  <button
                    @click="previewDocumentContent"
                    class="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                  >
                    Preview
                  </button>
                </div>
              </div>
              <div class="relative">
                <textarea
                  v-model="editedDocumentHtml"
                  class="w-full h-96 p-4 text-xs font-mono bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="HTML content will appear here..."
                  :disabled="generatingEditedDocument"
                ></textarea>
              </div>
            </div>

            <!-- Preview Panel -->
            <div class="space-y-4">
              <h4 class="text-md font-medium text-gray-900">Preview</h4>
              <div class="border border-gray-300 rounded-md overflow-hidden">
                <div class="bg-white h-96 overflow-auto p-2">
                  <iframe
                    v-if="previewDocumentHtml"
                    :srcdoc="previewDocumentHtml"
                    class="w-full h-full border-0"
                    style="transform: scale(0.8); transform-origin: 0 0; width: 125%; height: 125%"
                  ></iframe>
                  <div v-else class="flex items-center justify-center h-full text-gray-500">
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
                      <p>Klik "Preview" untuk melihat pratinjau dokumen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-end pt-4 mt-4 border-t space-x-3">
            <button
              @click="closeDocumentEditor"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              :disabled="generatingEditedDocument"
            >
              Batal
            </button>
            <button
              @click="generateEditedDocument"
              :disabled="generatingEditedDocument || !editedDocumentHtml.trim()"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
                generatingEditedDocument || !editedDocumentHtml.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
              ]"
            >
              <div class="flex items-center">
                <svg
                  v-if="generatingEditedDocument"
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
                <svg
                  v-else
                  class="w-4 h-4 mr-2"
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
                {{ generatingEditedDocument ? 'Generating...' : 'Generate & Download' }}
              </div>
            </button>
          </div>
        </div>
      </div>

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
import { ref, onMounted, computed } from 'vue'
import PengajuanDetailModal from './Admin/PengajuanDetailModal.vue'
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
const documentLoading = ref(false)
const documentError = ref(null)
const originalDocumentHtml = ref('')
const editedDocumentHtml = ref('')
const previewDocumentHtml = ref('')
const generatingEditedDocument = ref(false)
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

    const response = await axios.get('http://localhost:3000/api/pengajuan', {
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

const openDocumentEditor = async (pengajuan) => {
  try {
    selectedPengajuanForEdit.value = pengajuan
    showDocumentEditor.value = true

    // Reset states
    documentError.value = null
    originalDocumentHtml.value = ''
    editedDocumentHtml.value = ''
    previewDocumentHtml.value = ''

    await fetchDocumentContent(pengajuan)
  } catch (error) {
    console.error('Error opening document editor:', error)
    documentError.value = 'Gagal membuka editor dokumen'
  }
}

const closeDocumentEditor = () => {
  showDocumentEditor.value = false
  selectedPengajuanForEdit.value = null
  documentError.value = null
  originalDocumentHtml.value = ''
  editedDocumentHtml.value = ''
  previewDocumentHtml.value = ''
}

const fetchDocumentContent = async (pengajuan) => {
  try {
    documentLoading.value = true
    documentError.value = null

    // Use the correct ID from the pengajuan object - based on the data structure, use id_pengajuan
    const pengajuanId = pengajuan.id_pengajuan || pengajuan.id

    if (!pengajuanId) {
      throw new Error('ID Pengajuan tidak ditemukan')
    }

    console.log('Fetching document for pengajuan ID:', pengajuanId)

    const response = await axios.get(
      `http://localhost:3000/api/pengajuan/${pengajuanId}/prepare-document`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 30000, // 30 second timeout
      },
    )

    if (!response.data || !response.data.htmlContent) {
      throw new Error('Konten dokumen tidak ditemukan dalam respons server')
    }

    originalDocumentHtml.value = response.data.htmlContent
    editedDocumentHtml.value = response.data.htmlContent
    previewDocumentHtml.value = response.data.htmlContent

    console.log('Document content fetched successfully')
  } catch (err) {
    console.error('Error fetching document:', err)

    if (err.code === 'ECONNABORTED') {
      documentError.value = 'Timeout: Server terlalu lama merespons'
    } else if (err.response?.status === 404) {
      documentError.value = 'Dokumen tidak ditemukan'
    } else if (err.response?.status === 403) {
      documentError.value = 'Tidak memiliki izin untuk mengakses dokumen ini'
    } else if (err.response?.status === 500) {
      documentError.value = 'Error server internal. Silakan coba lagi nanti.'
    } else {
      documentError.value = `Gagal memuat dokumen: ${err.response?.data?.message || err.message}`
    }
  } finally {
    documentLoading.value = false
  }
}

const resetDocumentContent = () => {
  editedDocumentHtml.value = originalDocumentHtml.value
  previewDocumentHtml.value = originalDocumentHtml.value
}

const previewDocumentContent = () => {
  previewDocumentHtml.value = editedDocumentHtml.value
}

const generateEditedDocument = async () => {
  if (!selectedPengajuanForEdit.value) {
    documentError.value = 'Tidak ada pengajuan yang dipilih'
    return
  }

  if (!editedDocumentHtml.value || !editedDocumentHtml.value.trim()) {
    documentError.value = 'Konten dokumen tidak boleh kosong'
    return
  }

  try {
    generatingEditedDocument.value = true
    documentError.value = null

    const pengajuanId =
      selectedPengajuanForEdit.value.id_pengajuan || selectedPengajuanForEdit.value.id

    if (!pengajuanId) {
      throw new Error('ID Pengajuan tidak ditemukan')
    }

    console.log('Generating edited document for pengajuan ID:', pengajuanId)

    const response = await axios.post(
      `http://localhost:3000/api/pengajuan/${pengajuanId}/generate-edited-document`,
      {
        editedHtml: editedDocumentHtml.value,
        metadata: {
          kode_pengajuan: selectedPengajuanForEdit.value.kode_pengajuan,
          owner_name: selectedPengajuanForEdit.value.Owner?.nama,
          jenis_pengajuan: selectedPengajuanForEdit.value.JenisPengajuan?.name,
          edited_at: new Date().toISOString(),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
        timeout: 60000, // 60 second timeout for document generation
      },
    )

    // Validate response
    if (!response.data || response.data.size === 0) {
      throw new Error('File yang dihasilkan kosong')
    }

    // Create download link with proper filename
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
    const link = document.createElement('a')
    link.href = url

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '')
    const filename = `dokumen-edited-${selectedPengajuanForEdit.value.kode_pengajuan}-${timestamp}.pdf`

    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)

    // Show success message
    successMessage.value = 'Dokumen berhasil di-generate dengan perubahan dan berhasil diunduh!'

    // Auto hide success message after 5 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)

    // Close modal
    closeDocumentEditor()
  } catch (err) {
    console.error('Error generating document:', err)

    if (err.code === 'ECONNABORTED') {
      documentError.value = 'Timeout: Proses generate dokumen terlalu lama'
    } else if (err.response?.status === 404) {
      documentError.value = 'Endpoint generate dokumen tidak ditemukan'
    } else if (err.response?.status === 403) {
      documentError.value = 'Tidak memiliki izin untuk generate dokumen'
    } else if (err.response?.status === 500) {
      documentError.value = 'Error server saat generate dokumen. Silakan coba lagi.'
    } else {
      documentError.value = `Gagal generate dokumen: ${err.response?.data?.message || err.message}`
    }
  } finally {
    generatingEditedDocument.value = false
  }
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
      `http://localhost:3000/api/pengajuan/${pengajuanId}/generate-document`,
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

const handleDocumentGenerated = (message) => {
  successMessage.value = message
  // Auto hide success message after 5 seconds
  setTimeout(() => {
    successMessage.value = ''
  }, 5000)
}

// Auto-hide error messages after 10 seconds
const autoHideError = () => {
  if (error.value) {
    setTimeout(() => {
      error.value = null
    }, 10000)
  }
}

// Auto-hide document error messages after 10 seconds
const autoHideDocumentError = () => {
  if (documentError.value) {
    setTimeout(() => {
      documentError.value = null
    }, 10000)
  }
}

// Watch for errors and auto-hide them
import { watch } from 'vue'

watch(error, (newError) => {
  if (newError) {
    autoHideError()
  }
})

watch(documentError, (newDocumentError) => {
  if (newDocumentError) {
    autoHideDocumentError()
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

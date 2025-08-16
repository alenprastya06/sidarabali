<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 mb-4 border-b">
        <div>
          <h3 class="text-lg font-medium text-gray-900">Edit Dokumen</h3>
          <p class="text-sm text-gray-500 mt-1">
            Kode Pengajuan: {{ pengajuan.kode_pengajuan }} - {{ pengajuan.Owner.nama }}
          </p>
        </div>
        <button
          @click="closeModal"
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
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="ml-2 text-gray-600">Memuat dokumen...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
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
            <div class="mt-2 text-sm text-red-700">{{ error }}</div>
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
                @click="resetDocument"
                class="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                :disabled="generatingDocument"
              >
                Reset
              </button>
              <button
                @click="previewDocument"
                class="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                Preview
              </button>
            </div>
          </div>
          <div class="relative">
            <textarea
              v-model="editedHtml"
              class="w-full h-96 p-4 text-xs font-mono bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="HTML content will appear here..."
              :disabled="generatingDocument"
            ></textarea>
          </div>
        </div>

        <!-- Preview Panel -->
        <div class="space-y-4">
          <h4 class="text-md font-medium text-gray-900">Preview</h4>
          <div class="border border-gray-300 rounded-md overflow-hidden">
            <div class="bg-white h-96 overflow-auto p-2">
              <iframe
                v-if="previewHtml"
                :srcdoc="previewHtml"
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
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          :disabled="generatingDocument"
        >
          Batal
        </button>
        <button
          @click="generateDocument"
          :disabled="generatingDocument || !editedHtml.trim()"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
            generatingDocument || !editedHtml.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
          ]"
        >
          <div class="flex items-center">
            <svg
              v-if="generatingDocument"
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
            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {{ generatingDocument ? 'Generating...' : 'Generate & Download' }}
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits, defineProps } from 'vue'
import axios from 'axios'

// Props
const props = defineProps({
  pengajuan: {
    type: Object,
    required: true,
  },
})

// Emits
const emit = defineEmits(['close', 'document-generated'])

// Reactive data
const loading = ref(true)
const error = ref(null)
const originalHtml = ref('')
const editedHtml = ref('')
const previewHtml = ref('')
const generatingDocument = ref(false)
const token = localStorage.getItem('token')

// Methods
const fetchDocumentContent = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await axios.get(
      `http://localhost:3000/api/pengajuan/${props.pengajuan.id}/prepare-document`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    originalHtml.value = response.data.htmlContent
    editedHtml.value = response.data.htmlContent
    previewHtml.value = response.data.htmlContent
  } catch (err) {
    error.value = `Failed to fetch document: ${err.response?.data?.message || err.message}`
    console.error('Error fetching document:', err)
  } finally {
    loading.value = false
  }
}

const resetDocument = () => {
  editedHtml.value = originalHtml.value
  previewHtml.value = originalHtml.value
}

const previewDocument = () => {
  previewHtml.value = editedHtml.value
}

const generateDocument = async () => {
  try {
    generatingDocument.value = true

    const response = await axios.post(
      `http://localhost:3000/api/pengajuan/${props.pengajuan.id}/generate-edited-document`,
      {
        editedHtml: editedHtml.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      },
    )

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `dokumen-edited-${props.pengajuan.kode_pengajuan}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)

    // Emit success event
    emit('document-generated', 'Dokumen berhasil di-generate dengan perubahan!')

    // Close modal
    closeModal()
  } catch (err) {
    error.value = `Failed to generate document: ${err.response?.data?.message || err.message}`
    console.error('Error generating document:', err)
  } finally {
    generatingDocument.value = false
  }
}

const closeModal = () => {
  emit('close')
}

// Lifecycle
onMounted(() => {
  fetchDocumentContent()
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

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Custom scrollbar for preview */
.overflow-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>

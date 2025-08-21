<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-10 mx-auto p-5 border w-11/12 max-w-7xl shadow-lg rounded-md bg-white">
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 mb-4 border-b">
        <div>
          <h3 class="text-lg font-medium text-gray-900">Edit Dokumen</h3>
          <p class="text-sm text-gray-500 mt-1" v-if="pengajuan">
            Kode Pengajuan: {{ pengajuan.kode_pengajuan }} - {{ pengajuan.Owner.nama }}
          </p>
        </div>
        <button
          @click="$emit('close')"
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
            <h4 class="text-md font-medium text-gray-900">Edit Konten Dokumen</h4>
            <div class="flex space-x-2">
              <button
                @click="resetContent"
                class="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                :disabled="generating"
              >
                Reset
              </button>
              <button
                @click="updatePreview"
                class="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                Refresh Preview
              </button>
            </div>
          </div>

          <!-- Editable Fields -->
          <div class="space-y-4 max-h-96 overflow-y-auto border border-gray-200 rounded-md p-4">
            <div
              v-for="(field, index) in editableFields"
              :key="index"
              class="border-b border-gray-100 pb-3 last:border-b-0"
            >
              <label class="block text-xs font-medium text-gray-700 mb-1">
                {{ field.label }}
              </label>
              <textarea
                v-if="field.type === 'textarea'"
                v-model="field.value"
                @input="updateDocumentContent"
                :rows="field.rows || 3"
                class="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                :placeholder="field.placeholder"
              ></textarea>
              <input
                v-else
                v-model="field.value"
                @input="updateDocumentContent"
                type="text"
                class="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                :placeholder="field.placeholder"
              />
            </div>
          </div>

          <!-- Instructions -->
          <div class="text-xs text-gray-500 bg-blue-50 p-3 rounded-md">
            <strong>Panduan:</strong> Edit hanya konten teks di atas. Format dan tampilan dokumen
            akan tetap sama seperti template asli.
          </div>
        </div>

        <!-- Preview Panel -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-md font-medium text-gray-900">Preview Dokumen</h4>
            <div class="text-xs text-gray-500">Update otomatis saat mengetik</div>
          </div>
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
                  <p>Preview dokumen akan muncul di sini</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-end pt-4 mt-4 border-t space-x-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          :disabled="generating"
        >
          Batal
        </button>
        <button
          @click="generateDocument"
          :disabled="generating"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
            generating
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
          ]"
        >
          <div class="flex items-center">
            <svg
              v-if="generating"
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
            {{ generating ? 'Generating...' : 'Generate & Download' }}
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

// Props
const props = defineProps({
  pengajuan: { type: Object, required: true },
  show: { type: Boolean, default: false },
})

// Emits
const emit = defineEmits(['close', 'success', 'error'])

// Reactive data
const loading = ref(false)
const error = ref(null)
const generating = ref(false)
const originalHtml = ref('')
const editedHtml = ref('')
const previewHtml = ref('')
const editableFields = ref([])
const token = localStorage.getItem('token')

// Methods
const extractEditableContent = (html) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const fields = []

  const extractors = [
    {
      selector: 'h1',
      label: 'Judul Utama',
      type: 'input',
      placeholder: 'Masukkan judul utama dokumen',
    },
    { selector: 'h2', label: 'Sub Judul', type: 'input', placeholder: 'Masukkan sub judul' },
    {
      selector: 'p:not(:empty)',
      label: 'Paragraf',
      type: 'textarea',
      rows: 3,
      placeholder: 'Masukkan isi paragraf',
    },
    {
      selector: '.content',
      label: 'Konten Utama',
      type: 'textarea',
      rows: 5,
      placeholder: 'Masukkan konten utama',
    },
    {
      selector: '.description',
      label: 'Deskripsi',
      type: 'textarea',
      rows: 4,
      placeholder: 'Masukkan deskripsi',
    },
  ]

  extractors.forEach((extractor) => {
    const elements = doc.querySelectorAll(extractor.selector)
    elements.forEach((element, index) => {
      if (element.textContent.trim()) {
        fields.push({
          id: `${extractor.selector.replace(/[^a-zA-Z0-9]/g, '_')}_${index}`,
          label: elements.length > 1 ? `${extractor.label} ${index + 1}` : extractor.label,
          type: extractor.type,
          rows: extractor.rows,
          placeholder: extractor.placeholder,
          value: element.textContent.trim(),
          selector: extractor.selector,
          index: index,
          originalElement: element,
        })
      }
    })
  })

  if (fields.length === 0) {
    const bodyText = doc.body.textContent.trim()
    if (bodyText) {
      fields.push({
        id: 'main_content',
        label: 'Konten Dokumen',
        type: 'textarea',
        rows: 10,
        placeholder: 'Masukkan konten dokumen',
        value: bodyText,
        selector: 'body',
        index: 0,
      })
    }
  }

  return fields
}

const updateDocumentContent = () => {
  if (!originalHtml.value) return

  let updatedHtml = originalHtml.value
  const parser = new DOMParser()
  const doc = parser.parseFromString(updatedHtml, 'text/html')

  editableFields.value.forEach((field) => {
    if (field.selector && field.value !== undefined) {
      const elements = doc.querySelectorAll(field.selector)
      if (elements[field.index]) {
        elements[field.index].textContent = field.value
      }
    }
  })

  editedHtml.value = doc.documentElement.outerHTML
  updatePreview()
}

const updatePreview = () => {
  previewHtml.value = editedHtml.value
}

const resetContent = () => {
  editedHtml.value = originalHtml.value
  editableFields.value = extractEditableContent(originalHtml.value)
  updatePreview()
}

const fetchDocumentContent = async () => {
  if (!props.pengajuan) return

  try {
    loading.value = true
    error.value = null

    const pengajuanId = props.pengajuan.id_pengajuan || props.pengajuan.id
    if (!pengajuanId) {
      throw new Error('ID Pengajuan tidak ditemukan')
    }

    const response = await axios.get(
      `https://bitwisi.cloud/api/pengajuan/${pengajuanId}/prepare-document`,
      {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 30000,
      },
    )

    if (!response.data?.htmlContent) {
      throw new Error('Konten dokumen tidak ditemukan dalam respons server')
    }

    originalHtml.value = response.data.htmlContent
    editedHtml.value = response.data.htmlContent
    editableFields.value = extractEditableContent(response.data.htmlContent)
    updatePreview()
  } catch (err) {
    console.error('Error fetching document:', err)
    let errorMessage = ''
    if (err.code === 'ECONNABORTED') {
      errorMessage = 'Timeout: Server terlalu lama merespons'
    } else {
      errorMessage = `Gagal memuat dokumen: ${err.response?.data?.message || err.message}`
    }
    error.value = errorMessage
    emit('error', errorMessage)
  } finally {
    loading.value = false
  }
}

// ⭐ FUNGSI INI TELAH DIUBAH UNTUK MENGUNDUH DARI URL ⭐
const generateDocument = async () => {
  if (!props.pengajuan) {
    error.value = 'Tidak ada pengajuan yang dipilih'
    emit('error', error.value)
    return
  }

  try {
    generating.value = true
    error.value = null

    const pengajuanId = props.pengajuan.id_pengajuan || props.pengajuan.id
    if (!pengajuanId) {
      throw new Error('ID Pengajuan tidak ditemukan')
    }

    const response = await axios.post(
      `https://bitwisi.cloud/api/pengajuan/${pengajuanId}/generate-edited-document`,
      {
        editedHtml: editedHtml.value,
        metadata: {
          kode_pengajuan: props.pengajuan.kode_pengajuan,
          owner_name: props.pengajuan.Owner?.nama,
          jenis_pengajuan: props.pengajuan.JenisPengajuan?.name,
          edited_at: new Date().toISOString(),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 60000,
      },
    )

    // Cek jika ada URL di dalam respons
    if (!response.data || !response.data.draft_document_url) {
      throw new Error('URL dokumen tidak ditemukan dalam respons server.')
    }

    // Menggunakan URL dari respons untuk mengunduh atau membuka di tab baru
    const downloadUrl = response.data.draft_document_url
    window.open(downloadUrl, '_blank')

    emit('success', 'Dokumen berhasil di-generate dan siap diunduh!')
    emit('close')
  } catch (err) {
    console.error('Error generating document:', err)
    let errorMessage = `Gagal generate dokumen: ${err.response?.data?.message || err.message}`
    error.value = errorMessage
    emit('error', errorMessage)
  } finally {
    generating.value = false
  }
}

const resetModal = () => {
  error.value = null
  originalHtml.value = ''
  editedHtml.value = ''
  previewHtml.value = ''
  editableFields.value = []
  loading.value = false
  generating.value = false
}

// Watchers
watch(
  () => props.show,
  (newValue) => {
    if (newValue && props.pengajuan) {
      fetchDocumentContent()
    } else if (!newValue) {
      resetModal()
    }
  },
)

watch(error, (newError) => {
  if (newError) {
    setTimeout(() => {
      error.value = null
    }, 10000)
  }
})

// Lifecycle
onMounted(() => {
  if (props.show && props.pengajuan) {
    fetchDocumentContent()
  }
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

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>

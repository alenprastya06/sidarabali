<template>
  <div class="min-h-screen bg-gray-50 p-8 antialiased">
    <div class="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-3xl mx-auto">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-8 text-center">Detail Dokumen</h2>

      <div v-if="loading" class="text-center text-gray-600 py-10">
        <svg
          class="animate-spin h-8 w-8 text-blue-500 mx-auto"
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
        <p class="mt-3 text-lg">Memuat detail dokumen...</p>
      </div>
      <div
        v-else-if="error"
        class="text-center bg-red-100 text-red-700 p-4 rounded-lg border border-red-200"
      >
        <p class="font-semibold">Terjadi Kesalahan:</p>
        <p>{{ error }}</p>
      </div>
      <div v-else-if="document">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-6">
          <div>
            <p class="text-gray-700 text-sm font-semibold mb-1">Nama Berkas:</p>
            <p class="text-gray-900 text-base font-medium">{{ document.file_name }}</p>
          </div>
          <div>
            <p class="text-gray-700 text-sm font-semibold mb-1">Diunggah Oleh:</p>
            <p class="text-gray-900 text-base font-medium">{{ document.username }}</p>
          </div>
          <div>
            <p class="text-gray-700 text-sm font-semibold mb-1">Waktu Unggah:</p>
            <p class="text-gray-900 text-base font-medium">
              {{ new Date(document.uploaded_at).toLocaleString() }}
            </p>
          </div>
          <div>
            <p class="text-gray-700 text-sm font-semibold mb-1">Status Saat Ini:</p>
            <span
              :class="getStatusColor(document.status)"
              class="py-1.5 px-3 rounded-full text-xs font-semibold border"
            >
              {{ document.status }}
            </span>
          </div>
        </div>

        <a
          :href="`http://localhost:3001/uploads/${document.file_name}`"
          target="_blank"
          class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-8 w-full md:w-auto"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
          Lihat Dokumen
        </a>

        <div class="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <label for="isComplete" class="block text-blue-800 text-sm font-bold mb-2 cursor-pointer">
            <input
              type="checkbox"
              id="isComplete"
              v-model="isComplete"
              class="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded-md transition duration-150 ease-in-out transform scale-110"
            />
            Kelengkapan Dokumen:
            <span
              class="ml-2 font-semibold"
              :class="isComplete ? 'text-green-700' : 'text-red-700'"
            >
              {{ isComplete ? 'Dokumen Lengkap' : 'Dokumen Belum Lengkap' }}
            </span>
          </label>
        </div>

        <div class="mb-8">
          <label for="adminNotes" class="block text-gray-700 text-sm font-bold mb-2"
            >Catatan Admin:</label
          >
          <textarea
            id="adminNotes"
            v-model="adminNotes"
            rows="5"
            class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 transition duration-200 resize-y"
            placeholder="Tambahkan catatan atau observasi terkait dokumen ini..."
          ></textarea>
        </div>

        <div class="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            @click="updateStatus('approved')"
            class="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            :disabled="updating"
          >
            <svg
              v-if="updating && currentStatusUpdate === 'approved'"
              class="animate-spin h-5 w-5 mr-3 text-white"
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
            <svg
              v-else
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            {{
              updating && currentStatusUpdate === 'approved' ? 'Menyetujui...' : 'Setujui Dokumen'
            }}
          </button>
          <button
            @click="updateStatus('rejected')"
            class="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            :disabled="updating"
          >
            <svg
              v-if="updating && currentStatusUpdate === 'rejected'"
              class="animate-spin h-5 w-5 mr-3 text-white"
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
            <svg
              v-else
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            {{ updating && currentStatusUpdate === 'rejected' ? 'Menolak...' : 'Tolak Dokumen' }}
          </button>
        </div>

        <div
          v-if="updateMessage"
          :class="
            updateSuccess
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-red-100 text-red-700 border border-red-200'
          "
          class="mt-6 p-4 rounded-lg text-center font-medium"
        >
          {{ updateMessage }}
        </div>
      </div>
      <div v-else class="text-center text-gray-600 py-10">
        <p class="text-lg">Dokumen tidak ditemukan.</p>
      </div>

      <div class="mt-10 text-center">
        <router-link
          to="/admin/dashboard"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition duration-200 hover:underline"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            ></path>
          </svg>
          Kembali ke Dasbor Admin
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

const route = useRoute()
const authStore = useAuthStore()
const document = ref(null)
const loading = ref(true)
const error = ref(null)
const adminNotes = ref('')
const isComplete = ref(false)
const updating = ref(false)
const currentStatusUpdate = ref(null) // Added to track which button triggered the update
const updateMessage = ref(null)
const updateSuccess = ref(false)

const API_URL = 'http://localhost:3001/api/documents'

const fetchDocumentDetails = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(`${API_URL}/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    document.value = response.data
    adminNotes.value = document.value.admin_notes || ''
    isComplete.value = document.value.is_complete || false
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal mengambil detail dokumen.'
    console.error('Kesalahan mengambil detail dokumen:', err)
  } finally {
    loading.value = false
  }
}

const updateStatus = async (status) => {
  updating.value = true
  currentStatusUpdate.value = status // Set which button is active
  updateMessage.value = null
  updateSuccess.value = false
  try {
    await axios.put(
      `${API_URL}/${document.value.id}/status`,
      {
        status: status,
        admin_notes: adminNotes.value,
        is_complete: isComplete.value,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )
    document.value.status = status // Perbarui state lokal
    document.value.admin_notes = adminNotes.value // Perbarui state lokal
    document.value.is_complete = isComplete.value // Perbarui state lokal
    updateMessage.value = `Dokumen berhasil ${status === 'approved' ? 'disetujui' : 'ditolak'}.`
    updateSuccess.value = true
  } catch (err) {
    updateMessage.value =
      err.response?.data?.message ||
      `Gagal ${status === 'approved' ? 'menyetujui' : 'menolak'} dokumen.`
    updateSuccess.value = false
    console.error(`Kesalahan memperbarui status dokumen menjadi ${status}:`, err)
  } finally {
    updating.value = false
    currentStatusUpdate.value = null // Reset current status update
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-emerald-100 text-emerald-700 border border-emerald-200'
    case 'rejected':
      return 'bg-rose-100 text-rose-700 border border-rose-200'
    case 'pending':
    default:
      return 'bg-amber-100 text-amber-700 border border-amber-200'
  }
}

onMounted(() => {
  fetchDocumentDetails()
})
</script>

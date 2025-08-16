<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" v-if="pengajuan">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="$emit('close')"
    ></div>

    <!-- Modal -->
    <div
      class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6"
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900">Detail Pengajuan</h3>
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

        <!-- Content -->
        <div class="space-y-6">
          <!-- Status & Basic Info -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-500">Jenis Pengajuan</label>
                <p class="mt-1 text-sm text-gray-900">{{ pengajuan.JenisPengajuan.name }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">Status</label>
                <div class="mt-1">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    <svg class="w-2 h-2 mr-1 fill-current" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                    Disetujui
                  </span>
                </div>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">User</label>
                <p class="mt-1 text-sm text-gray-900">{{ getUserName(pengajuan.user_id) }}</p>
              </div>
            </div>
          </div>

          <!-- Owner Information -->
          <div>
            <h4 class="text-lg font-medium text-gray-900 mb-4">Informasi Pemilik</h4>
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-500">Nama Lengkap</label>
                  <p class="mt-1 text-sm text-gray-900">{{ pengajuan.Owner.nama }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">NIK</label>
                  <p class="mt-1 text-sm text-gray-900">{{ pengajuan.Owner.nik }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Email</label>
                  <p class="mt-1 text-sm text-gray-900">{{ pengajuan.Owner.email }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Nomor Telepon</label>
                  <p class="mt-1 text-sm text-gray-900">{{ pengajuan.Owner.phone }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Pekerjaan</label>
                  <p class="mt-1 text-sm text-gray-900">{{ pengajuan.Owner.pekerjaan }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Alamat</label>
                  <p class="mt-1 text-sm text-gray-900">{{ pengajuan.Owner.alamat || '-' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Land Information -->
          <div>
            <h4 class="text-lg font-medium text-gray-900 mb-4">Informasi Lahan</h4>
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-500">No. Surat RT</label>
                  <p class="mt-1 text-sm text-gray-900">{{ pengajuan.Lahan.no_surat_rt }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Jenis Bangunan</label>
                  <p class="mt-1 text-sm text-gray-900">{{ pengajuan.Lahan.jenis_bangunan }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Luas Lahan</label>
                  <p class="mt-1 text-sm text-gray-900">{{ pengajuan.Lahan.luas_lahan }} m²</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Lokasi</label>
                  <p class="mt-1 text-sm text-gray-900">
                    {{ pengajuan.Lahan.wilayah_kelurahan }}, {{ pengajuan.Lahan.wilayah_kecamatan }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Documents -->
          <div>
            <h4 class="text-lg font-medium text-gray-900 mb-4">
              Dokumen ({{ pengajuan.Documents.length }})
            </h4>
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="doc in pengajuan.Documents"
                  :key="doc.id"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                >
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">
                      {{ formatDocumentType(doc.document_type) }}
                    </p>
                    <p v-if="doc.file_url" class="text-xs text-gray-500 mt-1">
                      {{ doc.original_name || 'Dokumen tersedia' }}
                    </p>
                    <p v-else class="text-xs text-red-500 mt-1">Belum diunggah</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span
                      :class="getDocumentStatusClass(doc.status)"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {{ doc.status }}
                    </span>
                    <button
                      v-if="doc.file_url"
                      @click="viewDocument(doc.file_url)"
                      class="text-indigo-600 hover:text-indigo-900 text-sm"
                      title="Lihat Dokumen"
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
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Approval Info -->
          <div
            v-if="pengajuan.approvedAt"
            class="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h4 class="text-sm font-medium text-green-800">Pengajuan Disetujui</h4>
                <p class="text-sm text-green-700 mt-1">
                  Disetujui pada: {{ formatDate(pengajuan.approvedAt) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Timestamps -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <label class="font-medium text-gray-500">Tanggal Dibuat</label>
                <p>{{ formatDate(pengajuan.createdAt) }}</p>
              </div>
              <div>
                <label class="font-medium text-gray-500">Terakhir Diperbarui</label>
                <p>{{ formatDate(pengajuan.updatedAt) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-6 flex justify-end">
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
import { defineProps, defineEmits } from 'vue'

// Props
const props = defineProps({
  pengajuan: {
    type: Object,
    required: true,
  },
})

// Emits
const emit = defineEmits(['close'])

// Methods
const getUserName = (userId) => {
  // You might need to pass users data as props or use a store
  return 'User ' + userId // Placeholder - adjust based on your data structure
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

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
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const viewDocument = (fileUrl) => {
  window.open(fileUrl, '_blank')
}
</script>

<style scoped>
/* Modal animation styles */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

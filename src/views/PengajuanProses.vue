<template>
  <UserHeader />
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-6">
    <div class="max-w-7xl mx-auto">
      <button @click="goBack" class="flex items-center gap-2 py-2 rounded mb-5">
        <i class="fa-solid fa-arrow-left"></i>
        Kembali
      </button>
      <div class="mb-8">
        <h1 class="text-xl font-bold text-gray-900 mb-2">Data Pengajuan</h1>
        <p class="text-gray-600">Kelola dan pantau status pengajuan rekomendasi hak atas tanah</p>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error</h3>
            <p class="mt-1 text-sm text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>

      <div
        v-if="!loading && !error"
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Daftar Pengajuan Pending</h2>
        </div>

        <!-- Table when data exists -->
        <div v-if="filteredPengajuanData.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Kode Pengajuan
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pemohon
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Lokasi
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tanggal
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="pengajuan in filteredPengajuanData"
                :key="pengajuan.id_pengajuan"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ pengajuan.kode_pengajuan }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div
                        class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center"
                      >
                        <span class="text-white font-medium text-sm">
                          {{ getInitials(pengajuan.Owner.nama) }}
                        </span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ pengajuan.Owner.nama }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ pengajuan.Owner.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {{ pengajuan.Lahan.wilayah_kelurahan }}, {{ pengajuan.Lahan.wilayah_kecamatan }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ pengajuan.Lahan.wilayah_kota }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusBadgeClass(pengajuan.status)"
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {{ getStatusText(pengajuan.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(pengajuan.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="viewDetail(pengajuan.id_pengajuan)"
                    class="text-blue-600 hover:text-blue-900 transition-colors duration-150 mr-3"
                  >
                    Detail
                  </button>
                  <button
                    v-if="pengajuan.final_document_url"
                    @click="downloadDocument(pengajuan.final_document_url)"
                    class="text-green-600 hover:text-green-900 transition-colors duration-150"
                  >
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty state when no pending data -->
        <div v-else class="px-6 py-12 text-center">
          <div
            class="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4"
          >
            <svg
              class="h-8 w-8 text-gray-400"
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
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak Ada Pengajuan Pending</h3>
          <p class="text-gray-500 mb-6">
            Saat ini tidak ada dokumen pengajuan yang sedang dalam proses.
          </p>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3 text-left">
                <h4 class="text-sm font-medium text-blue-800">Informasi</h4>
                <p class="text-sm text-blue-700">
                  Semua pengajuan telah diproses atau belum ada pengajuan baru yang masuk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div
          class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Detail Pengajuan</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div v-if="selectedPengajuan" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Kode Pengajuan</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedPengajuan.kode_pengajuan }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <span
                  :class="getStatusBadgeClass(selectedPengajuan.status)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1"
                >
                  {{ getStatusText(selectedPengajuan.status) }}
                </span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Nama Pemohon</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedPengajuan.Owner.nama }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Alamat Lahan</label>
              <p class="mt-1 text-sm text-gray-900">
                {{ selectedPengajuan.Lahan.wilayah_kelurahan }},
                {{ selectedPengajuan.Lahan.wilayah_kecamatan }},
                {{ selectedPengajuan.Lahan.wilayah_kota }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Luas Lahan</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ selectedPengajuan.Lahan.luas_lahan }} m²
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Jenis Bangunan</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ selectedPengajuan.Lahan.jenis_bangunan }}
                </p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status Dokumen</label>
              <div class="space-y-2 max-h-64 overflow-y-auto">
                <div
                  v-for="doc in selectedPengajuan.Documents"
                  :key="doc.id"
                  class="flex justify-between items-center p-2 bg-gray-50 rounded"
                >
                  <span class="text-sm text-gray-900 capitalize">{{
                    doc.document_type.replace(/_/g, ' ')
                  }}</span>
                  <span
                    :class="getDocumentStatusClass(doc.status)"
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {{ getDocumentStatusText(doc.status) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import UserHeader from './UserHeader.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const pengajuanData = ref([])
const filteredPengajuanData = ref([])
const loading = ref(true)
const error = ref(null)
const showModal = ref(false)
const selectedPengajuan = ref(null)
const token = localStorage.getItem('token')

const API_BASE = 'https://bitwisi.cloud/api'

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
}

const fetchPengajuan = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${API_BASE}/pengajuan`, axiosConfig)

    if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].pengajuan) {
      pengajuanData.value = response.data[0].pengajuan
      filteredPengajuanData.value = response.data[0].pengajuan.filter((p) => p.status === 'pending')
    } else {
      pengajuanData.value = []
      filteredPengajuanData.value = []
    }

    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: `Data pengajuan berhasil dimuat. Ditemukan ${filteredPengajuanData.value.length} pengajuan pending`,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
    })
  } catch (err) {
    error.value = `Gagal memuat data: ${err.message}`
    console.error('Error fetching pengajuan:', err)

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Gagal memuat data pengajuan: ${err.response?.data?.message || err.message}`,
    })
  } finally {
    loading.value = false
  }
}

const fetchDetailPengajuan = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/pengajuan/${id}`, axiosConfig)
    return response.data
  } catch (err) {
    console.error('Error fetching detail:', err)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Gagal memuat detail pengajuan: ${err.response?.data?.message || err.message}`,
    })
    return null
  }
}

const viewDetail = async (id) => {
  const detail = await fetchDetailPengajuan(id)
  if (detail) {
    selectedPengajuan.value = detail
    showModal.value = true
  }
}

const closeModal = () => {
  showModal.value = false
  selectedPengajuan.value = null
}

const downloadDocument = async (url) => {
  try {
    const result = await Swal.fire({
      title: 'Download Dokumen',
      text: 'Apakah Anda yakin ingin mendownload dokumen ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Download',
      cancelButtonText: 'Batal',
    })

    if (result.isConfirmed) {
      window.open(url, '_blank')

      Swal.fire({
        icon: 'success',
        title: 'Download Dimulai',
        text: 'Dokumen sedang didownload',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      })
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Gagal mendownload dokumen',
    })
  }
}

const getStatusCount = (status) => {
  return pengajuanData.value.filter((p) => p.status === status).length
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

const getStatusBadgeClass = (status) => {
  const classes = {
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    menunggu_perbaikan: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-blue-100 text-blue-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    completed: 'Selesai',
    rejected: 'Ditolak',
    menunggu_perbaikan: 'Menunggu Perbaikan',
    pending: 'Pending',
  }
  return texts[status] || status
}

const getDocumentStatusClass = (status) => {
  const classes = {
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getDocumentStatusText = (status) => {
  const texts = {
    approved: 'Disetujui',
    rejected: 'Ditolak',
    pending: 'Menunggu',
  }
  return texts[status] || status
}

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

onMounted(() => {
  fetchPengajuan()
})
</script>

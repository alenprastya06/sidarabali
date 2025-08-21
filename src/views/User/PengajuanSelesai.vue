<template>
  <UserHeader />
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 px-6">
    <div class="max-w-7xl mx-auto">
      <button @click="goBack" class="flex items-center gap-2 py-2 rounded mb-5">
        <i class="fa-solid fa-arrow-left"></i>
        Kembali
      </button>
      <div class="mb-8">
        <h1 class="text-xl font-bold text-gray-900 mb-2">Data Pengajuan Selesai</h1>
        <p class="text-gray-600">
          Daftar pengajuan rekomendasi hak atas tanah yang telah selesai diproses
        </p>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
        <div class="px-6 py-4 border-b border-gray-200 bg-green-50">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center">
              <svg
                class="w-5 h-5 text-green-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Daftar Pengajuan Selesai
            </h2>
            <span class="text-sm text-gray-600">{{ filteredPengajuanData.length }} pengajuan</span>
          </div>
        </div>

        <div v-if="filteredPengajuanData.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama Pengajuan
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tanggal Selesai
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
                  <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900">
                      {{ pengajuan.JenisPengajuan.name }}
                    </div>
                    <div class="ml-2">
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Selesai
                      </span>
                    </div>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">Kode: {{ pengajuan.kode_pengajuan }}</div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col space-y-1">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                    >
                      {{ getStatusText(pengajuan.status) }}
                    </span>
                    <div class="text-xs text-gray-500">
                      {{ getDaysCompleted(pengajuan.updatedAt) }} hari lalu
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="flex flex-col">
                    <span class="font-medium">{{ formatDate(pengajuan.updatedAt) }}</span>
                    <span class="text-xs">{{ formatTime(pengajuan.updatedAt) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="viewDetail(pengajuan.id_pengajuan)"
                      class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors duration-150"
                    >
                      <svg
                        class="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                      Detail
                    </button>
                    <button
                      v-if="pengajuan.final_document_url"
                      @click="
                        downloadDocument(
                          pengajuan.final_document_url,
                          pengajuan.JenisPengajuan.name,
                        )
                      "
                      class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-colors duration-150"
                    >
                      <svg
                        class="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty state when no search results -->
        <div v-else-if="filteredPengajuanData.length === 0" class="px-6 py-12 text-center">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Belum Ada Pengajuan Selesai</h3>
          <p class="text-gray-500 mb-6">
            Saat ini belum ada pengajuan yang telah selesai diproses.
          </p>
          <div class="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div class="ml-3 text-left">
                <h4 class="text-sm font-medium text-green-800">Informasi</h4>
                <p class="text-sm text-green-700">
                  Pengajuan yang telah diproses akan muncul di halaman ini dengan status selesai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      >
        <div
          class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white"
        >
          <div class="flex justify-between items-center mb-4 pb-4 border-b">
            <h3 class="text-xl font-semibold text-gray-900 flex items-center">
              <svg
                class="w-6 h-6 text-green-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Detail Pengajuan Selesai
            </h3>
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

          <div v-if="selectedPengajuan" class="space-y-6">
            <!-- Status Badge -->
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <svg
                    class="w-8 h-8 text-green-500 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div>
                    <h4 class="text-lg font-semibold text-green-900">Pengajuan Selesai</h4>
                    <p class="text-sm text-green-700">
                      Diselesaikan pada {{ formatDate(selectedPengajuan.updatedAt) }}
                    </p>
                  </div>
                </div>
                <span
                  class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800"
                >
                  {{ getStatusText(selectedPengajuan.status) }}
                </span>
              </div>
            </div>

            <!-- Basic Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Nama Pengajuan</label>
                  <p class="mt-1 text-lg font-semibold text-gray-900">
                    {{ selectedPengajuan.JenisPengajuan.name }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Kode Pengajuan</label>
                  <p class="mt-1 text-sm text-gray-600">
                    {{ selectedPengajuan.kode_pengajuan }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Nama Pemohon</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedPengajuan.Owner.nama }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedPengajuan.Owner.email }}</p>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Tanggal Dibuat</label>
                  <p class="mt-1 text-sm text-gray-900">
                    {{ formatDate(selectedPengajuan.createdAt) }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                  <p class="mt-1 text-sm text-gray-900">
                    {{ formatDate(selectedPengajuan.updatedAt) }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Lama Proses</label>
                  <p class="mt-1 text-sm text-gray-900">
                    {{
                      getProcessingDuration(
                        selectedPengajuan.createdAt,
                        selectedPengajuan.updatedAt,
                      )
                    }}
                    hari
                  </p>
                </div>
              </div>
            </div>

            <!-- Land Info -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-lg font-medium text-gray-900 mb-4">Informasi Lahan</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
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
                      {{ selectedPengajuan.Lahan.jenis_bangunan }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Documents Status -->
            <div>
              <label class="block text-lg font-medium text-gray-900 mb-4">Status Dokumen</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                <div
                  v-for="doc in selectedPengajuan.Documents"
                  :key="doc.id"
                  class="flex justify-between items-center p-3 bg-white border rounded-lg shadow-sm"
                >
                  <span class="text-sm font-medium text-gray-900 capitalize">
                    {{ doc.document_type.replace(/_/g, ' ') }}
                  </span>
                  <span
                    :class="getDocumentStatusClass(doc.status)"
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {{ getDocumentStatusText(doc.status) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-3 pt-4 border-t">
              <button
                v-if="selectedPengajuan.final_document_url"
                @click="
                  downloadDocument(
                    selectedPengajuan.final_document_url,
                    selectedPengajuan.JenisPengajuan.name,
                  )
                "
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-150"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                Download Dokumen
              </button>

              <button
                @click="closeModal"
                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-150"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import UserHeader from '../UserHeader.vue'
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
const searchQuery = ref('')
const sortBy = ref('updatedAt')
const sortOrder = ref('desc')
const token = localStorage.getItem('token')

const API_BASE = 'https://bitwisi.cloud/api'

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
}

// Computed property (simplified without search)
const filteredResults = computed(() => {
  let results = [...filteredPengajuanData.value]

  // Sort results
  results.sort((a, b) => {
    let aValue, bValue

    switch (sortBy.value) {
      case 'createdAt':
      case 'updatedAt':
        aValue = new Date(a[sortBy.value])
        bValue = new Date(b[sortBy.value])
        break
      case 'JenisPengajuan.name':
        aValue = a.JenisPengajuan.name
        bValue = b.JenisPengajuan.name
        break
      case 'kode_pengajuan':
        aValue = a.kode_pengajuan
        bValue = b.kode_pengajuan
        break
      case 'nama':
        aValue = a.Owner.nama
        bValue = b.Owner.nama
        break
      default:
        aValue = a[sortBy.value]
        bValue = b[sortBy.value]
    }

    if (sortOrder.value === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return results
})

const fetchPengajuan = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${API_BASE}/pengajuan`, axiosConfig)

    if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].pengajuan) {
      pengajuanData.value = response.data[0].pengajuan
      filteredPengajuanData.value = response.data[0].pengajuan.filter(
        (p) => p.status === 'completed',
      )
    } else {
      pengajuanData.value = []
      filteredPengajuanData.value = []
    }

    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: `Data pengajuan berhasil dimuat. Ditemukan ${filteredPengajuanData.value.length} pengajuan selesai`,
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

const downloadDocument = async (url, namaPengajuan) => {
  try {
    const result = await Swal.fire({
      title: 'Download Dokumen',
      text: `Apakah Anda yakin ingin mendownload dokumen untuk "${namaPengajuan}"?`,
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
        text: `Dokumen "${namaPengajuan}" sedang didownload`,
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

const generateCertificate = async (pengajuan) => {
  try {
    const result = await Swal.fire({
      title: 'Generate Sertifikat',
      text: `Generate sertifikat untuk "${pengajuan.JenisPengajuan.name}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Generate',
      cancelButtonText: 'Batal',
    })

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Generating...',
        text: 'Sedang membuat sertifikat, mohon tunggu...',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      // Simulate certificate generation
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Sertifikat Berhasil Dibuat',
          text: `Sertifikat untuk "${pengajuan.JenisPengajuan.name}" telah berhasil dibuat`,
          showConfirmButton: true,
        })
      }, 2000)
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Gagal generate sertifikat',
    })
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

const getCompletedThisMonth = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  return filteredPengajuanData.value.filter((p) => {
    const completedDate = new Date(p.updatedAt)
    return completedDate.getMonth() === currentMonth && completedDate.getFullYear() === currentYear
  }).length
}

const getAveragePerMonth = () => {
  if (filteredPengajuanData.value.length === 0) return 0

  const dates = filteredPengajuanData.value.map((p) => new Date(p.updatedAt))
  const oldestDate = new Date(Math.min(...dates))
  const newestDate = new Date(Math.max(...dates))

  const monthDiff =
    (newestDate.getFullYear() - oldestDate.getFullYear()) * 12 +
    (newestDate.getMonth() - oldestDate.getMonth()) +
    1

  return Math.round(filteredPengajuanData.value.length / monthDiff)
}

const getDaysCompleted = (dateString) => {
  const completedDate = new Date(dateString)
  const currentDate = new Date()
  const diffTime = Math.abs(currentDate - completedDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const getProcessingDuration = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

const getStatusText = (status) => {
  const texts = {
    completed: 'Selesai',
    approved: 'Disetujui',
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
    month: 'long',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

const formatTime = (dateString) => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  }
  return new Date(dateString).toLocaleTimeString('id-ID', options)
}

onMounted(() => {
  fetchPengajuan()
})
</script>

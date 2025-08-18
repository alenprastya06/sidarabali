<template>
  <UserHeader />
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Data Pengajuan Ditolak</h1>
        <p class="text-gray-600">Daftar pengajuan rekomendasi hak atas tanah yang telah ditolak</p>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
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
        <div class="px-6 py-4 border-b border-gray-200 bg-red-50">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center">
              <svg
                class="w-5 h-5 text-red-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Daftar Pengajuan Ditolak
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
                  Tanggal Ditolak
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Alasan Penolakan
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
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                      >
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Ditolak
                      </span>
                    </div>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">Kode: {{ pengajuan.kode_pengajuan }}</div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col space-y-1">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800"
                    >
                      {{ getStatusText(pengajuan.status) }}
                    </span>
                    <div class="text-xs text-gray-500">
                      {{ getDaysRejected(pengajuan.updatedAt) }} hari lalu
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="flex flex-col">
                    <span class="font-medium">{{ formatDate(pengajuan.updatedAt) }}</span>
                    <span class="text-xs">{{ formatTime(pengajuan.updatedAt) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 max-w-xs">
                    <p class="line-clamp-2">
                      {{ pengajuan.rejection_reason || 'Dokumen tidak memenuhi persyaratan' }}
                    </p>
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
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty state when no rejected applications -->
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
          <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak Ada Pengajuan Ditolak</h3>
          <p class="text-gray-500 mb-6">
            Saat ini tidak ada pengajuan yang ditolak. Semua pengajuan Anda dalam status baik.
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
                  Jika pengajuan ditolak, Anda dapat melihat alasan penolakan dan mengajukan ulang
                  dengan perbaikan.
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
                class="w-6 h-6 text-red-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Detail Pengajuan Ditolak
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
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <svg
                    class="w-8 h-8 text-red-500 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div>
                    <h4 class="text-lg font-semibold text-red-900">Pengajuan Ditolak</h4>
                    <p class="text-sm text-red-700">
                      Ditolak pada {{ formatDate(selectedPengajuan.updatedAt) }}
                    </p>
                  </div>
                </div>
                <span
                  class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800"
                >
                  {{ getStatusText(selectedPengajuan.status) }}
                </span>
              </div>
            </div>

            <!-- Rejection Reason -->
            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 class="text-lg font-medium text-orange-900 mb-2 flex items-center">
                <svg
                  class="w-5 h-5 text-orange-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
                Alasan Penolakan
              </h4>
              <p class="text-orange-800">
                {{
                  selectedPengajuan.rejection_reason ||
                  'Dokumen tidak memenuhi persyaratan yang ditetapkan. Silakan periksa kembali kelengkapan dan kualitas dokumen yang diupload.'
                }}
              </p>
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
                  <label class="block text-sm font-medium text-gray-700">Tanggal Ditolak</label>
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
                    <label class="block text-sm font-medium text-gray-700">Jenis Bangunan</label>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import UserHeader from '../UserHeader.vue'

const pengajuanData = ref([])
const filteredPengajuanData = ref([])
const loading = ref(true)
const error = ref(null)
const showModal = ref(false)
const selectedPengajuan = ref(null)
const token = localStorage.getItem('token')

const API_BASE = 'http://localhost:3000/api'

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
      filteredPengajuanData.value = response.data[0].pengajuan.filter(
        (p) => p.status === 'rejected',
      )
    } else {
      pengajuanData.value = []
      filteredPengajuanData.value = []
    }

    Swal.fire({
      icon: 'info',
      title: 'Data Dimuat',
      text: `Ditemukan ${filteredPengajuanData.value.length} pengajuan ditolak`,
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

const resubmitApplication = async (pengajuan) => {
  try {
    const result = await Swal.fire({
      title: 'Ajukan Ulang Pengajuan',
      html: `
        <p class="mb-4">Anda akan mengajukan ulang pengajuan "<strong>${pengajuan.JenisPengajuan.name}</strong>"</p>
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <p class="text-sm text-yellow-800">
            <strong>Perhatian:</strong> Pastikan untuk memperbaiki dokumen sesuai dengan alasan penolakan sebelum mengajukan ulang.
          </p>
        </div>
        <p class="text-sm text-gray-600">Alasan penolakan sebelumnya:</p>
        <p class="text-sm text-red-600 font-medium">"${pengajuan.rejection_reason || 'Dokumen tidak memenuhi persyaratan'}"</p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Ajukan Ulang',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#6b7280',
    })

    if (result.isConfirmed) {
      // Show loading
      Swal.fire({
        title: 'Memproses...',
        text: 'Sedang membuat pengajuan baru, mohon tunggu...',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      // Simulate resubmission process
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Pengajuan Berhasil Dibuat Ulang',
          html: `
            <p>Pengajuan ulang untuk "<strong>${pengajuan.JenisPengajuan.name}</strong>" telah berhasil dibuat.</p>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <p class="text-sm text-blue-800">
                Anda akan diarahkan ke halaman upload dokumen untuk melengkapi pengajuan ulang.
              </p>
            </div>
          `,
          showConfirmButton: true,
          confirmButtonText: 'Mengerti',
        }).then(() => {
          // In a real application, you would redirect to the document upload page
          // window.location.href = '/upload-dokumen/' + newApplicationId
          console.log('Redirect to document upload page')

          // Refresh the data to show updated status
          fetchPengajuan()
        })
      }, 2000)
    }
  } catch (err) {
    console.error('Error resubmitting application:', err)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Gagal mengajukan ulang pengajuan. Silakan coba lagi.',
    })
  }
}

const getDaysRejected = (dateString) => {
  const rejectedDate = new Date(dateString)
  const currentDate = new Date()
  const diffTime = Math.abs(currentDate - rejectedDate)
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

const getStatusText = (status) => {
  const texts = {
    rejected: 'Ditolak',
    completed: 'Selesai',
    approved: 'Disetujui',
    menunggu_perbaikan: 'Menunggu Perbaikan',
    pending: 'Pending',
    in_review: 'Dalam Review',
  }
  return texts[status] || status
}

const getDocumentStatusClass = (status) => {
  const classes = {
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    in_review: 'bg-blue-100 text-blue-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getDocumentStatusText = (status) => {
  const texts = {
    approved: 'Disetujui',
    rejected: 'Ditolak',
    pending: 'Menunggu',
    in_review: 'Dalam Review',
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

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Hover effect for table rows */
tbody tr:hover {
  background-color: rgba(239, 68, 68, 0.05);
}

/* Animation for status badges */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Modal animation */
.fixed.inset-0 {
  backdrop-filter: blur(4px);
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Gradient background animation */
.bg-gradient-to-br {
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Card shadow on hover */
.bg-white.rounded-xl:hover {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.3s ease;
}

/* Status badge pulse animation for rejected items */
.bg-red-100.text-red-800 {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Table header styling */
.bg-gray-50 th {
  background: linear-gradient(to right, #f9fafb, #f3f4f6);
}

/* Enhanced focus states */
button:focus {
  outline: 2px solid #f59e0b;
  outline-offset: 2px;
}

/* Smooth transitions for modal */
.fixed.inset-0 > div {
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { Trash2, Edit3, Plus, Search, X, Save, Eye } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import UserHeader from './UserHeader.vue'

const kelengkapanData = ref([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')
const showModal = ref(false)
const showViewModal = ref(false)
const modalMode = ref('create')
const selectedIds = ref([])
const selectAll = ref(false)
const currentItem = ref(null)
const id = localStorage.getItem('id')

const authStore = useAuthStore()

const formData = reactive({
  id: null,
  user_id: id,
  rt: '',
  rw: '',
  no_surat_pengantar: '',
  tanggal_surat_pengantar: '',
  nama_lengkap: '',
  luas_lahan: '',
  alamat_lahan: '',
})

const resetForm = () => {
  formData.id = null
  formData.user_id = id
  formData.rt = ''
  formData.rw = ''
  formData.no_surat_pengantar = ''
  formData.tanggal_surat_pengantar = ''
  formData.nama_lengkap = ''
  formData.luas_lahan = ''
  formData.alamat_lahan = ''
}

const API_BASE_URL = 'https://bitwize.cloud/api'

const fetchKelengkapanData = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch(`${API_BASE_URL}/kelengkapan/user/${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errData = await response.json()
      throw new Error(
        `HTTP error! status: ${response.status} - ${errData.message || 'Unknown error'}`,
      )
    }

    const result = await response.json()
    kelengkapanData.value = result.data || []
  } catch (err) {
    console.error('Error fetching kelengkapan data:', err)
    error.value = 'Gagal mengambil data: ' + err.message
    kelengkapanData.value = []
  } finally {
    loading.value = false
  }
}

const createKelengkapanData = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch(`${API_BASE_URL}/kelengkapan`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: id,
        rt: formData.rt,
        rw: formData.rw,
        no_surat_pengantar: formData.no_surat_pengantar,
        tanggal_surat_pengantar: formData.tanggal_surat_pengantar,
        nama_lengkap: formData.nama_lengkap,
        luas_lahan: parseFloat(formData.luas_lahan),
        alamat_lahan: formData.alamat_lahan,
      }),
    })

    if (!response.ok) {
      const errData = await response.json()
      throw new Error(
        `HTTP error! status: ${response.status} - ${errData.message || 'Unknown error'}`,
      )
    }
    await fetchKelengkapanData()
    showModal.value = false
    resetForm()
  } catch (err) {
    console.error('Error creating kelengkapan data:', err)
    error.value = 'Gagal membuat data: ' + err.message
  } finally {
    loading.value = false
  }
}

const updateKelengkapanData = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch(`${API_BASE_URL}/kelengkapan/user/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: parseInt(formData.user_id), // user_id can be updated by admin
        rt: formData.rt,
        rw: formData.rw,
        no_surat_pengantar: formData.no_surat_pengantar,
        tanggal_surat_pengantar: formData.tanggal_surat_pengantar,
        nama_lengkap: formData.nama_lengkap,
        luas_lahan: parseFloat(formData.luas_lahan),
        alamat_lahan: formData.alamat_lahan,
      }),
    })

    if (!response.ok) {
      const errData = await response.json()
      throw new Error(
        `HTTP error! status: ${response.status} - ${errData.message || 'Unknown error'}`,
      )
    }
    await fetchKelengkapanData()
    showModal.value = false
    resetForm()
  } catch (err) {
    console.error('Error updating kelengkapan data:', err)
    error.value = 'Gagal mengupdate data: ' + err.message
  } finally {
    loading.value = false
  }
}

const deleteKelengkapanData = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return

  loading.value = true
  error.value = ''
  try {
    const response = await fetch(`${API_BASE_URL}/kelengkapan/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authStore.token}`, // Use token from authStore
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errData = await response.json()
      throw new Error(
        `HTTP error! status: ${response.status} - ${errData.message || 'Unknown error'}`,
      )
    }
    await fetchKelengkapanData()
    selectedIds.value = selectedIds.value.filter((selectedId) => selectedId !== id)
  } catch (err) {
    console.error('Error deleting kelengkapan data:', err)
    error.value = 'Gagal menghapus data: ' + err.message
  } finally {
    loading.value = false
  }
}

const handleSubmit = () => {
  if (modalMode.value === 'create') {
    createKelengkapanData()
  } else {
    updateKelengkapanData()
  }
}

const openCreateModal = () => {
  modalMode.value = 'create'
  resetForm()
  showModal.value = true
}

const openEditModal = (item) => {
  modalMode.value = 'edit'
  formData.id = item.id
  formData.user_id = item.user_id
  formData.rt = item.rt
  formData.rw = item.rw
  formData.no_surat_pengantar = item.no_surat_pengantar
  formData.tanggal_surat_pengantar = item.tanggal_surat_pengantar
    ? new Date(item.tanggal_surat_pengantar).toISOString().split('T')[0]
    : ''
  formData.nama_lengkap = item.nama_lengkap
  formData.luas_lahan = item.luas_lahan
  formData.alamat_lahan = item.alamat_lahan
  showModal.value = true
}

const openViewModal = (item) => {
  currentItem.value = item
  showViewModal.value = true
}

const closeModal = () => {
  showModal.value = false
  showViewModal.value = false
  resetForm()
  currentItem.value = null
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedIds.value = filteredData.value.map((item) => item.id)
  } else {
    selectedIds.value = []
  }
}

const toggleSelect = (id) => {
  const index = selectedIds.value.indexOf(id)
  if (index > -1) {
    selectedIds.value.splice(index, 1)
  } else {
    selectedIds.value.push(id) // Add if not selected
  }
  selectAll.value =
    selectedIds.value.length === filteredData.value.length && filteredData.value.length > 0
}

const filteredData = computed(() => {
  if (!searchQuery.value.trim()) {
    return kelengkapanData.value
  } else {
    const query = searchQuery.value.toLowerCase()
    return kelengkapanData.value.filter(
      (item) =>
        item.nama_lengkap?.toLowerCase().includes(query) ||
        item.no_surat_pengantar?.toLowerCase().includes(query) ||
        item.username?.toLowerCase().includes(query) || // Assuming 'username' might be available if joined with users table
        item.alamat_lahan?.toLowerCase().includes(query) ||
        item.rt?.toLowerCase().includes(query) ||
        item.rw?.toLowerCase().includes(query),
    )
  }
})

const formatDate = (dateString) => {
  if (!dateString) return '-'
  try {
    return new Date(dateString).toLocaleDateString('id-ID')
  } catch (e) {
    console.error('Error formatting date:', e)
    return '-'
  }
}

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) return '-'
  return new Intl.NumberFormat('id-ID').format(amount)
}

watch(
  filteredData,
  () => {
    selectAll.value =
      filteredData.value.length > 0 && selectedIds.value.length === filteredData.value.length
  },
  { deep: true },
)

onMounted(() => {
  fetchKelengkapanData()
})
</script>

<template>
  <UserHeader />
  <div class="min-h-screen bg-gray-50 p-6 font-inter">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200 rounded-t-lg">
          <div class="flex justify-between items-center">
            <h1 class="text-xl text-gray-900">Data Kelengkapan Dari RT</h1>
          </div>
          <button
            @click="openCreateModal"
            class="inline-flex mt-3 items-center px-2 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-md"
          >
            <Plus class="w-4 h-4 mr-2" />
            Tambah Data
          </button>
        </div>

        <!-- Search and Actions -->
        <div class="px-6 py-4 bg-gray-50">
          <div
            class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <div class="flex-1 w-full sm:max-w-md">
              <div class="relative">
                <Search
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari nama, no surat, username..."
                  class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div class="flex space-x-2">
              <button
                v-if="selectedIds.length > 0"
                @click="bulkDeleteKelengkapanData"
                class="inline-flex items-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors shadow-md disabled:opacity-50"
                :disabled="loading"
              >
                <Trash2 class="w-4 h-4 mr-2" />
                Hapus ({{ selectedIds.length }})
              </button>

              <button
                @click="fetchKelengkapanData"
                :disabled="loading"
                class="inline-flex items-center px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors shadow-md disabled:opacity-50"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div
          v-if="error"
          class="px-6 py-3 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-b-lg"
        >
          <div class="flex items-center">
            <svg class="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-12a1 1 0 112 0v4a1 1 0 11-2 0V6zm0 8a1 1 0 102 0 1 1 0 00-2 0z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-sm font-medium">{{ error }}</p>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else-if="loading" class="px-6 py-8 text-center">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
          ></div>
          <p class="mt-3 text-sm text-gray-600">Memuat data...</p>
        </div>

        <!-- Data Table -->
        <div v-else-if="filteredData.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left">
                  <input
                    v-model="selectAll"
                    @change="toggleSelectAll"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Username
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama Lengkap
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No Surat
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  RT/RW
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Luas Lahan
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
                v-for="item in filteredData"
                :key="item.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    :checked="selectedIds.includes(item.id)"
                    @change="toggleSelect(item.id)"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ item.username || '-' }}</div>
                  <div class="text-sm text-gray-500">{{ item.email || '-' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ item.nama_lengkap || '-' }}
                  </div>
                  <div class="text-sm text-gray-500">{{ item.user_nama_lengkap || '-' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.no_surat_pengantar || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.rt }}/{{ item.rw }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(item.luas_lahan) }} m²
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(item.tanggal_surat_pengantar) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex space-x-2 justify-end">
                    <button
                      @click="openViewModal(item)"
                      class="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                      title="Lihat Detail"
                    >
                      <Eye class="w-4 h-4" />
                    </button>
                    <button
                      @click="openEditModal(item)"
                      class="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                      title="Edit"
                    >
                      <Edit3 class="w-4 h-4" />
                    </button>
                    <button
                      @click="deleteKelengkapanData(item.id)"
                      class="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                      title="Hapus"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-else class="px-6 py-8 text-center rounded-b-lg">
          <div class="text-gray-400 text-lg mb-2">Tidak ada data</div>
          <p class="text-gray-600 text-sm">Belum ada data kelengkapan yang tersedia.</p>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="relative bg-white rounded-xl shadow-2xl transform transition-all sm:max-w-2xl sm:w-full w-full"
      >
        <form @submit.prevent="handleSubmit">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-t-xl">
            <div class="w-full">
              <div class="flex justify-between items-center mb-4 border-b pb-3">
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ modalMode === 'create' ? 'Tambah Data Kelengkapan' : 'Edit Data Kelengkapan' }}
                </h3>
                <button
                  type="button"
                  @click="closeModal"
                  class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X class="w-6 h-6" />
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="hidden">
                  <label for="user_id" class="block text-sm font-medium text-gray-700 mb-1"
                    >User ID</label
                  >
                  <input
                    id="user_id"
                    v-model="formData.user_id"
                    type="number"
                    required
                    readonly
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label for="nama_lengkap" class="block text-sm font-medium text-gray-700 mb-1"
                    >Nama Lengkap</label
                  >
                  <input
                    id="nama_lengkap"
                    v-model="formData.nama_lengkap"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label for="rt" class="block text-sm font-medium text-gray-700 mb-1">RT</label>
                  <input
                    id="rt"
                    v-model="formData.rt"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label for="rw" class="block text-sm font-medium text-gray-700 mb-1">RW</label>
                  <input
                    id="rw"
                    v-model="formData.rw"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div class="md:col-span-2">
                  <label
                    for="no_surat_pengantar"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >No Surat Pengantar</label
                  >
                  <input
                    id="no_surat_pengantar"
                    v-model="formData.no_surat_pengantar"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    for="tanggal_surat_pengantar"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Tanggal Surat Pengantar</label
                  >
                  <input
                    id="tanggal_surat_pengantar"
                    v-model="formData.tanggal_surat_pengantar"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label for="luas_lahan" class="block text-sm font-medium text-gray-700 mb-1"
                    >Luas Lahan (m²)</label
                  >
                  <input
                    id="luas_lahan"
                    v-model="formData.luas_lahan"
                    type="number"
                    step="0.01"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div class="md:col-span-2">
                  <label for="alamat_lahan" class="block text-sm font-medium text-gray-700 mb-1"
                    >Alamat Lahan</label
                  >
                  <textarea
                    id="alamat_lahan"
                    v-model="formData.alamat_lahan"
                    rows="3"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse rounded-b-xl">
            <button
              type="submit"
              :disabled="loading"
              class="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 transition-colors"
            >
              <Save class="w-4 h-4 mr-2" />
              {{ modalMode === 'create' ? 'Simpan' : 'Update' }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Detail Modal -->
    <div
      v-if="showViewModal && currentItem"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="relative bg-white rounded-xl shadow-2xl transform transition-all sm:max-w-2xl sm:w-full w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-t-xl">
          <div class="flex justify-between items-center mb-4 border-b pb-3">
            <h3 class="text-xl font-semibold text-gray-900">Detail Data Kelengkapan</h3>
            <button
              type="button"
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X class="w-6 h-6" />
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div>
                <dt class="text-sm font-medium text-gray-500">ID</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ currentItem.id }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Username</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ currentItem.username || '-' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Email</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ currentItem.email || '-' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Nama Lengkap (User)</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ currentItem.user_nama_lengkap || '-' }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Nama Lengkap</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ currentItem.nama_lengkap || '-' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">RT/RW</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ currentItem.rt }}/{{ currentItem.rw }}
                </dd>
              </div>
            </div>

            <div class="space-y-3">
              <div>
                <dt class="text-sm font-medium text-gray-500">No Surat Pengantar</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ currentItem.no_surat_pengantar || '-' }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Tanggal Surat Pengantar</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ formatDate(currentItem.tanggal_surat_pengantar) }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Luas Lahan</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ formatCurrency(currentItem.luas_lahan) }} m²
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Dibuat</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(currentItem.created_at) }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Diupdate</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(currentItem.updated_at) }}</dd>
              </div>
            </div>
          </div>

          <div class="mt-4 border-t pt-4">
            <dt class="text-sm font-medium text-gray-500">Alamat Lahan</dt>
            <dd class="mt-1 text-sm text-gray-900 break-words">
              {{ currentItem.alamat_lahan || '-' }}
            </dd>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col sm:flex-row-reverse rounded-b-xl">
          <button
            type="button"
            @click="closeModal"
            class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>

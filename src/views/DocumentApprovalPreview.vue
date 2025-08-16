<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <div class="flex">
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error</h3>
            <div class="mt-2 text-sm text-red-700">{{ error }}</div>
          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Pending</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ totalPending }}</dd>
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

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Perlu Tindakan</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ urgentPending }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loading && !error" class="bg-white shadow overflow-hidden sm:rounded-md">
        <div v-if="filteredPengajuan.length > 0">
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
                  v-for="pengajuan in filteredPengajuan"
                  :key="pengajuan.kode_pengajuan"
                  class="hover:bg-gray-50"
                  :class="{
                    'bg-red-50': isUrgent(pengajuan.createdAt) && pengajuan.status === 'pending',
                    'bg-red-100': pengajuan.status === 'rejected',
                  }"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ pengajuan.kode_pengajuan }}
                    <span
                      v-if="isUrgent(pengajuan.createdAt) && pengajuan.status === 'pending'"
                      class="ml-1 text-red-500"
                      title="Menunggu lebih dari 7 hari"
                    >
                      ⚠️
                    </span>
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
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-yellow-100 text-yellow-800': pengajuan.status === 'pending',
                        'bg-red-100 text-red-800': pengajuan.status === 'rejected',
                        'bg-blue-100 text-blue-800': pengajuan.status === 'menunggu_perbaikan',
                      }"
                    >
                      <svg class="w-2 h-2 mr-1 fill-current" viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      {{
                        pengajuan.status === 'pending'
                          ? 'Pending'
                          : pengajuan.status === 'rejected'
                            ? 'Ditolak'
                            : 'Menunggu Perbaikan'
                      }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDateShort(pengajuan.createdAt) }}
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex space-x-2">
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
                      <button
                        @click="openActionModal(pengajuan)"
                        class="text-green-600 hover:text-green-900 transition-colors duration-200"
                        title="Review Dokumen"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            Tidak ada pengajuan yang perlu ditinjau
          </h3>
          <p class="mt-1 text-sm text-gray-500">Semua pengajuan telah diproses atau disetujui.</p>
        </div>
      </div>

      <PengajuanDetailModal
        v-if="showDetailModal"
        :pengajuan="selectedPengajuan"
        :isPending="true"
        @close="closeDetailModal"
      />

      <PengajuanActionModal
        v-if="showActionModal"
        :pengajuan="selectedPengajuan"
        @close="closeActionModal"
        @documentUpdated="handleDocumentUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import PengajuanDetailModal from './Admin/PengajuanDetailModal.vue'
import PengajuanActionModal from './Admin/PengajuanActionModal.vue'
import axios from 'axios'

// Reactive data
const loading = ref(true)
const error = ref(null)
const data = ref([])
const showDetailModal = ref(false)
const showActionModal = ref(false)
const selectedPengajuan = ref(null)
const token = localStorage.getItem('token')

// Debug functions - Add these to check if modal is being triggered
const openActionModal = (pengajuan) => {
  console.log('Opening action modal for:', pengajuan.kode_pengajuan) // Debug log
  selectedPengajuan.value = pengajuan
  showActionModal.value = true
  console.log('showActionModal value:', showActionModal.value) // Debug log
}

const closeActionModal = () => {
  console.log('Closing action modal') // Debug log
  showActionModal.value = false
  selectedPengajuan.value = null
}

// Computed properties
const filteredPengajuan = computed(() => {
  const allPengajuan = []

  data.value.forEach((user) => {
    if (user.pengajuan && Array.isArray(user.pengajuan)) {
      const userPengajuan = user.pengajuan.filter(
        (p) =>
          p.status === 'pending' || p.status === 'rejected' || p.status === 'menunggu_perbaikan',
      )
      allPengajuan.push(...userPengajuan)
    }
  })

  return allPengajuan.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
})

const totalPending = computed(() => {
  return filteredPengajuan.value.filter((p) => p.status === 'pending').length
})

const uniqueUsers = computed(() => {
  const userIds = new Set(filteredPengajuan.value.map((p) => p.user_id))
  return userIds.size
})

const totalDocuments = computed(() => {
  return filteredPengajuan.value.reduce((total, pengajuan) => {
    return total + (pengajuan.Documents ? pengajuan.Documents.length : 0)
  }, 0)
})

const urgentPending = computed(() => {
  return filteredPengajuan.value.filter((p) => p.status === 'pending' && isUrgent(p.createdAt))
    .length
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

const getPendingDuration = (createdAt) => {
  const now = new Date()
  const created = new Date(createdAt)
  const diffTime = Math.abs(now - created)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return '1 hari'
  if (diffDays < 7) return `${diffDays} hari`

  const weeks = Math.floor(diffDays / 7)
  const remainingDays = diffDays % 7

  if (weeks === 1 && remainingDays === 0) return '1 minggu'
  if (weeks === 1) return `1 minggu ${remainingDays} hari`
  if (remainingDays === 0) return `${weeks} minggu`

  return `${weeks} minggu ${remainingDays} hari`
}

const isUrgent = (createdAt) => {
  const now = new Date()
  const created = new Date(createdAt)
  const diffTime = Math.abs(now - created)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 7
}

const getDurationClass = (createdAt) => {
  if (isUrgent(createdAt)) {
    return 'text-red-600 font-medium'
  }
  return 'text-gray-900'
}

const openDetailModal = (pengajuan) => {
  selectedPengajuan.value = pengajuan
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedPengajuan.value = null
}

const handleDocumentUpdate = () => {
  // Refresh data after document update
  fetchData()
}

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

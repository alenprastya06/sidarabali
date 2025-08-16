<script setup>
import { ref, onMounted, computed } from 'vue'
import UserHeader from './UserHeader.vue'

const submissions = ref([])
const loading = ref(true)
const error = ref(null)

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Filters
const statusFilter = ref('pending')
const searchQuery = ref('')
const sortBy = ref('newest') // newest, oldest, name

// View mode
const viewMode = ref('table') // card, table, compact

const fetchSubmissions = async () => {
  const token = localStorage.getItem('token')

  if (!token) {
    error.value = 'Authentication token not found. Please log in again.'
    loading.value = false
    return
  }

  try {
    const response = await fetch('http://localhost:3001/api/documents/me/overview', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid or expired token. Please log in again.')
      }
      throw new Error(`Network response was not ok. Status: ${response.status}`)
    }
    const data = await response.json()
    submissions.value = data
  } catch (err) {
    error.value = err.message || 'Failed to fetch data. Please try again later.'
    console.error('Error fetching data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchSubmissions)

// Computed properties for filtering and sorting
const filteredSubmissions = computed(() => {
  let filtered = submissions.value

  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter((submission) => submission.overall_status === statusFilter.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter((submission) =>
      submission.nama_pengajuan.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'newest':
        return new Date(b.created_at || 0) - new Date(a.created_at || 0)
      case 'oldest':
        return new Date(a.created_at || 0) - new Date(b.created_at || 0)
      case 'name':
        return a.nama_pengajuan.localeCompare(b.nama_pengajuan)
      default:
        return 0
    }
  })

  return filtered
})

// Computed properties for pagination
const totalPages = computed(() => Math.ceil(filteredSubmissions.value.length / itemsPerPage.value))

const paginatedSubmissions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredSubmissions.value.slice(start, end)
})

const getStatusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-green-500'
    case 'pending':
      return 'bg-yellow-500'
    case 'rejected':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

// Summary statistics
const summaryStats = computed(() => {
  const total = submissions.value.length
  const approved = submissions.value.filter((s) => s.overall_status === 'approved').length
  const pending = submissions.value.filter((s) => s.overall_status === 'pending').length
  const rejected = submissions.value.filter((s) => s.overall_status === 'rejected').length

  return { total, approved, pending, rejected }
})

const changePage = (page) => {
  currentPage.value = page
}

const resetFilters = () => {
  statusFilter.value = 'all'
  searchQuery.value = ''
  sortBy.value = 'newest'
  currentPage.value = 1
}
</script>

<template>
  <UserHeader />
  <div class="container mx-auto max-w-7xl p-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Pengajuan Saya</h1>

      <!-- Summary Stats -->
      <div class="flex gap-4 text-sm">
        <div class="bg-blue-50 px-3 py-1 rounded-full">
          <span class="font-medium text-blue-800">Total: {{ summaryStats.total }}</span>
        </div>
        <div class="bg-green-50 px-3 py-1 rounded-full">
          <span class="font-medium text-green-800">Approved: {{ summaryStats.approved }}</span>
        </div>
        <div class="bg-yellow-50 px-3 py-1 rounded-full">
          <span class="font-medium text-yellow-800">Pending: {{ summaryStats.pending }}</span>
        </div>
        <div class="bg-red-50 px-3 py-1 rounded-full">
          <span class="font-medium text-red-800">Rejected: {{ summaryStats.rejected }}</span>
        </div>
      </div>
    </div>

    <!-- Filters and Controls -->
    <div class="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div class="flex flex-col lg:flex-row gap-4 items-center">
        <!-- Search -->
        <div class="flex-1 min-w-0">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search submissions..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Status Filter -->
        <select
          v-model="statusFilter"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>

        <!-- Sort -->
        <select
          v-model="sortBy"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name A-Z</option>
        </select>

        <!-- View Mode -->
        <div class="flex border border-gray-300 rounded-lg overflow-hidden">
          <button
            @click="viewMode = 'card'"
            :class="[
              'px-3 py-2 text-sm',
              viewMode === 'card'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50',
            ]"
          >
            Card
          </button>
          <button
            @click="viewMode = 'compact'"
            :class="[
              'px-3 py-2 text-sm border-l border-gray-300',
              viewMode === 'compact'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50',
            ]"
          >
            Compact
          </button>
          <button
            @click="viewMode = 'table'"
            :class="[
              'px-3 py-2 text-sm border-l border-gray-300',
              viewMode === 'table'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50',
            ]"
          >
            Table
          </button>
        </div>

        <!-- Items per page -->
        <select
          v-model="itemsPerPage"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>

        <!-- Reset Filters -->
        <button
          @click="resetFilters"
          class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>

      <!-- Active Filters Display -->
      <div
        v-if="statusFilter !== 'all' || searchQuery"
        class="flex flex-wrap gap-2 mt-3 pt-3 border-t"
      >
        <div
          v-if="statusFilter !== 'all'"
          class="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
        >
          Status: {{ statusFilter }}
          <button @click="statusFilter = 'all'" class="ml-1 hover:text-blue-900">×</button>
        </div>
        <div
          v-if="searchQuery"
          class="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
        >
          Search: "{{ searchQuery }}"
          <button @click="searchQuery = ''" class="ml-1 hover:text-blue-900">×</button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"
      ></div>
    </div>

    <div
      v-if="error"
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
      role="alert"
    >
      <p class="font-bold">Error</p>
      <p>{{ error }}</p>
    </div>

    <div
      v-if="filteredSubmissions.length === 0 && !loading && !error"
      class="text-center text-gray-500 py-10"
    >
      <p class="text-xl">No submissions found matching your criteria.</p>
      <button @click="resetFilters" class="mt-2 text-blue-600 hover:underline">
        Clear all filters
      </button>
    </div>

    <!-- Results Info -->
    <div
      v-if="filteredSubmissions.length > 0"
      class="flex justify-between items-center mb-4 text-sm text-gray-600"
    >
      <span>
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} -
        {{ Math.min(currentPage * itemsPerPage, filteredSubmissions.length) }} of
        {{ filteredSubmissions.length }} submissions
      </span>
    </div>

    <!-- Card View -->
    <div v-if="viewMode === 'card' && paginatedSubmissions.length" class="space-y-6">
      <div
        v-for="submission in paginatedSubmissions"
        :key="submission.id_pengajuan"
        class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 overflow-hidden"
      >
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-semibold text-gray-900 truncate pr-4">
              {{ submission.nama_pengajuan }}
            </h3>
            <span
              :class="[
                'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex-shrink-0',
                getStatusColor(submission.overall_status),
              ]"
            >
              {{ submission.overall_status }}
            </span>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
            <div>
              <p class="text-gray-500">Status</p>
              <p class="font-medium">{{ submission.status_pengajuan }}</p>
            </div>
            <div>
              <p class="text-gray-500">Progress</p>
              <p class="font-medium text-green-600">
                {{ submission.approved_required_count }}/{{ submission.required_total }}
              </p>
            </div>
            <div>
              <p class="text-gray-500">Missing</p>
              <p class="font-medium text-red-600">{{ submission.missing_required_count }}</p>
            </div>
            <div>
              <p class="text-gray-500">Documents</p>
              <p class="font-medium">{{ submission.documents?.length || 0 }}</p>
            </div>
          </div>

          <div
            v-if="submission.has_rejected"
            class="flex items-center text-red-500 text-xs bg-red-50 p-2 rounded"
          >
            <span class="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Action required: Some documents rejected
          </div>
        </div>
      </div>
    </div>

    <!-- Compact View -->
    <div
      v-if="viewMode === 'compact' && paginatedSubmissions.length"
      class="bg-white rounded-lg shadow-sm border overflow-hidden"
    >
      <div
        v-for="submission in paginatedSubmissions"
        :key="submission.id_pengajuan"
        class="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50"
      >
        <div class="flex items-center space-x-4 flex-1 min-w-0">
          <span
            :class="[
              'w-3 h-3 rounded-full flex-shrink-0',
              getStatusBadgeColor(submission.overall_status),
            ]"
          ></span>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 truncate">{{ submission.nama_pengajuan }}</p>
            <p class="text-sm text-gray-500">
              {{ submission.approved_required_count }}/{{ submission.required_total }} approved
              <span v-if="submission.missing_required_count > 0" class="text-red-600">
                • {{ submission.missing_required_count }} missing
              </span>
            </p>
          </div>
        </div>
        <span
          :class="[
            'px-2 py-1 rounded text-xs font-medium flex-shrink-0',
            getStatusColor(submission.overall_status),
          ]"
        >
          {{ submission.overall_status }}
        </span>
      </div>
    </div>

    <!-- Table View -->
    <div
      v-if="viewMode === 'table' && paginatedSubmissions.length"
      class="bg-white rounded-lg shadow-sm border overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Progress
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Missing
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Issues
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="submission in paginatedSubmissions"
              :key="submission.id_pengajuan"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">{{ submission.nama_pengajuan }}</div>
                <div class="text-sm text-gray-500">{{ submission.status_pengajuan }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    getStatusColor(submission.overall_status),
                  ]"
                >
                  {{ submission.overall_status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                {{ submission.approved_required_count }}/{{ submission.required_total }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                {{ submission.missing_required_count }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  v-if="submission.has_rejected"
                  class="inline-flex items-center text-red-500 text-xs"
                >
                  <span class="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                  Rejected docs
                </span>
                <span v-else class="text-gray-400 text-xs">-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-between items-center mt-6">
      <div class="text-sm text-gray-700">Page {{ currentPage }} of {{ totalPages }}</div>
      <div class="flex space-x-2">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          :class="[
            'px-3 py-2 text-sm rounded-lg border transition-colors',
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300',
          ]"
        >
          Previous
        </button>

        <div class="flex space-x-1">
          <template v-for="page in Math.min(totalPages, 7)" :key="page">
            <button
              v-if="
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              "
              @click="changePage(page)"
              :class="[
                'px-3 py-2 text-sm rounded-lg transition-colors',
                page === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300',
              ]"
            >
              {{ page }}
            </button>
            <span
              v-else-if="page === currentPage - 2 || page === currentPage + 2"
              class="px-2 py-2 text-gray-500"
            >
              ...
            </span>
          </template>
        </div>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          :class="[
            'px-3 py-2 text-sm rounded-lg border transition-colors',
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300',
          ]"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

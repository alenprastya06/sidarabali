<template>
  <div class="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
    <h1 class="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>

    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-blue-700 mb-5 pb-3 border-b-2 border-gray-200">
        Overview
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div class="bg-gray-50 border border-gray-200 rounded-md p-4 text-center shadow-sm">
          <h3 class="text-lg text-gray-700 font-medium">Total Users</h3>
          <p class="text-3xl font-bold text-blue-600 mt-1">{{ stats.totalUsers }}</p>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-md p-4 text-center shadow-sm">
          <h3>Total Documents</h3>
          <p class="text-3xl font-bold text-blue-600 mt-1">{{ stats.totalDocuments }}</p>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-md p-4 text-center shadow-sm">
          <h3>Pending Documents</h3>
          <p class="text-3xl font-bold text-yellow-500 mt-1">{{ stats.pendingDocuments }}</p>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-md p-4 text-center shadow-sm">
          <h3>Approved Documents</h3>
          <p class="text-3xl font-bold text-green-600 mt-1">{{ stats.approvedDocuments }}</p>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-md p-4 text-center shadow-sm">
          <h3>Rejected Documents</h3>
          <p class="text-3xl font-bold text-red-600 mt-1">{{ stats.rejectedDocuments }}</p>
        </div>
      </div>
    </section>

    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-blue-700 mb-5 pb-3 border-b-2 border-gray-200">
        Pengajuan Management
      </h2>
      <div v-if="pengajuanLoading" class="text-center text-gray-600 py-5">
        Loading pengajuan data...
      </div>
      <div v-else-if="pengajuanError" class="text-center text-red-600 py-5">
        {{ pengajuanError }}
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                ID
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Nama Pengajuan
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Description
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Status
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Created At
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Doc Count
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Approved
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Pending
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Rejected
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in pengajuanList" :key="p.id_pengajuan" class="hover:bg-gray-50">
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ p.id_pengajuan }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ p.nama_pengajuan }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ p.description }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ p.status }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ formatDate(p.created_at) }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ p.document_count }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ p.approved_count }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ p.pending_count }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ p.rejected_count }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm">
                <button
                  @click="viewPengajuanDocuments(p.id_pengajuan)"
                  class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                >
                  View Docs
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-blue-700 mb-5 pb-3 border-b-2 border-gray-200">
        All Documents
      </h2>
      <div v-if="allDocumentsLoading" class="text-center text-gray-600 py-5">
        Loading all documents...
      </div>
      <div v-else-if="allDocumentsError" class="text-center text-red-600 py-5">
        {{ allDocumentsError }}
      </div>
      <div v-else>
        <div
          v-for="userDoc in allDocumentsGrouped"
          :key="userDoc.user_id"
          class="mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50"
        >
          <h3 class="text-xl font-semibold text-gray-800 mb-4">
            {{ userDoc.username }} ({{ userDoc.email }})
          </h3>
          <div class="flex items-center space-x-4 mb-4">
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                @change="toggleSelectAllUserDocuments(userDoc.user_id, $event.target.checked)"
                class="form-checkbox text-blue-600 h-4 w-4"
              />
              <span class="ml-2 text-gray-700">Select All for this user</span>
            </label>
            <button
              @click="bulkDeleteDocuments"
              :disabled="selectedDocuments.length === 0 || !isAdmin"
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Bulk Delete Selected
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th
                    class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
                  >
                    Select
                  </th>
                  <th
                    class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
                  >
                    Doc ID
                  </th>
                  <th
                    class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
                  >
                    Type
                  </th>
                  <th
                    class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
                  >
                    Original Name
                  </th>
                  <th
                    class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
                  >
                    Pengajuan
                  </th>
                  <th
                    class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
                  >
                    Status
                  </th>
                  <th
                    class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
                  >
                    Uploaded At
                  </th>
                  <th
                    class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="doc in userDoc.documents" :key="doc.id" class="hover:bg-gray-50">
                  <td class="py-3 px-4 border-b border-gray-200 text-sm">
                    <input
                      type="checkbox"
                      :value="doc.id"
                      v-model="selectedDocuments"
                      class="form-checkbox text-blue-600 h-4 w-4"
                    />
                  </td>
                  <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {{ doc.id }}
                  </td>
                  <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {{ doc.document_type }}
                  </td>
                  <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {{ doc.original_name }}
                  </td>
                  <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {{ doc.nama_pengajuan || 'N/A' }}
                  </td>
                  <td class="py-3 px-4 border-b border-gray-200 text-sm">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-semibold uppercase',
                        getStatusBadgeClass(doc.status),
                      ]"
                      >{{ doc.status }}</span
                    >
                  </td>
                  <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {{ formatDate(doc.uploaded_at) }}
                  </td>
                  <td class="py-3 px-4 border-b border-gray-200 text-sm flex flex-wrap gap-1">
                    <button
                      @click="viewDocument(doc.id)"
                      class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                    >
                      View
                    </button>
                    <button
                      @click="updateDocumentStatus(doc.id, 'approved')"
                      :disabled="doc.status === 'approved' || !isAdmin"
                      class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                    >
                      Approve
                    </button>
                    <button
                      @click="updateDocumentStatus(doc.id, 'rejected')"
                      :disabled="doc.status === 'rejected' || !isAdmin"
                      class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                    >
                      Reject
                    </button>
                    <button
                      @click="deleteDocument(doc.id)"
                      :disabled="!isAdmin"
                      class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-semibold text-blue-700 mb-5 pb-3 border-b-2 border-gray-200">
        Generated Surat Pengantar
      </h2>
      <div v-if="suratListLoading" class="text-center text-gray-600 py-5">
        Loading generated surat...
      </div>
      <div v-else-if="suratListError" class="text-center text-red-600 py-5">
        {{ suratListError }}
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                ID
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                User
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Pengajuan
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Letter Number
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Status
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Generated At
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Download Count
              </th>
              <th
                class="py-3 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="surat in suratList" :key="surat.id" class="hover:bg-gray-50">
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ surat.id }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ surat.user_username }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ surat.nama_pengajuan }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ surat.letter_number }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold uppercase',
                    getStatusBadgeClass(surat.status),
                  ]"
                  >{{ surat.status }}</span
                >
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ formatDate(surat.created_at) }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                {{ surat.download_count || 0 }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 text-sm flex flex-wrap gap-1">
                <button
                  @click="downloadSurat(surat.id)"
                  class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                >
                  Download
                </button>
                <button
                  @click="deleteSurat(surat.id)"
                  class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import axios from 'axios'

// Reactive Data
const stats = reactive({
  totalUsers: 0,
  totalDocuments: 0,
  pendingDocuments: 0,
  approvedDocuments: 0,
  rejectedDocuments: 0,
})

const pengajuanList = ref([])
const pengajuanLoading = ref(true)
const pengajuanError = ref(null)

const allDocumentsGrouped = ref([])
const allDocumentsLoading = ref(true)
const allDocumentsError = ref(null)
const selectedDocuments = ref([])

const suratList = ref([])
const suratListLoading = ref(true)
const suratListError = ref(null)

const isAdmin = ref(false)

const userRole = computed(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user ? user.role : 'user'
})

// Watcher
watch(
  userRole,
  (newRole) => {
    isAdmin.value = newRole === 'admin'
  },
  { immediate: true },
)

// Methods
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

// Helper function for status badge classes
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-200 text-yellow-800'
    case 'approved':
      return 'bg-green-200 text-green-800'
    case 'rejected':
      return 'bg-red-200 text-red-800'
    case 'generated':
      return 'bg-gray-200 text-gray-800'
    case 'downloaded':
      return 'bg-blue-200 text-blue-800'
    case 'expired':
      return 'bg-purple-200 text-purple-800'
    default:
      return 'bg-gray-200 text-gray-800'
  }
}

const fetchDashboardStats = async () => {
  try {
    // const response = await axios.get('/api/admin/dashboard-stats');
    // stats.totalUsers = response.data.totalUsers;
    // stats.totalDocuments = response.data.totalDocuments;
    // stats.pendingDocuments = response.data.pendingDocuments;
    // stats.approvedDocuments = response.data.approvedDocuments;
    // stats.rejectedDocuments = response.data.rejectedDocuments;
    // Mock data for now
    stats.totalUsers = 15
    stats.totalDocuments = 120
    stats.pendingDocuments = 30
    stats.approvedDocuments = 80
    stats.rejectedDocuments = 10
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
  }
}

const fetchPengajuanList = async () => {
  pengajuanLoading.value = true
  pengajuanError.value = null
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/documents/pengajuan/all`,
    )
    pengajuanList.value = response.data
  } catch (error) {
    console.error('Error fetching pengajuan list:', error)
    pengajuanError.value = 'Failed to load pengajuan data.'
  } finally {
    pengajuanLoading.value = false
  }
}

const fetchAllDocuments = async () => {
  allDocumentsLoading.value = true
  allDocumentsError.value = null
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/documents/all`)
    allDocumentsGrouped.value = response.data
  } catch (error) {
    console.error('Error fetching all documents:', error)
    allDocumentsError.value = 'Failed to load all documents.'
  } finally {
    allDocumentsLoading.value = false
  }
}

const fetchAllSurat = async () => {
  suratListLoading.value = true
  suratListError.value = null
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/surat/all`)
    suratList.value = response.data
  } catch (error) {
    console.error('Error fetching all surat:', error)
    suratListError.value = 'Failed to load generated surat.'
  } finally {
    suratListLoading.value = false
  }
}

const viewDocument = async (docId) => {
  try {
    const response = await axios.get(`/api/documents/${docId}`)
    // **MODIFICATION**: Changed to alert for document details
    alert('Document Details:\n' + JSON.stringify(response.data, null, 2))
    // showDocumentModal.value = true; // Removed
  } catch (error) {
    console.error('Error fetching document details:', error)
    alert('Failed to fetch document details.')
  }
}

const updateDocumentStatus = async (docId, status) => {
  if (!isAdmin.value) {
    alert("You don't have permission to perform this action.")
    return
  }
  // **MODIFICATION**: Replaced ConfirmModal with window.confirm()
  if (window.confirm(`Are you sure you want to change document ${docId} status to '${status}'?`)) {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/documents/${docId}/status`, {
        // Use docId directly
        status: status, // Use status directly
        admin_notes: `Status updated by admin to ${status}`,
        is_complete: status === 'approved',
      })
      alert('Document status updated successfully!')
      fetchAllDocuments()
    } catch (error) {
      console.error('Error updating document status:', error)
      alert('Failed to update document status.')
    }
  }
}

const deleteDocument = async (docId) => {
  if (!isAdmin.value) {
    alert("You don't have permission to perform this action.")
    return
  }
  // **MODIFICATION**: Replaced ConfirmModal with window.confirm()
  if (
    window.confirm(
      `Are you sure you want to delete document ${docId}? This action cannot be undone.`,
    )
  ) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/documents/${docId}`) // Use docId directly
      alert('Document deleted successfully!')
      fetchAllDocuments()
    } catch (error) {
      console.error('Error deleting document:', error)
      alert('Failed to delete document.')
    }
  }
}

const bulkDeleteDocuments = async () => {
  if (!isAdmin.value) {
    alert("You don't have permission to perform this action.")
    return
  }
  if (selectedDocuments.value.length === 0) {
    alert('Please select documents to delete.')
    return
  }
  // **MODIFICATION**: Replaced ConfirmModal with window.confirm()
  if (
    window.confirm(
      `Are you sure you want to delete ${selectedDocuments.value.length} selected documents? This action cannot be undone.`,
    )
  ) {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/documents/bulk-delete`, {
        documentIds: selectedDocuments.value,
      })
      alert('Selected documents deleted successfully!')
      selectedDocuments.value = []
      fetchAllDocuments()
    } catch (error) {
      console.error('Error performing bulk delete:', error)
      alert('Failed to bulk delete documents.')
    }
  }
}

const toggleSelectAllUserDocuments = (userId, checked) => {
  const userDocs = allDocumentsGrouped.value.find((u) => u.user_id === userId)
  if (userDocs) {
    userDocs.documents.forEach((doc) => {
      if (checked) {
        if (!selectedDocuments.value.includes(doc.id)) {
          selectedDocuments.value.push(doc.id)
        }
      } else {
        selectedDocuments.value = selectedDocuments.value.filter((id) => id !== doc.id)
      }
    })
  }
}

const viewPengajuanDocuments = (pengajuanId) => {
  alert(`Viewing documents for Pengajuan ID: ${pengajuanId}. (Implement navigation/filter here)`)
}

const downloadSurat = (suratId) => {
  if (!isAdmin.value) {
    alert("You don't have permission to perform this action.")
    return
  }
  const downloadUrl = `${import.meta.env.VITE_API_BASE_URL}/api/surat/${suratId}/download`
  window.open(downloadUrl, '_blank')
  setTimeout(() => {
    fetchAllSurat()
  }, 1000)
}

const deleteSurat = async (suratId) => {
  if (!isAdmin.value) {
    alert("You don't have permission to perform this action.")
    return
  }
  // **MODIFICATION**: Replaced ConfirmModal with window.confirm()
  if (
    window.confirm(
      `Are you sure you want to delete Surat Pengantar ID ${suratId}? This action cannot be undone.`,
    )
  ) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/surat/${suratId}`) // Use suratId directly
      alert('Surat Pengantar deleted successfully!')
      fetchAllSurat()
    } catch (error) {
      console.error('Error deleting surat pengantar:', error)
      alert('Failed to delete Surat Pengantar.')
    }
  }
}

// Lifecycle Hook
onMounted(() => {
  fetchDashboardStats()
  fetchPengajuanList()
  fetchAllDocuments()
  fetchAllSurat()
})
</script>

<template>
  <div class="bg-gray-50 w-full">
    <main>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          class="bg-gradient-to-r from-purple-400 to-blue-500 p-6 rounded-lg text-white relative overflow-hidden"
        >
          <div class="absolute top-0 right-0 w-32 h-32 opacity-20">
            <img src="@/assets/paternss.png" alt="" />
            <div class="absolute top-4 right-4 w-16 h-16 bg-white rounded-full opacity-50"></div>
            <div class="absolute top-8 right-8 w-8 h-8 bg-white rounded-full opacity-30"></div>
          </div>
          <div class="relative z-10">
            <div class="flex items-center space-x-2 mb-2">
              <div
                class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 class="text-sm font-medium">Total Semua Pengajuan</h3>
            </div>
            <p class="text-2xl font-bold">
              17.328.401.755 <span class="text-sm font-normal opacity-80">Pengajuan</span>
            </p>
          </div>
        </div>

        <!-- Total Uang Pertanggungan -->
        <div
          class="bg-gradient-to-r from-pink-400 to-red-500 p-6 rounded-lg text-white relative overflow-hidden"
        >
          <div class="absolute top-0 right-0 w-32 h-32 opacity-20">
            <img src="@/assets/paternss.png" alt="" />
            <div class="absolute top-4 right-4 w-16 h-16 bg-white rounded-full opacity-50"></div>
            <div class="absolute top-8 right-8 w-8 h-8 bg-white rounded-full opacity-30"></div>
          </div>
          <div class="relative z-10">
            <div class="flex items-center space-x-2 mb-2">
              <div
                class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 class="text-sm font-medium">Total Uang Pertanggungan</h3>
            </div>
            <p class="text-2xl font-bold">
              395.909.200.586 <span class="text-sm font-normal opacity-80">IDR</span>
            </p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <h3 class="text-sm font-medium text-gray-600 mb-2">Total Pengajuan disetujui</h3>
          <p class="text-3xl font-bold text-gray-900">
            580 <span class="text-sm font-normal text-gray-500">Pengajuan</span>
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <h3 class="text-sm font-medium text-gray-600 mb-2">Total Pengajuan Pending</h3>
          <p class="text-3xl font-bold text-gray-900">
            104 <span class="text-sm font-normal text-gray-500">Pengajuan</span>
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <h3 class="text-sm font-medium text-gray-600 mb-2">Total Pengajuan Ditolak</h3>
          <p class="text-3xl font-bold text-gray-900">
            98 <span class="text-sm font-normal text-gray-500">Pengajuan</span>
          </p>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="mb-6">
        <div class="relative max-w-md">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              class="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search..."
            v-model="searchQuery"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <!-- Data Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <!-- Debitur Diakseptasi Table -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="bg-teal-500 text-white px-6 py-4">
            <h3 class="font-semibold">Pengajuan Diterima</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama Cabang
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(item, index) in debiturDiakseptasiData"
                  :key="index"
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.namaCabang }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.jumlah }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      @click="viewDetails('diterima', item)"
                      class="text-teal-600 hover:text-teal-900 p-1 rounded-full hover:bg-teal-50 transition-colors"
                      title="Lihat Detail"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Debitur Diakseptasi Standard Table -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="bg-blue-600 text-white px-6 py-4">
            <h3 class="font-semibold">Pengajuan Pending</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama Cabang
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(item, index) in debiturStandardData"
                  :key="index"
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.namaCabang }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.jumlah }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      @click="viewDetails('pending', item)"
                      class="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors"
                      title="Lihat Detail"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between mt-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Page <span class="font-medium">1</span> of <span class="font-medium">8</span>
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <button
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('diakseptasi')
const searchQuery = ref('')
const tabs = [
  { key: 'diakseptasi', label: 'Top 10 Debitur Diakseptasi' },
  { key: 'klaim', label: 'Top 10 Debitur Klaim' },
  { key: 'lapses', label: 'Top 10 Debitur Lapses' },
  { key: 'nilai-klaim', label: 'Top 10 Nilai Klaim' },
  { key: 'nilai-premi', label: 'Top 10 Nilai Premi' },
]
const debiturDiakseptasiData = [
  { namaCabang: 'KCP TANJUNG ANOM', jumlah: 'Alen' },
  { namaCabang: 'KC PEKANBARU', jumlah: 'Ajun' },
  { namaCabang: 'KC BATAM', jumlah: 'Rindah' },
]

const debiturStandardData = [
  { namaCabang: 'KCP TANJUNG ANOM', jumlah: 'Neyla' },
  { namaCabang: 'KC PEKANBARU', jumlah: 'Budi' },
  { namaCabang: 'KC MEDAN', jumlah: 'Darto' },
]

// Function to handle view details action
const viewDetails = (type, item) => {
  console.log(`Viewing details for ${type}:`, item)
  // Add your logic here for viewing details
  alert(`Melihat detail ${type} untuk ${item.namaCabang} dengan ${item.jumlah} pengajuan`)
}
</script>

<style scoped>
.flag-icon {
  font-style: normal;
}
</style>

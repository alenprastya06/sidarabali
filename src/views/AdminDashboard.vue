<template>
  <div class="bg-gray-50 w-full">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
    </div>

    <main v-else>
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          class="p-6 rounded-lg text-white relative overflow-hidden"
          style="background-color: rgb(35, 116, 171)"
        >
          <div class="absolute top-0 right-0 w-32 h-32 opacity-20">
            <img src="@/assets/paternss.png" alt="" />
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
              {{ formatNumber(statistics.total_pengajuan) }}
              <span class="text-sm font-normal opacity-80">Pengajuan</span>
            </p>
          </div>
        </div>

        <div
          class="p-6 rounded-lg text-white relative overflow-hidden"
          style="background-color: rgb(123, 145, 252)"
        >
          <div class="absolute top-0 right-0 w-32 h-32 opacity-20">
            <img src="@/assets/paternss.png" alt="" />
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
              <h3 class="text-sm font-medium">Total Semua Dokumen</h3>
            </div>
            <p class="text-2xl font-bold">
              {{ formatNumber(statistics.total_dokumen) }}
              <span class="text-sm font-normal opacity-80">Dokumen</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Status Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <h3 class="text-sm font-medium text-gray-600 mb-2">Total Pengajuan Disetujui</h3>
          <p class="text-3xl font-bold text-gray-900">
            {{ formatNumber(statistics.total_disetujui) }}
            <span class="text-sm font-normal text-gray-500">Pengajuan</span>
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <h3 class="text-sm font-medium text-gray-600 mb-2">Total Pengajuan Pending</h3>
          <p class="text-3xl font-bold text-gray-900">
            {{ formatNumber(statistics.total_pending) }}
            <span class="text-sm font-normal text-gray-500">Pengajuan</span>
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
          <h3 class="text-sm font-medium text-gray-600 mb-2">Total Pengajuan Ditolak</h3>
          <p class="text-3xl font-bold text-gray-900">
            {{ formatNumber(statistics.total_ditolak) }}
            <span class="text-sm font-normal text-gray-500">Pengajuan</span>
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
            placeholder="Cari berdasarkan nama atau kode pengajuan..."
            v-model="searchQuery"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <!-- Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <!-- Pengajuan Diterima -->
        <div
          class="bg-white rounded-lg shadow-sm overflow-hidden"
          v-if="filteredDiterima.length > 0"
        >
          <div class="bg-green-600 text-white px-6 py-4">
            <h3 class="font-semibold flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Pengajuan Diterima ({{ filteredDiterima.length }})
            </h3>
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
                    Nama
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kode Pengajuan
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
                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(item, index) in filteredDiterima"
                  :key="item.id"
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.User.username }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.kode_pengajuan }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    >
                      Disetujui
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatDate(item.updatedAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      @click="viewDetails(item.id)"
                      class="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50 transition-colors"
                      title="Lihat Detail"
                      :disabled="loadingDetail === item.id"
                    >
                      <svg
                        v-if="loadingDetail === item.id"
                        class="w-5 h-5 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        ></path>
                      </svg>
                      <svg
                        v-else
                        class="w-5 h-5"
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
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pengajuan Pending -->
        <div
          class="bg-white rounded-lg shadow-sm overflow-hidden"
          v-if="filteredPending.length > 0"
        >
          <div class="bg-yellow-500 text-white px-6 py-4">
            <h3 class="font-semibold flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Pengajuan Pending ({{ filteredPending.length }})
            </h3>
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
                    Nama
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kode Pengajuan
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
                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(item, index) in filteredPending"
                  :key="item.id"
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.User.username }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.kode_pengajuan }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                    >
                      Pending
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatDate(item.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      @click="viewDetails(item.id)"
                      class="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-50 transition-colors"
                      title="Lihat Detail"
                      :disabled="loadingDetail === item.id"
                    >
                      <svg
                        v-if="loadingDetail === item.id"
                        class="w-5 h-5 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        ></path>
                      </svg>
                      <svg
                        v-else
                        class="w-5 h-5"
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
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pengajuan Ditolak -->
        <div
          class="bg-white rounded-lg shadow-sm overflow-hidden"
          v-if="filteredDitolak.length > 0"
        >
          <div class="bg-red-600 text-white px-6 py-4">
            <h3 class="font-semibold flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Pengajuan Ditolak ({{ filteredDitolak.length }})
            </h3>
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
                    Nama
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Kode Pengajuan
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
                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(item, index) in filteredDitolak"
                  :key="item.id"
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.User.username }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.kode_pengajuan }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                    >
                      Ditolak
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatDate(item.updatedAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      @click="viewDetails(item.id)"
                      class="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                      title="Lihat Detail"
                      :disabled="loadingDetail === item.id"
                    >
                      <svg
                        v-if="loadingDetail === item.id"
                        class="w-5 h-5 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        ></path>
                      </svg>
                      <svg
                        v-else
                        class="w-5 h-5"
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
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="!filteredDiterima.length && !filteredPending.length && !filteredDitolak.length"
          class="bg-white rounded-lg shadow-sm p-8 text-center"
        >
          <svg
            class="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak ada pengajuan ditemukan</h3>
          <p class="text-gray-500">
            {{
              searchQuery
                ? 'Coba ubah kata kunci pencarian Anda.'
                : 'Belum ada pengajuan yang masuk.'
            }}
          </p>
        </div>
      </div>
    </main>

    <!-- Detail Modal -->
    <div
      v-if="showDetailModal && selectedDetail"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeDetailModal"
        ></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6"
        >
          <div class="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              class="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none"
              @click="closeDetailModal"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div class="sm:flex sm:items-start">
            <div class="w-full">
              <div class="flex items-center mb-6">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Detail Pengajuan: {{ selectedDetail.kode_pengajuan }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ selectedDetail.JenisPengajuan?.name || 'N/A' }}
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Informasi Pemilik -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="text-md font-semibold text-gray-900 mb-3 flex items-center">
                    <svg
                      class="w-5 h-5 mr-2 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                    Informasi Pemilik
                  </h4>
                  <div v-if="selectedDetail.Owner" class="space-y-2 text-sm">
                    <div><strong>Nama:</strong> {{ selectedDetail.Owner.nama }}</div>
                    <div><strong>NIK:</strong> {{ selectedDetail.Owner.nik }}</div>
                    <div><strong>Email:</strong> {{ selectedDetail.Owner.email }}</div>
                    <div><strong>Telepon:</strong> {{ selectedDetail.Owner.phone }}</div>
                    <div><strong>NPWP:</strong> {{ selectedDetail.Owner.npwp }}</div>
                    <div><strong>Alamat:</strong> {{ selectedDetail.Owner.alamat }}</div>
                    <div><strong>Pekerjaan:</strong> {{ selectedDetail.Owner.pekerjaan }}</div>
                  </div>
                  <div v-else class="text-sm text-gray-500 italic">Data pemilik tidak tersedia</div>
                </div>

                <!-- Informasi Lahan -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h4 class="text-md font-semibold text-gray-900 mb-3 flex items-center">
                    <svg
                      class="w-5 h-5 mr-2 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    Informasi Lahan
                  </h4>
                  <div v-if="selectedDetail.Lahan" class="space-y-2 text-sm">
                    <div><strong>No Surat RT:</strong> {{ selectedDetail.Lahan.no_surat_rt }}</div>
                    <div>
                      <strong>Jenis Bangunan:</strong> {{ selectedDetail.Lahan.jenis_bangunan }}
                    </div>
                    <div><strong>Luas Lahan:</strong> {{ selectedDetail.Lahan.luas_lahan }} m²</div>
                    <div>
                      <strong>RT/RW:</strong> {{ selectedDetail.Lahan.alamat_rt }}/{{
                        selectedDetail.Lahan.alamat_rw
                      }}
                    </div>
                    <div>
                      <strong>Kelurahan:</strong> {{ selectedDetail.Lahan.wilayah_kelurahan }}
                    </div>
                    <div>
                      <strong>Kecamatan:</strong> {{ selectedDetail.Lahan.wilayah_kecamatan }}
                    </div>
                    <div><strong>Kota:</strong> {{ selectedDetail.Lahan.wilayah_kota }}</div>
                    <div><strong>Kode Pos:</strong> {{ selectedDetail.Lahan.kode_pos }}</div>
                  </div>
                  <div v-else class="text-sm text-gray-500 italic">Data lahan tidak tersedia</div>
                </div>
              </div>

              <!-- Status Pengajuan -->
              <div class="mt-6 bg-white border rounded-lg p-4">
                <h4 class="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <svg
                    class="w-5 h-5 mr-2 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    ></path>
                  </svg>
                  Status Pengajuan
                </h4>
                <div class="flex items-center space-x-4">
                  <span
                    class="px-3 py-1 rounded-full text-sm font-medium"
                    :class="{
                      'bg-green-100 text-green-800': selectedDetail.status === 'approved',
                      'bg-yellow-100 text-yellow-800':
                        selectedDetail.status === 'pending' ||
                        selectedDetail.status === 'menunggu_perbaikan',
                      'bg-red-100 text-red-800': selectedDetail.status === 'rejected',
                    }"
                  >
                    {{ getStatusText(selectedDetail.status) }} -
                    {{ getStatusText(selectedDetail.admin_note) }}
                  </span>
                  <br />

                  <div class="text-sm text-gray-500">
                    <strong>Dibuat:</strong> {{ formatDate(selectedDetail.createdAt) }} |
                    <strong>Diperbarui:</strong> {{ formatDate(selectedDetail.updatedAt) }}
                  </div>
                </div>
              </div>

              <!-- Dokumen -->
              <div class="mt-6 bg-white border rounded-lg p-4">
                <h4 class="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <svg
                    class="w-5 h-5 mr-2 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  Dokumen Persyaratan ({{ selectedDetail.Documents?.length || 0 }})
                </h4>
                <div
                  v-if="selectedDetail.Documents && selectedDetail.Documents.length > 0"
                  class="space-y-3 max-h-64 overflow-y-auto"
                >
                  <div
                    v-for="doc in selectedDetail.Documents"
                    :key="doc.id"
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div class="flex-1">
                      <div class="flex items-center space-x-2">
                        <span class="text-sm font-medium text-gray-900 capitalize">{{
                          doc.document_type.replace(/_/g, ' ')
                        }}</span>
                        <span
                          class="px-2 py-1 text-xs rounded-full"
                          :class="{
                            'bg-green-100 text-green-800': doc.status === 'approved',
                            'bg-yellow-100 text-yellow-800': doc.status === 'pending',
                            'bg-red-100 text-red-800': doc.status === 'rejected',
                          }"
                        >
                          {{ getStatusText(doc.status) }}
                        </span>
                      </div>
                      <div class="text-xs text-gray-500 mt-1">{{ doc.original_name }}</div>
                      <div v-if="doc.admin_note" class="text-xs text-red-600 mt-1">
                        <strong>Catatan:</strong> {{ doc.admin_note }}
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <button
                        v-if="doc.file_url"
                        @click="viewDocument(doc.file_url)"
                        class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                        title="Lihat Dokumen"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <div
                        class="w-3 h-3 rounded-full"
                        :class="{
                          'bg-green-500': doc.status === 'approved',
                          'bg-yellow-500': doc.status === 'pending',
                          'bg-red-500': doc.status === 'rejected',
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-sm text-gray-500 italic text-center py-4">
                  Tidak ada dokumen yang diunggah
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                  @click="closeDetailModal"
                >
                  Tutup
                </button>
                <button
                  v-if="selectedDetail.draft_document_url"
                  @click="viewDocument(selectedDetail.draft_document_url)"
                  class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Lihat Draft
                </button>
                <button
                  v-if="selectedDetail.final_document_url"
                  @click="viewDocument(selectedDetail.final_document_url)"
                  class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Lihat Dokumen Final
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'

const searchQuery = ref('')
const loading = ref(true)
const loadingDetail = ref(null)
const showDetailModal = ref(false)
const selectedDetail = ref(null)

const statistics = ref({
  total_pengajuan: 0,
  total_dokumen: 0,
  total_disetujui: 0,
  total_pending: 0,
  total_ditolak: 0,
})

const lists = ref({
  diterima: [],
  pending: [],
  ditolak: [],
})

const error = ref(null)

// Computed properties for filtered data
const filteredDiterima = computed(() => {
  if (!lists.value.diterima) return []
  return lists.value.diterima.filter(
    (item) =>
      item.User.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.kode_pengajuan.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const filteredPending = computed(() => {
  if (!lists.value.pending) return []
  return lists.value.pending.filter(
    (item) =>
      item.User.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.kode_pengajuan.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const filteredDitolak = computed(() => {
  if (!lists.value.ditolak) return []
  return lists.value.ditolak.filter(
    (item) =>
      item.User.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.kode_pengajuan.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// Methods
const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getStatusText = (status) => {
  const statusMap = {
    approved: 'Disetujui',
    pending: 'Pending',
    rejected: 'Ditolak',
    menunggu_perbaikan: 'Menunggu Perbaikan',
  }
  return statusMap[status] || status
}

const viewDetails = async (pengajuanId) => {
  try {
    loadingDetail.value = pengajuanId

    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token tidak ditemukan. Silakan login kembali.')
    }

    const response = await fetch(`https://bitwisi.cloud/api/pengajuan/${pengajuanId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Sesi Anda telah berakhir. Silakan login kembali.')
      } else if (response.status === 404) {
        throw new Error('Data pengajuan tidak ditemukan.')
      } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }
    }

    const detailData = await response.json()
    selectedDetail.value = detailData
    showDetailModal.value = true
  } catch (error) {
    console.error('Error fetching detail:', error)
    alert(`Gagal memuat detail pengajuan: ${error.message}`)
  } finally {
    loadingDetail.value = null
  }
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedDetail.value = null
}

const viewDocument = (url) => {
  if (url) {
    window.open(url, '_blank')
  } else {
    alert('URL dokumen tidak tersedia')
  }
}

const fetchData = async () => {
  try {
    loading.value = true
    error.value = null

    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token tidak ditemukan. Silakan login kembali.')
    }

    const response = await fetch('https://bitwisi.cloud/api/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Sesi Anda telah berakhir. Silakan login kembali.')
      } else {
        throw new Error(`API call failed with status: ${response.status}`)
      }
    }

    const data = await response.json()

    // Validate response structure
    if (!data.statistics || !data.lists) {
      throw new Error('Format response API tidak valid')
    }

    statistics.value = data.statistics
    lists.value = {
      diterima: data.lists.diterima || [],
      pending: data.lists.pending || [],
      ditolak: data.lists.ditolak || [],
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    error.value = error.message

    // Show user-friendly error message
    alert(`Gagal memuat data dashboard: ${error.message}`)

    // Optionally redirect to login if token issue
    if (error.message.includes('login')) {
      // Redirect to login page or clear token
      localStorage.removeItem('token')
      // window.location.href = '/login' // uncomment if you have a login route
    }
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchData()

  // Auto refresh every 30 seconds (optional)
  const refreshInterval = setInterval(() => {
    if (!loading.value && !showDetailModal.value) {
      fetchData()
    }
  }, 30000)

  // Cleanup interval on component unmount
  onUnmounted(() => {
    clearInterval(refreshInterval)
  })
})

// Keyboard shortcuts
const handleKeydown = (event) => {
  // ESC key to close modal
  if (event.key === 'Escape' && showDetailModal.value) {
    closeDetailModal()
  }
  // Ctrl+R or F5 to refresh
  if ((event.ctrlKey && event.key === 'r') || event.key === 'F5') {
    event.preventDefault()
    fetchData()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.flag-icon {
  font-style: normal;
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Animation for modal */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-content {
  animation: modalFadeIn 0.2s ease-out;
}

/* Responsive table */
@media (max-width: 768px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
}
</style>

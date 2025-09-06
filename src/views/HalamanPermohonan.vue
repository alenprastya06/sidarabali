<template>
  <UserHeader />
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        @click="goBack"
        class="flex items-center gap-2 py-2 rounded mb-3 sm:mb-5 text-sm sm:text-base"
      >
        <i class="fa-solid fa-arrow-left"></i>
        Kembali
      </button>

      <div class="mb-6 sm:mb-8">
        <h1 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
          Persyaratan Izin
        </h1>
        <p class="text-sm sm:text-base text-gray-600">
          Lengkapi semua langkah berikut untuk mengajukan izin
        </p>
      </div>

      <!-- Progress Steps - Mobile Optimized -->
      <div class="mb-6 sm:mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex items-center"
            :class="{ 'sm:flex-1': index < steps.length - 1 }"
          >
            <div class="flex items-center w-full sm:w-auto">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0"
                :class="getStepClass(index + 1)"
              >
                <svg
                  v-if="isStepCompleted(index + 1)"
                  class="w-3 h-3 sm:w-5 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span v-else class="text-xs sm:text-sm">{{ index + 1 }}</span>
              </div>
              <span
                class="ml-2 text-xs sm:text-sm font-medium"
                :class="{
                  'text-green-600': isStepCompleted(index + 1),
                  'text-blue-600': currentStep === index + 1,
                  'text-gray-500': currentStep < index + 1 && !isStepCompleted(index + 1),
                }"
              >
                {{ step.title }}
              </span>
            </div>
            <div
              v-if="index < steps.length - 1"
              class="hidden sm:flex flex-1 h-px mx-4"
              :class="{
                'bg-green-400': isStepCompleted(index + 1),
                'bg-gray-300': !isStepCompleted(index + 1),
              }"
            ></div>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-8 sm:py-12">
        <div class="inline-flex items-center">
          <div
            class="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-600 mr-3"
          ></div>
          <p class="text-sm sm:text-base text-gray-600">Memuat data pengajuan...</p>
        </div>
      </div>

      <div v-else-if="error" class="text-center py-8 sm:py-12">
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 max-w-md mx-auto">
          <svg
            class="w-8 h-8 sm:w-12 sm:h-12 text-red-400 mx-auto mb-3 sm:mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <p class="text-red-600 font-medium text-sm sm:text-base">Terjadi kesalahan</p>
          <p class="text-red-500 text-xs sm:text-sm mt-1">{{ error }}</p>
          <button
            @click="fetchPengajuan"
            class="mt-3 sm:mt-4 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm rounded-md transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>

      <div v-else class="space-y-4 sm:space-y-6">
        <a
          class="block bg-blue-600 text-white p-3 sm:p-4 rounded-lg text-center text-sm sm:text-base font-medium hover:bg-blue-700 transition-colors"
          href="https://invitations.my.id/uploads/file-1755508254923726040-formatdokumenkelengkapan.docx"
        >
          📄 Download Template Kelengkapan Dokumen
        </a>

        <!-- Step 1: Pilih Jenis Pengajuan -->
        <div v-if="currentStep === 1" class="bg-white rounded-lg shadow-sm border">
          <div class="p-4 sm:p-6 border-b border-gray-100">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-sm font-semibold"
              >
                1
              </div>
              Pilih Jenis Pengajuan
            </h2>
            <p class="text-sm sm:text-base text-gray-600 mt-1 ml-8 sm:ml-11">
              Pilih jenis izin yang ingin Anda ajukan
            </p>
          </div>

          <div class="p-4 sm:p-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Jenis Pengajuan <span class="text-red-500"></span>
            </label>
            <div class="relative">
              <select
                v-model="selectedPengajuanId"
                @change="onPengajuanChange"
                class="w-full bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="">Pilih jenis pengajuan...</option>
                <option
                  v-for="pengajuan in pengajuanList"
                  :key="pengajuan.id"
                  :value="pengajuan.id"
                  :disabled="!!pengajuan.pengajuan_aktif"
                  :class="{
                    'text-gray-400': !!pengajuan.pengajuan_aktif,
                    'text-gray-900': !pengajuan.pengajuan_aktif,
                  }"
                >
                  {{ pengajuan.name }}
                  {{
                    pengajuan.pengajuan_aktif
                      ? ` (${getStatusMessage(pengajuan.pengajuan_aktif.status)})`
                      : ''
                  }}
                </option>
              </select>
            </div>

            <div
              v-if="selectedPengajuan"
              class="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <h4 class="text-sm font-medium text-blue-800 mb-2">Informasi Pengajuan</h4>
              <p class="text-sm text-blue-700 font-medium">{{ selectedPengajuan.name }}</p>
              <p v-if="selectedPengajuan.description" class="text-xs text-blue-600 mt-1">
                {{ selectedPengajuan.description }}
              </p>

              <!-- Document requirements -->
              <div class="mt-4">
                <p class="text-sm font-medium text-blue-800">Mohon Siapkan Dokumen Pendukung:</p>
                <ul
                  v-if="selectedPengajuan.Persyaratans && selectedPengajuan.Persyaratans.length > 0"
                  class="mt-2 space-y-1"
                >
                  <li
                    v-for="(requirement, index) in selectedPengajuan.Persyaratans"
                    :key="index"
                    class="text-xs sm:text-sm text-blue-700 flex items-start"
                  >
                    <span
                      class="inline-block w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"
                    ></span>
                    <span class="capitalize">{{ requirement }}</span>
                  </li>
                </ul>
                <p v-else class="text-sm text-blue-700 mt-2">
                  Tidak ada dokumen tambahan yang diperlukan untuk pengajuan ini.
                </p>
              </div>
            </div>

            <!-- Warning untuk pengajuan yang tidak bisa dipilih -->
            <div
              v-if="hasActiveSubmissions"
              class="mt-4 sm:mt-6 bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4"
            >
              <div class="flex items-start">
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-medium text-amber-800">
                    Ada Pengajuan yang Sedang Diproses
                  </h3>
                  <p class="text-xs sm:text-sm text-amber-700 mt-1">
                    Beberapa jenis pengajuan tidak dapat dipilih karena Anda memiliki pengajuan
                    aktif yang sedang diproses.
                  </p>

                  <div class="mt-3">
                    <h4 class="text-xs font-medium text-amber-800 mb-2">
                      Pengajuan yang sedang diproses:
                    </h4>
                    <div class="space-y-2">
                      <div
                        v-for="pengajuan in activeSubmissions"
                        :key="pengajuan.id"
                        class="bg-white p-3 rounded-md border border-amber-200"
                      >
                        <div
                          class="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between"
                        >
                          <div class="flex-1 min-w-0">
                            <p class="text-sm text-gray-800 font-medium truncate">
                              {{ pengajuan.name }}
                            </p>
                            <div
                              class="flex flex-col sm:flex-row sm:items-center mt-1 gap-1 sm:gap-2"
                            >
                              <span
                                class="inline-flex px-2 py-1 rounded text-xs font-medium"
                                :class="getStatusBadgeClass(pengajuan.pengajuan_aktif.status)"
                              >
                                {{ getStatusMessage(pengajuan.pengajuan_aktif.status) }}
                              </span>
                              <span class="text-xs text-gray-500">
                                ID: {{ pengajuan.pengajuan_aktif.id_pengajuan }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Data Pemilik & Lahan -->
        <div v-if="currentStep === 2" class="bg-white rounded-lg shadow-sm border">
          <div class="p-4 sm:p-6 border-b border-gray-100">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-sm font-semibold"
              >
                2
              </div>
              Data Pemilik & Lahan
            </h2>
            <p class="text-sm sm:text-base text-gray-600 mt-1 ml-8 sm:ml-11">
              Lengkapi data pemilik dan informasi lahan
            </p>
          </div>
          <div class="p-4 sm:p-6">
            <PemiliDanLahan
              v-if="selectedPengajuanId"
              :idPengajuan="selectedPengajuanId"
              @owner-updated="handleOwnerUpdate"
              @lahan-updated="handleLahanUpdate"
            />
          </div>
        </div>

        <!-- Step 3: Upload Dokumen -->
        <div v-if="currentStep === 3" class="bg-white rounded-lg shadow-sm border">
          <div class="p-4 sm:p-6 border-b border-gray-100">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-sm font-semibold"
              >
                3
              </div>
              Upload Dokumen Persyaratan
            </h2>
            <p class="text-sm sm:text-base text-gray-600 mt-1 ml-8 sm:ml-11">
              {{
                selectedPengajuan &&
                (!selectedPengajuan.Persyaratans || selectedPengajuan.Persyaratans.length === 0)
                  ? 'Tidak ada dokumen tambahan yang diperlukan untuk pengajuan ini'
                  : 'Upload semua dokumen yang diperlukan'
              }}
            </p>
          </div>
          <div class="p-4 sm:p-6">
            <div
              v-if="
                selectedPengajuan &&
                selectedPengajuan.Persyaratans &&
                selectedPengajuan.Persyaratans.length > 0
              "
              class="space-y-4 sm:space-y-6"
            >
              <div
                v-for="(requirement, index) in selectedPengajuan.Persyaratans"
                :key="index"
                class="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-gray-300 transition-colors"
              >
                <div class="space-y-4">
                  <div class="flex items-start">
                    <div
                      class="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold mr-3 sm:mr-4 flex-shrink-0 mt-1"
                    >
                      {{ index + 1 }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="text-sm sm:text-base text-gray-900 font-medium mb-2 capitalize">
                        {{ requirement }}
                      </h3>

                      <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                        <span
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 w-fit"
                        >
                          <span class="w-1 h-1 bg-red-400 rounded-full mr-1"></span>
                        </span>
                        <span class="text-xs text-gray-500">Maks. 10 MB</span>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-4 ml-9 sm:ml-12">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                      <button
                        @click="selectFile(index)"
                        class="inline-flex items-center justify-center px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
                      >
                        <svg
                          class="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        Pilih File
                      </button>

                      <div
                        v-if="selectedFiles[index]"
                        class="flex items-center bg-green-50 border border-green-200 rounded-lg px-3 py-2 w-full sm:w-auto sm:flex-1"
                      >
                        <svg
                          class="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div class="flex-1 min-w-0">
                          <span class="text-sm text-green-700 font-medium block truncate">
                            {{ selectedFiles[index].name }}
                          </span>
                          <span class="text-xs text-green-600">
                            ({{ (selectedFiles[index].size / (1024 * 1024)).toFixed(2) }} MB)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Catatan Tambahan (Opsional)
                      </label>
                      <textarea
                        v-model="userNotes[index]"
                        rows="2"
                        placeholder="Tambahkan catatan untuk dokumen ini jika diperlukan..."
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                      ></textarea>
                    </div>

                    <!-- Uploaded files display -->
                    <div
                      v-if="uploadedFiles[index] && uploadedFiles[index].length > 0"
                      class="space-y-3"
                    >
                      <h4 class="text-sm font-medium text-gray-700">File yang telah diupload:</h4>
                      <div class="space-y-2">
                        <div
                          v-for="file in uploadedFiles[index]"
                          :key="file.id"
                          class="bg-gray-50 border border-gray-200 rounded-lg p-3"
                        >
                          <div class="flex items-center justify-between">
                            <div class="flex items-center flex-1 min-w-0">
                              <svg
                                class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0"
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
                              <div class="flex-1 min-w-0">
                                <span class="text-sm text-gray-700 font-medium block truncate">{{
                                  file.name
                                }}</span>
                                <span class="text-xs text-gray-500">({{ file.size }})</span>
                              </div>
                            </div>
                            <button
                              @click="removeFile(index, file.id)"
                              class="text-red-500 hover:text-red-700 p-1 ml-2 flex-shrink-0"
                              title="Hapus file"
                            >
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                          <div
                            v-if="file.user_note"
                            class="mt-2 text-xs text-gray-600 bg-gray-100 p-2 rounded"
                          >
                            <strong>Catatan:</strong> {{ file.user_note }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else-if="
                selectedPengajuan &&
                (!selectedPengajuan.Persyaratans || selectedPengajuan.Persyaratans.length === 0)
              "
              class="text-center py-8 sm:py-12"
            >
              <div
                class="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 max-w-md mx-auto"
              >
                <svg
                  class="w-8 h-8 sm:w-12 sm:h-12 text-green-400 mx-auto mb-3 sm:mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 class="text-base sm:text-lg font-medium text-green-800 mb-2">
                  Tidak Ada Dokumen Tambahan
                </h3>
                <p class="text-sm text-green-700">
                  Pengajuan "{{ selectedPengajuan.name }}" tidak memerlukan dokumen tambahan. Anda
                  dapat langsung melanjutkan ke langkah berikutnya.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Review & Submit -->
        <div v-if="currentStep === 4" class="bg-white rounded-lg shadow-sm border">
          <div class="p-4 sm:p-6 border-b border-gray-100">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-sm font-semibold"
              >
                4
              </div>
              Review & Submit
            </h2>
            <p class="text-sm sm:text-base text-gray-600 mt-1 ml-8 sm:ml-11">
              Periksa kembali semua data sebelum mengirim pengajuan
            </p>
          </div>
          <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <!-- Review Jenis Pengajuan -->
            <div class="border border-gray-200 rounded-lg p-3 sm:p-4">
              <h3 class="text-sm font-semibold text-gray-700 mb-2">Jenis Pengajuan</h3>
              <p class="text-sm sm:text-base text-gray-900">{{ selectedPengajuan?.name }}</p>
            </div>

            <!-- Review Data Pemilik -->
            <div v-if="hasOwnerData" class="border border-gray-200 rounded-lg p-3 sm:p-4">
              <h3 class="text-sm font-semibold text-gray-700 mb-3">Data Pemilik</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
                <div class="flex flex-col sm:flex-row sm:items-center">
                  <span class="text-gray-600 text-xs sm:text-sm font-medium sm:w-20">Nama:</span>
                  <span class="font-medium text-sm">{{ ownerData.nama }}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center">
                  <span class="text-gray-600 text-xs sm:text-sm font-medium sm:w-20">NIK:</span>
                  <span class="font-medium text-sm">{{ ownerData.nik }}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center">
                  <span class="text-gray-600 text-xs sm:text-sm font-medium sm:w-20">Email:</span>
                  <span class="font-medium text-sm break-all">{{ ownerData.email }}</span>
                </div>
                <div
                  v-if="ownerData.phone || ownerData.no_hp"
                  class="flex flex-col sm:flex-row sm:items-center"
                >
                  <span class="text-gray-600 text-xs sm:text-sm font-medium sm:w-20">Telepon:</span>
                  <span class="font-medium text-sm">{{ ownerData.phone || ownerData.no_hp }}</span>
                </div>
              </div>
            </div>

            <!-- Review Data Lahan -->
            <div v-if="hasLahanData" class="border border-gray-200 rounded-lg p-3 sm:p-4">
              <h3 class="text-sm font-semibold text-gray-700 mb-3">Data Lahan</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
                <div class="flex flex-col sm:flex-row sm:items-center">
                  <span class="text-gray-600 text-xs sm:text-sm font-medium sm:w-24"
                    >Jenis Bangunan:</span
                  >
                  <span class="font-medium text-sm">{{ lahanData.jenis_bangunan }}</span>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center">
                  <span class="text-gray-600 text-xs sm:text-sm font-medium sm:w-24"
                    >Luas Lahan:</span
                  >
                  <span class="font-medium text-sm">{{ lahanData.luas_lahan }} m²</span>
                </div>
                <div
                  v-if="lahanData.kelurahan || lahanData.wilayah_kelurahan"
                  class="flex flex-col sm:flex-row sm:items-center"
                >
                  <span class="text-gray-600 text-xs sm:text-sm font-medium sm:w-24"
                    >Kelurahan:</span
                  >
                  <span class="font-medium text-sm">{{
                    lahanData.kelurahan || lahanData.wilayah_kelurahan
                  }}</span>
                </div>
                <div
                  v-if="lahanData.kecamatan || lahanData.wilayah_kecamatan"
                  class="flex flex-col sm:flex-row sm:items-center"
                >
                  <span class="text-gray-600 text-xs sm:text-sm font-medium sm:w-24"
                    >Kecamatan:</span
                  >
                  <span class="font-medium text-sm">{{
                    lahanData.kecamatan || lahanData.wilayah_kecamatan
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Review Dokumen -->
            <div
              v-if="
                selectedPengajuan &&
                selectedPengajuan.Persyaratans &&
                selectedPengajuan.Persyaratans.length > 0
              "
              class="border border-gray-200 rounded-lg p-3 sm:p-4"
            >
              <h3 class="text-sm font-semibold text-gray-700 mb-3">Dokumen yang Akan Disubmit</h3>
              <div class="space-y-2 sm:space-y-3">
                <div
                  v-for="(requirement, index) in selectedPengajuan.Persyaratans"
                  :key="index"
                  class="flex items-start justify-between p-2 sm:p-3 bg-gray-50 rounded-md"
                >
                  <div class="flex-1 min-w-0 mr-3">
                    <p class="text-sm font-medium text-gray-900 capitalize mb-1">
                      {{ requirement }}
                    </p>
                    <div v-if="selectedFiles[index]" class="text-xs text-gray-600">
                      <span class="font-medium">File:</span>
                      <span class="truncate">{{ selectedFiles[index].name }}</span>
                      <div v-if="userNotes[index]" class="mt-1">
                        <span class="font-medium">Catatan:</span> {{ userNotes[index] }}
                      </div>
                    </div>
                    <div
                      v-else-if="uploadedFiles[index] && uploadedFiles[index].length > 0"
                      class="text-xs text-gray-600"
                    >
                      <span class="font-medium">File:</span>
                      <span class="truncate">{{ uploadedFiles[index][0].name }}</span>
                      <div v-if="uploadedFiles[index][0].user_note" class="mt-1">
                        <span class="font-medium">Catatan:</span>
                        {{ uploadedFiles[index][0].user_note }}
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center ml-2 flex-shrink-0">
                    <svg
                      v-if="
                        selectedFiles[index] ||
                        (uploadedFiles[index] && uploadedFiles[index].length > 0)
                      "
                      class="w-4 h-4 sm:w-5 sm:h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-4 h-4 sm:w-5 sm:h-5 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Validation Messages -->
            <div
              v-if="!canSubmit"
              class="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4"
            >
              <div class="flex items-start">
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-amber-800">Data Belum Lengkap</h3>
                  <div class="text-sm text-amber-700 mt-1 space-y-1">
                    <p v-if="!hasOwnerData">• Data pemilik belum lengkap</p>
                    <p v-if="!hasLahanData">• Data lahan belum lengkap</p>
                    <!-- <p v-if="hasMissingDocuments">• Masih ada dokumen yang belum diupload</p> -->
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="border-t border-gray-100 pt-4 sm:pt-6">
              <button
                @click="submitDocuments"
                :disabled="!canSubmit"
                class="w-full px-4 sm:px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
              >
                <svg
                  v-if="!canSubmit"
                  class="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                {{
                  !selectedPengajuan?.Persyaratans || selectedPengajuan.Persyaratans.length === 0
                    ? 'Kirim Pengajuan'
                    : 'Kirim Pengajuan & Dokumen'
                }}
              </button>

              <p class="text-xs text-gray-500 text-center mt-2 px-2">
                Dengan mengirim pengajuan ini, Anda menyetujui bahwa semua data yang diberikan
                adalah benar dan akurat.
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 sm:pt-6 gap-3 sm:gap-0"
        >
          <button
            v-if="currentStep > 1"
            @click="previousStep"
            class="inline-flex items-center justify-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors text-sm sm:text-base order-2 sm:order-1"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Sebelumnya
          </button>

          <div v-else class="hidden sm:block"></div>

          <button
            v-if="currentStep < maxStep && canGoToNextStep"
            @click="nextStep"
            class="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base order-1 sm:order-2"
          >
            Selanjutnya
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, provide, nextTick } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import UserHeader from './UserHeader.vue'
import PemiliDanLahan from './PemiliDanLahan.vue'

// Existing refs
const pengajuanList = ref([])
const selectedPengajuanId = ref('')
const isLoading = ref(true)
const error = ref(null)
const token = localStorage.getItem('token')
const userId = parseInt(localStorage.getItem('id')) || null

const uploadedFiles = ref({})
const selectedFiles = ref({})
const userNotes = ref({})
const requirementMessages = ref({})
const hasHGB = ref(null) // Track HGB status

// Data dari child component
const ownerData = ref(null)
const lahanData = ref(null)

// Step management
const currentStep = ref(1)
const maxStep = 4
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back() // sama dengan history.back()
}
const steps = [
  { title: 'Pilih Pengajuan', description: 'Pilih jenis izin yang akan diajukan' },
  { title: 'Data Pemilik & Lahan', description: 'Lengkapi informasi pemilik dan lahan' },
  { title: 'Upload Dokumen', description: 'Upload dokumen persyaratan' },
  { title: 'Review & Submit', description: 'Periksa dan kirim pengajuan' },
]

// Provide selectedPengajuanId untuk child components yang menggunakan inject
provide('selectedPengajuanId', selectedPengajuanId)

// Computed properties
const selectedPengajuan = computed(() => {
  const pengajuan = pengajuanList.value.find((p) => p.id === selectedPengajuanId.value)

  if (!pengajuan) return null

  // Pastikan Persyaratans adalah array
  if (pengajuan && !Array.isArray(pengajuan.Persyaratans)) {
    pengajuan.Persyaratans = []
  }

  // Filter out "surat keterangan dari kecamatan" if hasHGB is true
  // Gunakan debounce atau setTimeout untuk menghindari perubahan berulang
  if (
    pengajuan &&
    pengajuan.name.trim().toLowerCase() ===
      'standar pelayanan kelengkapan administrasi permohonan rekomendasi hak atas tanah' &&
    hasHGB.value === true
  ) {
    // Buat salinan array untuk menghindari mutasi langsung
    const filteredRequirements = pengajuan.Persyaratans.filter(
      (req) => req.toLowerCase() !== 'surat keterangan dari kecamatan',
    )

    // Return objek baru untuk menghindari mutasi reaktif
    return {
      ...pengajuan,
      Persyaratans: filteredRequirements,
    }
  }

  return pengajuan
})
// New computed properties for active submissions
const hasActiveSubmissions = computed(() => {
  return pengajuanList.value.some((p) => p.pengajuan_aktif)
})

const activeSubmissions = computed(() => {
  return pengajuanList.value.filter((p) => p.pengajuan_aktif)
})

const hasPendingFiles = computed(() => {
  return false // Removed API dependency
})

const hasOwnerData = computed(() => {
  return ownerData.value && ownerData.value.nama && ownerData.value.nik && ownerData.value.email
})

const hasLahanData = computed(() => {
  return lahanData.value && lahanData.value.jenis_bangunan && lahanData.value.luas_lahan
})

const hasMissingDocuments = computed(() => {
  // if (!selectedPengajuan.value?.Persyaratans || selectedPengajuan.value.Persyaratans.length === 0) {
  //   return false
  // }
  return false
  for (let i = 0; i < selectedPengajuan.value.Persyaratans.length; i++) {
    const hasSelectedFile = selectedFiles.value[i]
    const hasUploadedFile = uploadedFiles.value[i] && uploadedFiles.value[i].length > 0
    if (!hasSelectedFile && !hasUploadedFile) {
      return true
    }
  }
  return false
})

const canSubmit = computed(() => {
  if (!selectedPengajuan.value) return false
  if (!hasOwnerData.value || !hasLahanData.value) return false

  // if (!selectedPengajuan.value.Persyaratans || selectedPengajuan.value.Persyaratans.length === 0)
  return true

  // return !hasMissingDocuments.value
})

const canGoToNextStep = computed(() => {
  switch (currentStep.value) {
    case 1:
      return selectedPengajuanId.value && !selectedPengajuan.value?.pengajuan_aktif
    case 2:
      return hasOwnerData.value && hasLahanData.value
    case 3:
      // return !hasMissingDocuments.value
      return true
    default:
      return true
  }
})

// Helper methods for status messages and styling
const getStatusMessage = (status) => {
  const statusMessages = {
    menunggu_perbaikan: 'Menunggu Perbaikan',
    dalam_proses: 'Dalam Proses',
    menunggu_verifikasi: 'Menunggu Verifikasi',
    pending: 'Pending',
    ditinjau: 'Sedang Ditinjau',
    disetujui: 'Disetujui',
    ditolak: 'Ditolak',
    selesai: 'Selesai',
  }
  return (
    statusMessages[status] || status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ')
  )
}

const getStatusBadgeClass = (status) => {
  const statusClasses = {
    menunggu_perbaikan: 'bg-amber-100 text-amber-800',
    dalam_proses: 'bg-blue-100 text-blue-800',
    menunggu_verifikasi: 'bg-purple-100 text-purple-800',
    pending: 'bg-yellow-100 text-yellow-800',
    ditinjau: 'bg-indigo-100 text-indigo-800',
    disetujui: 'bg-green-100 text-green-800',
    ditolak: 'bg-red-100 text-red-800',
    selesai: 'bg-green-100 text-green-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

// Step management methods
const nextStep = () => {
  if (currentStep.value < maxStep && canGoToNextStep.value) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const isStepCompleted = (step) => {
  // Step hanya bisa completed jika sudah pernah dikunjungi atau sedang aktif
  if (step > currentStep.value) return false

  switch (step) {
    case 1:
      return selectedPengajuanId.value && !selectedPengajuan.value?.pengajuan_aktif
    case 2:
      return hasOwnerData.value && hasLahanData.value
    case 3:
      return true
    // return (
    //   !hasMissingDocuments.value ||
    //   !selectedPengajuan.value?.Persyaratans ||
    //   selectedPengajuan.value.Persyaratans.length === 0
    // )
    case 4:
      return canSubmit.value
    default:
      return false
  }
}

const getStepClass = (step) => {
  if (isStepCompleted(step)) {
    return 'bg-green-500 text-white'
  } else if (currentStep.value === step) {
    return 'bg-blue-500 text-white'
  } else {
    return 'bg-gray-300 text-gray-600'
  }
}

// Event handlers untuk menerima data dari child component
const handleOwnerUpdate = (data) => {
  ownerData.value = data
}

const handleLahanUpdate = (data) => {
  lahanData.value = data
}

// API methods
const fetchPengajuan = async () => {
  try {
    const pengajuanResponse = await axios.get('https://bitwisi.cloud/api/jenis-pengajuan', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    pengajuanList.value = pengajuanResponse.data
  } catch (err) {
    error.value = err.response ? err.response.data.message : err.message
  } finally {
    isLoading.value = false
  }
}

const onPengajuanChange = async () => {
  console.log('onPengajuanChange triggered, selectedPengajuanId:', selectedPengajuanId.value)

  // Jika tidak ada yang dipilih, reset state
  if (!selectedPengajuanId.value) {
    console.log('No pengajuan selected, resetting state')
    hasHGB.value = null
    uploadedFiles.value = {}
    selectedFiles.value = {}
    userNotes.value = {}
    requirementMessages.value = {}
    ownerData.value = null
    lahanData.value = null
    currentStep.value = 1
    return
  }

  const selected = pengajuanList.value.find((p) => p.id === selectedPengajuanId.value)

  if (!selected) {
    console.log('Selected pengajuan not found')
    return
  }

  console.log('Selected pengajuan:', selected.name)

  // Check if selected pengajuan has active submission
  if (selected.pengajuan_aktif) {
    console.log('Active submission found:', selected.pengajuan_aktif)

    // Gunakan nextTick untuk menghindari perubahan reaktif selama render
    await nextTick()

    Swal.fire({
      icon: 'warning',
      title: 'Pengajuan Tidak Dapat Dipilih',
      text: `Anda memiliki pengajuan aktif untuk "${selected.name}" dengan status: ${getStatusMessage(selected.pengajuan_aktif.status)}. Silakan tunggu hingga proses selesai sebelum mengajukan kembali.`,
      confirmButtonColor: '#f59e0b',
    })

    // Reset selection menggunakan nextTick
    await nextTick()
    selectedPengajuanId.value = ''
    hasHGB.value = null
    return
  }

  // Check for the specific pengajuan
  const targetPengajuan =
    'standar pelayanan kelengkapan administrasi permohonan rekomendasi hak atas tanah'

  if (selected.name.trim().toLowerCase() === targetPengajuan) {
    console.log('Target pengajuan matched, showing Swal prompt')

    try {
      // Gunakan setTimeout untuk memastikan dialog muncul setelah render selesai
      setTimeout(async () => {
        const result = await Swal.fire({
          icon: 'question',
          title: 'Konfirmasi Surat Hak Guna Bangunan',
          text: 'Apakah Anda memiliki Surat Hak Guna Bangunan?',
          showCancelButton: true,
          confirmButtonText: 'Ya, saya memiliki HGB',
          cancelButtonText: 'Tidak',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })

        // Setelah dialog selesai, update state
        hasHGB.value = result.isConfirmed
        console.log('HGB status set to:', hasHGB.value)

        // Reset data lainnya
        uploadedFiles.value = {}
        selectedFiles.value = {}
        userNotes.value = {}
        requirementMessages.value = {}
        ownerData.value = null
        lahanData.value = null
        currentStep.value = 1
      }, 100)
    } catch (error) {
      console.error('Swal error:', error)
      Swal.fire({
        icon: 'error',
        title: 'Kesalahan',
        text: 'Gagal menampilkan konfirmasi HGB. Silakan coba lagi.',
        confirmButtonColor: '#ef4444',
      })
      hasHGB.value = null
    }
  } else {
    console.log('Not the target pengajuan, resetting HGB')
    // Gunakan nextTick untuk update state
    await nextTick()
    hasHGB.value = null

    // Reset data lainnya
    uploadedFiles.value = {}
    selectedFiles.value = {}
    userNotes.value = {}
    requirementMessages.value = {}
    ownerData.value = null
    lahanData.value = null
    currentStep.value = 1
  }
}
// File handling methods
const selectFile = (requirementIndex) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = false
  input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png'

  input.onchange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const maxSize = 10 * 1024 * 1024 // 10MB

    if (file.size > maxSize) {
      Swal.fire({
        icon: 'error',
        title: 'Ukuran File Terlalu Besar',
        text: `Ukuran file tidak boleh lebih dari 10 MB`,
        confirmButtonColor: '#3085d6',
      })
      return
    }

    selectedFiles.value[requirementIndex] = file
  }

  input.click()
}

const uploadFile = async (requirementIndex, file, userNote = '') => {
  const formData = new FormData()
  formData.append('file', file)

  console.log(`Starting upload for requirement ${requirementIndex}, file: ${file.name}`)

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000)

    const response = await axios.post('https://invitations.my.id/api/upload-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
      timeout: 60000,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(`Upload progress for ${file.name}: ${percentCompleted}%`)
      },
    })

    clearTimeout(timeoutId)
    console.log(`Upload completed for ${file.name}:`, response.data)

    if (!response.data || !response.data.data || !response.data.data.path) {
      throw new Error('Invalid response structure from upload API')
    }

    const fileUrl = response.data.data.path

    if (!uploadedFiles.value[requirementIndex]) {
      uploadedFiles.value[requirementIndex] = []
    }

    const fileObj = {
      id: Date.now(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      path: fileUrl,
      user_note: userNote,
    }

    uploadedFiles.value[requirementIndex].push(fileObj)

    return {
      url: fileUrl,
      originalName: file.name,
      mimeType: file.type,
      fileSize: file.size,
      userNote: userNote,
    }
  } catch (err) {
    console.error('Upload error details:', {
      error: err,
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    })

    let errorMessage = 'Gagal mengunggah file'

    if (err.name === 'AbortError') {
      errorMessage = 'Upload timeout - file terlalu besar atau koneksi lambat'
    } else if (err.code === 'ECONNABORTED') {
      errorMessage = 'Upload timeout - coba lagi dengan file yang lebih kecil'
    } else if (err.response) {
      errorMessage = err.response.data?.message || `Upload failed: ${err.response.status}`
    } else if (err.request) {
      errorMessage = 'Tidak dapat terhubung ke server upload'
    }

    throw new Error(errorMessage)
  }
}

const removeFile = (requirementIndex, fileId) => {
  if (uploadedFiles.value[requirementIndex]) {
    uploadedFiles.value[requirementIndex] = uploadedFiles.value[requirementIndex].filter(
      (f) => f.id !== fileId,
    )
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('id-ID')
}

const submitDocuments = async () => {
  if (!selectedPengajuan.value) return

  if (!hasOwnerData.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Data Pemilik Belum Lengkap',
      text: 'Harap lengkapi data pemilik terlebih dahulu.',
      confirmButtonColor: '#f59e0b',
    })
    return
  }

  if (!hasLahanData.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Data Lahan Belum Lengkap',
      text: 'Harap lengkapi data lahan terlebih dahulu.',
      confirmButtonColor: '#f59e0b',
    })
    return
  }

  Swal.fire({
    title: 'Mengirim Pengajuan...',
    text: 'Mohon tunggu, pengajuan sedang diproses',
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading()
    },
  })

  try {
    let documents = []

    if (selectedPengajuan.value.Persyaratans && selectedPengajuan.value.Persyaratans.length > 0) {
      // Validate all requirements
      const missingRequirements = []

      for (let i = 0; i < selectedPengajuan.value.Persyaratans.length; i++) {
        const hasSelectedFile = selectedFiles.value[i]
        const hasUploadedFile = uploadedFiles.value[i] && uploadedFiles.value[i].length > 0

        if (!hasSelectedFile && !hasUploadedFile) {
          missingRequirements.push(selectedPengajuan.value.Persyaratans[i])
        }
      }

      // if (missingRequirements.length > 0) {
      //   Swal.fire({
      //     icon: 'warning',
      //     title: 'Dokumen Belum Lengkap',
      //     html: `Dokumen berikut masih diperlukan:<br/><br/><strong>${missingRequirements.map((req) => req.charAt(0).toUpperCase() + req.slice(1)).join('<br/>')}</strong>`,
      //     confirmButtonColor: '#f59e0b',
      //   })
      //   return
      // }

      // Process documents for each requirement
      for (let i = 0; i < selectedPengajuan.value.Persyaratans.length; i++) {
        const requirementName = selectedPengajuan.value.Persyaratans[i]

        // Priority: selectedFiles (new upload) over uploadedFiles (existing)
        if (selectedFiles.value[i]) {
          // Process new file upload
          const file = selectedFiles.value[i]
          const userNote = userNotes.value[i] || ''

          try {
            console.log(`Uploading new file: ${file.name}`)
            const uploadResult = await uploadFile(i, file, userNote)

            documents.push({
              document_type: requirementName,
              file_url: uploadResult.url,
              original_name: uploadResult.originalName,
              mime_type: uploadResult.mimeType,
              file_size: uploadResult.fileSize,
              user_note: uploadResult.userNote,
            })
          } catch (error) {
            console.error(`Upload error for ${file.name}:`, error)
            Swal.fire({
              icon: 'error',
              title: 'Gagal Upload File',
              text: `Gagal mengunggah file ${file.name}: ${error.message}`,
              confirmButtonColor: '#ef4444',
            })
            return
          }
        } else if (uploadedFiles.value[i] && uploadedFiles.value[i].length > 0) {
          // Process existing uploaded files (only if no new file selected)
          for (const fileObj of uploadedFiles.value[i]) {
            documents.push({
              document_type: requirementName,
              file_url: fileObj.path,
              original_name: fileObj.name.replace(/\s*\(\d+(?:\.\d+)?\s*MB\)$/, '').trim(),
              mime_type: 'application/pdf', // Default, you might want to store actual mime type
              file_size: Math.round(parseFloat(fileObj.size.replace(' MB', '')) * 1024 * 1024),
              user_note: fileObj.user_note || '',
            })
          }
        }
      }
    }

    // Prepare payload according to API structure
    const payload = {
      jenis_pengajuan_id: parseInt(selectedPengajuanId.value),
      owner: {
        nama: ownerData.value.nama,
        nik: ownerData.value.nik,
        email: ownerData.value.email,
        phone: ownerData.value.phone || ownerData.value.no_hp || '',
        jenis_kelamin: ownerData.value.jenis_kelamin || 'L',
        npwp: ownerData.value.npwp || '',
        agama: ownerData.value.agama || '',
        kewarganegaraan: ownerData.value.kewarganegaraan || 'WNI',
        alamat: ownerData.value.alamat || '',
        pekerjaan: ownerData.value.pekerjaan || '',
        tanggal_lahir: ownerData.value.tanggal_lahir || '1990-01-01',
      },
      lahan: {
        no_surat_rt: lahanData.value.no_surat_rt || '',
        jenis_bangunan: lahanData.value.jenis_bangunan,
        luas_lahan: parseFloat(lahanData.value.luas_lahan),
        alamat_rt: lahanData.value.alamat_rt || lahanData.value.rt || '',
        alamat_rw: lahanData.value.alamat_rw || lahanData.value.rw || '',
        kode_pos: lahanData.value.kode_pos || '',
        wilayah_kelurahan: lahanData.value.wilayah_kelurahan || lahanData.value.kelurahan || '',
        wilayah_kecamatan: lahanData.value.wilayah_kecamatan || lahanData.value.kecamatan || '',
        wilayah_kota: lahanData.value.wilayah_kota || lahanData.value.kota || '',
      },
      documents: documents,
    }

    console.log('Submitting payload:', payload)
    console.log('Total documents to submit:', documents.length)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    try {
      const response = await axios.post('https://bitwisi.cloud/api/pengajuan', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
        timeout: 30000,
      })

      clearTimeout(timeoutId)
      console.log('Submit response:', response.data)

      Swal.fire({
        icon: 'success',
        title: 'Berhasil Dikirim!',
        text: 'Pengajuan Anda berhasil dikirim dan akan segera diproses. Anda akan mendapat notifikasi melalui email mengenai status pengajuan.',
        confirmButtonColor: '#10b981',
        confirmButtonText: 'Tutup',
      }).then(() => {
        // Reset form
        uploadedFiles.value = {}
        selectedFiles.value = {}
        userNotes.value = {}
        requirementMessages.value = {}
        ownerData.value = null
        lahanData.value = null
        selectedPengajuanId.value = ''
        hasHGB.value = null
        currentStep.value = 1

        // Refresh data
        fetchPengajuan()
      })
    } catch (submitError) {
      clearTimeout(timeoutId)

      if (submitError.name === 'AbortError') {
        throw new Error('Request timeout - server took too long to respond')
      }
      throw submitError
    }
  } catch (err) {
    console.error('Error submitting documents:', err)

    let errorMessage = 'Terjadi kesalahan yang tidak diketahui'

    if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
      errorMessage = 'Request timeout - server tidak merespons dalam waktu yang wajar'
    } else if (err.response) {
      errorMessage = err.response.data.message || `Server error: ${err.response.status}`
    } else if (err.request) {
      errorMessage = 'Tidak dapat terhubung ke server'
    } else {
      errorMessage = err.message
    }

    Swal.fire({
      icon: 'error',
      title: 'Gagal Mengirim Pengajuan',
      text: errorMessage,
      confirmButtonColor: '#ef4444',
    })
  }
}
onMounted(() => {
  console.log('Component mounted, fetching pengajuan')
  fetchPengajuan()
})
</script>

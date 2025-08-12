<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div class="bg-white shadow-lg border-b border-slate-200/60 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <!-- Logo/Title Section -->
          <div class="flex-shrink-0">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">Sidarabali</h1>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center space-x-3">
            <button
              @click="DataLengkap"
              class="inline-flex items-center justify-center px-4 py-2.5 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-sm"
            >
              Profile Pengguna
            </button>

            <button
              @click="kelengkapan"
              class="inline-flex items-center justify-center px-4 py-2.5 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm"
            >
              Pengantar RT
            </button>

            <button
              @click="download"
              class="inline-flex items-center justify-center px-4 py-2.5 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 text-sm"
            >
              Format Dokumen
            </button>

            <button
              @click="authStore.logout"
              class="inline-flex items-center justify-center px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
            >
              Logout
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <div class="lg:hidden">
            <button
              @click="toggleMobileMenu"
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-controls="mobile-menu"
              :aria-expanded="isMobileMenuOpen"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Hamburger Icon -->
              <svg
                v-if="!isMobileMenuOpen"
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <!-- Close Icon -->
              <svg
                v-else
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
        </div>

        <!-- Welcome Message -->
        <div class="pb-4 lg:hidden">
          <p class="text-slate-600 text-center text-sm">
            Welcome back,
            <span class="font-semibold text-slate-800">{{ authStore.user?.username }}!</span>
          </p>
        </div>

        <!-- Desktop Welcome Message -->
        <div class="hidden lg:block pb-4">
          <p class="text-slate-600 text-sm">
            Welcome back,
            <span class="font-semibold text-slate-800">{{ authStore.user?.username }}!</span>
          </p>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-show="isMobileMenuOpen"
        class="lg:hidden border-t border-slate-200 bg-white"
        id="mobile-menu"
      >
        <div class="px-4 py-3 space-y-2">
          <button
            @click="
              () => {
                DataLengkap()
                closeMobileMenu()
              }
            "
            class="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors duration-200 flex items-center space-x-3"
          >
            <svg
              class="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span class="font-medium">Profile Pengguna</span>
          </button>

          <button
            @click="
              () => {
                kelengkapan()
                closeMobileMenu()
              }
            "
            class="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors duration-200 flex items-center space-x-3"
          >
            <svg
              class="w-5 h-5 text-blue-500"
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
            <span class="font-medium">Pengantar RT</span>
          </button>

          <button
            @click="
              () => {
                download()
                closeMobileMenu()
              }
            "
            class="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors duration-200 flex items-center space-x-3"
          >
            <svg
              class="w-5 h-5 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span class="font-medium">Format Dokumen</span>
          </button>

          <div class="pt-2 border-t border-slate-200">
            <button
              @click="
                () => {
                  authStore.logout()
                  closeMobileMenu()
                }
              "
              class="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors duration-200 flex items-center space-x-3"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span class="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 mb-8 hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex items-center mb-6">
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4"
          >
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
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
          <h2 class="text-xl sm:text-2xl font-bold text-slate-800">Pilih Tipe Pengajuan</h2>
        </div>

        <div class="relative">
          <label
            for="submission-type-select"
            class="block text-slate-700 font-medium mb-2 sm:mb-3 text-sm sm:text-base"
          >
            Tipe Pengajuan <span class="text-red-500">*</span>
          </label>
          <select
            id="submission-type-select"
            v-model="selectedSubmissionType"
            :disabled="!canSelectSubmissionType || loadingKelengkapan"
            class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-slate-700 text-sm sm:text-base"
          >
            <option value="">-- Pilih Tipe Pengajuan --</option>
            <option v-for="type in allSubmissionTypes" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>
          <p class="text-sm text-red-500 mt-5" v-if="!canSelectSubmissionType">
            Anda Harus melengkapi Pengantar RT terlebih dahulu Jika ingin Melakukan Proses Pengajuan
          </p>
        </div>
      </div>

      <div
        v-if="allDocumentsUploaded && allDocumentsApproved"
        class="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
      >
        <h3 class="text-lg font-semibold text-green-800 mb-3">Surat Pengantar</h3>

        <div v-if="availableSurat.length > 0" class="space-y-2">
          <h4 class="font-medium text-gray-700">Surat yang Tersedia:</h4>
          <div
            v-for="surat in availableSurat"
            :key="surat.id"
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-white rounded border gap-3"
          >
            <div class="flex-1">
              <p class="font-medium text-gray-800 text-base">
                Surat Pengantar untuk {{ surat.nama_pengajuan }}
              </p>
              <p class="text-sm text-gray-600">No. Surat: {{ surat.letter_number }}</p>
              <p class="text-sm text-gray-500">Generated: {{ formatDate(surat.generated_at) }}</p>
              <span
                :class="getSuratStatusColor(surat.status)"
                class="text-xs px-2 py-1 rounded-full mt-1 inline-block"
              >
                {{ getSuratStatusLabel(surat.status) }}
              </span>
            </div>

            <button
              @click="downloadSurat(surat.id)"
              :disabled="downloadingSurat"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto text-sm"
            >
              <svg
                v-if="downloadingSurat"
                class="animate-spin h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              {{ downloadingSurat ? 'Downloading...' : 'Download' }}
            </button>
          </div>
        </div>

        <div v-else class="text-center py-4">
          <p class="text-gray-600 text-sm">
            Surat pengantar belum tersedia untuk pengajuan ini. Silakan hubungi admin untuk generate
            surat.
          </p>
        </div>
      </div>

      <div
        v-else-if="selectedSubmissionType"
        class="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
      >
        <p class="text-yellow-800 font-medium text-sm">
          Surat pengantar akan muncul di sini setelah semua dokumen wajib diupload dan disetujui
          oleh admin.
        </p>
      </div>

      <div v-if="selectedSubmissionType" class="space-y-8">
        <div
          class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex items-center mb-6">
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-slate-800">Progress Pengajuan</h2>
          </div>

          <div class="relative">
            <div class="w-full bg-slate-200 rounded-full h-2 sm:h-3 mb-3 sm:mb-4 overflow-hidden">
              <div
                class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-700 ease-out relative"
                :style="{ width: `${uploadProgress}%` }"
              >
                <div class="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div class="flex justify-between items-center text-sm sm:text-base">
              <p class="text-slate-600 font-medium">
                {{ uploadedDocumentsCount }} dari {{ totalRequiredDocuments }} dokumen wajib
              </p>
              <span class="text-xl sm:text-2xl font-bold text-blue-600">{{ uploadProgress }}%</span>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex items-center mb-6">
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-slate-800">Upload Dokumen</h2>
          </div>

          <div
            v-if="availableDocumentTypesToUpload.length === 0 && totalRequiredDocuments > 0"
            class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 sm:p-6 mb-6"
          >
            <div class="flex items-center">
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 sm:mr-4"
              >
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-green-800 font-semibold text-base sm:text-lg">Selamat!</p>
                <p class="text-green-700 text-sm">
                  Semua dokumen wajib untuk tipe pengajuan ini telah diupload! Anda dapat
                  melanjutkan ke tahap berikutnya.
                </p>
              </div>
            </div>
          </div>

          <form
            v-if="availableDocumentTypesToUpload.length > 0"
            @submit.prevent="handleUpload"
            class="space-y-6"
          >
            <div class="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label
                  for="document-type"
                  class="block text-slate-700 font-medium mb-2 sm:mb-3 text-sm sm:text-base"
                >
                  Pilih Jenis Dokumen <span class="text-red-500">*</span>
                </label>
                <select
                  id="document-type"
                  v-model="selectedDocumentType"
                  class="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-slate-700 text-sm sm:text-base"
                  required
                >
                  <option value="">-- Pilih Jenis Dokumen --</option>
                  <option
                    v-for="docType in availableDocumentTypesToUpload"
                    :key="docType.value"
                    :value="docType.value"
                  >
                    {{ docType.label }}
                  </option>
                </select>
              </div>

              <div>
                <label
                  for="document"
                  class="block text-slate-700 font-medium mb-2 sm:mb-3 text-sm sm:text-base"
                >
                  Pilih File Dokumen <span class="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="document"
                  @change="onFileChange"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  class="w-full text-xs sm:text-sm text-slate-500 file:mr-3 sm:file:mr-4 file:py-2.5 sm:file:py-3 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:transition-colors file:duration-200"
                  required
                />
                <p class="text-xs text-slate-500 mt-1 sm:mt-2">
                  Format yang didukung: PDF, JPG, JPEG, PNG, DOC, DOCX. Maksimal 10MB.
                </p>
              </div>
            </div>

            <div
              v-if="uploadError"
              class="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-3 sm:p-4"
            >
              <div class="flex items-center">
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 sm:mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p class="text-red-700 font-medium text-sm">{{ uploadError }}</p>
              </div>
            </div>

            <div
              v-if="uploadSuccess"
              class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3 sm:p-4"
            >
              <div class="flex items-center">
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p class="text-green-700 font-medium text-sm">{{ uploadSuccess }}</p>
              </div>
            </div>

            <button
              type="submit"
              class="w-full md:w-auto inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
              :disabled="uploading || !selectedFile || !selectedDocumentType"
            >
              <svg
                v-if="uploading"
                class="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <svg
                v-else
                class="w-4 h-4 mr-2 sm:mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              {{ uploading ? 'Mengupload...' : 'Upload Dokumen' }}
            </button>
          </form>
        </div>

        <div
          class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex items-center mb-6">
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-amber-600"
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
            <h2 class="text-xl sm:text-2xl font-bold text-slate-800">Status Dokumen Wajib</h2>
          </div>

          <div v-if="loadingDocuments" class="text-center py-4">
            <p class="text-slate-500 text-sm">Memuat persyaratan dokumen...</p>
          </div>
          <div v-else-if="documentRequirements.length === 0" class="text-center py-4">
            <p class="text-slate-500 text-sm">
              Tidak ada persyaratan dokumen untuk tipe pengajuan ini.
            </p>
          </div>
          <div v-else class="grid gap-4">
            <div
              v-for="docReq in paginatedDocumentRequirements"
              :key="docReq.value"
              class="flex items-center justify-between p-3 sm:p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors duration-200"
            >
              <div class="flex items-center">
                <div
                  v-if="hasUploadedDocument(docReq.value)"
                  class="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 sm:mr-4"
                >
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
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
                <div
                  v-else
                  class="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center mr-3 sm:mr-4"
                >
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5 text-red-600"
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
                </div>

                <div>
                  <span class="text-slate-800 font-medium text-sm sm:text-base">{{
                    docReq.label
                  }}</span>
                  <div class="mt-1">
                    <span
                      v-if="hasUploadedDocument(docReq.value)"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      ✓ Sudah Upload
                    </span>
                    <span
                      v-else
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                    >
                      ✗ Belum Upload
                    </span>
                  </div>
                </div>
              </div>

              <div v-if="hasUploadedDocument(docReq.value)" class="text-xs sm:text-sm">
                <span
                  :class="getStatusColor(getDocumentStatus(docReq.value))"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ getStatusLabel(getDocumentStatus(docReq.value)) }}
                </span>
              </div>
            </div>
          </div>
          <div v-if="totalPagesStatusDocs > 1" class="flex justify-center mt-6">
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="prevPageStatusDocs"
                :disabled="currentPageStatusDocs === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                v-for="page in totalPagesStatusDocs"
                :key="page"
                @click="goToPageStatusDocs(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  currentPageStatusDocs === page
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="nextPageStatusDocs"
                :disabled="currentPageStatusDocs === totalPagesStatusDocs"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>

          <div
            class="mt-6 p-4 sm:p-6 rounded-xl"
            :class="
              allDocumentsUploaded
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
                : 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200'
            "
          >
            <div class="flex items-center">
              <div
                v-if="allDocumentsUploaded"
                class="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 sm:mr-4"
              >
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div
                v-else
                class="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3 sm:mr-4"
              >
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 text-amber-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>

              <div>
                <p
                  v-if="allDocumentsUploaded"
                  class="text-green-800 font-bold text-base sm:text-lg"
                >
                  Semua dokumen wajib telah diupload!
                </p>
                <p v-else class="text-amber-800 font-bold text-base sm:text-lg">
                  Masih ada {{ missingDocumentsCount }} dokumen yang belum diupload
                </p>
                <p v-if="allDocumentsUploaded" class="text-green-700 mt-1 text-sm">
                  Silakan tunggu proses verifikasi dari tim admin.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex items-center mb-6">
            <div
              class="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-slate-800">
              Dokumen yang Sudah Diupload
            </h2>
          </div>

          <div v-if="loadingDocuments" class="text-center py-6 sm:py-12">
            <div class="inline-flex items-center px-3 py-2 bg-blue-50 rounded-lg">
              <svg
                class="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span class="text-blue-700 font-medium text-sm">Memuat dokumen...</span>
            </div>
          </div>

          <div v-else-if="filteredUploadedDocuments.length === 0" class="text-center py-6 sm:py-12">
            <div
              class="w-12 h-12 sm:w-10 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
            >
              <svg
                class="w-6 h-6 sm:w-8 sm:h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <p class="text-slate-500 font-medium text-sm">
              Belum ada dokumen yang diupload untuk tipe pengajuan ini.
            </p>
          </div>

          <div class="grid gap-4 sm:gap-6">
            <div
              v-for="doc in paginatedFilteredUploadedDocuments"
              :key="doc.id"
              class="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-gray-300 hover:-translate-y-1"
            >
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div class="flex-1 w-full sm:w-auto mb-4 sm:mb-0">
                  <div class="flex items-center mb-3 sm:mb-4">
                    <div
                      class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0"
                    >
                      <svg
                        class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
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
                    <h3 class="text-gray-800 text-sm sm:text-sm truncate flex-1">
                      {{ doc.file_name }}
                    </h3>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 text-sm mb-3 sm:mb-4">
                    <div class="flex items-center">
                      <span class="text-gray-500 font-medium min-w-16 sm:min-w-20">Jenis:</span>
                      <span class="text-gray-800 ml-2 sm:ml-3 font-medium">{{
                        getDocumentTypeLabel(doc.document_type)
                      }}</span>
                    </div>

                    <div class="flex items-center">
                      <span class="text-gray-500 font-medium min-w-16 sm:min-w-20">Status:</span>
                      <span
                        :class="getStatusColor(doc.status)"
                        class="ml-2 sm:ml-3 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                      >
                        {{ getStatusLabel(doc.status) }}
                      </span>
                    </div>

                    <div v-if="doc.is_complete !== null" class="flex items-center col-span-full">
                      <span class="text-gray-500 font-medium min-w-16 sm:min-w-20"
                        >Kelengkapan:</span
                      >
                      <span
                        class="ml-2 sm:ml-3 flex items-center text-sm font-medium"
                        :class="doc.is_complete ? 'text-green-600' : 'text-red-600'"
                      >
                        <svg
                          class="w-4 h-4 mr-1"
                          :class="doc.is_complete ? 'text-green-500' : 'text-red-500'"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            v-if="doc.is_complete"
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                          <path
                            v-else
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        {{ doc.is_complete ? 'Lengkap' : 'Tidak Lengkap' }}
                      </span>
                    </div>
                  </div>

                  <div v-if="doc.admin_notes" class="bg-gray-50 rounded-lg p-3">
                    <span class="text-gray-500 font-medium text-xs sm:text-sm">Catatan Admin:</span>
                    <p class="text-gray-700 mt-1 text-xs sm:text-sm leading-relaxed">
                      {{ doc.admin_notes }}
                    </p>
                  </div>
                </div>

                <div
                  class="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2 w-full sm:w-auto mt-4 sm:mt-0 sm:ml-6 justify-center"
                >
                  <a
                    :href="`https://bitwize.cloud/uploads/${doc.file_name}`"
                    target="_blank"
                    class="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg flex-1"
                  >
                    <svg
                      class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
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
                    Lihat
                  </a>

                  <button
                    @click="confirmDelete(doc)"
                    class="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg flex-1"
                  >
                    <svg
                      class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="totalPagesUploadedDocs > 1" class="flex justify-center mt-6">
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="prevPageUploadedDocs"
                :disabled="currentPageUploadedDocs === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                v-for="page in totalPagesUploadedDocs"
                :key="page"
                @click="goToPageUploadedDocs(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  currentPageUploadedDocs === page
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="nextPageUploadedDocs"
                :disabled="currentPageUploadedDocs === totalPagesUploadedDocs"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div
        v-else
        class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 sm:p-8 text-center"
      >
        <div
          class="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
        >
          <svg
            class="w-6 h-6 sm:w-8 sm:h-8 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.268 13.5C3.498 14.333 4.46 16 6.002 16z"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg sm:text-xl font-bold text-amber-800 mb-2">Pilih Tipe Pengajuan</h3>
        <p class="text-amber-700 text-sm">
          Silakan pilih <strong>Tipe Pengajuan</strong> di atas untuk melihat status dokumen dan
          mengunggah dokumen yang diperlukan.
        </p>
      </div>

      <div
        v-if="showDownloadSuccessModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl max-w-xs sm:max-w-sm w-full transform transition-all duration-300 scale-100 opacity-100"
        >
          <div class="p-6 sm:p-8 text-center">
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
            >
              <Download class="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>

            <h3 class="text-xl sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-4">
              Unduhan Berhasil!
            </h3>
            <p class="text-slate-600 mb-1 sm:mb-2 text-sm">File:</p>
            <p class="font-semibold text-slate-800 mb-3 sm:mb-4 text-sm break-all">
              "{{ downloadedSuratDetails.fileName }}"
            </p>
            <p class="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8">
              Berhasil diunduh ke perangkat Anda.
            </p>

            <button
              @click="showDownloadSuccessModal = false"
              class="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 text-sm"
            >
              <svg
                class="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              Tutup
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl max-w-xs sm:max-w-md w-full transform transition-all duration-300"
        >
          <div class="p-6 sm:p-8 text-center">
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
            >
              <svg
                class="w-6 h-6 sm:w-8 sm:h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.268 13.5C3.498 14.333 4.46 16 6.002 16z"
                ></path>
              </svg>
            </div>

            <h3 class="text-xl sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-4">
              Konfirmasi Hapus
            </h3>
            <p class="text-slate-600 mb-1 sm:mb-2 text-sm">
              Apakah Anda yakin ingin menghapus dokumen:
            </p>
            <p class="font-semibold text-slate-800 mb-3 sm:mb-4 text-sm break-all">
              "{{ documentToDelete?.file_name }}"
            </p>
            <p class="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8">
              Tindakan ini tidak dapat dibatalkan.
            </p>

            <div
              v-if="deleteError"
              class="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4"
            >
              <div class="flex items-center justify-center">
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 sm:mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p class="text-red-700 font-medium text-sm">{{ deleteError }}</p>
              </div>
            </div>

            <div
              v-if="deleteSuccess"
              class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4"
            >
              <div class="flex items-center justify-center">
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p class="text-green-700 font-medium text-sm">{{ deleteSuccess }}</p>
              </div>
            </div>

            <div class="flex gap-3 sm:gap-4 justify-center flex-wrap">
              <button
                @click="deleteDocument"
                class="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm flex-1 sm:flex-none"
                :disabled="deleting"
              >
                <svg
                  v-if="deleting"
                  class="animate-spin -ml-1 mr-1.5 sm:mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{ deleting ? 'Menghapus...' : 'Ya, Hapus' }}
              </button>

              <button
                @click="cancelDelete"
                class="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-gray-500 hover:bg-slate-600 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm flex-1 sm:flex-none"
                :disabled="deleting"
              >
                <svg
                  class="w-4 h-4 mr-1.5 sm:mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="showRTRWReminderModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h3 class="text-xl font-semibold mb-4 text-red-600">Peringatan Penting!</h3>
      <p class="mb-4 text-gray-700">
        Pastikan Anda sudah mengunggah **Surat Pengantar RT/RW (asli)** untuk jenis pengajuan ini.
        Dokumen ini sangat krusial dan jika belum diunggah dapat menghambat proses pengajuan Anda.
      </p>
      <div class="flex justify-end">
        <button
          @click="showRTRWReminderModal = false"
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Mengerti
        </button>
        <button
          @click="InputDokumen"
          class="px-4 ml-2 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Input Dokumen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { Download } from 'lucide-vue-next'
import Swal from 'sweetalert2'
const router = useRouter()
const authStore = useAuthStore()
const selectedFile = ref(null)
const selectedDocumentType = ref('')
const uploading = ref(false)
const uploadError = ref(null)
const uploadSuccess = ref(null)
const documents = ref([])
const loadingDocuments = ref(true)
const showDeleteModal = ref(false)
const documentToDelete = ref(null)
const deleting = ref(false)
const availableSurat = ref([])
const downloadingSurat = ref(false)
const backendPengajuanTypes = ref([])
const selectedSubmissionType = ref('')
const selectedPengajuanId = ref(null)
const showDownloadSuccessModal = ref(false)
const downloadedSuratDetails = ref({ fileName: '' })
const id = localStorage.getItem('id')
const API_SURAT_URL = 'https://bitwize.cloud/api/documents/surat'
const API_URL = 'https://bitwize.cloud/api/documents'
const API_PENGAJUAN_URL = 'https://bitwize.cloud/api/documents/pengajuan'
const API_PROFILE = 'https://bitwize.cloud/api/profile'
const API_KELENGKAPAN_URL = 'https://bitwize.cloud/api/kelengkapan'
const kelengkapanData = ref([])
const loadingKelengkapan = ref(false)
const canSelectSubmissionType = ref(true)
const currentPageStatusDocs = ref(1)
const itemsPerPageStatusDocs = 4
const currentPageUploadedDocs = ref(1)
const itemsPerPageUploadedDocs = 4
const showRTRWReminderModal = ref(false)
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
const fetchKelengkapan = async () => {
  loadingKelengkapan.value = true
  try {
    const userId = localStorage.getItem('id')
    if (!userId) {
      console.error('User ID tidak ditemukan di localStorage')
      canSelectSubmissionType.value = false
      return false
    }

    const response = await axios.get(`${API_KELENGKAPAN_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    console.log('Kelengkapan response:', response.data)

    if (response.data.success) {
      kelengkapanData.value = response.data.data

      // Cek apakah data kosong
      if (response.data.data.length === 0 || response.data.count === 0) {
        console.log('Data kelengkapan kosong, tidak bisa memilih submission type')
        canSelectSubmissionType.value = false

        // Optional: tampilkan notifikasi
        Swal.fire({
          icon: 'info',
          title: 'Data Kelengkapan Kosong',
          text: 'Silakan lengkapi data kelengkapan terlebih dahulu sebelum memilih jenis pengajuan',
          confirmButtonText: 'OK',
        })

        return false
      } else {
        canSelectSubmissionType.value = true
        return true
      }
    }
  } catch (error) {
    console.error('Error fetching kelengkapan:', error)
    canSelectSubmissionType.value = false
    return false
  } finally {
    loadingKelengkapan.value = false
  }
}
const allSubmissionTypes = computed(() => {
  return allSubmissionTypesFrontend.value.map((type) => ({
    value: type.value,
    label: type.label,
  }))
})

const DataLengkap = () => {
  router.push('/user-profile')
}
const kelengkapan = () => {
  router.push(`/user/kelengkapan/${id}`)
}
const download = () => {
  router.push(`/download-template`)
}
const InputDokumen = () => {
  router.push(`/user/kelengkapan/${id}`)
}
const allDocumentsApproved = computed(() => {
  if (!selectedSubmissionType.value || filteredUploadedDocuments.value.length === 0) return false
  const requiredDocTypes = documentRequirements.value.map((doc) => doc.value)
  const uploadedAndApprovedCount = filteredUploadedDocuments.value.filter(
    (doc) => requiredDocTypes.includes(doc.document_type) && doc.status === 'approved',
  ).length

  return uploadedAndApprovedCount === requiredDocTypes.length
})

const downloadSurat = async (suratId) => {
  downloadingSurat.value = true
  try {
    const response = await axios.get(`${API_SURAT_URL}/download/${suratId}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      responseType: 'blob',
    })

    const contentDisposition = response.headers['content-disposition']
    let filename = `surat_pengantar_${suratId}.pdf`
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(
        /filename\*?=['"]?(?:UTF-8'')?([^"'\s;]+)['"]?/,
      )
      if (filenameMatch && filenameMatch[1]) {
        filename = decodeURIComponent(filenameMatch[1])
      }
    }

    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    downloadedSuratDetails.value.fileName = filename
    showDownloadSuccessModal.value = true

    try {
      await axios.put(
        `${API_SURAT_URL}/${suratId}/status`,
        { status: 'downloaded' },
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        },
      )
      await fetchUserSurat()
    } catch (statusUpdateError) {
      console.error('Error updating surat status to downloaded:', statusUpdateError)
    }
  } catch (error) {
    console.error('Error downloading surat:', error)
    alert('Gagal mengunduh surat. Silakan coba lagi atau hubungi admin.')
  } finally {
    downloadingSurat.value = false
  }
}

const fetchUserSurat = async () => {
  if (!authStore.user?.id || !selectedPengajuanId.value) {
    availableSurat.value = []
    return
  }
  try {
    const response = await axios.get(
      `${API_SURAT_URL}/user/${authStore.user.id}/pengajuan/${selectedPengajuanId.value}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )
    availableSurat.value = response.data
  } catch (error) {
    console.error('Error fetching user surat:', error)
    availableSurat.value = []
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('id-ID')
}
const getSuratStatusColor = (status) => {
  switch (status) {
    case 'downloaded':
      return 'bg-blue-100 text-blue-800'
    case 'generated':
    default:
      return 'bg-green-100 text-green-800'
  }
}
const getSuratStatusLabel = (status) => {
  switch (status) {
    case 'downloaded':
      return 'Downloaded'
    case 'generated':
    default:
      return 'Ready to Download'
  }
}

watch(selectedPengajuanId, (newId) => {
  if (newId) {
    fetchUserSurat()
    fetchUserDocuments()
  } else {
    availableSurat.value = []
    documents.value = []
  }
})

const allSubmissionTypesFrontend = ref([
  {
    value: 'rekomendasi_hak_atas_tanah_eks_kota_praja',
    label:
      'Standar Pelayanan Kelengkapan Administrasi Permohonan Rekomendasi Hak Atas Tanah Eks Kota Praja',
    documents: [
      { value: 'surat_pengantar_rt_rw', label: 'Surat Pengantar RT/RW (asli)' },
      { value: 'fc_ktp_pemohon', label: 'Scan FC KTP terbaru Pemohon atau Kuasa' },
      { value: 'fc_kk_pemohon', label: 'Scan FC KK terbaru Pemohon' },
      { value: 'fc_surat_pbb', label: 'Scan FC surat pemberitahuan tidak ada tunggakan PBB' },
      { value: 'fc_surat_asal_usul_tanah', label: 'Scan FC Surat Asal Usul Tanah' },
      { value: 'surat_pernyataan_ahli_waris', label: 'Surat Pernyataan Ahli Waris' },
      {
        value: 'surat_pernyataan_penguasaan_fisik',
        label: 'Surat Pernyataan Penguasaan Fisik Bidang Tanah',
      },
      { value: 'surat_pernyataan_tidak_sengketa', label: 'Surat Pernyataan Tidak Sengketa' },
      { value: 'berita_acara_peninjauan_lapangan', label: 'Berita Acara Peninjauan Lapangan' },
    ],
  },
  {
    value: 'pencatatan_surat_pernyataan_ahli_waris_wni',
    label: 'Standar Pelayanan Pencatatan Surat Pernyataan Ahli Waris WNI',
    documents: [
      { value: 'surat_pengantar_rt_rw', label: 'Surat Pengantar RT/RW (asli)' },
      { value: 'fc_ktp_pewaris', label: 'Scan FC KTP Pewaris' },
      { value: 'fc_ktp_ahli_waris', label: 'Scan FC KTP para Ahli Waris terbaru' },
      { value: 'fc_kk_ahli_waris', label: 'Scan FC KK para Ahli Waris' },
      {
        value: 'fc_akta_kelahiran_ahli_waris',
        label: 'Scan FC Akta Kelahiran/Surat Keterangan Lahir Ahli Waris',
      },
      { value: 'fc_surat_nikah_pewaris', label: 'Scan FC Surat Nikah Pewaris' },
      { value: 'fc_surat_kematian_pewaris', label: 'Scan FC Surat Kematian Pewaris' },
      {
        value: 'surat_pernyataan_ahli_waris_bermaterai',
        label: 'Surat pernyataan dari Ahli Waris bermaterai Rp. 10.000',
      },
      { value: 'fc_akta_cerai_pewaris', label: 'Scan FC Akta Cerai Pewaris (apabila bercerai)' },
      {
        value: 'fc_surat_kematian_ahli_waris',
        label: 'Scan FC Surat Kematian Ahli Waris (apabila meninggal dunia)',
      },
      { value: 'fc_ktp_2_saksi', label: 'Scan FC KTP 2 orang Saksi' },
    ],
  },
  {
    value: 'pemberian_surat_keterangan_peningkatan_hak_atas_tanah',
    label: 'Standar Pelayanan Pemberian Surat Keterangan Peningkatan Hak atas tanah',
    documents: [
      { value: 'surat_pengantar_rt_rw', label: 'Surat Pengantar RT/RW (asli)' },
      { value: 'surat_kuasa_bermaterai', label: 'Surat kuasa bila dikuasakan (materai Rp 10.000)' },
      { value: 'fc_ktp_penerima_kuasa', label: 'Scan FC KTP penerima kuasa' },
      { value: 'fc_ktp_pemohon', label: 'Scan FC KTP terbaru Pemohon' },
      { value: 'fc_kk_pemohon', label: 'Scan FC KK Pemohon' },
      {
        value: 'fc_sertifikat_hgb_ajb',
        label: 'Scan FC Sertifikat HGB/AJB/dokumen lainnya dan menunjukan aslinya',
      },
      {
        value: 'fc_surat_pbb_up3d',
        label:
          'Scan FC surat pemberitahuan tidak ada tunggakan PBB yang berasal dari UP3D setempat',
      },
      {
        value: 'surat_pernyataan_penguasaan_fisik_2_saksi',
        label:
          'Surat pernyataan penguasaan fisik dari yang bersangkutan disaksikan 2 (dua) orang saksi (PDF dijadikan 1)',
      },
      {
        value: 'fc_surat_asal_usul_tanah_sertifikat',
        label:
          'Scan FC Surat Asal Usul Tanah (sertifikat HGB/AJB/dokumen lain yang menyebut riwayat penguasaan tanah) dengan memperlihatkan aslinya',
      },
      {
        value: 'surat_pernyataan_tidak_sengketa_rt_rw',
        label: 'Surat pernyataan tidak sengketa yang diketahui RT dan RW',
      },
      {
        value: 'surat_pernyataan_ahli_waris_pewaris_meninggal',
        label: 'Surat Pernyataan Para Ahli Waris bila Pewaris meninggal',
      },
    ],
  },
])

const getPengajuanIdByFrontendValue = (frontendValue) => {
  const frontendType = allSubmissionTypesFrontend.value.find((type) => type.value === frontendValue)
  if (!frontendType) return null

  const backendType = backendPengajuanTypes.value.find(
    (bType) => bType.nama_pengajuan === frontendType.label,
  )
  return backendType ? backendType.id_pengajuan : null
}

watch(selectedSubmissionType, (newValue) => {
  selectedPengajuanId.value = getPengajuanIdByFrontendValue(newValue)
  currentPageStatusDocs.value = 1
  currentPageUploadedDocs.value = 1
  if (newValue) {
    showRTRWReminderModal.value = true
  }
})

const documentRequirements = computed(() => {
  const selectedType = allSubmissionTypesFrontend.value.find(
    (type) => type.value === selectedSubmissionType.value,
  )
  return selectedType ? selectedType.documents : []
})

const paginatedDocumentRequirements = computed(() => {
  const start = (currentPageStatusDocs.value - 1) * itemsPerPageStatusDocs
  const end = start + itemsPerPageStatusDocs
  return documentRequirements.value.slice(start, end)
})

const totalPagesStatusDocs = computed(() => {
  return Math.ceil(documentRequirements.value.length / itemsPerPageStatusDocs)
})

const nextPageStatusDocs = () => {
  if (currentPageStatusDocs.value < totalPagesStatusDocs.value) {
    currentPageStatusDocs.value++
  }
}

const prevPageStatusDocs = () => {
  if (currentPageStatusDocs.value > 1) {
    currentPageStatusDocs.value--
  }
}

const goToPageStatusDocs = (page) => {
  currentPageStatusDocs.value = page
}

const filteredUploadedDocuments = computed(() => {
  if (!selectedSubmissionType.value || selectedPengajuanId.value === null) return []

  const requiredDocValues = new Set(documentRequirements.value.map((doc) => doc.value))
  return documents.value.filter((doc) => {
    const belongsToCurrentPengajuan = doc.id_pengajuan === selectedPengajuanId.value

    return requiredDocValues.has(doc.document_type) && belongsToCurrentPengajuan
  })
})

const paginatedFilteredUploadedDocuments = computed(() => {
  const start = (currentPageUploadedDocs.value - 1) * itemsPerPageUploadedDocs
  const end = start + itemsPerPageUploadedDocs
  return filteredUploadedDocuments.value.slice(start, end)
})

const totalPagesUploadedDocs = computed(() => {
  return Math.ceil(filteredUploadedDocuments.value.length / itemsPerPageUploadedDocs)
})

const nextPageUploadedDocs = () => {
  if (currentPageUploadedDocs.value < totalPagesUploadedDocs.value) {
    currentPageUploadedDocs.value++
  }
}

const prevPageUploadedDocs = () => {
  if (currentPageUploadedDocs.value > 1) {
    currentPageUploadedDocs.value--
  }
}

const goToPageUploadedDocs = (page) => {
  currentPageUploadedDocs.value = page
}

const uploadedDocumentsCount = computed(() => {
  return documentRequirements.value.filter((req) => hasUploadedDocument(req.value)).length
})

const totalRequiredDocuments = computed(() => {
  return documentRequirements.value.length
})

const missingDocumentsCount = computed(() => {
  return totalRequiredDocuments.value - uploadedDocumentsCount.value
})

const uploadProgress = computed(() => {
  if (totalRequiredDocuments.value === 0) return 0
  return Math.round((uploadedDocumentsCount.value / totalRequiredDocuments.value) * 100)
})

const availableDocumentTypesToUpload = computed(() => {
  return documentRequirements.value.filter((req) => !hasUploadedDocument(req.value))
})

const allDocumentsUploaded = computed(() => {
  return (
    documentRequirements.value.every((req) => hasUploadedDocument(req.value)) &&
    documentRequirements.value.length > 0
  )
})

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      uploadError.value = 'Ukuran file tidak boleh lebih dari 10MB.'
      event.target.value = ''
      return
    }

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (!allowedTypes.includes(file.type)) {
      uploadError.value =
        'Format file tidak didukung. Gunakan format PDF, JPG, PNG, DOC, atau DOCX.'
      event.target.value = ''
      return
    }
  }

  selectedFile.value = file
  uploadError.value = null
  uploadSuccess.value = null
}

const handleUpload = async () => {
  if (!selectedFile.value) {
    uploadError.value = 'Silakan pilih file untuk diupload.'
    return
  }
  if (!selectedDocumentType.value) {
    uploadError.value = 'Silakan pilih jenis dokumen.'
    return
  }
  if (!selectedSubmissionType.value) {
    uploadError.value = 'Silakan pilih tipe pengajuan terlebih dahulu.'
    return
  }
  if (selectedPengajuanId.value === null) {
    uploadError.value = 'Tipe pengajuan tidak valid atau belum terhubung dengan database.'
    return
  }

  if (hasUploadedDocument(selectedDocumentType.value)) {
    uploadError.value = `Dokumen "${getDocumentTypeLabel(selectedDocumentType.value)}" sudah pernah diupload untuk tipe pengajuan ini. Silakan hapus dokumen lama terlebih dahulu jika ingin menggantinya.`
    return
  }

  uploading.value = true
  uploadError.value = null
  uploadSuccess.value = null

  const formData = new FormData()
  formData.append('document', selectedFile.value)
  formData.append('user_id', authStore.user.id)
  formData.append('document_type', selectedDocumentType.value)
  formData.append('id_pengajuan', selectedPengajuanId.value)

  try {
    await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    uploadSuccess.value = 'Dokumen berhasil diupload!'

    selectedFile.value = null
    selectedDocumentType.value = ''
    const fileInput = document.getElementById('document')
    if (fileInput) {
      fileInput.value = ''
    }

    await fetchUserDocuments()

    setTimeout(() => {
      uploadSuccess.value = null
    }, 5000)
  } catch (err) {
    uploadError.value =
      err.response?.data?.message || 'Gagal mengupload dokumen. Silakan coba lagi.'
  } finally {
    uploading.value = false
  }
}

const fetchUserDocuments = async () => {
  loadingDocuments.value = true
  try {
    let url = `${API_URL}/user/${authStore.user.id}`
    if (selectedPengajuanId.value) {
      url += `?id_pengajuan=${selectedPengajuanId.value}`
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    documents.value = response.data || []
  } catch (err) {
    console.error('Error fetching user documents:', err)
    documents.value = []
  } finally {
    loadingDocuments.value = false
  }
}

const confirmDelete = (doc) => {
  documentToDelete.value = doc
  showDeleteModal.value = true
}

const cancelDelete = () => {
  documentToDelete.value = null
  showDeleteModal.value = false
}

const deleteDocument = async () => {
  if (!documentToDelete.value) return

  deleting.value = true
  try {
    await axios.delete(`${API_URL}/${documentToDelete.value.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    await fetchUserDocuments()
    await fetchUserSurat()

    showDeleteModal.value = false
    documentToDelete.value = null
  } catch (err) {
    console.error('Error deleting document:', err)
  } finally {
    deleting.value = false
  }
}

const hasUploadedDocument = (typeValue) => {
  if (selectedPengajuanId.value === null) return false

  return documents.value.some((doc) => {
    const typeMatches = doc.document_type === typeValue
    const pengajuanMatches = doc.id_pengajuan === selectedPengajuanId.value
    return typeMatches && pengajuanMatches
  })
}

const getDocumentTypeLabel = (value) => {
  const type = documentRequirements.value.find((dt) => dt.value === value)
  return type ? type.label : value
}

const getDocumentStatus = (typeValue) => {
  if (selectedPengajuanId.value === null) return 'pending'

  const doc = documents.value.find((doc) => {
    const typeMatches = doc.document_type === typeValue
    const pengajuanMatches = doc.id_pengajuan === selectedPengajuanId.value
    return typeMatches && pengajuanMatches
  })
  return doc ? doc.status : 'pending'
}

const getStatusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    case 'pending':
    default:
      return 'bg-yellow-100 text-yellow-800'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'approved':
      return 'Disetujui'
    case 'rejected':
      return 'Ditolak'
    case 'pending':
    default:
      return 'Menunggu Verifikasi'
  }
}

const fetchPengajuanTypes = async () => {
  try {
    const response = await axios.get(API_PENGAJUAN_URL, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    backendPengajuanTypes.value = response.data
  } catch (error) {
    console.error('Error fetching pengajuan types:', error)
  }
}
const fetchProfile = async () => {
  try {
    const response = await axios.get(API_PROFILE, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    if (response.data.user) {
      const userData = response.data.user
      const requiredFields = [
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'agama',
        'no_ktp_sktld',
        'alamat_lengkap',
        'pekerjaan',
        'phone',
      ]
      const emptyFields = requiredFields.filter((field) => {
        const value = userData[field]
        return (
          value === null ||
          value === undefined ||
          value === '' ||
          (typeof value === 'string' && value.trim() === '')
        )
      })

      if (emptyFields.length > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Data Tidak Lengkap',
          text: 'Mohon lengkapi data terlebih dahulu',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/user-profile')
          }
        })
        return false
      }
      console.log('Data lengkap:', userData)
    } else {
      console.error('Response tidak valid atau data user kosong')
    }
  } catch (error) {
    console.error('Error fetching pengajuan types:', error)
    Swal.fire({
      icon: 'error',
      title: 'Terjadi Kesalahan',
      text: 'Gagal mengambil data profile',
      confirmButtonText: 'OK',
    })
  }
}

watch(selectedSubmissionType, () => {
  uploadError.value = null
  uploadSuccess.value = null
  selectedFile.value = null
  selectedDocumentType.value = ''
  const fileInput = document.getElementById('document')
  if (fileInput) {
    fileInput.value = ''
  }
})

onMounted(async () => {
  await fetchKelengkapan()
  fetchProfile()
  await fetchPengajuanTypes()
})
</script>

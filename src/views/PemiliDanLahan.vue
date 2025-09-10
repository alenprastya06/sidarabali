<template>
  <div class="bg-gray-50">
    <div class="container mx-auto max-w-7xl">
      <div class="mb-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <button
            @click="toggleOwnerForm"
            class="w-full px-6 py-5 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 class="text-xl font-semibold text-gray-800">Data Pemilik Lahan</h2>
                  <p class="text-sm text-gray-500 mt-1">
                    Informasi pribadi pemilik lahan
                    <span v-if="isOwnerValid" class="text-green-600 ml-2">✓ Lengkap</span>
                    <span v-else class="text-red-500 ml-2">⚠ Belum lengkap</span>
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-sm text-gray-500">
                  {{ showOwnerForm ? 'Tutup' : 'Buka' }} Form
                </span>
                <svg
                  :class="{ 'rotate-180': showOwnerForm }"
                  class="w-5 h-5 text-gray-400 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </button>

          <div v-if="showOwnerForm" class="px-6 pb-6 border-t border-gray-100">
            <form @submit.prevent="submitOwner" class="mt-6">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label for="owner_nama" class="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="owner_nama"
                    v-model="owner.nama"
                    @input="validateAndEmitOwner"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                <div>
                  <label for="owner_nik" class="block text-sm font-medium text-gray-700 mb-2">
                    NIK (Nomor Induk Kependudukan) <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="owner_nik"
                    v-model="owner.nik"
                    @input="validateAndEmitOwner"
                    maxlength="16"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="16 digit NIK"
                    required
                  />
                </div>
                <div>
                  <label
                    for="owner_tanggal_lahir"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tanggal Lahir <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="owner_tanggal_lahir"
                    v-model="owner.tanggal_lahir"
                    @change="validateAndEmitOwner"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    for="owner_jenis_kelamin"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Jenis Kelamin <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="owner_jenis_kelamin"
                    v-model="owner.jenis_kelamin"
                    @change="validateAndEmitOwner"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label for="owner_agama" class="block text-sm font-medium text-gray-700 mb-2">
                    Agama <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="owner_agama"
                    v-model="owner.agama"
                    @change="validateAndEmitOwner"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  >
                    <option value="" disabled>Pilih Agama</option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>
                <div>
                  <label
                    for="owner_kewarganegaraan"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Kewarganegaraan <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="owner_kewarganegaraan"
                    v-model="owner.kewarganegaraan"
                    @input="validateAndEmitOwner"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                <div>
                  <label for="owner_pekerjaan" class="block text-sm font-medium text-gray-700 mb-2">
                    Pekerjaan <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="owner_pekerjaan"
                    v-model="owner.pekerjaan"
                    @input="validateAndEmitOwner"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Masukkan pekerjaan"
                    required
                  />
                </div>
                <div>
                  <label for="owner_email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="owner_email"
                    v-model="owner.email"
                    @input="validateAndEmitOwner"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="contoh@email.com"
                    required
                  />
                </div>

                <div>
                  <label for="owner_phone" class="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="owner_phone"
                    v-model="owner.phone"
                    @input="validateAndEmitOwner"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="08xxxxxxxxxx"
                    required
                  />
                </div>

                <div class="lg:col-span-2">
                  <label for="owner_alamat" class="block text-sm font-medium text-gray-700 mb-2">
                    Alamat <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="owner_alamat"
                    v-model="owner.alamat"
                    @input="validateAndEmitOwner"
                    rows="3"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Masukkan alamat lengkap sesuai KTP"
                    required
                  ></textarea>
                </div>
                <div class="lg:col-span-2">
                  <label for="owner_npwp" class="block text-sm font-medium text-gray-700 mb-2">
                    NPWP (Opsional)
                  </label>
                  <input
                    type="text"
                    id="owner_npwp"
                    v-model="owner.npwp"
                    @input="validateAndEmitOwner"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="15 digit NPWP (jika ada)"
                  />
                </div>
              </div>

              <div class="mt-8 flex justify-end">
                <div class="text-sm text-gray-500">
                  Data akan disimpan otomatis saat submit dokumen
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <button
            @click="toggleLahanForm"
            class="w-full px-6 py-5 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 class="text-xl font-semibold text-gray-800">Data Lahan</h2>
                  <p class="text-sm text-gray-500 mt-1">
                    Informasi lokasi dan detail lahan
                    <span v-if="isLahanValid" class="text-green-600 ml-2">✓ Lengkap</span>
                    <span v-else class="text-red-500 ml-2">⚠ Belum lengkap</span>
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-sm text-gray-500">
                  {{ showLahanForm ? 'Tutup' : 'Buka' }} Form
                </span>
                <svg
                  :class="{ 'rotate-180': showLahanForm }"
                  class="w-5 h-5 text-gray-400 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </button>

          <div v-if="showLahanForm" class="px-6 pb-6 border-t border-gray-100">
            <form @submit.prevent="submitLahan" class="mt-6">
              <div class="mb-8">
                <h3 class="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <svg
                    class="w-5 h-5 text-gray-500 mr-2"
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
                  Informasi Dokumen
                </h3>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label
                      for="lahan_no_surat_rt"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nomor Surat RT <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lahan_no_surat_rt"
                      v-model="lahan.no_surat_rt"
                      @input="validateAndEmitLahan"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Nomor surat dari RT"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="lahan_tanggal_surat_rt"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Tanggal Surat RT <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="lahan_tanggal_surat_rt"
                      v-model="lahan.tanggal_surat_rt"
                      @change="validateAndEmitLahan"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  <div class="lg:col-span-2">
                    <label for="owner_nib" class="block text-sm font-medium text-gray-700 mb-2">
                      NIB (Nomor Induk Berusaha) - Opsional
                    </label>
                    <input
                      type="text"
                      id="owner_nib"
                      v-model="lahan.nib"
                      @input="validateAndEmitLahan"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="13 digit NIB (jika ada)"
                      maxlength="13"
                    />
                  </div>
                  <div>
                    <label
                      for="lahan_tanggal_surat_pernyataan"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Tanggal Surat Pernyataan <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="lahan_tanggal_surat_pernyataan"
                      v-model="lahan.tanggal_surat_pernyataan"
                      @change="validateAndEmitLahan"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h3 class="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <svg
                    class="w-5 h-5 text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Detail Lahan & Bangunan
                </h3>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label
                      for="lahan_jenis_bangunan"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Jenis Bangunan <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lahan_jenis_bangunan"
                      v-model="lahan.jenis_bangunan"
                      @input="validateAndEmitLahan"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Contoh: Rumah Tinggal, Ruko, dll"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="lahan_luas_lahan"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Luas Lahan (m²) <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      id="lahan_luas_lahan"
                      v-model.number="lahan.luas_lahan"
                      @input="validateAndEmitLahan"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Contoh: 120.5"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h3 class="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <svg
                    class="w-5 h-5 text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Alamat Lahan
                </h3>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <label
                      for="lahan_alamat_rt"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      RT <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lahan_alamat_rt"
                      v-model="lahan.alamat_rt"
                      @input="validateAndEmitLahan"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="001"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="lahan_alamat_rw"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      RW <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lahan_alamat_rw"
                      v-model="lahan.alamat_rw"
                      @input="validateAndEmitLahan"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="001"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="lahan_kode_pos"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Kode Pos <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lahan_kode_pos"
                      v-model="lahan.kode_pos"
                      @input="validateAndEmitLahan"
                      maxlength="5"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="12345"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="lahan_wilayah_kelurahan"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Kelurahan <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lahan_wilayah_kelurahan"
                      v-model="lahan.wilayah_kelurahan"
                      @input="validateAndEmitLahan"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Nama kelurahan"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="lahan_wilayah_kecamatan"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Kecamatan <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lahan_wilayah_kecamatan"
                      v-model="lahan.wilayah_kecamatan"
                      @input="validateAndEmitLahan"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Nama kecamatan"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="lahan_wilayah_kota"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Kota/Kabupaten <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lahan_wilayah_kota"
                      v-model="lahan.wilayah_kota"
                      @input="validateAndEmitLahan"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Nama kota/kabupaten"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="flex justify-end">
                <div class="text-sm text-gray-500">
                  Data akan disimpan otomatis saat submit dokumen
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        v-if="message"
        class="fixed bottom-6 right-6 max-w-md p-4 rounded-lg shadow-lg z-50 transition-all duration-300"
        :class="
          message.type === 'success'
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        "
      >
        <div class="flex items-center">
          <svg
            v-if="message.type === 'success'"
            class="w-5 h-5 mr-3 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else
            class="w-5 h-5 mr-3 text-red-600"
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
          <span class="font-medium">{{ message.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed, watch } from 'vue'

const props = defineProps({
  idPengajuan: {
    type: [Number, String],
    default: null,
  },
})

const emit = defineEmits(['owner-updated', 'lahan-updated'])
const injectedIdPengajuan = inject('selectedPengajuanId', null)

const showOwnerForm = ref(false)
const showLahanForm = ref(false)
const message = ref(null)

const owner = ref({
  nik: '',
  email: '',
  phone: '',
  jenis_kelamin: 'L',
  nama: '',
  npwp: '',
  tanggal_lahir: '',
  agama: '',
  kewarganegaraan: 'Indonesia',
  alamat: '',
  pekerjaan: '',
})

const lahan = ref({
  nib: '',
  no_surat_rt: '',
  tanggal_surat_rt: '',
  tanggal_surat_pernyataan: '',
  jenis_bangunan: '',
  luas_lahan: 0,
  alamat_rt: '',
  alamat_rw: '',
  kode_pos: '',
  wilayah_kelurahan: '',
  wilayah_kecamatan: '',
  wilayah_kota: '',
})

const isOwnerValid = computed(() => {
  return (
    owner.value.nama &&
    owner.value.nik &&
    owner.value.email &&
    owner.value.phone &&
    owner.value.jenis_kelamin &&
    owner.value.tanggal_lahir &&
    owner.value.agama &&
    owner.value.kewarganegaraan &&
    owner.value.alamat &&
    owner.value.pekerjaan
  )
})

const isLahanValid = computed(() => {
  return (
    lahan.value.tanggal_surat_rt &&
    lahan.value.tanggal_surat_pernyataan &&
    lahan.value.no_surat_rt &&
    lahan.value.jenis_bangunan &&
    lahan.value.luas_lahan > 0 &&
    lahan.value.alamat_rt &&
    lahan.value.alamat_rw &&
    lahan.value.kode_pos &&
    lahan.value.wilayah_kelurahan &&
    lahan.value.wilayah_kecamatan &&
    lahan.value.wilayah_kota
  )
})

const resetForms = () => {
  owner.value = {
    nik: '',
    email: '',

    phone: '',
    jenis_kelamin: 'L',
    nama: '',
    npwp: '',
    tanggal_lahir: '',
    agama: '',
    kewarganegaraan: 'Indonesia',
    alamat: '',
    pekerjaan: '',
  }
  lahan.value = {
    no_surat_rt: '',
    nib: '',
    tanggal_surat_rt: '',
    tanggal_surat_pernyataan: '',
    jenis_bangunan: '',
    luas_lahan: 0,
    alamat_rt: '',
    alamat_rw: '',
    kode_pos: '',
    wilayah_kelurahan: '',
    wilayah_kecamatan: '',
    wilayah_kota: '',
  }
  emit('owner-updated', null)
  emit('lahan-updated', null)
}

const toggleOwnerForm = () => {
  showOwnerForm.value = !showOwnerForm.value
}

const toggleLahanForm = () => {
  showLahanForm.value = !showLahanForm.value
}

const showMessage = (type, text) => {
  message.value = { type, text }
  setTimeout(() => {
    message.value = null
  }, 5000)
}

const validateAndEmitOwner = () => {
  if (isOwnerValid.value) {
    emit('owner-updated', { ...owner.value })
  } else {
    emit('owner-updated', null)
  }
}

const validateAndEmitLahan = () => {
  if (isLahanValid.value) {
    emit('lahan-updated', { ...lahan.value })
  } else {
    emit('lahan-updated', null)
  }
}

const submitOwner = async () => {
  if (isOwnerValid.value) {
    showMessage('success', 'Data pemilik telah divalidasi dan siap disimpan!')
    validateAndEmitOwner()
  } else {
    showMessage('error', 'Harap lengkapi semua field yang wajib diisi.')
  }
}

const submitLahan = async () => {
  if (isLahanValid.value) {
    showMessage('success', 'Data lahan telah divalidasi dan siap disimpan!')
    validateAndEmitLahan()
  } else {
    showMessage('error', 'Harap lengkapi semua field yang wajib diisi.')
  }
}

// Watcher untuk reset form ketika idPengajuan berubah
watch(
  () => props.idPengajuan || injectedIdPengajuan?.value,
  (newId) => {
    if (!newId) {
      resetForms()
    }
  },
  { immediate: true },
)
</script>

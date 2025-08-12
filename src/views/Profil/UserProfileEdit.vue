<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-light text-gray-900 tracking-wide">Edit Profil</h1>
        <div class="mt-2 h-px w-24 bg-gray-300 mx-auto"></div>
      </div>

      <div v-if="loadingProfile" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-900"
        ></div>
        <p class="mt-4 text-gray-600 font-light">Memuat data profil...</p>
      </div>

      <form v-else @submit.prevent="submitProfileUpdate" class="space-y-8">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center space-x-6">
            <div class="relative">
              <img
                :src="form.profile_picture || 'https://via.placeholder.com/150'"
                alt="Profile Preview"
                class="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
              />
              <div
                class="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full ring-2 ring-white flex items-center justify-center"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
              <svg
                class="w-4 h-4 text-blue-600"
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
            </div>
            Informasi Personal
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label for="nama_lengkap" class="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nama_lengkap"
                v-model="form.nama_lengkap"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                :class="{ 'border-red-300 focus:ring-red-500': errors.nama_lengkap }"
                placeholder="Masukkan nama lengkap"
              />
              <p v-if="errors.nama_lengkap" class="mt-2 text-sm text-red-600 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
                {{ errors.nama_lengkap }}
              </p>
            </div>

            <div>
              <label for="tempat_lahir" class="block text-sm font-medium text-gray-700 mb-2">
                Tempat Lahir <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="tempat_lahir"
                v-model="form.tempat_lahir"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                :class="{ 'border-red-300 focus:ring-red-500': errors.tempat_lahir }"
                placeholder="Masukkan tempat lahir"
              />
              <p v-if="errors.tempat_lahir" class="mt-2 text-sm text-red-600 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
                {{ errors.tempat_lahir }}
              </p>
            </div>

            <div>
              <label for="tanggal_lahir" class="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Lahir <span class="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="tanggal_lahir"
                v-model="form.tanggal_lahir"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                :class="{ 'border-red-300 focus:ring-red-500': errors.tanggal_lahir }"
              />
              <p v-if="errors.tanggal_lahir" class="mt-2 text-sm text-red-600 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
                {{ errors.tanggal_lahir }}
              </p>
            </div>

            <div>
              <label for="jenis_kelamin" class="block text-sm font-medium text-gray-700 mb-2">
                Jenis Kelamin <span class="text-red-500">*</span>
              </label>
              <select
                id="jenis_kelamin"
                v-model="form.jenis_kelamin"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-white"
                :class="{ 'border-red-300 focus:ring-red-500': errors.jenis_kelamin }"
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
              <p v-if="errors.jenis_kelamin" class="mt-2 text-sm text-red-600 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
                {{ errors.jenis_kelamin }}
              </p>
            </div>

            <div>
              <label for="agama" class="block text-sm font-medium text-gray-700 mb-2">
                Agama
              </label>
              <input
                type="text"
                id="agama"
                v-model="form.agama"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                placeholder="Masukkan agama"
              />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <div class="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mr-3">
              <svg
                class="w-4 h-4 text-green-600"
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
            Identitas & Kontak
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="kewarganegaraan" class="block text-sm font-medium text-gray-700 mb-2">
                Kewarganegaraan
              </label>
              <input
                type="text"
                id="kewarganegaraan"
                v-model="form.kewarganegaraan"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                placeholder="Masukkan kewarganegaraan"
              />
            </div>

            <div>
              <label for="no_ktp_sktld" class="block text-sm font-medium text-gray-700 mb-2">
                No. KTP/SKTLD
              </label>
              <input
                type="text"
                id="no_ktp_sktld"
                v-model="form.no_ktp_sktld"
                maxlength="16"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                :class="{ 'border-red-300 focus:ring-red-500': errors.no_ktp_sktld }"
                placeholder="Masukkan nomor KTP/SKTLD"
              />
              <p v-if="errors.no_ktp_sktld" class="mt-2 text-sm text-red-600 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
                {{ errors.no_ktp_sktld }}
              </p>
            </div>

            <div>
              <label for="pekerjaan" class="block text-sm font-medium text-gray-700 mb-2">
                Pekerjaan
              </label>
              <input
                type="text"
                id="pekerjaan"
                v-model="form.pekerjaan"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                placeholder="Masukkan pekerjaan"
              />
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                Telepon
              </label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                placeholder="Masukkan nomor telepon"
              />
            </div>

            <div class="md:col-span-2">
              <label for="alamat_lengkap" class="block text-sm font-medium text-gray-700 mb-2">
                Alamat Lengkap
              </label>
              <textarea
                id="alamat_lengkap"
                v-model="form.alamat_lengkap"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Masukkan alamat lengkap"
              ></textarea>
            </div>
          </div>
        </div>

        <div
          v-if="errorMessage"
          class="bg-white border-l-4 border-red-500 rounded-xl p-6 shadow-sm"
        >
          <div class="flex items-center">
            <div class="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-4">
              <svg
                class="w-5 h-5 text-red-600"
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
            </div>
            <div>
              <h4 class="text-red-800 font-semibold">Terjadi Kesalahan</h4>
              <p class="text-red-700 mt-1">{{ errorMessage }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
          <button
            type="button"
            @click="$emit('cancel-edit')"
            class="w-full sm:w-auto px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-sm hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            <div
              v-if="loading"
              class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
            ></div>
            <svg
              v-if="!loading"
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {{ loading ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
        </div>
      </form>
    </div>

    <div
      v-if="showEditSuccessModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100 opacity-100"
      >
        <div class="p-8 text-center">
          <div
            class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <SquareCheckBig class="w-8 h-8 text-green-600" />
          </div>

          <h3 class="text-2xl font-bold text-slate-800 mb-4">Edit Berhasil!</h3>
          <p class="text-slate-600 mb-8">Profil Anda telah berhasil diperbarui.</p>

          <button
            @click="closeEditSuccessModal"
            class="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { SquareCheckBig } from 'lucide-vue-next' // Impor ikon yang Anda inginkan

const props = defineProps({
  initialProfile: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['profile-updated', 'cancel-edit'])

const form = ref({
  nama_lengkap: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  jenis_kelamin: '',
  agama: '',
  kewarganegaraan: 'Indonesia', // Default value
  no_ktp_sktld: '',
  alamat_lengkap: '',
  pekerjaan: '',
  phone: '',
  profile_picture: '',
})

const loading = ref(false)
const loadingProfile = ref(false)
const errorMessage = ref('')
const successMessage = ref('') // Keep this for setting, but modal will display it
const errors = ref({})
const showEditSuccessModal = ref(false) // State baru untuk modal sukses edit

// Function to fetch profile data from API
const fetchProfile = async () => {
  loadingProfile.value = true
  errorMessage.value = ''

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token tidak ditemukan')
    }

    const response = await axios.get('https://bitwize.cloud/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.data && response.data.user) {
      const profileData = response.data.user
      form.value = {
        nama_lengkap: profileData.nama_lengkap || '',
        tempat_lahir: profileData.tempat_lahir || '',
        tanggal_lahir: profileData.tanggal_lahir ? profileData.tanggal_lahir.split('T')[0] : '', // Format for input type="date"
        jenis_kelamin: profileData.jenis_kelamin || '',
        agama: profileData.agama || '',
        kewarganegaraan: profileData.kewarganegaraan || 'Indonesia',
        no_ktp_sktld: profileData.no_ktp_sktld || '',
        alamat_lengkap: profileData.alamat_lengkap || '',
        pekerjaan: profileData.pekerjaan || '',
        phone: profileData.phone || '',
        profile_picture: profileData.profile_picture || '',
      }
    }
  } catch (err) {
    console.error('Failed to fetch profile:', err)
    errorMessage.value =
      err.response?.data?.message || err.message || 'Gagal memuat data profil. Silakan coba lagi.'
  } finally {
    loadingProfile.value = false
  }
}

const submitProfileUpdate = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  errors.value = {}
  showEditSuccessModal.value = false // Pastikan modal tersembunyi sebelum mencoba update

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token tidak ditemukan')
    }

    const payload = { ...form.value }
    // Convert empty strings to null for optional fields
    for (const key in payload) {
      if (payload[key] === '') {
        payload[key] = null
      }
    }

    const response = await axios.patch('https://bitwize.cloud/api/profile', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    successMessage.value = response.data.message || 'Profil berhasil diperbarui'
    emit('profile-updated', response.data.user)
    showEditSuccessModal.value = true // Tampilkan modal sukses

    // Opsional: Atur timeout untuk menyembunyikan modal setelah beberapa detik
    // setTimeout(() => {
    //   showEditSuccessModal.value = false;
    // }, 3000);
  } catch (err) {
    console.error('Failed to update profile:', err)

    if (err.response?.data?.errors) {
      // Handle validation errors
      errors.value = err.response.data.errors
    }

    errorMessage.value =
      err.response?.data?.message || err.message || 'Gagal memperbarui profil. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

const closeEditSuccessModal = () => {
  showEditSuccessModal.value = false
  successMessage.value = '' // Clear success message when modal is closed
  emit('cancel-edit') // Optional: Emit cancel-edit to go back to previous view after closing modal
}

// Watch for initialProfile prop changes (if still needed for compatibility)
watch(
  () => props.initialProfile,
  (newProfile) => {
    if (newProfile && Object.keys(newProfile).length > 0) {
      form.value = {
        nama_lengkap: newProfile.nama_lengkap || '',
        tempat_lahir: newProfile.tempat_lahir || '',
        tanggal_lahir: newProfile.tanggal_lahir ? newProfile.tanggal_lahir.split('T')[0] : '', // Format for input type="date"
        jenis_kelamin: newProfile.jenis_kelamin || '',
        agama: newProfile.agama || '',
        kewarganegaraan: newProfile.kewarganegaraan || 'Indonesia',
        no_ktp_sktld: newProfile.no_ktp_sktld || '',
        alamat_lengkap: newProfile.alamat_lengkap || '',
        pekerjaan: newProfile.pekerjaan || '',
        phone: newProfile.phone || '',
        profile_picture: newProfile.profile_picture || '',
      }
    }
  },
  { immediate: true },
)

// Fetch profile data when component is mounted
onMounted(() => {
  // Only fetch if no initial profile data is provided
  if (!props.initialProfile || Object.keys(props.initialProfile).length === 0) {
    fetchProfile()
  }
})
</script>

<style scoped></style>

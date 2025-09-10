<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Reset Password Form -->
      <div v-if="!isSubmitted" class="bg-white shadow-2xl rounded-2xl p-8 border border-slate-100">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <div
            class="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
          >
            <svg
              class="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-slate-900">Reset Password</h2>
          <p class="mt-2 text-slate-600">Buat password baru yang aman untuk akun Anda</p>
        </div>

        <form class="space-y-6" @submit.prevent="submitResetPassword">
          <!-- New Password Field -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-semibold text-slate-700">
              Password Baru
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                required
                @input="calculatePasswordStrength"
                class="block w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
                :class="{
                  'border-red-400 focus:border-red-500': errors.password,
                  'border-green-400 focus:border-green-500': formData.password && !errors.password,
                }"
                placeholder="Masukkan password baru"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-slate-600 transition-colors"
              >
                <svg
                  v-if="!showPassword"
                  class="h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
                <svg
                  v-else
                  class="h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              </button>
            </div>

            <!-- Password Strength Indicator -->
            <div v-if="formData.password" class="mt-2">
              <div class="flex items-center space-x-2">
                <div class="flex-1">
                  <div class="flex space-x-1">
                    <div
                      v-for="i in 4"
                      :key="i"
                      class="h-1.5 flex-1 rounded-full transition-all duration-300"
                      :class="{
                        'bg-red-400': passwordStrength >= i && passwordStrength <= 1,
                        'bg-yellow-400': passwordStrength >= i && passwordStrength === 2,
                        'bg-blue-400': passwordStrength >= i && passwordStrength === 3,
                        'bg-green-400': passwordStrength >= i && passwordStrength >= 4,
                        'bg-slate-200': passwordStrength < i,
                      }"
                    ></div>
                  </div>
                </div>
                <span
                  class="text-xs font-medium"
                  :class="{
                    'text-red-600': passwordStrength <= 1,
                    'text-yellow-600': passwordStrength === 2,
                    'text-blue-600': passwordStrength === 3,
                    'text-green-600': passwordStrength >= 4,
                  }"
                >
                  {{ getPasswordStrengthText() }}
                </span>
              </div>
            </div>

            <!-- Password Requirements -->
            <div v-if="formData.password" class="mt-3 space-y-1">
              <div class="flex items-center space-x-2 text-xs">
                <svg
                  class="h-3 w-3"
                  :class="formData.password.length >= 8 ? 'text-green-500' : 'text-slate-400'"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span :class="formData.password.length >= 8 ? 'text-green-700' : 'text-slate-500'">
                  Minimal 8 karakter
                </span>
              </div>
              <div class="flex items-center space-x-2 text-xs">
                <svg
                  class="h-3 w-3"
                  :class="/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-slate-400'"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span
                  :class="/[A-Z]/.test(formData.password) ? 'text-green-700' : 'text-slate-500'"
                >
                  Huruf besar
                </span>
              </div>
              <div class="flex items-center space-x-2 text-xs">
                <svg
                  class="h-3 w-3"
                  :class="/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-slate-400'"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span
                  :class="/[0-9]/.test(formData.password) ? 'text-green-700' : 'text-slate-500'"
                >
                  Angka
                </span>
              </div>
            </div>

            <p v-if="errors.password" class="mt-2 text-sm text-red-600 flex items-center space-x-1">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{{ errors.password }}</span>
            </p>
          </div>

          <!-- Confirm Password Field -->
          <div class="space-y-2">
            <label for="confirmPassword" class="block text-sm font-semibold text-slate-700">
              Konfirmasi Password Baru
            </label>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="formData.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                class="block w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all duration-200"
                :class="{
                  'border-red-400 focus:border-red-500': errors.confirmPassword,
                  'border-green-400 focus:border-green-500':
                    formData.confirmPassword &&
                    formData.password === formData.confirmPassword &&
                    !errors.confirmPassword,
                }"
                placeholder="Konfirmasi password baru"
              />
              <button
                type="button"
                @click="toggleConfirmPasswordVisibility"
                class="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-slate-600 transition-colors"
              >
                <svg
                  v-if="!showConfirmPassword"
                  class="h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
                <svg
                  v-else
                  class="h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              </button>
            </div>

            <!-- Password Match Indicator -->
            <div v-if="formData.confirmPassword" class="mt-2">
              <div
                v-if="formData.password === formData.confirmPassword"
                class="flex items-center space-x-2 text-xs text-green-600"
              >
                <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Password cocok</span>
              </div>
              <div v-else class="flex items-center space-x-2 text-xs text-red-600">
                <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>Password tidak cocok</span>
              </div>
            </div>

            <p
              v-if="errors.confirmPassword"
              class="mt-2 text-sm text-red-600 flex items-center space-x-1"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{{ errors.confirmPassword }}</span>
            </p>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-xl p-4">
            <div class="flex items-start space-x-3">
              <svg
                class="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 class="text-sm font-semibold text-red-800">Terjadi Kesalahan</h4>
                <p class="text-sm text-red-700 mt-1">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading || !isFormValid()"
            class="w-full flex justify-center items-center py-3 px-4 border-2 border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            :class="{ 'animate-pulse': isLoading }"
          >
            <div v-if="isLoading" class="flex items-center space-x-2">
              <div
                class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></div>
              <span>Memproses...</span>
            </div>
            <div v-else class="flex items-center space-x-2">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Reset Password</span>
            </div>
          </button>
        </form>
      </div>

      <!-- Success State -->
      <div
        v-if="isSubmitted && status === 'success'"
        class="bg-white shadow-2xl rounded-2xl p-8 border border-slate-100 text-center"
      >
        <div
          class="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6"
        >
          <svg
            class="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-900 mb-3">Password Berhasil Direset!</h2>
        <p class="text-slate-600 mb-6">
          {{
            successMessage ||
            'Password Anda berhasil diperbarui. Silakan login dengan password baru Anda.'
          }}
        </p>
        <router-link
          to="/login"
          class="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          <span>Lanjutkan ke Halaman Login</span>
        </router-link>
      </div>

      <!-- Error State (Invalid Token) -->
      <div
        v-if="status === 'invalid_token'"
        class="bg-white shadow-2xl rounded-2xl p-8 border border-slate-100 text-center"
      >
        <div
          class="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6"
        >
          <svg class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-900 mb-3">Token Tidak Valid</h2>
        <p class="text-red-600 mb-6">
          {{ errorMessage || 'Link reset password sudah kadaluarsa atau tidak valid.' }}
        </p>
        <router-link
          to="/login"
          class="inline-flex items-center justify-center space-x-2 w-full px-6 py-3 text-white bg-slate-600 rounded-xl hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Kembali ke Halaman Login</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// Reactive state variables
const status = ref('form') // 'form', 'success', 'invalid_token'
const isSubmitted = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Form visibility toggles
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Password strength
const passwordStrength = ref(0)

// Form data
const formData = ref({
  password: '',
  confirmPassword: '',
})

// Form errors
const errors = ref({
  password: '',
  confirmPassword: '',
})

// Get route information
const route = useRoute()
const token = ref('')

// Password visibility toggles
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

// Calculate password strength
const calculatePasswordStrength = () => {
  let strength = 0
  const password = formData.value.password

  if (password.length >= 6) strength += 1
  if (password.length >= 8) strength += 1
  if (/[A-Z]/.test(password)) strength += 1
  if (/[0-9]/.test(password)) strength += 1
  if (/[^A-Za-z0-9]/.test(password)) strength += 1

  passwordStrength.value = strength
}

// Get password strength text
const getPasswordStrengthText = () => {
  switch (passwordStrength.value) {
    case 0:
    case 1:
      return 'Lemah'
    case 2:
      return 'Sedang'
    case 3:
      return 'Kuat'
    case 4:
    case 5:
      return 'Sangat Kuat'
    default:
      return 'Lemah'
  }
}

// Check if form is valid
const isFormValid = () => {
  return (
    formData.value.password.length >= 6 &&
    formData.value.password === formData.value.confirmPassword &&
    formData.value.confirmPassword !== ''
  )
}

// Form validation
const validateForm = () => {
  errors.value = {
    password: '',
    confirmPassword: '',
  }

  let isValid = true

  // Validate password length
  if (formData.value.password.length < 6) {
    errors.value.password = 'Password minimal 6 karakter'
    isValid = false
  }

  // Validate password confirmation
  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Konfirmasi password tidak cocok'
    isValid = false
  }

  if (!formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Konfirmasi password wajib diisi'
    isValid = false
  }

  return isValid
}

// Submit reset password form
const submitResetPassword = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    // Call API to reset password
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password/${token.value}`,
      {
        password: formData.value.password,
        confirmPassword: formData.value.confirmPassword,
      },
    )

    // Success
    status.value = 'success'
    isSubmitted.value = true
    successMessage.value =
      response.data.message ||
      'Password Anda berhasil direset. Silakan login dengan password baru Anda.'
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message || 'Terjadi kesalahan saat mereset password.'

      // Check if token is invalid/expired
      if (error.response.status === 400 || error.response.status === 404) {
        status.value = 'invalid_token'
        isSubmitted.value = true
      }
    } else {
      errorMessage.value = 'Terjadi kesalahan yang tidak diketahui.'
    }
  } finally {
    isLoading.value = false
  }
}

// Check token validity on component mount
onMounted(() => {
  token.value = route.params.token
  if (!token.value) {
    status.value = 'invalid_token'
    isSubmitted.value = true
    errorMessage.value = 'Token reset password tidak ditemukan di URL.'
  }
})
</script>

<style scoped>
/* Custom animations and transitions handled by Tailwind classes */
</style>

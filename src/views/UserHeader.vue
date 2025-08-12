<template>
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
            @click="pengajuan"
            class="inline-flex items-center justify-center px-4 py-2.5 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Pengajuan
          </button>

          <button
            @click="DataLengkap"
            class="inline-flex items-center justify-center px-4 py-2.5 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Profile Pengguna
          </button>

          <button
            @click="kelengkapan"
            class="inline-flex items-center justify-center px-4 py-2.5 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Pengantar RT
          </button>

          <button
            @click="download"
            class="inline-flex items-center justify-center px-4 py-2.5 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 text-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Format Dokumen
          </button>

          <button
            @click="logout"
            class="inline-flex items-center justify-center px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
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
            <span class="sr-only">{{
              isMobileMenuOpen ? 'Close main menu' : 'Open main menu'
            }}</span>
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
            <svg v-else class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <div class="pb-4">
        <p class="text-slate-600 text-center lg:text-left text-sm">
          Welcome back,
          <span class="font-semibold text-slate-800"
            >{{ authStore.user?.username || 'User' }}!</span
          >
        </p>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="isMobileMenuOpen"
        class="lg:hidden border-t border-slate-200 bg-white"
        id="mobile-menu"
      >
        <div class="px-4 py-3 space-y-2">
          <button
            @click="
              () => {
                pengajuan()
                closeMobileMenu()
              }
            "
            class="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors duration-200 flex items-center space-x-3 font-medium"
          >
            <svg
              class="w-5 h-5 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Pengajuan</span>
          </button>

          <button
            @click="
              () => {
                DataLengkap()
                closeMobileMenu()
              }
            "
            class="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors duration-200 flex items-center space-x-3 font-medium"
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
            <span>Profile Pengguna</span>
          </button>

          <button
            @click="
              () => {
                kelengkapan()
                closeMobileMenu()
              }
            "
            class="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors duration-200 flex items-center space-x-3 font-medium"
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
            <span>Pengantar RT</span>
          </button>

          <button
            @click="
              () => {
                download()
                closeMobileMenu()
              }
            "
            class="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors duration-200 flex items-center space-x-3 font-medium"
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
            <span>Format Dokumen</span>
          </button>

          <div class="pt-2 border-t border-slate-200">
            <button
              @click="
                () => {
                  logout()
                  closeMobileMenu()
                }
              "
              class="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors duration-200 flex items-center space-x-3 font-medium"
            >
              <svg
                class="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const pengajuan = () => {
  router.push('/user/dashboard')
}

const DataLengkap = () => {
  router.push('/user-profile')
}

const kelengkapan = () => {
  const id = localStorage.getItem('id')
  router.push(`/user/kelengkapan/${id}`)
}

const download = () => {
  router.push('/download-template')
}

const logout = () => {
  authStore.logout()
}
</script>

<style scoped>
/* Optional: Add any custom styles here */
</style>

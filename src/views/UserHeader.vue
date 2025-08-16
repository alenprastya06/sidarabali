<script setup>
import { ref, defineEmits, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const route = useRoute()

const props = defineProps({
  navigationItems: {
    type: Array,
    default: () => [
      { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home', active: true },
      { id: 'berkas-saya', label: 'Berkas Saya', icon: 'fas fa-folder', active: false },
      { id: 'akun-saya', label: 'Akun Saya', icon: 'fas fa-user', active: false },
    ],
  },
})

const emit = defineEmits(['tab-change', 'create-request'])
const isMobileMenuOpen = ref(false)

const userProfile = ref({
  username: 'Memuat...',
})

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('Token tidak ditemukan. Mohon login ulang.')
      return
    }

    const response = await axios.get('http://localhost:3001/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    userProfile.value = response.data.user
  } catch (error) {
    console.error('Gagal mengambil data profil:', error)
    userProfile.value.username = 'Gagal memuat'
  }
}

onMounted(() => {
  fetchUserProfile()
})

const setActiveTab = (tabId) => {
  router.push(`/user/${tabId}`)
  emit('tab-change', tabId)
  isMobileMenuOpen.value = false
}

const createNewRequest = () => {
  router.push('/user/halaman-permohonan')
  isMobileMenuOpen.value = false
}

const goToPemilikDokumen = () => {
  router.push('/user/pemilik-dokumen')
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('id')
  router.push('/')
}

// Fixed isActiveTab function
const isActiveTab = (itemId) => {
  // Handle exact route matching
  const expectedPath = `/user/${itemId}`
  return route.path === expectedPath || route.name === itemId
}
</script>

<template>
  <nav class="bg-white shadow-md border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="hidden md:flex justify-between items-center h-16">
        <div class="flex items-center">
          <span class="text-xl font-bold text-orange-600 mr-8">SIDARABALI</span>
        </div>

        <div class="flex-grow flex justify-center">
          <div class="flex space-x-2">
            <button
              v-for="item in navigationItems"
              :key="item.id"
              @click="setActiveTab(item.id)"
              :class="[
                'flex items-center px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200',
                isActiveTab(item.id)
                  ? 'bg-orange-600 text-white shadow-md hover:bg-orange-700'
                  : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900',
              ]"
            >
              <i :class="item.icon" class="mr-2"></i>
              {{ item.label }}
            </button>
          </div>
        </div>

        <div class="flex items-center space-x-4 ml-8">
          <button
            @click="createNewRequest"
            class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 flex items-center shadow"
          >
            <i class="fas fa-plus mr-2"></i>
            Buat Permohonan Baru
          </button>

          <div class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
            {{ userProfile.username }}
          </div>
          <button
            @click="handleLogout"
            class="text-red-600 px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 flex items-center shadow"
            title="Logout"
          >
            <i class="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
        </div>
      </div>

      <div class="md:hidden">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <span class="text-xl font-bold text-orange-600">SIDARABALI</span>
          </div>
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-colors duration-200"
            :aria-expanded="isMobileMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              :class="{ hidden: isMobileMenuOpen, block: !isMobileMenuOpen }"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
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
            <svg
              :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
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
        <div
          :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
          class="border-t border-gray-200 bg-white"
        >
          <div class="px-2 pt-2 pb-3 space-y-1">
            <button
              v-for="item in navigationItems"
              :key="item.id"
              @click="setActiveTab(item.id)"
              :class="[
                'flex items-center w-full px-3 py-3 rounded-md text-base font-medium transition-colors duration-200',
                isActiveTab(item.id)
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900',
              ]"
            >
              <i :class="item.icon" class="mr-3 w-5"></i>
              {{ item.label }}
            </button>
          </div>
          <div class="pt-4 pb-3 border-t border-gray-200">
            <div class="px-2 space-y-1">
              <button
                @click="createNewRequest"
                class="flex items-center w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-3 rounded-md text-base font-semibold transition-colors duration-200 shadow"
              >
                <i class="fas fa-plus mr-3 w-5"></i>
                Buat Permohonan Baru
              </button>
              <button
                @click="goToPemilikDokumen"
                class="flex items-center w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-3 rounded-md text-base font-semibold transition-colors duration-200 shadow"
              >
                <i class="fas fa-file-alt mr-3 w-5"></i>
                Buat Pengajuan
              </button>
              <button
                @click="handleLogout"
                class="flex items-center w-full bg-red-500 hover:bg-red-600 text-white px-3 py-3 rounded-md text-base font-semibold transition-colors duration-200 shadow"
              >
                <i class="fas fa-sign-out-alt mr-3 w-5"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

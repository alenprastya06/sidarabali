<script setup>
import { ref, onMounted } from 'vue'
import UserHeader from './UserHeader.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeTab = ref('dashboard')
const loading = ref(false)
const error = ref(null)
const userStats = ref(null)

const menuItems = ref([
  {
    id: '/user/halaman-permohonan',
    title: 'Permohonan Baru',
    subtitle: 'Buat permohonan izin baru',
    icon: 'fas fa-plus-circle',
    color: 'green',
    featured: false,
  },
  {
    id: '/user/pengajuan-proses',
    title: 'Sedang Diproses',
    subtitle: 'Izin yang sedang dalam proses',
    icon: 'fas fa-clock',
    color: 'yellow',
    featured: false,
  },
  {
    id: '/user/izin-selesai',
    title: 'Izin Selesai',
    subtitle: 'Izin yang telah selesai diproses',
    icon: 'fas fa-check-circle',
    color: 'green',
    featured: false,
  },
  {
    id: '/user/izin-butuh-tindakan',
    title: 'Butuh Tindakan',
    subtitle: 'Izin yang memerlukan tindak lanjut',
    icon: 'fas fa-exclamation-circle',
    color: 'orange',
    featured: false,
  },
  {
    id: '/user/izin-ditolak',
    title: 'Izin Ditolak',
    subtitle: 'Permohonan yang tidak dapat diproses',
    icon: 'fas fa-times-circle',
    color: 'red',
    featured: false,
  },
])

const statisticItems = ref([
  // Statistics API removed - keeping empty for future use
])

const getAuthToken = () => {
  return localStorage.getItem('token')
}

const getUserId = () => {
  return localStorage.getItem('id')
}

const fetchUserStats = async () => {
  // Statistics API removed - keeping function for future implementation
  loading.value = false
  error.value = null
  userStats.value = null
  console.log('Statistics API removed')
}

const refreshStats = () => {
  fetchUserStats()
}

const colorVariants = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-50',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
    hover: 'hover:bg-green-50',
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    hover: 'hover:bg-yellow-50',
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-200',
    hover: 'hover:bg-orange-50',
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-200',
    hover: 'hover:bg-red-50',
  },
  gray: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-50',
  },
}

const handleTabChange = (tabId) => {
  activeTab.value = tabId
  console.log(`Tab aktif berubah ke: ${tabId}`)
}

const handleCreateRequest = () => {
  router.push('/user/halaman-permohonan')
}

const handleMenuClick = (menuId) => {
  console.log(`Menu diklik: ${menuId}`)

  // Validasi sebelum navigasi
  if (!menuId || typeof menuId !== 'string') {
    console.error('Invalid menu ID:', menuId)
    return
  }

  try {
    router.push(menuId)
  } catch (err) {
    console.error('Navigation error:', err)
    error.value = 'Gagal melakukan navigasi. Silakan coba lagi.'
  }
}

const getColorClass = (color, type) => {
  return colorVariants[color] ? colorVariants[color][type] : colorVariants.gray[type]
}

const handleRetry = () => {
  error.value = null
  fetchUserStats()
}

// Navigation items untuk UserHeader jika diperlukan
const navigationItems = ref([
  { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home', active: true },
  { id: 'berkas-saya', label: 'Berkas Saya', icon: 'fas fa-folder', active: false },
  { id: 'akun-saya', label: 'Akun Saya', icon: 'fas fa-user', active: false },
])

onMounted(() => {
  // Set active tab berdasarkan route
  const currentPath = route.path
  if (currentPath === '/user/dashboard') {
    activeTab.value = 'dashboard'
  }

  // fetchUserStats() removed since stats API is no longer used
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <UserHeader
      :navigationItems="navigationItems"
      @tab-change="handleTabChange"
      @create-request="handleCreateRequest"
    />

    <main class="max-w-7xl mx-auto p-6">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-gray-900 mb-2 mt-5">
              Selamat Datang di Dashboard Perizinan
            </h1>
            <p class="text-gray-600">Kelola semua permohonan izin Anda dengan mudah dan efisien</p>
          </div>

          <!-- Refresh Button - Hidden since no stats API -->
          <button
            v-if="false"
            @click="refreshStats"
            :disabled="loading"
            class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <i :class="['fas fa-sync-alt', { 'fa-spin': loading }]"></i>
            <span>{{ loading ? 'Memuat...' : 'Refresh' }}</span>
          </button>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
              <span class="text-red-700">{{ error }}</span>
            </div>
            <button
              @click="handleRetry"
              class="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>

      <!-- Featured Menu Items (if any) -->
      <div
        v-for="item in menuItems.filter((item) => item.featured)"
        :key="item.id"
        class="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg cursor-pointer transform hover:scale-[1.02] transition-all duration-300 featured-card"
        @click="handleMenuClick(item.id)"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div
              class="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-6 text-2xl"
            >
              <i :class="item.icon"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold mb-1">{{ item.title }}</h2>
              <p class="text-blue-100">{{ item.subtitle }}</p>
            </div>
          </div>
          <div class="text-3xl">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>

      <!-- Menu Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div
          v-for="item in menuItems.filter((item) => !item.featured)"
          :key="item.id"
          class="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300 border border-gray-200"
          :class="getColorClass(item.color, 'hover')"
          @click="handleMenuClick(item.id)"
        >
          <div class="flex items-center justify-center mb-4">
            <div
              class="w-14 h-14 rounded-lg flex items-center justify-center text-xl"
              :class="[getColorClass(item.color, 'bg'), getColorClass(item.color, 'text')]"
            >
              <i :class="item.icon"></i>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 text-center mb-2">{{ item.title }}</h3>
          <p class="text-sm text-gray-600 text-center">{{ item.subtitle }}</p>
        </div>
      </div>

      <!-- Statistics Grid - Hidden since no stats API -->
      <div v-if="false" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="stat in statisticItems"
          :key="stat.id"
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
        >
          <!-- Loading Overlay -->
          <div
            v-if="loading"
            class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center"
          >
            <i class="fas fa-sync-alt fa-spin text-gray-400 text-xl"></i>
          </div>

          <div class="flex items-center">
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center mr-4 text-xl"
              :class="[getColorClass(stat.color, 'bg'), getColorClass(stat.color, 'text')]"
            >
              <i :class="stat.icon"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900 transition-all duration-300">
                {{ stat.value }}
              </p>
              <p class="text-sm text-gray-600">{{ stat.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State jika tidak ada statistik -->
      <div v-if="false && !loading && !error && userStats === null" class="text-center py-12">
        <i class="fas fa-chart-bar text-gray-400 text-4xl mb-4"></i>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">Belum Ada Data Statistik</h3>
        <p class="text-gray-500">Mulai buat permohonan untuk melihat statistik Anda</p>
        <button
          @click="handleMenuClick('/user/halaman-permohonan')"
          class="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
        >
          Buat Permohonan Pertama
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animation untuk featured card */
@keyframes pulse-subtle {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.005);
  }
}

.featured-card {
  animation: pulse-subtle 3s ease-in-out infinite;
}

/* Loading animation */
.fa-spin {
  animation: fa-spin 1s infinite linear;
}

@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Minimalist Dark -->
    <aside
      class="w-20 hover:w-80 bg-gray-900 flex-shrink-0 shadow-2xl border-r border-gray-800 transition-all duration-500 ease-in-out group overflow-hidden"
    >
      <!-- Logo Section -->
      <div class="p-6 border-b border-gray-800">
        <div class="flex items-center space-x-4">
          <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span class="text-white font-bold text-sm">J</span>
          </div>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <h2 class="text-lg font-bold text-white">SIDARABALI</h2>
            <p class="text-gray-400 text-xs">Sistem Pemerintahan</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-2">
        <router-link
          to="/admin/dashboard"
          class="group-nav flex items-center py-3 px-3 text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 rounded-xl relative"
          active-class="text-white bg-red-600 hover:bg-red-700"
        >
          <Home :size="20" class="flex-shrink-0" />
          <span
            class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap"
          >
            Dashboard
          </span>
          <div
            class="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-r-full transform scale-y-0 group-nav-hover:scale-y-100 transition-transform duration-200"
          ></div>
        </router-link>

        <router-link
          to="/admin/dokument"
          class="group-nav flex items-center py-3 px-3 text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 rounded-xl relative"
          active-class="text-white bg-red-600 hover:bg-red-700"
        >
          <FileText :size="20" class="flex-shrink-0" />
          <span
            class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap"
          >
            Pengajuan Pending
          </span>
          <span
            class="ml-auto bg-yellow-500 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
          >
            Baru
          </span>
        </router-link>

        <router-link
          to="/admin/dokument-approve"
          class="group-nav flex items-center py-3 px-3 text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 rounded-xl relative"
          active-class="text-white bg-red-600 hover:bg-red-700"
        >
          <CheckCircle :size="20" class="flex-shrink-0" />
          <span
            class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap"
          >
            Pengajuan Approve
          </span>
          <span
            class="ml-auto bg-green-500 text-green-900 text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
          >
            ✓
          </span>
        </router-link>

        <router-link
          to="/admin/surat"
          class="group-nav flex items-center py-3 px-3 text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 rounded-xl relative"
          active-class="text-white bg-red-600 hover:bg-red-700"
        >
          <Download :size="20" class="flex-shrink-0" />
          <span
            class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap"
          >
            Generate Surat Ke User
          </span>
        </router-link>
        <router-link
          to="/admin/list-surat"
          class="group-nav flex items-center py-3 px-3 text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 rounded-xl relative"
          active-class="text-white bg-red-600 hover:bg-red-700"
        >
          <FileText :size="20" class="flex-shrink-0" />
          <span
            class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 whitespace-nowrap"
          >
            List Semua Surat
          </span>
        </router-link>
      </nav>

      <!-- User Profile Section -->
      <div
        class="absolute bottom-4 left-4 right-4 bg-gray-800 rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <span class="text-white font-bold text-xs">
              {{ authStore.user?.username?.charAt(0).toUpperCase() }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white font-medium text-sm truncate">{{ authStore.user?.username }}</p>
            <p class="text-gray-400 text-xs truncate">Administrator</p>
          </div>
          <button
            @click="authStore.logout"
            class="p-1.5 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 text-white"
          >
            <LogOut :size="14" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 px-8 py-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ currentRouteName }}</h1>
            <p class="text-gray-600 mt-1">Kelola sistem pemerintahan dengan efisien</p>
          </div>
          <button
            @click="authStore.logout"
            class="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <LogOut :size="16" />
            <span class="font-medium">Logout</span>
          </button>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
        <div class="w-full mx-auto">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Home, FileText, CheckCircle, Download, LogOut, Clock, ChevronRight } from 'lucide-vue-next'

const authStore = useAuthStore()
const route = useRoute()

const currentRouteName = computed(() => {
  return route.meta.title || 'Admin Panel'
})
</script>

<style scoped>
/* Custom animations */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

/* Hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:bg-white\/30 {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>

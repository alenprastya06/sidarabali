  <template>
    <div class="flex h-screen bg-gray-100">
      <aside class="w-64 bg-gray-800 text-white flex-shrink-0 shadow-lg">
        <div class="p-6 text-2xl font-bold text-center border-b border-gray-700">Admin Panel</div>
        <nav class="mt-6 space-y-2">
          <router-link
            to="/admin/dashboard"
            class="flex items-center py-3 px-6 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 rounded-md mx-3"
            active-class="bg-gray-700 text-white border-l-4 border-blue-500 font-semibold"
          >
            <Home :size="20" class="mr-3 flex-shrink-0" />
            Dashboard
          </router-link>

          <router-link
            to="/admin/surat"
            class="flex items-center py-3 px-6 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 rounded-md mx-3"
            active-class="bg-gray-700 text-white border-l-4 border-blue-500 font-semibold"
          >
            <FileText :size="20" class="mr-3 flex-shrink-0" />
            List Surat
          </router-link>
          <router-link
            to="/admin/dokument"
            class="flex items-center py-3 px-6 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 rounded-md mx-3"
            active-class="bg-gray-700 text-white border-l-4 border-blue-500 font-semibold"
          >
            <FileText :size="20" class="mr-3 flex-shrink-0" />
            List
          </router-link>
        </nav>
      </aside>

      <div class="flex-1 flex flex-col overflow-hidden">
        <header class="flex justify-between items-center p-6 bg-white shadow-md">
          <h1 class="text-2xl font-extrabold text-gray-900">
            {{ currentRouteName }}
          </h1>
          <div class="flex items-center space-x-4">
            <p class="text-lg text-gray-700">
              Welcome, <span class="font-semibold">{{ authStore.user?.username }}</span
              >!
            </p>
            <button
              @click="authStore.logout"
              class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>
        </header>

        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <router-view />
        </main>
      </div>
    </div>
  </template>

  <script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useAuthStore } from '../stores/auth'

  import { Home, FileText } from 'lucide-vue-next'

  const authStore = useAuthStore()
  const route = useRoute()

  const currentRouteName = computed(() => {
    return route.meta.title || 'Admin Panel'
  })
  </script>

  <style scoped>
  .router-link-active {
    padding-left: calc(1.5rem - 4px);
  }
  </style>

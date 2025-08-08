<template>
  <div
    class="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow duration-300"
  >
    <div class="flex items-center mb-6">
      <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          ></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-slate-800">Progress Pengajuan</h2>
    </div>

    <div class="relative">
      <div class="w-full bg-slate-200 rounded-full h-3 mb-4 overflow-hidden">
        <div
          class="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-700 ease-out relative"
          :style="{ width: `${uploadProgress}%` }"
        >
          <div class="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-slate-600 font-medium">
          {{ uploadedCount }} dari {{ totalCount }} dokumen wajib
        </p>
        <span class="text-2xl font-bold text-blue-600">{{ uploadProgress }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  uploadProgress: Number,
  uploadedCount: Number,
  totalCount: Number,
})
</script>

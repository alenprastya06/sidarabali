<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div
      class="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300"
    >
      <div class="p-8 text-center">
        <div
          class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.268 13.5C3.498 14.333 4.46 16 6.002 16z"
            ></path>
          </svg>
        </div>

        <h3 class="text-2xl font-bold text-slate-800 mb-4">Konfirmasi Hapus</h3>
        <p class="text-slate-600 mb-2">Apakah Anda yakin ingin menghapus dokumen:</p>
        <p class="font-semibold text-slate-800 mb-4">"{{ document?.file_name }}"</p>
        <p class="text-sm text-slate-500 mb-8">Tindakan ini tidak dapat dibatalkan.</p>

        <div class="flex gap-4 justify-center">
          <button
            @click="$emit('confirm')"
            class="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            :disabled="deleting"
          >
            <svg
              v-if="deleting"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
            {{ deleting ? 'Menghapus...' : 'Ya, Hapus' }}
          </button>

          <button
            @click="$emit('cancel')"
            class="inline-flex items-center px-6 py-3 bg-slate-500 hover:bg-slate-600 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            :disabled="deleting"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
</template>

<script setup>
defineProps({
  document: Object,
  deleting: Boolean,
})
defineEmits(['confirm', 'cancel'])
</script>

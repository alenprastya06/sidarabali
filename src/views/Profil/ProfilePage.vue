<template>
  <div class="container mx-auto">
    <div v-if="!isEditing">
      <UserProfileDisplay @edit-profile="startEditing" />
    </div>
    <div v-else>
      <UserProfileEdit
        :initial-profile="currentProfileData"
        @profile-updated="handleProfileUpdate"
        @cancel-edit="cancelEditing"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth.js'
import UserProfileDisplay from './UserProfileDisplay.vue'
import UserProfileEdit from './UserProfileEdit.vue'

const authStore = useAuthStore()
const isEditing = ref(false)
const currentProfileData = ref(null)

const startEditing = (profile) => {
  currentProfileData.value = profile
  isEditing.value = true
}

const handleProfileUpdate = (updatedUser) => {
  isEditing.value = false
}

const cancelEditing = () => {
  isEditing.value = false
}
</script>

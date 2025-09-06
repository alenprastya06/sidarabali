<template>
  <div id="app" class="font-sans antialiased app-container">
    <!-- Global Background Image -->
    <div class="global-background-image"></div>

    <!-- Content Overlay -->
    <div class="global-content-overlay">
      <router-view />
    </div>
  </div>
</template>

<script setup></script>

<style>
/* Global Background Styles */
.app-container {
  position: relative;
  min-height: 100vh;
}

.global-background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/kelurahan.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: -2;
}

.global-background-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Dark overlay for better text readability */
  z-index: 1;
}

.global-content-overlay {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

/* Global styles for better visibility over background */
.bg-white {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95) !important;
}

.bg-gray-50 {
  backdrop-filter: blur(5px);
  background-color: rgba(249, 250, 251, 0.8) !important;
}

/* Enhanced shadows for cards and modals */
.shadow-sm {
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.05),
    0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
}

.shadow-lg {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(255, 255, 255, 0.1) !important;
}

.shadow-xl {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.1) !important;
}

/* Text shadows for better readability */
.text-white {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* Custom scrollbar for entire app */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.8);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(203, 213, 225, 0.8);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.8);
}

/* Responsive background adjustments */
@media (max-width: 768px) {
  .global-background-image {
    background-attachment: scroll;
  }
}

/* Loading animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.global-content-overlay > * {
  animation: fadeIn 0.5s ease-out;
}
</style>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center">
      <div class="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl mb-8 animate-bounce-slow">
        <svg class="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 class="text-6xl font-bold font-display mb-4">404</h1>
      <h2 class="text-3xl font-bold mb-4">Halaman Tidak Ditemukan</h2>
      <p class="text-xl text-slate-600 mb-8 max-w-md mx-auto">
        Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin sudah dipindahkan atau dihapus.
      </p>
      <router-link to="/" class="btn btn-primary text-lg">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Kembali ke Beranda
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

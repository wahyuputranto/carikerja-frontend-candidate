<template>
  <nav class="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <router-link to="/" class="flex items-center space-x-2 group">
          <img :src="logo" alt="CariKerja Logo" class="w-10 h-10 object-contain" />
          <span class="text-xl font-bold gradient-text font-display">CariKerja</span>
        </router-link>

        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.path"
            class="text-slate-700 hover:text-primary-600 font-medium transition-colors duration-200 relative"
            :class="{ 'text-primary-600 font-semibold border-b-2 border-primary-500': isActive(item.path) }"
          >
            {{ item.name }}
          </router-link>
        </div>

        <div class="hidden md:flex items-center space-x-4">
          <template v-if="!isAuthenticated">
            <router-link to="/login" class="text-slate-700 hover:text-primary-600 font-medium transition-colors">Masuk</router-link>
            <router-link to="/register" class="btn btn-primary">Daftar Sekarang</router-link>
          </template>
          <template v-else>
            <div class="relative" ref="profileMenu">
              <button @click="showProfileMenu = !showProfileMenu" class="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/50 transition-colors">
                <span class="font-bold text-slate-800">{{ userName }}</span>
                <svg class="w-4 h-4 text-slate-600" :class="{ 'rotate-180': showProfileMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <transition name="dropdown">
                <div v-if="showProfileMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2">
                  <router-link to="/profile" class="block px-4 py-2 text-slate-700 hover:bg-gray-100 transition-colors">Profil Saya</router-link>
                  <router-link to="/applications" class="block px-4 py-2 text-slate-700 hover:bg-gray-100 transition-colors">Lamaran Saya</router-link>
                  <hr class="my-2 border-slate-200" />
                  <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">Keluar</button>
                </div>
              </transition>
            </div>
          </template>
        </div>

        <button @click="showMobileMenu = !showMobileMenu" class="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <transition name="slide-down">
      <div v-if="showMobileMenu" class="md:hidden border-t border-slate-200 bg-white/90 backdrop-blur-xl">
        <div class="px-4 py-4 space-y-3">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.path"
            @click="showMobileMenu = false"
            class="block px-4 py-2 rounded-lg text-slate-700 hover:bg-gray-100 font-medium transition-colors"
            :class="{ 'text-primary-600 font-semibold': isActive(item.path) }"
          >
            {{ item.name }}
          </router-link>
          <template v-if="!isAuthenticated">
            <router-link to="/login" @click="showMobileMenu = false" class="block px-4 py-2 rounded-lg text-slate-700 hover:bg-gray-100 font-medium transition-colors">Masuk</router-link>
            <router-link to="/register" @click="showMobileMenu = false" class="btn btn-primary w-full text-center">Daftar Sekarang</router-link>
          </template>
          <template v-else>
            <div class="px-4 py-2 text-sm font-semibold text-slate-500">Halo, {{ userName }}</div>
            <router-link to="/profile" @click="showMobileMenu = false" class="block px-4 py-2 rounded-lg text-slate-700 hover:bg-gray-100 font-medium transition-colors">Profil Saya</router-link>
            <router-link to="/applications" @click="showMobileMenu = false" class="block px-4 py-2 rounded-lg text-slate-700 hover:bg-gray-100 font-medium transition-colors">Lamaran Saya</router-link>
            <button @click="handleLogout" class="block w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors">Keluar</button>
          </template>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import logo from '@/assets/logo.png';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const showMobileMenu = ref(false);
const showProfileMenu = ref(false);
const profileMenu = ref(null);

// Ambil status auth dulu agar bisa dipakai di navigation
const isAuthenticated = computed(() => authStore.isAuthenticated);

const userName = computed(() => {
  if (!authStore.currentUser) return 'User';
  return authStore.currentUser.full_name || authStore.currentUser.email || 'User';
});

// Navigation sekarang menggunakan computed property
const navigation = computed(() => {
  // Menu dasar yang muncul untuk semua orang (publik)
  const items = [
    { name: 'Beranda', path: '/' },
    { name: 'Lowongan Kerja', path: '/jobs' },
  ];

  // Jika user SUDAH login, tambahkan menu Dashboard
  if (isAuthenticated.value) {
    items.push({ name: 'Dashboard', path: '/dashboard' });
  }

  return items;
});

const handleLogout = () => {
  authStore.logout();
  showProfileMenu.value = false;
  showMobileMenu.value = false;
  router.push('/');
};

const isActive = (path) => {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
};

const handleClickOutside = (event) => {
  if (profileMenu.value && !profileMenu.value.contains(event.target)) {
    showProfileMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
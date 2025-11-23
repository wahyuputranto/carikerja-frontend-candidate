<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 group">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="text-xl font-bold gradient-text font-display">CariKerja</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            v-for="item in navigation" 
            :key="item.name"
            :to="item.path"
            class="text-slate-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
          >
            {{ item.name }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-300"></span>
          </router-link>
        </div>

        <!-- Auth Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <template v-if="!isAuthenticated">
            <router-link to="/login" class="text-slate-700 hover:text-primary-600 font-medium transition-colors">
              Masuk
            </router-link>
            <router-link to="/register" class="btn btn-primary">
              Daftar Sekarang
            </router-link>
          </template>
          <template v-else>
            <div class="relative" ref="profileMenu">
              <button 
                @click="showProfileMenu = !showProfileMenu"
                class="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/50 transition-colors"
              >
                <span class="font-bold text-slate-800">{{ userName }}</span>
                <svg class="w-4 h-4 text-slate-600" :class="{ 'rotate-180': showProfileMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <transition name="dropdown">
                <div v-if="showProfileMenu" class="absolute right-0 mt-2 w-48 glass rounded-xl shadow-xl py-2">
                  <router-link to="/profile" class="block px-4 py-2 text-slate-700 hover:bg-white/50 transition-colors">
                    Profil Saya
                  </router-link>
                  <router-link to="/applications" class="block px-4 py-2 text-slate-700 hover:bg-white/50 transition-colors">
                    Lamaran Saya
                  </router-link>
                  <hr class="my-2 border-slate-200">
                  <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                    Keluar
                  </button>
                </div>
              </transition>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="showMobileMenu = !showMobileMenu"
          class="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-down">
      <div v-if="showMobileMenu" class="md:hidden border-t border-white/20 bg-white/90 backdrop-blur-xl">
        <div class="px-4 py-4 space-y-3">
          <router-link 
            v-for="item in navigation" 
            :key="item.name"
            :to="item.path"
            @click="showMobileMenu = false"
            class="block px-4 py-2 rounded-lg text-slate-700 hover:bg-white/50 font-medium transition-colors"
          >
            {{ item.name }}
          </router-link>
          
          <template v-if="!isAuthenticated">
            <router-link to="/login" @click="showMobileMenu = false" class="block px-4 py-2 rounded-lg text-slate-700 hover:bg-white/50 font-medium transition-colors">
              Masuk
            </router-link>
            <router-link to="/register" @click="showMobileMenu = false" class="btn btn-primary w-full text-center">
              Daftar Sekarang
            </router-link>
          </template>
          <template v-else>
            <div class="px-4 py-2 text-sm font-semibold text-slate-500">
              Halo, {{ userName }}
            </div>
            <router-link to="/profile" @click="showMobileMenu = false" class="block px-4 py-2 rounded-lg text-slate-700 hover:bg-white/50 font-medium transition-colors">
              Profil Saya
            </router-link>
            <router-link to="/applications" @click="showMobileMenu = false" class="block px-4 py-2 rounded-lg text-slate-700 hover:bg-white/50 font-medium transition-colors">
              Lamaran Saya
            </router-link>
            <button @click="handleLogout" class="block w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors">
              Keluar
            </button>
          </template>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const showMobileMenu = ref(false)
const showProfileMenu = ref(false)
const profileMenu = ref(null)

const navigation = [
  { name: 'Beranda', path: '/' },
  { name: 'Lowongan Kerja', path: '/jobs' },
  { name: 'Dashboard', path: '/dashboard' },
]

const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => {
  if (!authStore.currentUser) return 'User'
  return authStore.currentUser.full_name || authStore.currentUser.email || 'User'
})

const handleLogout = () => {
  authStore.logout()
  showProfileMenu.value = false
  showMobileMenu.value = false
  router.push('/')
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (profileMenu.value && !profileMenu.value.contains(event.target)) {
    showProfileMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
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

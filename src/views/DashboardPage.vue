<template>
  <div class="min-h-screen">
    <NavBar />
    
    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Welcome Section -->
        <div class="glass rounded-3xl p-8 mb-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold font-display mb-2">
                Selamat Datang, <span class="gradient-text">{{ userName }}</span>! 👋
              </h1>
              <p class="text-slate-600">Siap untuk melanjutkan perjalanan karirmu hari ini?</p>
            </div>
            <div class="hidden md:block">
              <img 
                :src="userPhoto" 
                alt="Profile Photo" 
                class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid md:grid-cols-4 gap-6 mb-8">
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div class="text-3xl font-bold gradient-text mb-1">12</div>
            <div class="text-sm text-slate-600">Lamaran Aktif</div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="text-3xl font-bold gradient-text mb-1">5</div>
            <div class="text-sm text-slate-600">Diterima Review</div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <div class="text-3xl font-bold gradient-text mb-1">234</div>
            <div class="text-sm text-slate-600">Profil Dilihat</div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div class="text-3xl font-bold gradient-text mb-1">89%</div>
            <div class="text-sm text-slate-600">Profil Lengkap</div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Recent Applications -->
            <div class="card">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold font-display">Lamaran Terbaru</h2>
                <router-link to="/applications" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Lihat Semua →
                </router-link>
              </div>

              <div class="space-y-4">
                <div v-for="i in 3" :key="i" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 transition-colors">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl"></div>
                      <div>
                        <h3 class="font-semibold text-slate-900">Frontend Developer</h3>
                        <p class="text-sm text-slate-600">Tech Company Indonesia</p>
                      </div>
                    </div>
                    <span class="badge badge-warning">Pending</span>
                  </div>
                  <div class="flex items-center justify-between text-sm text-slate-600">
                    <span>📅 Dilamar 2 hari lalu</span>
                    <span>💰 Rp 8-12 Juta</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recommended Jobs -->
            <div class="card">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold font-display">Rekomendasi Untukmu</h2>
                <router-link to="/jobs" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Lihat Semua →
                </router-link>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div v-for="i in 4" :key="i" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 transition-all hover:shadow-lg cursor-pointer">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg"></div>
                      <div>
                        <h3 class="font-semibold text-sm">UI/UX Designer</h3>
                        <p class="text-xs text-slate-600">Creative Studio</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between text-xs text-slate-600">
                    <span>📍 Jakarta</span>
                    <span class="badge badge-success text-xs">Remote</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-8">
            <!-- Profile Completion -->
            <div class="card">
              <h3 class="text-lg font-bold mb-4">Lengkapi Profilmu</h3>
              <div class="mb-4">
                <div class="flex items-center justify-between text-sm mb-2">
                  <span class="text-slate-600">Progress</span>
                  <span class="font-semibold gradient-text">89%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 89%"></div>
                </div>
              </div>
              <div class="space-y-3">
                <div class="flex items-center space-x-3 text-sm">
                  <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-slate-600">Informasi Dasar</span>
                </div>
                <div class="flex items-center space-x-3 text-sm">
                  <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-slate-600">Pendidikan</span>
                </div>
                <div class="flex items-center space-x-3 text-sm">
                  <div class="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span class="text-yellow-600 font-bold">!</span>
                  </div>
                  <span class="text-slate-600">Upload Dokumen</span>
                </div>
              </div>
              <router-link to="/upload-documents" class="btn btn-primary w-full mt-4">
                Lengkapi Sekarang
              </router-link>
            </div>

            <!-- Quick Actions -->
            <div class="card">
              <h3 class="text-lg font-bold mb-4">Aksi Cepat</h3>
              <div class="space-y-3">
                <router-link to="/jobs" class="flex items-center space-x-3 p-3 bg-white rounded-xl hover:bg-primary-50 transition-colors border border-slate-200">
                  <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <span class="font-medium text-slate-700">Cari Lowongan</span>
                </router-link>

                <router-link to="/profile" class="flex items-center space-x-3 p-3 bg-white rounded-xl hover:bg-primary-50 transition-colors border border-slate-200">
                  <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span class="font-medium text-slate-700">Edit Profil</span>
                </router-link>

                <router-link to="/upload-documents" class="flex items-center space-x-3 p-3 bg-white rounded-xl hover:bg-primary-50 transition-colors border border-slate-200">
                  <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <span class="font-medium text-slate-700">Upload Dokumen</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import NavBar from '@/components/layout/NavBar.vue'

const authStore = useAuthStore()

const userName = computed(() => {
  return authStore.user?.full_name || 'User'
})

const userPhoto = computed(() => {
  // Use user's photo if available, otherwise use a default Unsplash image
  return authStore.user?.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
})

const userInitials = computed(() => {
  if (!authStore.user) return 'U'
  const name = authStore.user.full_name || authStore.user.email || 'User'
  return name.charAt(0).toUpperCase()
})
</script>

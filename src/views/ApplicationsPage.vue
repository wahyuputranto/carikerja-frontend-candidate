<template>
  <div class="min-h-screen">
    <NavBar />
    
    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold font-display mb-8">
          <span class="gradient-text">Lamaran Saya</span>
        </h1>

        <!-- Filter Tabs -->
        <div class="flex space-x-2 mb-8 overflow-x-auto">
          <button 
            v-for="tab in tabs" 
            :key="tab.value"
            @click="activeTab = tab.value"
            class="px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all"
            :class="activeTab === tab.value ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' : 'bg-white/50 text-slate-600 hover:bg-white'"
          >
            {{ tab.label }}
            <span class="ml-2 px-2 py-0.5 rounded-full text-xs" :class="activeTab === tab.value ? 'bg-white/20' : 'bg-slate-200'">
              {{ tab.count }}
            </span>
          </button>
        </div>

        <!-- Applications List -->
        <div class="space-y-4">
          <div v-for="i in 5" :key="i" class="card">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="flex items-start space-x-4 flex-1">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex-shrink-0"></div>
                <div class="flex-1">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h3 class="text-xl font-bold text-slate-900 mb-1">Frontend Developer</h3>
                      <p class="text-slate-600">Tech Company Indonesia</p>
                    </div>
                  </div>
                  
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span class="badge badge-primary">Full-time</span>
                    <span class="badge badge-success">Remote</span>
                  </div>

                  <div class="flex flex-wrap gap-4 text-sm text-slate-600">
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Jakarta
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Rp 8-12 Juta
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Dilamar 2 hari lalu
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-end space-y-3">
                <span class="badge badge-warning">Pending Review</span>
                <button class="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Lihat Detail →
                </button>
              </div>
            </div>

            <!-- Progress Timeline -->
            <div class="mt-6 pt-6 border-t border-slate-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-sm font-medium text-slate-700">Lamaran Diterima</span>
                </div>
                <div class="flex-1 h-1 mx-4 bg-slate-200 rounded-full"></div>
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <div class="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  </div>
                  <span class="text-sm font-medium text-slate-700">Screening</span>
                </div>
                <div class="flex-1 h-1 mx-4 bg-slate-200 rounded-full"></div>
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                    <div class="w-3 h-3 bg-slate-400 rounded-full"></div>
                  </div>
                  <span class="text-sm text-slate-500">Interview</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <!-- <div class="text-center py-16">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full mb-6">
            <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-2">Belum Ada Lamaran</h3>
          <p class="text-slate-600 mb-6">Mulai lamar pekerjaan untuk melihat status lamaranmu di sini</p>
          <router-link to="/jobs" class="btn btn-primary">
            Cari Lowongan Kerja
          </router-link>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'

const activeTab = ref('all')

const tabs = [
  { label: 'Semua', value: 'all', count: 12 },
  { label: 'Pending', value: 'pending', count: 5 },
  { label: 'Review', value: 'review', count: 3 },
  { label: 'Interview', value: 'interview', count: 2 },
  { label: 'Diterima', value: 'accepted', count: 1 },
  { label: 'Ditolak', value: 'rejected', count: 1 },
]
</script>

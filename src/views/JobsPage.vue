<template>
  <div class="min-h-screen">
    <NavBar />
    
    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold font-display mb-4">
            Temukan <span class="gradient-text">Pekerjaan Impianmu</span>
          </h1>
          <p class="text-xl text-slate-600">Ribuan lowongan kerja menanti. Mulai pencarian sekarang!</p>
        </div>

        <!-- Search & Filter -->
        <div class="glass rounded-2xl p-6 mb-8">
          <div class="grid md:grid-cols-4 gap-4">
            <div class="md:col-span-2">
              <input
                type="text"
                placeholder="Cari posisi, perusahaan..."
                class="input"
              />
            </div>
            <div>
              <select class="input">
                <option value="">Semua Lokasi</option>
                <option value="jakarta">Jakarta</option>
                <option value="bandung">Bandung</option>
                <option value="surabaya">Surabaya</option>
              </select>
            </div>
            <div>
              <button class="btn btn-primary w-full">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Cari
              </button>
            </div>
          </div>
        </div>

        <!-- Job Listings -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
          <p class="mt-2 text-slate-600">Memuat lowongan...</p>
        </div>

        <div v-else-if="error" class="text-center py-12 text-red-600">
          {{ error }}
          <button @click="fetchJobs" class="block mx-auto mt-4 text-primary-600 hover:underline">Coba Lagi</button>
        </div>

        <div v-else class="grid lg:grid-cols-2 gap-6">
          <div v-for="job in jobs" :key="job.id" class="card-interactive">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">
                  {{ job.title.charAt(0) }}
                </div>
                <div>
                  <h3 class="text-xl font-bold text-slate-900 mb-1">{{ job.title }}</h3>
                  <p class="text-slate-600">Client ID: {{ job.client_id.substring(0, 8) }}...</p>
                </div>
              </div>
              <!-- Bookmark button (optional feature) -->
              <button class="text-slate-400 hover:text-red-500 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <div class="flex flex-wrap gap-2 mb-4">
              <span class="badge badge-primary">Quota: {{ job.quota }}</span>
              <span class="badge badge-success">{{ job.status }}</span>
            </div>

            <p class="text-slate-600 mb-4 line-clamp-2">
              {{ job.description }}
            </p>

            <div class="flex items-center justify-between text-sm text-slate-600 mb-4">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Jakarta
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ new Date(job.created_at).toLocaleDateString() }}
              </span>
            </div>

            <router-link :to="`/jobs/${job.id}`" class="btn btn-primary w-full">
              Lihat Detail & Lamar
            </router-link>
          </div>
        </div>

        <!-- Pagination (Static for now) -->
        <div class="flex items-center justify-center mt-12 space-x-2">
           <!-- ... pagination code ... -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useJobsStore } from '@/stores/jobs'
import NavBar from '@/components/layout/NavBar.vue'

const jobsStore = useJobsStore()
const { jobs, loading, error } = storeToRefs(jobsStore)
const { fetchJobs } = jobsStore

onMounted(() => {
  fetchJobs()
})
</script>

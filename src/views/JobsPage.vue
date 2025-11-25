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
          <div class="grid md:grid-cols-12 gap-4">
            <!-- Search Input -->
            <div class="md:col-span-5">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari posisi, perusahaan, atau lokasi..."
                class="input"
              />
            </div>
            
            <!-- Location Filter -->
            <div class="md:col-span-3">
              <select
                v-model="selectedLocation"
                class="input"
              >
                <option value="">Semua Lokasi</option>
                <option 
                  v-for="location in cityLocations" 
                  :key="location.id" 
                  :value="location.id"
                >
                  {{ location.name }}
                </option>
              </select>
            </div>
            
            <!-- Category Filter -->
            <div class="md:col-span-3">
              <select
                v-model="selectedCategory"
                class="input"
              >
                <option value="">Semua Kategori</option>
                <option 
                  v-for="category in categories" 
                  :key="category.id" 
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            
            <!-- Search Button -->
            <div class="md:col-span-1">
              <button class="btn btn-primary w-full h-full">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Filter Summary -->
          <div v-if="searchQuery || selectedLocation || selectedCategory" class="mt-4 flex items-center justify-between text-sm">
            <p class="text-slate-600">
              Menampilkan <span class="font-semibold text-emerald-600">{{ filteredJobs.length }}</span> lowongan
              <span v-if="searchQuery"> untuk "<span class="font-semibold">{{ searchQuery }}</span>"</span>
              <span v-if="selectedLocation"> di <span class="font-semibold">{{ getLocationName(selectedLocation) }}</span></span>
              <span v-if="selectedCategory"> kategori <span class="font-semibold">{{ getCategoryName(selectedCategory) }}</span></span>
            </p>
            <button 
              @click="resetFilters" 
              class="text-slate-500 hover:text-slate-700 underline"
            >
              Reset Filter
            </button>
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
          <div v-for="job in paginatedJobs" :key="job.id" class="card-interactive flex flex-col h-full">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-4 flex-1 min-w-0">
                <!-- Company Logo/Icon -->
                <div class="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden bg-white border-2 border-slate-200 shadow-sm">
                  <img 
                    :src="job.company?.logo_url || defaultCompanyLogo" 
                    :alt="job.company?.name || 'Company Logo'" 
                    class="w-full h-full object-contain p-2" 
                  />
                </div>
                
                <!-- Job Title & Company -->
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{{ job.title }}</h3>
                  <p class="text-sm text-slate-600 font-medium">{{ job.company?.name || 'Perusahaan Rahasia' }}</p>
                </div>
              </div>
              
              <!-- Category Badge -->
              <span class="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-200 whitespace-nowrap ml-3 flex-shrink-0">
                {{ job.category?.name || 'Umum' }}
              </span>
            </div>

            <div class="flex flex-wrap gap-y-2 text-sm text-slate-600 mb-4">
              <span class="flex items-center mr-4" v-if="job.salary_min && job.salary_max">
                <svg class="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ formatSalary(job.salary_min) }} - {{ formatSalary(job.salary_max) }}
              </span>
              <span class="flex items-center mr-4" v-if="job.location?.name">
                <svg class="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ job.location.name }}
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Deadline: {{ new Date(job.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }}
              </span>
            </div>

            <p class="text-slate-600 mb-4 line-clamp-3">{{ job.description }}</p>

            <div class="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
              <span class="text-xs text-slate-500">Diposting {{ new Date(job.created_at).toLocaleDateString('id-ID') }}</span>
              <router-link :to="`/jobs/${job.id}`" class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                Lamar Sekarang
              </router-link>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex justify-center mt-8 space-x-2">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="px-4 py-2 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button 
            v-for="page in totalPages" 
            :key="page" 
            @click="goToPage(page)"
            :class="['px-4 py-2 border rounded-md', currentPage === page ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-300 text-slate-600 hover:bg-slate-50']"
          >
            {{ page }}
          </button>

          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="px-4 py-2 border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useJobsStore } from '@/stores/jobs'
import { useMasterStore } from '@/stores/master'
import NavBar from '@/components/layout/NavBar.vue'

import defaultCompanyLogo from '@/assets/default-company-logo.png'

const jobsStore = useJobsStore()
const { jobs, loading, error } = storeToRefs(jobsStore)
const { fetchJobs } = jobsStore

const masterStore = useMasterStore()
const { locations, categories } = storeToRefs(masterStore)

const searchQuery = ref('')
const selectedLocation = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 6

onMounted(async () => {
  await Promise.all([
    fetchJobs(),
    masterStore.fetchAll()
  ])
})

// Reset to page 1 when filters change
watch([searchQuery, selectedLocation, selectedCategory], () => {
  currentPage.value = 1
})

// Filter locations to only show CITY type (not COUNTRY or PROVINCE)
const cityLocations = computed(() => {
  return locations.value.filter(loc => loc.type === 'CITY')
})

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    // Search filter
    const searchLower = searchQuery.value.toLowerCase()
    const matchesSearch = !searchQuery.value || 
      job.title.toLowerCase().includes(searchLower) ||
      (job.description && job.description.toLowerCase().includes(searchLower)) ||
      (job.company?.name?.toLowerCase().includes(searchLower)) ||
      (job.location?.name?.toLowerCase().includes(searchLower))
    
    // Location filter
    const matchesLocation = !selectedLocation.value || 
      job.location?.id === selectedLocation.value
    
    // Category filter
    const matchesCategory = !selectedCategory.value || 
      job.category?.id === selectedCategory.value
    
    return matchesSearch && matchesLocation && matchesCategory
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredJobs.value.length / itemsPerPage)
})

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredJobs.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const goToPage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const formatSalary = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedLocation.value = ''
  selectedCategory.value = ''
  currentPage.value = 1
}

const getLocationName = (locationId) => {
  const location = locations.value.find(loc => loc.id === locationId)
  return location?.name || ''
}

const getCategoryName = (categoryId) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category?.name || ''
}
</script>

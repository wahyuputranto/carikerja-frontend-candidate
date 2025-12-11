<template>
  <div class="min-h-screen">
    <NavBar />
    
    <div class="pt-20 md:pt-24 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-6 md:mb-8">
          <h1 class="text-3xl md:text-4xl font-bold font-display mb-3 md:mb-4">
            Temukan <span class="gradient-text">Pekerjaan Impianmu</span>
          </h1>
          <p class="text-lg md:text-xl text-slate-600">Ribuan lowongan kerja menanti. Mulai pencarian sekarang!</p>
        </div>

        <!-- Search & Filter -->
        <div class="glass rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
          <div class="grid md:grid-cols-12 gap-3 md:gap-4">
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
              <Combobox v-model="selectedLocation">
                <div class="relative">
                  <div class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <ComboboxInput
                      class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 input"
                      :displayValue="(locationId) => getLocationName(locationId)"
                      @change="locationQuery = $event.target.value"
                      placeholder="Semua Lokasi"
                    />
                    <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                       <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </ComboboxButton>
                  </div>
                  <TransitionRoot
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    @after-leave="locationQuery = ''"
                  >
                    <ComboboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
                      <div
                        class="relative cursor-default select-none py-2 px-4 text-gray-700 font-semibold border-b bg-gray-50"
                        @click="selectedLocation = ''"
                      >
                        Semua Lokasi
                      </div>
                      <div v-if="filteredLocations.length === 0 && locationQuery !== ''" class="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>

                      <template v-for="group in filteredLocations" :key="group.country">
                         <div class="sticky top-0 z-10 bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {{ group.country }}
                        </div>
                        <ComboboxOption
                          v-for="location in group.items"
                          as="template"
                          :key="location.id"
                          :value="location.id"
                          v-slot="{ selected, active }"
                        >
                          <li
                            class="relative cursor-default select-none py-2 pl-10 pr-4"
                            :class="{
                              'bg-emerald-600 text-white': active,
                              'text-gray-900': !active,
                            }"
                          >
                            <span
                              class="block truncate"
                              :class="{ 'font-medium': selected, 'font-normal': !selected }"
                            >
                              {{ location.city }}, {{ location.province }}
                            </span>
                            <span
                              v-if="selected"
                              class="absolute inset-y-0 left-0 flex items-center pl-3"
                              :class="{ 'text-white': active, 'text-emerald-600': !active }"
                            >
                              <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                          </li>
                        </ComboboxOption>
                      </template>
                    </ComboboxOptions>
                  </TransitionRoot>
                </div>
              </Combobox>
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
              <button class="btn btn-primary w-full h-full flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span class="md:hidden ml-2">Cari</span>
              </button>
            </div>
          </div>
          
          <!-- Filter Summary -->
          <div v-if="searchQuery || selectedLocation || selectedCategory" class="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm gap-2 sm:gap-0">
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

        <div v-else class="grid lg:grid-cols-2 gap-4 md:gap-6">
          <div v-for="job in paginatedJobs" :key="job.id" class="card-interactive flex flex-col h-full p-4 md:p-6">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3 sm:gap-0">
              <div class="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                <!-- Company Logo/Icon -->
                <div class="w-12 h-12 md:w-14 md:h-14 rounded-xl flex-shrink-0 flex items-center justify-center bg-slate-50 border-2 border-slate-200 shadow-sm">
                  <svg class="w-6 h-6 md:w-7 md:h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                
                <!-- Job Title & Company -->
                <div class="flex-1 min-w-0">
                  <h3 class="text-base md:text-lg font-bold text-slate-900 mb-0.5 md:mb-1 line-clamp-1">{{ job.title }}</h3>
                  <p class="text-xs md:text-sm text-slate-400 font-medium italic">
                    Perusahaan Dirahasiakan
                  </p>
                </div>
              </div>
              
              <!-- Category Badge -->
              <span class="self-start sm:self-auto bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-emerald-200 whitespace-nowrap sm:ml-3 flex-shrink-0">
                {{ job.category?.name || 'Umum' }}
              </span>
            </div>

            <div class="flex flex-wrap gap-y-2 text-xs md:text-sm text-slate-600 mb-4">
              <span class="flex items-center mr-4" v-if="job.salary_min && job.salary_max">
                <svg class="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ formatSalary(job.salary_min) }} - {{ formatSalary(job.salary_max) }}
              </span>
              <span class="flex items-center mr-4" v-if="job.location">
                <svg class="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ job.location.name || `${job.location.city}, ${job.location.province}` }}
              </span>
              <span class="flex items-center">
                <svg class="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Deadline: {{ new Date(job.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }}
              </span>
            </div>

            <p class="text-sm text-slate-600 mb-4 line-clamp-3">{{ job.description }}</p>

            <div class="mt-auto pt-3 md:pt-4 border-t border-slate-100 flex justify-between items-center">
              <span class="text-xs text-slate-500">Diposting {{ new Date(job.created_at).toLocaleDateString('id-ID') }}</span>
              <router-link :to="`/jobs/${job.id}`" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-medium py-1.5 px-3 md:py-2 md:px-4 rounded-lg transition-colors duration-200">
                Lamar Sekarang
              </router-link>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex justify-start md:justify-center mt-6 md:mt-8 overflow-x-auto pb-2 px-4 md:px-0">
          <div class="flex space-x-2 min-w-max">
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1"
              class="px-3 py-1.5 md:px-4 md:py-2 text-sm border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button 
              v-for="page in totalPages" 
              :key="page" 
              @click="goToPage(page)"
              :class="['px-3 py-1.5 md:px-4 md:py-2 text-sm border rounded-md', currentPage === page ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-300 text-slate-600 hover:bg-slate-50']"
            >
              {{ page }}
            </button>

            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
              class="px-3 py-1.5 md:px-4 md:py-2 text-sm border border-slate-300 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useJobsStore } from '@/stores/jobs'
import { useAuthStore } from '@/stores/auth'
import { useMasterStore } from '@/stores/master'
import NavBar from '@/components/layout/NavBar.vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import defaultCompanyLogo from '@/assets/default-company-logo.png'
import appLogo from '@/assets/logo.png'

const jobsStore = useJobsStore()
const { jobs, loading, error } = storeToRefs(jobsStore)
const { fetchJobs } = jobsStore
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const masterStore = useMasterStore()
const { locations, categories } = storeToRefs(masterStore)

const searchQuery = ref('')
const selectedLocation = ref('')
const locationQuery = ref('')
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

// Filter locations for Combobox
const filteredLocations = computed(() => {
  const filtered = locationQuery.value === ''
    ? locations.value
    : locations.value.filter((loc) => {
        const text = `${loc.city}, ${loc.province}, ${loc.country}`
        return text.toLowerCase().includes(locationQuery.value.toLowerCase())
      })

  // Group by country
  return filtered.reduce((groups, loc) => {
    let group = groups.find((g) => g.country === loc.country)
    if (!group) {
      group = { country: loc.country, items: [] }
      groups.push(group)
    }
    group.items.push(loc)
    return groups
  }, [])
})

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    // Search filter
    const searchLower = searchQuery.value.toLowerCase()
    const matchesSearch = !searchQuery.value || 
      job.title.toLowerCase().includes(searchLower) ||
      (job.description && job.description.toLowerCase().includes(searchLower)) ||
      (job.company?.name?.toLowerCase().includes(searchLower)) ||
      (job.location?.city?.toLowerCase().includes(searchLower)) ||
      (job.location?.province?.toLowerCase().includes(searchLower))
    
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
  if (!locationId) return ''
  const location = locations.value.find(loc => loc.id === locationId)
  return location ? `${location.city}, ${location.province}` : ''
}

const getCategoryName = (categoryId) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category?.name || ''
}
</script>

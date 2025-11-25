<template>
  <div class="min-h-screen">
    <NavBar />
    
    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
          <p class="mt-2 text-slate-600">Memuat detail lowongan...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12 text-red-600">
          <p>{{ error }}</p>
          <router-link to="/jobs" class="inline-block mt-4 text-primary-600 hover:underline">
            Kembali ke Lowongan
          </router-link>
        </div>

        <!-- Job Detail Content -->
        <div v-else-if="job">
          <div class="mb-8">
            <router-link to="/jobs" class="inline-flex items-center text-slate-600 hover:text-primary-600 mb-4 transition-colors">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Lowongan
            </router-link>
            <h1 class="text-4xl font-bold font-display mb-2">{{ job.title }}</h1>
            <p class="text-xl text-slate-600">{{ job.company?.name || 'Perusahaan Rahasia' }}</p>
          </div>

          <div class="grid lg:grid-cols-3 gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Company Info -->
              <div class="card">
                <div class="flex items-center space-x-4 mb-6">
                  <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl overflow-hidden flex items-center justify-center">
                    <img v-if="job.company?.logo_url" :src="job.company.logo_url" :alt="job.company.name" class="w-full h-full object-cover" />
                    <span v-else class="text-white font-bold text-2xl">{{ job.title.charAt(0) }}</span>
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold">{{ job.company?.name || 'Perusahaan Rahasia' }}</h2>
                    <p class="text-slate-600">{{ job.category?.name || 'Umum' }}</p>
                  </div>
                </div>
              </div>

              <!-- Job Description -->
              <div class="card">
                <h3 class="text-xl font-bold mb-4">Deskripsi Pekerjaan</h3>
                <div class="prose prose-slate max-w-none">
                  <p class="whitespace-pre-wrap">{{ job.description }}</p>
                </div>
              </div>

              <!-- Requirements -->
              <div class="card" v-if="job.requirements">
                <h3 class="text-xl font-bold mb-4">Kualifikasi & Persyaratan</h3>
                <div class="prose prose-slate max-w-none">
                  <p class="whitespace-pre-wrap">{{ job.requirements }}</p>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
              <!-- Job Info -->
              <div class="card">
                <h3 class="text-lg font-bold mb-4">Informasi Pekerjaan</h3>
                <div class="space-y-4">
                  <div v-if="job.location?.name">
                    <div class="text-sm text-slate-600 mb-1">Lokasi</div>
                    <div class="font-semibold">{{ job.location.name }}</div>
                  </div>
                  <div v-if="job.salary_min && job.salary_max">
                    <div class="text-sm text-slate-600 mb-1">Gaji</div>
                    <div class="font-semibold">{{ formatSalary(job.salary_min) }} - {{ formatSalary(job.salary_max) }}</div>
                  </div>
                  <div v-if="job.quota">
                    <div class="text-sm text-slate-600 mb-1">Kuota</div>
                    <div class="font-semibold">{{ job.quota }} Posisi</div>
                  </div>
                  <div v-if="job.deadline">
                    <div class="text-sm text-slate-600 mb-1">Deadline</div>
                    <div class="font-semibold text-red-600">
                      {{ new Date(job.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
                    </div>
                  </div>
                  <div v-if="job.created_at">
                    <div class="text-sm text-slate-600 mb-1">Diposting</div>
                    <div class="font-semibold">{{ formatRelativeTime(job.created_at) }}</div>
                  </div>
                </div>
              </div>

              <!-- Apply Button -->
              <button 
                @click="handleApply" 
                :disabled="isApplying"
                class="btn btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="!isApplying" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div v-else class="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                {{ isApplying ? 'Memproses...' : 'Lamar Sekarang' }}
              </button>

              <!-- Share -->
              <div class="card">
                <h3 class="text-lg font-bold mb-4">Bagikan Lowongan</h3>
                <div class="flex space-x-2">
                  <button @click="shareToFacebook" class="flex-1 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                    <svg class="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button @click="shareToTwitter" class="flex-1 p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors">
                    <svg class="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button @click="shareToWhatsApp" class="flex-1 p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                    <svg class="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useJobsStore } from '@/stores/jobs'
import { useAuthStore } from '@/stores/auth'
import NavBar from '@/components/layout/NavBar.vue'

const route = useRoute()
const router = useRouter()
const jobsStore = useJobsStore()
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const job = ref(null)
const loading = ref(true)
const error = ref(null)
const isApplying = ref(false)

onMounted(async () => {
  await fetchJobDetail()
})

const fetchJobDetail = async () => {
  try {
    loading.value = true
    error.value = null
    
    const jobId = route.params.id
    
    // Fetch all jobs and find the specific one
    await jobsStore.fetchJobs()
    const foundJob = jobsStore.jobs.find(j => j.id === jobId)
    
    if (foundJob) {
      job.value = foundJob
    } else {
      error.value = 'Lowongan tidak ditemukan'
    }
  } catch (err) {
    console.error('Error fetching job detail:', err)
    error.value = 'Gagal memuat detail lowongan'
  } finally {
    loading.value = false
  }
}

const handleApply = () => {
  if (!isAuthenticated.value) {
    // Save current job ID to redirect back after login
    localStorage.setItem('redirect_after_login', route.fullPath)
    
    // Redirect to login page
    router.push({
      path: '/login',
      query: { redirect: route.fullPath }
    })
  } else {
    // TODO: Implement application submission
    // For now, redirect to application form or show modal
    router.push(`/apply/${job.value.id}`)
  }
}

const formatSalary = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now - date
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return 'Hari ini'
  if (diffInDays === 1) return 'Kemarin'
  if (diffInDays < 7) return `${diffInDays} hari yang lalu`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} minggu yang lalu`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} bulan yang lalu`
  return `${Math.floor(diffInDays / 365)} tahun yang lalu`
}

const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareToTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`${job.value.title} - ${job.value.company?.name || 'Lowongan Kerja'}`)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareToWhatsApp = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`Cek lowongan ini: ${job.value.title} di ${job.value.company?.name || 'Perusahaan'}`)
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank')
}
</script>

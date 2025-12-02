<template>
  <div class="min-h-screen">
    <NavBar />
    
    <div class="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold font-display">
            <span class="gradient-text">Lamaran Saya</span>
            </h1>
            <button v-if="isDetailView" @click="clearFilter" class="text-slate-600 hover:text-primary-600 font-medium flex items-center self-start">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Daftar
            </button>
        </div>

        <!-- Filter Tabs (Hidden in Detail View) -->
        <div v-if="!isDetailView" class="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button 
            v-for="tab in tabs" 
            :key="tab.value"
            @click="activeTab = tab.value"
            class="px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold whitespace-nowrap transition-all border flex-shrink-0"
            :class="activeTab === tab.value ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'"
          >
            <span class="text-sm sm:text-base">{{ tab.label }}</span>
            <span class="ml-2 px-2 py-0.5 rounded-full text-xs" :class="activeTab === tab.value ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'">
              {{ tab.count }}
            </span>
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-16">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            <p class="mt-4 text-slate-500">Memuat lamaran...</p>
        </div>

        <!-- Applications List -->
        <div v-else-if="filteredApplications.length > 0" class="space-y-4 sm:space-y-6">
          <div v-for="app in filteredApplications" :key="app.application.id" class="card">
            <div class="flex flex-col gap-4">
              <div class="flex items-start gap-3 sm:gap-4 flex-1">
                <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
                    {{ app.application.job?.title ? app.application.job.title.charAt(0) : 'J' }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="mb-2">
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-1 leading-tight">{{ app.application.job?.title || 'Unknown Position' }}</h3>
                    <p class="text-sm sm:text-base text-slate-600">{{ app.application.job?.company_name || 'Unknown Company' }}</p>
                  </div>
                  
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span class="badge badge-primary text-xs">{{ app.application.job?.job_category_id || 'Full-time' }}</span>
                  </div>

                  <div class="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600">
                    <span class="flex items-center">
                      <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span class="truncate">{{ app.application.job?.location_id || 'Jakarta' }}</span>
                    </span>
                    <span class="flex items-center" v-if="app.application.job?.salary_min">
                      <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="truncate">{{ formatSalary(app.application.job.salary_min, app.application.job.salary_max) }}</span>
                    </span>
                    <span class="flex items-center">
                      <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Dilamar {{ formatDate(app.application.applied_at) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t sm:border-t-0 border-slate-100">
                <span class="badge text-xs sm:text-sm" :class="getStatusBadgeClass(app.application.status)">{{ app.application.status }}</span>
                <router-link :to="`/jobs/${app.application.job?.id}`" class="text-primary-600 hover:text-primary-700 font-medium text-xs sm:text-sm">
                  Lihat Detail Lowongan →
                </router-link>
              </div>
            </div>

            <!-- Progress Timeline -->
            <div class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 overflow-x-auto">
              <div class="flex items-center min-w-max sm:min-w-0 pb-2 sm:pb-0">
                  <div v-for="(step, index) in app.timeline" :key="step.step" class="flex items-center">
                      <div class="flex items-center space-x-1.5 sm:space-x-2">
                          <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
                               :class="getStepColorClass(step.status)">
                              <svg v-if="step.status === 'COMPLETED'" class="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <div v-else-if="step.status === 'IN_PROGRESS'" class="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
                              <div v-else class="w-2 h-2 sm:w-3 sm:h-3 bg-slate-400 rounded-full"></div>
                          </div>
                          <span class="text-xs sm:text-sm font-medium whitespace-nowrap" :class="step.status === 'PENDING' ? 'text-slate-400' : 'text-slate-700'">
                              {{ step.name }}
                          </span>
                      </div>
                      <div v-if="index < app.timeline.length - 1" class="w-8 sm:w-12 h-0.5 sm:h-1 mx-2 sm:mx-4 rounded-full flex-shrink-0"
                           :class="step.status === 'COMPLETED' ? 'bg-green-500' : 'bg-slate-200'">
                      </div>
                  </div>
              </div>
            </div>
            
            <div class="mt-3 sm:mt-4 bg-blue-50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm text-blue-800 flex items-start">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="flex-1 space-y-2">
                    <p class="font-medium">{{ app.latest_status }}</p>
                    
                    <!-- Interview Details -->
                    <div v-if="['INTERVIEW', 'PRE_INTERVIEW'].includes(app.application.status)" class="mt-2 space-y-1 bg-white/50 p-2.5 sm:p-3 rounded border border-blue-100">
                        <p v-if="app.application.interview_date" class="flex flex-col sm:flex-row sm:items-center gap-1">
                            <span class="font-semibold text-xs sm:text-sm">Waktu:</span>
                            <span class="text-xs sm:text-sm">{{ formatDateTime(app.application.interview_date) }}</span>
                        </p>
                        
                        <!-- Location -->
                        <p v-if="app.application.interview_location" class="flex flex-col sm:flex-row sm:items-center gap-1">
                            <span class="font-semibold text-xs sm:text-sm">Lokasi:</span>
                            <span class="text-xs sm:text-sm">{{ app.application.interview_location }}</span>
                        </p>

                         <!-- Address / Link -->
                        <p v-if="app.application.interview_address" class="flex flex-col sm:flex-row sm:items-center gap-1">
                            <span class="font-semibold text-xs sm:text-sm">Link/Alamat:</span>
                            <span v-if="isUrl(app.application.interview_address)" class="text-xs sm:text-sm">
                                <a :href="app.application.interview_address" target="_blank" class="underline hover:text-blue-600 break-all">{{ app.application.interview_address }}</a>
                            </span>
                            <span v-else class="text-xs sm:text-sm">{{ app.application.interview_address }}</span>
                        </p>

                        <p v-if="app.application.interview_notes" class="text-xs sm:text-sm">
                            <span class="font-semibold block mb-1">Catatan Interview:</span>
                            {{ app.application.interview_notes }}
                        </p>
                    </div>

                    <!-- Offering Details -->
                    <div v-if="['OFFERING', 'HIRED', 'PROCESSING_VISA', 'DEPLOYED'].includes(app.application.status)" class="mt-2 space-y-1 bg-purple-50/50 p-2.5 sm:p-3 rounded border border-purple-100">
                        <p class="font-semibold text-purple-900 mb-2 flex items-center text-xs sm:text-sm">
                            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Offering Details
                        </p>
                        <p class="flex flex-col sm:flex-row sm:items-center gap-1" v-if="app.application.offering_letter_path">
                            <span class="font-semibold text-xs sm:text-sm">Dokumen:</span>
                            <button @click="downloadOfferingLetter(app.application.offering_letter_path)" class="text-purple-700 hover:text-purple-900 font-medium underline flex items-center text-xs sm:text-sm">
                                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Offering Letter
                            </button>
                        </p>
                        <p class="text-purple-800 text-[10px] sm:text-xs mt-2">
                            Silakan download dan tinjau dokumen offering letter. Hubungi HR jika ada pertanyaan.
                        </p>
                    </div>

                    <!-- Admin Notes (General) -->
                    <div v-if="app.application.admin_notes" class="mt-2 text-xs sm:text-sm">
                        <span class="font-semibold">Catatan Admin:</span> {{ app.application.admin_notes }}
                    </div>

                     <!-- Rejection Reason -->
                     <div v-if="app.application.status === 'REJECTED' && app.application.rejection_reason" class="mt-2 text-red-700 text-xs sm:text-sm">
                        <span class="font-semibold">Alasan Penolakan:</span> {{ app.application.rejection_reason }}
                    </div>
                </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '@/stores/dashboard'
import NavBar from '@/components/layout/NavBar.vue'

const route = useRoute()
const router = useRouter()
const dashboardStore = useDashboardStore()
const { applications, loading } = storeToRefs(dashboardStore)

const activeTab = ref('all')

onMounted(() => {
    dashboardStore.fetchDashboardData()
})

const isDetailView = computed(() => !!route.query.id)

const filteredApplications = computed(() => {
    if (route.query.id) {
        return applications.value.filter(app => app.application.id == route.query.id)
    }

    if (activeTab.value === 'all') return applications.value
    
    return applications.value.filter(app => {
        const status = app.application.status
        if (activeTab.value === 'pending') return status === 'APPLIED' || status === 'REVIEW'
        if (activeTab.value === 'review') return status === 'REVIEW'
        if (activeTab.value === 'interview') return status === 'INTERVIEW' || status === 'PRE_INTERVIEW'
        if (activeTab.value === 'accepted') return status === 'ACCEPTED' || status === 'OFFERING' || status === 'HIRED'
        if (activeTab.value === 'rejected') return status === 'REJECTED'
        return true
    })
})

const clearFilter = () => {
    router.push({ path: '/applications' })
}

const tabs = computed(() => [
  { label: 'Semua', value: 'all', count: applications.value.length },
  { label: 'Pending', value: 'pending', count: applications.value.filter(a => a.application.status === 'APPLIED' || a.application.status === 'REVIEW').length },
  { label: 'Interview', value: 'interview', count: applications.value.filter(a => a.application.status === 'INTERVIEW' || a.application.status === 'PRE_INTERVIEW').length },
  { label: 'Diterima', value: 'accepted', count: applications.value.filter(a => a.application.status === 'ACCEPTED' || a.application.status === 'OFFERING' || a.application.status === 'HIRED').length },
  { label: 'Ditolak', value: 'rejected', count: applications.value.filter(a => a.application.status === 'REJECTED').length },
])

const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
}

const formatDateTime = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    })
}

const isUrl = (string) => {
    if (!string) return false;
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

const formatSalary = (min, max) => {
    if (!min || !max) return 'Gaji tidak ditampilkan'
    const minJuta = min / 1000000
    const maxJuta = max / 1000000
    return `Rp ${minJuta}-${maxJuta} Juta`
}

const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'APPLIED': return 'badge-info'
        case 'REVIEW': return 'badge-warning'
        case 'INTERVIEW': return 'badge-primary'
        case 'PRE_INTERVIEW': return 'badge-primary'
        case 'ACCEPTED': return 'badge-success'
        case 'OFFERING': return 'badge-success'
        case 'HIRED': return 'badge-success'
        case 'REJECTED': return 'badge-error'
        default: return 'badge-ghost'
    }
}

const getStepColorClass = (status) => {
    switch (status) {
        case 'COMPLETED': return 'bg-green-500'
        case 'IN_PROGRESS': return 'bg-yellow-500'
        default: return 'bg-slate-200'
    }
}

const downloadOfferingLetter = async (filePath) => {
    try {
        // Call Laravel backend to get temporary MinIO URL
        const response = await fetch('http://localhost:8000/api/offering-letter/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ file_path: filePath })
        })
        
        if (!response.ok) {
            throw new Error('Failed to get download URL')
        }
        
        const data = await response.json()
        
        // Open the temporary URL in a new tab
        window.open(data.url, '_blank')
    } catch (error) {
        console.error('Error downloading offering letter:', error)
        alert('Gagal mendownload dokumen offering letter. Silakan coba lagi.')
    }
}
</script>


<template>
  <div class="min-h-screen">
    <NavBar />
    
    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-4xl font-bold font-display">
            <span class="gradient-text">Lamaran Saya</span>
            </h1>
            <button v-if="isDetailView" @click="clearFilter" class="text-slate-600 hover:text-primary-600 font-medium flex items-center">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Daftar
            </button>
        </div>

        <!-- Filter Tabs (Hidden in Detail View) -->
        <div v-if="!isDetailView" class="flex space-x-2 mb-8 overflow-x-auto">
          <button 
            v-for="tab in tabs" 
            :key="tab.value"
            @click="activeTab = tab.value"
            class="px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all border"
            :class="activeTab === tab.value ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'"
          >
            {{ tab.label }}
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
        <div v-else-if="filteredApplications.length > 0" class="space-y-6">
          <div v-for="app in filteredApplications" :key="app.application.id" class="card">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="flex items-start space-x-4 flex-1">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-2xl">
                    {{ app.application.job?.title ? app.application.job.title.charAt(0) : 'J' }}
                </div>
                <div class="flex-1">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h3 class="text-xl font-bold text-slate-900 mb-1">{{ app.application.job?.title || 'Unknown Position' }}</h3>
                      <p class="text-slate-600">{{ app.application.job?.company_name || 'Unknown Company' }}</p>
                    </div>
                  </div>
                  
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span class="badge badge-primary">{{ app.application.job?.job_category_id || 'Full-time' }}</span>
                    <!-- <span class="badge badge-success">Remote</span> -->
                  </div>

                  <div class="flex flex-wrap gap-4 text-sm text-slate-600">
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {{ app.application.job?.location_id || 'Jakarta' }}
                    </span>
                    <span class="flex items-center" v-if="app.application.job?.salary_min">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ formatSalary(app.application.job.salary_min, app.application.job.salary_max) }}
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Dilamar {{ formatDate(app.application.applied_at) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col items-end space-y-3">
                <span class="badge" :class="getStatusBadgeClass(app.application.status)">{{ app.application.status }}</span>
                <router-link :to="`/jobs/${app.application.job?.id}`" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Lihat Detail Lowongan →
                </router-link>
              </div>
            </div>

            <!-- Progress Timeline -->
            <div class="mt-6 pt-6 border-t border-slate-200 overflow-x-auto">
              <div class="flex items-center min-w-max">
                  <div v-for="(step, index) in app.timeline" :key="step.step" class="flex items-center">
                      <div class="flex items-center space-x-2">
                          <div class="w-8 h-8 rounded-full flex items-center justify-center"
                               :class="getStepColorClass(step.status)">
                              <svg v-if="step.status === 'COMPLETED'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <div v-else-if="step.status === 'IN_PROGRESS'" class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                              <div v-else class="w-3 h-3 bg-slate-400 rounded-full"></div>
                          </div>
                          <span class="text-sm font-medium" :class="step.status === 'PENDING' ? 'text-slate-400' : 'text-slate-700'">
                              {{ step.name }}
                          </span>
                      </div>
                      <div v-if="index < app.timeline.length - 1" class="w-12 h-1 mx-4 rounded-full"
                           :class="step.status === 'COMPLETED' ? 'bg-green-500' : 'bg-slate-200'">
                      </div>
                  </div>
              </div>
            </div>
            
            <div class="mt-4 bg-blue-50 p-3 rounded-lg text-sm text-blue-800 flex items-start">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ app.latest_status }}</span>
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
        if (activeTab.value === 'interview') return status === 'INTERVIEW'
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
  { label: 'Interview', value: 'interview', count: applications.value.filter(a => a.application.status === 'INTERVIEW').length },
  { label: 'Diterima', value: 'accepted', count: applications.value.filter(a => a.application.status === 'ACCEPTED' || a.application.status === 'OFFERING' || a.application.status === 'HIRED').length },
  { label: 'Ditolak', value: 'rejected', count: applications.value.filter(a => a.application.status === 'REJECTED').length },
])

const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
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
</script>

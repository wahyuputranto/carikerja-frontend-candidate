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
            <div class="text-3xl font-bold gradient-text mb-1">{{ activeApplicationsCount }}</div>
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
            <div class="text-3xl font-bold gradient-text mb-1">{{ acceptedApplicationsCount }}</div>
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
            <div class="text-3xl font-bold gradient-text mb-1">{{ profileViewsCount }}</div>
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
            <div class="text-3xl font-bold gradient-text mb-1">{{ progressPercentage }}%</div>
            <div class="text-sm text-slate-600">Profil Lengkap</div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Tasks Section -->
            <div v-if="tasks && tasks.length > 0" class="card bg-orange-50 border-orange-200">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold font-display text-orange-800">Perlu Tindakan</h2>
                <span class="bg-orange-200 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">{{ tasks.length }}</span>
              </div>
              <div class="space-y-3">
                <div v-for="(task, index) in tasks" :key="index" class="p-4 bg-white rounded-xl border border-orange-100 flex items-center justify-between shadow-sm">
                  <div class="flex items-start space-x-3">
                    <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-slate-900">{{ task.document_type.name }}</h3>
                      <p class="text-sm text-slate-600">Untuk lamaran: {{ task.job_title }}</p>
                      <p v-if="task.notes" class="text-xs text-red-500 mt-1 font-medium">Note: {{ task.notes }}</p>
                    </div>
                  </div>
                  <router-link to="/upload-documents" class="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
                    Upload
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Recent Applications -->
            <div class="card">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold font-display">Lamaran Terbaru</h2>
                <router-link to="/applications" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Lihat Semua →
                </router-link>
              </div>

              <div v-if="loadingDashboard" class="text-center py-8">
                  <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
                  <p class="mt-2 text-slate-500">Memuat data...</p>
              </div>
              <div v-else-if="recentApplications.length > 0" class="space-y-4">
                <div v-for="app in recentApplications" :key="app.application.id" class="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 transition-colors">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        {{ app.application.job?.title ? app.application.job.title.charAt(0) : 'J' }}
                      </div>
                      <div>
                        <h3 class="font-semibold text-slate-900">{{ app.application.job?.title || 'Unknown Position' }}</h3>
                        <p class="text-sm text-slate-600">{{ app.application.job?.company_name || 'Unknown Company' }}</p>
                      </div>
                    </div>
                    <span class="badge" :class="getStatusBadgeClass(app.application.status)">{{ app.application.status }}</span>
                  </div>
                  <div class="flex items-center justify-between text-sm text-slate-600">
                    <span>📅 {{ formatDate(app.application.applied_at) }}</span>
                    <span class="text-xs text-slate-500">{{ app.latest_status }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-8 text-slate-500">
                <p>Belum ada lamaran aktif.</p>
                <router-link to="/jobs" class="text-primary-600 hover:underline mt-2 inline-block">Mulai cari kerja</router-link>
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

              <div v-if="loadingDashboard" class="text-center py-8">
                  <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
              </div>
              <div v-else-if="recommendations.length > 0" class="grid md:grid-cols-2 gap-4">
                <div 
                  v-for="job in recommendations" 
                  :key="job.id" 
                  @click="$router.push(`/jobs/${job.id}`)"
                  class="group p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer flex flex-col h-full"
                >
                  <div class="flex items-start space-x-3 mb-3">
                    <!-- Company Icon -->
                    <div class="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden bg-white border border-slate-200 shadow-sm group-hover:border-primary-200 transition-colors">
                      <img 
                        v-if="job.company?.logo_url" 
                        :src="job.company.logo_url" 
                        :alt="job.company.name" 
                        class="w-full h-full object-contain p-1.5" 
                      />
                      <div v-else class="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <!-- Job Info -->
                    <div class="flex-1 min-w-0">
                      <h3 class="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-primary-600 transition-colors">{{ job.title }}</h3>
                      <p class="text-xs text-slate-600 font-medium mb-0.5">{{ job.company?.name || 'Perusahaan Rahasia' }}</p>
                      <div class="flex items-center text-xs text-slate-500">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {{ job.location?.name || 'Jakarta' }}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Footer -->
                  <div class="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span class="badge badge-success text-[10px] px-2 py-0.5">{{ job.status }}</span>
                    <span class="text-[10px] text-slate-400">
                      {{ new Date(job.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-8 text-slate-500">
                <p>Belum ada rekomendasi pekerjaan saat ini.</p>
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
                  <span class="font-semibold gradient-text">{{ progressPercentage }}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
                </div>
              </div>
              <div class="space-y-3">
                <!-- Basic Info -->
                <div class="flex items-center space-x-3 text-sm">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center" :class="isBasicInfoComplete ? 'bg-green-100' : 'bg-yellow-100'">
                    <svg v-if="isBasicInfoComplete" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span v-else class="text-yellow-600 font-bold text-xs">!</span>
                  </div>
                  <span class="text-slate-600">Informasi Dasar</span>
                </div>

                <!-- Education -->
                <div class="flex items-center space-x-3 text-sm">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center" :class="isEducationComplete ? 'bg-green-100' : 'bg-yellow-100'">
                    <svg v-if="isEducationComplete" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span v-else class="text-yellow-600 font-bold text-xs">!</span>
                  </div>
                  <span class="text-slate-600">Pendidikan</span>
                </div>

                <!-- Experience -->
                <div class="flex items-center space-x-3 text-sm">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center" :class="isExperienceComplete ? 'bg-green-100' : 'bg-yellow-100'">
                    <svg v-if="isExperienceComplete" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span v-else class="text-yellow-600 font-bold text-xs">!</span>
                  </div>
                  <span class="text-slate-600">Pengalaman Kerja</span>
                </div>

                <!-- Skills -->
                <div class="flex items-center space-x-3 text-sm">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center" :class="isSkillsComplete ? 'bg-green-100' : 'bg-yellow-100'">
                    <svg v-if="isSkillsComplete" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span v-else class="text-yellow-600 font-bold text-xs">!</span>
                  </div>
                  <span class="text-slate-600">Keahlian</span>
                </div>

                <!-- Documents -->
                <div class="flex items-center space-x-3 text-sm">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center" :class="isDocumentsComplete ? 'bg-green-100' : 'bg-yellow-100'">
                    <svg v-if="isDocumentsComplete" class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span v-else class="text-yellow-600 font-bold text-xs">!</span>
                  </div>
                  <span class="text-slate-600">Dokumen</span>
                </div>
              </div>
              <router-link to="/profile" class="btn btn-primary w-full mt-4">
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
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useDashboardStore } from '@/stores/dashboard'
import { useDocumentsStore } from '@/stores/documents'
import NavBar from '@/components/layout/NavBar.vue'

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const documentsStore = useDocumentsStore()

const { currentUser, educations, experiences, skills } = storeToRefs(authStore)
const { applications, profileViews, recommendations, tasks, loading: loadingDashboard } = storeToRefs(dashboardStore)
const { userDocuments } = storeToRefs(documentsStore)

onMounted(async () => {
    if (authStore.token) {
        await Promise.all([
            authStore.fetchUser(),
            dashboardStore.fetchDashboardData(),
            documentsStore.fetchUserDocuments()
        ])
    }
})

const userName = computed(() => {
  return currentUser.value?.full_name || 'User'
})

const userPhoto = computed(() => {
  return currentUser.value?.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
})

// Stats
const activeApplicationsCount = computed(() => {
    return (applications.value || []).filter(app => {
        const status = app.application?.status
        return status !== 'REJECTED' && status !== 'ACCEPTED'
    }).length
})

const acceptedApplicationsCount = computed(() => {
    return (applications.value || []).filter(app => app.application?.status === 'ACCEPTED').length
})

const profileViewsCount = computed(() => profileViews.value)

// Lists
const recentApplications = computed(() => {
    return applications.value.slice(0, 3)
})

// Progress Logic
const isBasicInfoComplete = computed(() => {
    const user = currentUser.value
    return !!(user?.full_name && user?.email && user?.phone && user?.address)
})

const isEducationComplete = computed(() => {
    return educations.value && educations.value.length > 0
})

const isExperienceComplete = computed(() => {
    return experiences.value && experiences.value.length > 0
})

const isSkillsComplete = computed(() => {
    return skills.value && skills.value.length > 0
})

const isDocumentsComplete = computed(() => {
    return userDocuments.value && userDocuments.value.length > 0
})

const progressPercentage = computed(() => {
    let completed = 0
    if (isBasicInfoComplete.value) completed++
    if (isEducationComplete.value) completed++
    if (isExperienceComplete.value) completed++
    if (isSkillsComplete.value) completed++
    if (isDocumentsComplete.value) completed++
    
    return (completed / 5) * 100
})

// Helpers
const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
}

const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'APPLIED': return 'badge-info'
        case 'REVIEW': return 'badge-warning'
        case 'INTERVIEW': return 'badge-primary'
        case 'ACCEPTED': return 'badge-success'
        case 'REJECTED': return 'badge-error'
        default: return 'badge-ghost'
    }
}
</script>

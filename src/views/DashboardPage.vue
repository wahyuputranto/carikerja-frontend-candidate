<template>
  <div class="min-h-screen bg-slate-50">
    <NavBar />
    
    <div class="pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        
        <!-- Stats Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Active Applications -->
          <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div class="text-3xl font-bold text-slate-900">{{ activeApplicationsCount }}</div>
                <div class="text-sm text-slate-500 font-medium">Lamaran Aktif</div>
              </div>
            </div>
          </div>

          <!-- Accepted/Review -->
          <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div class="text-3xl font-bold text-slate-900">{{ acceptedApplicationsCount }}</div>
                <div class="text-sm text-slate-500 font-medium">Diterima Review</div>
              </div>
            </div>
          </div>

          <!-- Profile Views -->
          <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <div class="text-3xl font-bold text-slate-900">{{ profileViewsCount }}</div>
                <div class="text-sm text-slate-500 font-medium">Profil Dilihat</div>
              </div>
            </div>
          </div>

          <!-- Profile Completion -->
          <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div class="text-3xl font-bold text-slate-900">{{ progressPercentage }}%</div>
                <div class="text-sm text-slate-500 font-medium">Profil Lengkap</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Left Column (Main) -->
          <div class="lg:col-span-2 space-y-8">
            
            <!-- Tasks / Action Needed -->
            <div v-if="tasks && tasks.length > 0" class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-bold text-slate-800">Perlu Tindakan</h2>
                <span class="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full">{{ tasks.length }}</span>
              </div>
              <div class="space-y-3">
                <div 
                  v-for="(task, index) in tasks" 
                  :key="index" 
                  @click="$router.push(`/upload-documents?focus=${task.document_type.slug}`)"
                  class="p-4 rounded-xl border border-orange-100 bg-orange-50/50 flex items-start space-x-4 cursor-pointer hover:bg-orange-50 transition-colors"
                >
                  <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-slate-900 text-sm">{{ task.document_type.name }}</h3>
                    <p class="text-xs text-slate-500 mt-0.5">Untuk lamaran: <span class="font-medium">{{ task.job_title }}</span></p>
                    <p v-if="task.notes" class="text-xs text-red-500 mt-1">Note: {{ task.notes }}</p>
                  </div>
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Recent Applications -->
            <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-bold text-slate-800">Lamaran Terbaru</h2>
                <router-link to="/applications" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Lihat Semua →
                </router-link>
              </div>

              <div v-if="loadingDashboard" class="flex justify-center py-8">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
              <div v-else-if="recentApplications.length > 0" class="space-y-4">
                <div 
                  v-for="app in recentApplications" 
                  :key="app.application.id" 
                  @click="$router.push({ path: '/applications', query: { id: app.application.id } })"
                  class="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-primary-100 hover:bg-slate-50 transition-all bg-white cursor-pointer"
                >
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-lg border border-slate-100 p-2 flex items-center justify-center bg-white">
                      <img 
                        :src="app.application.job?.company?.logo_url || defaultCompanyLogo" 
                        :alt="app.application.job?.company?.name" 
                        class="w-full h-full object-contain" 
                      />
                    </div>
                    <div>
                      <h3 class="font-semibold text-slate-900 text-sm">{{ app.application.job?.title || 'Unknown Position' }}</h3>
                      <p class="text-xs text-slate-500">{{ app.application.job?.company_name || 'Unknown Company' }}</p>
                      <div class="flex items-center mt-1 text-xs text-slate-400">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {{ formatDate(app.application.applied_at) }}
                      </div>
                    </div>
                  </div>
                  <span class="badge text-xs px-3 py-1 rounded-full font-medium" :class="getStatusBadgeClass(app.application.status)">
                    {{ app.application.status }}
                  </span>
                </div>
              </div>
              <div v-else class="text-center py-10">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <p class="text-slate-500 text-sm">Belum ada lamaran aktif.</p>
                <router-link to="/jobs" class="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block">Mulai cari kerja</router-link>
              </div>
            </div>

            <!-- Recommended Jobs -->
            <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-bold text-slate-800">Rekomendasi Untukmu</h2>
                <router-link to="/jobs" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Lihat Semua →
                </router-link>
              </div>

              <div v-if="loadingDashboard" class="flex justify-center py-8">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
              <div v-else-if="recommendations.length > 0" class="grid md:grid-cols-2 gap-4">
                <div 
                  v-for="job in recommendations" 
                  :key="job.id" 
                  @click="$router.push(`/jobs/${job.id}`)"
                  class="group p-4 rounded-xl border border-slate-100 hover:border-primary-200 hover:shadow-md transition-all cursor-pointer bg-white flex flex-col h-full"
                >
                  <div class="flex items-start space-x-3 mb-3">
                    <div class="w-10 h-10 rounded-lg border border-slate-100 p-1.5 flex items-center justify-center bg-white group-hover:border-primary-100 transition-colors">
                      <img 
                        :src="job.company?.logo_url || defaultCompanyLogo" 
                        :alt="job.company?.name" 
                        class="w-full h-full object-contain" 
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-primary-600 transition-colors">{{ job.title }}</h3>
                      <p class="text-xs text-slate-500 mb-1">{{ job.company?.name }}</p>
                      <div class="flex items-center text-xs text-slate-400">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {{ job.location?.name || 'Jakarta' }}
                      </div>
                    </div>
                  </div>
                  <div class="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                    <span class="bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-medium">{{ job.job_type }}</span>
                    <span class="text-[10px] text-slate-400">
                      {{ new Date(job.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-10">
                 <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <p class="text-slate-500 text-sm">Belum ada rekomendasi pekerjaan.</p>
              </div>
            </div>
          </div>

          <!-- Right Column (Sidebar) -->
          <div class="space-y-6">
            
            <!-- Profile Card -->
            <div class="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center">
              <div class="relative inline-block mb-4">
                <img 
                  :src="userPhoto" 
                  alt="Profile" 
                  class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mx-auto"
                />
              </div>
              <h3 class="text-lg font-bold text-slate-900">{{ userName }}</h3>
              <p class="text-sm text-slate-500">{{ currentUser?.email }}</p>
            </div>

            <!-- Profile Completion -->
            <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-base font-bold text-slate-800">Lengkapi Profilmu</h3>
                <span class="text-sm font-bold text-primary-600">{{ progressPercentage }}%</span>
              </div>
              
              <div class="w-full bg-slate-100 rounded-full h-2.5 mb-6">
                <div class="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" :style="{ width: progressPercentage + '%' }"></div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <div v-if="isBasicInfoComplete" class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div v-else class="w-6 h-6 rounded-full bg-slate-100 border border-slate-200"></div>
                  </div>
                  <span class="text-sm font-medium text-slate-700">Informasi Dasar</span>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <div v-if="isEducationComplete" class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div v-else class="w-6 h-6 rounded-full bg-slate-100 border border-slate-200"></div>
                  </div>
                  <span class="text-sm font-medium text-slate-700">Pendidikan</span>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <div v-if="isExperienceComplete" class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div v-else class="w-6 h-6 rounded-full bg-slate-100 border border-slate-200"></div>
                  </div>
                  <span class="text-sm font-medium text-slate-700">Pengalaman Kerja</span>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <div v-if="isSkillsComplete" class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div v-else class="w-6 h-6 rounded-full bg-slate-100 border border-slate-200"></div>
                  </div>
                  <span class="text-sm font-medium text-slate-700">Keahlian</span>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <div v-if="isDocumentsComplete" class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div v-else class="w-6 h-6 rounded-full bg-slate-100 border border-slate-200"></div>
                  </div>
                  <span class="text-sm font-medium text-slate-700">Dokumen</span>
                </div>
              </div>

              <router-link to="/profile" class="btn btn-primary w-full mt-6 py-2.5 text-sm">
                Lengkapi Sekarang
              </router-link>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 class="text-sm font-bold text-slate-800 mb-4">Aksi Cepat</h3>
              <div class="space-y-3">
                <router-link to="/jobs" class="flex items-center space-x-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                  <div class="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <span class="text-sm font-medium text-slate-700">Cari Lowongan</span>
                </router-link>

                <router-link to="/profile" class="flex items-center space-x-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                  <div class="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span class="text-sm font-medium text-slate-700">Edit Profil</span>
                </router-link>

                <router-link to="/upload-documents" class="flex items-center space-x-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                  <div class="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <span class="text-sm font-medium text-slate-700">Upload Dokumen</span>
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

import defaultCompanyLogo from '@/assets/default-company-logo.png'
import defaultAvatar from '@/assets/default-avatar.png'

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const documentsStore = useDocumentsStore()

const { currentUser, educations, experiences, skills } = storeToRefs(authStore)
const { applications, profileViews, recommendations, tasks, loading: loadingDashboard } = storeToRefs(dashboardStore)
const { userDocuments } = storeToRefs(documentsStore)

const userName = computed(() => currentUser.value?.full_name || 'User')
const userPhoto = computed(() => {
  return currentUser.value?.photo || defaultAvatar
})

// Computed stats
const activeApplicationsCount = computed(() => {
  return applications.value ? applications.value.filter(app => app.application.status !== 'REJECTED' && app.application.status !== 'HIRED').length : 0
})

const acceptedApplicationsCount = computed(() => {
  return applications.value ? applications.value.filter(app => app.application.status === 'HIRED' || app.application.status === 'OFFERING').length : 0
})

const profileViewsCount = computed(() => profileViews.value || 0)

// Profile completion logic
const isBasicInfoComplete = computed(() => {
  const u = currentUser.value
  return !!(u?.full_name && u?.phone && u?.email && u?.address)
})

const isEducationComplete = computed(() => educations.value && educations.value.length > 0)
const isExperienceComplete = computed(() => experiences.value && experiences.value.length > 0)
const isSkillsComplete = computed(() => skills.value && skills.value.length > 0)
const isDocumentsComplete = computed(() => userDocuments.value && userDocuments.value.length > 0)

const progressPercentage = computed(() => {
  let score = 0
  if (isBasicInfoComplete.value) score += 20
  if (isEducationComplete.value) score += 20
  if (isExperienceComplete.value) score += 20
  if (isSkillsComplete.value) score += 20
  if (isDocumentsComplete.value) score += 20
  return score
})

// Recent applications (limit to 3)
const recentApplications = computed(() => {
  return applications.value ? applications.value.slice(0, 3) : []
})

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'APPLIED': return 'bg-blue-50 text-blue-700 border border-blue-100'
    case 'REVIEWING': return 'bg-yellow-50 text-yellow-700 border border-yellow-100'
    case 'INTERVIEW': return 'bg-purple-50 text-purple-700 border border-purple-100'
    case 'HIRED': return 'bg-green-50 text-green-700 border border-green-100'
    case 'REJECTED': return 'bg-red-50 text-red-700 border border-red-100'
    default: return 'bg-slate-50 text-slate-600 border border-slate-100'
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

onMounted(async () => {
  await Promise.all([
    authStore.fetchUser(),
    dashboardStore.fetchDashboardData(),
    documentsStore.fetchUserDocuments()
  ])
})
</script>

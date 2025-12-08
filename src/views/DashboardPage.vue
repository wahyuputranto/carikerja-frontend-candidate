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

            <!-- Agenda / Upcoming Interviews -->
            <div v-if="upcomingInterviews.length > 0" class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
               <div class="absolute top-0 right-0 p-4 opacity-10">
                  <svg class="w-32 h-32 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
               </div>
               <div class="flex items-center justify-between mb-6 relative z-10">
                <h2 class="text-lg font-bold text-slate-800 flex items-center">
                  <span class="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
                  Agenda Interview
                </h2>
                <span class="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">{{ upcomingInterviews.length }} Jadwal</span>
              </div>
              
              <div class="space-y-4 relative z-10">
                <div 
                  v-for="(interview, index) in upcomingInterviews" 
                  :key="index"
                  class="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 hover:border-blue-300 transition-colors shadow-sm"
                >
                  <!-- Date Box -->
                  <div class="flex-shrink-0 flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-lg w-full sm:w-20 p-2 border border-blue-100">
                    <span class="text-xs font-bold uppercase tracking-wider">{{ getMonthName(interview.application.interview_date) }}</span>
                    <span class="text-2xl font-extrabold">{{ getDayNumber(interview.application.interview_date) }}</span>
                    <span class="text-xs font-medium">{{ getDayName(interview.application.interview_date) }}</span>
                  </div>

                  <!-- Details -->
                  <div class="flex-1">
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="font-bold text-slate-900 text-lg">{{ interview.application.job?.title }}</h3>
                        <p class="text-slate-600 text-sm font-medium">{{ interview.application.job?.company_name }}</p>
                      </div>
                      <span class="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                        {{ interview.application.status }}
                      </span>
                    </div>

                    <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                      <div class="flex items-center">
                        <svg class="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ formatTime(interview.application.interview_date) }} WIB
                      </div>
                      <div class="flex items-center">
                         <svg class="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {{ interview.application.interview_location || 'Online / TBD' }}
                      </div>
                      
                      <!-- Address / Link -->
                      <div v-if="interview.application.interview_address" class="flex items-center col-span-1 sm:col-span-2 overflow-hidden">
                         <svg class="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <a v-if="interview.application.interview_address.startsWith('http')" :href="interview.application.interview_address" target="_blank" class="text-blue-600 hover:underline truncate block">
                          {{ interview.application.interview_address }}
                        </a>
                        <span v-else class="truncate block">{{ interview.application.interview_address }}</span>
                      </div>
                    </div>

                     <div v-if="interview.application.interview_notes" class="mt-3 bg-slate-50 p-2 rounded text-xs text-slate-600 border border-slate-100">
                        <span class="font-semibold text-slate-700">Catatan:</span> {{ interview.application.interview_notes }}
                     </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Announcements / Notifications -->
            <div v-if="announcements.length > 0" class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
               <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-bold text-slate-800 flex items-center">
                  <span class="w-2 h-8 bg-yellow-400 rounded-full mr-3"></span>
                  Papan Informasi
                </h2>
              </div>
              <div class="space-y-3">
                 <div 
                  v-for="notif in announcements" 
                  :key="notif.id"
                  class="p-4 rounded-xl border border-yellow-100 bg-yellow-50/30 flex items-start space-x-4"
                >
                  <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                     <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-slate-900 text-sm">{{ notif.title }}</h3>
                    <p class="text-sm text-slate-600 mt-1">{{ notif.message }}</p>
                    <p class="text-xs text-slate-400 mt-2">{{ formatDate(notif.created_at) }}</p>
                  </div>
                </div>
              </div>
            </div>
            
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
                        {{ formatLocation(job.location) || 'Jakarta' }}
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

                <div v-for="docType in mandatoryDocTypes" :key="docType.id" class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <!-- VALID (Approved) -->
                    <div v-if="getDocStatus(docType.id) === 'VALID'" class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center" title="Disetujui">
                      <svg class="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    
                    <!-- INVALID (Rejected) -->
                    <div v-else-if="getDocStatus(docType.id) === 'INVALID'" class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center" title="Ditolak">
                      <svg class="w-3.5 h-3.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </div>

                    <!-- PENDING/UPLOADED -->
                    <div v-else-if="getDocStatus(docType.id) === 'PENDING' || getDocStatus(docType.id) === 'UPLOADED'" class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center" title="Menunggu Verifikasi">
                      <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>

                    <!-- MISSING -->
                    <div v-else class="w-6 h-6 rounded-full bg-slate-100 border border-slate-200" title="Belum Diupload"></div>
                  </div>
                  <span class="text-sm font-medium text-slate-700">Dokumen {{ docType.name }}</span>
                </div>
              </div>

              <div class="mt-6 space-y-3">
                <router-link to="/profile" class="btn btn-primary w-full py-2.5 text-sm">
                  Edit Profil
                </router-link>
                <router-link to="/upload-documents" class="block w-full py-2.5 text-sm text-center border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium">
                  Upload Dokumen
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
import { useNotificationStore } from '@/stores/notifications'
import NavBar from '@/components/layout/NavBar.vue'

import defaultCompanyLogo from '@/assets/default-company-logo.png'
import defaultAvatar from '@/assets/default-avatar.png'

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const documentsStore = useDocumentsStore()
const notificationStore = useNotificationStore()

const { currentUser, educations, experiences, skills } = storeToRefs(authStore)
const { applications, profileViews, recommendations, tasks, loading: loadingDashboard } = storeToRefs(dashboardStore)
const { documentTypes, userDocuments } = storeToRefs(documentsStore)
const { notifications } = storeToRefs(notificationStore)

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

const mandatoryDocTypes = computed(() => {
  return documentTypes.value ? documentTypes.value.filter(d => d.is_mandatory) : []
})

const getDocStatus = (typeId) => {
  if (!userDocuments.value) return 'MISSING'
  // Since userDocuments is ordered DESC by backend, find() gets the latest one
  const doc = userDocuments.value.find(d => d.document_type_id === typeId)
  if (!doc) return 'MISSING'
  return doc.status
}

const isDocComplete = (typeId) => {
  const status = getDocStatus(typeId)
  return status === 'VALID'
}

const progressPercentage = computed(() => {
  let completedItems = 0
  let totalItems = 4 // Basic, Edu, Exp, Skills

  if (isBasicInfoComplete.value) completedItems++
  if (isEducationComplete.value) completedItems++
  if (isExperienceComplete.value) completedItems++
  if (isSkillsComplete.value) completedItems++

  // Add mandatory docs to calculation
  if (mandatoryDocTypes.value.length > 0) {
    totalItems += mandatoryDocTypes.value.length
    mandatoryDocTypes.value.forEach(docType => {
      if (isDocComplete(docType.id)) {
        completedItems++
      }
    })
  } else {
    // Fallback if doc types not loaded yet but we have user docs
    if (userDocuments.value && userDocuments.value.length > 0) {
       // Just a temporary state
    }
  }

  if (totalItems === 0) return 0
  return Math.round((completedItems / totalItems) * 100)
})

// Recent applications (limit to 3)
const recentApplications = computed(() => {
  return applications.value ? applications.value.slice(0, 3) : []
})

// Upcoming Interviews
const upcomingInterviews = computed(() => {
  if (!applications.value) return []
  
  // Filter for interviews with dates
  const interviews = applications.value.filter(app => {
    // Must have an interview date
    if (!app.application.interview_date) return false
    
    // Check if date is valid
    const date = new Date(app.application.interview_date)
    if (isNaN(date.getTime())) return false

    // Filter out rejected applications even if they had a date
    if (app.application.status === 'REJECTED') return false

    // Only show future or today's interviews
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return date >= today
  })

  // Sort by date ascending (nearest first)
  return interviews.sort((a, b) => {
    return new Date(a.application.interview_date) - new Date(b.application.interview_date)
  })
})

// Announcements
const announcements = computed(() => {
  if (!notifications.value) return []
  // Filter for 'ANNOUNCEMENT' or 'SCHEDULE' or generic ones
  // For now, let's show all that are not just 'read' system notifs if we want, 
  // but better to filter by type if backend supports it.
  // Assuming 'ANNOUNCEMENT' type exists or we show all recent ones.
  // Let's show top 3 recent notifications for now as "Announcements"
  return notifications.value.slice(0, 3)
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

const formatTime = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getMonthName = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('id-ID', { month: 'short' })
}

const getDayNumber = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).getDate()
}

const getDayName = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long' })
}

const formatLocation = (location) => {
    if (!location) return null
    if (location.name) return location.name
    
    const parts = []
    if (location.city) parts.push(location.city)
    if (location.province) parts.push(location.province)
    
    if (parts.length > 0) return parts.join(', ')
    return location.country || null
}

onMounted(async () => {
  await Promise.all([
    authStore.fetchUser(),
    dashboardStore.fetchDashboardData(),
    documentsStore.fetchUserDocuments(),
    documentsStore.fetchDocumentTypes(),
    notificationStore.fetchNotifications()
  ])
})
</script>

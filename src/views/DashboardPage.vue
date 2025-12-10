<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <NavBar />
    
    <div class="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <!-- Welcome Section -->
      <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
            {{ greeting }}, {{ userFirstName }}! <span class="text-2xl">👋</span>
          </h1>
          <p class="text-slate-500 mt-1 text-base">Siap untuk meraih karir impianmu hari ini?</p>
        </div>
        <div class="flex items-center gap-3">
          <button @click="handleJobSearch" class="btn btn-primary shadow-lg shadow-primary-600/20 px-6 py-2.5 rounded-full flex items-center gap-2 hover:-translate-y-0.5 transition-transform">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            Cari Lowongan
          </button>
        </div>
      </div>


      <!-- Stats Overview -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-default">
          <div class="flex flex-col gap-3">
             <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             </div>
             <div>
               <div class="text-2xl font-bold text-slate-900">{{ activeApplicationsCount }}</div>
               <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">Lamaran Aktif</div>
             </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-default">
          <div class="flex flex-col gap-3">
             <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <div>
               <div class="text-2xl font-bold text-slate-900">{{ acceptedApplicationsCount }}</div>
               <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">Diterima</div>
             </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-default">
           <div class="flex flex-col gap-3">
             <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
             </div>
             <div>
               <div class="text-2xl font-bold text-slate-900">{{ profileViewsCount }}</div>
               <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">Profil Dilihat</div>
             </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-default">
           <div class="flex flex-col gap-3">
             <div class="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <div>
               <div class="text-2xl font-bold text-slate-900">{{ progressPercentage }}%</div>
               <div class="text-xs text-slate-500 font-medium uppercase tracking-wide">Kelengkapan Profil</div>
             </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-3 gap-8">
        
        <!-- Left Content (2 Columns) -->
        <div class="lg:col-span-2 space-y-8">

          <!-- Agenda / Upcoming Interviews -->
          <div v-if="upcomingInterviews.length > 0" class="animate-fade-in-up">
             <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-slate-900 flex items-center">
                <span class="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
                Agenda Interview
              </h2>
              <span class="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{{ upcomingInterviews.length }} Upcoming</span>
            </div>
            
            <div class="grid gap-4">
              <div 
                v-for="(interview, index) in upcomingInterviews" 
                :key="index"
                class="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row gap-5 hover:border-blue-300 transition-all shadow-sm group"
              >
                <!-- Date Badge -->
                <div class="flex-shrink-0 flex flex-row md:flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white text-blue-700 rounded-xl w-full md:w-24 p-3 border border-blue-100 gap-2 md:gap-0">
                  <span class="text-xs font-bold uppercase tracking-wider">{{ getMonthName(interview.application.interview_date) }}</span>
                  <span class="text-3xl font-black">{{ getDayNumber(interview.application.interview_date) }}</span>
                  <span class="text-xs font-medium opacity-75">{{ getDayName(interview.application.interview_date) }}</span>
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <h3 class="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{{ interview.application.job?.title }}</h3>
                      <div class="flex items-center text-slate-600 text-sm mt-1">
                        <svg class="w-4 h-4 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        {{ interview.application.job?.company_name }}
                      </div>
                    </div>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ interview.application.status }}
                    </span>
                  </div>

                  <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div class="flex items-center text-slate-600 bg-slate-50 p-2 rounded-lg">
                      <svg class="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {{ formatTime(interview.application.interview_date) }} WIB
                    </div>
                    <div class="flex items-center text-slate-600 bg-slate-50 p-2 rounded-lg">
                       <svg class="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {{ interview.application.interview_location || 'Online / TBD' }}
                    </div>
                  </div>

                  <div v-if="interview.application.interview_address" class="mt-3 flex items-start text-sm text-slate-600">
                     <svg class="w-4 h-4 mr-2 mt-0.5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    <a v-if="interview.application.interview_address.startsWith('http')" :href="interview.application.interview_address" target="_blank" class="text-blue-600 hover:underline break-all">
                      {{ interview.application.interview_address }}
                    </a>
                    <span v-else>{{ interview.application.interview_address }}</span>
                  </div>
                  
                  <div v-if="interview.application.interview_notes" class="mt-3 text-xs bg-yellow-50 text-yellow-800 p-3 rounded-lg border border-yellow-100 flex items-start">
                     <svg class="w-4 h-4 mr-2 text-yellow-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     <div><span class="font-bold">Note:</span> {{ interview.application.interview_notes }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Papan Informasi -->
          <div v-if="announcements.length > 0" class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm animate-fade-in-up">
             <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-bold text-slate-800 flex items-center">
                <span class="w-1.5 h-6 bg-amber-400 rounded-full mr-3"></span>
                Papan Informasi
              </h2>
            </div>
            <div class="space-y-4">
               <div 
                v-for="notif in announcements" 
                :key="notif.id"
                @click="handleNotificationClick(notif)"
                class="group p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-amber-200 hover:shadow-sm transition-all flex items-start space-x-4 cursor-pointer"
              >
                <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                   <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-start">
                    <h3 class="font-bold text-slate-900 text-sm">{{ notif.title }}</h3>
                    <span class="text-[10px] text-slate-400 whitespace-nowrap">{{ formatDate(notif.created_at) }}</span>
                  </div>
                  <p class="text-sm text-slate-600 mt-1 leading-relaxed">{{ notif.message }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Applications & Recommendations Grid -->
          <div class="grid md:grid-cols-1 gap-8">
            <!-- Recent Applications -->
            <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-bold text-slate-800">Lamaran Terbaru</h2>
                <router-link to="/applications" class="text-primary-600 hover:text-primary-700 text-sm font-medium hover:underline">
                  Lihat Semua
                </router-link>
              </div>

              <div v-if="loadingDashboard" class="flex justify-center py-12">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>

              <div v-else-if="progressPercentage < 100" class="text-center py-8 px-4 bg-orange-50 rounded-xl border border-orange-100 flex flex-col items-center">
                  <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-3">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <h3 class="font-bold text-orange-800 mb-1">Akses Terkunci</h3>
                  <p class="text-sm text-orange-600 mb-3">Lengkapi profil Anda hingga 100% untuk melihat lamaran aktif.</p>
              </div>
              
              <div v-else-if="recentApplications.length > 0" class="space-y-4">
                <div 
                  v-for="app in recentApplications" 
                  :key="app.application.id" 
                  @click="$router.push({ path: '/applications', query: { id: app.application.id } })"
                  class="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-primary-100 hover:bg-slate-50 transition-all bg-white cursor-pointer group"
                >
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-xl border border-slate-100 p-2 flex items-center justify-center bg-white group-hover:scale-105 transition-transform">
                      <img 
                        :src="app.application.job?.company?.logo_url || defaultCompanyLogo" 
                        :alt="app.application.job?.company?.name" 
                        class="w-full h-full object-contain" 
                      />
                    </div>
                    <div>
                      <h3 class="font-bold text-slate-900 text-sm group-hover:text-primary-600 transition-colors">{{ app.application.job?.title || 'Unknown Position' }}</h3>
                      <p class="text-xs text-slate-500">{{ app.application.job?.company_name || 'Unknown Company' }}</p>
                    </div>
                  </div>
                  <div class="flex flex-col items-end gap-1">
                    <span class="badge text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider" :class="getStatusBadgeClass(app.application.status)">
                      {{ app.application.status }}
                    </span>
                    <span class="text-[10px] text-slate-400">{{ formatDate(app.application.applied_at) }}</span>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-12 flex flex-col items-center justify-center flex-1">
                <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <p class="text-slate-500 text-sm mb-4">Belum ada lamaran aktif.</p>
                <router-link to="/jobs" class="btn btn-outline-primary btn-sm rounded-full px-6">Mulai Melamar</router-link>
              </div>
            </div>

            <!-- Recommended Jobs -->
            <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-bold text-slate-800">Rekomendasi Pekerjaan</h2>
                <button @click="handleJobSearch" class="text-primary-600 hover:text-primary-700 text-sm font-medium hover:underline bg-transparent border-none p-0 cursor-pointer">
                  Eksplorasi
                </button>
              </div>
              
              <div v-if="loadingDashboard" class="flex justify-center py-12">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>

              <div v-else-if="progressPercentage < 100" class="text-center py-12 px-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center">
                   <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <h3 class="font-bold text-slate-700 mb-2">Rekomendasi Terkunci</h3>
                  <p class="text-slate-500 mb-4 max-w-xs mx-auto">Kami butuh profil lengkap Anda untuk memberikan rekomendasi pekerjaan yang paling cocok.</p>
                  <router-link to="/profile" class="bg-[#008B99] text-white px-6 py-2 rounded-full font-medium hover:bg-teal-700 transition">Lengkapi Profil Sekarang</router-link>
              </div>

              <div v-else-if="recommendations.length > 0" class="grid sm:grid-cols-2 gap-4">
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
                      <p class="text-xs text-slate-500 mb-1 line-clamp-1">{{ job.company?.name }}</p>
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
              <div v-else class="text-center py-12 flex flex-col items-center justify-center flex-1">
                 <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <p class="text-slate-500 text-sm">Belum ada rekomendasi saat ini.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content (Sidebar) -->
        <div class="space-y-6">
          
          <!-- Compact Profile Card -->
          <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
             <div class="relative inline-block mb-3">
               <img 
                :src="userPhoto" 
                alt="Profile" 
                class="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-sm mx-auto"
              />
             </div>
             <h3 class="text-lg font-bold text-slate-900">{{ userName }}</h3>
             <p class="text-sm text-slate-500">{{ currentUser?.email }}</p>
          </div>

          <!-- Profile Completion Checklist -->
          <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm sticky top-24">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-bold text-slate-800">Status Profil</h3>
              <span class="text-sm font-black text-primary-600">{{ progressPercentage }}%</span>
            </div>
            
            <div class="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
              <div class="bg-gradient-to-r from-primary-500 to-emerald-400 h-2 rounded-full transition-all duration-1000 ease-out" :style="{ width: progressPercentage + '%' }"></div>
            </div>

            <nav class="space-y-4">
              <!-- Profile Steps -->
              <div v-for="(item, idx) in profileSteps" :key="idx" class="flex items-center group">
                <div class="flex-shrink-0 mr-3">
                   <!-- Complete: Green Check -->
                   <div v-if="item.complete" class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center ring-2 ring-white">
                    <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <!-- Incomplete: Red Warning -->
                  <div v-else class="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center ring-2 ring-white">
                    <svg class="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                </div>
                <div class="flex-1 flex items-center justify-between">
                  <p class="text-sm font-medium" :class="item.complete ? 'text-slate-700' : 'text-red-500'">{{ item.label }}</p>
                  <span v-if="!item.complete" class="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full animate-pulse">Lengkapi</span>
                </div>
              </div>
              
              <div v-if="mandatoryDocTypes.length > 0" class="pt-2 border-t border-slate-100 mt-2">
                 <!-- Update Profile Button -->
                 <div class="mb-4">
                    <router-link to="/profile" class="flex items-center justify-center w-full py-2 px-4 bg-white border border-slate-200 shadow-sm text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all group">
                      <svg class="w-4 h-4 mr-2 text-slate-400 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      Update Profil
                    </router-link>
                 </div>
                 
                 <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Dokumen Wajib</p>
                 <div v-for="docType in mandatoryDocTypes" :key="docType.id" class="flex items-center mb-2 last:mb-0">
                    <div class="flex-shrink-0 mr-3">
                      <!-- VALID: Green Check -->
                      <div v-if="getDocStatus(docType.id) === 'VALID'" class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      
                      <!-- PENDING/UPLOADED: Yellow/Blue Review -->
                      <div v-else-if="['PENDING', 'UPLOADED'].includes(getDocStatus(docType.id))" class="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center" title="Sedang Direview">
                        <svg class="w-3 h-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>

                      <!-- MISSING / INVALID: Red Warning -->
                      <div v-else class="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                        <svg class="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      </div>
                    </div>
                    
                    <div class="flex-1 flex items-center justify-between">
                       <div class="flex items-center">
                          <span class="text-sm font-medium" 
                            :class="{
                              'text-slate-700': getDocStatus(docType.id) === 'VALID',
                              'text-yellow-600': ['PENDING', 'UPLOADED'].includes(getDocStatus(docType.id)),
                              'text-red-500': !['VALID', 'PENDING', 'UPLOADED'].includes(getDocStatus(docType.id))
                            }">
                            {{ docType.name }}
                          </span>
                          <span v-if="['PENDING', 'UPLOADED'].includes(getDocStatus(docType.id))" class="text-[10px] ml-2 bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded border border-yellow-200 animate-pulse">Review</span>
                       </div>
                       <!-- Blinking Warning Text -->
                       <span v-if="!['VALID', 'PENDING', 'UPLOADED'].includes(getDocStatus(docType.id))" class="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full animate-pulse">Upload</span>
                    </div>
                 </div>
              </div>
            </nav>

            <div class="mt-6">
              <router-link to="/upload-documents" class="flex items-center justify-center w-full py-2.5 text-sm border-2 border-dashed border-slate-200 text-slate-500 rounded-xl hover:border-primary-400 hover:text-primary-600 transition-all font-medium">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                Upload Dokumen Wajib
              </router-link>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Welcome Modal -->
    <TransitionRoot as="template" :show="showWelcomeModal">
      <Dialog as="div" class="relative z-50" @close="showWelcomeModal = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-slate-900/75 transition-opacity backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md border border-slate-100">
                
                <!-- Confetti/Decoration Background -->
                <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary-500/10 to-teal-400/10"></div>
                
                <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
                  <div class="sm:flex sm:items-start text-center flex-col items-center">
                    
                    <!-- Icon -->
                    <div class="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-20 sm:w-20 mb-4 ring-8 ring-green-50">
                      <span class="text-4xl animate-bounce">🎉</span>
                    </div>

                    <div class="mt-3 text-center sm:mt-0 sm:text-center w-full">
                      <DialogTitle as="h3" class="text-2xl font-bold leading-6 text-slate-900 mb-2">
                        Selamat Datang, {{ userFirstName }}!
                      </DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-slate-500 mb-4">
                          Akun Anda telah berhasil dibuat.
                        </p>
                        
                        <div class="p-4 bg-primary-50 rounded-xl border border-primary-100/50 text-left relative overflow-hidden">
                           <!-- Decorative circle -->
                           <div class="absolute -right-4 -top-4 w-16 h-16 bg-primary-100 rounded-full opacity-50"></div>

                           <h4 class="font-bold text-primary-800 text-sm mb-1.5 flex items-center relative z-10">
                              <svg class="w-4 h-4 mr-1.5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                              Tips Cepat Diterima Kerja
                           </h4>
                           <p class="text-xs text-primary-700 leading-relaxed relative z-10">
                              Lengkapi data profil dan dokumen kamu untuk bisa melanjutkan proses berikutnya.
                           </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-slate-50 px-4 py-3 sm:flex sm:flex-col sm:px-6 gap-2">
                  <button type="button" class="btn btn-primary w-full flex justify-center items-center shadow-lg shadow-primary-600/20 py-2.5 rounded-xl font-bold" @click="navigateToProfile">
                    Lengkapi Profil Sekarang
                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                  <button type="button" class="w-full justify-center rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:text-slate-800 transition-colors" @click="showWelcomeModal = false">
                    Nanti Saja, Masuk Dashboard
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useDashboardStore } from '@/stores/dashboard'
import { useDocumentsStore } from '@/stores/documents'
import { useNotificationStore } from '@/stores/notifications'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import NavBar from '@/components/layout/NavBar.vue'

import defaultCompanyLogo from '@/assets/default-company-logo.png'
import defaultAvatar from '@/assets/default-avatar.png'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const documentsStore = useDocumentsStore()
const notificationStore = useNotificationStore()

const { currentUser, educations, experiences, skills } = storeToRefs(authStore)
const { applications, profileViews, recommendations, tasks, loading: loadingDashboard } = storeToRefs(dashboardStore)
const { documentTypes, userDocuments } = storeToRefs(documentsStore)
const { notifications } = storeToRefs(notificationStore)

const userName = computed(() => currentUser.value?.full_name || 'User')
const userFirstName = computed(() => currentUser.value?.full_name?.split(' ')[0] || 'User')
const userPhoto = computed(() => {
  return currentUser.value?.photo_url || defaultAvatar
})

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 11) return 'Selamat Pagi'
  if (hour < 15) return 'Selamat Siang'
  if (hour < 18) return 'Selamat Sore'
  return 'Selamat Malam'
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

const profileSteps = computed(() => [
  { label: 'Informasi Dasar', complete: isBasicInfoComplete.value },
  { label: 'Pendidikan', complete: isEducationComplete.value },
])

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
  let totalItems = 2 // Basic, Edu (removed Exp & Skills from mandatory count)

  if (isBasicInfoComplete.value) completedItems++
  if (isEducationComplete.value) completedItems++
  // Removed Exp & Skills checks


  // Add mandatory docs to calculation
  if (mandatoryDocTypes.value.length > 0) {
    totalItems += mandatoryDocTypes.value.length
    mandatoryDocTypes.value.forEach(docType => {
      if (isDocComplete(docType.id)) {
        completedItems++
      }
    })
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
  // Filter out "Approved" notifications as per user request
  const filtered = notifications.value.filter(n => !n.title.toLowerCase().includes('approved'))
  return filtered.slice(0, 3)
})


const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'APPLIED': return 'bg-blue-50 text-blue-700 border border-blue-100'
    case 'REVIEWING': return 'bg-yellow-50 text-yellow-700 border border-yellow-100'
    case 'INTERVIEW': return 'bg-purple-50 text-purple-700 border border-purple-100'
    case 'HIRED': return 'bg-emerald-50 text-emerald-700 border border-emerald-100'
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

const handleNotificationClick = (notif) => {
    // Default fallback
    let path = '/upload-documents'
    
    // Try to find a document reference in the text
    if (documentTypes.value) {
        const textToCheck = (notif.title + ' ' + notif.message).toLowerCase()
        
        // Find a doc type where the name appears in the notification
        const matchedDoc = documentTypes.value.find(doc => 
           textToCheck.includes(doc.name.toLowerCase())
        )
        
        if (matchedDoc) {
            path += `?focus=${matchedDoc.slug}`
        }
    }
    
    router.push(path)
}

const handleJobSearch = () => {
  if (progressPercentage.value < 100) {
    // Show Alert (using simple alert for now, or SweetAlert if available but alert is safer)
    alert("Mohon lengkapi profil Anda hingga 100% untuk mencari lowongan pekerjaan.")
    // Optional: Scroll to profile checklist
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    router.push('/jobs')
  }
}

// Welcome Modal Logic
const showWelcomeModal = ref(false)

const navigateToProfile = () => {
  showWelcomeModal.value = false
  router.push('/profile')
}

onMounted(async () => {
  await Promise.all([
    authStore.fetchUser(),
    dashboardStore.fetchDashboardData(),
    documentsStore.fetchUserDocuments(),
    documentsStore.fetchDocumentTypes(),
    notificationStore.fetchNotifications()
  ])

  // Check for welcome query param
  if (route.query.welcome === 'true') {
    showWelcomeModal.value = true
    // Cleanup URL
    router.replace({ query: null })
  }
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

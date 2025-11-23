<template>
  <div class="min-h-screen">
    <NavBar />
    
    <!-- Hero Section -->
    <section class="pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="space-y-8 animate-slide-up">
            <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full">
              <span class="text-sm font-semibold gradient-text">✨ Platform Pencarian Kerja #1 di Indonesia</span>
            </div>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight">
              Temukan
              <span class="gradient-text block">Karir Impianmu</span>
              Dimulai Dari Sini
            </h1>
            
            <p class="text-xl text-slate-600 leading-relaxed">
              Ribuan lowongan kerja menanti. Daftar sekarang dan mulai perjalanan karirmu bersama perusahaan terbaik di Indonesia.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/register" class="btn btn-primary text-lg px-8 py-4">
                Mulai Sekarang
                <svg class="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </router-link>
              <router-link to="/jobs" class="btn btn-outline text-lg px-8 py-4">
                Lihat Lowongan
              </router-link>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 pt-8">
              <div class="text-center">
                <div class="text-3xl font-bold gradient-text">10K+</div>
                <div class="text-sm text-slate-600 mt-1">Lowongan Aktif</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold gradient-text">50K+</div>
                <div class="text-sm text-slate-600 mt-1">Kandidat</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold gradient-text">500+</div>
                <div class="text-sm text-slate-600 mt-1">Perusahaan</div>
              </div>
            </div>
          </div>

          <!-- Right Content - Illustration -->
          <div class="relative">
            <div class="relative z-10 floating">
              <div class="glass rounded-3xl p-8 space-y-6">
                <!-- Mock Job Card -->
                <div class="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl"></div>
                      <div>
                        <h3 class="font-semibold text-slate-900">Frontend Developer</h3>
                        <p class="text-sm text-slate-600">Tech Company</p>
                      </div>
                    </div>
                    <span class="badge badge-success">Remote</span>
                  </div>
                  <div class="flex items-center justify-between text-sm text-slate-600">
                    <span>💰 Rp 8-12 Juta</span>
                    <span>📍 Jakarta</span>
                  </div>
                </div>

                <!-- Mock Job Card 2 -->
                <div class="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl"></div>
                      <div>
                        <h3 class="font-semibold text-slate-900">UI/UX Designer</h3>
                        <p class="text-sm text-slate-600">Creative Agency</p>
                      </div>
                    </div>
                    <span class="badge badge-primary">Full-time</span>
                  </div>
                  <div class="flex items-center justify-between text-sm text-slate-600">
                    <span>💰 Rp 7-10 Juta</span>
                    <span>📍 Bandung</span>
                  </div>
                </div>

                <!-- Mock Job Card 3 -->
                <div class="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl"></div>
                      <div>
                        <h3 class="font-semibold text-slate-900">Marketing Manager</h3>
                        <p class="text-sm text-slate-600">E-commerce</p>
                      </div>
                    </div>
                    <span class="badge badge-warning">Hybrid</span>
                  </div>
                  <div class="flex items-center justify-between text-sm text-slate-600">
                    <span>💰 Rp 10-15 Juta</span>
                    <span>📍 Surabaya</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Decorative Elements -->
            <div class="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
            <div class="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-br from-accent-300 to-primary-300 rounded-full blur-3xl opacity-20 animate-pulse-slow" style="animation-delay: 1s;"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold font-display mb-4">
            Kenapa Memilih <span class="gradient-text">CariKerja</span>?
          </h2>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto">
            Platform terlengkap dengan fitur-fitur canggih untuk membantu perjalanan karirmu
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card group">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Pencarian Cerdas</h3>
            <p class="text-slate-600">Filter lowongan berdasarkan skill, lokasi, gaji, dan preferensi lainnya dengan mudah</p>
          </div>

          <div class="card group">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Lamar Instan</h3>
            <p class="text-slate-600">Kirim lamaran hanya dengan satu klik menggunakan profil yang sudah kamu buat</p>
          </div>

          <div class="card group">
            <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Notifikasi Real-time</h3>
            <p class="text-slate-600">Dapatkan update langsung untuk setiap perkembangan lamaranmu</p>
          </div>

          <div class="card group">
            <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Aman & Terpercaya</h3>
            <p class="text-slate-600">Data pribadimu dijamin aman dengan enkripsi tingkat enterprise</p>
          </div>

          <div class="card group">
            <div class="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Tips Karir</h3>
            <p class="text-slate-600">Akses artikel dan panduan untuk meningkatkan peluang diterima kerja</p>
          </div>

          <div class="card group">
            <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Proses Cepat</h3>
            <p class="text-slate-600">Sistem otomatis mempercepat proses screening dan review lamaran</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="glass rounded-3xl p-12 text-center relative overflow-hidden">
          <!-- Background Decoration -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10"></div>
          
          <div class="relative z-10">
            <h2 class="text-4xl md:text-5xl font-bold font-display mb-6">
              Siap Memulai Perjalanan Karirmu?
            </h2>
            <p class="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan kandidat lainnya yang sudah menemukan pekerjaan impian mereka
            </p>
            <router-link to="/register" class="btn btn-primary text-lg px-10 py-4 inline-flex items-center">
              Daftar Gratis Sekarang
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span class="text-xl font-bold">CariKerja</span>
            </div>
            <p class="text-slate-400">Platform pencarian kerja terpercaya untuk generasi muda Indonesia</p>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">Perusahaan</h3>
            <ul class="space-y-2 text-slate-400">
              <li><a href="#" class="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Karir</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">Bantuan</h3>
            <ul class="space-y-2 text-slate-400">
              <li><a href="#" class="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Kontak</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">Ikuti Kami</h3>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div class="border-t border-slate-800 pt-8 text-center text-slate-400">
          <p>&copy; 2025 CariKerja. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import NavBar from '@/components/layout/NavBar.vue'
</script>

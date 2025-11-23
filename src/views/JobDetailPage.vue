<template>
  <div class="min-h-screen">
    <NavBar />
    
    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="mb-8">
          <router-link to="/jobs" class="inline-flex items-center text-slate-600 hover:text-primary-600 mb-4 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Lowongan
          </router-link>
          <h1 class="text-4xl font-bold font-display mb-2">Frontend Developer</h1>
          <p class="text-xl text-slate-600">Tech Company Indonesia</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Company Info -->
            <div class="card">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl"></div>
                <div>
                  <h2 class="text-2xl font-bold">Tech Company Indonesia</h2>
                  <p class="text-slate-600">Technology • 500+ Karyawan</p>
                </div>
              </div>
            </div>

            <!-- Job Description -->
            <div class="card">
              <h3 class="text-xl font-bold mb-4">Deskripsi Pekerjaan</h3>
              <div class="prose prose-slate max-w-none">
                <p>Kami mencari Frontend Developer yang passionate dan berpengalaman untuk bergabung dengan tim kami. Anda akan bertanggung jawab untuk mengembangkan dan memelihara aplikasi web modern menggunakan teknologi terkini.</p>
                
                <h4 class="font-bold mt-6 mb-3">Tanggung Jawab:</h4>
                <ul class="space-y-2">
                  <li>Mengembangkan fitur-fitur baru menggunakan Vue.js</li>
                  <li>Berkolaborasi dengan tim design dan backend</li>
                  <li>Memastikan performa aplikasi optimal</li>
                  <li>Menulis kode yang clean dan maintainable</li>
                </ul>

                <h4 class="font-bold mt-6 mb-3">Kualifikasi:</h4>
                <ul class="space-y-2">
                  <li>Minimal 2 tahun pengalaman dengan Vue.js</li>
                  <li>Menguasai HTML, CSS, JavaScript</li>
                  <li>Familiar dengan Git dan version control</li>
                  <li>Kemampuan problem-solving yang baik</li>
                </ul>
              </div>
            </div>

            <!-- Benefits -->
            <div class="card">
              <h3 class="text-xl font-bold mb-4">Benefit & Fasilitas</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span class="text-slate-700">Gaji Kompetitif</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span class="text-slate-700">Asuransi Kesehatan</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span class="text-slate-700">Training & Development</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span class="text-slate-700">Work From Home</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Job Info -->
            <div class="card">
              <h3 class="text-lg font-bold mb-4">Informasi Pekerjaan</h3>
              <div class="space-y-4">
                <div>
                  <div class="text-sm text-slate-600 mb-1">Lokasi</div>
                  <div class="font-semibold">Jakarta, Indonesia</div>
                </div>
                <div>
                  <div class="text-sm text-slate-600 mb-1">Tipe Pekerjaan</div>
                  <div class="font-semibold">Full-time</div>
                </div>
                <div>
                  <div class="text-sm text-slate-600 mb-1">Sistem Kerja</div>
                  <div class="font-semibold">Remote</div>
                </div>
                <div>
                  <div class="text-sm text-slate-600 mb-1">Gaji</div>
                  <div class="font-semibold">Rp 8.000.000 - Rp 12.000.000</div>
                </div>
                <div>
                  <div class="text-sm text-slate-600 mb-1">Pengalaman</div>
                  <div class="font-semibold">2+ Tahun</div>
                </div>
                <div>
                  <div class="text-sm text-slate-600 mb-1">Pendidikan</div>
                  <div class="font-semibold">Minimal S1</div>
                </div>
                <div>
                  <div class="text-sm text-slate-600 mb-1">Deadline</div>
                  <div class="font-semibold text-red-600">15 Desember 2025</div>
                </div>
              </div>
            </div>

            <!-- Apply Button -->
            <button class="btn btn-primary w-full text-lg">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Lamar Sekarang
            </button>

            <!-- Share -->
            <div class="card">
              <h3 class="text-lg font-bold mb-4">Bagikan Lowongan</h3>
              <div class="flex space-x-2">
                <button class="flex-1 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                  <svg class="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button class="flex-1 p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors">
                  <svg class="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button class="flex-1 p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
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
</template>

<script setup>
import NavBar from '@/components/layout/NavBar.vue'
</script>

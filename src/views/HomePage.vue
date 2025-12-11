<template>
  <div class="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 overflow-x-hidden">
    <NavBar />

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden z-0">
        <!-- Background Gradient matching the reference (Yellowish/Gold to Blueish) -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-amber-50 -z-10"></div>
        
        <!-- Subtle pattern overlay -->
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 -z-10"></div>

        <div class="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
            
            <!-- Left Content -->
            <div class="z-10 max-w-2xl relative">
                <!-- Vertical Line Decoration -->
                <div class="absolute -left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-brand-teal to-brand-gold opacity-30 hidden lg:block"></div>

                <h1 class="text-4xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-6 font-display">
                    Karir Impian <br>
                    <span class="text-teal-700">Internasional</span> <br>
                    Menanti Anda
                </h1>
                
                <p class="text-slate-700 text-lg leading-relaxed mb-8 max-w-lg font-medium">
                    "Connecting Talent with Opportunity"
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4">
                     <router-link v-if="!isAuthenticated" to="/register" class="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-md bg-[#008B99] px-8 font-medium text-white shadow-lg shadow-teal-500/30 transition-all duration-300 hover:bg-teal-700 hover:shadow-teal-500/50 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2">
                        <span class="relative flex items-center gap-2 text-lg">
                            Daftar Sekarang
                        </span>
                         <div class="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                    </router-link>
                </div>
            </div>

            <!-- Right Content (Visual Composition) -->
            <div class="relative h-[600px] w-full hidden lg:block">
                <!-- Decorative SVG Lines (Gold Curves) -->
                <!-- Decorative background elements -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-100" viewBox="0 0 600 600" fill="none">
                    <defs>
                        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#C5A668;stop-opacity:0.6" />
                            <stop offset="100%" style="stop-color:#F59E0B;stop-opacity:0.3" />
                        </linearGradient>
                        <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" style="stop-color:#C5A668;stop-opacity:0.2" />
                            <stop offset="100%" style="stop-color:#C5A668;stop-opacity:0" />
                        </radialGradient>
                    </defs>

                    <!-- Large Soft Glow -->
                    <circle cx="300" cy="300" r="250" fill="url(#glow)" />

                    <!-- Intricate Mandala-like Rings -->
                    <circle cx="300" cy="300" r="280" stroke="#C5A668" stroke-width="2" stroke-dasharray="4 8" class="opacity-40 animate-spin-slow" />
                    <circle cx="300" cy="300" r="220" stroke="#C5A668" stroke-width="2" stroke-dasharray="10 20" class="opacity-30" />
                    <path d="M300 100 Q 500 200 500 300 T 300 500 T 100 300 T 300 100" stroke="#C5A668" stroke-width="1.5" fill="none" class="opacity-50" />
                    
                    <!-- Dynamic Offset Blobs/Curves -->
                    <path d="M150 150 C 250 50, 450 50, 550 150 S 550 450, 450 550 S 150 550, 50 450 S 50 250, 150 150" stroke="url(#goldGradient)" stroke-width="3" fill="none" class="opacity-70 animate-pulse-border" style="animation-duration: 8s" />
                    
                    <!-- Scattered Particles -->
                    <g class="animate-float-slow">
                        <circle cx="120" cy="120" r="3" fill="#008B99" />
                        <circle cx="480" cy="80" r="4" fill="#C5A668" />
                        <circle cx="520" cy="480" r="3" fill="#008B99" />
                        <circle cx="80" cy="500" r="5" fill="#C5A668" />
                        <circle cx="300" cy="580" r="3" fill="#C5A668" />
                    </g>


                </svg>

                <!-- Circle 1: Room/Lobby (Top Leftish) -->
                <div class="absolute top-12 left-1/4 -translate-x-12 w-48 h-48 rounded-full border-4 border-white shadow-2xl overflow-hidden z-20 group hover:scale-110 transition-transform duration-500 animate-float-slow">
                    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover" alt="Luxury Resort">
                </div>

                <!-- Circle 2: Chef (Top Rightish) -->
                <div class="absolute top-24 right-8 w-52 h-52 rounded-full border-4 border-white shadow-2xl overflow-hidden z-20 group hover:scale-110 transition-transform duration-500 animate-float-slow" style="animation-delay: 2s;">
                    <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover" alt="Professional Chef">
                </div>

                <!-- Circle 3: Service (Bottom Leftish) -->
                <div class="absolute bottom-32 left-4 w-44 h-44 rounded-full border-4 border-white shadow-2xl overflow-hidden z-20 group hover:scale-110 transition-transform duration-500 animate-float-slow bg-slate-200" style="animation-delay: 1.5s;">
                    <img src="https://images.unsplash.com/photo-1512061942530-e6a4e9a5cf27?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover" alt="Waiter">
                </div>

                <!-- Circle 4: Pool/Resort (Bottom Rightish) -->
                <div class="absolute bottom-16 right-1/4 translate-x-12 w-56 h-56 rounded-full border-4 border-white shadow-2xl overflow-hidden z-20 group hover:scale-110 transition-transform duration-500 bg-slate-200 animate-float-slow" style="animation-delay: 0.5s;">
                    <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover" alt="Resort Pool">
                </div>
                
                <!-- Diamond Decor (Center-ish) -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-gold rotate-45 opacity-20"></div>
            </div>
        </div>
    </section>

    <!-- Features Section (Connected Flow) -->
    <section class="pt-12 pb-24 bg-gradient-to-b from-white to-blue-50/30 relative">
        <div class="container mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-4xl font-bold text-slate-900 mb-4 font-display">Kenapa Memilih <span class="text-slate-900">{{ appName }}?</span></h2>
                <p class="text-slate-500 text-lg">Platform terlengkap dengan fitur-fitur canggih untuk membantu perjalanan karirmu</p>
            </div>

            <div class="relative max-w-6xl mx-auto">
                <!-- The Wave Connector Line -->
                <div class="hidden md:block absolute top-[60px] left-0 w-full h-20 -z-10">
                   <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
                       <defs>
                           <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                               <stop offset="0%" style="stop-color:#3b82f6" /> <!-- Blue -->
                               <stop offset="50%" style="stop-color:#008B99" /> <!-- Teal -->
                               <stop offset="100%" style="stop-color:#C5A668" /> <!-- Gold -->
                           </linearGradient>
                       </defs>
                       <path d="M0,50 C250,50 250,50 500,50 C750,50 750,50 1000,50" stroke="url(#lineGradient)" stroke-width="4" fill="none" class="animate-dash" />
                       <!-- Arrow head at end -->
                       <path d="M990,40 L1000,50 L990,60" stroke="#C5A668" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <!-- Feature 1 -->
                    <div class="relative group">
                        <div class="w-32 h-32 mx-auto bg-white rounded-full shadow-xl border-4 border-blue-100 flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300 z-10 relative animate-float-slow">
                            <i class="ph-duotone ph-globe text-5xl text-blue-500 group-hover:scale-110 transition-transform duration-300"></i>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">1. Pencarian Global</h3>
                        <p class="text-slate-700 text-sm leading-relaxed px-8 font-medium">
                            Filter lowongan perusahaan di berbagai negara.
                        </p>
                    </div>

                    <!-- Feature 2 -->
                    <div class="relative group">
                        <!-- Connecting Arrows for Tablet/Mobile if needed, hidden on Desktop due to SVG line -->
                        <div class="w-32 h-32 mx-auto bg-white rounded-full shadow-xl border-4 border-teal-100 flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300 z-10 relative animate-float-slow" style="animation-delay: 1.5s;">
                            <i class="ph-duotone ph-rocket-launch text-5xl text-brand-teal group-hover:scale-110 transition-transform duration-300"></i>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">2. Proses Lamar Efisien</h3>
                        <p class="text-slate-700 text-sm leading-relaxed px-8 font-medium">
                            Kirim lamaran profesional Anda dengan profil yang otomatis disesuaikan.
                        </p>
                    </div>

                    <!-- Feature 3 -->
                    <div class="relative group">
                        <div class="w-32 h-32 mx-auto bg-white rounded-full shadow-xl border-4 border-amber-100 flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300 z-10 relative animate-float-slow" style="animation-delay: 0.5s;">
                            <i class="ph-duotone ph-bell-ringing text-5xl text-brand-gold group-hover:scale-110 transition-transform duration-300"></i>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">3. Notifikasi Real-time</h3>
                        <p class="text-slate-700 text-sm leading-relaxed px-8 font-medium">
                            Pantau status lamaran di mana pun Anda berada.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer (Dark Navy) -->
    <!-- Footer (Dark Navy) -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const appName = import.meta.env.VITE_APP_NAME || 'CariKerja'
const currentYear = ref(new Date().getFullYear())
</script>

<style scoped>
@keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes float-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
}

@keyframes pulse-border {
    0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
}

.animate-spin-slow {
    animation: spin-slow 120s linear infinite;
    transform-origin: center;
}

.animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
}

.animate-pulse-border {
    animation: pulse-border 2s infinite;
}

@keyframes dash {
    to {
        stroke-dashoffset: -1000;
    }
}

.animate-dash {
    stroke-dasharray: 20 10;
    animation: dash 20s linear infinite;
}
</style>
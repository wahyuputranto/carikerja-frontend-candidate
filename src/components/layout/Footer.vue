<template>
    <footer class="bg-[#0F172A] text-slate-300 py-16">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <!-- Brand -->
                <div class="col-span-1 md:col-span-1">
                    <div class="flex items-center gap-2 text-white text-2xl font-bold mb-6 font-display">
                        <img :src="logoZmi" alt="Logo" class="h-12 w-auto brightness-0 invert" />
                    </div>
                    <p class="text-sm opacity-80 mb-6 max-w-xs">
                        Platform pencarian kerja terpercaya untuk generasi muda Indonesia.
                    </p>
                </div>

                <!-- Perusahaan -->
                <div>
                     <h4 class="text-white font-bold mb-6">Perusahaan</h4>
                     <ul class="space-y-3 text-sm">
                         <li><router-link to="/about" class="hover:text-white transition">Tentang Kami</router-link></li>
                         <li><a href="#" class="hover:text-white transition">Karir</a></li>
                         <li><a href="#" class="hover:text-white transition">Blog</a></li>
                     </ul>
                </div>

                <!-- Bantuan -->
                <div>
                     <h4 class="text-white font-bold mb-6">Bantuan</h4>
                     <ul class="space-y-3 text-sm">
                         <li><a href="#" class="hover:text-white transition">FAQ</a></li>
                         <li><a href="#" class="hover:text-white transition">Kontak</a></li>
                         <li><a href="#" class="hover:text-white transition">Syarat & Ketentuan</a></li>
                     </ul>
                </div>

                <!-- Socials -->
                <div>
                    <h4 class="text-white font-bold mb-6">Ikuti Kami</h4>
                    <div class="flex gap-3">
                         <a href="#" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-white hover:text-brand-dark transition duration-300">
                             <i class="ph-bold ph-facebook-logo text-xl"></i>
                         </a>
                         <a href="#" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-white hover:text-brand-dark transition duration-300">
                             <i class="ph-bold ph-twitter-logo text-xl"></i>
                         </a>
                         <a href="#" class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-white hover:text-brand-dark transition duration-300">
                             <i class="ph-bold ph-instagram-logo text-xl"></i>
                         </a>
                    </div>
                </div>
            </div>

            <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-60">
                <p>&copy; {{ currentYear }} {{ appName }}. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue'

const appName = import.meta.env.VITE_APP_NAME || 'ZMI Jobs'
const currentYear = ref(new Date().getFullYear())
import logoZmi from '@/assets/logo_zmi.png'
</script>

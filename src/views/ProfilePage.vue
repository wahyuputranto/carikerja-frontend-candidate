<template>
  <div class="min-h-screen">
    <NavBar />
    
    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold font-display mb-8">
          <span class="gradient-text">Profil Saya</span>
        </h1>

        <div class="glass rounded-3xl p-8">
          <div class="text-center mb-8">
            <div class="inline-block relative">
              <div class="w-32 h-32 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-4">
                {{ userInitials }}
              </div>
              <button class="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
                <input type="text" value="John Doe" class="input" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input type="email" value="john@example.com" class="input" />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Nomor Telepon</label>
                <input type="tel" value="08123456789" class="input" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Tanggal Lahir</label>
                <input type="date" value="1995-01-01" class="input" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Alamat</label>
              <textarea rows="3" class="input resize-none">Jl. Contoh No. 123, Jakarta</textarea>
            </div>

            <div class="flex justify-end space-x-4">
              <button class="btn btn-outline">Batal</button>
              <button class="btn btn-primary">Simpan Perubahan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import NavBar from '@/components/layout/NavBar.vue'

const authStore = useAuthStore()

const userInitials = computed(() => {
  if (!authStore.user) return 'U'
  const name = authStore.user.name || authStore.user.email || 'User'
  return name.charAt(0).toUpperCase()
})
</script>

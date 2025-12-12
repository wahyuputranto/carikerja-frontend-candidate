<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Back Button -->
      <router-link to="/" class="inline-flex items-center text-slate-600 hover:text-primary-600 mb-8 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Beranda
      </router-link>

      <!-- Login Card -->
      <div class="glass rounded-3xl p-8 md:p-10 animate-scale-in">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center mb-6">
            <img :src="logoZmi" alt="ZmiJobs Logo" class="h-20 w-auto" />
          </div>
          <h1 class="text-3xl font-bold font-display mb-2">Selamat Datang Kembali!</h1>
          <p class="text-slate-600">Masuk untuk melanjutkan perjalanan karirmu</p>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 animate-slide-down">
          <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="flex-1">
            <p class="text-sm font-medium text-red-800">{{ error }}</p>
          </div>
          <button @click="error = null" class="text-red-400 hover:text-red-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="identifier" class="block text-sm font-semibold text-slate-700 mb-2">
              Nomor Telepon atau Email
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="identifier"
                v-model="form.identifier"
                type="text"
                placeholder="No. HP / Email"
                class="input w-full !pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                :class="{ 'input-error border-red-500': errors.identifier }"
                required
              />
            </div>
            <p v-if="errors.identifier" class="mt-1 text-sm text-red-600">{{ errors.identifier }}</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="input w-full !pl-10 !pr-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                :class="{ 'input-error border-red-500': errors.password }"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center cursor-pointer">
              <input type="checkbox" v-model="form.remember" class="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500 transition-colors">
              <span class="ml-2 text-sm text-slate-600 select-none">Ingat saya</span>
            </label>
            <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
              Lupa password?
            </a>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="btn w-full text-lg relative transform active:scale-[0.98] transition-all bg-[#008B99] hover:bg-[#007480] text-white border-none shadow-lg shadow-teal-500/30"
          >
            <span v-if="!loading">Masuk</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </span>
          </button>
        </form>

        <!-- Register Link -->
        <p class="mt-8 text-center text-slate-600">
          Belum punya akun?
          <router-link to="/register" class="font-semibold text-primary-600 hover:text-primary-700">
            Daftar sekarang
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import logoZmi from '@/assets/logo_zmi.png'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  identifier: '',
  password: '',
  remember: false
})

const showPassword = ref(false)
const loading = ref(false)
const error = ref(null)
const errors = ref({})

const handleLogin = async () => {
  // Reset errors
  error.value = null
  errors.value = {}
  
  // Basic validation
  if (!form.value.identifier) {
    errors.value.identifier = 'Email atau Nomor Telepon wajib diisi'
    return
  }
  
  if (!form.value.password) {
    errors.value.password = 'Password wajib diisi'
    return
  }

  loading.value = true

  try {
    const result = await authStore.login({
      identifier: form.value.identifier,
      password: form.value.password
    })

    if (result.success) {
      router.push('/dashboard')
    } else {
      error.value = result.error
    }
  } catch (err) {
    console.error(err)
    error.value = 'Terjadi kesalahan. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>

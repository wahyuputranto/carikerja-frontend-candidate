<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-2xl">
      <!-- Back Button -->
      <router-link to="/" class="inline-flex items-center text-slate-600 hover:text-primary-600 mb-8 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Beranda
      </router-link>

      <!-- Registration Card -->
      <div class="glass rounded-3xl p-8 md:p-10 animate-scale-in">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-4">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold font-display mb-2">Daftar Akun Baru</h1>
          <p class="text-slate-600">Mulai perjalanan karirmu bersama kami</p>
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

        <!-- Form -->
        <form @submit.prevent="handleSubmit">
          <div class="space-y-6 animate-fade-in">
            <!-- Account Info -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Lengkap *
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="John Doe"
                  class="input"
                  :class="{ 'input-error': errors.name }"
                  required
                />
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="john@example.com"
                  class="input"
                  :class="{ 'input-error': errors.email }"
                  required
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
              </div>
            </div>

            <!-- NIK & Phone -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">
                  Nomor KTP (NIK) *
                </label>
                <input
                  v-model="form.nik"
                  type="text"
                  placeholder="16 digit NIK"
                  class="input"
                  :class="{ 'input-error': errors.nik }"
                  maxlength="16"
                  required
                />
                <p v-if="errors.nik" class="mt-1 text-sm text-red-600">{{ errors.nik }}</p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">
                  Nomor Telepon *
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="08123456789"
                  class="input"
                  :class="{ 'input-error': errors.phone }"
                  required
                />
                <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">
                Password *
              </label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Minimal 8 karakter"
                  class="input pr-12"
                  :class="{ 'input-error': errors.password }"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
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

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">
                Konfirmasi Password *
              </label>
              <input
                v-model="form.password_confirmation"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Ulangi password"
                class="input"
                :class="{ 'input-error': errors.password_confirmation }"
                required
              />
              <p v-if="errors.password_confirmation" class="mt-1 text-sm text-red-600">{{ errors.password_confirmation }}</p>
            </div>

            <!-- Preferences Info -->
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">
                Minat Kategori Pekerjaan
              </label>
              <select
                v-model="form.interested_job_category_id"
                class="input"
                :class="{ 'input-error': errors.interested_job_category_id }"
              >
                <option value="">Pilih kategori</option>
                <option v-for="category in masterStore.categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <p v-if="errors.interested_job_category_id" class="mt-1 text-sm text-red-600">{{ errors.interested_job_category_id }}</p>
            </div>

            <div>
              <label class="flex items-start space-x-3">
                <input
                  v-model="form.agree_terms"
                  type="checkbox"
                  class="w-5 h-5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 mt-0.5"
                  required
                />
                <span class="text-sm text-slate-600">
                  Saya setuju dengan <a href="#" class="text-primary-600 hover:text-primary-700 font-medium">Syarat & Ketentuan</a> dan <a href="#" class="text-primary-600 hover:text-primary-700 font-medium">Kebijakan Privasi</a>
                </span>
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-8 pt-6 border-t border-slate-200">
            <button
              type="submit"
              :disabled="loading"
              class="btn btn-primary w-full"
            >
              <span v-if="!loading">Daftar Sekarang</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            </button>
          </div>
        </form>

        <!-- Login Link -->
        <p class="mt-8 text-center text-slate-600">
          Sudah punya akun?
          <router-link to="/login" class="font-semibold text-primary-600 hover:text-primary-700">
            Masuk di sini
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMasterStore } from '@/stores/master'

const router = useRouter()
const authStore = useAuthStore()
const masterStore = useMasterStore()

const showPassword = ref(false)
const loading = ref(false)
const error = ref(null)
const errors = ref({})

const form = ref({
  nik: '',
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  interested_job_category_id: '',
  agree_terms: false
})

onMounted(() => {
  masterStore.fetchAll()
})

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.nik) errors.value.nik = 'NIK wajib diisi'
  else if (!/^\d{16}$/.test(form.value.nik)) errors.value.nik = 'NIK harus 16 digit angka'
  
  if (!form.value.name) errors.value.name = 'Nama wajib diisi'
  if (!form.value.email) errors.value.email = 'Email wajib diisi'
  if (!form.value.phone) errors.value.phone = 'Nomor telepon wajib diisi'
  if (!form.value.password) errors.value.password = 'Password wajib diisi'
  if (form.value.password.length < 8) errors.value.password = 'Password minimal 8 karakter'
  if (form.value.password !== form.value.password_confirmation) {
    errors.value.password_confirmation = 'Password tidak cocok'
  }
  if (!form.value.interested_job_category_id) errors.value.interested_job_category_id = 'Kategori pekerjaan wajib dipilih'
  if (!form.value.agree_terms) {
    error.value = 'Anda harus menyetujui syarat & ketentuan'
    return false
  }

  if (Object.keys(errors.value).length > 0) {
    error.value = 'Mohon lengkapi semua form yang wajib diisi dengan benar'
    return false
  }
  
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  error.value = null

  try {
    const result = await authStore.register(form.value)

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

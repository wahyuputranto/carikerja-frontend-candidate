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

        <!-- Progress Steps -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <div 
              v-for="(step, index) in steps" 
              :key="index"
              class="flex items-center"
              :class="{ 'flex-1': index < steps.length - 1 }"
            >
              <div class="flex flex-col items-center">
                <div 
                  class="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300"
                  :class="currentStep > index ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white' : currentStep === index ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white ring-4 ring-primary-100' : 'bg-slate-200 text-slate-500'"
                >
                  <svg v-if="currentStep > index" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <span class="text-xs mt-2 font-medium" :class="currentStep >= index ? 'text-primary-600' : 'text-slate-400'">
                  {{ step }}
                </span>
              </div>
              <div 
                v-if="index < steps.length - 1" 
                class="flex-1 h-1 mx-2 rounded-full transition-all duration-300"
                :class="currentStep > index ? 'bg-gradient-to-r from-primary-500 to-secondary-500' : 'bg-slate-200'"
              ></div>
            </div>
          </div>
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

        <!-- Form Steps -->
        <form @submit.prevent="handleSubmit">
          <!-- Step 1: Account Info -->
          <div v-show="currentStep === 0" class="space-y-6 animate-fade-in">
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
          </div>

          <!-- Step 2: Personal Info -->
          <div v-show="currentStep === 1" class="space-y-6 animate-fade-in">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">
                  Tanggal Lahir *
                </label>
                <input
                  v-model="form.birth_date"
                  type="date"
                  class="input"
                  :class="{ 'input-error': errors.birth_date }"
                  required
                />
                <p v-if="errors.birth_date" class="mt-1 text-sm text-red-600">{{ errors.birth_date }}</p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">
                  Jenis Kelamin *
                </label>
                <select
                  v-model="form.gender"
                  class="input"
                  :class="{ 'input-error': errors.gender }"
                  required
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
                <p v-if="errors.gender" class="mt-1 text-sm text-red-600">{{ errors.gender }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">
                Alamat Lengkap *
              </label>
              <textarea
                v-model="form.address"
                rows="3"
                placeholder="Jl. Contoh No. 123, RT/RW 01/02"
                class="input resize-none"
                :class="{ 'input-error': errors.address }"
                required
              ></textarea>
              <p v-if="errors.address" class="mt-1 text-sm text-red-600">{{ errors.address }}</p>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">
                  Kota *
                </label>
                <input
                  v-model="form.city"
                  type="text"
                  placeholder="Jakarta"
                  class="input"
                  :class="{ 'input-error': errors.city }"
                  required
                />
                <p v-if="errors.city" class="mt-1 text-sm text-red-600">{{ errors.city }}</p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">
                  Provinsi *
                </label>
                <input
                  v-model="form.province"
                  type="text"
                  placeholder="DKI Jakarta"
                  class="input"
                  :class="{ 'input-error': errors.province }"
                  required
                />
                <p v-if="errors.province" class="mt-1 text-sm text-red-600">{{ errors.province }}</p>
              </div>
            </div>
          </div>

          <!-- Step 3: Preferences -->
          <div v-show="currentStep === 2" class="space-y-6 animate-fade-in">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">
                Pendidikan Terakhir *
              </label>
              <select
                v-model="form.education"
                class="input"
                :class="{ 'input-error': errors.education }"
                required
              >
                <option value="">Pilih pendidikan</option>
                <option value="sma">SMA/SMK</option>
                <option value="d3">D3</option>
                <option value="s1">S1</option>
                <option value="s2">S2</option>
                <option value="s3">S3</option>
              </select>
              <p v-if="errors.education" class="mt-1 text-sm text-red-600">{{ errors.education }}</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">
                Keahlian (Pisahkan dengan koma)
              </label>
              <input
                v-model="form.skills"
                type="text"
                placeholder="JavaScript, Vue.js, Node.js"
                class="input"
              />
              <p class="mt-1 text-sm text-slate-500">Contoh: JavaScript, Vue.js, Node.js</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">
                Pengalaman Kerja
              </label>
              <select
                v-model="form.experience"
                class="input"
              >
                <option value="">Pilih pengalaman</option>
                <option value="fresh">Fresh Graduate</option>
                <option value="1">1 Tahun</option>
                <option value="2">2 Tahun</option>
                <option value="3">3 Tahun</option>
                <option value="5">5+ Tahun</option>
              </select>
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

          <!-- Navigation Buttons -->
          <div class="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
            <button
              v-if="currentStep > 0"
              type="button"
              @click="currentStep--"
              class="btn btn-outline"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali
            </button>
            <div v-else></div>

            <button
              v-if="currentStep < steps.length - 1"
              type="button"
              @click="nextStep"
              class="btn btn-primary"
            >
              Lanjut
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              v-else
              type="submit"
              :disabled="loading"
              class="btn btn-primary"
            >
              <span v-if="!loading">Daftar Sekarang</span>
              <span v-else class="flex items-center">
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const steps = ['Akun', 'Biodata', 'Preferensi']
const currentStep = ref(0)
const showPassword = ref(false)
const loading = ref(false)
const error = ref(null)
const errors = ref({})

const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  birth_date: '',
  gender: '',
  address: '',
  city: '',
  province: '',
  education: '',
  skills: '',
  experience: '',
  agree_terms: false
})

const validateStep = () => {
  errors.value = {}
  
  if (currentStep.value === 0) {
    if (!form.value.name) errors.value.name = 'Nama wajib diisi'
    if (!form.value.email) errors.value.email = 'Email wajib diisi'
    if (!form.value.phone) errors.value.phone = 'Nomor telepon wajib diisi'
    if (!form.value.password) errors.value.password = 'Password wajib diisi'
    if (form.value.password.length < 8) errors.value.password = 'Password minimal 8 karakter'
    if (form.value.password !== form.value.password_confirmation) {
      errors.value.password_confirmation = 'Password tidak cocok'
    }
  } else if (currentStep.value === 1) {
    if (!form.value.birth_date) errors.value.birth_date = 'Tanggal lahir wajib diisi'
    if (!form.value.gender) errors.value.gender = 'Jenis kelamin wajib dipilih'
    if (!form.value.address) errors.value.address = 'Alamat wajib diisi'
    if (!form.value.city) errors.value.city = 'Kota wajib diisi'
    if (!form.value.province) errors.value.province = 'Provinsi wajib diisi'
  } else if (currentStep.value === 2) {
    if (!form.value.education) errors.value.education = 'Pendidikan wajib dipilih'
    if (!form.value.agree_terms) {
      error.value = 'Anda harus menyetujui syarat & ketentuan'
      return false
    }
  }
  
  return Object.keys(errors.value).length === 0
}

const nextStep = () => {
  if (validateStep()) {
    currentStep.value++
  }
}

const handleSubmit = async () => {
  if (!validateStep()) return
  
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
    error.value = 'Terjadi kesalahan. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>

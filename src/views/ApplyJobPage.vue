<template>
  <div class="min-h-screen">
    <NavBar />
    
    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <router-link :to="`/jobs/${jobId}`" class="inline-flex items-center text-slate-600 hover:text-primary-600 mb-4 transition-colors">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Detail Lowongan
          </router-link>
          <h1 class="text-4xl font-bold font-display mb-2">Lamar Pekerjaan</h1>
          <p class="text-xl text-slate-600">Lengkapi formulir di bawah untuk melamar posisi ini</p>
        </div>

        <!-- Success Message -->
        <div v-if="submitted" class="card bg-green-50 border-green-200 mb-8">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-green-900 mb-2">Lamaran Berhasil Dikirim!</h3>
              <p class="text-green-800 mb-4">Terima kasih telah melamar. Kami akan meninjau lamaran Anda dan menghubungi Anda segera.</p>
              <div class="flex space-x-4">
                <router-link to="/applications" class="btn btn-primary">
                  Lihat Lamaran Saya
                </router-link>
                <router-link to="/jobs" class="btn bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50">
                  Cari Lowongan Lain
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Application Form -->
        <div v-else class="card">
          <!-- Error Alert -->
          <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
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

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Cover Letter -->
            <div>
              <label for="cover_letter" class="block text-sm font-semibold text-slate-700 mb-2">
                Surat Lamaran <span class="text-red-500">*</span>
              </label>
              <textarea
                id="cover_letter"
                v-model="form.cover_letter"
                rows="8"
                placeholder="Ceritakan mengapa Anda cocok untuk posisi ini dan apa yang membuat Anda tertarik dengan pekerjaan ini..."
                class="input w-full"
                required
              ></textarea>
              <p class="mt-1 text-sm text-slate-500">Minimal 100 karakter</p>
            </div>

            <!-- Additional Notes -->
            <div>
              <label for="notes" class="block text-sm font-semibold text-slate-700 mb-2">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                id="notes"
                v-model="form.notes"
                rows="4"
                placeholder="Informasi tambahan yang ingin Anda sampaikan..."
                class="input w-full"
              ></textarea>
            </div>

            <!-- Terms Agreement -->
            <div class="flex items-start space-x-3">
              <input
                id="terms"
                v-model="form.terms"
                type="checkbox"
                class="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500 mt-1"
                required
              />
              <label for="terms" class="text-sm text-slate-600">
                Saya menyatakan bahwa semua informasi yang saya berikan adalah benar dan akurat. Saya memahami bahwa informasi palsu dapat mengakibatkan diskualifikasi.
              </label>
            </div>

            <!-- Submit Button -->
            <div class="flex space-x-4">
              <button
                type="submit"
                :disabled="loading"
                class="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!loading">Kirim Lamaran</span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </span>
              </button>
              <router-link :to="`/jobs/${jobId}`" class="btn bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50">
                Batal
              </router-link>
            </div>
          </form>
        </div>

        <!-- Profile Completion Notice -->
        <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div class="flex items-start space-x-3">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p class="text-sm font-medium text-blue-900">Pastikan profil Anda lengkap</p>
              <p class="text-sm text-blue-800 mt-1">Profil yang lengkap meningkatkan peluang Anda untuk diterima.</p>
              <router-link to="/profile" class="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-2 inline-block">
                Lengkapi Profil →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const jobId = route.params.id
const loading = ref(false)
const error = ref(null)
const submitted = ref(false)

const form = ref({
  cover_letter: '',
  notes: '',
  terms: false
})

const handleSubmit = async () => {
  // Validation
  if (form.value.cover_letter.length < 100) {
    error.value = 'Surat lamaran harus minimal 100 karakter'
    return
  }

  if (!form.value.terms) {
    error.value = 'Anda harus menyetujui pernyataan'
    return
  }

  loading.value = true
  error.value = null

  try {
    // API Call - POST /api/v1/applications
    const payload = {
      job_id: jobId,
      cover_letter: form.value.cover_letter,
      notes: form.value.notes || null
    }
    
    await api.post('/applications', payload)
    
    submitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err) {
    console.error('Error submitting application:', err)
    error.value = err.response?.data?.message || 'Gagal mengirim lamaran. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen">
    <NavBar />
    
    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="mb-8">
          <h1 class="text-4xl font-bold font-display mb-2">
            Upload <span class="gradient-text">Dokumen</span>
          </h1>
          <p class="text-xl text-slate-600">Lengkapi dokumen-dokumen yang diperlukan untuk melamar pekerjaan</p>
        </div>

        <!-- Progress -->
        <div class="glass rounded-2xl p-6 mb-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-lg">Progress Kelengkapan</h3>
            <span class="text-2xl font-bold gradient-text">{{ uploadProgress }}%</span>
          </div>
          <div class="progress-bar h-3">
            <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
          </div>
          <p class="text-sm text-slate-600 mt-2">{{ completedDocs }} dari {{ totalDocs }} dokumen telah diupload</p>
        </div>

        <!-- Document Upload Cards -->
        <div class="space-y-6">
          <!-- KTP -->
          <div class="card">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-lg">KTP (Kartu Tanda Penduduk)</h3>
                  <p class="text-sm text-slate-600">Format: JPG, PNG • Max: 2MB</p>
                </div>
              </div>
              <span class="badge badge-error">Wajib</span>
            </div>

            <div v-if="!documents.ktp" class="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <input type="file" class="hidden" id="ktp-upload" accept="image/*" @change="handleFileUpload('ktp', $event)">
              <label for="ktp-upload" class="cursor-pointer">
                <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p class="text-slate-700 font-medium mb-1">Klik untuk upload atau drag & drop</p>
                <p class="text-sm text-slate-500">JPG, PNG maksimal 2MB</p>
              </label>
            </div>

            <div v-else class="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-green-900">{{ documents.ktp.name }}</p>
                  <p class="text-sm text-green-700">{{ formatFileSize(documents.ktp.size) }}</p>
                </div>
              </div>
              <button @click="removeDocument('ktp')" class="text-red-600 hover:text-red-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Ijazah -->
          <div class="card">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-lg">Ijazah Terakhir</h3>
                  <p class="text-sm text-slate-600">Format: JPG, PNG, PDF • Max: 5MB</p>
                </div>
              </div>
              <span class="badge badge-error">Wajib</span>
            </div>

            <div v-if="!documents.ijazah" class="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <input type="file" class="hidden" id="ijazah-upload" accept="image/*,.pdf" @change="handleFileUpload('ijazah', $event)">
              <label for="ijazah-upload" class="cursor-pointer">
                <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p class="text-slate-700 font-medium mb-1">Klik untuk upload atau drag & drop</p>
                <p class="text-sm text-slate-500">JPG, PNG, PDF maksimal 5MB</p>
              </label>
            </div>

            <div v-else class="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-green-900">{{ documents.ijazah.name }}</p>
                  <p class="text-sm text-green-700">{{ formatFileSize(documents.ijazah.size) }}</p>
                </div>
              </div>
              <button @click="removeDocument('ijazah')" class="text-red-600 hover:text-red-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <!-- CV -->
          <div class="card">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-lg">Curriculum Vitae (CV)</h3>
                  <p class="text-sm text-slate-600">Format: PDF • Max: 5MB</p>
                </div>
              </div>
              <span class="badge badge-warning">Opsional</span>
            </div>

            <div v-if="!documents.cv" class="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <input type="file" class="hidden" id="cv-upload" accept=".pdf" @change="handleFileUpload('cv', $event)">
              <label for="cv-upload" class="cursor-pointer">
                <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p class="text-slate-700 font-medium mb-1">Klik untuk upload atau drag & drop</p>
                <p class="text-sm text-slate-500">PDF maksimal 5MB</p>
              </label>
            </div>

            <div v-else class="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-green-900">{{ documents.cv.name }}</p>
                  <p class="text-sm text-green-700">{{ formatFileSize(documents.cv.size) }}</p>
                </div>
              </div>
              <button @click="removeDocument('cv')" class="text-red-600 hover:text-red-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
          <router-link to="/dashboard" class="btn btn-outline">
            Kembali ke Dashboard
          </router-link>
          <button 
            @click="submitDocuments" 
            :disabled="!canSubmit || uploading"
            class="btn btn-primary"
            :class="{ 'opacity-50 cursor-not-allowed': !canSubmit || uploading }"
          >
            <span v-if="!uploading">Simpan Dokumen</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mengupload...
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'

const router = useRouter()

const documents = ref({
  ktp: null,
  ijazah: null,
  cv: null
})

const uploading = ref(false)

const totalDocs = 3
const completedDocs = computed(() => {
  return Object.values(documents.value).filter(doc => doc !== null).length
})

const uploadProgress = computed(() => {
  return Math.round((completedDocs.value / totalDocs) * 100)
})

const canSubmit = computed(() => {
  return documents.value.ktp && documents.value.ijazah
})

const handleFileUpload = (type, event) => {
  const file = event.target.files[0]
  if (file) {
    documents.value[type] = file
  }
}

const removeDocument = (type) => {
  documents.value[type] = null
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const submitDocuments = async () => {
  if (!canSubmit.value) return
  
  uploading.value = true
  
  // Simulate upload
  setTimeout(() => {
    uploading.value = false
    alert('Dokumen berhasil diupload!')
    router.push('/dashboard')
  }, 2000)
}
</script>

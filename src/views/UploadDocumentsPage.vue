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
        <div v-if="loading" class="text-center py-12">
           <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
           <p class="mt-2 text-slate-600">Memuat tipe dokumen...</p>
        </div>

        <div v-else class="space-y-6">
          <div 
            v-for="docType in documentTypes" 
            :key="docType.id" 
            :id="`doc-${docType.slug}`"
            class="card transition-all duration-500"
            :class="{ 'ring-2 ring-primary-500 ring-offset-4': focusedDoc === docType.slug }"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-lg">{{ docType.name }}</h3>
                  <p class="text-sm text-slate-600">{{ docType.description }} • Max: {{ formatFileSize(docType.max_file_size) }}</p>
                </div>
              </div>
              <span v-if="docType.is_mandatory" class="badge badge-error">Wajib</span>
              <span v-else class="badge badge-warning">Opsional</span>
            </div>

            <!-- Upload State -->
            <div v-if="uploading[docType.id]" class="border-2 border-slate-200 rounded-xl p-8 text-center">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent mb-2"></div>
                <p class="text-slate-600">Mengupload {{ docType.name }}...</p>
            </div>

            <!-- Uploaded State -->
            <!-- Uploaded State -->
            <div v-else-if="uploadedDocs[docType.id]" 
              class="border rounded-xl p-4 flex items-center justify-between transition-colors"
              :class="{
                'bg-green-50 border-green-200': uploadedDocs[docType.id].status === 'VALID',
                'bg-red-50 border-red-200': uploadedDocs[docType.id].status === 'INVALID',
                'bg-blue-50 border-blue-200': uploadedDocs[docType.id].status === 'PENDING' || uploadedDocs[docType.id].status === 'UPLOADED'
              }"
            >
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                  :class="{
                    'bg-green-100': uploadedDocs[docType.id].status === 'VALID',
                    'bg-red-100': uploadedDocs[docType.id].status === 'INVALID',
                    'bg-blue-100': uploadedDocs[docType.id].status === 'PENDING' || uploadedDocs[docType.id].status === 'UPLOADED'
                  }"
                >
                  <svg v-if="uploadedDocs[docType.id].status === 'VALID'" class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  <svg v-else-if="uploadedDocs[docType.id].status === 'INVALID'" class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  <svg v-else class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p class="font-medium"
                    :class="{
                      'text-green-900': uploadedDocs[docType.id].status === 'VALID',
                      'text-red-900': uploadedDocs[docType.id].status === 'INVALID',
                      'text-blue-900': uploadedDocs[docType.id].status === 'PENDING' || uploadedDocs[docType.id].status === 'UPLOADED'
                    }"
                  >{{ uploadedDocs[docType.id].name }}</p>
                  <p class="text-sm"
                    :class="{
                      'text-green-700': uploadedDocs[docType.id].status === 'VALID',
                      'text-red-700': uploadedDocs[docType.id].status === 'INVALID',
                      'text-blue-700': uploadedDocs[docType.id].status === 'PENDING' || uploadedDocs[docType.id].status === 'UPLOADED'
                    }"
                  >
                    {{ 
                      uploadedDocs[docType.id].status === 'VALID' ? 'Disetujui' : 
                      uploadedDocs[docType.id].status === 'INVALID' ? 'Ditolak' : 
                      'Menunggu Verifikasi' 
                    }}
                  </p>
                  <p v-if="uploadedDocs[docType.id].status === 'INVALID' && uploadedDocs[docType.id].rejection_note" class="text-xs text-red-600 mt-1 font-medium">
                    Alasan: {{ uploadedDocs[docType.id].rejection_note }}
                  </p>
                </div>
              </div>
              <div class="flex flex-col space-y-2">
                <button @click="viewDocument(uploadedDocs[docType.id].id)" class="btn btn-sm btn-outline bg-white hover:bg-slate-50">
                  Lihat
                </button>
                <div v-if="uploadedDocs[docType.id].status === 'INVALID'">
                   <input 
                    type="file" 
                    class="hidden" 
                    :id="`reupload-${docType.id}`" 
                    :accept="docType.allowed_mimetypes" 
                    @change="handleFileUpload(docType, $event)"
                  >
                  <label :for="`reupload-${docType.id}`" class="btn btn-sm btn-primary cursor-pointer w-full text-center block">
                    Upload Ulang
                  </label>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <input 
                type="file" 
                class="hidden" 
                :id="`upload-${docType.id}`" 
                :accept="docType.allowed_mimetypes" 
                @change="handleFileUpload(docType, $event)"
              >
              <label :for="`upload-${docType.id}`" class="cursor-pointer block w-full h-full">
                <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p class="text-slate-700 font-medium mb-1">Klik untuk upload {{ docType.name }}</p>
                <p class="text-sm text-slate-500">Format: {{ docType.allowed_mimetypes }}</p>
              </label>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
          <router-link to="/dashboard" class="btn btn-outline">
            Kembali ke Dashboard
          </router-link>
          <router-link to="/dashboard" class="btn btn-primary">
            Selesai
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useDocumentsStore } from '@/stores/documents'
import NavBar from '@/components/layout/NavBar.vue'

const route = useRoute()
const documentsStore = useDocumentsStore()
const { documentTypes, userDocuments, loading } = storeToRefs(documentsStore)
const { fetchDocumentTypes, fetchUserDocuments, uploadDocument, downloadDocument } = documentsStore

const uploading = ref({})
// Map userDocuments array to object keyed by document_type_id
// Map userDocuments array to object keyed by document_type_id
const uploadedDocs = computed(() => {
  const docs = {}
  if (userDocuments.value && Array.isArray(userDocuments.value)) {
    userDocuments.value.forEach(doc => {
      if (!docs[doc.document_type_id]) {
        docs[doc.document_type_id] = {
          name: doc.file_name,
          id: doc.id,
          status: doc.status,
          rejection_note: doc.rejection_note
        }
      }
    })
  }
  return docs
})

const focusedDoc = ref(null)

onMounted(async () => {
  await Promise.all([
    fetchDocumentTypes(),
    fetchUserDocuments()
  ])
  
  // Check for focus param
  const focusSlug = route.query.focus
  if (focusSlug) {
    focusedDoc.value = focusSlug
    await nextTick()
    // Add small delay to ensure DOM is ready
    setTimeout(() => {
      const element = document.getElementById(`doc-${focusSlug}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 500)
  }
})

const totalDocs = computed(() => documentTypes.value.length)
const completedDocs = computed(() => Object.keys(uploadedDocs.value).length)
const uploadProgress = computed(() => {
  if (totalDocs.value === 0) return 0
  return Math.round((completedDocs.value / totalDocs.value) * 100)
})

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const handleFileUpload = async (docType, event) => {
  const file = event.target.files[0]
  if (!file) return

  // Basic validation
  if (file.size > docType.max_file_size) {
    alert(`Ukuran file terlalu besar. Maksimal ${formatFileSize(docType.max_file_size)}`)
    return
  }

  uploading.value[docType.id] = true

  try {
    const result = await uploadDocument(file, docType.id)
    if (!result.success) {
      alert(result.error)
    }
  } catch (err) {
    alert('Gagal mengupload dokumen')
  } finally {
    uploading.value[docType.id] = false
  }
}

const viewDocument = async (docId) => {
  const result = await downloadDocument(docId)
  if (result.success) {
    window.open(result.url, '_blank')
  } else {
    alert(result.error)
  }
}
</script>

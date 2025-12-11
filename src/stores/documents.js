import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import axios from 'axios'

export const useDocumentsStore = defineStore('documents', () => {
    const documentTypes = ref([])
    const userDocuments = ref([])
    const loading = ref(false)
    const error = ref(null)

    const mandatoryDocuments = computed(() => {
        return documentTypes.value.filter(doc => doc.is_mandatory)
    })

    async function fetchDocumentTypes() {
        loading.value = true
        error.value = null
        try {
            const response = await api.get('/master/documents')
            if (response.data.success) {
                documentTypes.value = response.data.data
            }
        } catch (err) {
            console.error('Error fetching document types:', err)
            error.value = 'Gagal memuat tipe dokumen.'
        } finally {
            loading.value = false
        }
    }

    async function fetchUserDocuments() {
        console.log('[DOCUMENTS] Fetching user documents...')
        loading.value = true
        try {
            const response = await api.get('/documents')
            if (response.data.success) {
                userDocuments.value = response.data.data || []
                console.log('[DOCUMENTS] User documents loaded:', userDocuments.value.length)
            }
        } catch (err) {
            console.error('[DOCUMENTS] Error fetching user documents:', err.response?.status || err.code, err.response?.data || err.message)
            userDocuments.value = []
            // Don't set global error here to avoid blocking other UI
        } finally {
            loading.value = false
        }
    }

    async function uploadDocument(file, documentTypeId) {
        try {
            // 1. Init upload to get presigned URL
            const initResponse = await api.post('/upload/init', {
                document_type_id: documentTypeId,
                file_name: file.name,
                file_size: file.size,
                mime_type: file.type
            })

            if (!initResponse.data.success) {
                throw new Error(initResponse.data.message || 'Gagal inisialisasi upload')
            }

            const { document_id, presigned_url } = initResponse.data.data

            // Fix presigned URL to use relative path if it points to localhost:9000
            // This ensures the request goes through Nginx proxy to avoid CORS
            let uploadUrl = presigned_url;
            if (uploadUrl && uploadUrl.includes('localhost:9000')) {
                uploadUrl = uploadUrl.replace(/^https?:\/\/localhost:9000/, '');
                console.log('[DOCUMENTS] Fixed upload URL:', uploadUrl);
            }

            // 2. Upload file to MinIO via presigned URL
            await axios.put(uploadUrl, file, {
                headers: {
                    'Content-Type': file.type
                }
            })

            // 3. Complete upload
            const completeResponse = await api.post('/upload/complete', {
                document_id: document_id
            })

            if (!completeResponse.data.success) {
                throw new Error(completeResponse.data.message || 'Gagal menyelesaikan upload')
            }

            // Refresh user documents list
            await fetchUserDocuments()

            return { success: true, document_id }

        } catch (err) {
            console.error('Upload error:', err)
            return { success: false, error: err.message || 'Terjadi kesalahan saat upload' }
        }
    }

    async function downloadDocument(documentId) {
        try {
            const response = await api.get(`/documents/${documentId}/download`)
            if (response.data.success) {
                return { success: true, url: response.data.data.url }
            }
            return { success: false, error: 'Gagal mendapatkan URL dokumen' }
        } catch (err) {
            console.error('Download error:', err)
            return { success: false, error: err.message || 'Terjadi kesalahan saat download' }
        }
    }

    return {
        documentTypes,
        userDocuments,
        mandatoryDocuments,
        loading,
        error,
        fetchDocumentTypes,
        fetchUserDocuments,
        uploadDocument,
        downloadDocument
    }
})

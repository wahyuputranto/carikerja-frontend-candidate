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
                // Fix template URLs if they are misconfigured (localhost/zmijobs.com)
                documentTypes.value = response.data.data.map(doc => {
                    if (doc.template) {
                         if (doc.template.includes('localhost:9000')) {
                             doc.template = doc.template.replace(/^https?:\/\/localhost:9000/, '');
                         } else if (doc.template.includes('zmijobs.com')) {
                             doc.template = doc.template.replace(/^https?:\/\/(www\.)?zmijobs\.com/, '');
                         }
                    }
                    return doc;
                });
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

            // Fix presigned URL to use relative path if it points to localhost:9000 OR production domain
            // This ensures the request goes through Nginx/Vite proxy to avoid CORS
            let uploadUrl = presigned_url;
            if (uploadUrl) {
                if (uploadUrl.includes('localhost:9000')) {
                    uploadUrl = uploadUrl.replace(/^https?:\/\/localhost:9000/, '');
                } else if (uploadUrl.includes('zmijobs.com')) {
                    uploadUrl = uploadUrl.replace(/^https?:\/\/(www\.)?zmijobs\.com/, '');
                }

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
                let downloadUrl = response.data.data.url;

                // Fix: If backend returns localhost URL (misconfig), force it to go through Nginx proxy
                if (downloadUrl && downloadUrl.includes('localhost:9000')) {
                    downloadUrl = downloadUrl.replace(/^https?:\/\/localhost:9000/, '');
                    // Handle case where path doesn't start with /agency-documents if needed, 
                    // but usually backend returns full path. 
                    // Example: /agency-documents/candidates/...
                }

                return { success: true, url: downloadUrl }
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

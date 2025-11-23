import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useJobsStore = defineStore('jobs', () => {
    const jobs = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function fetchJobs() {
        loading.value = true
        error.value = null
        try {
            const response = await api.get('/master/jobs')
            if (response.data.success) {
                jobs.value = response.data.data
            }
        } catch (err) {
            console.error('Error fetching jobs:', err)
            error.value = 'Gagal memuat lowongan pekerjaan.'
        } finally {
            loading.value = false
        }
    }

    return {
        jobs,
        loading,
        error,
        fetchJobs
    }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useDashboardStore = defineStore('dashboard', () => {
    const tasks = ref([])
    const applications = ref([])
    const profileViews = ref(0)
    const recommendations = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function fetchDashboardData() {
        console.log('[DASHBOARD] Fetching dashboard data...')
        loading.value = true
        error.value = null
        try {
            // Fetch applications
            try {
                const appsRes = await api.get('/applications')
                if (appsRes.data.success) {
                    applications.value = appsRes.data.data || []
                    console.log('[DASHBOARD] Applications loaded:', applications.value.length)
                }
            } catch (err) {
                console.error('[DASHBOARD] Error fetching applications:', err.response?.status, err.response?.data)
                applications.value = []
            }

            // Fetch profile views
            try {
                const viewsRes = await api.get('/analytics/profile-views')
                if (viewsRes.data.success) {
                    profileViews.value = viewsRes.data.data?.views_count || 0
                    console.log('[DASHBOARD] Profile views loaded:', profileViews.value)
                }
            } catch (err) {
                console.error('[DASHBOARD] Error fetching profile views:', err.response?.status, err.response?.data)
                profileViews.value = 0
            }

            // Fetch recommendations
            try {
                const recsRes = await api.get('/jobs/recommendations')
                if (recsRes.data.success) {
                    recommendations.value = recsRes.data.data || []
                    console.log('[DASHBOARD] Recommendations loaded:', recommendations.value.length)
                }
            } catch (err) {
                console.error('[DASHBOARD] Error fetching recommendations:', err.response?.status, err.response?.data)
                recommendations.value = []
            }

            // Fetch tasks
            try {
                const tasksRes = await api.get('/tasks')
                if (tasksRes.data.success) {
                    tasks.value = tasksRes.data.data || []
                    console.log('[DASHBOARD] Tasks loaded:', tasks.value.length)
                }
            } catch (err) {
                console.error('[DASHBOARD] Error fetching tasks:', err.response?.status, err.response?.data)
                tasks.value = []
            }

        } catch (err) {
            console.error('[DASHBOARD] Unexpected error:', err)
            error.value = err.response?.data?.message || err.message || 'Gagal memuat data dashboard.'
        } finally {
            loading.value = false
            console.log('[DASHBOARD] Dashboard data fetch complete')
        }
    }

    async function applyJob(applicationData) {
        loading.value = true
        error.value = null
        try {
            const response = await api.post('/applications', applicationData)
            if (response.data.success) {
                // Refresh applications list
                const appsRes = await api.get('/applications')
                if (appsRes.data.success) {
                    applications.value = appsRes.data.data || []
                }
                return { success: true }
            }
        } catch (err) {
            console.error('Error applying for job:', err)
            const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Gagal melamar pekerjaan.'
            error.value = errorMessage
            return { success: false, error: errorMessage }
        } finally {
            loading.value = false
        }
    }

    return {
        tasks,
        applications,
        profileViews,
        recommendations,
        loading,
        error,
        fetchDashboardData,
        applyJob
    }
})

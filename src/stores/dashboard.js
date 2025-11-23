import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useDashboardStore = defineStore('dashboard', () => {
    const applications = ref([])
    const profileViews = ref(0)
    const recommendations = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function fetchDashboardData() {
        loading.value = true
        error.value = null
        try {
            // Fetch all dashboard data in parallel
            const [appsRes, viewsRes, recsRes] = await Promise.all([
                api.get('/applications'),
                api.get('/analytics/profile-views'),
                api.get('/jobs/recommendations')
            ])

            if (appsRes.data.success) {
                applications.value = appsRes.data.data || []
            }

            if (viewsRes.data.success) {
                profileViews.value = viewsRes.data.data?.views_count || 0
            }

            if (recsRes.data.success) {
                recommendations.value = recsRes.data.data || []
            }

        } catch (err) {
            console.error('Error fetching dashboard data:', err)
            error.value = 'Gagal memuat data dashboard.'
        } finally {
            loading.value = false
        }
    }

    return {
        applications,
        profileViews,
        recommendations,
        loading,
        error,
        fetchDashboardData
    }
})

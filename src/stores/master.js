import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useMasterStore = defineStore('master', () => {
    const locations = ref([])
    const categories = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function fetchLocations() {
        try {
            loading.value = true
            error.value = null
            const response = await api.get('/master/locations')
            locations.value = response.data.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message || 'Failed to fetch locations'
            console.error('Error fetching locations:', err)
        } finally {
            loading.value = false
        }
    }

    async function fetchCategories() {
        try {
            loading.value = true
            error.value = null
            const response = await api.get('/master/job-categories')
            categories.value = response.data.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message || 'Failed to fetch categories'
            console.error('Error fetching categories:', err)
        } finally {
            loading.value = false
        }
    }

    async function fetchAll() {
        await Promise.all([fetchLocations(), fetchCategories()])
    }

    return {
        locations,
        categories,
        loading,
        error,
        fetchLocations,
        fetchCategories,
        fetchAll
    }
})

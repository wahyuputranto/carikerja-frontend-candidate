import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(null)
    const token = ref(localStorage.getItem('token') || null)
    const loading = ref(false)
    const error = ref(null)

    // Profile related state
    const educations = ref([])
    const experiences = ref([])
    const skills = ref([])

    // Getters
    const isAuthenticated = computed(() => !!token.value)
    const currentUser = computed(() => user.value)

    // Actions
    async function login(credentials) {
        loading.value = true
        error.value = null

        try {
            const response = await api.post('/auth/login', credentials)
            const { token: authToken, candidate: userData } = response.data.data

            token.value = authToken
            user.value = userData
            localStorage.setItem('token', authToken)

            return { success: true }
        } catch (err) {
            error.value = err.response?.data?.message || 'Login failed'
            return { success: false, error: error.value }
        } finally {
            loading.value = false
        }
    }

    async function register(userData) {
        loading.value = true
        error.value = null

        try {
            // Construct strict payload according to API documentation
            const payload = {
                phone: userData.phone,
                email: userData.email,
                password: userData.password,
                full_name: userData.name
            }
            const response = await api.post('/auth/register', payload)
            const { token: authToken, candidate: newUser } = response.data.data

            token.value = authToken
            user.value = newUser
            localStorage.setItem('token', authToken)

            return { success: true }
        } catch (err) {
            error.value = err.response?.data?.message || 'Registration failed'
            return { success: false, error: error.value }
        } finally {
            loading.value = false
        }
    }

    async function fetchUser() {
        if (!token.value) return

        loading.value = true
        try {
            // Updated endpoint based on new documentation
            const response = await api.get('/profile')
            const data = response.data.data

            user.value = data.profile
            educations.value = data.educations || []
            experiences.value = data.experiences || []
            skills.value = data.skills || []
        } catch (err) {
            console.error('Fetch user error:', err.response?.status, err.response?.data)
            // If token is invalid or 401, logout
            if (err.response?.status === 401) {
                // logout() // TEMPORARILY DISABLED FOR DEBUGGING
                console.warn('Token invalid but logout disabled for debugging')
            }
        } finally {
            loading.value = false
        }
    }

    async function updateProfile(profileData) {
        loading.value = true
        error.value = null
        try {
            const response = await api.put('/profile', profileData)

            // Update local user state
            // Assuming response returns the updated profile object or success message
            // If it returns data, update user.value. If not, we might need to refetch or manually update.
            // Based on docs: "Operation successful", data: { ... }
            if (response.data.data) {
                user.value = { ...user.value, ...profileData } // Optimistic update or use response data
            }

            return { success: true }
        } catch (err) {
            console.error('Update profile error:', err)
            error.value = err.response?.data?.message || 'Gagal memperbarui profil'
            return { success: false, error: error.value }
        } finally {
            loading.value = false
        }
    }

    // Education Actions
    async function addEducation(educationData) {
        try {
            const response = await api.post('/profile/education', educationData)
            if (response.data.success) {
                // Refresh profile to get updated list with IDs
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            return { success: false, error: err.response?.data?.message || 'Gagal menambah pendidikan' }
        }
    }

    // Experience Actions
    async function addExperience(experienceData) {
        try {
            const response = await api.post('/profile/experience', experienceData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            return { success: false, error: err.response?.data?.message || 'Gagal menambah pengalaman' }
        }
    }

    // Skill Actions
    async function addSkill(skillData) {
        try {
            const response = await api.post('/profile/skill', skillData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            return { success: false, error: err.response?.data?.message || 'Gagal menambah keahlian' }
        }
    }

    function logout() {
        user.value = null
        educations.value = []
        experiences.value = []
        skills.value = []
        token.value = null
        localStorage.removeItem('token')
    }

    // Initialize user on store creation
    if (token.value) {
        fetchUser()
    }

    return {
        // State
        user,
        token,
        loading,
        error,
        educations,
        experiences,
        skills,
        // Getters
        isAuthenticated,
        currentUser,
        // Actions
        login,
        register,
        fetchUser,
        updateProfile,
        addEducation,
        addExperience,
        addSkill,
        logout
    }
})

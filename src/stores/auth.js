import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
    // State
    const candidate = ref(null) // Basic candidate info (email, phone, full_name) from login/register
    const user = ref(null) // Profile data from GET /profile
    const storedToken = localStorage.getItem('token')
    console.log('[AUTH] Reading token from localStorage:', storedToken ? storedToken.substring(0, 20) + '...' : 'null')
    const token = ref(storedToken)
    const loading = ref(false)
    const error = ref(null)

    // Profile related state
    const educations = ref([])
    const experiences = ref([])
    const skills = ref([])

    // Getters
    const isAuthenticated = computed(() => !!token.value)
    const currentUser = computed(() => {
        // Merge candidate data with profile data
        return {
            ...candidate.value,
            ...user.value
        }
    })

    // Actions
    async function login(credentials) {
        console.log('[AUTH] Login attempt for phone:', credentials.phone)
        loading.value = true
        error.value = null

        try {
            const response = await api.post('/auth/login', credentials)
            const { token: authToken, candidate: candidateData } = response.data.data

            console.log('[AUTH] Received token from backend:', authToken ? authToken.substring(0, 20) + '...' : 'null')

            token.value = authToken
            candidate.value = candidateData // Store candidate data (email, phone, full_name)
            localStorage.setItem('token', authToken)

            // Verify token was saved
            const savedToken = localStorage.getItem('token')
            console.log('[AUTH] Token saved to localStorage:', savedToken ? savedToken.substring(0, 20) + '...' : 'null')
            console.log('[AUTH] Login successful, token saved')
            return { success: true }
        } catch (err) {
            console.error('[AUTH] Login failed:', err.response?.data)
            error.value = err.response?.data?.message || 'Login failed'
            return { success: false, error: error.value }
        } finally {
            loading.value = false
        }
    }

    async function register(userData) {
        console.log('[AUTH] Register attempt for:', userData.email)
        loading.value = true
        error.value = null

        try {
            // Construct payload according to updated API documentation
            // Include optional profile fields if provided
            const payload = {
                phone: userData.phone,
                email: userData.email,
                password: userData.password,
                full_name: userData.name,
                // Optional profile fields
                ...(userData.birth_date && { birth_date: userData.birth_date }),
                ...(userData.birth_place && { birth_place: userData.birth_place }),
                ...(userData.address && { address: userData.address }),
                ...(userData.city && { city: userData.city }),
                ...(userData.province && { province: userData.province }),
                ...(userData.postal_code && { postal_code: userData.postal_code }),
                ...(userData.about_me && { about_me: userData.about_me })
            }

            console.log('[AUTH] Registration payload:', payload)
            const response = await api.post('/auth/register', payload)
            const { token: authToken, candidate: candidateData } = response.data.data

            token.value = authToken
            candidate.value = candidateData // Store candidate data
            localStorage.setItem('token', authToken)

            console.log('[AUTH] Registration successful, token saved')
            return { success: true }
        } catch (err) {
            console.error('[AUTH] Registration failed:', err.response?.data)
            error.value = err.response?.data?.message || 'Registration failed'
            return { success: false, error: error.value }
        } finally {
            loading.value = false
        }
    }

    async function fetchUser() {
        if (!token.value) {
            console.log('[AUTH] fetchUser skipped - no token')
            return
        }

        console.log('[AUTH] fetchUser started with token:', token.value?.substring(0, 20) + '...')
        loading.value = true
        try {
            // Updated endpoint based on new documentation
            console.log('[AUTH] Calling GET /profile...')
            const response = await api.get('/profile')
            console.log('[AUTH] Profile response received:', response.data)
            const data = response.data.data

            // Handle case where profile might be null (user hasn't filled profile yet)
            user.value = data.profile || {}
            educations.value = data.educations || []
            experiences.value = data.experiences || []
            skills.value = data.skills || []
            console.log('[AUTH] User data updated successfully')
        } catch (err) {
            console.error('[AUTH] Fetch user error:', err.response?.status, err.response?.data)
            // If token is invalid or 401, logout
            if (err.response?.status === 401) {
                console.warn('[AUTH] Token invalid (401), logging out...')
                logout()
                // Redirect to login will be handled by api.js interceptor
            }
        } finally {
            loading.value = false
            console.log('[AUTH] fetchUser completed')
        }
    }

    async function updateProfile(profileData) {
        console.log('[AUTH] Updating profile with data:', profileData)
        loading.value = true
        error.value = null
        try {
            const response = await api.put('/profile', profileData)

            // Update local user state
            if (response.data.data) {
                user.value = { ...user.value, ...profileData }
            }

            console.log('[AUTH] Profile updated successfully')
            return { success: true }
        } catch (err) {
            console.error('[AUTH] Update profile error:', err)
            error.value = err.response?.data?.message || 'Gagal memperbarui profil'
            return { success: false, error: error.value }
        } finally {
            loading.value = false
        }
    }

    // Education Actions
    async function addEducation(educationData) {
        console.log('[AUTH] Adding education:', educationData)
        try {
            const response = await api.post('/profile/education', educationData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Add education error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menambah pendidikan' }
        }
    }

    // Experience Actions
    async function addExperience(experienceData) {
        console.log('[AUTH] Adding experience:', experienceData)
        try {
            const response = await api.post('/profile/experience', experienceData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Add experience error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menambah pengalaman' }
        }
    }

    // Skill Actions
    async function addSkill(skillData) {
        console.log('[AUTH] Adding skill:', skillData)
        try {
            const response = await api.post('/profile/skill', skillData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Add skill error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menambah keahlian' }
        }
    }

    function logout() {
        console.log('[AUTH] Logging out...')
        candidate.value = null
        user.value = null
        educations.value = []
        experiences.value = []
        skills.value = []
        token.value = null
        localStorage.removeItem('token')
    }

    // Initialize user on store creation
    console.log('[AUTH] Store initialized, token exists:', !!token.value)
    // TEMPORARILY DISABLED - auto-fetch causes issues
    // if (token.value) {
    //     console.log('[AUTH] Auto-fetching user on store init')
    //     fetchUser()
    // }

    return {
        // State
        candidate,
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

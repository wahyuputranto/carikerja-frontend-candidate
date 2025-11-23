import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(null)
    const token = ref(localStorage.getItem('token') || null)
    const loading = ref(false)
    const error = ref(null)

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
            const response = await api.get('/auth/me')
            user.value = response.data.data
        } catch (err) {
            // If token is invalid, logout
            logout()
        } finally {
            loading.value = false
        }
    }

    function logout() {
        user.value = null
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
        // Getters
        isAuthenticated,
        currentUser,
        // Actions
        login,
        register,
        fetchUser,
        logout
    }
})

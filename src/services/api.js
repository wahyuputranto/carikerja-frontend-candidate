import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
})

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        console.log('[API] Request:', config.method?.toUpperCase(), config.url)
        console.log('[API] Token exists:', !!token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
            console.log('[API] Authorization header set:', config.headers.Authorization?.substring(0, 30) + '...')
        }
        // else {
        //     console.log('[API] No token found in localStorage (Public request)')
        // }
        return config
    },
    (error) => {
        console.error('[API] Request interceptor error:', error)
        return Promise.reject(error)
    }
)

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('[API] Response:', response.status, response.config.url)
        return response
    },
    (error) => {
        console.error('[API] Response error:', error.response?.status, error.config?.url)
        if (error.response?.status === 401) {
            // Check if it's a login attempt - if so, let the error propagate to the login component
            // so it can display "Invalid credentials"
            if (error.config?.url?.includes('/auth/login')) {
                return Promise.reject(error)
            }

            console.warn('[API] 401 Unauthorized - Token invalid or expired')
            console.warn('[API] Current token:', localStorage.getItem('token')?.substring(0, 30) + '...')
            // Token expired or invalid
            localStorage.removeItem('token')
            // Avoid redirect loops if we are already on login
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login'
            }
            // Return a never-resolving promise to halt execution chain
            return new Promise(() => { })
        }
        return Promise.reject(error)
    }
)

export default api

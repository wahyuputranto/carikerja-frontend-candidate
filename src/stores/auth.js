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
    const personalDetail = ref(null)
    const emergencyContacts = ref([])
    const languages = ref([])
    const passports = ref([])
    const nonFormalEducations = ref([])

    // Getters
    const isAuthenticated = computed(() => !!token.value)
    const currentUser = computed(() => {
        // Merge candidate data with profile data
        const merged = {
            ...candidate.value,
            ...user.value
        }

        // Apply fixUrl to photo_url if it exists
        if (merged.photo_url) {
            merged.photo_url = fixUrl(merged.photo_url)
        }

        return merged
    })

    // Helper to fix localhost URLs from backend (MinIO)
    // Helper to fix localhost URLs from backend (MinIO)
    const fixUrl = (urlString) => {
        if (!urlString || typeof urlString !== 'string') return urlString;

        const originalUrl = urlString;
        try {
            urlString = urlString.trim();

            // Check for various internal network patterns (localhost, port 9000, minio hostname) or production domain leak
            if (urlString.includes('localhost') || urlString.includes(':9000') || urlString.includes('minio') || urlString.includes('zmijobs.com')) {
                const url = new URL(urlString);
                // Return just the pathname and search query
                const fixed = url.pathname + url.search;
                console.log(`[AUTH] fixUrl: Mapped '${originalUrl}' -> '${fixed}'`);
                return fixed;
            }
        } catch (e) {
            console.error('[AUTH] fixUrl error:', e);
            // Fallback regex
            if (urlString.includes('localhost')) {
                return urlString.replace(/^https?:\/\/[^\/]+/, '');
            }
        }
        return urlString;
    };

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
            // Handle various backend error formats
            const responseData = err.response?.data
            if (responseData?.error) {
                // If backend returns { error: "message" }
                error.value = responseData.error
            } else if (responseData?.message) {
                // If backend returns { message: "msg" }
                error.value = responseData.message
            } else {
                error.value = 'Login gagal. Periksa kembali nomor telepon dan password Anda.'
            }
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
                name: userData.name,
                full_name: userData.name,
                nik: userData.nik,
                ...(userData.interested_job_category_id && { interested_job_category_id: parseInt(userData.interested_job_category_id) })
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
            // Prioritize specific error message from backend
            const responseData = err.response?.data
            if (responseData?.error) {
                // Translate common errors if needed, or just show them
                if (responseData.error === 'phone number already registered') {
                    error.value = 'Nomor telepon sudah terdaftar. Silakan gunakan nomor lain atau masuk ke akun Anda.'
                } else if (responseData.error === 'email already registered') {
                    error.value = 'Email sudah terdaftar. Silakan gunakan email lain atau masuk ke akun Anda.'
                } else {
                    error.value = responseData.error
                }
            } else {
                error.value = responseData?.message || 'Registration failed'
            }
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

            // New API structure includes candidate object
            candidate.value = data.candidate || null
            user.value = data.profile || {}

            educations.value = data.educations || []
            experiences.value = data.experiences || []
            skills.value = data.skills || []
            personalDetail.value = data.personal_detail || {}
            emergencyContacts.value = data.emergency_contacts || []
            languages.value = data.languages || []
            passports.value = data.passports || []
            nonFormalEducations.value = data.non_formal_educations || []

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

    async function uploadProfilePhoto(formData) {
        console.log('[AUTH] Uploading profile photo')
        loading.value = true
        error.value = null
        try {
            const response = await api.post('/profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('[AUTH] Photo uploaded successfully:', response.data)
            return { success: true, data: response.data }
        } catch (err) {
            console.error('[AUTH] Upload photo error:', err)
            error.value = err.response?.data?.message || 'Gagal mengupload foto'
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

    async function updateEducation(id, educationData) {
        console.log('[AUTH] Updating education:', id, educationData)
        try {
            const response = await api.put(`/profile/education/${id}`, educationData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Update education error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal memperbarui pendidikan' }
        }
    }

    async function deleteEducation(id) {
        console.log('[AUTH] Deleting education:', id)
        try {
            const response = await api.delete(`/profile/education/${id}`)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Delete education error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menghapus pendidikan' }
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

    async function updateExperience(id, experienceData) {
        console.log('[AUTH] Updating experience:', id, experienceData)
        try {
            const response = await api.put(`/profile/experience/${id}`, experienceData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Update experience error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal memperbarui pengalaman' }
        }
    }

    async function deleteExperience(id) {
        console.log('[AUTH] Deleting experience:', id)
        try {
            const response = await api.delete(`/profile/experience/${id}`)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Delete experience error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menghapus pengalaman' }
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

    async function deleteSkill(id) {
        console.log('[AUTH] Deleting skill:', id)
        try {
            const response = await api.delete(`/profile/skill/${id}`)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Delete skill error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menghapus keahlian' }
        }
    }

    // Personal Detail Actions
    async function updatePersonalDetail(detailData) {
        console.log('[AUTH] Updating personal detail:', detailData)
        try {
            const response = await api.put('/profile/personal-detail', detailData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Update personal detail error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal memperbarui detail pribadi' }
        }
    }

    // Emergency Contact Actions
    async function addEmergencyContact(contactData) {
        console.log('[AUTH] Adding emergency contact:', contactData)
        try {
            const response = await api.post('/profile/emergency-contact', contactData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Add emergency contact error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menambah kontak darurat' }
        }
    }

    async function deleteEmergencyContact(id) {
        console.log('[AUTH] Deleting emergency contact:', id)
        try {
            const response = await api.delete(`/profile/emergency-contact/${id}`)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Delete emergency contact error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menghapus kontak darurat' }
        }
    }

    async function updateEmergencyContact(id, contactData) {
        console.log('[AUTH] Updating emergency contact:', id, contactData)
        try {
            const response = await api.put(`/profile/emergency-contact/${id}`, contactData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Update emergency contact error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal memperbarui kontak darurat' }
        }
    }

    // Language Actions
    async function addLanguage(languageData) {
        console.log('[AUTH] Adding language:', languageData)
        try {
            const response = await api.post('/profile/language', languageData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Add language error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menambah bahasa' }
        }
    }

    async function deleteLanguage(id) {
        console.log('[AUTH] Deleting language:', id)
        try {
            const response = await api.delete(`/profile/language/${id}`)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Delete language error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menghapus bahasa' }
        }
    }

    // Passport Actions
    async function addPassport(passportData) {
        console.log('[AUTH] Adding passport:', passportData)
        try {
            const response = await api.post('/profile/passport', passportData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Add passport error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menambah paspor' }
        }
    }

    async function deletePassport(id) {
        console.log('[AUTH] Deleting passport:', id)
        try {
            const response = await api.delete(`/profile/passport/${id}`)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Delete passport error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menghapus paspor' }
        }
    }

    async function updatePassport(id, passportData) {
        console.log('[AUTH] Updating passport:', id, passportData)
        try {
            const response = await api.put(`/profile/passport/${id}`, passportData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Update passport error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal memperbarui paspor' }
        }
    }

    // Non-Formal Education Actions
    async function addNonFormalEducation(educationData) {
        console.log('[AUTH] Adding non-formal education:', educationData)
        try {
            const response = await api.post('/profile/non-formal-education', educationData)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Add non-formal education error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menambah pendidikan non-formal' }
        }
    }

    async function deleteNonFormalEducation(id) {
        console.log('[AUTH] Deleting non-formal education:', id)
        try {
            const response = await api.delete(`/profile/non-formal-education/${id}`)
            if (response.data.success) {
                await fetchUser()
                return { success: true }
            }
        } catch (err) {
            console.error('[AUTH] Delete non-formal education error:', err.response?.data)
            return { success: false, error: err.response?.data?.message || 'Gagal menghapus pendidikan non-formal' }
        }
    }

    function logout() {
        console.log('[AUTH] Logging out...')
        candidate.value = null
        user.value = null
        educations.value = []
        experiences.value = []
        skills.value = []
        personalDetail.value = null
        emergencyContacts.value = []
        languages.value = []
        passports.value = []
        nonFormalEducations.value = []
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
        personalDetail,
        emergencyContacts,
        languages,
        passports,
        nonFormalEducations,
        // Getters
        isAuthenticated,
        currentUser,
        // Actions
        login,
        register,
        fetchUser,
        updateProfile,
        uploadProfilePhoto,
        addEducation,
        updateEducation,
        deleteEducation,
        addExperience,
        updateExperience,
        deleteExperience,
        addSkill,
        deleteSkill,
        updatePersonalDetail,
        addEmergencyContact,
        deleteEmergencyContact,
        addLanguage,
        deleteLanguage,
        addPassport,
        deletePassport,
        addNonFormalEducation,
        deleteNonFormalEducation,
        updateEmergencyContact,
        updatePassport,
        logout
    }
})

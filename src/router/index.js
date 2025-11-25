import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomePage.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/LoginPage.vue'),
        meta: { requiresAuth: false, hideForAuth: true }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/RegisterPage.vue'),
        meta: { requiresAuth: false, hideForAuth: true }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashboardPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/jobs',
        name: 'jobs',
        component: () => import('@/views/JobsPage.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/jobs/:id',
        name: 'job-detail',
        component: () => import('@/views/JobDetailPage.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/apply/:id',
        name: 'apply-job',
        component: () => import('@/views/ApplyJobPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/ProfilePage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/applications',
        name: 'applications',
        component: () => import('@/views/ApplicationsPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/upload-documents',
        name: 'upload-documents',
        component: () => import('@/views/UploadDocumentsPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0, behavior: 'smooth' }
        }
    }
})

// Navigation guards
router.beforeEach((to, from, next) => {
    console.log(`[ROUTER] Navigating from ${from.path} to ${to.path}`)

    const authStore = useAuthStore()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const hideForAuth = to.matched.some(record => record.meta.hideForAuth)
    const isAuthenticated = authStore.isAuthenticated

    console.log(`[ROUTER] requiresAuth: ${requiresAuth}, isAuthenticated: ${isAuthenticated}, token exists: ${!!authStore.token}`)

    if (requiresAuth && !isAuthenticated) {
        console.log('[ROUTER] Redirecting to login - not authenticated')
        next({ name: 'login', query: { redirect: to.fullPath } })
    } else if (hideForAuth && isAuthenticated) {
        console.log('[ROUTER] Redirecting to dashboard - already authenticated')
        next({ name: 'dashboard' })
    } else {
        console.log('[ROUTER] Navigation allowed')
        next()
    }
})

export default router

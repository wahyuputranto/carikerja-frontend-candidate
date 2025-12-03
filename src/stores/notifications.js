import { defineStore } from 'pinia'
import api from '../services/api'

export const useNotificationStore = defineStore('notifications', {
    state: () => ({
        notifications: [],
        unreadCount: 0,
        loading: false,
        error: null
    }),

    actions: {
        async fetchNotifications() {
            console.log('[NOTIFICATIONS] Fetching notifications...')
            this.loading = true
            try {
                const response = await api.get('/notifications')
                if (response.data.success) {
                    this.notifications = response.data.data || []
                    this.unreadCount = response.data.meta?.unread_count || 0
                    console.log('[NOTIFICATIONS] Notifications loaded:', this.notifications.length)
                }
            } catch (err) {
                console.error('[NOTIFICATIONS] Error fetching notifications:', err.response?.status, err.response?.data)
                this.notifications = []
                this.unreadCount = 0
                this.error = err.message
            } finally {
                this.loading = false
            }
        },

        async markAsRead(id) {
            try {
                await api.put(`/notifications/${id}/read`)
                const notif = this.notifications.find(n => n.id === id)
                if (notif && !notif.is_read) {
                    notif.is_read = true
                    this.unreadCount--
                }
            } catch (err) {
                console.error('Failed to mark as read', err)
            }
        },

        async markAllAsRead() {
            try {
                await api.put('/notifications/read-all')
                this.notifications.forEach(n => n.is_read = true)
                this.unreadCount = 0
            } catch (err) {
                console.error('Failed to mark all as read', err)
            }
        }
    }
})

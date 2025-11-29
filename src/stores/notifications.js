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
            this.loading = true
            try {
                const response = await api.get('/notifications')
                if (response.data.success) {
                    this.notifications = response.data.data || []
                    this.unreadCount = response.data.meta.unread_count
                }
            } catch (err) {
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

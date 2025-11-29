<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useNotificationStore } from '../stores/notifications'
import { storeToRefs } from 'pinia'
import { formatDistanceToNow } from 'date-fns'

import { useRouter } from 'vue-router'

const router = useRouter()
const store = useNotificationStore()
const { notifications, unreadCount } = storeToRefs(store)
const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
  if (showDropdown.value) {
    store.fetchNotifications()
  }
}

const handleNotificationClick = (notif) => {
  if (!notif.is_read) {
    store.markAsRead(notif.id)
  }
  
  // Close dropdown
  showDropdown.value = false

  // Redirect logic based on type
  if (notif.type === 'APPLICATION_STATUS_UPDATED' && notif.related_id) {
    router.push(`/applications?id=${notif.related_id}`)
  }
}

const handleMarkAllRead = () => {
  store.markAllAsRead()
}

// Poll every 30 seconds
let pollInterval
onMounted(() => {
  store.fetchNotifications()
  pollInterval = setInterval(() => {
    store.fetchNotifications()
  }, 30000)
})

onUnmounted(() => {
  clearInterval(pollInterval)
})

// Close dropdown when clicking outside
const closeDropdown = (e) => {
  if (!e.target.closest('.notification-container')) {
    showDropdown.value = false
  }
}

window.addEventListener('click', closeDropdown)
onUnmounted(() => window.removeEventListener('click', closeDropdown))
</script>

<template>
  <div class="relative notification-container">
    <button @click.stop="toggleDropdown" class="relative p-2 text-gray-600 hover:text-primary-600 transition-colors rounded-full hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span v-if="unreadCount > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full min-w-[1.25rem]">
        {{ unreadCount }}
      </span>
    </button>

    <div v-if="showDropdown" class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-1 z-50 border border-gray-100 max-h-96 overflow-y-auto">
      <div class="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
        <h3 class="text-sm font-semibold text-gray-700">Notifications</h3>
        <button @click="handleMarkAllRead" class="text-xs text-primary-600 hover:text-primary-800 font-medium">
          Mark all read
        </button>
      </div>
      
      <div v-if="notifications.length === 0" class="px-4 py-6 text-center text-gray-500 text-sm">
        No notifications yet
      </div>

      <div v-else>
        <div 
          v-for="notif in notifications" 
          :key="notif.id"
          @click="handleNotificationClick(notif)"
          class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
          :class="{ 'bg-blue-50/50': !notif.is_read }"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0 mt-1 mr-3">
              <!-- Icon based on type -->
              <div v-if="notif.type === 'DOCUMENT_REJECTED'" class="p-1 bg-red-100 rounded-full text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div v-else-if="notif.type === 'DOCUMENT_APPROVED' || notif.type === 'HIRED'" class="p-1 bg-green-100 rounded-full text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div v-else class="p-1 bg-blue-100 rounded-full text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900" :class="{ 'font-semibold': !notif.is_read }">
                {{ notif.title }}
              </p>
              <p class="text-sm text-gray-500 mt-0.5 line-clamp-2">
                {{ notif.message }}
              </p>
              <p class="text-xs text-gray-400 mt-1">
                {{ formatDistanceToNow(new Date(notif.created_at), { addSuffix: true }) }}
              </p>
            </div>
            <div v-if="!notif.is_read" class="w-2 h-2 bg-blue-500 rounded-full mt-2 ml-2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
